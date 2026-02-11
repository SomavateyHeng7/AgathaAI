# Theme System Guide

## Overview

The application now supports both light and dark modes using `next-themes`. Users can toggle between themes, and the system will remember their preference.

## Implementation

### Theme Provider

The theme provider is configured in `src/app/layout.tsx` with:
- `attribute="class"` - Uses class-based dark mode
- `defaultTheme="system"` - Respects user's system preference
- `enableSystem` - Allows system theme detection
- `suppressHydrationWarning` - Prevents hydration mismatches

### Theme Toggle Component

Located at `src/components/ThemeToggle.tsx`, this component:
- Shows a sun icon in dark mode
- Shows a moon icon in light mode
- Handles mounting state to prevent hydration errors
- Provides smooth transitions between themes

### Usage

The theme toggle is available in:
- Header component (for authenticated pages)
- Landing page header (for public pages)

### Styling

Use Tailwind's dark mode classes:

```tsx
// Light mode: white background, dark text
// Dark mode: dark background, light text
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content
</div>
```

### Color Variables

CSS variables are defined in `src/app/globals.css` for both light and dark modes, providing consistent theming across the application.

## Testing

1. Click the theme toggle button in the header
2. Theme should switch immediately
3. Preference is saved and persists across page reloads
4. System theme is respected on first visit
