
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { NewsArticle } from '@/types';
import { fetchNewsArticles, createNewsArticle, updateNewsArticle, deleteNewsArticle } from '@/lib/supabase';
import { toast } from 'sonner';
import { Edit, Trash, Plus, ExternalLink } from 'lucide-react';

const NewsManagement = () => {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [formData, setFormData] = useState<Partial<NewsArticle>>({
    title: '',
    source: '',
    date: new Date().toISOString().split('T')[0],
    excerpt: '',
    url: '',
    imageUrl: '',
  });

  const fetchAllNewsArticles = async () => {
    setIsLoading(true);
    try {
      const data = await fetchNewsArticles();
      setNewsArticles(data);
    } catch (error) {
      console.error('Error fetching news articles:', error);
      toast.error('Failed to load news articles');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllNewsArticles();
  }, []);

  const handleOpenDialog = (article?: NewsArticle) => {
    if (article) {
      setSelectedArticle(article);
      setFormData({
        title: article.title,
        source: article.source,
        date: article.date,
        excerpt: article.excerpt,
        url: article.url,
        imageUrl: article.imageUrl,
      });
    } else {
      setSelectedArticle(null);
      setFormData({
        title: '',
        source: '',
        date: new Date().toISOString().split('T')[0],
        excerpt: '',
        url: '',
        imageUrl: '',
      });
    }
    setDialogOpen(true);
  };

  const handleOpenDeleteDialog = (article: NewsArticle) => {
    setSelectedArticle(article);
    setDeleteDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedArticle) {
        await updateNewsArticle(selectedArticle.id, formData);
        toast.success('News article updated successfully');
      } else {
        await createNewsArticle(formData as NewsArticle);
        toast.success('News article created successfully');
      }
      setDialogOpen(false);
      fetchAllNewsArticles();
    } catch (error) {
      console.error('Error saving news article:', error);
      toast.error(selectedArticle ? 'Failed to update news article' : 'Failed to create news article');
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedArticle) {
        await deleteNewsArticle(selectedArticle.id);
        toast.success('News article deleted successfully');
        setDeleteDialogOpen(false);
        fetchAllNewsArticles();
      }
    } catch (error) {
      console.error('Error deleting news article:', error);
      toast.error('Failed to delete news article');
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">News Management</h1>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" /> Add News Article
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Link</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsArticles.length > 0 ? (
                newsArticles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell>{article.source}</TableCell>
                    <TableCell>{new Date(article.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:underline">
                        View <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(article)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleOpenDeleteDialog(article)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                    No news articles found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedArticle ? 'Edit News Article' : 'Add News Article'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title || ''}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="source">Source</Label>
                <Input
                  id="source"
                  name="source"
                  value={formData.source || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt || ''}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                name="url"
                type="url"
                value={formData.url || ''}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL (Optional)</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl || ''}
                onChange={handleInputChange}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit">{selectedArticle ? 'Update' : 'Create'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="py-4">Are you sure you want to delete the news article "{selectedArticle?.title}"? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default NewsManagement;
