/**
 * Alferid Zeinu - Portfolio JavaScript
 * Premium Minimalist Edition
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLocalTime();
    initHeader();
    initSmoothScroll();
    initScrollReveal();
    initProjectModals();
    initYear();
});

/**
 * Update local time in the hero section
 */
function initLocalTime() {
    const timeElement = document.getElementById('local-time');
    if (!timeElement) return;

    const updateTime = () => {
        const now = new Date();
        const options = {
            timeZone: 'Africa/Addis_Ababa',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        const timeString = now.toLocaleTimeString('en-US', options);
        timeElement.textContent = `Addis Ababa, ET — ${timeString}`;
    };

    updateTime();
    setInterval(updateTime, 60000); // Update every minute
}

/**
 * Handle Theme Switching
 */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save preference
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('portfolio-theme', 'dark');
        } else {
            localStorage.setItem('portfolio-theme', 'light');
        }
    });
}

function initHeader() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Simple smooth scroll for navigation
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = document.getElementById('header').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * intersection observer for fade-in animations
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

/**
 * Project Data & Modals
 */
const projectsData = {
    1: {
        title: 'HandyConnect',
        description: 'A mobile application connecting users with nearby service providers. Real-time communication and provider discovery.',
        image: 'img/handy connect.png',
        tech: ['Flutter', 'Firebase', 'Google Maps API'],
        github: 'https://github.com/Abdurezakkemal/Handy_Connect/tree/main/handy_connect',
        download: 'apps/Handy-Connect.apk'
    },
    2: {
        title: 'Expense Tracker',
        description: 'Intuitive personal finance management app. Track spending, categorize expenses, and visualize financial health.',
        image: 'img/home.png',
        tech: ['React', 'TypeScript', 'Supabase'],
        github: 'https://github.com/fe-rid/expenseTracker',
        download: 'apps/Expense-Tracker.apk'
    },
    3: {
        title: 'Uni Delivery',
        description: 'Campus-wide delivery ecosystem for students. Streamlined ordering and tracking for university services.',
        image: 'img/uni delivery.png',
        tech: ['React', 'Node.js', 'MongoDB'],
        github: 'https://github.com/fe-rid/uniDeliveryApp',
        download: 'apps/University-Delivery.apk'
    },
    4: {
        title: 'Stay Manager',
        description: 'Professional SaaS solution for hotel management. Handle bookings, guests, and administrative tasks.',
        image: 'img/stay manager.png',
        tech: ['React', 'TypeScript', 'Tailwind'],
        github: 'https://github.com/fe-rid/hotel_management_saas',
        download: 'apps/StayManager.apk'
    },
    5: {
        title: 'Campus Service',
        description: 'A centralized portal for all university student resources. Announcements, help desks, and peer services.',
        image: 'img/campus service.png',
        tech: ['Next.js', 'Vercel', 'Tailwind'],
        github: 'https://github.com/fe-rid/uni_service',
        demo: 'https://campus-service.vercel.app/'
    },
    6: {
        title: 'Study AI',
        description: 'Advanced academic assistant powered by large language models. Helps students master complex subjects.',
        image: 'img/Study Ai.png',
        tech: ['Next.js', 'OpenAI API', 'TypeScript'],
        github: 'https://github.com/fe-rid/study_AI',
        demo: 'https://study-ai-av21.vercel.app/'
    },
    'cert-1': {
        title: 'Programming Fundamentals',
        description: 'Completed comprehensive course on programming logic, data structures, and algorithmic thinking.',
        image: 'img/Programming Fundamentals.png',
        tech: ['Java', 'CS Logic', 'Algorithms'],
        link: '#'
    },
    'cert-2': {
        title: 'Flutter Track Course',
        description: 'Professional training in Flutter and Dart for cross-platform mobile application development.',
        image: 'img/Alferid Zeinu.png',
        tech: ['Flutter', 'Dart', 'Mobile UI'],
        link: '#'
    },
    'cert-3': {
        title: 'Hackathon Winner',
        description: 'Awarded for developing the most innovative and functional prototype within 48 hours.',
        image: 'img/nsda hackathon.png',
        tech: ['Problem Solving', 'Prototyping', 'Execution'],
        link: '#'
    }
};

function initProjectModals() {
    const listItems = document.querySelectorAll('.list-item');
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.getElementById('modal-close');

    if (!modal || !modalBody) return;

    listItems.forEach(item => {
        item.addEventListener('click', () => {
            const id = item.getAttribute('data-project');
            const data = projectsData[id];

            if (data) {
                modalBody.innerHTML = `
                    <div class="modal-project-header">
                        <h2>${data.title}</h2>
                        <div class="modal-tech-tags">
                            ${data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                        </div>
                    </div>
                    <div class="modal-project-img">
                        <img src="${data.image}" alt="${data.title}">
                    </div>
                    <div class="modal-project-desc">
                        <p>${data.description}</p>
                    </div>
                    <div class="modal-project-footer">
                        ${data.github ? `<a href="${data.github}" target="_blank" class="btn-minimal">GitHub Source <i class="fab fa-github"></i></a>` : ''}
                        ${data.download ? `<a href="${data.download}" class="btn-minimal" download>See Option <i class="fas fa-external-link-alt"></i></a>` : ''}
                        ${data.demo ? `<a href="${data.demo}" target="_blank" class="btn-minimal">Live Demo <i class="fas fa-external-link-alt"></i></a>` : ''}
                    </div>
                `;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}

function initYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}
