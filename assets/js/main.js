/* ══════════════════════════════════
   HIDE NAV ON SCROLL DOWN / SHOW ON SCROLL UP
══════════════════════════════════ */
(function () {
  const header = document.getElementById('site-header');
  let lastY    = 0;

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;

    if (currentY <= 0) {
      // At the very top — always visible
      header.classList.remove('header--hidden');
    } else if (currentY > lastY + 4) {
      // Scrolling down (4px threshold prevents micro-jitter)
      header.classList.add('header--hidden');
    } else if (currentY < lastY - 4) {
      // Scrolling up
      header.classList.remove('header--hidden');
    }

    lastY = currentY;
  }, { passive: true });
})();

/* ══════════════════════════════════
   MOBILE MENU TOGGLE
══════════════════════════════════ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMenu() {
  mobileMenu.classList.remove('open');
}

/* ══════════════════════════════════
   ACTIVE NAV LINK ON SCROLL
══════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('#desktop-nav a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(sec => observer.observe(sec));

/* ══════════════════════════════════
   SERVICES SLIDER  — Zoom + Fade (Option C)
   Ken Burns zoom on bg + black fade between slides
══════════════════════════════════ */
(function () {
  const track   = document.getElementById('sliderTrack');
  const dotsEl  = document.getElementById('sliderDots');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  const overlay = document.getElementById('sliderFadeOverlay');

  if (!track) return;

  const slides       = Array.from(track.children);
  let current        = 0;
  let isTransitioning = false;

  // Must match CSS transition durations (ms)
  const FADE_IN  = 350;
  const FADE_OUT = 350;

  function buildDots() {
    dotsEl.innerHTML = '';
    slides.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.className = 'dot' + (i === current ? ' active' : '');
      btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      btn.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(btn);
    });
  }

  function updateDots() {
    dotsEl.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function updateArrows() {
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current >= slides.length - 1;
  }

  function goTo(index) {
    if (index === current || isTransitioning) return;
    isTransitioning = true;

    const prev = current;
    current = Math.max(0, Math.min(index, slides.length - 1));

    // 1. Fade to black
    overlay.classList.add('visible');

    setTimeout(() => {
      // 2. Swap slides at peak black — Ken Burns resets on the old slide
      slides[prev].classList.remove('active');
      slides[current].classList.add('active');
      updateDots();
      updateArrows();

      // 3. Fade back in
      overlay.classList.remove('visible');

      setTimeout(() => {
        isTransitioning = false;
      }, FADE_OUT);
    }, FADE_IN);
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // Init — activate first slide
  slides[0].classList.add('active');
  buildDots();
  updateArrows();
})();

/* ══════════════════════════════════
   PROJECT PANELS — Scroll-snap slideshow
   Auto-advances screenshots every 3s when
   the panel is snapped into view.
   Mobile: tap right side to advance manually.
══════════════════════════════════ */
(function () {
  const container = document.querySelector('.project-snap-container');
  if (!container) return;

  const panels        = Array.from(container.querySelectorAll('.project-panel'));
  const SLIDE_MS      = 3000;
  let   activeIndex   = -1;
  const slideshows    = [];

  panels.forEach((panel, pi) => {
    const imgs = Array.from(panel.querySelectorAll('.project-screenshot'));
    const dots = Array.from(panel.querySelectorAll('.showcase-dot'));
    const fill = panel.querySelector('.showcase-progress-fill');
    let current = 0;
    let timer   = null;

    function animateProgress() {
      fill.style.transition = 'none';
      fill.style.width = '0%';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        fill.style.transition = `width ${SLIDE_MS}ms linear`;
        fill.style.width = '100%';
      }));
    }

    function setSlide(index) {
      imgs[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = index % imgs.length;
      imgs[current].classList.add('active');
      dots[current].classList.add('active');
      animateProgress();
    }

    function start() {
      if (timer) return;
      setSlide(0);
      timer = setTimeout(function cycle() {
        setSlide(current + 1);
        timer = setTimeout(cycle, SLIDE_MS);
      }, SLIDE_MS);
    }

    function stop() {
      clearTimeout(timer);
      timer = null;
      imgs[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = 0;
      imgs[0].classList.add('active');
      dots[0].classList.add('active');
      fill.style.transition = 'none';
      fill.style.width = '0%';
    }

    /* Tap to advance on mobile / desktop */
    panel.querySelector('.project-showcase').addEventListener('click', () => {
      clearTimeout(timer);
      timer = null;
      setSlide(current + 1);
      timer = setTimeout(function cycle() {
        setSlide(current + 1);
        timer = setTimeout(cycle, SLIDE_MS);
      }, SLIDE_MS);
    });

    slideshows[pi] = { start, stop };
  });

  function activatePanel(index) {
    if (index === activeIndex) return;
    if (activeIndex >= 0) slideshows[activeIndex].stop();
    activeIndex = index;
    slideshows[activeIndex].start();
  }

  /* Detect which panel is snapped via scroll position */
  container.addEventListener('scroll', () => {
    const index = Math.round(container.scrollTop / window.innerHeight);
    if (index >= 0 && index < panels.length) activatePanel(index);
  }, { passive: true });

  /* Start/stop when the whole container enters/leaves the page viewport */
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Math.round(container.scrollTop / window.innerHeight);
        activatePanel(Math.min(index, panels.length - 1));
      } else {
        if (activeIndex >= 0) {
          slideshows[activeIndex].stop();
          activeIndex = -1;
        }
      }
    });
  }, { threshold: 0.4 }).observe(container);
})();
