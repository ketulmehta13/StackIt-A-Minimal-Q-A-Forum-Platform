import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { Eye, EyeOff, Github, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios'; // Import axios

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { toast } = useToast();
  const navigate = useNavigate(); // Initialize useNavigate

  // Define your backend API base URL
  const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Or your deployed backend URL

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/accounts/login/`, {
        email: formData.email,
        password: formData.password,
      });

      // Assuming your backend returns a token upon successful login
      const { token, user_id, username, email } = response.data;

      // Store the token and user info (e.g., in localStorage or a state management solution)
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', user_id);
      localStorage.setItem('username', username);
      localStorage.setItem('userEmail', email);

      toast({
        title: "Login Successful",
        description: "Welcome back to StackIt!",
        variant: "default", // or "success" if you have a custom success variant
      });

      // Redirect to a dashboard or home page after successful login
      navigate('/dashboard'); // Adjust this path as needed

    } catch (error: any) {
      console.error('Login error:', error);
      let errorMessage = "An unexpected error occurred. Please try again.";

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.data && typeof error.response.data === 'object') {
          // Check for specific error messages from your backend serializer
          if (error.response.data.detail) {
            errorMessage = error.response.data.detail;
          } else if (error.response.data.non_field_errors) {
            errorMessage = error.response.data.non_field_errors[0];
          } else if (error.response.data.email) {
            errorMessage = error.response.data.email[0];
          } else if (error.response.data.password) {
            errorMessage = error.response.data.password[0];
          } else {
            // General case for other field-specific errors
            errorMessage = Object.values(error.response.data).flat().join(', ');
          }
        } else if (error.response.status === 400) {
            errorMessage = "Invalid email or password.";
        } else {
            errorMessage = `Login failed: ${error.response.statusText}`;
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "No response from server. Please check your internet connection.";
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message;
      }

      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} Login`,
      description: `${provider} authentication would be implemented here.`,
    });
    // In a real application, you'd redirect to a backend endpoint for OAuth
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card className="shadow-soft border-border/50 bg-card/80 backdrop-blur">
            <CardHeader className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-primary-foreground font-bold text-2xl">S</span>
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Sign in to your StackIt account
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Social Login Buttons */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSocialLogin('Google')}
                  type="button"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSocialLogin('GitHub')}
                  type="button"
                >
                  <Github className="h-4 w-4 mr-2" />
                  Continue with GitHub
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="bg-background/50 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    <Label htmlFor="remember" className="text-sm">Remember me</Label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:text-primary-glow transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-primary text-primary-foreground shadow-soft hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link
                    to="/signup"
                    className="text-primary hover:text-primary-glow font-medium transition-colors"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;