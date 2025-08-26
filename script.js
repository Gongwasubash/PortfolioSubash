// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            console.warn('Target element not found:', this.getAttribute('href'));
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections and projects
document.querySelectorAll('section, .project').forEach(el => {
    el.classList.add('fade-out');
    observer.observe(el);
});

// Project click handler
document.querySelectorAll('.project').forEach((project, index) => {
    project.addEventListener('click', function() {
        const projectPages = [
            'videos.html',
            'social-media.html', 
            'printing.html'
        ];
        window.location.href = projectPages[index];
    });
});
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}