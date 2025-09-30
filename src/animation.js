// Burger menu toggle
const menuToggle = document.getElementById('menu_toggle');
const mainNav = document.getElementById('main_menu');
if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !expanded);
        if (!expanded) {
            mainNav.classList.remove('invisible', 'opacity-0');
            mainNav.classList.add('visible', 'opacity-100');
        } else {
            mainNav.classList.remove('visible', 'opacity-100');
            mainNav.classList.add('invisible', 'opacity-0');
        }
    });

    // Optional: close menu when clicking outside on mobile
    document.addEventListener('click', function (event) {
        if (
            !menuToggle.contains(event.target) &&
            !mainNav.contains(event.target) &&
            window.innerWidth < 1024 &&
            mainNav.classList.contains('visible')
        ) {
            menuToggle.setAttribute('aria-expanded', false);
            mainNav.classList.remove('visible', 'opacity-100');
            mainNav.classList.add('invisible', 'opacity-0');
        }
    });
}


// Hide header on scroll down, show on scroll up
let lastScrollY = window.scrollY;
let ticking = false;
const header = document.getElementById('nav-header');

function onScroll() {
    if (!header) return;

    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 64) {
        // Scrolling down
        header.style.transform = "translateY(-100%)";
    } else {
        // Scrolling up
        header.style.transform = "translateY(0)";
    }
    lastScrollY = currentScrollY;
    ticking = false;
}

window.addEventListener('scroll', function () {
    if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
    }
});


// Counting animation
function animateCount(el, target, duration = 1400, decimals = false, suffix = "") {
    let start = 0;
    const startTime = performance.now();
    const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        let value = start + (target - start) * progress;
        if (decimals) {
            value = value.toFixed(1);
        } else {
            value = Math.floor(value);
        }
        el.textContent = value + suffix;
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            el.textContent = decimals ? target.toFixed(1) + suffix : target + suffix;
        }
    };
    requestAnimationFrame(step);
}

// Trigger animation when section is revealed
let counted = false;
const section = document.getElementById('milestones');
if (section) {
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !counted) {
            counted = true;
            section.querySelectorAll('.countup').forEach(el => {
                const target = parseFloat(el.dataset.target);
                const decimals = el.dataset.decimal === "true";
                const suffix = el.dataset.suffix || "";
                animateCount(el, target, 1400, decimals, suffix);
            });
            observer.disconnect(); // only animate once
        }
    }, { threshold: 0.2 });
    observer.observe(section);
}

// Accordion
document.addEventListener("DOMContentLoaded", function () {
    const toggles = document.querySelectorAll('.accordion-toggle');
    toggles.forEach((toggle, idx) => {
        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            const item = toggle.closest('.accordion-item');
            const content = item.querySelector('.accordion-content');
            const icon = toggle.querySelector('svg');

            // Close all other accordions (classic style)
            document.querySelectorAll('.accordion-content').forEach((otherContent, i) => {
                if (otherContent !== content) {
                    otherContent.style.maxHeight = null;
                    otherContent.classList.remove('open');
                    // Remove active styles
                    const otherBtn = document.querySelectorAll('.accordion-toggle')[i];
                    const otherIcon = otherBtn.querySelector('svg');
                    otherBtn.classList.remove('bg-purple');
                    otherBtn.classList.add('bg-softgrey');
                    otherIcon.classList.remove('text-white');
                    otherIcon.classList.add('text-darkgrey');
                    if (otherIcon) otherIcon.style.transform = '';
                }
            });

            // Toggle current accordion
            if (content.classList.contains('open')) {
                content.style.maxHeight = null;
                content.classList.remove('open');
                toggle.classList.remove('bg-purple');
                toggle.classList.add('bg-softgrey');
                icon.classList.remove('text-white');
                icon.classList.add('text-darkgrey');
                if (icon) icon.style.transform = '';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.classList.add('open');
                toggle.classList.remove('bg-softgrey');
                toggle.classList.add('bg-purple');
                icon.classList.remove('text-darkgrey');
                icon.classList.add('text-white');
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });
});