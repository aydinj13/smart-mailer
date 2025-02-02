import OpenAI from 'openai';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { supabase } from '@/utils/supabase';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const resend = new Resend(process.env.RESEND_API_KEY);

const tools = [{
  "type": "function",
  "function": {
    "name": "send_email",
    "description": "Send an email to a given recipient with a subject and message with a nice format.",
    "parameters": {
      "type": "object",
      "properties": {
        "to": {
          "type": "string",
          "description": "The recipient email address."
        },
        "subject": {
          "type": "string",
          "description": "Email subject line."
        },
        "body": {
          "type": "string",
          "description": "Body of the email message."
        }
      },
      "required": ["to", "subject", "body"],
      "additionalProperties": false
    },
    "strict": true
  }
}];

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }



    const { messages } = await req.json();


    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
      tools,
      tool_choice: "auto",
    });

    const response = completion.choices[0].message;

    if (response.tool_calls) {
      const toolCall = response.tool_calls[0];
      
      if (toolCall.function.name === 'send_email') {
        try {
          const args = JSON.parse(toolCall.function.arguments);
          
          const email = await resend.emails.send({
            from: `${user.firstName || "Smart Mailer"} ${user.lastName} <smart-mailer@aydinjoshi.com>`,
            to: args.to,
            subject: args.subject,
            html: args.body,
          });

          // Store email in database
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
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: error.status || 500 }
    );
  }
}