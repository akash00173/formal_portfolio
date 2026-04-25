/* ============================================
   AKASH PORTFOLIO - SOUND EFFECTS ENGINE
   Developer-themed sounds using Web Audio API
   ============================================ */

let soundEnabled = true;
let audioContext = null;

/**
 * Initialize Audio Context
 */
function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

/**
 * Play hover sound - Tech tick (louder)
 */
function playHoverSound() {
  if (!soundEnabled) return;
  
  try {
    const ctx = initAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.frequency.setValueAtTime(1500, ctx.currentTime);
    osc.type = 'square';
    
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.03);
  } catch (e) {}
}

/**
 * Play click sound - Digital beep (louder)
 */
function playClickSound() {
  if (!soundEnabled) return;
  
  try {
    const ctx = initAudio();
    
    // Main tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
    osc.type = 'square';
    
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
    
    // Harmonic
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    
    osc2.frequency.setValueAtTime(1320, ctx.currentTime);
    osc2.type = 'sine';
    
    gain2.gain.setValueAtTime(0.05, ctx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    
    osc2.start(ctx.currentTime);
    osc2.stop(ctx.currentTime + 0.05);
  } catch (e) {}
}

/**
 * Play section transition - Sci-fi sweep
 */
function playTransitionSound() {
  if (!soundEnabled) return;
  
  try {
    const ctx = initAudio();
    
    // Sweeping sound
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.frequency.setValueAtTime(2000, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.5);
    osc.type = 'sawtooth';
    
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
    
    // Bass layer
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    
    osc2.frequency.setValueAtTime(150, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.3);
    osc2.type = 'sine';
    
    gain2.gain.setValueAtTime(0.2, ctx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    
    osc2.start(ctx.currentTime);
    osc2.stop(ctx.currentTime + 0.3);
  } catch (e) {}
}

/**
 * Play success sound - Binary chime (developer styled)
 */
function playSuccessSound() {
  if (!soundEnabled) return;
  
  try {
    const ctx = initAudio();
    
    // Binary-style tones (0 and 1 - like computer beeps)
    const notes = [1046.5, 1318.5, 1568]; // C6, F6, G6 (higher, more digital)
    
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.type = i === 1 ? 'square' : 'sawtooth';
      
      const startTime = ctx.currentTime + (i * 0.12);
      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
      
      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  } catch (e) {}
}

/**
 * Play keyboard shortcut - Matrix style
 */
function playShortcutSound() {
  if (!soundEnabled) return;
  
  try {
    const ctx = initAudio();
    
    // Quick typing sound
    for (let i = 0; i < 4; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.setValueAtTime(800 + (i * 200), ctx.currentTime + (i * 0.03));
      osc.type = 'square';
      
      gain.gain.setValueAtTime(0.1, ctx.currentTime + (i * 0.03));
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04 + (i * 0.03));
      
      osc.start(ctx.currentTime + (i * 0.03));
      osc.stop(ctx.currentTime + 0.06 + (i * 0.03));
    }
  } catch (e) {}
}

/**
 * Toggle sound on/off with feedback
 */
function toggleSound() {
  soundEnabled = !soundEnabled;
  const icon = document.getElementById('sound-icon');
  
  if (icon) {
    icon.className = soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
  }
  
  if (soundEnabled) {
    playSuccessSound();
  }
}

/**
 * Attach sounds to elements
 */
function attachSoundEffects() {
  // Init audio on first click
  document.addEventListener('click', function initOnFirstClick() {
    initAudio();
    document.removeEventListener('click', initOnFirstClick);
  }, { once: true });
  
  // Hover sounds
  const hoverElements = document.querySelectorAll('a, button, .portfolio-card, .service-card, .skill-item, .nav-links a');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => playHoverSound());
  });
  
  // Click sounds
  const clickElements = document.querySelectorAll('a, button, .btn');
  clickElements.forEach(el => {
    el.addEventListener('click', () => playClickSound());
  });
  
  // Section scroll sound
  let lastSection = '';
  window.addEventListener('scroll', () => {
    const sections = ['home', 'about', 'services', 'portfolio', 'contact'];
    
    for (const section of sections) {
      const el = document.getElementById(section);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
          if (lastSection !== section) {
            playShortcutSound();
            lastSection = section;
          }
          break;
        }
      }
    }
  });
}

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', attachSoundEffects);
} else {
  attachSoundEffects();
}