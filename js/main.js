// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loader
    initLoader();
    
    // Initialize custom cursor
    initCursor();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize portfolio filters
    initPortfolioFilters();
    
    // Initialize testimonial carousel
    initTestimonialCarousel();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize particle effects
    initParticles();
    
    // Initialize interactive process
    initInteractiveProcess();
});

// Loader animation
function initLoader() {
    const loader = document.querySelector('.loader');
    
    // Simulate loading time (you can replace this with actual loading logic)
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        document.body.classList.add('loaded');
    }, 2500);
}

// Custom cursor
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const links = document.querySelectorAll('a, button, .btn-primary, .btn-secondary, .filter-btn, .portfolio-item');
    
    // Move custom cursor with mouse
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    
    // Change cursor style when hovering over clickable elements
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Handle cursor disappearing when leaving the window
    document.addEventListener('mouseout', () => {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseover', () => {
        cursor.style.opacity = '1';
    });
}

// Navigation functionality
function initNavigation() {
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav a');
    
    // Change header style on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for header height
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal-text');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Initialize GSAP ScrollTrigger for advanced animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Hero section parallax
        gsap.to('.hero-bg', {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
        
        // Animate blobs
        gsap.to('.blob-1', {
            xPercent: -20,
            yPercent: 10,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });
        
        gsap.to('.blob-2', {
            xPercent: 20,
            yPercent: -10,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });
        
        // Service cards staggered animation
        gsap.from('.service-card', {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 80%'
            }
        });
        
        // Portfolio items staggered animation
        gsap.from('.portfolio-item', {
            y: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.portfolio-grid',
                start: 'top 80%'
            }
        });
    }
}

// Portfolio filters
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    gsap.to(item, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.3,
                        ease: 'power1.out',
                        onComplete: () => {
                            item.style.display = 'block';
                        }
                    });
                } else {
                    gsap.to(item, {
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power1.out',
                        onComplete: () => {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Testimonial carousel
function initTestimonialCarousel() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    
    // Check if testimonial elements exist before initializing
    if (!slides.length || !dots.length || !prevButton || !nextButton) {
        console.log('Testimonial carousel elements not found, skipping initialization');
        return;
    }
    
    let currentSlide = 0;
    
    // Function to show a specific slide
    const showSlide = (index) => {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected slide
        slides[index].classList.add('active');
        
        // Add active class to the corresponding dot
        dots[index].classList.add('active');
        
        // Update current slide index
        currentSlide = index;
    };
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Event listener for prev button
    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });
    
    // Event listener for next button
    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });
    
    // Auto-advance slides every 8 seconds (longer to give users time to read the exclusive content)
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 8000);
}

// Contact form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const budget = document.getElementById('budget').value;
            const message = document.getElementById('message').value;
            
            // Simulate form submission (replace with actual form submission logic)
            const submitBtn = contactForm.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('.btn-icon i');
            
            // Show loading state
            btnText.textContent = 'Sending...';
            btnIcon.className = 'fas fa-spinner fa-spin';
            
            // Simulate API call
            setTimeout(() => {
                // Show success state
                btnText.textContent = 'Message Sent!';
                btnIcon.className = 'fas fa-check';
                
                // Reset form
                contactForm.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    btnText.textContent = 'Send Message';
                    btnIcon.className = 'fas fa-paper-plane';
                }, 3000);
            }, 1500);
        });
    }
}

// Particle effects
function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    
    if (particlesContainer) {
        // Create particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 3 + 1;
            
            // Random opacity
            const opacity = Math.random() * 0.5 + 0.3;
            
            // Apply styles
            particle.style.cssText = `
                position: absolute;
                top: ${posY}%;
                left: ${posX}%;
                width: ${size}px;
                height: ${size}px;
                background-color: rgba(255, 255, 255, ${opacity});
                border-radius: 50%;
                pointer-events: none;
                animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
            `;
            
            particlesContainer.appendChild(particle);
        }
    }
}

// Interactive process section
function initInteractiveProcess() {
    const processSteps = document.querySelectorAll('.process-step');
    const understoodButtons = document.querySelectorAll('.btn-understood');
    
    console.log('Process steps found:', processSteps.length);
    console.log('Understood buttons found:', understoodButtons.length);
    
    if (understoodButtons.length > 0) {
        understoodButtons.forEach(button => {
            console.log('Adding click listener to button with data-unlock:', button.getAttribute('data-unlock'));
            
            button.addEventListener('click', (event) => {
                event.preventDefault();
                console.log('Button clicked!');
                
                // Get the current step and the step to unlock
                const currentStep = button.closest('.process-step');
                const unlockStepNumber = button.getAttribute('data-unlock');
                const stepToUnlock = document.querySelector(`.process-step[data-step="${unlockStepNumber}"]`);
                
                console.log('Current step:', currentStep);
                console.log('Step to unlock:', stepToUnlock);
                
                // Mark current step as completed
                currentStep.classList.remove('active');
                currentStep.classList.add('completed');
                
                // Unlock and activate the next step
                if (stepToUnlock) {
                    stepToUnlock.classList.remove('locked');
                    stepToUnlock.classList.add('active');
                    
                    // Remove lock overlay
                    const lockOverlay = stepToUnlock.querySelector('.lock-overlay');
                    if (lockOverlay) {
                        lockOverlay.style.display = 'none';
                    }
                    
                    // No scrolling - just log that we're unlocking the next step
                    console.log('Unlocked next step without scrolling');
                }
            });
        });
        
        // Initialize the first step as active (already done in HTML)
        // Make sure all other steps are locked (already done in HTML)
    }
    
    // Add hover effect to process steps
    processSteps.forEach(step => {
        if (!step.classList.contains('locked')) {
            step.addEventListener('mouseenter', () => {
                if (!step.classList.contains('active')) {
                    step.style.transform = 'scale(1.01)';
                }
            });
            
            step.addEventListener('mouseleave', () => {
                if (!step.classList.contains('active')) {
                    step.style.transform = '';
                }
            });
        }
    });
}

// Mouse-following floating shapes
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Apply subtle movement to blobs based on mouse position
    const blobs = document.querySelectorAll('.blob');
    blobs.forEach((blob, index) => {
        const speed = 0.05 - (index * 0.01);
        const x = (mouseX - window.innerWidth / 2) * speed;
        const y = (mouseY - window.innerHeight / 2) * speed;
        
        blob.style.transform = `translate(${x}px, ${y}px) scale(${1 + (index * 0.05)})`;
    });
});

// Add keyframe animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0% {
            transform: translate(0, 0);
        }
        25% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
        75% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
        100% {
            transform: translate(0, 0);
        }
    }
`;
document.head.appendChild(style);