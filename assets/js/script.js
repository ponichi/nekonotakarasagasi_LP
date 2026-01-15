document.addEventListener('DOMContentLoaded', function () {
    const interactiveElements = document.querySelectorAll('a, button, .store-button, .campaign-link');

    interactiveElements.forEach(element => {
        // Add class on press
        element.addEventListener('mousedown', () => element.classList.add('click-anim'));
        element.addEventListener('touchstart', () => element.classList.add('click-anim'), { passive: true });

        // Remove class on release or leave
        element.addEventListener('mouseup', () => element.classList.remove('click-anim'));
        element.addEventListener('mouseleave', () => element.classList.remove('click-anim'));
        element.addEventListener('touchend', () => element.classList.remove('click-anim'));
    });
});
