console.log("PRADEEPA S  PORTFOLIO SCRIPT INITIALIZING...");
console.log("PRADEEPA S -- PORTFOLIO SCRIPT INITIALIZING...");
/* =====================================================
   PRADEEPA S  PORTFOLIO JAVASCRIPT
   Page Loader  Canvas Particles  Custom Cursor
   Typewriter  Counters  Scroll Reveal  Tilt  Ripple
   ===================================================== */

'use strict';

// Theme toggle is now handled by inline script in index.html for maximum reliability.

// ============================================================
// PAGE LOADER
// ============================================================
const loader = document.getElementById('pageLoader');
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    // Start canvas after load
    initCanvas();
  }, 1800);
}, { once: true });

// ============================================================
// SCI-FI CYBERPUNK ORBITAL BACKGROUND
// ============================================================
function initCanvas() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }, 200);
  }, { passive: true });

  // 1. Stars (Nebula effect is handled efficiently by CSS .aurora-mesh)
  const numStars = Math.floor((W * H) / 2500);
  const stars = Array.from({ length: numStars }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.2 + 0.1,
    alpha: Math.random() * 0.8 + 0.1,
    speed: Math.random() * 0.15 + 0.02,
    blinkSpeed: Math.random() * 0.02 + 0.01,
    blinkVal: Math.random() * Math.PI * 2
  }));

  // 2. Giant Orbital Rings (Gyroscope)
  const rings = [
    { rx: 0.42, ry: 0.12, angle: 0,           speed: 0.0008,  color: 'rgba(45, 212, 191, 0.3)' },
    { rx: 0.38, ry: 0.08, angle: Math.PI / 3, speed: -0.0006, color: 'rgba(34, 211, 238, 0.2)' },
    { rx: 0.48, ry: 0.18, angle: Math.PI / 1.5, speed: 0.0004,color: 'rgba(139, 92, 246, 0.15)' }
  ];

  let rafId;
  function loop() {
    ctx.clearRect(0, 0, W, H);
    
    // Draw Stars
    ctx.fillStyle = '#e0f2fe';
    stars.forEach(s => {
      s.y -= s.speed;
      s.blinkVal += s.blinkSpeed;
      if (s.y < 0) { s.y = H; s.x = Math.random() * W; }
      
      const currentAlpha = s.alpha * (0.5 + 0.5 * Math.sin(s.blinkVal));
      ctx.globalAlpha = currentAlpha;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1.0;

    // Draw Orbital Rings
    const cx = W / 2;
    const cy = H / 2;
    
    rings.forEach(r => {
      r.angle += r.speed;
      ctx.beginPath();
      ctx.ellipse(
        cx, cy, 
        W * r.rx, Math.max(W, H) * r.ry, 
        r.angle, 
        0, Math.PI * 2
      );
      ctx.strokeStyle = r.color;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    });

    rafId = requestAnimationFrame(loop);
  }
  loop();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(rafId);
    else loop();
  });
}

// ============================================================
// CUSTOM CURSOR (desktop only)
// ============================================================
const isTouch = window.matchMedia('(pointer: coarse)').matches;
if (!isTouch) {
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursorTrail');
  let mx = 0, my = 0, tx = 0, ty = 0;
  let isVisible = false;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
    if (!isVisible) { cursor.style.opacity = '1'; trail.style.opacity = '1'; isVisible = true; }
  });

  let lerpFactor = 0.14;
  function trailLoop() {
    tx += (mx - tx) * lerpFactor;
    ty += (my - ty) * lerpFactor;
    trail.style.left = tx + 'px';
    trail.style.top  = ty + 'px';
    requestAnimationFrame(trailLoop);
  }
  trailLoop();

  // Cursor expand on interactive elements
  document.querySelectorAll('a, button, input, textarea, [role="button"]').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('expanded'); trail.classList.add('expanded'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('expanded'); trail.classList.remove('expanded'); });
  });

  // Project areas speed boost
  document.querySelectorAll('.projects-nexus, .project-card, .project-nexus-card').forEach(el => {
    el.addEventListener('mouseenter', () => { lerpFactor = 0.45; }); // Much faster response
    el.addEventListener('mouseleave', () => { lerpFactor = 0.14; }); // Back to smooth
  });
}

// ============================================================
// NAVBAR  Scroll shrink + active link
// ============================================================
const navbar   = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function onScroll() {
  // Shrink nav
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else                      navbar.classList.remove('scrolled');

  // Active link
  const scrollMid = window.scrollY + window.innerHeight * 0.35;
  sections.forEach(sec => {
    if (scrollMid >= sec.offsetTop && scrollMid < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(l => l.classList.remove('active'));
      const a = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}

window.addEventListener('scroll', () => {
  onScroll();
  updateProgress();
  updateBackBtn();
  
  // Parallax Orbs
  const sy = window.scrollY;
  const orbs = document.querySelectorAll('.orb');
  orbs.forEach((orb, i) => {
    const speed = [0.04, 0.03, 0.035][i] || 0.035;
    orb.style.transform = `translateY(${sy * speed}px)`;
  });
}, { passive: true });

// ============================================================
// MOBILE DRAWER NAV
// ============================================================
const hamburger  = document.getElementById('hamburger');
let drawer       = document.querySelector('.nav-drawer');
let overlay      = document.querySelector('.nav-overlay');

// Dynamically create drawer + overlay if not in HTML
if (!drawer) {
  overlay = document.createElement('div');
  overlay.className = 'nav-overlay';

  drawer = document.createElement('nav');
  drawer.className = 'nav-drawer';
  drawer.innerHTML = `
    <a href="#about"    class="nav-link">About</a>
    <a href="#skills"   class="nav-link">Skills</a>
    <a href="#projects" class="nav-link">Projects</a>
    <a href="#experience" class="nav-link">Journey</a>
    <a href="#contact"  class="nav-link">Contact</a>
    <a href="#contact" class="btn btn-primary" style="margin-top:12px;width:100%;justify-content:center">Hire Me</a>
  `;
  document.body.appendChild(overlay);
  document.body.appendChild(drawer);
}

function openDrawer() {
  drawer.classList.add('open');
  overlay.classList.add('open');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => drawer.classList.contains('open') ? closeDrawer() : openDrawer());
overlay.addEventListener('click', closeDrawer);
drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

// ============================================================
// ROLE TYPEWRITER
// ============================================================
const roles = [
  'AI-Powered Apps',
  'Full-Stack Solutions',
  'Edge AI Systems',
  'Smart Village Tech',
  'NLP & Computer Vision',
  'Real-World Products',
];
let roleIdx = 0, charIdx = 0, isDeleting = false;
const roleEl = document.getElementById('roleDynamic');

function typeRole() {
  if (!roleEl) return;
  const current = roles[roleIdx];
  if (isDeleting) {
    roleEl.textContent = current.slice(0, --charIdx);
    if (charIdx <= 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      setTimeout(typeRole, 400);
      return;
    }
    setTimeout(typeRole, 45);
  } else {
    roleEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      isDeleting = true;
      setTimeout(typeRole, 2200);
      return;
    }
    setTimeout(typeRole, 75);
  }
}
setTimeout(typeRole, 2000);

// ============================================================
// STAT COUNTERS
// ============================================================
let countersTriggered = false;
const statsSection = document.querySelector('.hero-stats');

function triggerCounters() {
  if (countersTriggered || !statsSection) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersTriggered) {
        countersTriggered = true;
        document.querySelectorAll('.stat-number').forEach(el => {
          const target   = parseInt(el.dataset.target);
          const duration = 1600;
          const start    = performance.now();
          const easeOut  = t => 1 - Math.pow(1 - t, 3);
          function frame(now) {
            const p = Math.min((now - start) / duration, 1);
            el.textContent = Math.round(easeOut(p) * target);
            if (p < 1) requestAnimationFrame(frame);
          }
          requestAnimationFrame(frame);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(statsSection);
}

// ============================================================
// PROFICIENCY BARS
// ============================================================


// ============================================================
// SCROLL REVEAL (IntersectionObserver)
// ============================================================
const revealMap = new Map();

function setupReveal() {
  const opts = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
  const obs  = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve so it stays visible
      }
    });
  }, opts);

  // Reveal basic cards / section headers
  document.querySelectorAll('.glass-card, .section-header, .about-text').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min(i * 0.04, 0.3)}s`;
    obs.observe(el);
  });

  // Stagger project cards
  const projGrid = document.querySelector('.projects-grid');
  if (projGrid) {
    projGrid.classList.add('stagger-children');
    new IntersectionObserver(([e]) => { if (e.isIntersecting) projGrid.classList.add('visible'); },
      { threshold: 0.1 }).observe(projGrid);
  }

  // Stagger skills grid
  const skillsGrid = document.querySelector('.skills-grid');
  if (skillsGrid) {
    skillsGrid.classList.add('stagger-children');
    new IntersectionObserver(([e]) => { if (e.isIntersecting) skillsGrid.classList.add('visible'); },
      { threshold: 0.1 }).observe(skillsGrid);
  }

  // Timeline items animate separately
  document.querySelectorAll('.timeline-item').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.12}s`;
    obs.observe(el);
  });
}

// setupReveal is now called in initApp

// ============================================================
// 3D CARD TILT
// ============================================================
// ============================================================
// 3D CARD TILT - Refined with higher depth
// ============================================================
function setupTilt() {
  const cards = document.querySelectorAll('.project-card, .skill-category, .contact-card, .timeline-card, .avatar-card');
  
  cards.forEach(card => {
    card.style.transformStyle = 'preserve-3d'; 
    card.style.position = 'relative'; 
    
    let glare = card.querySelector('.card-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'card-glare';
      card.appendChild(glare);
    }
    
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / centerY * -10;
      const rotateY = (x - centerX) / centerX * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      
      if (glare) {
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255,255,255,0.1) 0%, transparent 80%)`;
        glare.style.opacity = '1';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      if (glare) glare.style.opacity = '0';
    });
  });
}
// setupTilt is now called in initApp

// ============================================================
// MAGNETIC BUTTONS
// ============================================================
function setupMagnetic() {
  const magneticEls = document.querySelectorAll('.btn, .social-link, .nav-link, .dock-item');
  
  magneticEls.forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });
}
// setupMagnetic is now called in initApp

// ============================================================
// BUTTON RIPPLE EFFECT
// ============================================================
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect   = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size   = Math.max(rect.width, rect.height) * 2;
    ripple.style.cssText = `
      position:absolute;
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top - size/2}px;
      background:rgba(255,255,255,0.18);
      border-radius:50%;
      transform:scale(0);
      animation:ripple-anim 0.55s ease-out forwards;
      pointer-events:none;
    `;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple keyframe once
if (!document.getElementById('ripple-style')) {
  const st = document.createElement('style');
  st.id = 'ripple-style';
  st.textContent = `
    @keyframes ripple-anim {
      to { transform: scale(1); opacity: 0; }
    }
  `;
  document.head.appendChild(st);
}

// ============================================================
// CONTACT FORM
// ============================================================
function handleSubmit(e) {
  e.preventDefault();
  const btn     = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const success = document.getElementById('formSuccess');

  btnText.textContent = 'sending...';
  btn.disabled = true;
  btn.style.opacity = '0.6';

  setTimeout(() => {
    btnText.textContent = 'execute send_message';
    btn.disabled = false;
    btn.style.opacity = '';
    success.classList.add('show');
    e.target.reset();
    setTimeout(() => success.classList.remove('show'), 5000);
  }, 1600);
}
window.handleSubmit = handleSubmit;

// ============================================================
// SMOOTH SCROLL
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
    const top    = target.getBoundingClientRect().top + window.scrollY - offset + 4;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ============================================================
// SECTION FLOAT ANIMATION (+parallax orbs)
// ============================================================

// ============================================================
// PREMIUM FEATURES  Scroll Progress, Magnetic, Spotlight, Chips
// ============================================================

// 1. Scroll Progress Bar
const progBar = document.getElementById('scrollProgress');
function updateProgress() {
  if (!progBar) return;
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  progBar.style.width = scrolled + '%';
}

// 2. Back to Top
const backBtn = document.getElementById('backToTop');
function updateBackBtn() {
  if (!backBtn) return;
  if (window.scrollY > 400) backBtn.classList.add('visible');
  else backBtn.classList.remove('visible');
}
if (backBtn) {
  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 3. Card Spotlight (Mouse move vars)
function initSpotlight() {
  const cards = document.querySelectorAll('.glass-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
    });
  });
}

// 4. Hero Chips Generator
function initHeroChips() {
  const container = document.getElementById('heroChips');
  if (!container) return;
  const techs = ['Next.js', 'PyTorch', 'YOLOv11', 'FastAPI', 'Supabase', 'Gemini AI', 'Tailwind', 'React', 'TypeScript', 'Node.js', 'OpenCV', 'LangChain'];
  
  techs.forEach((tech, i) => {
    const chip = document.createElement('div');
    chip.className = 'hero-chip';
    chip.textContent = tech;
    
    // Randomized position & timing
    const left = Math.random() * 90; // 0-90%
    const delay = Math.random() * 8; 
    const duration = 12 + Math.random() * 10;
    const rot = (Math.random() - 0.5) * 40;
    
    chip.style.left = `${left}%`;
    chip.style.bottom = `-50px`;
    chip.style.animationDelay = `${delay}s`;
    chip.style.animationDuration = `${duration}s`;
    chip.style.setProperty('--rot', `${rot}deg`);
    
    container.appendChild(chip);
  });
}

// Removed redundant initMagnetic as it is now handled by setupMagnetic


// initSpotlight and initHeroChips are now called in initApp

// ============================================================================
// NEXUS SYSTEM (Clock & 3D Carousel)
// ============================================================================
function setupNexus() {
  // 1. HUD System Date & Time
  const clockEl = document.getElementById('hudClock');
  if (clockEl) {
    function updateHUD() {
      const now = new Date();
      
      // Date: 13 MAY
      const dOptions = { day: '2-digit', month: 'short' };
      const dateStr = now.toLocaleDateString('en-GB', dOptions).toUpperCase();
      
      // Time: 05:28:17
      const tOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      const timeStr = now.toLocaleTimeString('en-GB', tOptions);
      
      clockEl.textContent = `${dateStr} // ${timeStr}`;
    }
    updateHUD();
    setInterval(updateHUD, 1000); 
  }

  // 2. Multi-Carousel Nexus Engine (Optimized coverflow transition)
  const carousels = [
    { containerId: 'nexusContainer', cardClass: '.project-nexus-card' }
  ];

  carousels.forEach(({ containerId, cardClass }) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const cards = container.querySelectorAll(cardClass);
    if (cards.length === 0) return;

    let containerWidth = container.clientWidth;
    let centerX = containerWidth / 2;
    let cardData = [];

    function cacheDimensions() {
      containerWidth = container.clientWidth;
      centerX = containerWidth / 2;
      cardData = Array.from(cards).map(card => {
        return {
          element: card,
          centerX: card.offsetLeft + card.offsetWidth / 2
        };
      });
    }

    function updateCarousel() {
      const scrollLeft = container.scrollLeft;
      const maxDistance = containerWidth / 2;

      cardData.forEach(card => {
        const distanceFromCenter = card.centerX - scrollLeft - centerX;
        const normalizedDist = Math.max(-1, Math.min(1, distanceFromCenter / maxDistance));
        
        // Sleek, premium coverflow transition
        const rotateY = normalizedDist * -12; 
        const scale = 1 - Math.abs(normalizedDist) * 0.08;
        const opacity = 1 - Math.abs(normalizedDist) * 0.3;
        const translateZ = Math.abs(normalizedDist) * -100;
        
        card.element.style.transform = `translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
        card.element.style.opacity = opacity;
      });
    }

    let isScrolling = false;
    let targetScrollLeft = container.scrollLeft;

    // Wheel to Horizontal mapping — only intercept when carousel has room to scroll
    container.addEventListener('wheel', (e) => {
      if (e.deltaY === 0) return;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const atStart = container.scrollLeft <= 0;
      const atEnd   = container.scrollLeft >= maxScroll - 1;
      
      // Pass scroll through to page if at limits
      if ((atStart && e.deltaY < 0) || (atEnd && e.deltaY > 0)) return;
      
      e.preventDefault();
      
      // Smooth navigation with custom interpolation (lerping)
      targetScrollLeft = Math.max(0, Math.min(maxScroll, targetScrollLeft + e.deltaY * 1.5));
      
      if (!isScrolling) {
        isScrolling = true;
        // Temporarily disable CSS scroll-behavior: smooth for responsive JS lerp control
        container.style.scrollBehavior = 'auto';
        
        function smoothStep() {
          const diff = targetScrollLeft - container.scrollLeft;
          if (Math.abs(diff) > 0.5) {
            container.scrollLeft += diff * 0.15; // smooth glide factor
            requestAnimationFrame(smoothStep);
          } else {
            container.scrollLeft = targetScrollLeft;
            container.style.scrollBehavior = ''; // restore CSS behavior
            isScrolling = false;
          }
        }
        requestAnimationFrame(smoothStep);
      }
    }, { passive: false });

    container.addEventListener('scroll', () => {
      if (!isScrolling) {
        targetScrollLeft = container.scrollLeft;
      }
      updateCarousel();
    }, { passive: true });

    window.addEventListener('resize', () => {
      cacheDimensions();
      updateCarousel();
    });

    // Run initial setup
    cacheDimensions();
    updateCarousel();
  });
}

// setupNexus is now called in initApp






// Triggers are now handled in initApp

// Easter Egg
console.log('%c Pradeepa S  Portfolio', 'font-size:22px;font-weight:900;color:#0ea5e9;font-family:system-ui');
console.log('%cAI & Full-Stack Developer | Erode, India ', 'color:#38bdf8;font-size:14px;');
console.log('%cStack: Next.js  Python  YOLOv11  Supabase  Gemini AI', 'color:#2dd4bf;font-size:12px;');
console.log('%c Performance Optimized | Premium UX Enabled', 'color:#14b8a6;font-weight:bold;');

// ============================================================================
// 2. DEV MODE (Toggle with Ctrl+Alt+D)
function setupDevMode() {
  console.log("Dev Mode Initialized. Press Ctrl+Alt+D to toggle.");
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'd') {
      document.body.classList.toggle('dev-mode');
      console.log("Dev Mode Toggled: " + document.body.classList.contains('dev-mode'));
    }
  });
}

// WOW FEATURES: AI CHATBOT, DEV MODE, TYPING BG
// ============================================================================

// 1. Live Code-Typing Background
function setupCodeBgTyping() {
  const codeBg = document.getElementById('code-bg');
  if (!codeBg) return;

  const codeSnippets = `import torch
import cv2
from models.experimental import attempt_load
from utils.general import non_max_suppression, scale_coords

# Initialize AI Object Detection Model
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"Loading YOLOv11 model on {device}")
model = attempt_load('weights/yolov11_fire_best.pt', map_location=device)

# Processing live video frame stream...
def process_frame(img_tensor):
    pred = model(img_tensor, augment=False)[0]
    pred = non_max_suppression(pred, 0.4, 0.5)
    return pred

# Initializing WebAssembly Inference Stream
await model.warmup()
print("AI Engine Started. Awaiting input...")`;

  let idx = 0;
  function typeCode() {
    if (idx < codeSnippets.length) {
      codeBg.textContent += codeSnippets.charAt(idx);
      idx++;
      setTimeout(typeCode, Math.random() * 30 + 10);
    } else {
      setTimeout(() => {
        codeBg.textContent = "";
        idx = 0;
        typeCode();
      }, 10000); // restart after 10s
    }
  }
  
  // Start after a delay
  setTimeout(typeCode, 2000);
}



function initApp() {
  console.log("%c >>> INITIALIZING APP v2.0 <<< ", "background: #0ea5e9; color: white; font-size: 16px; font-weight: bold;");

  try { setupNexus(); }         catch (e) { console.error("Nexus init failed", e); }
  try { setupReveal(); }        catch (e) { console.error("Reveal init failed", e); }
  try { setupTilt(); }          catch (e) { console.error("Tilt init failed", e); }
  try { setupMagnetic(); }      catch (e) { console.error("Magnetic init failed", e); }
  try { initSpotlight(); }      catch (e) { console.error("Spotlight init failed", e); }
  try { initHeroChips(); }      catch (e) { console.error("HeroChips init failed", e); }
  try { setupCodeBgTyping(); }  catch (e) { console.error("CodeBgTyping init failed", e); }
  try { setupDevMode(); }       catch (e) { console.error("DevMode init failed", e); }

  // ── ADVANCED FEATURES ──
  try { injectAuroraAndNoise(); }  catch (e) { console.error("Aurora init failed", e); }
  try { injectScanLine(); }        catch (e) { console.error("ScanLine init failed", e); }
  try { setupCursorGlow(); }       catch (e) { console.error("CursorGlow init failed", e); }
  try { setupCommandPalette(); }   catch (e) { console.error("CmdPalette init failed", e); }
  try { setupKonamiCode(); }       catch (e) { console.error("Konami init failed", e); }
  try { setupThemeToggle(); }      catch (e) { console.error("ThemeToggle init failed", e); }


  setTimeout(onScroll, 100);

  setTimeout(triggerCounters, 500);

  console.log("%c✅ Advanced Portfolio v2.0 Ready", "color:#10b981;font-weight:bold;font-size:14px");
}

// ============================================================
// AURORA MESH + NOISE OVERLAY (injected dynamically)
// ============================================================
function injectAuroraAndNoise() {
  if (!document.querySelector('.aurora-mesh')) {
    const aurora = document.createElement('div');
    aurora.className = 'aurora-mesh';
    document.body.insertBefore(aurora, document.body.firstChild);
  }
  if (!document.querySelector('.noise-overlay')) {
    const noise = document.createElement('div');
    noise.className = 'noise-overlay';
    document.body.insertBefore(noise, document.body.firstChild);
  }
}

// ============================================================
// SCAN LINE (CRT aesthetic)
// ============================================================
function injectScanLine() {
  if (document.querySelector('.scan-line')) return;
  const sl = document.createElement('div');
  sl.className = 'scan-line';
  document.body.appendChild(sl);
}

// ============================================================
// CURSOR GLOW RING
// ============================================================
function setupCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

// ============================================================
// COMMAND PALETTE (Ctrl+K / Cmd+K)
// ============================================================
function setupCommandPalette() {
  const commands = [
    { icon: '🏠', label: 'Go Home',          sub: '#home',          href: '#home' },
    { icon: '👤', label: 'About Me',          sub: '#about',         href: '#about' },
    { icon: '⚡', label: 'My Skills',         sub: '#skills',        href: '#skills' },
    { icon: '🚀', label: 'Projects Nexus',    sub: '#projects',      href: '#projects' },
    { icon: '📅', label: 'My Journey',        sub: '#experience',    href: '#experience' },

    { icon: '📬', label: 'Contact Me',        sub: '#contact',       href: '#contact' },
    { icon: '🌙', label: 'Toggle Theme',      sub: 'light / dark',   action: () => togglePortfolioTheme() },
    { icon: '📄', label: 'View Resume',       sub: 'Download PDF',   href: '#contact' },
    { icon: '💻', label: 'GitHub Profile',    sub: 'github.com/pradeepa9342', href: 'https://github.com/pradeepa9342', external: true },
    { icon: '🔗', label: 'LinkedIn Profile',  sub: 'Connect with me', href: 'https://www.linkedin.com/in/pradeepa-pradeepa-8872292a3/', external: true },
  ];

  // Inject HTML
  const overlay = document.createElement('div');
  overlay.className = 'cmd-palette-overlay';
  overlay.id = 'cmdPalette';
  overlay.innerHTML = `
    <div class="cmd-palette" role="dialog" aria-label="Command Palette">
      <div class="cmd-input-wrap">
        <svg class="cmd-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input class="cmd-input" id="cmdInput" type="text" placeholder="Search commands…" autocomplete="off" />
        <span class="cmd-kbd">ESC</span>
      </div>
      <div class="cmd-results" id="cmdResults"></div>
      <div class="cmd-footer">
        <span><kbd class="cmd-kbd">↑↓</kbd> navigate</span>
        <span><kbd class="cmd-kbd">↵</kbd> select</span>
        <span><kbd class="cmd-kbd">ESC</kbd> close</span>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const input    = document.getElementById('cmdInput');
  const results  = document.getElementById('cmdResults');
  let activeIdx  = 0;

  function renderItems(filter = '') {
    const filtered = commands.filter(c =>
      c.label.toLowerCase().includes(filter.toLowerCase()) ||
      c.sub.toLowerCase().includes(filter.toLowerCase())
    );
    results.innerHTML = filtered.map((c, i) => `
      <div class="cmd-item${i === 0 ? ' active' : ''}" data-idx="${i}" tabindex="-1">
        <div class="cmd-item-icon">${c.icon}</div>
        <div>
          <div class="cmd-item-label">${c.label}</div>
          <div class="cmd-item-sub">${c.sub}</div>
        </div>
      </div>
    `).join('');
    activeIdx = 0;

    results.querySelectorAll('.cmd-item').forEach((el, i) => {
      el.addEventListener('click', () => runCmd(filtered[i]));
      el.addEventListener('mouseenter', () => setActive(i));
    });

    return filtered;
  }

  function setActive(i) {
    results.querySelectorAll('.cmd-item').forEach(el => el.classList.remove('active'));
    const el = results.querySelectorAll('.cmd-item')[i];
    if (el) { el.classList.add('active'); activeIdx = i; }
  }

  function runCmd(cmd) {
    closePalette();
    if (cmd.action) { cmd.action(); return; }
    if (cmd.external) { window.open(cmd.href, '_blank'); return; }
    const target = document.querySelector(cmd.href);
    if (target) {
      const offset = 80;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    }
  }

  function openPalette() {
    overlay.classList.add('open');
    input.value = '';
    renderItems('');
    setTimeout(() => input.focus(), 50);
  }
  function closePalette() {
    overlay.classList.remove('open');
    input.blur();
  }

  // Keyboard shortcut
  window.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); overlay.classList.contains('open') ? closePalette() : openPalette(); }
    if (!overlay.classList.contains('open')) return;
    const items = results.querySelectorAll('.cmd-item');
    if (e.key === 'Escape')    { closePalette(); }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(Math.min(activeIdx + 1, items.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActive(Math.max(activeIdx - 1, 0)); }
    if (e.key === 'Enter') {
      const filtered = commands.filter(c =>
        c.label.toLowerCase().includes(input.value.toLowerCase()) ||
        c.sub.toLowerCase().includes(input.value.toLowerCase())
      );
      if (filtered[activeIdx]) runCmd(filtered[activeIdx]);
    }
  });

  input.addEventListener('input', () => renderItems(input.value));
  overlay.addEventListener('click', e => { if (e.target === overlay) closePalette(); });
}

// ============================================================
// KONAMI CODE EASTER EGG
// ============================================================
function setupKonamiCode() {
  const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let pos = 0;
  window.addEventListener('keydown', e => {
    if (e.key === code[pos]) {
      pos++;
      if (pos === code.length) {
        pos = 0;
        triggerKonami();
      }
    } else {
      pos = 0;
    }
  });
}

function triggerKonami() {
  const msg = document.createElement('div');
  msg.style.cssText = `
    position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
    background:linear-gradient(135deg,#06b6d4,#6366f1);
    color:#fff;padding:24px 40px;border-radius:16px;font-size:1.2rem;
    font-weight:800;z-index:99999;text-align:center;
    box-shadow:0 20px 60px rgba(0,0,0,0.5);
    animation:konami-pop 0.4s cubic-bezier(0.34,1.56,0.64,1);
  `;
  msg.innerHTML = '🎮 Konami Code! You found the Easter Egg!<br><small style="font-weight:400;font-size:0.85rem;opacity:0.85">Built with ❤️ by Pradeepa S</small>';
  if (!document.getElementById('konami-style')) {
    const s = document.createElement('style');
    s.id = 'konami-style';
    s.textContent = `@keyframes konami-pop { from{transform:translate(-50%,-50%) scale(0.5);opacity:0} to{transform:translate(-50%,-50%) scale(1);opacity:1} }`;
    document.head.appendChild(s);
  }
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 3000);
}

// ============================================================
// THEME TOGGLE ENGINE
// ============================================================
function togglePortfolioTheme() {
  const root = document.documentElement;
  
  // Add transition class for smooth visual change
  root.classList.add('theme-transition');
  
  const isLight = root.classList.toggle('light-mode');
  localStorage.setItem('nexus-theme', isLight ? 'light' : 'dark');
  
  // Update icons: Show the mode we are NOT in (the one we can switch TO)
  const toggleBtn = document.getElementById('navThemeToggle');
  if (toggleBtn) {
    const sunIcon = toggleBtn.querySelector('.sun-icon');
    const moonIcon = toggleBtn.querySelector('.moon-icon');
    if (sunIcon && moonIcon) {
      sunIcon.style.display = isLight ? 'none' : 'block';
      moonIcon.style.display = isLight ? 'block' : 'none';
    }
  }
  
  // Clean up transition class
  setTimeout(() => {
    root.classList.remove('theme-transition');
  }, 500);
  
  console.log(`Theme toggled: ${isLight ? 'Light' : 'Dark'}`);
}

function setupThemeToggle() {
  const toggleBtn = document.getElementById('navThemeToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', togglePortfolioTheme);
    
    // Set initial icon state
    const sunIcon = toggleBtn.querySelector('.sun-icon');
    const moonIcon = toggleBtn.querySelector('.moon-icon');
    const isLight = document.documentElement.classList.contains('light-mode');
    if (sunIcon && moonIcon) {
      sunIcon.style.display = isLight ? 'none' : 'block';
      moonIcon.style.display = isLight ? 'block' : 'none';
    }
  }
}


window.togglePortfolioTheme = togglePortfolioTheme;

// Global Init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
