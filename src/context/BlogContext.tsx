
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { BlogPost } from '@/types';

interface BlogContextType {
  blogPosts: BlogPost[];
  setBlogPosts: (posts: BlogPost[]) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

// Sample blog posts for demo
const initialBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Advances in Immunotherapy for Cancer Treatment',
    date: '2024-03-15',
    excerpt: 'Exploring the latest developments in cancer immunotherapy and how they are transforming treatment outcomes for patients.',
    content: 'Full content goes here...',
    author: 'Dr. Victoria Neiman',
    category: 'Treatment'
  },
  {
    id: '2',
    title: 'Understanding Genetic Testing in Cancer Diagnosis',
    date: '2024-03-01',
    excerpt: 'How genetic testing is revolutionizing our approach to cancer diagnosis and enabling more targeted treatment strategies.',
    content: 'Full content goes here...',
    author: 'Dr. Victoria Neiman',
    category: 'Diagnosis'
  },
  {
    id: '3',
    title: 'Nutrition and Wellness During Cancer Treatment',
    date: '2024-02-15',
    excerpt: 'Practical advice on maintaining nutrition and overall wellness while undergoing cancer treatment.',
    content: 'Full content goes here...',
    author: 'Dr. Victoria Neiman',
    category: 'Wellness'
  },
];

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  // Load blog posts from localStorage if available
  useEffect(() => {
    const storedPosts = localStorage.getItem('blogPosts');
    if (storedPosts) {
      try {
        setBlogPosts(JSON.parse(storedPosts));
      } catch (error) {
        console.error('Failed to parse stored blog posts:', error);
        setBlogPosts(initialBlogPosts);
      }
    } else {
      setBlogPosts(initialBlogPosts);
    }
  }, []);

  // Save blog posts to localStorage whenever they change
  useEffect(() => {
    if (blogPosts.length > 0) {
      localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
    }
  }, [blogPosts]);

  return (
    <BlogContext.Provider value={{ blogPosts, setBlogPosts }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
