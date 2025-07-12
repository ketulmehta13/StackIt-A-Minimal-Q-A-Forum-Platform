import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-foreground">StackIt</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                className="pl-10 bg-muted/50 border-muted-foreground/20 focus:border-primary"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/questions">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Questions
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Dashboard
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Profile
              </Button>
            </Link>
            <Link to="/ask">
              <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
                Ask Question
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                className="pl-10 bg-muted/50 border-muted-foreground/20"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Link to="/questions">
                <Button variant="ghost" className="w-full justify-start">
                  Questions
                </Button>
              </Link>
              <Link to="/ask">
                <Button className="w-full bg-gradient-primary text-primary-foreground">
                  Ask Question
                </Button>
              </Link>
              <div className="flex items-center justify-between">
                <Button variant="ghost" className="flex-1">
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};