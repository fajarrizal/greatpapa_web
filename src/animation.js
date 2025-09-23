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