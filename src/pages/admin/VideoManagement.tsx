
import React, { useState } from 'react';
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
import { Video } from '@/types';
import VideoList from '@/components/admin/videos/VideoList';
import VideoFormDialog from '@/components/admin/videos/VideoFormDialog';
import { 
  VideoFormData, 
  processVideoUrl, 
  validateVideoForm, 
  defaultFormData 
} from '@/components/admin/videos/videoUtils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchVideos, createVideo, updateVideo, deleteVideo } from '@/lib/supabase';

const VideoManagement = () => {
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [formData, setFormData] = useState<VideoFormData>(defaultFormData);

  // Fetch videos from Supabase
  const { data: videos = [], isLoading } = useQuery({
    queryKey: ['videos'],
    queryFn: fetchVideos
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: createVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      toast.success('Video added successfully!');
      setIsAddDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(`Error creating video: ${error.message}`);
    }
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: { id: string, video: Partial<Video> }) => 
      updateVideo(data.id, data.video),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      toast.success('Video updated successfully!');
      setIsEditDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(`Error updating video: ${error.message}`);
    }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      toast.success('Video deleted successfully!');
    },
    onError: (error) => {
      toast.error(`Error deleting video: ${error.message}`);
    }
  });

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
      id: formData.id || Date.now().toString(),
      title: formData.title,
      source: formData.source,
      url: processedUrl,
    };

    createMutation.mutate(newVideo);
  };

  const handleEditVideo = () => {
    if (!currentVideo) return;

    // Validate form
    if (!validateVideoForm(formData)) {
      toast.error('Please fill in all required fields');
      return;
    }

    const processedUrl = processVideoUrl(formData.url, formData.source);

    const updatedVideo: Partial<Video> = {
      title: formData.title,
      source: formData.source,
      url: processedUrl,
    };

    updateMutation.mutate({
      id: currentVideo.id,
      video: updatedVideo
    });
  };

  const handleDeleteVideo = (id: string) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      deleteMutation.mutate(id);
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
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <VideoList 
                videos={videos}
                onEdit={openEditDialog}
                onDelete={handleDeleteVideo}
              />
            )}
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
