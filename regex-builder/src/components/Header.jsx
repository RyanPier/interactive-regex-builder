import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Sun, 
  Moon, 
  Github, 
  Star,
  Menu,
  X
} from 'lucide-react';

const Header = ({ 
  isDarkMode, 
  setIsDarkMode, 
  stats = { totalMatches: 0, totalGroups: 0, coverage: 0 },
  isMenuOpen,
  setIsMenuOpen 
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gradient">
                Regex Builder
              </h1>
            </div>
            
            {/* Stats - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-4">
              {stats.totalMatches > 0 && (
                <>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {stats.totalMatches} matches
                  </Badge>
                  {stats.totalGroups > 0 && (
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      {stats.totalGroups} groups
                    </Badge>
                  )}
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {stats.coverage}% coverage
                  </Badge>
                </>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-muted-foreground" />
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                aria-label="Toggle dark mode"
                className="data-[state=checked]:bg-blue-600"
              />
              <Moon className="h-4 w-4 text-muted-foreground" />
            </div>

            {/* GitHub Link */}
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="interactive-button"
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <Github className="h-4 w-4" />
                <span className="hidden lg:inline">GitHub</span>
              </a>
            </Button>

            {/* Star Button */}
            <Button
              variant="outline"
              size="sm"
              className="interactive-button"
            >
              <Star className="h-4 w-4 mr-2" />
              <span className="hidden lg:inline">Star</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="interactive-button"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <div className="px-2 pt-2 pb-3 space-y-3">
              {/* Mobile Stats */}
              {stats.totalMatches > 0 && (
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {stats.totalMatches} matches
                  </Badge>
                  {stats.totalGroups > 0 && (
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      {stats.totalGroups} groups
                    </Badge>
                  )}
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {stats.coverage}% coverage
                  </Badge>
                </div>
              )}

              {/* Mobile Theme Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Dark Mode</span>
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4 text-muted-foreground" />
                  <Switch
                    checked={isDarkMode}
                    onCheckedChange={setIsDarkMode}
                    aria-label="Toggle dark mode"
                    className="data-[state=checked]:bg-blue-600"
                  />
                  <Moon className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              {/* Mobile Links */}
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="w-full justify-start interactive-button"
                >
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2"
                  >
                    <Github className="h-4 w-4" />
                    <span>View on GitHub</span>
                  </a>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start interactive-button"
                >
                  <Star className="h-4 w-4 mr-2" />
                  <span>Star this project</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
