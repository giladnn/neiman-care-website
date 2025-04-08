
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { BlogPost } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Sample blog posts for demonstration
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Advances in Immunotherapy for Cancer Treatment',
    date: '2024-03-15',
    excerpt: 'Exploring the latest developments in cancer immunotherapy and how they are transforming treatment outcomes for patients.',
    content: 'Full content goes here...',
    author: 'Dr. Victoria Neiman',
    category: 'Treatment',
  },
  {
    id: '2',
    title: 'Understanding Genetic Testing in Cancer Diagnosis',
    date: '2024-03-01',
    excerpt: 'How genetic testing is revolutionizing our approach to cancer diagnosis and enabling more targeted treatment strategies.',
    content: 'Full content goes here...',
    author: 'Dr. Victoria Neiman',
    category: 'Diagnosis',
  },
  {
    id: '3',
    title: 'Nutrition and Wellness During Cancer Treatment',
    date: '2024-02-15',
    excerpt: 'Practical advice on maintaining nutrition and overall wellness while undergoing cancer treatment.',
    content: 'Full content goes here...',
    author: 'Dr. Victoria Neiman',
    category: 'Wellness',
  },
  {
    id: '4',
    title: 'Common Myths About Cancer Treatment',
    date: '2024-01-28',
    excerpt: 'Debunking misconceptions about cancer treatment and providing evidence-based facts to help patients make informed decisions.',
    content: 'Full content goes here...',
    author: 'Dr. Victoria Neiman',
    category: 'Education',
  },
  {
    id: '5',
    title: 'The Role of Support Networks in Cancer Recovery',
    date: '2024-01-10',
    excerpt: 'Understanding how family, friends, and support groups can positively impact cancer treatment outcomes and patient well-being.',
    content: 'Full content goes here...',
    author: 'Dr. Victoria Neiman',
    category: 'Support',
  },
  {
    id: '6',
    title: 'Advances in Precision Medicine for Oncology',
    date: '2023-12-20',
    excerpt: 'How personalized treatment approaches based on genetic profiling are changing the landscape of cancer care.',
    content: 'Full content goes here...',
    author: 'Dr. Victoria Neiman',
    category: 'Research',
  },
];

const categories = [
  'All',
  'Treatment',
  'Diagnosis',
  'Research',
  'Wellness',
  'Support',
  'Education',
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter posts based on search query and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="pt-24 pb-16 bg-primary/10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 font-serif text-gray-800">Blog & Resources</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest research, treatment options, and healthcare insights from Dr. Victoria Neiman.
          </p>
        </div>
      </div>

      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-8 order-2 md:order-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 font-serif">Search</h2>
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 font-serif">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    className={selectedCategory === category ? 'bg-primary text-white' : 'w-full justify-start'}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                    {selectedCategory !== category && (
                      <span className="ml-auto bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        {category === 'All'
                          ? blogPosts.length
                          : blogPosts.filter(post => post.category === category).length}
                      </span>
                    )}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 font-serif">Recent Posts</h2>
              <div className="space-y-4">
                {blogPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="group">
                    <Link to={`/blog/${post.id}`} className="block group-hover:text-primary transition-colors">
                      <h3 className="font-medium line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </Link>
                    <Separator className="mt-3" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-primary text-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 font-serif">Need Assistance?</h2>
              <p className="mb-4">
                Have questions about cancer treatment or want to schedule an appointment with Dr. Victoria Neiman?
              </p>
              <Button asChild variant="secondary" className="w-full bg-secondary hover:bg-secondary-dark">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-2 order-1 md:order-2">
            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
              <h2 className="text-2xl font-bold font-serif">
                {selectedCategory === 'All'
                  ? 'All Articles'
                  : `${selectedCategory} Articles`}
                <span className="ml-2 text-gray-500 text-lg font-normal">
                  ({filteredPosts.length})
                </span>
              </h2>
              
              <div className="flex items-center">
                <span className="mr-2 text-gray-500">Sort by:</span>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="a-z">Title (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-600 mb-2">No articles found</h3>
                <p className="text-gray-500">Try adjusting your search or category selection</p>
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  variant="outline"
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="md:col-span-1 h-48 md:h-full bg-gray-200">
                        {post.imageUrl ? (
                          <img 
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                            <span className="text-4xl">📚</span>
                          </div>
                        )}
                      </div>
                      <CardContent className="md:col-span-2 p-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                          <span>•</span>
                          <span>{post.category}</span>
                        </div>
                        <Link to={`/blog/${post.id}`}>
                          <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="text-gray-600 line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                        <Link
                          to={`/blog/${post.id}`}
                          className="text-primary font-medium hover:underline inline-flex items-center"
                        >
                          Read more
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </Link>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            
            {filteredPosts.length > 0 && (
              <div className="flex justify-center mt-12">
                <Button variant="outline" className="mr-2">Previous</Button>
                <Button variant="outline" className="bg-primary text-white">1</Button>
                <Button variant="outline" className="ml-2">Next</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
