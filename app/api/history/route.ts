import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabase } from '@/utils/supabase';

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_id', userId)
      .single();

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get emails and messages
    const [emailsResponse, messagesResponse] = await Promise.all([
      supabase
        .from('emails')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
    ]);

    return NextResponse.json({
      emails: emailsResponse.data,
      messages: messagesResponse.data
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    );
  }
}