# Crikify Project Structure

```
Crickify/
├── index.html              # Main entry point
├── manifest.json          # PWA manifest for app installation
├── service-worker.js      # Service worker for offline support
├── package.json           # Project metadata
├── .gitignore            # Git ignore rules
│
├── assets/               # Static assets
│   ├── crikify-logo-transparent.png
│   ├── screenshot-1.png
│   └── screenshot-2.png
│
├── css/                  # Stylesheets
│   ├── styles.css        # Main styles
│   └── dark-theme.css    # Dark/match-night theme
│
└── js/                   # JavaScript files
    ├── app.js            # Main application logic
    ├── utils/            # Utility modules
    │   ├── storage.js    # localStorage management
    │   └── validation.js # Form validation
    ├── components/       # Reusable components
    │   └── scorer.js     # Live scorer component
    └── pages/            # Page modules
        ├── dashboard.js  # Dashboard page
        └── tournament.js # Tournament center
```

## File Descriptions

### Core Files
- **index.html** - Main HTML file with PWA meta tags
- **manifest.json** - PWA manifest for install-ready app behavior
- **service-worker.js** - Service worker for offline support and caching

### CSS
- **styles.css** - Base styles, typography, layout, forms, buttons, cards, utilities
- **dark-theme.css** - Match-night dark theme with CSS variables

### JavaScript

#### Utils
- **storage.js** - localStorage wrapper with CRUD operations
- **validation.js** - Form validation helpers (teams, players, overs, etc.)

#### Components
- **scorer.js** - Live scorer with runs, wickets, extras, undo, and over completion

#### Pages
- **app.js** - Main app controller, routing, and initialization
- **dashboard.js** - Dashboard with live matches, queue, and top performers
- **tournament.js** - Tournament center with points table and knockout bracket

## Features Included

✓ PWA manifest for install-ready behavior
✓ Service worker for offline support
✓ Dark theme (match-night)
✓ localStorage persistence
✓ Form validation utilities
✓ Live scorer component
✓ Dashboard page
✓ Tournament center
✓ Responsive design (mobile-first)
✓ Accessible components

## Getting Started

1. Open `index.html` directly in a browser
2. Or serve the folder:
   ```bash
   cd /workspaces/Crickify
   python -m http.server 4173
   ```
3. Visit `http://127.0.0.1:4173`

## Next Steps

- [ ] Add logo asset (crikify-logo-transparent.png)
- [ ] Create match setup wizard completion flow
- [ ] Implement team and player management
- [ ] Add scorecard display
- [ ] Add match analytics views
- [ ] Implement wagon wheel shot tagging
- [ ] Add live commentary feed
- [ ] Create achievements system
- [ ] Implement share functionality with QR code
- [ ] Add player profile drawer
- [ ] Create onboarding flow
- [ ] Add mobile scorer mode optimizations
