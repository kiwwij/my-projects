const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

const currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
    body.classList.replace('dark-theme', 'light-theme');
    themeIcon.classList.replace('bx-sun', 'bx-moon');
}

themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        body.classList.replace('dark-theme', 'light-theme');
        themeIcon.classList.replace('bx-sun', 'bx-moon');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.replace('light-theme', 'dark-theme');
        themeIcon.classList.replace('bx-moon', 'bx-sun');
        localStorage.setItem('theme', 'dark');
    }
});

const sections = document.querySelectorAll('.topic-section');
const navLinks = document.querySelectorAll('.toc a');

const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.toc a[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});