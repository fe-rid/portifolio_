/**
 * Portfolio Website JavaScript
 * Features:
 * - Smooth scrolling navigation
 * - Mobile menu toggle
 * - Scroll animations
 * - Project modal popup
 * - Form validation
 * - Header background on scroll
 */

// ========================================
// DOM Elements
// ========================================
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const modalBody = document.getElementById('modal-body');
const currentYear = document.getElementById('current-year');

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize smooth scroll
    initSmoothScroll();

    // Initialize header scroll effect
    initHeaderScroll();

    // Initialize mobile menu
    initMobileMenu();

    // Initialize project modals
    initProjectModals();

    // Initialize certificate modals
    initCertificateModals();

    // Initialize form validation
    initFormValidation();
});

// ========================================
// Header Scroll Effect
// ========================================
/**
 * Adds/removes 'scrolled' class to header on scroll
 * Changes header background from transparent to solid
 */
function initHeaderScroll() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ========================================
// Smooth Scroll Navigation
// ========================================
/**
 * Implements smooth scrolling for navigation links
 */
function initSmoothScroll() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');

            // Only smooth scroll if link is an internal anchor
            if (targetId.startsWith('#')) {
                e.preventDefault();

                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                }
            }
        });
    });

    // Smooth scroll for "View My Work" button
    const viewWorkBtn = document.querySelector('.btn-primary[href="#projects"]');
    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = projectsSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// ========================================
// Mobile Menu Toggle
// ========================================
/**
 * Handles mobile hamburger menu toggle with slide animation
 */
function initMobileMenu() {
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    }
}

// ========================================
// Scroll Animations
// ========================================
/**
 * Adds scroll reveal animations to elements
 * Elements fade in and slide up when they come into view
 */
function initScrollAnimations() {
    // Select all elements that should animate on scroll
    const revealElements = document.querySelectorAll('.about-content, .skill-item, .project-card, .certificate-card, .contact-content, .section-title');

    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    });

    // Add scroll-reveal class and observe each element
    revealElements.forEach(element => {
        element.classList.add('scroll-reveal');
        observer.observe(element);
    });
}

// ========================================
// Project Modal
// ========================================
/**
 * Project data - Easy to customize with your actual projects
 * Add more projects by adding objects to this array
 */
const projectsData = {
    1: {
        title: 'HandyConnect – Mobile App',
        description: 'HandyConnect is a mobile application that connects users with nearby service providers. The app focuses on simplicity, performance, and user experience, allowing users to browse services, view provider details, and communicate efficiently.',
        image: 'img/handy connect.png',
        technologies: ['Flutter', 'Firebase', 'REST APIs'],
        download: 'apps/Handy-Connect.apk',
        github: 'https://github.com/Abdurezakkemal/Handy_Connect/tree/main/handy_connect',
        demo: null
    },
    2: {
        title: 'Expense Tracker App',
        description: 'Expense Tracker App is a mobile application that helps users record, manage, and analyze daily expenses. Users can add income and expense entries, categorize transactions, and view clear summaries of their spending habits through a clean and intuitive interface.',
        image: 'img/home.png',
        technologies: ['Vite', 'React', 'TypeScript', 'TailwindCSS', 'Supabase', 'Capacitor (Android)'],
        download: 'apps/Expense-Tracker.apk',
        github: 'https://github.com/fe-rid/expenseTracker',
        demo: null
    },
    3: {
        title: 'University Delivery App',
        description: 'University Delivery App is a comprehensive campus-based delivery platform that enables students to order food and essentials with ease. The application features a streamlined ordering process, secure authentication, and specialized interfaces for students, shopkeepers, and runners to manage orders and deliveries efficiently.',
        image: 'img/uni delivery.png',
        technologies: ['Vite', 'React', 'Node.js', 'MongoDB', 'TailwindCSS', 'Express'],
        download: 'apps/University-Delivery.apk',
        github: 'https://github.com/fe-rid/uniDeliveryApp',
        demo: null
    },
    4: {
        title: 'Stay Manager',
        description: 'Stay Manager is a comprehensive hotel management system designed to streamline operations, manage bookings, and enhance the guest experience with a clean and intuitive interface.',
        image: 'img/stay manager.png',
        technologies: ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'Capacitor'],
        download: 'apps/StayManager.apk',
        github: 'https://github.com/fe-rid/hotel_management_saas',
        demo: null
    },
    5: {
        title: 'Campus Service Website',
        description: 'Campus Service is a web platform designed to streamline student life and service requests. It provides a modern, fast, and responsive user experience for the campus community.',
        image: 'img/campus service.png',
        technologies: ['React', 'TypeScript', 'Vite', 'TailwindCSS'],
        download: null,
        github: 'https://github.com/fe-rid/uni_service', 
        demo: 'https://campus-service.vercel.app/'
    },
    6: {
        title: 'Study AI – AI-Powered Assistant',
        description: 'Study AI is a professional AI-driven platform designed to help students learn and study more efficiently. With an intuitive, modern interface, it allows users to explore complex academic topics like Computer Science, Physics, and History using advanced AI tools.',
        image: 'img/Study Ai.png',
        technologies: ['Next.js', 'OpenAI API', 'TypeScript', 'TailwindCSS', 'Vercel Deployment'],
        download: null,
        github: 'https://github.com/fe-rid/study_AI', 
        demo: 'https://study-ai-av21.vercel.app/'
    }
};

/**
 * Opens project modal with project details
 */
function initProjectModals() {
    projectCards.forEach(card => {
        const viewDetailsBtn = card.querySelector('.btn-view-details');
        const cardElement = card;

        // Add click event to "View Details" button
        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const projectId = cardElement.getAttribute('data-project');
                openModal(projectId);
            });
        }

        // Add click event to entire card (optional - opens modal on card click)
        cardElement.addEventListener('click', (e) => {
            // Don't open modal if clicking on links
            if (!e.target.closest('.project-link')) {
                const projectId = cardElement.getAttribute('data-project');
                openModal(projectId);
            }
        });
    });

    // Close modal when clicking close button
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside modal content
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * Opens the modal and displays project information
 * @param {string} projectId - The ID of the project to display
 */
function openModal(projectId) {
    const project = projectsData[projectId];

    if (!project) return;

    // Create modal content
    modalBody.innerHTML = `
        <h3>${project.title}</h3>
        ${project.image ? `<div class="modal-project-image"><img src="${project.image}" alt="${project.title}"></div>` : ''}
        <p>${project.description}</p>
        <div class="project-tech">
            ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
        </div>
        <div class="project-links" style="margin-top: 1.5rem;">
            ${project.download ? `
            <a href="${project.download}" class="project-link" download aria-label="Download App">
                <i class="fas fa-download"></i>
            </a>` : ''}
            ${project.github ? `
            <a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i class="fab fa-github"></i>
            </a>` : ''}
            ${project.demo ? `<a href="${project.demo}" class="project-link" target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                <i class="fas fa-external-link-alt"></i>
            </a>` : ''}
        </div>
    `;

    // Show modal with animation
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

/**
 * Closes the modal
 */
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// ========================================
// Certificate Modal
// ========================================
/**
 * Certificate data mapping
 */
const certificateData = {
    'udacity': {
        image: 'img/Programming Fundamentals.png',
        title: 'Programming Fundamentals - Udacity'
    },
    'flutter-track': {
        image: 'img/Alferid Zeinu.png',
        title: 'Flutter Track Course - NSDA'
    },
    'hackathon': {
        image: 'img/nsda hackathon.png',
        title: 'Hackathon Winner - NSDA'
    }
};

/**
 * Initializes certificate modal functionality
 */
function initCertificateModals() {
    const certificateModal = document.getElementById('certificate-modal');
    const certificateModalClose = document.getElementById('certificate-modal-close');
    const certificateModalBody = document.getElementById('certificate-modal-body');
    const viewCertificateBtns = document.querySelectorAll('.btn-view-certificate');

    if (!certificateModal || !certificateModalBody) return;

    // Add click event to all "View Full Size" buttons
    viewCertificateBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const certId = btn.getAttribute('data-cert');
            openCertificateModal(certId);
        });
    });

    // Also open modal when clicking on certificate card
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.btn-view-certificate')) {
                const btn = card.querySelector('.btn-view-certificate');
                if (btn) {
                    const certId = btn.getAttribute('data-cert');
                    openCertificateModal(certId);
                }
            }
        });
    });

    // Close modal when clicking close button
    if (certificateModalClose) {
        certificateModalClose.addEventListener('click', () => {
            closeCertificateModal();
        });
    }

    // Close modal when clicking outside modal content
    certificateModal.addEventListener('click', (e) => {
        if (e.target === certificateModal) {
            closeCertificateModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certificateModal.classList.contains('active')) {
            closeCertificateModal();
        }
    });
}

/**
 * Opens the certificate modal and displays the certificate image
 * @param {string} certId - The ID of the certificate to display
 */
function openCertificateModal(certId) {
    const certificateModal = document.getElementById('certificate-modal');
    const certificateModalBody = document.getElementById('certificate-modal-body');
    const certificate = certificateData[certId];

    if (!certificate || !certificateModalBody) return;

    // Create modal content with certificate image
    certificateModalBody.innerHTML = `
        <img src="${certificate.image}" alt="${certificate.title}" />
    `;

    // Show modal with animation
    certificateModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

/**
 * Closes the certificate modal
 */
function closeCertificateModal() {
    const certificateModal = document.getElementById('certificate-modal');
    if (certificateModal) {
        certificateModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// ========================================
// Form Validation
// ========================================
/**
 * Initializes form validation with real-time error checking
 */
function initFormValidation() {
    if (!contactForm) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    // Real-time validation on input
    if (nameInput) {
        nameInput.addEventListener('blur', () => validateName());
        nameInput.addEventListener('input', () => clearError(nameError));
    }

    if (emailInput) {
        emailInput.addEventListener('blur', () => validateEmail());
        emailInput.addEventListener('input', () => clearError(emailError));
    }

    if (messageInput) {
        messageInput.addEventListener('blur', () => validateMessage());
        messageInput.addEventListener('input', () => clearError(messageError));
    }

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isMessageValid) {
            // Form is valid - you can add code here to submit the form
            // For example: send data to a server, show success message, etc.

            // Show success message (you can customize this)
            alert('Thank you for your message! I will get back to you soon.');

            // Reset form
            contactForm.reset();

            // Reset labels position
            const labels = document.querySelectorAll('.form-label');
            labels.forEach(label => {
                const input = document.querySelector(`#${label.getAttribute('for')}`);
                if (input && !input.value) {
                    label.style.top = '18px';
                    label.style.fontSize = '1rem';
                    label.style.color = '';
                    label.style.backgroundColor = '';
                }
            });
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.form-error:not(:empty)');
            if (firstError) {
                firstError.closest('.form-group').scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    /**
     * Validates the name field
     * @returns {boolean} True if valid, false otherwise
     */
    function validateName() {
        const name = nameInput.value.trim();
        if (!name) {
            showError(nameError, 'Name is required');
            return false;
        }
        if (name.length < 2) {
            showError(nameError, 'Name must be at least 2 characters');
            return false;
        }
        clearError(nameError);
        return true;
    }

    /**
     * Validates the email field
     * @returns {boolean} True if valid, false otherwise
     */
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            showError(emailError, 'Email is required');
            return false;
        }
        if (!emailRegex.test(email)) {
            showError(emailError, 'Please enter a valid email address');
            return false;
        }
        clearError(emailError);
        return true;
    }

    /**
     * Validates the message field
     * @returns {boolean} True if valid, false otherwise
     */
    function validateMessage() {
        const message = messageInput.value.trim();
        if (!message) {
            showError(messageError, 'Message is required');
            return false;
        }
        if (message.length < 10) {
            showError(messageError, 'Message must be at least 10 characters');
            return false;
        }
        clearError(messageError);
        return true;
    }

    /**
     * Displays an error message
     * @param {HTMLElement} errorElement - The error element to show message in
     * @param {string} message - The error message to display
     */
    function showError(errorElement, message) {
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    /**
     * Clears an error message
     * @param {HTMLElement} errorElement - The error element to clear
     */
    function clearError(errorElement) {
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
}

// ========================================
// Additional Utility Functions
// ========================================

/**
 * Smooth scroll polyfill for older browsers (if needed)
 * Modern browsers support smooth scroll natively
 */
function smoothScrollTo(element, offset = 0) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

