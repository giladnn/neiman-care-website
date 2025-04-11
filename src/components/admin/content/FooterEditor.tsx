
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFooterInfo, deleteFooterInfo } from '@/lib/supabase';
import { FooterInfo, Language } from '@/types';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';
import FooterInfoFormDialog from './FooterInfoFormDialog';

const FooterEditor = () => {
  const { language } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FooterInfo | null>(null);
  const queryClient = useQueryClient();

  const { data: footerItems = [], isLoading } = useQuery({
    queryKey: ['footerInfo'],
    queryFn: fetchFooterInfo,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFooterInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['footerInfo'] });
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

  const handleEditItem = (item: FooterInfo) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleDeleteItem = (itemId: string) => {
    if (window.confirm(translate('confirmDelete', language))) {
      deleteMutation.mutate(itemId);
    }
  };

  const getLocalizedText = (textObj: Record<Language, string> | undefined) => {
    if (!textObj) return '';
    return textObj[language] || textObj.en || '';
  };

  const getSectionLabel = (section: string): string => {
    switch (section) {
      case 'quickLinks':
        return translate('quickLinks', language);
      case 'contactInfo':
        return translate('contactInfo', language);
      case 'officeHours':
        return translate('officeHoursFooter', language);
      default:
        return section;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{translate('footerManagement', language)}</CardTitle>
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
        ) : footerItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">{translate('emptyState', language)}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{translate('section', language)}</TableHead>
                  <TableHead>{translate('title', language)}</TableHead>
                  <TableHead>{translate('content', language)}</TableHead>
                  <TableHead>{translate('order', language)}</TableHead>
                  <TableHead className="text-right">{translate('actions', language)}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {footerItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{getSectionLabel(item.section)}</TableCell>
                    <TableCell>{getLocalizedText(item.title)}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {getLocalizedText(item.content)}
                    </TableCell>
                    <TableCell>{item.order}</TableCell>
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

      <FooterInfoFormDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        footerInfo={editingItem}
      />
    </Card>
  );
};

export default FooterEditor;
