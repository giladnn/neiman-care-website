
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

async function fetchMessages() {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
  
  return data as Message[];
}

const RecentMessages = () => {
  const { data: messages, isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: fetchMessages,
  });

  // Static messages as fallback
  const staticMessages = [
    { id: '1', name: 'Michael Berkovich', email: 'michael@example.com', message: 'I\'d like to discuss the test results...', created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
    { id: '2', name: 'Anna Shapiro', email: 'anna@example.com', message: 'Thank you for the appointment yesterday...', created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
    { id: '3', name: 'Yael Stein', email: 'yael@example.com', message: 'I have a question about my medication...', created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() }
  ];

  const displayMessages = messages && messages.length > 0 ? messages : staticMessages;

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const messageDate = new Date(dateString);
    const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return `${Math.floor(diffInHours / 24)} days ago`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Messages</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {displayMessages.map((message) => (
              <div key={message.id} className="flex flex-col p-4 border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">{message.name}</p>
                  <p className="text-xs text-gray-500">{getTimeAgo(message.created_at)}</p>
                </div>
                <p className="text-sm text-gray-600 truncate">{message.message}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentMessages;
