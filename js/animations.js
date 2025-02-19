// animations.js
gsap.registerPlugin(ScrollToPlugin);

function shakeElement(element, duration, intensity, repeat) {
    gsap.to(element, {
        x: 0,
        y: intensity,
        repeat: repeat,
        yoyo: true,
        duration: duration / repeat,
        ease: "ease.inOut",
        onComplete: () => {
            gsap.to(element, {x: 0, y: 0, duration: 0.2});
        }
    });
}

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

// scrolls to each custom icon, shakes it and then returns to original position
async function visitAndShakeTargets(targets) {
    const originalPosition = window.scrollY;
    const numTargets = targets.length;
    const scrollDuration = 1;
    const shakeDuration = 0.75;
    const shakeIntensity = 5;
    const shakeRepeats = 4;
    const buffer = 0.5;

    const timeoutIds = [];

    for (let index = 0; index < numTargets; index++) {
        const target = targets[index];        
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

        const elementToShake = document.querySelector(target);
        const shakeTimeoutId = setTimeout(() => {
            shakeElement(elementToShake, shakeDuration, shakeIntensity, shakeRepeats);
        }, shakeDelay);
        timeoutIds.push(shakeTimeoutId);
    }

    const totalDuration = numTargets * (scrollDuration + shakeDuration) + scrollDuration;
    const scrollBackTimeoutId = setTimeout(() => {
        scrolltoPosition(originalPosition, scrollDuration);
    }, totalDuration * 1000);
    timeoutIds.push(scrollBackTimeoutId);

    return timeoutIds;
}

// attach event listener to all .scroll-link elements
document.querySelectorAll('.scroll-link').forEach(link => {
    let timeoutIds = [];

    link.addEventListener('click', async function(e) {
        e.preventDefault();
        const targetIds = this.getAttribute('data-target').split(',');

        link.disabled = true;

        timeoutIds.forEach(id => clearTimeout(id));
        timeoutIds = [];

        timeoutIds = await visitAndShakeTargets(targetIds);

        link.disabled = false;
    });
});