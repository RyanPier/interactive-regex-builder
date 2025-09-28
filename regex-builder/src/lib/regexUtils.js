/**
 * Utility functions for regex processing and text manipulation
 */

/**
 * Common regex patterns for quick access
 */
export const COMMON_PATTERNS = {
  email: {
    pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
    description: 'Email addresses',
    flags: 'g'
  },
  url: {
    pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
    description: 'URLs (HTTP/HTTPS)',
    flags: 'g'
  },
  phone: {
    pattern: '(\\+?1[-. ]?)?\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})',
    description: 'US phone numbers',
    flags: 'g'
  },
  ipv4: {
    pattern: '\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b',
    description: 'IPv4 addresses',
    flags: 'g'
  },
  date: {
    pattern: '\\b(0?[1-9]|1[0-2])[\\/\\-](0?[1-9]|[12][0-9]|3[01])[\\/\\-](19|20)\\d{2}\\b',
    description: 'Dates (MM/DD/YYYY or MM-DD-YYYY)',
    flags: 'g'
  },
  time: {
    pattern: '\\b([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?\\s?(AM|PM|am|pm)?\\b',
    description: 'Time (12/24 hour format)',
    flags: 'g'
  },
  hexColor: {
    pattern: '#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\\b',
    description: 'Hex color codes',
    flags: 'g'
  },
  creditCard: {
    pattern: '\\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3[0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})\\b',
    description: 'Credit card numbers',
    flags: 'g'
  },
  ssn: {
    pattern: '\\b\\d{3}-\\d{2}-\\d{4}\\b',
    description: 'Social Security Numbers (XXX-XX-XXXX)',
    flags: 'g'
  },
  zipCode: {
    pattern: '\\b\\d{5}(-\\d{4})?\\b',
    description: 'US ZIP codes',
    flags: 'g'
  }
};

/**
 * Sample test strings for different pattern types
 */
export const SAMPLE_TEXTS = {
  mixed: `Contact us at support@example.com or visit https://www.example.com
Call us at (555) 123-4567 or +1-555-987-6543
Our office is located at 123 Main St, Anytown, NY 12345
Server IP: 192.168.1.1, Database: 10.0.0.5
Meeting scheduled for 03/15/2024 at 2:30 PM
Colors: #FF5733, #33FF57, #3357FF`,

  logs: `[2024-03-15 14:30:22] INFO: User login successful - user_id: 12345
[2024-03-15 14:30:25] ERROR: Database connection failed - host: db.example.com:5432
[2024-03-15 14:30:30] WARN: High memory usage detected - 85% utilized
[2024-03-15 14:30:35] DEBUG: Processing request - method: POST, endpoint: /api/users
[2024-03-15 14:30:40] INFO: Email sent successfully - recipient: user@example.com`,

  code: `function validateEmail(email) {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}

const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane.smith@company.org" }
];`,

  data: `Name,Email,Phone,Date
John Doe,john.doe@email.com,(555) 123-4567,2024-01-15
Jane Smith,jane.smith@company.org,+1-555-987-6543,2024-02-20
Bob Johnson,bob.johnson@service.net,555.456.7890,2024-03-10`
};

/**
 * Escape special regex characters in a string
 */
export const escapeRegex = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Generate a regex pattern from a simple text with wildcards
 */
export const textToRegex = (text, options = {}) => {
  const {
    caseSensitive = false,
    wholeWord = false,
    wildcards = true
  } = options;

  let pattern = escapeRegex(text);
  
  if (wildcards) {
    // Replace escaped wildcards with regex equivalents
    pattern = pattern.replace(/\\\*/g, '.*');
    pattern = pattern.replace(/\\\?/g, '.');
  }
  
  if (wholeWord) {
    pattern = `\\b${pattern}\\b`;
  }
  
  const flags = caseSensitive ? 'g' : 'gi';
  
  return { pattern, flags };
};

/**
 * Validate regex pattern syntax
 */
export const validateRegex = (pattern, flags = '') => {
  try {
    new RegExp(pattern, flags);
    return { isValid: true, error: null };
  } catch (error) {
    return { isValid: false, error: error.message };
  }
};

/**
 * Get regex complexity score (simple heuristic)
 */
export const getComplexityScore = (pattern) => {
  if (!pattern) return 0;
  
  let score = 0;
  
  // Basic patterns
  score += pattern.length * 0.1;
  
  // Special characters
  const specialChars = /[.*+?^${}()|[\\]\\\\]/g;
  const specialMatches = pattern.match(specialChars);
  if (specialMatches) score += specialMatches.length * 2;
  
  // Character classes
  const charClasses = /\\[dDwWsSbB]/g;
  const charClassMatches = pattern.match(charClasses);
  if (charClassMatches) score += charClassMatches.length * 1.5;
  
  // Quantifiers
  const quantifiers = /[*+?{]/g;
  const quantifierMatches = pattern.match(quantifiers);
  if (quantifierMatches) score += quantifierMatches.length * 2;
  
  // Groups
  const groups = /\(/g;
  const groupMatches = pattern.match(groups);
  if (groupMatches) score += groupMatches.length * 3;
  
  // Lookaheads/lookbehinds
  const lookarounds = /\(\?[=!<]/g;
  const lookaroundMatches = pattern.match(lookarounds);
  if (lookaroundMatches) score += lookaroundMatches.length * 5;
  
  return Math.round(score);
};

/**
 * Generate human-readable explanation of regex pattern
 */
export const explainRegex = (pattern) => {
  if (!pattern) return 'Empty pattern';
  
  const explanations = [];
  
  // Basic structure analysis
  if (pattern.startsWith('^')) {
    explanations.push('Matches start of string');
  }
  
  if (pattern.endsWith('$')) {
    explanations.push('Matches end of string');
  }
  
  // Common patterns
  if (pattern.includes('\\d')) {
    explanations.push('Matches digits (0-9)');
  }
  
  if (pattern.includes('\\w')) {
    explanations.push('Matches word characters (letters, digits, underscore)');
  }
  
  if (pattern.includes('\\s')) {
    explanations.push('Matches whitespace characters');
  }
  
  if (pattern.includes('.')) {
    explanations.push('Matches any character');
  }
  
  if (pattern.includes('*')) {
    explanations.push('Matches zero or more occurrences');
  }
  
  if (pattern.includes('+')) {
    explanations.push('Matches one or more occurrences');
  }
  
  if (pattern.includes('?')) {
    explanations.push('Matches zero or one occurrence');
  }
  
  if (pattern.includes('|')) {
    explanations.push('Matches alternatives (OR)');
  }
  
  if (pattern.includes('[')) {
    explanations.push('Matches characters in character set');
  }
  
  if (pattern.includes('(')) {
    explanations.push('Creates capture groups');
  }
  
  return explanations.length > 0 
    ? explanations.join(', ')
    : 'Literal text match';
};

/**
 * Format match results for display
 */
export const formatMatches = (matches) => {
  return matches.map((match, index) => ({
    id: index,
    text: match.match,
    position: `${match.index}-${match.index + match.length - 1}`,
    length: match.length,
    groups: match.groups.map((group, groupIndex) => ({
      index: groupIndex + 1,
      value: group || '(empty)',
      name: Object.keys(match.namedGroups).find(key => 
        match.namedGroups[key] === group
      ) || null
    })),
    namedGroups: Object.entries(match.namedGroups).map(([name, value]) => ({
      name,
      value: value || '(empty)'
    }))
  }));
};

/**
 * Generate test cases for a regex pattern
 */
export const generateTestCases = (pattern, flags = 'g') => {
  const testCases = [];
  
  // Try to generate positive test cases based on pattern analysis
  if (pattern.includes('\\d')) {
    testCases.push({ input: '123', expected: true, description: 'Digits' });
  }
  
  if (pattern.includes('@')) {
    testCases.push({ 
      input: 'test@example.com', 
      expected: true, 
      description: 'Email format' 
    });
  }
  
  if (pattern.includes('http')) {
    testCases.push({ 
      input: 'https://example.com', 
      expected: true, 
      description: 'URL format' 
    });
  }
  
  // Add negative test cases
  testCases.push(
    { input: '', expected: false, description: 'Empty string' },
    { input: 'abc', expected: false, description: 'Simple text' },
    { input: '!@#$%', expected: false, description: 'Special characters' }
  );
  
  return testCases;
};

/**
 * Performance measurement for regex operations
 */
export const measureRegexPerformance = (pattern, flags, testString, iterations = 1000) => {
  try {
    const regex = new RegExp(pattern, flags);
    
    const start = performance.now();
    
    for (let i = 0; i < iterations; i++) {
      regex.test(testString);
      // Reset lastIndex for global regexes
      if (flags.includes('g')) {
        regex.lastIndex = 0;
      }
    }
    
    const end = performance.now();
    const totalTime = end - start;
    const avgTime = totalTime / iterations;
    
    return {
      totalTime: totalTime.toFixed(2),
      averageTime: avgTime.toFixed(4),
      iterations,
      performance: avgTime < 0.1 ? 'Excellent' : 
                  avgTime < 1 ? 'Good' : 
                  avgTime < 10 ? 'Fair' : 'Poor'
    };
  } catch (error) {
    return {
      error: error.message,
      totalTime: 0,
      averageTime: 0,
      iterations: 0,
      performance: 'Error'
    };
  }
};
