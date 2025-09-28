import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  Zap
} from 'lucide-react';
import { useRegex, useRegexFlags } from '../hooks/useRegex';
import { useDebounce } from '../hooks/useDebounce';
import { COMMON_PATTERNS, SAMPLE_TEXTS } from '../lib/regexUtils';

const RegexBuilder = () => {
  const [pattern, setPattern] = useState('');
  const [testString, setTestString] = useState(SAMPLE_TEXTS.mixed);
  const [replacement, setReplacement] = useState('');
  const [activeTab, setActiveTab] = useState('test');
  
  // Debounce pattern input for performance
  const debouncedPattern = useDebounce(pattern, 300);
  
  // Regex flags management
  const { flags, toggleFlag, hasFlag, flagDescriptions } = useRegexFlags('g');
  
  // Main regex processing
  const { 
    matches, 
    error, 
    isValid, 
    stats, 
    getHighlightedText, 
    replace 
  } = useRegex(debouncedPattern, flags, testString);

  // Handle pattern input changes
  const handlePatternChange = (e) => {
    setPattern(e.target.value);
  };

  // Handle test string changes
  const handleTestStringChange = (e) => {
    setTestString(e.target.value);
  };

  // Load common pattern
  const loadCommonPattern = (patternKey) => {
    const commonPattern = COMMON_PATTERNS[patternKey];
    setPattern(commonPattern.pattern);
    setFlags(commonPattern.flags);
  };

  // Load sample text
  const loadSampleText = (textKey) => {
    setTestString(SAMPLE_TEXTS[textKey]);
  };

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Get replacement preview
  const replacementPreview = replacement ? replace(replacement) : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Interactive Regex Builder & Tester
          </h1>
          <p className="text-muted-foreground text-lg">
            Build, test, and debug regular expressions with real-time feedback
          </p>
        </div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Pane - Regex Input */}
          <Card className="h-fit">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-500" />
                Regular Expression
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Pattern Input */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Pattern:</span>
                  {isValid ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div className="relative">
                  <div className="flex items-center border rounded-md">
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
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Flags */}
              <div className="space-y-2">
                <span className="text-sm font-medium">Flags:</span>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(flagDescriptions).map(([flag, description]) => (
                    <Button
                      key={flag}
                      variant={hasFlag(flag) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFlag(flag)}
                      className="h-8 text-xs"
                      title={description}
                    >
                      {flag}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Common Patterns */}
              <div className="space-y-2">
                <span className="text-sm font-medium">Common Patterns:</span>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(COMMON_PATTERNS).slice(0, 6).map(([key, pattern]) => (
                    <Button
                      key={key}
                      variant="outline"
                      size="sm"
                      onClick={() => loadCommonPattern(key)}
                      className="text-xs justify-start"
                      title={pattern.description}
                    >
                      {pattern.description}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Stats */}
              {isValid && pattern && (
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.totalMatches}</div>
                    <div className="text-xs text-muted-foreground">Matches</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{stats.totalGroups}</div>
                    <div className="text-xs text-muted-foreground">Groups</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right Pane - Test String */}
          <Card className="h-fit">
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
                    className="text-xs capitalize"
                  >
                    {key}
                  </Button>
                ))}
              </div>

              {/* Test String Input */}
              <Textarea
                value={testString}
                onChange={handleTestStringChange}
                placeholder="Enter your test string here..."
                className="min-h-[200px] font-mono text-sm"
              />

              {/* Coverage Info */}
              {stats.coverage > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Coverage:</span>
                  <Badge variant="secondary">{stats.coverage}%</Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="test">Matches</TabsTrigger>
                <TabsTrigger value="replace">Replace</TabsTrigger>
                <TabsTrigger value="groups">Groups</TabsTrigger>
                <TabsTrigger value="explain">Explain</TabsTrigger>
              </TabsList>

              <TabsContent value="test" className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Highlighted Matches ({stats.totalMatches})
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(getHighlightedText)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <div 
                    className="p-4 bg-muted rounded-md font-mono text-sm whitespace-pre-wrap min-h-[100px] border"
                    dangerouslySetInnerHTML={{ __html: getHighlightedText }}
                  />
                </div>
              </TabsContent>

              <TabsContent value="replace" className="space-y-4">
                <div className="space-y-2">
                  <span className="text-sm font-medium">Replacement String:</span>
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
                      <span className="text-sm font-medium">Preview:</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(replacementPreview)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                    <div className="p-4 bg-muted rounded-md font-mono text-sm whitespace-pre-wrap min-h-[100px] border">
                      {replacementPreview}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="groups" className="space-y-4">
                {matches.length > 0 ? (
                  <div className="space-y-4">
                    {matches.map((match, index) => (
                      <Card key={index} className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline">Match {index + 1}</Badge>
                            <span className="text-xs text-muted-foreground">
                              Position: {match.index}-{match.index + match.length - 1}
                            </span>
                          </div>
                          <div className="font-mono text-sm bg-muted p-2 rounded">
                            {match.match}
                          </div>
                          {match.groups.length > 0 && (
                            <div className="space-y-1">
                              <span className="text-sm font-medium">Groups:</span>
                              {match.groups.map((group, groupIndex) => (
                                <div key={groupIndex} className="flex items-center gap-2 text-sm">
                                  <Badge variant="secondary" className="text-xs">
                                    ${groupIndex + 1}
                                  </Badge>
                                  <code className="bg-muted px-2 py-1 rounded text-xs">
                                    {group || '(empty)'}
                                  </code>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    No matches found
                  </div>
                )}
              </TabsContent>

              <TabsContent value="explain" className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-md">
                    <h4 className="font-medium mb-2">Pattern Analysis:</h4>
                    <p className="text-sm text-muted-foreground">
                      {pattern ? `Pattern: /${pattern}/${flags}` : 'No pattern entered'}
                    </p>
                  </div>
                  
                  {isValid && pattern && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{stats.totalMatches}</div>
                          <div className="text-sm text-muted-foreground">Total Matches</div>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{stats.totalGroups}</div>
                          <div className="text-sm text-muted-foreground">Capture Groups</div>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{stats.coverage}%</div>
                          <div className="text-sm text-muted-foreground">Coverage</div>
                        </div>
                      </Card>
                    </div>
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

export default RegexBuilder;
