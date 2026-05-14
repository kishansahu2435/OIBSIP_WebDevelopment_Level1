/* ================================================
   NEXORA — JavaScript
   ================================================ */

/* ── LOADER ── */
(function () {
  const loader = document.getElementById('loader');
  const counter = document.getElementById('loaderCounter');
  const bar = loader.querySelector('.loader__bar');
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('done');
        setTimeout(() => loader.remove(), 700);
      }, 300);
    }
    counter.textContent = Math.floor(progress);
    bar.style.width = progress + '%';
  }, 60);
})();

/* ── CUSTOM CURSOR ── */
(function () {
  const cursor = document.getElementById('cursor');
  const dot = document.getElementById('cursorDot');
  if (!cursor || !dot) return;

  let mx = 0, my = 0, cx = 0, cy = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  function animateCursor() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const hoverEls = document.querySelectorAll('a, button, .service, .work__item, .about__card, .field__input, .field__textarea');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
  });

  document.addEventListener('mousedown', () => cursor.classList.add('cursor--click'));
  document.addEventListener('mouseup',   () => cursor.classList.remove('cursor--click'));
})();

/* ── NAV SCROLL ── */
(function () {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

/* ── MOBILE MENU ── */
(function () {
  const burger = document.getElementById('burger');
  const menu   = document.getElementById('mobileMenu');
  if (!burger || !menu) return;

  let open = false;

  burger.addEventListener('click', () => {
    open = !open;
    menu.classList.toggle('open', open);
    const spans = burger.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.transform = '';
    }
  });

  menu.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', () => {
      open = false;
      menu.classList.remove('open');
      const spans = burger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.transform = '';
    });
  });
})();

/* ── SCROLL REVEAL ── */
(function () {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = (idx * 0.08) + 's';
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
})();

/* ── HERO PARALLAX (subtle) ── */
(function () {
  const orbs = document.querySelectorAll('.orb');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    orbs.forEach((orb, i) => {
      const speed = 0.08 * (i + 1);
      orb.style.transform = `translateY(${y * speed}px)`;
    });
  }, { passive: true });
})();

/* ── FORM SUBMIT ── */
function submitForm(e) {
  e.preventDefault();
  const btn = e.currentTarget;
  const success = document.getElementById('formSuccess');
  const originalSpan = btn.querySelector('span');

  btn.disabled = true;
  originalSpan.textContent = 'Sending...';

  setTimeout(() => {
    originalSpan.textContent = 'Sent!';
    success.classList.add('show');
    setTimeout(() => {
      btn.disabled = false;
      originalSpan.textContent = 'Send Message';
    }, 3000);
  }, 1200);
}

/* ── SMOOTH ANCHOR ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── NUMBER COUNTER ANIMATION ── */
(function () {
  function animateCount(el, target, suffix) {
    let start = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(start) + suffix;
    }, 16);
  }

  const statsSection = document.querySelector('.hero__stats');
  if (!statsSection) return;

  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      const nums = document.querySelectorAll('.hero__stat-num');
      const data = [['200', '+'], ['98', '%'], ['12', '']];
      nums.forEach((el, i) => {
        const [val, suf] = data[i] || ['0',''];
        el.innerHTML = `0<sup>${suf}</sup>`;
        animateCount({ textContent: '' }, parseInt(val), '', (n) => {
          el.innerHTML = `${n}<sup>${suf}</sup>`;
        });
      });
      obs.disconnect();
    }
  }, { threshold: 0.5 });

  obs.observe(statsSection);
})();
