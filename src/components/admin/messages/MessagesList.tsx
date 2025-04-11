
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2, Eye, Mail, Check, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMessages, deleteMessage, updateMessageStatus } from '@/lib/supabase';
import { Message } from '@/types';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';
import MessageDetailsDialog from './MessageDetailsDialog';

const MessagesList = () => {
  const { language } = useLanguage();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: fetchMessages,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      toast.success(translate('contentDeleted', language));
    },
    onError: (error) => {
      toast.error(`${translate('error', language)}: ${error.message}`);
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: updateMessageStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
    onError: (error) => {
      toast.error(`${translate('error', language)}: ${error.message}`);
    },
  });

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    setIsDetailsOpen(true);
    
    // Mark as read if not already
    if (!message.read) {
      updateStatusMutation.mutate({ id: message.id, read: true });
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    if (window.confirm(translate('confirmDelete', language))) {
      deleteMutation.mutate(messageId);
    }
  };

  const handleToggleRead = (message: Message) => {
    updateStatusMutation.mutate({
      id: message.id,
      read: !message.read,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{translate('messagesManagement', language)}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">{translate('noMessages', language)}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30px]">{translate('status', language)}</TableHead>
                  <TableHead>{translate('name', language)}</TableHead>
                  <TableHead>{translate('email', language)}</TableHead>
                  <TableHead>{translate('message', language)}</TableHead>
                  <TableHead>{translate('sent', language)}</TableHead>
                  <TableHead className="text-right">{translate('actions', language)}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow key={message.id} className={!message.read ? 'bg-muted/30' : ''}>
                    <TableCell>
                      {message.read ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <AlertCircle size={16} className="text-amber-500" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{message.name}</TableCell>
                    <TableCell>{message.email}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{message.message}</TableCell>
                    <TableCell>
                      {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleToggleRead(message)} 
                          title={message.read ? translate('markAsUnread', language) : translate('markAsRead', language)}
                        >
                          <Mail size={16} className={message.read ? 'text-muted-foreground' : 'text-amber-500'} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleViewMessage(message)}
                          title={translate('view', language)}
                        >
                          <Eye size={16} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleDeleteMessage(message.id)}
                          title={translate('delete', language)}
                        >
                          <Trash2 size={16} className="text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      <MessageDetailsDialog
        isOpen={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        message={selectedMessage}
      />
    </Card>
  );
};

export default MessagesList;
