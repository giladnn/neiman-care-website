
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PatientStory } from '@/types';
import { fetchPatientStories, createPatientStory, updatePatientStory, deletePatientStory } from '@/lib/supabase';
import { toast } from 'sonner';
import { Edit, Trash, Plus, Star } from 'lucide-react';

const PatientStoryManagement = () => {
  const [stories, setStories] = useState<PatientStory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<PatientStory | null>(null);
  const [formData, setFormData] = useState<Partial<PatientStory>>({
    name: '',
    position: '',
    content: '',
    fullStory: '',
    diagnosis: '',
    treatmentJourney: '',
    rating: 5,
    category: '',
    featured: false,
  });

  const fetchAllStories = async () => {
    setIsLoading(true);
    try {
      const data = await fetchPatientStories();
      setStories(data);
    } catch (error) {
      console.error('Error fetching patient stories:', error);
      toast.error('Failed to load patient stories');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStories();
  }, []);

  const handleOpenDialog = (story?: PatientStory) => {
    if (story) {
      setSelectedStory(story);
      setFormData({
        name: story.name,
        position: story.position,
        content: story.content,
        fullStory: story.fullStory,
        diagnosis: story.diagnosis,
        treatmentJourney: story.treatmentJourney,
        rating: story.rating,
        imageUrl: story.imageUrl,
        videoUrl: story.videoUrl,
        category: story.category,
        featured: story.featured,
      });
    } else {
      setSelectedStory(null);
      setFormData({
        name: '',
        position: '',
        content: '',
        fullStory: '',
        diagnosis: '',
        treatmentJourney: '',
        rating: 5,
        category: '',
        featured: false,
      });
    }
    setDialogOpen(true);
  };

  const handleOpenDeleteDialog = (story: PatientStory) => {
    setSelectedStory(story);
    setDeleteDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedStory) {
        await updatePatientStory(selectedStory.id, formData);
        toast.success('Patient story updated successfully');
      } else {
        await createPatientStory(formData as PatientStory);
        toast.success('Patient story created successfully');
      }
      setDialogOpen(false);
      fetchAllStories();
    } catch (error) {
      console.error('Error saving patient story:', error);
      toast.error(selectedStory ? 'Failed to update patient story' : 'Failed to create patient story');
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedStory) {
        await deletePatientStory(selectedStory.id);
        toast.success('Patient story deleted successfully');
        setDeleteDialogOpen(false);
        fetchAllStories();
      }
    } catch (error) {
      console.error('Error deleting patient story:', error);
      toast.error('Failed to delete patient story');
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Patient Story Management</h1>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" /> Add Patient Story
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
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stories.length > 0 ? (
                stories.map((story) => (
                  <TableRow key={story.id}>
                    <TableCell className="font-medium">{story.name}</TableCell>
                    <TableCell>{story.position}</TableCell>
                    <TableCell>{story.category || 'N/A'}</TableCell>
                    <TableCell>
                      <div className="flex">
                        {Array.from({ length: story.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{story.featured ? 'Yes' : 'No'}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(story)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleOpenDeleteDialog(story)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                    No patient stories found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedStory ? 'Edit Patient Story' : 'Add Patient Story'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category || ''}
                  onValueChange={(value) => handleSelectChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breast">Breast Cancer</SelectItem>
                    <SelectItem value="lung">Lung Cancer</SelectItem>
                    <SelectItem value="gastro">Gastrointestinal</SelectItem>
                    <SelectItem value="lymphoma">Lymphoma</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Select
                  value={formData.rating?.toString() || '5'}
                  onValueChange={(value) => handleSelectChange('rating', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Star</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Short Testimonial</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content || ''}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullStory">Full Story</Label>
              <Textarea
                id="fullStory"
                name="fullStory"
                value={formData.fullStory || ''}
                onChange={handleInputChange}
                rows={5}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="diagnosis">Diagnosis</Label>
                <Input
                  id="diagnosis"
                  name="diagnosis"
                  value={formData.diagnosis || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="treatmentJourney">Treatment</Label>
                <Input
                  id="treatmentJourney"
                  name="treatmentJourney"
                  value={formData.treatmentJourney || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="videoUrl">Video URL</Label>
                <Input
                  id="videoUrl"
                  name="videoUrl"
                  value={formData.videoUrl || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="featured"
                name="featured"
                type="checkbox"
                checked={formData.featured || false}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="featured" className="text-sm font-normal">Featured Story</Label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit">{selectedStory ? 'Update' : 'Create'}</Button>
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
          <p className="py-4">Are you sure you want to delete {selectedStory?.name}'s story? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default PatientStoryManagement;
