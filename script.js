document.addEventListener('DOMContentLoaded', () => {
  initAmbientBackground();
  initToggle();
  initMagneticElements();
  initConnectCards();
  initGallery();
});

/* ----------------------------------------------------
   1. DYNAMIC DUAL-PERSONA SWITCHER LOGIC
   ---------------------------------------------------- */
function initToggle() {
  const btnPr = document.getElementById('btn-pr');
  const btnSmm = document.getElementById('btn-smm');
  const indicator = document.querySelector('.toggle-indicator');
  const body = document.body;

  // Experience timeline contents
  const prTimeline = [
    "Led Public Relations, Corporate Communications, and Brand Management initiatives by managing media relations, stakeholder communication, and press releases.",
    "Designed and managed creative assets and digital platforms, including website content, brochures, and banners.",
    "Coordinated events, outreach programs, and cross-functional projects, collaborating with internal teams, media, and vendors to strengthen brand visibility.",
    "Developed comprehensive crisis communication protocols to manage external messaging and safeguard the organization's public reputation."
  ];

  const smmTimeline = [
    "Developed and executed social media strategies across platforms including Instagram, Facebook, LinkedIn, and YouTube to enhance brand awareness.",
    "Created and managed content calendars, posts, reels, captions, and digital campaigns, ensuring timely content delivery.",
    "Monitored social media analytics, engagement metrics, and campaign performance using Meta Business Suite and Google Analytics to optimize reach and growth.",
    "Collaborated with marketing, design, and PR teams to produce creative visual content, paid promotions, influencer collaborations, and community engagement initiatives."
  ];

  // Skill sets
  const prSkills = [
    "Public Relations",
    "Media Relations",
    "Brand Management",
    "Crisis Communication",
    "Stakeholder Management",
    "Marketing Strategy"
  ];

  const smmSkills = [
    "Social Media Strategy",
    "Content Calendars",
    "Digital Campaigns",
    "Copywriting & Creative Directing",
    "Audience Growth Strategy",
    "Community Engagement"
  ];

  // Helper to adjust the background liquid sliding pill dimensions
  function updateIndicator(activeBtn) {
    const trackRect = activeBtn.parentElement.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    const offsetLeft = btnRect.left - trackRect.left;
    
    indicator.style.width = `${btnRect.width}px`;
    indicator.style.transform = `translateX(${offsetLeft - 6}px)`; // Offset border margins
  }

  // Swap content with a elegant fade-out fade-in transition
  function swapContent(mode) {
    // 1. Dynamic metric figures
    document.querySelectorAll('.dynamic-metric').forEach(el => {
      triggerFade(el, () => {
        el.textContent = mode === 'pr' ? el.getAttribute('data-pr') : el.getAttribute('data-smm');
      });
    });

    // 2. Dynamic metric labels
    document.querySelectorAll('.dynamic-metric-label').forEach(el => {
      triggerFade(el, () => {
        el.textContent = mode === 'pr' ? el.getAttribute('data-pr') : el.getAttribute('data-smm');
      });
    });

    // 3. Narrative Text
    const aboutText = document.querySelector('.dynamic-about');
    triggerFade(aboutText, () => {
      aboutText.textContent = mode === 'pr' ? aboutText.getAttribute('data-pr') : aboutText.getAttribute('data-smm');
    });

    // 4. Skills Section Title
    const skillsTitle = document.querySelector('.dynamic-skills-title');
    triggerFade(skillsTitle, () => {
      skillsTitle.textContent = mode === 'pr' ? skillsTitle.getAttribute('data-pr') : skillsTitle.getAttribute('data-smm');
    });

    // 5. Skill tags replacement
    const tagsWrapper = document.getElementById('tags-primary');
    triggerFade(tagsWrapper, () => {
      tagsWrapper.innerHTML = '';
      const list = mode === 'pr' ? prSkills : smmSkills;
      list.forEach(skill => {
        const span = document.createElement('span');
        span.className = 'skill-tag';
        span.textContent = skill;
        tagsWrapper.appendChild(span);
      });
    });

    // 6. Timeline list items replacement
    const timelineList = document.getElementById('timeline-list');
    triggerFade(timelineList, () => {
      timelineList.innerHTML = '';
      const bullets = mode === 'pr' ? prTimeline : smmTimeline;
      bullets.forEach(bullet => {
        const li = document.createElement('li');
        li.className = 'timeline-item';
        li.textContent = bullet;
        timelineList.appendChild(li);
      });
    });
  }

  function triggerFade(element, updateCallback) {
    element.classList.add('fade-out');
    setTimeout(() => {
      updateCallback();
      element.classList.remove('fade-out');
      element.classList.add('fade-in');
      setTimeout(() => {
        element.classList.remove('fade-in');
      }, 350);
    }, 250);
  }

  // Listeners
  btnPr.addEventListener('click', () => {
    if (body.classList.contains('pr-mode')) return;
    btnPr.classList.add('active');
    btnSmm.classList.remove('active');
    body.className = 'pr-mode';
    updateIndicator(btnPr);
    swapContent('pr');
  });

  btnSmm.addEventListener('click', () => {
    if (body.classList.contains('smm-mode')) return;
    btnSmm.classList.add('active');
    btnPr.classList.remove('active');
    body.className = 'smm-mode';
    updateIndicator(btnSmm);
    swapContent('smm');
  });

  // Initial pill positioning
  updateIndicator(btnPr);
  
  // Re-calculate slider pill dimensions on browser window resize
  window.addEventListener('resize', () => {
    const activeBtn = document.querySelector('.toggle-btn.active');
    updateIndicator(activeBtn);
  });
}

/* ----------------------------------------------------
   2. MAGNETIC INTERACTION SCRIPT
   ---------------------------------------------------- */
function initMagneticElements() {
  const elements = document.querySelectorAll('.magnetic');
  
  // Checking device touch capabilities to prevent cursor error on mobile
  if (window.matchMedia('(pointer: coarse)').matches) return;

  elements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - (rect.width / 2);
      const y = e.clientY - rect.top - (rect.height / 2);
      
      // Translate the target elements slightly towards pointer (factor 0.35)
      el.style.transform = `translate3d(${x * 0.35}px, ${y * 0.35}px, 0)`;
      el.style.transition = 'none'; // Disabling standard transitions for real-time tracking
    });

    el.addEventListener('mouseleave', () => {
      // Elastic snap-back to rest position
      el.style.transform = 'translate3d(0px, 0px, 0px)';
      el.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  });
}

/* ----------------------------------------------------
   3. SOCIAL CONNECT REFLECTION EFFECTS
   ---------------------------------------------------- */
function initConnectCards() {
  const cards = document.querySelectorAll('.connect-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });
}

/* ----------------------------------------------------
   4. PULSE PROJECT SCREENSHOT GALLERY
   ---------------------------------------------------- */
function initGallery() {
  const track = document.getElementById('pulse-gallery-track');
  const prevBtn = document.getElementById('pulse-prev');
  const nextBtn = document.getElementById('pulse-next');
  const dotsContainer = document.getElementById('pulse-dots');

  if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

  const slides = track.querySelectorAll('.gallery-slide');
  const totalSlides = slides.length;
  let currentIndex = 0;
  let autoplayTimer;

  // Generate dots
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = `gallery-dot${i === 0 ? ' active' : ''}`;
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function goToSlide(index) {
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
    resetAutoplay();
  }

  function updateDots() {
    dotsContainer.querySelectorAll('.gallery-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function nextSlide() {
    goToSlide((currentIndex + 1) % totalSlides);
  }

  function prevSlide() {
    goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(nextSlide, 5000);
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Start autoplay
  resetAutoplay();
}

/* ----------------------------------------------------
   5. FLUID AMBIENT AURORA BLOBS BACKGROUND
   ---------------------------------------------------- */
function initAmbientBackground() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = window.innerWidth;
  let height = window.innerHeight;
  let animationFrameId;

  // Track mouse coordinates with inertia
  const mouse = { x: width / 2, y: height / 2, active: false, targetX: width / 2, targetY: height / 2 };

  // Set retina-crisp canvas size
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener('resize', resize);
  resize();

  // Blobs definition
  const blobs = [
    {
      baseX: 0.25,
      baseY: 0.35,
      cx: width * 0.25,
      cy: height * 0.35,
      vx: 0,
      vy: 0,
      radius: 450,
      color: { r: 255, g: 107, b: 74, a: 0.35 }, // Warm Coral
      angle: Math.random() * Math.PI * 2,
      speed: 0.0006,
      orbitX: 180,
      orbitY: 140
    },
    {
      baseX: 0.75,
      baseY: 0.3,
      cx: width * 0.75,
      cy: height * 0.3,
      vx: 0,
      vy: 0,
      radius: 520,
      color: { r: 139, g: 92, b: 246, a: 0.25 }, // Amethyst Purple
      angle: Math.random() * Math.PI * 2,
      speed: 0.0004,
      orbitX: 220,
      orbitY: 160
    },
    {
      baseX: 0.5,
      baseY: 0.75,
      cx: width * 0.5,
      cy: height * 0.75,
      vx: 0,
      vy: 0,
      radius: 480,
      color: { r: 245, g: 158, b: 11, a: 0.22 }, // Amber Gold
      angle: Math.random() * Math.PI * 2,
      speed: 0.0005,
      orbitX: 160,
      orbitY: 120
    }
  ];

  // Capture mouse & touch coordinates
  function updateMouseCoordinates(e) {
    mouse.active = true;
    if (e.touches && e.touches.length > 0) {
      mouse.targetX = e.touches[0].clientX;
      mouse.targetY = e.touches[0].clientY;
    } else {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    }
  }

  function mouseLeave() {
    mouse.active = false;
  }

  window.addEventListener('mousemove', updateMouseCoordinates);
  window.addEventListener('touchmove', updateMouseCoordinates, { passive: true });
  window.addEventListener('touchend', mouseLeave);
  window.addEventListener('touchcancel', mouseLeave);
  document.addEventListener('mouseleave', mouseLeave);

  // High-performance animation loop
  function animate() {
    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse coordinate interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;

    // Use overlay color mixing composition for rich blending
    ctx.globalCompositeOperation = 'screen';

    blobs.forEach((blob) => {
      // Float orbit animation
      blob.angle += blob.speed;
      const ox = Math.cos(blob.angle) * blob.orbitX;
      const oy = Math.sin(blob.angle) * blob.orbitY;

      // Base coordinate resolved in canvas space
      const bx = width * blob.baseX + ox;
      const by = height * blob.baseY + oy;

      // Mouse influence pulls coordinates slightly towards cursor
      let targetX = bx;
      let targetY = by;

      if (mouse.active) {
        targetX = bx + (mouse.x - bx) * 0.18;
        targetY = by + (mouse.y - by) * 0.18;
      }

      // Spring-damper physics
      const spring = 0.015;
      const damping = 0.93;

      blob.vx += (targetX - blob.cx) * spring;
      blob.vy += (targetY - blob.cy) * spring;
      blob.vx *= damping;
      blob.vy *= damping;

      blob.cx += blob.vx;
      blob.cy += blob.vy;

      // Draw radial gradient bubble
      const gradient = ctx.createRadialGradient(blob.cx, blob.cy, 0, blob.cx, blob.cy, blob.radius);
      gradient.addColorStop(0, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${blob.color.a})`);
      gradient.addColorStop(0.35, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${blob.color.a * 0.4})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(blob.cx, blob.cy, blob.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    animationFrameId = requestAnimationFrame(animate);
  }

  animate();
}
