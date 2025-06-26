# 🤖 CodeAnt AI Integration Demo

This project demonstrates how to integrate CodeAnt AI for comprehensive code analysis, security scanning, and AI-powered recommendations in a React application.

## 🚀 Features

### Web Dashboard
- **Security Scanning**: Identify vulnerabilities and security issues
- **Code Quality Analysis**: Measure maintainability, complexity, and technical debt
- **AI Recommendations**: Get intelligent suggestions for improvements
- **Real-time Monitoring**: Continuous analysis of code changes
- **Interactive Reports**: Visual dashboards with actionable insights

### CLI Tool
- **Project Initialization**: Set up CodeAnt AI for your project
- **Repository Connection**: Link your GitHub repository
- **Automated Scanning**: Security and quality checks
- **Comprehensive Reports**: JSON and console output formats

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn
- Git repository (connected to GitHub)

## 🛠️ Installation & Setup

1. **Clone and Install Dependencies**
   ```bash
   git clone https://github.com/MyNameIsBof/lab3.git
   cd lab3
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your actual CodeAnt AI API key
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   # Visit http://localhost:5173/codeant
   ```

## 🌐 Web Dashboard Usage

1. **Navigate to CodeAnt Dashboard**
   - Open your browser to `http://localhost:5173/codeant`
   - Or click "🤖 CodeAnt AI" in the navigation bar

2. **Initialize Project**
   - Click "Initialize Project" to set up CodeAnt AI integration
   - Wait for the initialization process to complete

3. **Generate Analysis Report**
   - Click "Generate Report" to run comprehensive analysis
   - View security scores, quality metrics, and AI recommendations
   - Explore interactive charts and detailed findings

## 🖥️ CLI Tool Usage

### Basic Commands

```bash
# Initialize CodeAnt AI in your project
npm run codeant:init

# Connect to your GitHub repository
npm run codeant:connect

# Run security scan
npm run codeant:scan

# Analyze code quality
npm run codeant:analyze

# Generate comprehensive report
npm run codeant:report
```

### Advanced Usage

```bash
# Initialize with custom options
node codeant-demo.js init --projectName "My Project" --language typescript

# Connect to specific repository
node codeant-demo.js connect --repo github.com/username/repository

# Run specific type of scan
node codeant-demo.js scan --type vulnerabilities
node codeant-demo.js scan --type dependencies
node codeant-demo.js scan --type secrets

# Analyze specific aspects
node codeant-demo.js analyze --type performance
node codeant-demo.js analyze --type accessibility
node codeant-demo.js analyze --type maintainability

# Generate JSON report
node codeant-demo.js report --format json

# Show current configuration
node codeant-demo.js config

# Get help
node codeant-demo.js help
```

## 📊 Example Output

### Security Scan Results
```
🛡️ Running security scan...

🔍 Scanning for dependencies...
  ✅ All dependencies up to date
  📦 11 production dependencies checked

🔍 Scanning for vulnerabilities...
  ⚠️  1 medium severity vulnerability found
  📋 CVE-2024-1234 in axios package
  🔧 Fix available: Update to axios@1.7.0

📊 Security Scan Summary:
├── Security Score: 8.5/10
├── Vulnerabilities: 1 medium
├── Secrets: 0 exposed
└── Recommendations: 2 available
```

### Quality Analysis
```
📊 Analyzing code quality...

🔍 Analyzing quality...
  📈 Code Quality Score: 8.2/10
  🎯 Maintainability Index: 85
  🔄 Cyclomatic Complexity: 3.2 (Good)

🤖 AI Recommendations:
├── Add PropTypes for better type safety
├── Implement React.memo for performance
├── Add error boundaries for robustness
└── Consider adding integration tests
```

## 🔧 Configuration

### Environment Variables

```env
# CodeAnt AI Configuration
VITE_CODEANT_API_KEY=your_actual_api_key_here
VITE_APP_NAME=FER-PE
VITE_GITHUB_REPO=github.com/MyNameIsBof/lab3

# API Configuration
VITE_API_URL=https://your-api-endpoint.com
NODE_ENV=development
```

### Project Configuration (codeant.config.json)

```json
{
  "projectName": "FER-PE",
  "repository": "github.com/MyNameIsBof/lab3",
  "language": "javascript",
  "framework": "react",
  "excludePaths": ["node_modules", "dist", ".git"],
  "rules": {
    "security": true,
    "quality": true,
    "performance": true,
    "accessibility": true
  },
  "thresholds": {
    "securityScore": 8,
    "qualityScore": 7,
    "maxVulnerabilities": 0
  }
}
```

## 🎯 Integration with Real CodeAnt AI

This demo simulates CodeAnt AI functionality. To integrate with the actual CodeAnt AI service:

1. **Get API Access**
   - Sign up at [CodeAnt AI](https://codeant.ai)
   - Obtain your API key
   - Update `VITE_CODEANT_API_KEY` in your `.env` file

2. **Update API Endpoints**
   - Replace simulated endpoints in `src/services/codeantAI.js`
   - Update `baseURL` to actual CodeAnt AI API
   - Implement real authentication

3. **Configure Webhooks**
   - Set up GitHub webhooks for real-time analysis
   - Configure CI/CD integration for automated scanning

## 🚀 CI/CD Integration

The project includes GitHub Actions workflow (`.github/workflows/ci.yml`) that automatically:

- Runs CodeAnt AI analysis on every push
- Performs security scans
- Generates quality reports
- Fails builds if security thresholds are not met

## 📚 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run codeant` | Show CodeAnt CLI help |
| `npm run codeant:init` | Initialize CodeAnt AI |
| `npm run codeant:connect` | Connect repository |
| `npm run codeant:scan` | Run security scan |
| `npm run codeant:analyze` | Analyze code quality |
| `npm run codeant:report` | Generate report |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Run CodeAnt AI analysis: `npm run codeant:analyze`
4. Ensure all security checks pass: `npm run codeant:scan`
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Links

- [CodeAnt AI Official Website](https://codeant.ai)
- [GitHub Repository](https://github.com/MyNameIsBof/lab3)
- [Documentation](https://docs.codeant.ai)

---

**Note**: This is a demonstration project showing how CodeAnt AI integration would work. The actual implementation would require valid API credentials and real endpoints.
