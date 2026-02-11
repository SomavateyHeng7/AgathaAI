# Theme Toggle Debugging

## Steps to Debug

1. Open the browser console (F12 or Cmd+Option+I)
2. Click the theme toggle button
3. Check for console logs that say:
   - "Current theme: ..."
   - "Setting theme to: ..."

## What to Check

### In Console:
- Are there any errors?
- Do you see the console.log messages when clicking?
- What values are being logged?

### In Browser DevTools:
1. Inspect the `<html>` element
2. Check if it has a `class="dark"` or `class="light"` attribute
3. When you click the button, does this class change?

### In localStorage:
1. Open Application tab in DevTools
2. Go to Local Storage > localhost:3000
3. Look for a key called "theme"
4. What is its value?

## If Button Doesn't Respond:

Try this in the browser console:
```javascript
// Check if next-themes is working
document.documentElement.classList.toggle('dark')
```

If this works (page changes theme), then the issue is with the button click handler.

## Common Issues:

1. **Button not clickable**: Check if there's an overlay or z-index issue
2. **Theme not persisting**: Check localStorage
3. **No visual change**: Check if CSS variables are being applied
4. **Console errors**: Check for React hydration errors

## Quick Test:

Open browser console and run:
```javascript
localStorage.setItem('theme', 'light')
location.reload()
```

Then:
```javascript
localStorage.setItem('theme', 'dark')
location.reload()
```

Does the theme change between reloads?
