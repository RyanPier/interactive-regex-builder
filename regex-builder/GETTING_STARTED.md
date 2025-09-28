# Getting Started with Interactive Regex Builder

Welcome to the Interactive Regex Builder! This guide will help you get up and running quickly, whether you're deploying the application or using it for regex development.

## 🎯 Quick Start for Users

### What is this tool?

The Interactive Regex Builder is a modern web application that helps developers and regex enthusiasts:

- **Build regex patterns** with real-time validation and feedback
- **Test patterns** against sample text with live highlighting
- **Understand patterns** with human-readable explanations
- **Visualize capture groups** with detailed breakdowns
- **Test replacements** with live preview functionality

### Key Features at a Glance

| Feature | Description | Benefit |
|---------|-------------|---------|
| **Real-time Validation** | Instant feedback as you type | Catch errors immediately |
| **Live Highlighting** | Matches highlighted in different colors | Visual pattern verification |
| **Group Visualization** | Detailed capture group breakdown | Understand complex patterns |
| **Pattern Library** | Pre-built common patterns | Quick pattern selection |
| **Performance Metrics** | Execution time and complexity analysis | Optimize pattern performance |
| **Dark/Light Mode** | Theme toggle for comfort | Personalized experience |
| **Mobile Responsive** | Works on all devices | Regex testing anywhere |

## 🚀 For Developers: Local Setup

### Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed ([Download here](https://nodejs.org/))
- **Git** for version control ([Download here](https://git-scm.com/))
- A code editor like **VS Code** ([Download here](https://code.visualstudio.com/))
- **pnpm** package manager (recommended) or npm

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/interactive-regex-builder.git
   cd interactive-regex-builder
   ```

2. **Install Dependencies**
   ```bash
   # Using pnpm (recommended)
   pnpm install
   
   # Or using npm
   npm install
   ```

3. **Start Development Server**
   ```bash
   # Using pnpm
   pnpm run dev
   
   # Or using npm
   npm run dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:5173` to see the application running.

### Development Commands

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start development server with hot reload |
| `pnpm run build` | Build for production |
| `pnpm run preview` | Preview production build locally |
| `pnpm run lint` | Run ESLint for code quality |
| `pnpm run format` | Format code with Prettier |
| `pnpm run deploy` | Deploy to GitHub Pages |

## 🌐 Deployment Options

### Option 1: GitHub Pages (Free & Easy)

Perfect for personal projects and open source:

1. **Fork the Repository** on GitHub
2. **Update Configuration**:
   - Edit `vite.config.js` and change the base path to your repo name
   - Update URLs in `package.json`
3. **Deploy**:
   ```bash
   pnpm run deploy
   ```
4. **Enable GitHub Pages** in repository settings

**Result**: Your app will be live at `https://yourusername.github.io/interactive-regex-builder/`

### Option 2: Vercel (Recommended for Production)

Best performance and developer experience:

1. **Connect Repository** to [Vercel](https://vercel.com)
2. **Configure Build Settings**:
   - Framework: Vite
   - Build Command: `pnpm run build`
   - Output Directory: `dist`
3. **Deploy** automatically on every push

**Result**: Professional deployment with custom domain support

### Option 3: Netlify (Great Alternative)

Excellent for static sites:

1. **Connect Repository** to [Netlify](https://netlify.com)
2. **Set Build Configuration**:
   - Build command: `pnpm run build`
   - Publish directory: `dist`
3. **Deploy** with continuous integration

**Result**: Fast global CDN with form handling capabilities

## 📱 Using the Application

### Basic Workflow

1. **Enter a Pattern**: Type your regex in the pattern input field
2. **Choose Flags**: Select appropriate flags (g, i, m, s, u, y)
3. **Add Test Text**: Use sample texts or paste your own content
4. **View Results**: See matches highlighted in real-time
5. **Explore Tabs**: Check matches, replacements, groups, and explanations

### Advanced Features

#### Pattern Library
Access common patterns for:
- **Email addresses**: `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}`
- **URLs**: `https?://[^\s]+`
- **Phone numbers**: `\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}`
- **IP addresses**: `\b(?:\d{1,3}\.){3}\d{1,3}\b`
- **Dates**: `\d{1,2}[/-]\d{1,2}[/-]\d{4}`

#### Sample Text Types
Test with different data types:
- **Mixed**: General text with various patterns
- **Logs**: Server logs with timestamps and IPs
- **Code**: Programming code snippets
- **Data**: Structured data formats

#### Regex Flags Explained

| Flag | Name | Description | Example Use Case |
|------|------|-------------|------------------|
| `g` | Global | Find all matches | Count all occurrences |
| `i` | Ignore Case | Case-insensitive | Match "Email" and "email" |
| `m` | Multiline | ^ and $ match line breaks | Process multi-line text |
| `s` | Dotall | . matches newlines | Match across lines |
| `u` | Unicode | Full Unicode support | International characters |
| `y` | Sticky | Match from lastIndex | Sequential parsing |

### Performance Tips

1. **Use Anchors**: `^` and `$` to limit search scope
2. **Avoid Backtracking**: Use possessive quantifiers when possible
3. **Be Specific**: Use character classes instead of `.` when possible
4. **Test Performance**: Check the performance metrics tab
5. **Optimize Groups**: Use non-capturing groups `(?:...)` when you don't need the capture

### Common Use Cases

#### Email Validation
```regex
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
```

#### Extract URLs from Text
```regex
https?://[^\s]+
```

#### Parse Log Files
```regex
^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] (\w+): (.+)$
```

#### Clean Phone Numbers
```regex
\D
```
*Use with replacement: empty string*

#### Extract Code Comments
```regex
//.*$|/\*[\s\S]*?\*/
```

## 🎨 Customization

### Theming
The application supports both light and dark themes with:
- Automatic system preference detection
- Manual toggle in the header
- Smooth transitions between themes
- Consistent color palette inspired by craftz.dog

### Responsive Design
Optimized for all screen sizes:
- **Desktop**: Full two-pane layout with all features
- **Tablet**: Stacked layout with touch-friendly controls
- **Mobile**: Compact interface with essential features

## 🔧 Troubleshooting

### Common Issues

**Pattern Not Working?**
- Check for unescaped special characters
- Verify flag settings
- Test with simpler patterns first

**No Matches Found?**
- Ensure test string contains expected patterns
- Check case sensitivity (use `i` flag if needed)
- Verify pattern syntax

**Performance Issues?**
- Avoid complex nested quantifiers
- Use specific character classes
- Check the performance metrics tab

**Build Errors?**
- Ensure Node.js 18+ is installed
- Clear `node_modules` and reinstall
- Check for TypeScript errors

### Getting Help

1. **Check Documentation**: Review this guide and README.md
2. **Search Issues**: Look for similar problems on GitHub
3. **Create Issue**: Report bugs with detailed information
4. **Community**: Join discussions and share patterns

## 📚 Learning Resources

### Regex Fundamentals
- [MDN Regular Expressions Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [RegexOne Interactive Tutorial](https://regexone.com/)
- [Regex101 Documentation](https://regex101.com/)

### Advanced Topics
- [Regex Performance Optimization](https://www.regular-expressions.info/catastrophic.html)
- [Unicode in Regular Expressions](https://www.regular-expressions.info/unicode.html)
- [Lookahead and Lookbehind](https://www.regular-expressions.info/lookaround.html)

### Practice Platforms
- [RegExr](https://regexr.com/) - Interactive regex testing
- [Regex101](https://regex101.com/) - Detailed explanations
- [RegexPal](https://regexpal.com/) - Simple testing tool

## 🤝 Contributing

We welcome contributions! Here's how to get involved:

### Types of Contributions
- **Bug Reports**: Found an issue? Let us know!
- **Feature Requests**: Have an idea? Share it!
- **Code Contributions**: Submit pull requests
- **Documentation**: Help improve guides and examples
- **Pattern Library**: Contribute useful regex patterns

### Development Process
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Style
- Use Prettier for formatting
- Follow ESLint rules
- Write descriptive commit messages
- Add comments for complex logic

## 📄 License

This project is licensed under the MIT License, which means:
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ❗ License and copyright notice required

## 🙏 Acknowledgments

Special thanks to:
- **[craftz.dog](https://www.craftz.dog/)** for design inspiration
- **[shadcn/ui](https://ui.shadcn.com/)** for beautiful components
- **[Tailwind CSS](https://tailwindcss.com/)** for utility-first styling
- **[Lucide](https://lucide.dev/)** for clean icons
- **[Vite](https://vitejs.dev/)** for fast development experience

---

**Ready to start building regex patterns?** 🚀

Open the application and begin with a simple pattern like `\d+` to match numbers, then explore the various features and tabs to see how powerful regex can be!
