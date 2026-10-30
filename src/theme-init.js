// Applies the saved theme before first paint to avoid a flash. Loaded as a classic,
// render-blocking script from <head> so the Content-Security-Policy needs no inline script.
try {
  const theme = localStorage.getItem('fde_theme');
  if (theme) document.documentElement.dataset.theme = theme;
} catch { /* storage unavailable */ }
