
import { Link } from "react-router-dom";
import { useBlog } from "@/context/BlogContext";
import { useLanguage } from "@/context/LanguageContext";
import { translate } from "@/translations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const BlogSection = () => {
  const { language } = useLanguage();
  const { blogPosts } = useBlog();
  
  // Show only the latest 3 blog posts
  const latestPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="py-16 bg-gray-50" aria-labelledby="blog-section-title">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 
            id="blog-section-title" 
            className="text-3xl font-bold font-serif text-gray-900"
          >
            {translate("blogSectionTitle", language)}
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {translate("blogSectionSubtitle", language)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {latestPosts.map((post) => (
            <Card 
              key={post.id} 
              className="overflow-hidden border-none shadow-md transition-shadow hover:shadow-lg"
              role="listitem"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {post.category}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {format(new Date(post.date), 'MMM d, yyyy')}
                  </span>
                </div>
                <CardTitle className="text-xl font-semibold line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <CardDescription className="text-gray-600 line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between items-center pt-2">
                <span className="text-sm text-gray-500">{post.author}</span>
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link to="/blog">
                    {translate("readMore", language)} →
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            asChild 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary/5"
            aria-label={translate("viewAllPosts", language)}
          >
            <Link to="/blog">{translate("viewAllPosts", language)}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
