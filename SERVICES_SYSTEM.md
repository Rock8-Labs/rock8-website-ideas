# Dynamic Services System Documentation

## Overview
The website now uses a centralized, dynamic system for managing service cards across both the home page ("How We Can Help" section) and the services page ("Our Solutions" section).

## How It Works

### Central Data Source
All service information is stored in `/js/services-data.js` in the `SERVICES_DATA` array. Each service has:
- `id`: Unique identifier
- `icon`: HTML for the icon (FontAwesome or SVG image)
- `title`: Service name
- `description`: Service description
- `category`: Classification (core/new/etc.)

### Dynamic Rendering
Both pages automatically load service cards from this central source:
- **Home page**: Cards are rendered in `#home-services-container` with reveal animations
- **Services page**: Cards are rendered in `#services-container` without animations

### Benefits
1. **Single Source of Truth**: Edit once, updates everywhere
2. **Consistency**: Identical content across pages
3. **Easy Maintenance**: Add/edit/remove services in one place
4. **Future-Proof**: Easy to extend for filtering, categories, etc.

## Making Changes

### Adding a New Service
Edit `/js/services-data.js` and add a new object to the `SERVICES_DATA` array:

```javascript
{
  id: 'new-service',
  icon: '<i class="fas fa-your-icon"></i>',
  title: 'Your Service Name',
  description: 'Your service description...',
  category: 'new'
}
```

### Editing Existing Services
Find the service in `SERVICES_DATA` and modify its properties. Changes will automatically appear on both pages.

### Using SVG Icons
For custom SVG icons, use this format:
```javascript
icon: '<img src="images/your-icon.svg" alt="Your Service" />'
```

## File Structure
- `/js/services-data.js` - Central service data and rendering logic
- `/index.html` - Home page with dynamic service loading
- `/services.html` - Services page with dynamic service loading
- `/css/styles.css` - Styling for service cards and loading states

## Technical Details
- Cards are loaded on DOM ready
- Loading states are shown while JavaScript executes
- Home page includes reveal animations with staggered delays
- Services page shows static cards without animations
- System is backward compatible and gracefully handles missing containers