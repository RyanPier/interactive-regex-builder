import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Copy, 
  Download, 
  Settings, 
  BookOpen, 
  History,
  Star,
  AlertCircle,
  CheckCircle,
  Zap,
  Moon,
  Sun,
  Code,
  FileText,
  Lightbulb,
  Target,
  Timer,
  BarChart3
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

const EnhancedRegexBuilder = () => {
  const [pattern, setPattern] = useState('');
  const [testString, setTestString] = useState(SAMPLE_TEXTS.mixed);
  const [replacement, setReplacement] = useState('');
  const [activeTab, setActiveTab] = useState('test');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPerformance, setShowPerformance] = useState(false);
  
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
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // Could add toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Header with Theme Toggle */}
        <div className="flex items-center justify-between">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Interactive Regex Builder & Tester
            </h1>
            <p className="text-muted-foreground text-lg">
              Build, test, and debug regular expressions with real-time feedback
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              aria-label="Toggle dark mode"
            />
            <Moon className="h-4 w-4" />
          </div>
        </div>

        {/* Performance Banner */}
        {performance && showPerformance && (
          <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
            <Timer className="h-4 w-4" />
            <AlertDescription>
              Performance: {performance.performance} - Average execution time: {performance.averageTime}ms
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPerformance(false)}
                className="ml-2 h-6 w-6 p-0"
              >
                ×
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Pane - Regex Input */}
          <Card className="h-fit shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
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
                      className="h-6 w-6 p-0"
                    >
                      <BarChart3 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <div className="relative">
                  <div className="flex items-center border rounded-md bg-background">
                    <span className="px-3 py-2 text-muted-foreground font-mono">/</span>
                    <Input
                      value={pattern}
                      onChange={handlePatternChange}
                      placeholder="Enter your regular expression..."
                      className="border-0 font-mono text-sm focus-visible:ring-0"
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
                      className="h-8 text-xs transition-all duration-200 hover:scale-105"
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
                      className="text-xs justify-start hover:bg-accent transition-colors"
                      title={`Pattern: ${pattern.pattern}`}
                    >
                      <Code className="h-3 w-3 mr-2" />
                      {pattern.description}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Stats */}
              {isValid && pattern && (
                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{stats.totalMatches}</div>
                    <div className="text-xs text-muted-foreground">Matches</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{stats.totalGroups}</div>
                    <div className="text-xs text-muted-foreground">Groups</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{stats.coverage}%</div>
                    <div className="text-xs text-muted-foreground">Coverage</div>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(pattern)}
                  disabled={!pattern}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Pattern
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addToFavorites(pattern, flags)}
                  disabled={!pattern || !isValid}
                >
                  <Star className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Right Pane - Test String */}
          <Card className="h-fit shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
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
                    className="text-xs capitalize hover:bg-accent transition-colors"
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
                className="min-h-[200px] font-mono text-sm custom-scrollbar"
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
        <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-500" />
              Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="test" className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Matches
                </TabsTrigger>
                <TabsTrigger value="replace" className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  Replace
                </TabsTrigger>
                <TabsTrigger value="groups" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Groups
                </TabsTrigger>
                <TabsTrigger value="explain" className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Explain
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
                      onClick={() => copyToClipboard(getHighlightedText.replace(/<[^>]*>/g, ''))}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Text
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
                    className="font-mono"
                  />
                </div>
                {replacement && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Preview:</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(replacementPreview)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Result
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
                      <Card key={match.id} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
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
                                  <div key={group.index} className="flex items-center gap-3 p-2 bg-white dark:bg-slate-800 rounded">
                                    <Badge variant="secondary" className="text-xs min-w-[2rem]">
                                      ${group.index}
                                    </Badge>
                                    <code className="bg-muted px-2 py-1 rounded text-xs flex-1">
                                      {group.value}
                                    </code>
                                    {group.name && (
                                      <Badge variant="outline" className="text-xs">
                                        {group.name}
                                      </Badge>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {match.namedGroups.length > 0 && (
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">Named Groups:</Label>
                              <div className="grid grid-cols-1 gap-2">
                                {match.namedGroups.map((group, idx) => (
                                  <div key={idx} className="flex items-center gap-3 p-2 bg-white dark:bg-slate-800 rounded">
                                    <Badge variant="default" className="text-xs">
                                      {group.name}
                                    </Badge>
                                    <code className="bg-muted px-2 py-1 rounded text-xs flex-1">
                                      {group.value}
                                    </code>
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
                    <p>No matches found</p>
                    <p className="text-sm">Try adjusting your pattern or test string</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="explain" className="space-y-4 mt-6">
                <div className="space-y-6">
                  <Card className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="h-5 w-5 text-amber-600" />
                      <h4 className="font-medium">Pattern Explanation</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {pattern ? explanation : 'Enter a pattern to see explanation'}
                    </p>
                  </Card>
                  
                  {isValid && pattern && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card className="p-4 text-center bg-blue-50 dark:bg-blue-950">
                        <div className="text-2xl font-bold text-blue-600 mb-1">{stats.totalMatches}</div>
                        <div className="text-sm text-muted-foreground">Total Matches</div>
                      </Card>
                      <Card className="p-4 text-center bg-purple-50 dark:bg-purple-950">
                        <div className="text-2xl font-bold text-purple-600 mb-1">{stats.totalGroups}</div>
                        <div className="text-sm text-muted-foreground">Capture Groups</div>
                      </Card>
                      <Card className="p-4 text-center bg-green-50 dark:bg-green-950">
                        <div className="text-2xl font-bold text-green-600 mb-1">{stats.coverage}%</div>
                        <div className="text-sm text-muted-foreground">Coverage</div>
                      </Card>
                      <Card className="p-4 text-center bg-orange-50 dark:bg-orange-950">
                        <div className="text-2xl font-bold text-orange-600 mb-1">{complexityScore}</div>
                        <div className="text-sm text-muted-foreground">Complexity</div>
                      </Card>
                    </div>
                  )}

                  {performance && (
                    <Card className="p-4 bg-slate-50 dark:bg-slate-900">
                      <div className="flex items-center gap-2 mb-3">
                        <Timer className="h-5 w-5 text-slate-600" />
                        <h4 className="font-medium">Performance Metrics</h4>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
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
      </div>
    </div>
  );
};

export default EnhancedRegexBuilder;
