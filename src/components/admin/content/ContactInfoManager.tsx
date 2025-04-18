
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { ContactInfo } from '@/types';
import ContactInfoDialog from './ContactInfoDialog';

const ContactInfoManager = () => {
  const { language } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState<ContactInfo | null>(null);
  const queryClient = useQueryClient();

  const { data: contactInfo = [], isLoading } = useQuery({
    queryKey: ['contactInfo'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .order('order_num');
      if (error) throw error;
      return data as ContactInfo[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contact_info')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactInfo'] });
      toast.success(translate('contactInfoDeleted', language));
    },
    onError: (error) => {
      toast.error(`${translate('error', language)}: ${error.message}`);
    },
  });

  const handleAdd = () => {
    setSelectedInfo(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (info: ContactInfo) => {
    setSelectedInfo(info);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(translate('confirmDelete', language))) {
      deleteMutation.mutate(id);
    }
  };

  const getTypeLabel = (type: string) => {
    return translate(type, language);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{translate('contactManagement', language)}</CardTitle>
        <Button onClick={handleAdd} className="flex items-center gap-2">
          <Plus size={16} />
          {translate('addNew', language)}
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : contactInfo.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {translate('emptyState', language)}
          </div>
        ) : (
          <div className="space-y-4">
            {contactInfo.map((info) => (
              <div
                key={info.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{getTypeLabel(info.type)}</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {info.value[language]}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(info)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(info.id)}
                  >
                    <Trash2 size={16} className="text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <ContactInfoDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        contactInfo={selectedInfo}
      />
    </Card>
  );
};

export default ContactInfoManager;
