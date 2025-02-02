"use client"

import { useState } from 'react';
import { UserButton } from "@clerk/nextjs";
import { MessageSquare, Send, Copy, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useHistory } from '@/hooks/use-history';
import Sidebar from '@/components/Sidebar';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!input.trim()) return;
    setIsLoading(true);

    const userMessage = {
      role: 'user',
      content: input,
    };

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, userMessage, data]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([
        ...messages, 
        userMessage,
        {
          role: 'assistant',
          content: 'Sorry, there was an error sending your email. Please try again.',
          error: true,
        }
      ]);
    } finally {
      setInput('');
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const InputArea = () => (
    <div className="p-4 border-t">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center space-x-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Send an email to John Doe (fake@email.com) and kindly invite him to my Super Bowl Party..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-white" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );

  const HistorySidebar = () => {
    const { history, loading } = useHistory();
  
    if (loading) {
      return <div className="w-80 border-l p-4">Loading history...</div>;
    }
  
    const emailCount = history?.emails?.length || 0;
  
    return (
      <div className="w-80 border-l p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">History</h2>
          <span className="text-sm text-gray-500">
            {emailCount} emails sent
          </span>
        </div>
        <div className="space-y-2">
          {history?.emails?.map((email) => (
            <Button 
              key={email.id} 
              variant="ghost" 
              className="w-full justify-start text-left"
            >
              <span className="truncate">{email.subject}</span>
            </Button>
          ))} 
        </div>
      </div>
    );
  };


  const ChatHeader = () => (
    <div className="border-b p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold">Send an Email</h1>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search" 
            className="pl-8 w-[200px]"
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon">
          <MessageSquare className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Copy className="h-4 w-4" />
        </Button>
        <div className="ml-2">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );

  // Update the messages rendering to include email preview
  const MessageList = () => (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <div key={index} className="flex items-start space-x-3">
          <div className={`flex-1 ${message.role === 'user' ? 'ml-auto' : ''}`}>
            <div className={`p-3 rounded-lg ${
              message.role === 'user' 
                ? 'bg-blue-500 text-white ml-auto' 
                : message.error 
                ? 'bg-red-100 text-red-700 border border-red-300'
                : 'bg-gray-100'
            }`}>
              {message.content}
            </div>
            {/* Add email preview if available */}
            {message.role === 'assistant' && !message.error && message.emailPreview && (
              <div className="mt-2 p-3 bg-white border rounded-lg shadow-sm">
                <div className="text-sm text-gray-600">
                  <div><strong>To:</strong> {message.emailPreview.to}</div>
                  <div><strong>Subject:</strong> {message.emailPreview.subject}</div>
                  <div className="mt-2 border-t pt-2">{message.emailPreview.body}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <ChatHeader />
        

          <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <MessageList /> {/* Use the MessageList component */}
          </ScrollArea>
          <InputArea /> {/* Use the InputArea component instead of duplicating the input code */}
        </div>

          <HistorySidebar />
        </div>
      </div>
    </div>
  );
}