const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');


if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!reducedMotion.matches) entry.target.classList.add('reveal-in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.project-card, .about-stories article, .cv-card').forEach(element => {
    revealObserver.observe(element);
  });
}

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.navbar li a')];
let updatePending = false;

function updateNavigation() {
  const marker = Math.min(window.innerHeight * 0.35, 240);
  let activeSection = '';
  sections.forEach(section => {
    const bounds = section.getBoundingClientRect();
    if (bounds.top <= marker && bounds.bottom > marker) activeSection = section.id;
  });
  navLinks.forEach(link => {
    if (link.hash === '#' + activeSection) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  updatePending = false;
}

function scheduleNavigationUpdate() {
  if (!updatePending) {
    updatePending = true;
    requestAnimationFrame(updateNavigation);
  }
}
window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true });
window.addEventListener('resize', scheduleNavigationUpdate);
window.addEventListener('load', scheduleNavigationUpdate);
updateNavigation();
