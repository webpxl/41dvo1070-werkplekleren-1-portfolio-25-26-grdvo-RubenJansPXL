// Set current year in footer
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }

  // Smooth scrolling for in-page nav links
  const navLinks = document.querySelectorAll('a.nav-link[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href')?.substring(1);
      const targetEl = targetId ? document.getElementById(targetId) : null;
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Update URL hash without jumping
        history.pushState(null, '', `#${targetId}`);
      }
    });
  });

  // Highlight active nav link on scroll
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const linkMap = new Map(
    Array.from(navLinks).map(l => [l.getAttribute('href')?.substring(1), l])
  );

  const setActive = (id) => {
    navLinks.forEach(l => l.classList.remove('active'));
    const link = linkMap.get(id);
    if (link) link.classList.add('active');
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        setActive(id);
      }
    });
  }, { root: null, threshold: 0.6 });

  sections.forEach(sec => observer.observe(sec));

  // Reveal on scroll animations
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));
});
