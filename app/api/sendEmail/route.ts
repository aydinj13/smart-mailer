import OpenAI from 'openai';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';

interface EmailArgs {
  to: string;
  subject: string;
  body: string;
}

interface OpenAIMessage {
  role: 'user' | 'assistant';
  content: string;
  tool_calls?: Array<{
    function: {
      name: string;
      arguments: string;
    };
  }>;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const resend = new Resend(process.env.RESEND_API_KEY!);

const tools: OpenAI.ChatCompletionCreateParams['tools'] = [
  {
    type: "function",
    function: {
      name: "send_email",
      description: "Send an email to a given recipient with a subject and message with a nice format.",
      parameters: {
        type: "object",
        properties: {
          to: {
            type: "string",
            description: "The recipient email address."
          },
          subject: {
            type: "string",
            description: "Email subject line."
          },
          body: {
            type: "string",
            description: "Body of the email message."
          }
        },
        required: ["to", "subject", "body"],
        additionalProperties: false
      }
    }
  }
];


export async function POST(req: Request) {
  try {
    // Get authenticated user
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get request data
    const { messages } = await req.json();

    // Validate messages
    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
      tools,
      tool_choice: "auto",
    });

    const response = completion.choices[0].message as OpenAIMessage;

    if (response.tool_calls && response.tool_calls.length > 0) {
      const toolCall = response.tool_calls[0];
      
      if (toolCall.function.name === 'send_email') {
        try {
          const args = JSON.parse(toolCall.function.arguments) as EmailArgs;
          
          // Validate email arguments
          if (!args.to || !args.subject || !args.body) {
            throw new Error('Missing required email parameters');
          }

          // Send email
          await resend.emails.send({
            from: `${user.firstName || "Smart Mailer"} ${user.lastName || ""} <smart-mailer@aydinjoshi.com>`,
            to: args.to,
            subject: args.subject,
            html: args.body,
          });

          return NextResponse.json({
            role: 'assistant',
            content: `Email sent successfully to ${args.to}`,
            emailPreview: {
              to: args.to,
              subject: args.subject,
              body: args.body
            }
          });
        } catch (emailError) {
          console.error('Email sending error:', emailError);
          
          if (emailError instanceof Error) {
            return NextResponse.json(
              { error: emailError.message },
              { status: 500 }
            );
          }
          
          return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
          );
        }
      }
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}