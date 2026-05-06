document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('main section[id]');
  const form = document.querySelector('.contact-form');
  const formStatus = document.querySelector('.form-status');

  if (navToggle && navbar) {
    navToggle.addEventListener('click', () => {
      const isOpen = navbar.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navbar.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const setActiveLink = () => {
    const offset = window.scrollY + 130;
    let activeId = '';

    sections.forEach((section) => {
      if (offset >= section.offsetTop) {
        activeId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  const reveals = document.querySelectorAll('.panel, .hero-copy, .hero-card');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    reveals.forEach((item) => observer.observe(item));
  } else {
    reveals.forEach((item) => item.classList.add('is-visible'));
  }

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const requiredFields = Array.from(form.querySelectorAll('input[required], textarea[required]'));
      const emptyField = requiredFields.find((field) => field.value.trim() === '');

      if (emptyField) {
        emptyField.focus();
        if (formStatus) {
          formStatus.textContent = 'Please fill in the required fields before sending.';
        }
        return;
      }

      if (formStatus) {
        formStatus.textContent = 'Thanks for your message. This demo form is ready for a backend connection.';
      }

      form.reset();
    });
  }
});
