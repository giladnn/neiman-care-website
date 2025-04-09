
import React from 'react';
import { Video, VideoSource } from '@/components/videos/VideoCarousel';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface VideoFormData {
  id: string;
  title: string;
  source: VideoSource;
  url: string;
}

interface VideoFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  formData: VideoFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (value: string) => void;
  onSubmit: () => void;
  submitButtonText: string;
}

const VideoFormDialog = ({
  isOpen,
  onOpenChange,
  title,
  description,
  formData,
  onInputChange,
  onSelectChange,
  onSubmit,
  submitButtonText,
}: VideoFormDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
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
              onChange={onInputChange}
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
              onValueChange={onSelectChange}
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
              onChange={onInputChange}
              className="col-span-3"
              placeholder={formData.source === 'youtube' 
                ? 'https://www.youtube.com/watch?v=abcdef123456' 
                : 'https://www.facebook.com/page/videos/123456789/'
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>{submitButtonText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VideoFormDialog;
