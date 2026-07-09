document.addEventListener('DOMContentLoaded', () => {
  initAmbientBackground();
  initToggle();
  initMagneticElements();
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

    // 4. Skills Section Titles (Hero & Skills Card)
    document.querySelectorAll('.dynamic-skills-title').forEach(el => {
      triggerFade(el, () => {
        el.textContent = mode === 'pr' ? el.getAttribute('data-pr') : el.getAttribute('data-smm');
      });
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
   3. FLOW PROJECT SCREENSHOT GALLERY
   ---------------------------------------------------- */
function initGallery() {
  const track = document.getElementById('flow-gallery-track');
  const prevBtn = document.getElementById('flow-prev');
  const nextBtn = document.getElementById('flow-next');
  const dotsContainer = document.getElementById('flow-dots');

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
   4. 3D WAVY MESH CANVAS BACKGROUND (IMAGE 4)
   ---------------------------------------------------- */
function initAmbientBackground() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Grid points variables
  const cols = 35;
  const rows = 35;
  const spacing = 35; // px spacing between grid points
  
  // Wave state
  let time = 0;
  
  // Mouse tracking state
  const mouse = {
    x: width / 2,
    y: height / 2,
    targetX: width / 2,
    targetY: height / 2
  };

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });

  // Rotation angles (radians) looking down at the angled layout
  let rotX = 0.9;
  let rotY = -0.3;

  function animate() {
    time += 0.015;
    
    // Smooth pointer physics
    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;

    // Adjust grid rotation slightly for an interactive parallax shift
    const targetRotX = 0.95 + (mouse.y / height - 0.5) * 0.12;
    const targetRotY = -0.32 + (mouse.x / width - 0.5) * 0.15;
    
    rotX += (targetRotX - rotX) * 0.05;
    rotY += (targetRotY - rotY) * 0.05;

    // Clear background
    ctx.fillStyle = '#050508';
    ctx.fillRect(0, 0, width, height);

    // Core static radial glow matching space-black/burgundy layout
    const radialGlow = ctx.createRadialGradient(
      width / 2, height * 0.2, 0,
      width / 2, height * 0.2, Math.max(width, height) * 0.8
    );
    radialGlow.addColorStop(0, '#1c0a0c'); // Crimson burgundy center glow
    radialGlow.addColorStop(0.65, '#050508'); // Space black outer
    ctx.fillStyle = radialGlow;
    ctx.fillRect(0, 0, width, height);

    // Camera setup for perspective projection
    const fov = 750;
    const centerX = width / 2;
    const centerY = height / 2.3;

    // Loop through grid coordinates
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        // Compute raw grid points (centered)
        const x0 = (i - cols / 2) * spacing;
        const z0 = (j - rows / 2) * spacing;

        // Wave formula using sine/cosine loops
        let y0 = Math.sin(i * 0.16 + time) * Math.cos(j * 0.16 + time) * 35;

        // Dynamic mouse distortion ripple
        const mx = mouse.x - centerX;
        const my = mouse.y - centerY;
        const dx = x0 - mx;
        const dy = y0 - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 220) {
          const force = (1 - dist / 220) * 18;
          y0 += Math.sin(dist * 0.04 - time * 4) * force;
        }

        // Apply rotation on Y axis
        const x1 = x0 * Math.cos(rotY) - z0 * Math.sin(rotY);
        const z1 = x0 * Math.sin(rotY) + z0 * Math.cos(rotY);

        // Apply rotation on X axis
        const y2 = y0 * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = y0 * Math.sin(rotX) + z1 * Math.cos(rotX);

        // Perspective scale factor
        const scale = fov / (fov + z2);

        // Map to screen
        const screenX = centerX + x1 * scale;
        const screenY = centerY + y2 * scale;

        // Skip rendering points outside visibility limits
        if (z2 < -fov || screenX < -50 || screenX > width + 50 || screenY < -50 || screenY > height + 50) {
          continue;
        }

        // Opacity drops as point recedes to simulate depth of field
        const depthOpacity = Math.max(0, Math.min(0.55, (1 - z2 / (fov * 0.8))));
        
        // Point size scale (wave peaks & closer points are larger)
        const size = (1.5 + (y0 + 35) / 70 * 2) * scale;

        // Color interpolation between Copper Crimson (#C84B31) and Ivory Cream (#F5EFEB) based on height
        const ratio = (y0 + 35) / 70;
        const r = Math.floor(200 + (245 - 200) * ratio);
        const g = Math.floor(75 + (239 - 75) * ratio);
        const b = Math.floor(49 + (235 - 49) * ratio);
        
        ctx.beginPath();
        ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${depthOpacity})`;
        ctx.fill();
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}
