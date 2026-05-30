// main-v2.js - Clean logic for Urban Nature layout

document.addEventListener('DOMContentLoaded', function() {

// Navbar background on scroll
const navbar = document.querySelector('.navbar-v2');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Intersection Observer for scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

const animatedElements = document.querySelectorAll('.fade-in-scroll');
animatedElements.forEach(el => observer.observe(el));

// Fallback : show everything after 1s if observer doesn't fire
setTimeout(() => {
  animatedElements.forEach(el => el.classList.add('visible'));
}, 800);

}); // end DOMContentLoaded
