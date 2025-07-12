import { Link } from 'react-router-dom';
import { MessageSquare, Users, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const HeroSection = () => {
  const stats = [
    { icon: MessageSquare, label: 'Questions', value: '10.2K' },
    { icon: Users, label: 'Developers', value: '2.5K' },
    { icon: Award, label: 'Answers', value: '15.8K' },
    { icon: TrendingUp, label: 'Resolved', value: '85%' },
  ];

  return (
    <section className="relative py-20 px-4 bg-gradient-hero">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-8">
          {/* Main Hero Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Every Developer
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Deserves Answers
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join thousands of developers sharing knowledge, solving problems, and building the future together.
              Ask questions, share solutions, and grow your skills.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/ask">
              <Button size="lg" className="bg-gradient-primary text-primary-foreground shadow-soft hover:opacity-90 px-8 py-3">
                Ask Your Question
              </Button>
            </Link>
            <Link to="/questions">
              <Button size="lg" variant="outline" className="px-8 py-3">
                Browse Questions
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center bg-card/50 backdrop-blur border-border/50 shadow-card hover:shadow-soft transition-all duration-300">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-glow/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
};