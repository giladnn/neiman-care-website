
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFaqs, deleteFaq } from '@/lib/supabase';
import { FAQ, Language } from '@/types';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';
import FAQFormDialog from './FAQFormDialog';

const FAQList = () => {
  const { language } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const queryClient = useQueryClient();

  const { data: faqs = [], isLoading } = useQuery({
    queryKey: ['faqs'],
    queryFn: fetchFaqs,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFaq,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      toast.success(translate('contentDeleted', language));
    },
    onError: (error) => {
      toast.error(`${translate('error', language)}: ${error.message}`);
    },
  });

  const handleAddFAQ = () => {
    setEditingFaq(null);
    setIsDialogOpen(true);
  };

  const handleEditFAQ = (faq: FAQ) => {
    setEditingFaq(faq);
    setIsDialogOpen(true);
  };

  const handleDeleteFAQ = (faqId: string) => {
    if (window.confirm(translate('confirmDelete', language))) {
      deleteMutation.mutate(faqId);
    }
  };

  const getLocalizedText = (textObj: Record<Language, string> | undefined) => {
    if (!textObj) return '';
    return textObj[language] || textObj.en || '';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{translate('faqsManagement', language)}</CardTitle>
          <CardDescription>{translate('faqSubtitle', language)}</CardDescription>
        </div>
        <Button onClick={handleAddFAQ} className="flex items-center gap-2">
          <Plus size={16} />
          {translate('addFaq', language)}
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : faqs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">{translate('emptyState', language)}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{translate('question', language)}</TableHead>
                  <TableHead className="w-1/3">{translate('answer', language)}</TableHead>
                  <TableHead className="text-right w-[100px]">{translate('actions', language)}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faqs.map((faq) => (
                  <TableRow key={faq.id}>
                    <TableCell className="font-medium">{getLocalizedText(faq.question)}</TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {getLocalizedText(faq.answer)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleEditFAQ(faq)}
                          title={translate('edit', language)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleDeleteFAQ(faq.id)}
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

      <FAQFormDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        faq={editingFaq}
      />
    </Card>
  );
};

export default FAQList;
