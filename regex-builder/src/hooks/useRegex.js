import { useState, useEffect, useMemo } from 'react';

/**
 * Custom hook for regex processing and matching
 * Provides real-time regex validation, matching, and error handling
 */
export const useRegex = (pattern = '', flags = 'g', testString = '') => {
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(true);

  // Memoized regex object creation with error handling
  const regex = useMemo(() => {
    if (!pattern) {
      setError(null);
      setIsValid(true);
      return null;
    }

    try {
      const regexObj = new RegExp(pattern, flags);
      setError(null);
      setIsValid(true);
      return regexObj;
    } catch (err) {
      setError(err.message);
      setIsValid(false);
      return null;
    }
  }, [pattern, flags]);

  // Find all matches in the test string
  const matches = useMemo(() => {
    if (!regex || !testString || !isValid) {
      return [];
    }

    try {
      const matchResults = [];
      let match;
      
      // Handle global flag
      if (flags.includes('g')) {
        const globalRegex = new RegExp(pattern, flags);
        while ((match = globalRegex.exec(testString)) !== null) {
          matchResults.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
            namedGroups: match.groups || {},
            input: match.input,
            length: match[0].length
          });
          
          // Prevent infinite loop on zero-length matches
          if (match[0].length === 0) {
            globalRegex.lastIndex++;
          }
        }
      } else {
        // Single match
        match = testString.match(regex);
        if (match) {
          matchResults.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
            namedGroups: match.groups || {},
            input: match.input,
            length: match[0].length
          });
        }
      }

      return matchResults;
    } catch (err) {
      setError(err.message);
      return [];
    }
  }, [regex, testString, pattern, flags, isValid]);

  // Get match statistics
  const stats = useMemo(() => {
    return {
      totalMatches: matches.length,
      totalGroups: matches.reduce((acc, match) => acc + match.groups.length, 0),
      hasNamedGroups: matches.some(match => Object.keys(match.namedGroups).length > 0),
      coverage: testString.length > 0 ? 
        (matches.reduce((acc, match) => acc + match.length, 0) / testString.length * 100).toFixed(2) : 0
    };
  }, [matches, testString]);

  // Highlight matches in text with different colors for groups
  const getHighlightedText = useMemo(() => {
    if (!testString || matches.length === 0) {
      return testString;
    }

    // Sort matches by index to process them in order
    const sortedMatches = [...matches].sort((a, b) => a.index - b.index);
    
    let result = '';
    let lastIndex = 0;

    sortedMatches.forEach((match, matchIndex) => {
      // Add text before match
      result += testString.slice(lastIndex, match.index);
      
      // Add highlighted match
      const matchClass = `match-${matchIndex % 6}`; // Cycle through 6 colors
      result += `<span class="regex-match ${matchClass}" data-match-index="${matchIndex}">${match.match}</span>`;
      
      lastIndex = match.index + match.length;
    });

    // Add remaining text
    result += testString.slice(lastIndex);
    
    return result;
  }, [testString, matches]);

  // Test if string matches the pattern
  const test = (str) => {
    if (!regex || !isValid) return false;
    return regex.test(str);
  };

  // Replace matches with replacement string
  const replace = (replacement = '') => {
    if (!regex || !testString || !isValid) return testString;
    
    try {
      return testString.replace(regex, replacement);
    } catch (err) {
      setError(err.message);
      return testString;
    }
  };

  // Split string by regex
  const split = () => {
    if (!regex || !testString || !isValid) return [testString];
    
    try {
      return testString.split(regex);
    } catch (err) {
      setError(err.message);
      return [testString];
    }
  };

  return {
    regex,
    matches,
    error,
    isValid,
    stats,
    getHighlightedText,
    test,
    replace,
    split
  };
};

/**
 * Hook for managing regex flags
 */
export const useRegexFlags = (initialFlags = 'g') => {
  const [flags, setFlags] = useState(initialFlags);

  const toggleFlag = (flag) => {
    setFlags(prev => {
      if (prev.includes(flag)) {
        return prev.replace(flag, '');
      } else {
        return prev + flag;
      }
    });
  };

  const hasFlag = (flag) => flags.includes(flag);

  const flagDescriptions = {
    'g': 'Global - Find all matches',
    'i': 'Ignore case - Case insensitive matching',
    'm': 'Multiline - ^ and $ match line breaks',
    's': 'Dot all - . matches newlines',
    'u': 'Unicode - Full unicode support',
    'y': 'Sticky - Match from lastIndex only'
  };

  return {
    flags,
    setFlags,
    toggleFlag,
    hasFlag,
    flagDescriptions
  };
};

/**
 * Hook for regex pattern history and favorites
 */
export const useRegexHistory = () => {
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('regex-history') || '[]');
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('regex-favorites') || '[]');
    } catch {
      return [];
    }
  });

  const addToHistory = (pattern, flags, description = '') => {
    const entry = {
      id: Date.now(),
      pattern,
      flags,
      description,
      timestamp: new Date().toISOString()
    };

    setHistory(prev => {
      const filtered = prev.filter(item => item.pattern !== pattern || item.flags !== flags);
      const newHistory = [entry, ...filtered].slice(0, 50); // Keep last 50
      localStorage.setItem('regex-history', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const addToFavorites = (pattern, flags, description = '') => {
    const entry = {
      id: Date.now(),
      pattern,
      flags,
      description,
      timestamp: new Date().toISOString()
    };

    setFavorites(prev => {
      const exists = prev.some(item => item.pattern === pattern && item.flags === flags);
      if (exists) return prev;
      
      const newFavorites = [entry, ...prev];
      localStorage.setItem('regex-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const removeFromFavorites = (id) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(item => item.id !== id);
      localStorage.setItem('regex-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('regex-history');
  };

  return {
    history,
    favorites,
    addToHistory,
    addToFavorites,
    removeFromFavorites,
    clearHistory
  };
};
