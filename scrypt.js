// DOM Elements
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const progressBar = document.querySelector('.progress-bar');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeCursor();
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeContactForm();
    initializeCounters();
    initializeSkillBars();
    initializeParallax();
    initializeTypewriter();
});

// Custom Cursor
function initializeCursor() {
    let cursorVisible = false;
    let cursorEnlarged = false;

    const dotOpacity = 0.7;
    const outlineOpacity = 0.4;

    const toggleCursorVisibility = () => {
        if (cursorVisible) {
            cursorDot.style.opacity = dotOpacity;
            cursorOutline.style.opacity = outlineOpacity;
        } else {
            cursorDot.style.opacity = 0;
            cursorOutline.style.opacity = 0;
        }
    };

    const toggleCursorSize = () => {
        if (cursorEnlarged) {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.75)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        } else {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    };

    document.addEventListener('mouseenter', () => {
        cursorVisible = true;
        toggleCursorVisibility();
        cursorDot.style.opacity = dotOpacity;
        cursorOutline.style.opacity = outlineOpacity;
    });

    document.addEventListener('mouseleave', () => {
        cursorVisible = false;
        toggleCursorVisibility();
    });

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        cursorDot.style.left = x + 'px';
        cursorDot.style.top = y + 'px';

        cursorOutline.animate({
            left: x + 'px',
            top: y + 'px'
        }, { duration: 500, fill: 'forwards' });
    });

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .tech-icon, .skill-item, input, textarea, select');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorEnlarged = true;
            toggleCursorSize();
        });

        element.addEventListener('mouseleave', () => {
            cursorEnlarged = false;
            toggleCursorSize();
        });
    });
}

// Navigation
function initializeNavigation() {
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
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
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Active navigation highlight
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll Effects
function initializeScrollEffects() {
    // Progress bar
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        progressBar.style.width = progress + '%';
    });

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger skill bars animation
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
                
                // Trigger counter animation
                if (entry.target.classList.contains('about')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('section, .project-card, .skill-category, .contact-method').forEach(el => {
        observer.observe(el);
    });
}

// Animations
function initializeAnimations() {
    // Floating elements parallax
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const elements = document.querySelectorAll('.float-element');
        
        elements.forEach(element => {
            const speed = element.dataset.speed || 1;
            const yPos = -(scrolled * speed * 0.1);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Tech icons animation
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.1}s`;
        
        icon.addEventListener('mouseenter', () => {
            icon.style.animation = 'none';
            setTimeout(() => {
                icon.style.animation = 'float 3s ease-in-out infinite';
            }, 10);
        });
    });
}

// Contact Form
function initializeContactForm() {
    const form = document.querySelector('.form');
    const inputs = form.querySelectorAll('input, textarea, select');
    
    // Form validation and submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name') || document.getElementById('name').value;
        const email = formData.get('email') || document.getElementById('email').value;
        const service = formData.get('service') || document.getElementById('service').value;
        const message = formData.get('message') || document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Por favor completa todos los campos requeridos', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Por favor ingresa un email válido', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Create WhatsApp message
            const whatsappMessage = `¡Hola Diego! Me llamo ${name}.\n\n` +
                                  `Email: ${email}\n` +
                                  `Tipo de proyecto: ${service || 'No especificado'}\n\n` +
                                  `Mensaje: ${message}\n\n` +
                                  `Enviado desde tu portafolio web.`;
            
            const whatsappUrl = `https://wa.me/573184326655?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Reset form
            form.reset();
            inputs.forEach(input => {
                if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') {
                    input.classList.remove('filled');
                }
            });
            
            // Show success message
            showNotification('¡Mensaje enviado! Te redirigimos a WhatsApp', 'success');
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
    
    // Input animations
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            if (input.value) {
                input.classList.add('filled');
            } else {
                input.classList.remove('filled');
            }
        });
        
        input.addEventListener('input', () => {
            if (input.value) {
                input.classList.add('filled');
            } else {
                input.classList.remove('filled');
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : type === 'error' ? 'rgba(239, 68, 68, 0.9)' : 'rgba(59, 130, 246, 0.9)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Counters Animation
function initializeCounters() {
    const counterElements = document.querySelectorAll('[data-target]');
    counterElements.forEach(counter => {
        counter.counterStarted = false;
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    counters.forEach(counter => {
        if (!counter.counterStarted) {
            counter.counterStarted = true;
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
                if (target === 100) {
                    counter.textContent = Math.floor(current) + '%';
                }
            }, 50);
        }
    });
}

// Skill Bars Animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        bar.animated = false;
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        if (!bar.animated) {
            bar.animated = true;
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            }, index * 200);
        }
    });
}

// Parallax Effect
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Hero background parallax
        const heroBackground = document.querySelector('.hero-bg');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate * 0.5}px)`;
        }
        
        // Floating elements parallax
        document.querySelectorAll('.floating-elements .float-element').forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Typewriter Effect
function initializeTypewriter() {
    const typewriterElements = document.querySelectorAll('.hero-title .line');
    
    typewriterElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 300);
    });
}

// Utility Functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Performance optimized scroll events
const throttledScrollHandler = throttle(() => {
    // Handle scroll events here if needed
}, 16);

window.addEventListener('scroll', throttledScrollHandler);

// Resize handler
const resizeHandler = debounce(() => {
    // Handle resize events here if needed
    const isMobile = window.innerWidth <= 768;
    
    // Adjust animations for mobile
    if (isMobile) {
        document.documentElement.style.setProperty('--cursor-display', 'none');
    } else {
        document.documentElement.style.setProperty('--cursor-display', 'block');
    }
}, 250);

window.addEventListener('resize', resizeHandler);

// Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-text > *');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
});

// Enhanced Mobile Experience
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.body.classList.add('touch-device');
    
    // Disable cursor effects on mobile
    if (cursorDot) cursorDot.style.display = 'none';
    if (cursorOutline) cursorOutline.style.display = 'none';
    
    // Add touch feedback
    const touchElements = document.querySelectorAll('.project-card, .btn-primary, .btn-secondary, .tech-icon');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 150);
        });
    });
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
    
    // Arrow keys for project navigation
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const projectCards = document.querySelectorAll('.project-card');
        const focusedCard = document.activeElement;
        const currentIndex = Array.from(projectCards).indexOf(focusedCard);
        
        if (currentIndex !== -1) {
            e.preventDefault();
            const nextIndex = e.key === 'ArrowLeft' 
                ? (currentIndex - 1 + projectCards.length) % projectCards.length
                : (currentIndex + 1) % projectCards.length;
            projectCards[nextIndex].focus();
        }
    }
});

// Add focus styles for accessibility
const style = document.createElement('style');
style.textContent = `
    .project-card:focus,
    .tech-icon:focus,
    .btn-primary:focus,
    .btn-secondary:focus {
        outline: 2px solid #667eea;
        outline-offset: 4px;
    }
    
    .touch-active {
        transform: scale(0.98) !important;
        transition: transform 0.1s ease !important;
    }
    
    @media (max-width: 768px) {
        .cursor-dot,
        .cursor-outline {
            display: none !important;
        }
    }
`;
document.head.appendChild(style);

// Export functions for testing if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeCursor,
        initializeNavigation,
        showNotification,
        animateCounters,
        animateSkillBars
    };
}