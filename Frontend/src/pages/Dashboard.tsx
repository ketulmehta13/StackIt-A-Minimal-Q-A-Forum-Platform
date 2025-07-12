import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  TrendingUp, 
  Award, 
  Clock, 
  Users, 
  Star,
  ChevronRight,
  Calendar,
  Tag,
  ArrowUp,
  ArrowDown,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('week');

  const userStats = {
    questions: 24,
    answers: 67,
    reputation: 1247,
    acceptedAnswers: 23,
    upvotes: 156,
    badges: 8
  };

  const recentQuestions = [
    {
      id: 1,
      title: "How to implement JWT authentication in React?",
      votes: 12,
      answers: 3,
      views: 245,
      tags: ["React", "JWT", "Authentication"],
      status: "answered",
      timeAgo: "2 hours ago"
    },
    {
      id: 2,
      title: "Best practices for TypeScript error handling",
      votes: 8,
      answers: 1,
      views: 156,
      tags: ["TypeScript", "Error Handling"],
      status: "open",
      timeAgo: "1 day ago"
    },
    {
      id: 3,
      title: "Optimizing React performance with useMemo",
      votes: 15,
      answers: 5,
      views: 387,
      tags: ["React", "Performance", "Hooks"],
      status: "answered",
      timeAgo: "3 days ago"
    }
  ];

  const recentActivity = [
    {
      type: "answer",
      title: "Answered: How to center a div in CSS?",
      points: "+15",
      timeAgo: "30 minutes ago",
      icon: MessageSquare
    },
    {
      type: "upvote",
      title: "Your answer was upvoted",
      points: "+10",
      timeAgo: "2 hours ago",
      icon: ArrowUp
    },
    {
      type: "accepted",
      title: "Your answer was accepted",
      points: "+15",
      timeAgo: "4 hours ago",
      icon: CheckCircle
    },
    {
      type: "question",
      title: "Asked: JWT authentication in React",
      points: "+5",
      timeAgo: "2 hours ago",
      icon: MessageSquare
    }
  ];

  const achievements = [
    { name: "First Question", description: "Asked your first question", earned: true },
    { name: "Helpful Answer", description: "Got 10 upvotes on an answer", earned: true },
    { name: "Popular Question", description: "Question viewed 1000+ times", earned: false },
    { name: "Guru", description: "Reached 1000 reputation", earned: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your activity summary.</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button
              variant={timeRange === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('week')}
            >
              This Week
            </Button>
            <Button
              variant={timeRange === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('month')}
            >
              This Month
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Stats Cards */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <Card className="p-4 bg-card shadow-card hover:shadow-soft transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{userStats.questions}</p>
                    <p className="text-xs text-muted-foreground">Questions</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-card shadow-card hover:shadow-soft transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{userStats.answers}</p>
                    <p className="text-xs text-muted-foreground">Answers</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-card shadow-card hover:shadow-soft transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{userStats.reputation}</p>
                    <p className="text-xs text-muted-foreground">Reputation</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-card shadow-card hover:shadow-soft transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{userStats.acceptedAnswers}</p>
                    <p className="text-xs text-muted-foreground">Accepted</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-card shadow-card hover:shadow-soft transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                    <ArrowUp className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{userStats.upvotes}</p>
                    <p className="text-xs text-muted-foreground">Upvotes</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-card shadow-card hover:shadow-soft transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-primary/20 rounded-lg flex items-center justify-center">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{userStats.badges}</p>
                    <p className="text-xs text-muted-foreground">Badges</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Recent Questions */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Your Recent Questions</CardTitle>
                  <Link to="/questions">
                    <Button variant="ghost" size="sm">
                      View All <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentQuestions.map((question) => (
                  <div key={question.id} className="p-4 bg-background/50 rounded-lg border border-border/50">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-medium text-foreground leading-snug pr-4">
                        {question.title}
                      </h3>
                      <Badge 
                        variant={question.status === 'answered' ? 'default' : 'secondary'}
                        className="shrink-0"
                      >
                        {question.status}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {question.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <span>{question.votes} votes</span>
                        <span>{question.answers} answers</span>
                        <span>{question.views} views</span>
                      </div>
                      <span>{question.timeAgo}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Activity Feed & Achievements */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activity */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <CardDescription>Your latest contributions and achievements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-background/50 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-primary/20 rounded-lg flex items-center justify-center">
                      <activity.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.timeAgo}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {activity.points}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Achievements</CardTitle>
                <CardDescription>Badges and milestones you've unlocked</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-background/50 rounded-lg">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      achievement.earned 
                        ? 'bg-gradient-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <Award className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        achievement.earned ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {achievement.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;