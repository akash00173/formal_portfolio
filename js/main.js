/* ============================================
   AKASH PORTFOLIO - MAIN JAVASCRIPT
   ============================================ */

// ============================================
// LOADING SCREEN
// ============================================
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2000);
});

// ============================================
// LIVE CLOCK
// ============================================
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour12: false });
  document.getElementById('clock').textContent = time;
}
setInterval(updateClock, 1000);
updateClock();

// ============================================
// CUSTOM CURSOR
// ============================================
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top = e.clientY + 'px';
});

// Add hover effect to interactive elements
document.querySelectorAll('a, button, .portfolio-card, .service-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});

// Hide custom cursor on mobile
if (window.innerWidth < 769) {
  cursor.style.display = 'none';
  cursorDot.style.display = 'none';
}

// ============================================
// SCROLL PROGRESS BAR
// ============================================
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById('progress-bar').style.width = scrolled + '%';
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ============================================
// TAB FUNCTIONALITY
// ============================================
function openTab(tabName) {
  const tabContents = document.querySelectorAll('.tab-content');
  const tabBtns = document.querySelectorAll('.tab-btn');

  tabContents.forEach(content => content.classList.remove('active'));
  tabBtns.forEach(btn => btn.classList.remove('active'));

  document.getElementById(tabName).classList.add('active');
  event.target.classList.add('active');
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  const mobileToggle = document.querySelector('.mobile-toggle');
  navLinks.classList.toggle('active');

  const icon = mobileToggle.querySelector('i');
  if (navLinks.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-xmark');
  } else {
    icon.classList.remove('fa-xmark');
    icon.classList.add('fa-bars');
  }
}
window.toggleMenu = toggleMenu;

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('active');
    document.querySelector('.mobile-toggle i').classList.remove('fa-xmark');
    document.querySelector('.mobile-toggle i').classList.add('fa-bars');
  });
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.service-card, .portfolio-card, .skill-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  observer.observe(el);
});

// Staggered animation delays
document.querySelectorAll('.service-card').forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.portfolio-card').forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.15}s`;
});

// ============================================
// QR BUTTON CLICK HANDLER
// ============================================
document.getElementById('qr-toggle-btn').addEventListener('click', function() {
  document.getElementById('qr-modal').classList.add('active');
});

// Close QR modal functions
function closeQRModal() {
  document.getElementById('qr-modal').classList.remove('active');
}

function closeQREvent(e) {
  if (e && e.target !== e.currentTarget) return;
  document.getElementById('qr-modal').classList.remove('active');
}

// Make globally accessible
window.closeQR = closeQRModal;