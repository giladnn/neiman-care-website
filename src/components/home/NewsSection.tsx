
import { Card, CardContent } from '@/components/ui/card';
import { NewsArticle } from '@/types';
import { ArrowUpRight } from 'lucide-react';

// Sample news articles
const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Dr. Victoria Neiman Receives Excellence in Oncology Award',
    source: 'Israeli Medical Journal',
    date: '2024-02-10',
    excerpt: 'Dr. Neiman recognized for her groundbreaking work in personalized cancer treatment approaches.',
    url: '#',
  },
  {
    id: '2',
    title: 'Leading Oncologist Discusses New Cancer Treatment Protocols',
    source: 'Health Today',
    date: '2023-11-20',
    excerpt: 'Dr. Victoria Neiman shares insights on emerging treatment options for cancer patients.',
    url: '#',
  },
  {
    id: '3',
    title: 'International Conference Features Israeli Cancer Specialist',
    source: 'Medical News Network',
    date: '2023-09-05',
    excerpt: 'Dr. Neiman presents research findings at international oncology conference in London.',
    url: '#',
  },
  {
    id: '4',
    title: 'Local Doctor Pioneers New Approach to Cancer Care',
    source: 'Tel Aviv Times',
    date: '2023-07-15',
    excerpt: 'Victoria Neiman, MD, implements holistic patient-centered approach to oncology treatment.',
    url: '#',
  },
];

const NewsSection = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-serif">
            In The News
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Dr. Victoria Neiman's contributions to oncology research and patient care featured in medical publications and news outlets.
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
                    Read original article <ArrowUpRight size={16} />
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
