import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { Eye, EyeOff, Github, Mail, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios'; // Import axios

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
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

  const validateForm = () => {
    // Frontend validation for password match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return false;
    }

    // Frontend password strength validation (should ideally match backend)
    const password = formData.password;
    if (password.length < 8) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 8 characters long.",
        variant: "destructive"
      });
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      toast({
        title: "Weak Password",
        description: "Password must contain at least one uppercase letter.",
        variant: "destructive"
      });
      return false;
    }
    if (!/[a-z]/.test(password)) {
      toast({
        title: "Weak Password",
        description: "Password must contain at least one lowercase letter.",
        variant: "destructive"
      });
      return false;
    }
    if (!/\d/.test(password)) {
      toast({
        title: "Weak Password",
        description: "Password must contain at least one number.",
        variant: "destructive"
      });
      return false;
    }

    // Terms and conditions agreement
    if (!agreedToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return; // Run frontend validation first

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/accounts/register/`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword, // Send confirmPassword to backend for validation
      });

      // Assuming your backend returns a message and potentially a token upon successful registration
      const { message, token } = response.data;

      toast({
        title: "Account Created",
        description: message || "Welcome to StackIt! Please check your email to verify your account.",
        variant: "default", // or "success" if you have a custom success variant
      });

      // Optionally, store the token if the backend auto-logs in after registration
      if (token) {
        localStorage.setItem('authToken', token);
        // You might redirect to a dashboard immediately if auto-logged in
        // navigate('/dashboard');
      }

      // Redirect to login page after successful signup
      navigate('/login');

    } catch (error: any) {
      console.error('Signup error:', error);
      let errorMessage = "An unexpected error occurred. Please try again.";

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.data && typeof error.response.data === 'object') {
          // Check for specific error messages from your backend serializer
          if (error.response.data.password && error.response.data.password.length > 0) {
            // Prioritize password mismatch or strength errors
            errorMessage = error.response.data.password[0];
          } else if (error.response.data.email && error.response.data.email.length > 0) {
            errorMessage = error.response.data.email[0];
          } else if (error.response.data.username && error.response.data.username.length > 0) {
            errorMessage = error.response.data.username[0];
          } else if (error.response.data.non_field_errors && error.response.data.non_field_errors.length > 0) {
            errorMessage = error.response.data.non_field_errors[0];
          } else {
            // General case for other field-specific errors or detail messages
            errorMessage = Object.values(error.response.data).flat().join(', ');
          }
        } else if (error.response.status === 400) {
            errorMessage = "Please check your input. Some fields are invalid.";
        } else {
            errorMessage = `Signup failed: ${error.response.statusText}`;
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "No response from server. Please check your internet connection.";
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message;
      }

      toast({
        title: "Signup Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider: string) => {
    toast({
      title: `${provider} Signup`,
      description: `${provider} authentication would be implemented here.`,
    });
    // In a real application, you'd redirect to a backend endpoint for OAuth
  };

  const passwordRequirements = [
    { met: formData.password.length >= 8, text: 'At least 8 characters' },
    { met: /[A-Z]/.test(formData.password), text: 'One uppercase letter' },
    { met: /[a-z]/.test(formData.password), text: 'One lowercase letter' },
    { met: /\d/.test(formData.password), text: 'One number' },
  ];

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
                <CardTitle className="text-2xl font-bold">Join StackIt</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Create your account and start sharing knowledge
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Social Signup Buttons */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSocialSignup('Google')}
                  type="button"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSocialSignup('GitHub')}
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
                  <span className="bg-card px-2 text-muted-foreground">Or create account with email</span>
                </div>
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="bg-background/50"
                  />
                </div>

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
                      placeholder="Create a password"
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

                  {/* Password Requirements */}
                  {formData.password && (
                    <div className="space-y-1 mt-2">
                      {passwordRequirements.map((req, index) => (
                        <div key={index} className="flex items-center text-xs">
                          <Check
                            className={`h-3 w-3 mr-2 ${
                              req.met ? 'text-green-500' : 'text-muted-foreground'
                            }`}
                          />
                          <span className={req.met ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}>
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="bg-background/50 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary hover:text-primary-glow transition-colors">
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-primary hover:text-primary-glow transition-colors">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-primary text-primary-foreground shadow-soft hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-primary hover:text-primary-glow font-medium transition-colors"
                  >
                    Sign in
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

export default Signup;