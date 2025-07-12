import { Code, MessageSquare, Shield, Zap, Users, Trophy } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const FeaturesSection = () => {
  const features = [
    {
      icon: Code,
      title: 'Rich Code Support',
      description: 'Share code snippets with syntax highlighting and markdown support.',
      color: 'text-blue-500'
    },
    {
      icon: MessageSquare,
      title: 'Real-time Discussions',
      description: 'Engage in live conversations with instant notifications and updates.',
      color: 'text-green-500'
    },
    {
      icon: Shield,
      title: 'Quality Control',
      description: 'Community moderation ensures high-quality content and helpful answers.',
      color: 'text-purple-500'
    },
    {
      icon: Zap,
      title: 'Fast & Reliable',
      description: 'Lightning-fast search and optimized performance for the best experience.',
      color: 'text-yellow-500'
    },
    {
      icon: Users,
      title: 'Expert Community',
      description: 'Connect with experienced developers and industry professionals.',
      color: 'text-pink-500'
    },
    {
      icon: Trophy,
      title: 'Reputation System',
      description: 'Build your reputation by providing helpful answers and quality content.',
      color: 'text-primary'
    }
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Why Choose StackIt?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built by developers, for developers. Experience the difference with our modern approach to Q&A.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-card shadow-card hover:shadow-soft transition-all duration-300 group">
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};