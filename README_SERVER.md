# Rock8.io Website Local Server

## Quick Start (Windows)

### Method 1: Run on Windows Host
1. **Open Command Prompt** in the website folder (where this README is located)
2. **Run:** `python -m http.server 3000`
3. **Open browser to:** `http://localhost:3000`

### Method 2: Double-click Batch File
1. **Double-click `start_server.bat`** (if Python is installed on Windows)
2. **Open browser to:** `http://localhost:3000`

### Method 3: Use Node.js (Alternative)
If you have Node.js installed:
1. **Run:** `npx serve . -p 3000`
2. **Open browser to:** `http://localhost:3000`

## What You'll See
- ✅ Full website with working header/footer includes
- ✅ All navigation working correctly  
- ✅ Contact form functional (backend needs SMTP setup)
- ✅ All 9 service cards clickable
- ✅ Responsive design

## Files Structure
- `index.html` - Homepage
- `services.html` - Services overview
- `contact.html` - Contact form
- `about.html` - About page
- `approach.html` - Our approach
- `resources.html` - Resources (hidden from nav)
- `insights.html` - Blog/insights (hidden from nav)
- `services/self-healing-legacy-systems.html` - Individual service page
- `includes/header.html` - Shared header
- `includes/footer.html` - Shared footer

## Tech Stack
- Pure HTML/CSS/JavaScript
- No build tools required
- Modular header/footer system
- Responsive design with CSS Grid/Flexbox
- Font Awesome icons
- Custom animations