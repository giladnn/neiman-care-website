
import React from 'react';
import { Video } from '@/components/videos/VideoCarousel';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Youtube, Facebook, Edit, Trash } from 'lucide-react';

interface VideoListProps {
  videos: Video[];
  onEdit: (video: Video) => void;
  onDelete: (id: string) => void;
}

const VideoList = ({ videos, onEdit, onDelete }: VideoListProps) => {
  return (
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
                  onClick={() => onEdit(video)}
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(video.id)}
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
  );
};

export default VideoList;
