/**
 * Alferid Zeinu - 3D Creator Portfolio
 * Full Stack Developer Edition
 * 
 * Features:
 * - FadeIn scroll animations
 * - Magnetic hover effect
 * - Marquee scroll-driven rows
 * - Animated character-by-character text
 * - Sticky card scaling on scroll
 */

document.addEventListener('DOMContentLoaded', () => {
    initFadeIn();
    initMagnet();
    initMarquee();
    initAnimatedText();
    initStickyCards();
    initSmoothScroll();
    initYear();
});

/* ========================================
   FadeIn - IntersectionObserver
   ======================================== */
function initFadeIn() {
    const fadeEls = document.querySelectorAll('.fade-in');

    fadeEls.forEach(el => {
        const y = el.dataset.y || '30';
        const x = el.dataset.x || '0';
        el.style.setProperty('--fade-x', `${x}px`);
        el.style.setProperty('--fade-y', `${y}px`);

        const duration = el.dataset.duration || '0.7';
        const delay = el.dataset.delay || '0';
        el.style.transitionDuration = `${duration}s`;
        el.style.transitionDelay = `${delay}s`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0,
        rootMargin: '50px'
    });

    fadeEls.forEach(el => observer.observe(el));
}

/* ========================================
   Magnet - Mouse-following magnetic effect
   ======================================== */
function initMagnet() {
    const magnets = document.querySelectorAll('.magnet-wrap');

    magnets.forEach(magnet => {
        const padding = parseInt(magnet.dataset.padding) || 100;
        const strength = parseInt(magnet.dataset.strength) || 3;
        let active = false;

        const onMouseMove = (e) => {
            const rect = magnet.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distX = e.clientX - centerX;
            const distY = e.clientY - centerY;
            const dist = Math.sqrt(distX * distX + distY * distY);
            const threshold = Math.max(rect.width, rect.height) / 2 + padding;

            if (dist < threshold) {
                active = true;
                const tx = distX / strength;
                const ty = distY / strength;
                magnet.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
                magnet.style.transition = 'transform 0.3s ease-out';
            } else if (active) {
                active = false;
                magnet.style.transform = 'translate3d(0, 0, 0)';
                magnet.style.transition = 'transform 0.6s ease-in-out';
            }
        };

        const onMouseLeave = () => {
            if (active) {
                active = false;
                magnet.style.transform = 'translate3d(0, 0, 0)';
                magnet.style.transition = 'transform 0.6s ease-in-out';
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseleave', onMouseLeave);
    });
}

/* ========================================
   Marquee - Scroll-driven image rows
   ======================================== */
function initMarquee() {
    const gifUrls = [
        'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
        'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
        'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
        'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
        'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
        'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
        'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
        'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
        'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
        'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
        'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
        'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
        'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
        'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
        'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
        'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
        'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
        'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
        'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
        'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
        'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif'
    ];

    const row1Urls = gifUrls.slice(0, 11);
    const row2Urls = gifUrls.slice(11);

    const row1El = document.getElementById('marquee-row-1');
    const row2El = document.getElementById('marquee-row-2');

    if (!row1El || !row2El) return;

    // Triple for seamless scrolling
    const createTiles = (urls, container) => {
        const tripled = [...urls, ...urls, ...urls];
        tripled.forEach(url => {
            const tile = document.createElement('div');
            tile.className = 'marquee-tile';
            tile.innerHTML = `<img src="${url}" alt="" loading="lazy" />`;
            container.appendChild(tile);
        });
    };

    createTiles(row1Urls, row1El);
    createTiles(row2Urls, row2El);

    const section = document.querySelector('.marquee-section');

    const onScroll = () => {
        if (!section) return;
        const sectionTop = section.offsetTop;
        const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
        row1El.style.transform = `translateX(${offset - 200}px)`;
        row2El.style.transform = `translateX(${-(offset - 200)}px)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* ========================================
   Animated Text - Character scroll reveal
   ======================================== */
function initAnimatedText() {
    const textEl = document.getElementById('animated-text');
    if (!textEl) return;

    const text = textEl.textContent.trim();
    textEl.textContent = '';

    const chars = [];

    text.split('').forEach((char, i) => {
        const wrap = document.createElement('span');
        wrap.className = 'char-wrap';

        const placeholder = document.createElement('span');
        placeholder.className = 'char-placeholder';
        placeholder.textContent = char === ' ' ? '\u00A0' : char;

        const animated = document.createElement('span');
        animated.className = 'char-animated';
        animated.textContent = char === ' ' ? '\u00A0' : char;

        wrap.appendChild(placeholder);
        wrap.appendChild(animated);
        textEl.appendChild(wrap);

        chars.push({ el: animated, index: i });
    });

    const totalChars = chars.length;

    const updateChars = () => {
        const rect = textEl.getBoundingClientRect();
        const windowH = window.innerHeight;

        // Calculate scroll progress for this element
        // offset: start 0.8 = element enters when it's at 80% of viewport height
        // offset: end 0.2 = animation completes when element is at 20% of viewport height
        const startTrigger = windowH * 0.8;
        const endTrigger = windowH * 0.2;

        const progress = Math.max(0, Math.min(1,
            (startTrigger - rect.top) / (startTrigger - endTrigger)
        ));

        chars.forEach((c, i) => {
            const charProgress = i / totalChars;
            // Map scroll progress to each character
            const charOpacity = Math.max(0.2, Math.min(1,
                (progress - charProgress * 0.8) / 0.3
            ));
            c.el.style.opacity = charOpacity;
        });
    };

    window.addEventListener('scroll', updateChars, { passive: true });
    updateChars();
}

/* ========================================
   Sticky Cards - Scale on scroll
   ======================================== */
function initStickyCards() {
    const containers = document.querySelectorAll('.project-card-container');
    if (!containers.length) return;

    // Only apply sticky behavior on wider screens
    const isMobile = window.innerWidth < 640;
    if (isMobile) return;

    const totalCards = containers.length;

    containers.forEach((container, index) => {
        container.style.top = `calc(6rem + ${index * 28}px)`;
        const card = container.querySelector('.project-card');

        const targetScale = 1 - (totalCards - 1 - index) * 0.03;

        const onScroll = () => {
            const rect = container.getBoundingClientRect();
            const windowH = window.innerHeight;
            // When the card starts leaving the top, scale it down
            const progress = Math.max(0, Math.min(1,
                (windowH * 0.3 - rect.top) / (windowH * 0.5)
            ));

            const scale = 1 - progress * (1 - targetScale);
            card.style.transform = `scale(${Math.max(targetScale, scale)})`;
        };

        window.addEventListener('scroll', onScroll, { passive: true });
    });
}

/* ========================================
   Smooth Scroll for nav links
   ======================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   Year
   ======================================== */
function initYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}
