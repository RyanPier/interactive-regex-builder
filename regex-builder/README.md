# Interactive Regex Builder & Tester

A modern, interactive regular expression builder and tester with real-time feedback, beautiful UI, and comprehensive features for developers and regex enthusiasts.

![Regex Builder Screenshot](./public/screenshot.png)

## ✨ Features

### Core Functionality
- **Real-time Regex Validation** - Instant feedback as you type your patterns
- **Live Match Highlighting** - See matches highlighted in your test string with different colors
- **Group Capture Visualization** - Detailed breakdown of capture groups with named group support
- **Pattern Explanation** - Human-readable explanations of your regex patterns
- **Replacement Preview** - Test regex replacements with live preview
- **Performance Metrics** - Monitor regex execution time and complexity

### User Experience
- **Modern UI Design** - Inspired by craftz.dog with beautiful gradients and animations
- **Dark/Light Mode** - Toggle between themes with smooth transitions
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Accessibility** - Full keyboard navigation and screen reader support
- **Copy to Clipboard** - One-click copying of patterns, matches, and results

### Developer Tools
- **Common Patterns Library** - Pre-built patterns for emails, URLs, phone numbers, and more
- **Sample Text Templates** - Test data for different use cases (logs, code, mixed data)
- **Regex Flags Support** - Full support for all JavaScript regex flags (g, i, m, s, u, y)
- **History & Favorites** - Save and recall your frequently used patterns
- **Export Options** - Download patterns and results for later use

## 🚀 Live Demo

Visit the live application: [Interactive Regex Builder](https://your-deployment-url.com)

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library
- **Icons**: Lucide React icons
- **State Management**: React Hooks (useState, useEffect, custom hooks)
- **Performance**: Debounced inputs and optimized re-renders
- **Accessibility**: ARIA labels and keyboard navigation

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or pnpm package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/interactive-regex-builder.git
   cd interactive-regex-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application.

### Build for Production

```bash
npm run build
# or
pnpm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🎯 Usage Guide

### Basic Usage

1. **Enter a Pattern**: Type your regular expression in the pattern input field
2. **Add Test Text**: Use the provided sample texts or paste your own content
3. **See Live Results**: Watch as matches are highlighted in real-time
4. **Explore Features**: Use the tabs to view matches, test replacements, analyze groups, and get explanations

### Advanced Features

#### Regex Flags
- **g** (global) - Find all matches
- **i** (ignore case) - Case-insensitive matching
- **m** (multiline) - ^ and $ match line breaks
- **s** (dotall) - . matches newlines
- **u** (unicode) - Full unicode support
- **y** (sticky) - Match from lastIndex position

#### Common Patterns
The application includes pre-built patterns for:
- Email addresses
- URLs (HTTP/HTTPS)
- US phone numbers
- IPv4 addresses
- Dates (MM/DD/YYYY format)
- Time (12/24 hour format)

#### Sample Text Types
- **Mixed** - General text with emails, URLs, and phone numbers
- **Logs** - Server log format with timestamps and IPs
- **Code** - Programming code snippets
- **Data** - Structured data formats

## 🎨 Design Philosophy

This application draws inspiration from [craftz.dog](https://www.craftz.dog/) with:

- **Clean, Modern Interface** - Minimalist design with purposeful elements
- **Smooth Animations** - Subtle transitions and micro-interactions
- **Beautiful Color Palette** - Carefully chosen colors for optimal contrast
- **Glass Morphism Effects** - Translucent cards with backdrop blur
- **Responsive Grid System** - Adaptive layouts for all screen sizes

## 🔧 Architecture

### Component Structure
```
src/
├── components/
│   ├── ResponsiveRegexBuilder.jsx    # Main application component
│   ├── Header.jsx                    # Navigation and theme toggle
│   ├── Footer.jsx                    # Links and information
│   └── ui/                          # shadcn/ui components
├── hooks/
│   ├── useRegex.js                  # Core regex processing logic
│   ├── useDebounce.js               # Performance optimization
│   └── useRegexFlags.js             # Flag management
├── lib/
│   └── regexUtils.js                # Utility functions and patterns
└── App.jsx                          # Root component
```

### Key Hooks

#### `useRegex(pattern, flags, testString)`
Core hook that processes regex patterns and returns:
- `matches` - Array of match objects with positions and groups
- `error` - Validation error messages
- `isValid` - Boolean indicating pattern validity
- `stats` - Match statistics (count, coverage, groups)
- `getHighlightedText` - HTML with highlighted matches
- `replace` - Function for replacement operations

#### `useDebounce(value, delay)`
Performance optimization hook that delays expensive operations until user stops typing.

#### `useRegexFlags(initialFlags)`
Manages regex flags with toggle functionality and descriptions.

### Utility Functions

- **Pattern Validation** - Comprehensive regex syntax checking
- **Match Highlighting** - HTML generation with colored highlights
- **Performance Measurement** - Execution time analysis
- **Complexity Scoring** - Pattern complexity assessment
- **Pattern Explanation** - Human-readable pattern descriptions

## 🚀 Deployment

### GitHub Pages

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

### Vercel

1. **Connect your GitHub repository** to Vercel
2. **Configure build settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Deploy automatically** on every push to main branch

### Netlify

1. **Connect your repository** to Netlify
2. **Set build configuration**:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Enable automatic deployments**

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes** and add tests if applicable
4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed
- Ensure responsive design works on all devices

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: [craftz.dog](https://www.craftz.dog/) for the beautiful design aesthetic
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) for the component library
- **Icons**: [Lucide](https://lucide.dev/) for the beautiful icon set
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📊 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 🐛 Known Issues

- Very complex regex patterns (1000+ characters) may impact performance
- Some advanced regex features may not be fully supported in all browsers
- Mobile keyboard may cover input fields on very small screens

## 🔮 Roadmap

- [ ] **Regex Library** - Community-contributed pattern library
- [ ] **Pattern Sharing** - Share patterns via URL
- [ ] **Advanced Explanations** - Step-by-step pattern breakdown
- [ ] **Performance Benchmarking** - Compare pattern efficiency
- [ ] **Multi-language Support** - Internationalization
- [ ] **Offline Support** - Progressive Web App features
- [ ] **Pattern Testing Suite** - Automated pattern validation
- [ ] **Visual Pattern Builder** - Drag-and-drop pattern construction

## 📞 Support

If you encounter any issues or have questions:

1. **Check the documentation** above
2. **Search existing issues** on GitHub
3. **Create a new issue** with detailed information
4. **Join our community** discussions

---

**Made with ❤️ using React & Tailwind CSS**

*This project demonstrates modern web development practices with a focus on user experience, performance, and accessibility.*
