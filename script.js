document.addEventListener('DOMContentLoaded', () => {
  initToggle();
  initMagneticElements();
  initConnectCards();
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
