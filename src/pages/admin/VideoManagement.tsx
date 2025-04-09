
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { videos as initialVideos, Video, VideoSource } from '@/components/videos/VideoCarousel';
import { useVideos } from '@/context/VideosContext';
import { Youtube, Facebook, Plus, Edit, Trash } from 'lucide-react';

const VideoManagement = () => {
  const { videos, setVideos } = useVideos();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    source: 'youtube' as VideoSource,
    url: '',
  });

  // Initialize with default videos if context is empty
  useEffect(() => {
    if (videos.length === 0) {
      setVideos(initialVideos);
    }
  }, [videos.length, setVideos]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, source: value as VideoSource });
  };

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      source: 'youtube',
      url: '',
    });
    setCurrentVideo(null);
  };

  const openAddDialog = () => {
    resetForm();
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (video: Video) => {
    setCurrentVideo(video);
    setFormData({
      id: video.id,
      title: video.title,
      source: video.source,
      url: video.url,
    });
    setIsEditDialogOpen(true);
  };

  const handleAddVideo = () => {
    // Validate form
    if (!formData.title || !formData.url) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Process URL for embedding if needed
    let processedUrl = formData.url;
    
    if (formData.source === 'youtube' && !processedUrl.includes('embed')) {
      // Convert YouTube watch URL to embed URL
      const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
      const match = processedUrl.match(youtubeRegex);
      if (match && match[1]) {
        processedUrl = `https://www.youtube.com/embed/${match[1]}`;
      }
    }

    const newVideo: Video = {
      id: Date.now().toString(),
      title: formData.title,
      source: formData.source,
      url: processedUrl,
    };

    setVideos([...videos, newVideo]);
    toast.success('Video added successfully!');
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditVideo = () => {
    if (!currentVideo) return;

    // Validate form
    if (!formData.title || !formData.url) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Process URL for embedding if needed
    let processedUrl = formData.url;
    
    if (formData.source === 'youtube' && !processedUrl.includes('embed')) {
      // Convert YouTube watch URL to embed URL
      const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
      const match = processedUrl.match(youtubeRegex);
      if (match && match[1]) {
        processedUrl = `https://www.youtube.com/embed/${match[1]}`;
      }
    }

    const updatedVideos = videos.map(video => {
      if (video.id === currentVideo.id) {
        return {
          ...video,
          title: formData.title,
          source: formData.source,
          url: processedUrl,
        };
      }
      return video;
    });

    setVideos(updatedVideos);
    toast.success('Video updated successfully!');
    setIsEditDialogOpen(false);
    resetForm();
  };

  const handleDeleteVideo = (id: string) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      const updatedVideos = videos.filter(video => video.id !== id);
      setVideos(updatedVideos);
      toast.success('Video deleted successfully!');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Video Management</h1>
          <Button onClick={openAddDialog} className="flex items-center gap-2">
            <Plus size={16} />
            <span>Add Video</span>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Media Videos</CardTitle>
            <CardDescription>
              Manage videos that appear in the Media Appearances section on the About page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {videos.map((video) => (
                  <TableRow key={video.id}>
                    <TableCell>
                      <span className="flex items-center gap-1">
                        {video.source === 'youtube' ? (
                          <>
                            <Youtube className="h-4 w-4 text-red-600" />
                            <span>YouTube</span>
                          </>
                        ) : (
                          <>
                            <Facebook className="h-4 w-4 text-blue-600" />
                            <span>Facebook</span>
                          </>
                        )}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">{video.title}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{video.url}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(video)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteVideo(video.id)}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Add Video Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add Video</DialogTitle>
            <DialogDescription>
              Add a new video to the media appearances section.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Video title"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="source" className="text-right">
                Source
              </Label>
              <Select
                value={formData.source}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                URL
              </Label>
              <Input
                id="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder={formData.source === 'youtube' 
                  ? 'https://www.youtube.com/watch?v=abcdef123456' 
                  : 'https://www.facebook.com/page/videos/123456789/'
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddVideo}>Add Video</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Video Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Video</DialogTitle>
            <DialogDescription>
              Update the video details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-title" className="text-right">
                Title
              </Label>
              <Input
                id="edit-title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-source" className="text-right">
                Source
              </Label>
              <Select
                value={formData.source}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-url" className="text-right">
                URL
              </Label>
              <Input
                id="edit-url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditVideo}>Update Video</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default VideoManagement;
