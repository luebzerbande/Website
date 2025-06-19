// --- Sprache & Übersetzungen ---
const translations = {
  de: {
    title: "Deine personalisierte Website",
    subtitle: "Professionelle Webentwicklung genau für dich zugeschnitten!",
    offersTitle: "Unsere Angebote",
    portfolioTitle: "Portfolio",
    testimonialsTitle: "Kundenstimmen",
    socialTitle: "Folge uns auf Social Media",
    contactTitle: "Kontakt aufnehmen",
    contactName: "Name:",
    contactEmail: "E-Mail:",
    contactMessage: "Nachricht:",
    contactSubmit: "Absenden",
    alertFillAll: "Bitte alle Felder ausfüllen!",
    alertEmailInvalid: "Bitte eine gültige E-Mail-Adresse eingeben!",
    footerImpressum: "Impressum",
  },
  en: {
    title: "Your Personalized Website",
    subtitle: "Professional web development tailored just for you!",
    offersTitle: "Our Offers",
    portfolioTitle: "Portfolio",
    testimonialsTitle: "Testimonials",
    socialTitle: "Follow us on Social Media",
    contactTitle: "Get in Touch",
    contactName: "Name:",
    contactEmail: "Email:",
    contactMessage: "Message:",
    contactSubmit: "Send",
    alertFillAll: "Please fill in all fields!",
    alertEmailInvalid: "Please enter a valid email address!",
    footerImpressum: "Imprint",
  }
};

let currentLang = 'de';

// Sprache umschalten
document.getElementById('btn-de').addEventListener('click', () => setLanguage('de'));
document.getElementById('btn-en').addEventListener('click', () => setLanguage('en'));

function setLanguage(lang) {
  currentLang = lang;

  // Buttons state
  document.getElementById('btn-de').setAttribute('aria-pressed', lang === 'de');
  document.getElementById('btn-en').setAttribute('aria-pressed', lang === 'en');

  // Texte aktualisieren
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Impressum Link
  const footer = document.querySelector('footer p');
  footer.innerHTML = `© 2025 Deine Website Agentur. <a href="#">${translations[lang].footerImpressum}</a>`;
}

// --- Dark Mode Umschalter ---
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  // Icon wechseln
  if(document.body.classList.contains('dark')) {
    darkModeToggle.textContent = '☀️';
  } else {
    darkModeToggle.textContent = '🌙';
  }
});

// --- Kontaktformular Modal ---
const contactModal = document.getElementById('contactModal');

function openContact() {
  contactModal.setAttribute('aria-hidden', 'false');
  contactModal.style.display = 'flex';
  document.getElementById('name').focus();
}

function closeContact() {
  contactModal.setAttribute('aria-hidden', 'true');
  contactModal.style.display = 'none';
}

window.closeContact = closeContact; // global für inline onclick

// Modal mit Escape schließen
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && contactModal.getAttribute('aria-hidden') === 'false') {
    closeContact();
  }
});

// Formular validieren & absenden
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert(translations[currentLang].alertFillAll);
    return;
  }
  if (!validateEmail(email)) {
    alert(translations[currentLang].alertEmailInvalid);
    return;
  }

  alert(currentLang === 'de' ? "Danke für deine Nachricht! Wir melden uns bald." : "Thank you for your message! We'll get back to you soon.");
  closeContact();
  document.getElementById('contactForm').reset();
});

// Initial load
setLanguage(currentLang);
