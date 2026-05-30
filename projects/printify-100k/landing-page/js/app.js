/* ============================================================
   BONJOUR BEASTS — app.js
   Interactions : hamburger menu, scroll reveal, header scroll
   ============================================================ */

(function () {
  'use strict';

  /* ─── HAMBURGER / MOBILE NAV ──────────────────────────── */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
      });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
      }
    });
  }

  /* ─── SCROLL REVEAL ───────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: reveal all immediately
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* ─── HEADER SHADOW ON SCROLL ─────────────────────────── */
  const header = document.querySelector('.site-header');

  if (header) {
    const onScroll = () => {
      if (window.scrollY > 20) {
        header.style.boxShadow = '0 4px 20px rgba(43,32,23,0.10)';
      } else {
        header.style.boxShadow = 'none';
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── PHOTO SLOTS — images déposées dans assets/ ──────── */
  // Chaque conteneur [data-photo="nom"] tente assets/nom.jpg, puis
  // .jpeg, .png, .webp. Dès qu'un fichier est trouvé, la photo
  // apparaît en fondu par-dessus le placeholder dégradé.
  // Tant qu'aucun fichier n'existe, le placeholder reste affiché —
  // jamais d'icône d'image cassée. Aucune ligne de code à toucher :
  // il suffit de glisser le bon fichier dans le dossier assets/.
  document.querySelectorAll('[data-photo]').forEach((slot) => {
    const name = slot.getAttribute('data-photo');
    const exts = ['jpg', 'jpeg', 'png', 'webp'];
    let i = 0;

    const tryNext = () => {
      if (i >= exts.length) return; // aucun fichier → placeholder conservé
      const src = 'assets/' + name + '.' + exts[i++];
      const probe = new Image();
      probe.onload = () => {
        const img = document.createElement('img');
        img.className = 'bb-photo';
        img.src = src;
        img.alt = slot.getAttribute('data-alt') || '';
        img.loading = 'lazy';
        slot.appendChild(img);
      };
      probe.onerror = tryNext;
      probe.src = src;
    };

    tryNext();
  });

  /* ─── SMOOTH SCROLL (fallback for older Safari) ────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = anchor.getAttribute('href');
      if (target === '#') return; // placeholder links
      const el = document.querySelector(target);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
