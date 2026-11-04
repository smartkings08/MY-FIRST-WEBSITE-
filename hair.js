// ============================================================
//  JHAIR_AFFAIRS  |  hair.js
// ============================================================

// >>> YOUR WHATSAPP NUMBER (digits only: country code + number, no 0, no +, no spaces)
// 09020802193  ->  2349020802193
const WHATSAPP_NUMBER = "2349020802193";

// ===== Footer year =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ===== Nav shadow on scroll =====
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 40 ? '0 4px 20px rgba(0,0,0,0.25)' : 'none';
  });
}

// ===== Order form -> WhatsApp =====
const orderForm = document.getElementById('orderForm');
const formStatus = document.getElementById('formStatus');

if (orderForm) {
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault(); // stops the page from jumping to the top

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const product = document.getElementById('product').value;
    const length = document.getElementById('length').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !phone) {
      formStatus.textContent = 'Please fill in your name and phone number.';
      return;
    }

    const lines = [
      'New order from JHAIR_AFFAIRS website!',
      '',
      'Name: ' + name,
      'Phone: ' + phone,
      'Product: ' + product,
      'Length: ' + (length || 'N/A'),
      'Details: ' + (message || 'N/A')
    ];

    const text = encodeURIComponent(lines.join('\n'));
    const whatsappURL = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + text;

    formStatus.textContent = 'Opening WhatsApp...';

    // Try a new tab first; if the browser blocks it, open in the same tab
    const win = window.open(whatsappURL, '_blank');
    if (!win) {
      window.location.href = whatsappURL;
    }

    orderForm.reset();
  });
}

// ===== Fade-in on scroll =====
const revealTargets = document.querySelectorAll('.card, .about-inner, .care-card');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}
