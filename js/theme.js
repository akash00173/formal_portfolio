/* ============================================
   AKASH PORTFOLIO - THEME MANAGER
   ============================================ */

/**
 * Theme Toggle (Dark/Light Mode)
 * Press 'T' to toggle or click the moon icon
 */
function toggleTheme() {
  const html = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle i');
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  if (newTheme === 'light') {
    themeToggle.classList.remove('fa-moon');
    themeToggle.classList.add('fa-sun');
    // Update Three.js particle colors
    if (typeof particles !== 'undefined') {
      particles.material.color.setHex(0x4f46e5);
      lineMaterial.color.setHex(0x4f46e5);
    }
  } else {
    themeToggle.classList.remove('fa-sun');
    themeToggle.classList.add('fa-moon');
    if (typeof particles !== 'undefined') {
      particles.material.color.setHex(0x6366f1);
      lineMaterial.color.setHex(0x6366f1);
    }
  }
}

/**
 * Load saved theme preference from localStorage
 */
function loadSavedTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    const themeToggle = document.querySelector('.theme-toggle i');
    if (themeToggle) {
      themeToggle.classList.remove('fa-moon');
      themeToggle.classList.add('fa-sun');
    }
  }
}

// Initialize theme on page load
loadSavedTheme();