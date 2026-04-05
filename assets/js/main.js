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
   SERVICES SLIDER  (no autoplay)
══════════════════════════════════ */
(function () {
  const track   = document.getElementById('sliderTrack');
  const dotsEl  = document.getElementById('sliderDots');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');

  if (!track) return;

  const slides = Array.from(track.children);
  let current  = 0;

  function setSlideWidths() {
    /* Use the actual viewport width so slides are truly full-screen */
    const w = window.innerWidth;
    slides.forEach(s => { s.style.width = w + 'px'; });
  }

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
    current = Math.max(0, Math.min(index, slides.length - 1));
    track.style.transform = `translateX(-${current * slides[0].offsetWidth}px)`;
    updateDots();
    updateArrows();
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  window.addEventListener('resize', () => {
    setSlideWidths();
    goTo(current); // recalculate offset at new width
  });

  // Init
  setSlideWidths();
  buildDots();
  updateArrows();
})();
