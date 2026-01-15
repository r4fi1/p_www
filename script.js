// Nawigacja mobilna
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu mobilnego
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animacja hamburgera
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Zamknij menu po kliknięciu w link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scroll z offsetem dla fixed navbar
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Zmiana wyglądu navbaru przy scrollu
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Dodaj cień przy scrollu
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Aktywny link w nawigacji
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animacje przy scrollu (intersection observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Obserwuj karty ofert
document.querySelectorAll('.offer-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Obserwuj karty porad
document.querySelectorAll('.tips-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Obserwuj metody kontaktu
document.querySelectorAll('.contact-method').forEach((method, index) => {
    method.style.opacity = '0';
    method.style.transform = 'translateX(-30px)';
    method.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(method);
});

// Licznik animowany dla ceny
const priceElement = document.querySelector('.price-amount');
if (priceElement) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !priceElement.classList.contains('animated')) {
                animatePrice();
                priceElement.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(priceElement);
}

function animatePrice() {
    const target = 150;
    const duration = 1000;
    const step = target / (duration / 16);
    let current = 0;
    const priceElement = document.querySelector('.price-amount');
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        priceElement.textContent = Math.floor(current) + ' zł';
    }, 16);
}

// Sprawdź, czy użytkownik preferuje redukcję ruchu
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    // Wyłącz animacje dla użytkowników preferujących redukcję ruchu
    document.querySelectorAll('*').forEach(element => {
        element.style.animation = 'none';
        element.style.transition = 'none';
    });
}

// Lazy loading dla obrazów (gdy zostaną dodane prawdziwe zdjęcia)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback dla starszych przeglądarek
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Wyświetl komunikat o cookies (opcjonalnie)
function showCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
        // Tutaj możesz dodać banner o cookies
        console.log('Cookie consent not set');
    }
}

// Inicjalizacja
document.addEventListener('DOMContentLoaded', () => {
    console.log('Strona załadowana pomyślnie');
    
    // Dodaj klasę loaded do body dla dodatkowych animacji
    document.body.classList.add('loaded');
});

// Obsługa formularza kontaktowego (jeśli zostanie dodany)
function handleContactForm(event) {
    event.preventDefault();
    // Tutaj dodaj logikę wysyłania formularza
    console.log('Formularz wysłany');
}

// Funkcja do kopiowania numeru telefonu
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Skopiowano do schowka: ' + text);
        // Możesz dodać powiadomienie dla użytkownika
    });
}
