/* ===========================
   HIGH ROADS SPITI — SCRIPT
   =========================== */

// ============================================================
// CONTACT CONFIG — only edit these two values
// ============================================================
const WHATSAPP_NUMBER  = '917018347990';    // country code + number, no + or spaces e.g. 919876543210
const INSTAGRAM_HANDLE = 'bablu8031'; // username only, no @ e.g. highroads_spiti
const PHONE_DIALABLE   = '+917018347990';   // with + prefix e.g. +919876543210
// ============================================================

function applyContactConfig() {
  // Update all WhatsApp links — preserves each link's pre-filled message
  document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
    a.href = a.href.replace(/wa\.me\/[^?#]+/, `wa.me/${WHATSAPP_NUMBER}`);
  });

  // Update all phone links
  document.querySelectorAll('a[href^="tel:"]').forEach(a => {
    a.href = `tel:${PHONE_DIALABLE}`;
  });

  // Update all Instagram links
  document.querySelectorAll('a[href*="instagram.com"]').forEach(a => {
    a.href = `https://instagram.com/${INSTAGRAM_HANDLE}`;
  });

  // Update display text for phone and Instagram
  document.querySelectorAll('[data-contact="phone"]').forEach(el => {
    el.textContent = PHONE_DIALABLE;
  });
  document.querySelectorAll('[data-contact="instagram"]').forEach(el => {
    el.textContent = `@${INSTAGRAM_HANDLE}`;
  });
}

applyContactConfig();

// --- Navbar: add .scrolled class on scroll ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// --- Mobile nav toggle ---
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});


// --- Gallery Lightbox ---
const galleryItems  = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox      = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev  = document.getElementById('lightboxPrev');
const lightboxNext  = document.getElementById('lightboxNext');

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  renderLightboxItem(currentIndex);
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  galleryItems[currentIndex].focus();
}

function renderLightboxItem(index) {
  const item    = galleryItems[index];
  const caption = item.dataset.caption || '';
  const img     = item.querySelector('img');

  if (img) {
    lightboxContent.innerHTML = `<img src="${img.src}" alt="${img.alt || caption}" />`;
  } else {
    // Clone the placeholder for display
    const placeholder = item.querySelector('.gallery-placeholder');
    lightboxContent.innerHTML = placeholder ? placeholder.outerHTML : '';
  }
  lightboxCaption.textContent = caption;
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  renderLightboxItem(currentIndex);
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  renderLightboxItem(currentIndex);
}

// Open lightbox on click or Enter/Space keypress
galleryItems.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
  item.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(i);
    }
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrev);
lightboxNext.addEventListener('click', showNext);

// Close on backdrop click
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  showPrev();
  if (e.key === 'ArrowRight') showNext();
});


// --- Tours: tab switching ---
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.toggle('active', b === btn);
      b.setAttribute('aria-selected', String(b === btn));
    });
    document.querySelectorAll('.tab-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === `tab-${target}`);
    });
  });
});


// --- Smooth scroll offset for fixed navbar ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 8;
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
