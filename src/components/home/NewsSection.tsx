
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { NewsArticle } from '@/types';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';
import { fetchNewsArticles } from '@/lib/supabase';

const NewsSection = () => {
  const { language } = useLanguage();
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const loadNewsArticles = async () => {
      setIsLoading(true);
      try {
        const articles = await fetchNewsArticles();
        setNewsArticles(articles);
      } catch (error) {
        console.error('Error loading news articles:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadNewsArticles();
  }, []);
  
  if (isLoading) {
    return (
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="w-10 h-10 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-2 text-gray-600">Loading news articles...</p>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-serif">
            {translate('inTheNews', language)}
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            {translate('newsSubtitle', language)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {newsArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">{article.source}</span>
                    <span className="text-sm text-gray-500">{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 flex-grow">
                    {article.excerpt}
                  </p>
                  
                  <a 
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary font-medium hover:underline mt-2"
                  >
                    {translate('readOriginal', language)} <ArrowUpRight size={16} />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
