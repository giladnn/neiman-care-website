
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { BlogPost } from '@/types';
import { 
  fetchBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} from '@/lib/supabase';

interface BlogContextType {
  blogPosts: BlogPost[];
  isLoading: boolean;
  error: Error | null;
  refreshBlogPosts: () => Promise<void>;
  addBlogPost: (blogPost: BlogPost) => Promise<void>;
  updatePost: (id: string, blogPost: Partial<BlogPost>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  setBlogPosts: (posts: BlogPost[]) => void; // Add this line to include setBlogPosts
}

const BlogContext = createContext<BlogContextType>({
  blogPosts: [],
  isLoading: false,
  error: null,
  refreshBlogPosts: async () => {},
  addBlogPost: async () => {},
  updatePost: async () => {},
  deletePost: async () => {},
  setBlogPosts: () => {}, // Add this line to include setBlogPosts in the default value
});

export const useBlog = () => useContext(BlogContext);

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const refreshBlogPosts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const postsData = await fetchBlogPosts();
      setBlogPosts(postsData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error fetching blog posts'));
      toast.error('Failed to load blog posts');
      console.error('Error loading blog posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addBlogPost = async (blogPost: BlogPost) => {
    try {
      await createBlogPost(blogPost);
      toast.success('Blog post created successfully');
      await refreshBlogPosts();
    } catch (err) {
      toast.error('Failed to create blog post');
      throw err;
    }
  };

  const updatePost = async (id: string, blogPost: Partial<BlogPost>) => {
    try {
      await updateBlogPost(id, blogPost);
      toast.success('Blog post updated successfully');
      await refreshBlogPosts();
    } catch (err) {
      toast.error('Failed to update blog post');
      throw err;
    }
  };

  const deletePost = async (id: string) => {
    try {
      await deleteBlogPost(id);
      toast.success('Blog post deleted successfully');
      await refreshBlogPosts();
    } catch (err) {
      toast.error('Failed to delete blog post');
      throw err;
    }
  };

  useEffect(() => {
    refreshBlogPosts();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        blogPosts,
        isLoading,
        error,
        refreshBlogPosts,
        addBlogPost,
        updatePost,
        deletePost,
        setBlogPosts, // Add this line to include setBlogPosts in the context value
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
