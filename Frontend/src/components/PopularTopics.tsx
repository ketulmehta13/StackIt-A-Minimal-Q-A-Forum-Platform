import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

export const PopularTopics = () => {
  const topics = [
    { name: 'React', count: 1250, trend: '+15%' },
    { name: 'JavaScript', count: 980, trend: '+8%' },
    { name: 'TypeScript', count: 756, trend: '+22%' },
    { name: 'Node.js', count: 642, trend: '+12%' },
    { name: 'Python', count: 598, trend: '+5%' },
    { name: 'Next.js', count: 445, trend: '+28%' },
    { name: 'JWT', count: 334, trend: '+18%' },
    { name: 'MongoDB', count: 289, trend: '+7%' },
    { name: 'CSS', count: 267, trend: '+3%' },
    { name: 'Docker', count: 234, trend: '+14%' },
    { name: 'GraphQL', count: 198, trend: '+25%' },
    { name: 'Vue.js', count: 176, trend: '+9%' }
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Trending Topics
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore the most popular technologies and topics in our community
          </p>
        </div>

        <Card className="p-8 bg-card shadow-card">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {topics.map((topic, index) => (
              <div
                key={index}
                className="group cursor-pointer p-4 rounded-lg bg-background/50 hover:bg-background transition-all duration-300 hover:shadow-soft"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-sm font-medium">
                    {topic.name}
                  </Badge>
                  {index < 6 && (
                    <div className="flex items-center text-green-500 text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {topic.trend}
                    </div>
                  )}
                </div>
                <div className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {topic.count.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">questions</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};