
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchBiographySections, deleteBiographySection, updateBiographyOrder } from '@/lib/supabase';
import { BiographySection, Language } from '@/types';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';
import BiographyFormDialog from './BiographyFormDialog';

const BiographyEditor = () => {
  const { language } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<BiographySection | null>(null);
  const queryClient = useQueryClient();

  const { data: sections = [], isLoading } = useQuery({
    queryKey: ['biographySections'],
    queryFn: fetchBiographySections,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBiographySection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['biographySections'] });
      toast.success(translate('contentDeleted', language));
    },
    onError: (error) => {
      toast.error(`${translate('error', language)}: ${error.message}`);
    },
  });

  const orderMutation = useMutation({
    mutationFn: updateBiographyOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['biographySections'] });
    },
    onError: (error) => {
      toast.error(`${translate('error', language)}: ${error.message}`);
    },
  });

  const handleAddSection = () => {
    setEditingSection(null);
    setIsDialogOpen(true);
  };

  const handleEditSection = (section: BiographySection) => {
    setEditingSection(section);
    setIsDialogOpen(true);
  };

  const handleDeleteSection = (sectionId: string) => {
    if (window.confirm(translate('confirmDelete', language))) {
      deleteMutation.mutate(sectionId);
    }
  };

  const handleMoveUp = (section: BiographySection, index: number) => {
    if (index === 0) return;
    const prevSection = sections[index - 1];
    orderMutation.mutate({
      id1: section.id,
      order1: prevSection.order,
      id2: prevSection.id,
      order2: section.order,
    });
  };

  const handleMoveDown = (section: BiographySection, index: number) => {
    if (index === sections.length - 1) return;
    const nextSection = sections[index + 1];
    orderMutation.mutate({
      id1: section.id,
      order1: nextSection.order,
      id2: nextSection.id,
      order2: section.order,
    });
  };

  const getLocalizedText = (textObj: Record<Language, string> | undefined) => {
    if (!textObj) return '';
    return textObj[language] || textObj.en || '';
  };

  const sortedSections = [...sections].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{translate('biographyManagement', language)}</CardTitle>
        <Button onClick={handleAddSection} className="flex items-center gap-2">
          <Plus size={16} />
          {translate('addNew', language)}
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : sortedSections.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">{translate('emptyState', language)}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{translate('order', language)}</TableHead>
                  <TableHead>{translate('title', language)}</TableHead>
                  <TableHead className="w-1/2">{translate('content', language)}</TableHead>
                  <TableHead className="text-right">{translate('actions', language)}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedSections.map((section, index) => (
                  <TableRow key={section.id}>
                    <TableCell className="font-medium">{section.order}</TableCell>
                    <TableCell>{getLocalizedText(section.title)}</TableCell>
                    <TableCell className="max-w-[400px]">
                      <div className="whitespace-pre-line truncate">
                        {getLocalizedText(section.content)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleMoveUp(section, index)}
                          disabled={index === 0}
                          title={translate('moveUp', language)}
                        >
                          <ArrowUp size={16} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleMoveDown(section, index)}
                          disabled={index === sortedSections.length - 1}
                          title={translate('moveDown', language)}
                        >
                          <ArrowDown size={16} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleEditSection(section)}
                          title={translate('edit', language)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleDeleteSection(section.id)}
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

      <BiographyFormDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        section={editingSection}
        maxOrder={sections.length}
      />
    </Card>
  );
};

export default BiographyEditor;
