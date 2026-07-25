/* ===== TYPING EFFECT ===== */

const typingTexts = [
    "IT Engineering Student",
    "Aspiring Software Developer",
    "Web Development Enthusiast",
    "Problem Solver",
    "Code Creative"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 50;
let pauseTime = 2000;

function typeEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const currentText = typingTexts[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = deletingSpeed;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = pauseTime;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
    }

    setTimeout(typeEffect, typingSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
});

/* ===== PRELOADER ===== */

window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
});

/* ===== NAVBAR SCROLL EFFECT ===== */

const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scroll-active');
    } else {
        header.classList.remove('scroll-active');
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();
});

/* ===== SMOOTH SCROLL & ACTIVE NAV ===== */

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');

            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

/* ===== HAMBURGER MENU ===== */

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

/* ===== SCROLL REVEAL ANIMATION ===== */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all elements that should animate on scroll
const animateElements = document.querySelectorAll('.skill-card, .project-card, .stat-card, .highlight-item, .contact-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

/* ===== SKILL BARS ANIMATION ===== */

function animateSkillBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-in-out';
                    bar.style.width = width;
                }, 100);
                
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => skillObserver.observe(bar));
}

window.addEventListener('load', animateSkillBars);

/* ===== CONTACT FORM HANDLING ===== */

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validate form
        if (!name || !email || !subject || !message) {
            showNotification('Please fill all fields', 'error');
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email', 'error');
            return;
        }

        // Create mailto link
        const mailtoLink = `mailto:premtope1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
        
        window.location.href = mailtoLink;

        showNotification('Email client opened! Please send your message.', 'success');
        contactForm.reset();
    });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/* ===== FOOTER YEAR ===== */

const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

/* ===== KEYBOARD SHORTCUTS ===== */

document.addEventListener('keydown', (e) => {
    // Quick navigation with keyboard
    if (e.ctrlKey || e.metaKey) {
        switch(e.key.toLowerCase()) {
            case 'h':
                e.preventDefault();
                document.querySelector('a[href="#home"]').click();
                break;
            case 'a':
                e.preventDefault();
                document.querySelector('a[href="#about"]').click();
                break;
            case 's':
                e.preventDefault();
                document.querySelector('a[href="#skills"]').click();
                break;
            case 'p':
                e.preventDefault();
                document.querySelector('a[href="#projects"]').click();
                break;
            case 'c':
                e.preventDefault();
                document.querySelector('a[href="#contact"]').click();
                break;
        }
    }
});

/* ===== ANALYTICS - Page View Tracking ===== */

function trackPageView() {
    const pageInfo = {
        url: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    };
    console.log('Page view tracked:', pageInfo);
}

window.addEventListener('load', trackPageView);

/* ===== SMOOTH ANIMATIONS ON PAGE LOAD ===== */

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Stagger animations
    const animatedElements = document.querySelectorAll('.hero-badge, .hero-content h1, .hero-subtitle, .hero-description, .hero-buttons, .social-links');
    
    animatedElements.forEach((el, index) => {
        el.style.animation = `slideInUp 0.6s ease ${index * 0.1}s backwards`;
    });
});

/* ===== PERFORMANCE OPTIMIZATION ===== */

// Lazy load images if used in future
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

/* ===== SCROLL TO TOP BUTTON ===== */

function createScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #00d4ff, #ff006e);
        border: none;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 999;
        font-size: 20px;
        transition: all 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
    `;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollButton.style.display = 'flex';
        } else {
            scrollButton.style.display = 'none';
        }
    });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollButton.addEventListener('mouseover', () => {
        scrollButton.style.transform = 'scale(1.1)';
    });

    scrollButton.addEventListener('mouseout', () => {
        scrollButton.style.transform = 'scale(1)';
    });

    document.body.appendChild(scrollButton);
}

document.addEventListener('DOMContentLoaded', createScrollToTopButton);

/* ===== PROJECT CARD INTERACTIONS ===== */

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

/* ===== SKILL CARD HOVER EFFECT ===== */

const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.05)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

/* ===== COUNTER ANIMATION ===== */

function animateCounters() {
    const statCards = document.querySelectorAll('.stat-card h3');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                
                if (text.includes('+')) {
                    const number = parseInt(text);
                    let current = 0;
                    const increment = Math.ceil(number / 50);
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            entry.target.textContent = number + '+';
                            clearInterval(timer);
                        } else {
                            entry.target.textContent = current + '+';
                        }
                    }, 30);
                }
                
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statCards.forEach(card => counterObserver.observe(card));
}

window.addEventListener('load', animateCounters);

/* ===== RANDOM STARS ANIMATION ===== */

function createStars() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;

    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #00d4ff;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random()};
            animation: twinkle ${2 + Math.random() * 3}s ease-in-out infinite;
        `;
        starsContainer.appendChild(star);
    }

    // Add twinkle animation to style if not exists
    if (!document.querySelector('style[data-stars]')) {
        const style = document.createElement('style');
        style.setAttribute('data-stars', 'true');
        style.textContent = `
            @keyframes twinkle {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

window.addEventListener('load', createStars);

/* ===== CONSOLE WELCOME MESSAGE ===== */

console.log(
    '%cWelcome to Prem Tope Portfolio! 🚀',
    'font-size: 20px; color: #00d4ff; font-weight: bold; text-shadow: 0 0 10px #00d4ff;'
);
console.log(
    '%cLet\'s connect and build something amazing together!\n%cGitHub: github.com/premtope1\nLinkedIn: linkedin.com/in/prem-tope-3a7a60388\nEmail: premtope1@gmail.com',
    'font-size: 14px; color: #cbd5e1;',
    'font-size: 13px; color: #38bdf8; font-weight: 600;'
);
