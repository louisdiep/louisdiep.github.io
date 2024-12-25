// animations.js
// Handles more complex animations for the website
gsap.registerPlugin(ScrollToPlugin);

// Helper: Shakes an element
function shakeElement(element, duration, intensity, repeat) {
    gsap.to(element, {
        x: 0,
        y: intensity,
        repeat: repeat,
        yoyo: true,
        duration: duration / repeat,
        ease: "ease.inOut",
        onComplete: () => {
            // Reset position after shaking
            gsap.to(element, {x: 0, y: 0, duration: 0.2});
        }
    });
}

// Helper: Scrolls to targetSection
function scrollToSection(targetSection, duration) {
    const sectionTop = document.querySelector(targetSection).getBoundingClientRect().top + window.scrollY;
    const offset = window.innerHeight * 0.3;
    const scrollToPosition = sectionTop - offset;
    gsap.to(window, {
        scrollTo: {
            y: scrollToPosition,
        },
        duration: duration,
        ease: "power2.inOut",
    });
}

function scrolltoPosition(targetPosition, duration) {
    gsap.to(window, {
        scrollTo: {
            y: targetPosition,
        },
        duration: duration,
        ease: "power2.inOut",
    });
}

// Scrolls to each custom icon, shakes it and then returns to original position
async function visitAndShakeTargets(targets) {
    const originalPosition = window.scrollY;
    const numTargets = targets.length;
    const scrollDuration = 1;
    const shakeDuration = 0.75;
    const shakeIntensity = 5;
    const shakeRepeats = 4;
    const buffer = 0.5;

    // Track timeouts to clear later
    const timeoutIds = [];

    for (let index = 0; index < numTargets; index++) {
        const target = targets[index];        
        // Scroll to the target section
        let shakeDelay;
        if (index == 0) {
            shakeDelay = scrollDuration * 1000;
        } else {
            shakeDelay = index * (scrollDuration + shakeDuration + buffer) * 1000;
        }

        const scrollTimeoutId = setTimeout(() => {
            scrollToSection(target, scrollDuration);
        }, index * (scrollDuration + shakeDuration) * 1000);
        timeoutIds.push(scrollTimeoutId);

        // Shake the element after scrolling
        const elementToShake = document.querySelector(target);
        const shakeTimeoutId = setTimeout(() => {
            shakeElement(elementToShake, shakeDuration, shakeIntensity, shakeRepeats);
        }, shakeDelay);
        timeoutIds.push(shakeTimeoutId);
    }

    // After visiting all targets, scroll back to the original position
    const totalDuration = numTargets * (scrollDuration + shakeDuration) + scrollDuration;
    const scrollBackTimeoutId = setTimeout(() => {
        scrolltoPosition(originalPosition, scrollDuration);
    }, totalDuration * 1000);
    timeoutIds.push(scrollBackTimeoutId);

    // Clear timeouts when the operation is interrupted or completed
    return timeoutIds;
}

// Attach event listener to all .scroll-link elements
document.querySelectorAll('.scroll-link').forEach(link => {
    let timeoutIds = [];

    link.addEventListener('click', async function(e) {
        e.preventDefault();
        const targetIds = this.getAttribute('data-target').split(',');

        // Disable the link while animations are running
        link.disabled = true;

        // Clear existing timeouts if any
        timeoutIds.forEach(id => clearTimeout(id));
        timeoutIds = [];

        timeoutIds = await visitAndShakeTargets(targetIds);

        // Re-enable the link after animations
        link.disabled = false;
    });
});