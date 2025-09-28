import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { 
  Copy, 
  AlertCircle,
  CheckCircle,
  Zap,
  BookOpen,
  Target,
  Lightbulb,
  Timer,
  BarChart3,
  Code,
  FileText,
  Star,
  Download,
  RefreshCw
} from 'lucide-react';
import { useRegex, useRegexFlags, useRegexHistory } from '../hooks/useRegex';
import { useDebounce } from '../hooks/useDebounce';
import { 
  COMMON_PATTERNS, 
  SAMPLE_TEXTS, 
  explainRegex, 
  getComplexityScore,
  measureRegexPerformance,
  formatMatches
} from '../lib/regexUtils';
import Header from './Header';
import Footer from './Footer';

const ResponsiveRegexBuilder = () => {
  const [pattern, setPattern] = useState('');
  const [testString, setTestString] = useState(SAMPLE_TEXTS.mixed);
  const [replacement, setReplacement] = useState('');
  const [activeTab, setActiveTab] = useState('test');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPerformance, setShowPerformance] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState('');
  
  // Debounce pattern input for performance
  const debouncedPattern = useDebounce(pattern, 300);
  
  // Regex flags management
  const { flags, toggleFlag, hasFlag, flagDescriptions } = useRegexFlags('g');
  
  // Regex history management
  const { history, favorites, addToHistory, addToFavorites } = useRegexHistory();
  
  // Main regex processing
  const { 
    matches, 
    error, 
    isValid, 
    stats, 
    getHighlightedText, 
    replace 
  } = useRegex(debouncedPattern, flags, testString);

  // Performance measurement
  const [performance, setPerformance] = useState(null);
  
  useEffect(() => {
    if (debouncedPattern && isValid && testString) {
      const perf = measureRegexPerformance(debouncedPattern, flags, testString, 100);
      setPerformance(perf);
    }
  }, [debouncedPattern, flags, testString, isValid]);

  // Theme toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle pattern input changes
  const handlePatternChange = (e) => {
    const newPattern = e.target.value;
    setPattern(newPattern);
    
    // Add to history if valid and not empty
    if (newPattern && newPattern.length > 2) {
      addToHistory(newPattern, flags);
    }
  };

  // Handle test string changes
  const handleTestStringChange = (e) => {
    setTestString(e.target.value);
  };

  // Load common pattern
  const loadCommonPattern = (patternKey) => {
    const commonPattern = COMMON_PATTERNS[patternKey];
    setPattern(commonPattern.pattern);
  };

  // Load sample text
  const loadSampleText = (textKey) => {
    setTestString(SAMPLE_TEXTS[textKey]);
  };

  // Copy to clipboard with feedback
  const copyToClipboard = async (text, label = 'Text') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback(`${label} copied!`);
      setTimeout(() => setCopyFeedback(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setCopyFeedback('Failed to copy');
      setTimeout(() => setCopyFeedback(''), 2000);
    }
  };

  // Get replacement preview
  const replacementPreview = replacement ? replace(replacement) : '';
  
  // Get complexity score
  const complexityScore = getComplexityScore(debouncedPattern);
  
  // Get explanation
  const explanation = explainRegex(debouncedPattern);
  
  // Format matches for display
  const formattedMatches = formatMatches(matches);

  // Clear all inputs
  const clearAll = () => {
    setPattern('');
    setTestString('');
    setReplacement('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300 dark-mode-transition">
      {/* Header */}
      <Header 
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        stats={stats}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient fade-in">
            Interactive Regex Builder & Tester
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto slide-up">
            Build, test, and debug regular expressions with real-time feedback and beautiful visualizations
          </p>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={clearAll}
              className="interactive-button"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Clear All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(pattern, 'Pattern')}
              disabled={!pattern}
              className="interactive-button"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Pattern
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addToFavorites(pattern, flags)}
              disabled={!pattern || !isValid}
              className="interactive-button"
            >
              <Star className="h-4 w-4 mr-2" />
              Save Pattern
            </Button>
          </div>

          {/* Copy Feedback */}
          {copyFeedback && (
            <div className="inline-block">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 bounce-in">
                {copyFeedback}
              </Badge>
            </div>
          )}
        </div>

        {/* Performance Banner */}
        {performance && showPerformance && (
          <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950 interactive-card">
            <Timer className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>
                Performance: {performance.performance} - Average execution time: {performance.averageTime}ms
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPerformance(false)}
                className="h-6 w-6 p-0 ml-2"
              >
                ×
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-grid">
          {/* Left Pane - Regex Input */}
          <Card className="interactive-card glass-effect shadow-lg border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-500" />
                Regular Expression
                {complexityScore > 0 && (
                  <Badge variant="outline" className="ml-auto">
                    Complexity: {complexityScore}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Pattern Input */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium">Pattern:</Label>
                  {isValid ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                  {performance && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPerformance(!showPerformance)}
                      className="h-6 w-6 p-0 interactive-button"
                      title="Show performance metrics"
                    >
                      <BarChart3 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <div className="relative">
                  <div className="flex items-center border rounded-md bg-background focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 transition-all">
                    <span className="px-3 py-2 text-muted-foreground font-mono">/</span>
                    <Input
                      value={pattern}
                      onChange={handlePatternChange}
                      placeholder="Enter your regular expression..."
                      className="border-0 font-mono text-sm focus-visible:ring-0 focus-enhanced"
                    />
                    <span className="px-3 py-2 text-muted-foreground font-mono">/{flags}</span>
                  </div>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <Alert variant="destructive" className="animate-in slide-in-from-top-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Flags */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Flags:</Label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(flagDescriptions).map(([flag, description]) => (
                    <Button
                      key={flag}
                      variant={hasFlag(flag) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFlag(flag)}
                      className="h-8 text-xs interactive-button"
                      title={description}
                    >
                      {flag}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Common Patterns */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Common Patterns:</Label>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(COMMON_PATTERNS).slice(0, 6).map(([key, pattern]) => (
                    <Button
                      key={key}
                      variant="outline"
                      size="sm"
                      onClick={() => loadCommonPattern(key)}
                      className="text-xs justify-start interactive-button mobile-reduce-padding"
                      title={`Pattern: ${pattern.pattern}`}
                    >
                      <Code className="h-3 w-3 mr-2 flex-shrink-0" />
                      <span className="truncate">{pattern.description}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Stats */}
              {isValid && pattern && (
                <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2">
                  <div className="text-center p-2 sm:p-3 bg-blue-50 dark:bg-blue-950 rounded-lg interactive-card">
                    <div className="text-lg sm:text-2xl font-bold text-blue-600">{stats.totalMatches}</div>
                    <div className="text-xs text-muted-foreground">Matches</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-purple-50 dark:bg-purple-950 rounded-lg interactive-card">
                    <div className="text-lg sm:text-2xl font-bold text-purple-600">{stats.totalGroups}</div>
                    <div className="text-xs text-muted-foreground">Groups</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-green-50 dark:bg-green-950 rounded-lg interactive-card">
                    <div className="text-lg sm:text-2xl font-bold text-green-600">{stats.coverage}%</div>
                    <div className="text-xs text-muted-foreground">Coverage</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right Pane - Test String */}
          <Card className="interactive-card glass-effect shadow-lg border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-500" />
                Test String
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Sample Text Buttons */}
              <div className="flex flex-wrap gap-2">
                {Object.keys(SAMPLE_TEXTS).map((key) => (
                  <Button
                    key={key}
                    variant="outline"
                    size="sm"
                    onClick={() => loadSampleText(key)}
                    className="text-xs capitalize interactive-button mobile-reduce-padding"
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    {key}
                  </Button>
                ))}
              </div>

              {/* Test String Input */}
              <Textarea
                value={testString}
                onChange={handleTestStringChange}
                placeholder="Enter your test string here..."
                className="min-h-[200px] font-mono text-sm custom-scrollbar focus-enhanced resize-none"
              />

              {/* Coverage Progress */}
              {stats.coverage > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Coverage:</span>
                    <Badge variant="secondary">{stats.coverage}%</Badge>
                  </div>
                  <Progress value={parseFloat(stats.coverage)} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <Card className="interactive-card glass-effect shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-500" />
              Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6">
                <TabsTrigger value="test" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">Matches</span>
                  <span className="xs:hidden">Match</span>
                </TabsTrigger>
                <TabsTrigger value="replace" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <Code className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">Replace</span>
                  <span className="xs:hidden">Repl</span>
                </TabsTrigger>
                <TabsTrigger value="groups" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <Target className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Groups</span>
                </TabsTrigger>
                <TabsTrigger value="explain" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <Lightbulb className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">Explain</span>
                  <span className="xs:hidden">Info</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="test" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Highlighted Matches ({stats.totalMatches})
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(getHighlightedText.replace(/<[^>]*>/g, ''), 'Matches')}
                      className="interactive-button"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Copy Text</span>
                      <span className="sm:hidden">Copy</span>
                    </Button>
                  </div>
                  <div 
                    className="p-4 bg-muted rounded-md font-mono text-sm whitespace-pre-wrap min-h-[100px] border custom-scrollbar max-h-[300px] overflow-y-auto"
                    dangerouslySetInnerHTML={{ __html: getHighlightedText }}
                  />
                </div>
              </TabsContent>

              <TabsContent value="replace" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Replacement String:</Label>
                  <Input
                    value={replacement}
                    onChange={(e) => setReplacement(e.target.value)}
                    placeholder="Enter replacement string (use $1, $2 for groups)..."
                    className="font-mono focus-enhanced"
                  />
                </div>
                {replacement && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Preview:</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(replacementPreview, 'Replacement')}
                        className="interactive-button"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Copy Result</span>
                        <span className="sm:hidden">Copy</span>
                      </Button>
                    </div>
                    <div className="p-4 bg-muted rounded-md font-mono text-sm whitespace-pre-wrap min-h-[100px] border custom-scrollbar max-h-[300px] overflow-y-auto">
                      {replacementPreview}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="groups" className="space-y-4 mt-6">
                {formattedMatches.length > 0 ? (
                  <div className="space-y-4">
                    {formattedMatches.map((match) => (
                      <Card key={match.id} className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 interactive-card">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="bg-white dark:bg-slate-800">
                              Match {match.id + 1}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Position: {match.position} | Length: {match.length}
                            </span>
                          </div>
                          <div className="font-mono text-sm bg-white dark:bg-slate-800 p-3 rounded border">
                            {match.text}
                          </div>
                          {match.groups.length > 0 && (
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">Capture Groups:</Label>
                              <div className="grid grid-cols-1 gap-2">
                                {match.groups.map((group) => (
                                  <div key={group.index} className="flex items-center gap-2 sm:gap-3 p-2 bg-white dark:bg-slate-800 rounded">
                                    <Badge variant="secondary" className="text-xs min-w-[2rem] flex-shrink-0">
                                      ${group.index}
                                    </Badge>
                                    <code className="bg-muted px-2 py-1 rounded text-xs flex-1 truncate">
                                      {group.value}
                                    </code>
                                    {group.name && (
                                      <Badge variant="outline" className="text-xs flex-shrink-0">
                                        {group.name}
                                      </Badge>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-12">
                    <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No matches found</p>
                    <p className="text-sm">Try adjusting your pattern or test string</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="explain" className="space-y-4 mt-6">
                <div className="space-y-6">
                  <Card className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 interactive-card">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="h-5 w-5 text-amber-600" />
                      <h4 className="font-medium">Pattern Explanation</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {pattern ? explanation : 'Enter a pattern to see explanation'}
                    </p>
                  </Card>
                  
                  {isValid && pattern && (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card className="p-3 sm:p-4 text-center bg-blue-50 dark:bg-blue-950 interactive-card">
                        <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">{stats.totalMatches}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">Total Matches</div>
                      </Card>
                      <Card className="p-3 sm:p-4 text-center bg-purple-50 dark:bg-purple-950 interactive-card">
                        <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-1">{stats.totalGroups}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">Capture Groups</div>
                      </Card>
                      <Card className="p-3 sm:p-4 text-center bg-green-50 dark:bg-green-950 interactive-card">
                        <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">{stats.coverage}%</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">Coverage</div>
                      </Card>
                      <Card className="p-3 sm:p-4 text-center bg-orange-50 dark:bg-orange-950 interactive-card">
                        <div className="text-xl sm:text-2xl font-bold text-orange-600 mb-1">{complexityScore}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">Complexity</div>
                      </Card>
                    </div>
                  )}

                  {performance && (
                    <Card className="p-4 bg-slate-50 dark:bg-slate-900 interactive-card">
                      <div className="flex items-center gap-2 mb-3">
                        <Timer className="h-5 w-5 text-slate-600" />
                        <h4 className="font-medium">Performance Metrics</h4>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="font-medium">Average Time</div>
                          <div className="text-muted-foreground">{performance.averageTime}ms</div>
                        </div>
                        <div>
                          <div className="font-medium">Total Time</div>
                          <div className="text-muted-foreground">{performance.totalTime}ms</div>
                        </div>
                        <div>
                          <div className="font-medium">Iterations</div>
                          <div className="text-muted-foreground">{performance.iterations}</div>
                        </div>
                        <div>
                          <div className="font-medium">Rating</div>
                          <div className="text-muted-foreground">{performance.performance}</div>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ResponsiveRegexBuilder;
