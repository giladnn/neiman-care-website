
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { videos as initialVideos, Video } from '@/components/videos/VideoCarousel';
import { useVideos } from '@/context/VideosContext';
import VideoList from '@/components/admin/videos/VideoList';
import VideoFormDialog from '@/components/admin/videos/VideoFormDialog';
import { 
  VideoFormData, 
  processVideoUrl, 
  validateVideoForm, 
  defaultFormData 
} from '@/components/admin/videos/videoUtils';

const VideoManagement = () => {
  const { videos, setVideos } = useVideos();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [formData, setFormData] = useState<VideoFormData>(defaultFormData);

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
    setFormData({ ...formData, source: value as Video['source'] });
  };

  const resetForm = () => {
    setFormData(defaultFormData);
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
    if (!validateVideoForm(formData)) {
      toast.error('Please fill in all required fields');
      return;
    }

    const processedUrl = processVideoUrl(formData.url, formData.source);

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
    if (!validateVideoForm(formData)) {
      toast.error('Please fill in all required fields');
      return;
    }

    const processedUrl = processVideoUrl(formData.url, formData.source);

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
            <VideoList 
              videos={videos}
              onEdit={openEditDialog}
              onDelete={handleDeleteVideo}
            />
          </CardContent>
        </Card>
      </div>

      {/* Add Video Dialog */}
      <VideoFormDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        title="Add Video"
        description="Add a new video to the media appearances section."
        formData={formData}
        onInputChange={handleInputChange}
        onSelectChange={handleSelectChange}
        onSubmit={handleAddVideo}
        submitButtonText="Add Video"
      />

      {/* Edit Video Dialog */}
      <VideoFormDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        title="Edit Video"
        description="Update the video details."
        formData={formData}
        onInputChange={handleInputChange}
        onSelectChange={handleSelectChange}
        onSubmit={handleEditVideo}
        submitButtonText="Update Video"
      />
    </AdminLayout>
  );
};

export default VideoManagement;
