// ============================================
   // AKASH PORTFOLIO - CUSTOM FEATURES
   // ============================================
const matrixCanvas = document.getElementById('matrix-canvas');
const ctx = matrixCanvas.getContext('2d');
matrixCanvas.width = window.innerWidth;
matrixCanvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰゲゼデベペウクスツヌフムユユルグズブヅプエケセテネヘメレヱゲゼデベポゴゾドボヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;
const fontSize = 16;
const columns = matrixCanvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
  ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
  ctx.fillStyle = '#6366f1';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = alphabet[Math.floor(Math.random() * alphabet.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

let matrixInterval;
function toggleMatrix() {
  if (matrixCanvas.classList.contains('active')) {
    matrixCanvas.classList.remove('active');
    clearInterval(matrixInterval);
  } else {
    matrixCanvas.classList.add('active');
    matrixInterval = setInterval(drawMatrix, 50);
  }
}

// ============================================
   // QR MODAL
   // ============================================
   function showQR() {
     const modal = document.getElementById('qr-modal');
     if (modal) {
       modal.classList.add('active');
       if (typeof playClickSound === 'function') playClickSound();
     } else {
       console.error('QR modal element not found');
     }
   }

   function closeQR(e) {
     if (e && e.target !== e.currentTarget) return;
     const modal = document.getElementById('qr-modal');
     if (modal) {
       modal.classList.remove('active');
     }
   }

   // Make functions globally accessible
   window.showQR = showQR;
   window.closeQR = closeQR;

   // ============================================
   // COMMAND PALETTE
   // ============================================
const commands = [
  { name: 'Go to Home', action: () => scrollToSection('home') },
  { name: 'Go to About', action: () => scrollToSection('about') },
  { name: 'Go to Services', action: () => scrollToSection('services') },
  { name: 'Go to Work', action: () => scrollToSection('portfolio') },
  { name: 'Go to Contact', action: () => scrollToSection('contact') },
  { name: 'Toggle Dark Mode', action: () => toggleTheme() },
  { name: 'Toggle Matrix Effect', action: () => toggleMatrix() },
  { name: 'Show QR Code', action: () => showQR() },
  { name: 'Download CV', action: () => window.open('images/Modified Cv.pdf') }
];

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function searchCommands() {
  const input = document.getElementById('command-input');
  const results = document.getElementById('command-results');
  if (!input || !results) return;
  
  const query = input.value.toLowerCase();
  results.innerHTML = '';

  commands.filter(c => c.name.toLowerCase().includes(query)).forEach(c => {
    const div = document.createElement('div');
    div.className = 'command-result';
    div.textContent = c.name;
    div.onclick = () => {
      c.action();
      document.getElementById('command-palette').classList.remove('active');
    };
    results.appendChild(div);
  });
}

// Initialize command search
searchCommands();

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
  // Close modals with Escape
  if (e.key === 'Escape') {
    document.getElementById('shortcuts-modal').classList.remove('active');
    document.getElementById('qr-modal').classList.remove('active');
    document.getElementById('command-palette').classList.remove('active');
  }

  // Ctrl+K for command palette
  if (e.ctrlKey && e.key === 'k') {
    e.preventDefault();
    document.getElementById('command-palette').classList.toggle('active');
    document.getElementById('command-input').focus();
  }

  // Single key shortcuts (no modifier keys)
  if (!e.ctrlKey && !e.altKey && !e.shiftKey) {
    switch(e.key.toLowerCase()) {
      case 't': 
        toggleTheme(); 
        break;
      case 'm': 
        toggleMatrix(); 
        break;
      case 'q': 
        showQR(); 
        break;
      case '?': 
        document.getElementById('shortcuts-modal').classList.add('active'); 
        break;
      case 'h': 
        scrollToSection('home'); 
        break;
      case 'a': 
        scrollToSection('about'); 
        break;
      case 'w': 
        scrollToSection('portfolio'); 
        break;
      case 'c': 
        if (document.activeElement.tagName !== 'INPUT' && 
            document.activeElement.tagName !== 'TEXTAREA') {
          scrollToSection('contact'); 
        }
        break;
    }
  }
});

// ============================================
// SHORTCUTS MODAL
// ============================================
function closeShortcuts(e) {
  if (e && e.target !== e.currentTarget) return;
  document.getElementById('shortcuts-modal').classList.remove('active');
}

// ============================================
// RESIZE HANDLER
// ============================================
window.addEventListener('resize', () => {
  // Resize matrix canvas
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;
  
  // Recalculate matrix columns
  const newColumns = matrixCanvas.width / fontSize;
  if (newColumns !== columns) {
    drops.length = Math.floor(newColumns);
    drops.fill(1);
  }
});