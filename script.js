// Custom cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        // Scrolling up
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Stats counter animation
const stats = document.querySelectorAll('.number');
let animated = false;

// Calculate years of experience
function updateExperience() {
    const startYear = 2012;
    const currentYear = new Date().getFullYear();
    const years = currentYear - startYear;
    const experienceElement = document.querySelector('.experience-counter .number');
    if (experienceElement) {
        experienceElement.textContent = years + '+';
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateExperience();
});

// Update experience counter animation
function animateStats() {
    if (animated) return;
    
    const experienceElement = document.querySelector('.experience-counter .number');
    if (experienceElement) {
        const target = parseInt(experienceElement.textContent);
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const step = duration / 50;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                experienceElement.textContent = target + '+';
                clearInterval(counter);
            } else {
                experienceElement.textContent = Math.floor(current) + '+';
            }
        }, step);
    }
    
    animated = true;
}

// Observe hero section for animation
const heroSection = document.querySelector('.hero');
if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
            }
        });
    }, observerOptions);
    
    heroObserver.observe(heroSection);
}

// Add hover effect to skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
}); 