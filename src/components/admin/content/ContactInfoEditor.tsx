
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchContactInfo, deleteContactInfo } from '@/lib/supabase';
import { ContactInfo, Language } from '@/types';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';
import ContactInfoFormDialog from './ContactInfoFormDialog';

const ContactInfoEditor = () => {
  const { language } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContactInfo | null>(null);
  const queryClient = useQueryClient();

  const { data: contactItems = [], isLoading } = useQuery({
    queryKey: ['contactInfo'],
    queryFn: fetchContactInfo,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteContactInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactInfo'] });
      toast.success(translate('contentDeleted', language));
    },
    onError: (error) => {
      toast.error(`${translate('error', language)}: ${error.message}`);
    },
  });

  const handleAddItem = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  const handleEditItem = (item: ContactInfo) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleDeleteItem = (itemId: string) => {
    if (window.confirm(translate('confirmDelete', language))) {
      deleteMutation.mutate(itemId);
    }
  };

  const getLocalizedValue = (valueObj: Record<Language, string> | undefined) => {
    if (!valueObj) return '';
    return valueObj[language] || valueObj.en || '';
  };

  const getTypeLabel = (type: string): string => {
    switch (type) {
      case 'address':
        return translate('address', language);
      case 'phone':
        return translate('phone', language);
      case 'email':
        return translate('email', language);
      case 'hours':
        return translate('openingHours', language);
      default:
        return type;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{translate('contactInfoManagement', language)}</CardTitle>
        <Button onClick={handleAddItem} className="flex items-center gap-2">
          <Plus size={16} />
          {translate('addNew', language)}
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : contactItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">{translate('emptyState', language)}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{translate('type', language)}</TableHead>
                  <TableHead>{translate('value', language)}</TableHead>
                  <TableHead className="text-right">{translate('actions', language)}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contactItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{getTypeLabel(item.type)}</TableCell>
                    <TableCell className="max-w-[400px]">
                      <div className="whitespace-pre-line truncate">{getLocalizedValue(item.value)}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleEditItem(item)}
                          title={translate('edit', language)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleDeleteItem(item.id)}
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

      <ContactInfoFormDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        contactInfo={editingItem}
      />
    </Card>
  );
};

export default ContactInfoEditor;
