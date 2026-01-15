/**
 * Will Austin Portfolio - Interactive Features
 * Modern, engaging website interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initTypingEffect();
    initNavigation();
    initStatsCounter();
    initTestimonialsSlider();
    initScrollAnimations();
    initTimelineProgress();
    initSmoothScroll();
});

/**
 * Typing Effect for Hero Section
 */
function initTypingEffect() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    const phrases = [
        'build AI-powered analytics platforms',
        'lead high-performing engineering teams',
        'transform data into actionable insights',
        'architect scalable cloud solutions',
        'drive innovation in healthcare tech'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 50;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 30;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 50;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before new phrase
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing after a short delay
    setTimeout(type, 1000);
}

/**
 * Navigation - Mobile Toggle & Scroll Effects
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('.nav-floating');

    // Mobile toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Scroll effect for nav
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (nav) {
            if (currentScroll > 100) {
                nav.style.top = '1rem';
            } else {
                nav.style.top = '1.5rem';
            }
        }

        lastScroll = currentScroll;
    });
}

/**
 * Stats Counter Animation
 */
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    if (!stats.length) return;

    const animateCount = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
            current += step;
            if (current < target) {
                el.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        };

        update();
    };

    // Use Intersection Observer to trigger animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

/**
 * Testimonials Slider
 */
function initTestimonialsSlider() {
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');

    if (!track || !prevBtn || !nextBtn) return;

    const cards = track.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    let cardsPerView = window.innerWidth > 1024 ? 2 : 1;

    // Create dots
    const totalSlides = Math.ceil(cards.length / cardsPerView);
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll('.slider-dot');

    function updateSlider() {
        const cardWidth = cards[0].offsetWidth + 24; // Including gap
        track.style.transform = `translateX(-${currentIndex * cardWidth * cardsPerView}px)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
        updateSlider();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto-advance every 5 seconds
    let autoSlide = setInterval(nextSlide, 5000);

    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(autoSlide));
    track.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 5000);
    });

    // Handle resize
    window.addEventListener('resize', () => {
        const newCardsPerView = window.innerWidth > 1024 ? 2 : 1;
        if (newCardsPerView !== cardsPerView) {
            cardsPerView = newCardsPerView;
            currentIndex = 0;
            
            // Rebuild dots
            dotsContainer.innerHTML = '';
            const newTotalSlides = Math.ceil(cards.length / cardsPerView);
            for (let i = 0; i < newTotalSlides; i++) {
                const dot = document.createElement('div');
                dot.classList.add('slider-dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
            
            updateSlider();
        }
    });
}

/**
 * Scroll-triggered Animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Timeline Progress Animation
 */
function initTimelineProgress() {
    const timelineLine = document.querySelector('.timeline-line');
    const timelineProgress = document.querySelector('.timeline-progress');
    const experienceCards = document.querySelectorAll('.experience-card');

    if (!timelineLine || !timelineProgress || !experienceCards.length) return;

    const observer = new IntersectionObserver((entries) => {
        let highestVisible = 0;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(experienceCards).indexOf(entry.target);
                highestVisible = Math.max(highestVisible, index + 1);
            }
        });

        const progressHeight = (highestVisible / experienceCards.length) * 100;
        timelineProgress.style.height = `${progressHeight}%`;
    }, {
        threshold: 0.3
    });

    experienceCards.forEach(card => observer.observe(card));
}

/**
 * Smooth Scroll for Navigation Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Parallax effect for gradient orbs (subtle)
 */
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 10;
        const x = mouseX * speed;
        const y = mouseY * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

/**
 * Add active state to nav links based on scroll position
 */
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.pageYOffset >= sectionTop) {
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
