import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Github, 
  Twitter, 
  Heart,
  Code,
  Zap,
  BookOpen,
  ExternalLink
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gradient">
                Regex Builder
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              A modern, interactive regular expression builder and tester with real-time feedback and beautiful UI.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>using React & Tailwind CSS</span>
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Features
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Code className="h-3 w-3 text-blue-500" />
                <span>Real-time regex validation</span>
              </li>
              <li className="flex items-center space-x-2">
                <Zap className="h-3 w-3 text-green-500" />
                <span>Live match highlighting</span>
              </li>
              <li className="flex items-center space-x-2">
                <BookOpen className="h-3 w-3 text-purple-500" />
                <span>Pattern explanation</span>
              </li>
              <li className="flex items-center space-x-2">
                <Heart className="h-3 w-3 text-pink-500" />
                <span>Group capture visualization</span>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-auto p-0 text-sm font-normal justify-start hover:text-blue-600"
                >
                  <a
                    href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2"
                  >
                    <span>MDN Regex Guide</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-auto p-0 text-sm font-normal justify-start hover:text-blue-600"
                >
                  <a
                    href="https://regexr.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2"
                  >
                    <span>RegExr</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-auto p-0 text-sm font-normal justify-start hover:text-blue-600"
                >
                  <a
                    href="https://regex101.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2"
                  >
                    <span>Regex101</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-auto p-0 text-sm font-normal justify-start hover:text-blue-600"
                >
                  <a
                    href="https://regexpal.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2"
                  >
                    <span>RegexPal</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Connect
            </h4>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="interactive-button"
              >
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="interactive-button"
              >
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              <p>Open source and free to use</p>
              <p>Contributions welcome!</p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {currentYear} Interactive Regex Builder. Built with modern web technologies.
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-sm font-normal hover:text-blue-600"
            >
              Privacy Policy
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-sm font-normal hover:text-blue-600"
            >
              Terms of Service
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-sm font-normal hover:text-blue-600"
            >
              About
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
