import { useState } from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Link as LinkIcon, 
  Github, 
  Twitter, 
  Edit3,
  Save,
  X,
  Camera,
  Award,
  MessageSquare,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/Navbar';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: 'johndoe',
    displayName: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Full-stack developer passionate about React, Node.js, and clean code. Always excited to help fellow developers solve challenging problems.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    github: 'johndoe',
    twitter: 'johndoe_dev',
    joinDate: 'January 2023'
  });
  const { toast } = useToast();

  const userStats = {
    reputation: 1247,
    questions: 24,
    answers: 67,
    badges: 8,
    upvotes: 156,
    acceptedAnswers: 23
  };

  const recentQuestions = [
    {
      id: 1,
      title: "How to implement JWT authentication in React?",
      votes: 12,
      answers: 3,
      status: "answered",
      timeAgo: "2 hours ago",
      tags: ["React", "JWT", "Authentication"]
    },
    {
      id: 2,
      title: "Best practices for TypeScript error handling",
      votes: 8,
      answers: 1,
      status: "open",
      timeAgo: "1 day ago",
      tags: ["TypeScript", "Error Handling"]
    },
    {
      id: 3,
      title: "Optimizing React performance with useMemo",
      votes: 15,
      answers: 5,
      status: "answered",
      timeAgo: "3 days ago",
      tags: ["React", "Performance"]
    }
  ];

  const badges = [
    { name: "First Question", type: "bronze", description: "Asked your first question" },
    { name: "Helpful Answer", type: "silver", description: "Got 10 upvotes on an answer" },
    { name: "Guru", type: "gold", description: "Reached 1000 reputation" },
    { name: "Commentator", type: "bronze", description: "Left 10 comments" },
    { name: "Popular Question", type: "silver", description: "Question viewed 1000+ times" },
    { name: "Teacher", type: "bronze", description: "Answer score of 1 or more" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data if needed
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'gold':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'silver':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'bronze':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="shadow-card mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Avatar Section */}
              <div className="relative group">
                <Avatar className="w-32 h-32">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-2xl bg-gradient-primary text-primary-foreground">
                    {profileData.displayName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                    onClick={() => toast({ title: "Photo Upload", description: "Photo upload would be implemented here." })}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    {isEditing ? (
                      <div className="space-y-2">
                        <Input
                          value={profileData.displayName}
                          onChange={(e) => handleInputChange('displayName', e.target.value)}
                          className="text-2xl font-bold bg-background/50"
                        />
                        <Input
                          value={profileData.username}
                          onChange={(e) => handleInputChange('username', e.target.value)}
                          className="bg-background/50"
                          placeholder="@username"
                        />
                      </div>
                    ) : (
                      <>
                        <h1 className="text-3xl font-bold text-foreground">{profileData.displayName}</h1>
                        <p className="text-lg text-muted-foreground">@{profileData.username}</p>
                      </>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button onClick={handleSave} size="sm">
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button onClick={handleCancel} variant="outline" size="sm">
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>

                {/* Bio */}
                {isEditing ? (
                  <Textarea
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="bg-background/50"
                    rows={3}
                  />
                ) : (
                  <p className="text-muted-foreground leading-relaxed">{profileData.bio}</p>
                )}

                {/* Contact Info */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {profileData.joinDate}</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4">
                  {profileData.website && (
                    <a href={profileData.website} className="flex items-center gap-1 text-primary hover:text-primary-glow transition-colors">
                      <LinkIcon className="h-4 w-4" />
                      <span className="text-sm">Website</span>
                    </a>
                  )}
                  {profileData.github && (
                    <a href={`https://github.com/${profileData.github}`} className="flex items-center gap-1 text-primary hover:text-primary-glow transition-colors">
                      <Github className="h-4 w-4" />
                      <span className="text-sm">GitHub</span>
                    </a>
                  )}
                  {profileData.twitter && (
                    <a href={`https://twitter.com/${profileData.twitter}`} className="flex items-center gap-1 text-primary hover:text-primary-glow transition-colors">
                      <Twitter className="h-4 w-4" />
                      <span className="text-sm">Twitter</span>
                    </a>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <div className="text-xl font-bold text-foreground">{userStats.reputation}</div>
                    <div className="text-xs text-muted-foreground">Reputation</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-foreground">{userStats.questions}</div>
                    <div className="text-xs text-muted-foreground">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-foreground">{userStats.answers}</div>
                    <div className="text-xs text-muted-foreground">Answers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-foreground">{userStats.badges}</div>
                    <div className="text-xs text-muted-foreground">Badges</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-foreground">{userStats.upvotes}</div>
                    <div className="text-xs text-muted-foreground">Upvotes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-foreground">{userStats.acceptedAnswers}</div>
                    <div className="text-xs text-muted-foreground">Accepted</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="activity" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="answers">Answers</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest questions and answers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentQuestions.map((question) => (
                  <div key={question.id} className="p-4 bg-background/50 rounded-lg border border-border/50">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-medium text-foreground leading-snug pr-4">
                        {question.title}
                      </h3>
                      <Badge variant={question.status === 'answered' ? 'default' : 'secondary'}>
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
                      </div>
                      <span>{question.timeAgo}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Your Questions ({userStats.questions})</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">Questions list would be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="answers">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Your Answers ({userStats.answers})</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">Answers list would be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="badges">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Badges & Achievements</CardTitle>
                <CardDescription>Recognition for your contributions to the community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {badges.map((badge, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-background/50 rounded-lg border border-border/50">
                      <div className="w-12 h-12 bg-gradient-primary/20 rounded-lg flex items-center justify-center">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-foreground">{badge.name}</h3>
                          <Badge className={getBadgeColor(badge.type)}>
                            {badge.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;