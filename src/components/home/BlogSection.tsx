
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { BlogPost } from '@/types';
import { Button } from '@/components/ui/button';

// Sample blog posts
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Advances in Immunotherapy for Cancer Treatment',
    date: '2024-03-15',
    excerpt: 'Exploring the latest developments in cancer immunotherapy and how they are transforming treatment outcomes for patients.',
    content: '',
    author: 'Dr. Victoria Neiman',
    category: 'Treatment',
  },
  {
    id: '2',
    title: 'Understanding Genetic Testing in Cancer Diagnosis',
    date: '2024-03-01',
    excerpt: 'How genetic testing is revolutionizing our approach to cancer diagnosis and enabling more targeted treatment strategies.',
    content: '',
    author: 'Dr. Victoria Neiman',
    category: 'Diagnosis',
  },
  {
    id: '3',
    title: 'Nutrition and Wellness During Cancer Treatment',
    date: '2024-02-15',
    excerpt: 'Practical advice on maintaining nutrition and overall wellness while undergoing cancer treatment.',
    content: '',
    author: 'Dr. Victoria Neiman',
    category: 'Wellness',
  },
];

const BlogSection = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-serif">
            Latest Articles
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Stay informed with the latest research, treatment options, and healthcare insights from Dr. Victoria Neiman.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200">
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
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span>•</span>
                  <span>{post.category}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-primary transition-colors">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                <p className="text-gray-600 line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.id}`}
                  className="text-primary font-medium hover:underline"
                >
                  Read more
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild className="bg-primary hover:bg-primary-dark text-white">
            <Link to="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
