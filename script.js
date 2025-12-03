// ============================================
// NAVBAR SCROLL BEHAVIOR (Transparent to Solid)
// ============================================
const navbar = document.getElementById('topNavbar');

function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavbarScroll);
handleNavbarScroll(); // Initial check

// ============================================
// SMOOTH SCROLLING
// ============================================
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 100; // Offset for fixed navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        closeMobileMenu();
    }
}

// Handle nav link clicks
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section') || link.getAttribute('href').substring(1);
            scrollToSection(sectionId);
        });
    });
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all content cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.content-card');
    cards.forEach(card => {
        observer.observe(card);
    });
});

// ============================================
// SCROLLSPY - HIGHLIGHT ACTIVE SECTION
// ============================================
const sections = ['academico', 'habilidades', 'extracurriculares', 'proyectos'];

function updateActiveSection() {
    const scrollPosition = window.pageYOffset + 150;
    const navLinks = document.querySelectorAll('.nav-link');

    // Remove active class from all links
    navLinks.forEach(link => link.classList.remove('active'));

    // Find current section
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionBottom) {
                // Add active class to corresponding nav link
                const activeLink = document.querySelector(`.nav-link[data-section="${sections[i]}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
                break;
            }
        }
    }
}

window.addEventListener('scroll', updateActiveSection);
updateActiveSection(); // Initial check

// ============================================
// LIGHTBOX FOR GALLERY IMAGES
// ============================================
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    
    if (lightbox && lightboxImg) {
        lightboxImg.src = imageSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Close lightbox when clicking the close button
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.querySelector('.lightbox-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeLightbox();
        });
    }
});

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTopBtn = document.getElementById('backToTop');

function toggleBackToTop() {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

window.addEventListener('scroll', toggleBackToTop);

// ============================================
// AMBIENT BACKGROUND ANIMATION
// ============================================
function createFloatingParticle() {
    const bg = document.querySelector('.animated-bg');
    if (!bg) return;

    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 100 + 50 + 'px';
    particle.style.height = particle.style.width;
    particle.style.borderRadius = '50%';
    particle.style.background = `radial-gradient(circle, rgba(194, 24, 91, ${Math.random() * 0.1 + 0.05}) 0%, transparent 70%)`;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.pointerEvents = 'none';
    particle.style.animation = `float ${Math.random() * 20 + 15}s infinite ease-in-out`;
    particle.style.animationDelay = Math.random() * 5 + 's';

    bg.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 35000);
}

// Create particles periodically
if (window.innerWidth > 768) {
    setInterval(createFloatingParticle, 5000);
}

// ============================================
// HAMBURGER MENU TOGGLE (Mobile)
// ============================================
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navbarLinks = document.getElementById('navbarLinks');

function toggleMobileMenu() {
    hamburgerBtn.classList.toggle('active');
    navbarLinks.classList.toggle('active');
    document.body.style.overflow = navbarLinks.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    hamburgerBtn.classList.remove('active');
    navbarLinks.classList.remove('active');
    document.body.style.overflow = '';
}

if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navbarLinks && navbarLinks.classList.contains('active')) {
        if (!navbarLinks.contains(e.target) && !hamburgerBtn.contains(e.target)) {
            closeMobileMenu();
        }
    }
});

// Close menu on window resize (if resizing to desktop)
window.addEventListener('resize', () => {
    if (window.innerWidth > 968) {
        closeMobileMenu();
    }
});

// ============================================
// HOVER ANIMATIONS FOR CARDS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.content-card, .project-card, .info-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
});

// ============================================
// SMOOTH PAGE LOAD
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// ENHANCED SCROLL BEHAVIOR
// ============================================
let lastScrollTop = 0;
const header = document.querySelector('.page-header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        if (header) {
            header.style.transform = 'translateY(-10px)';
            header.style.opacity = '0.8';
        }
    } else {
        // Scrolling up
        if (header) {
            header.style.transform = 'translateY(0)';
            header.style.opacity = '1';
        }
    }
    
    lastScrollTop = scrollTop;
});

// ============================================
// KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
    // Arrow keys for navigation (when not in input)
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        if (e.key === 'ArrowDown' && e.ctrlKey) {
            e.preventDefault();
            const currentSection = getCurrentSection();
            const nextIndex = sections.indexOf(currentSection) + 1;
            if (nextIndex < sections.length) {
                scrollToSection(sections[nextIndex]);
            }
        } else if (e.key === 'ArrowUp' && e.ctrlKey) {
            e.preventDefault();
            const currentSection = getCurrentSection();
            const prevIndex = sections.indexOf(currentSection) - 1;
            if (prevIndex >= 0) {
                scrollToSection(sections[prevIndex]);
            }
        }
    }
});

function getCurrentSection() {
    const scrollPosition = window.pageYOffset + 200;
    
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
            return sections[i];
        }
    }
    return sections[0];
}

