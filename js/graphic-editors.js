// Тема
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

// Автоматичне підсвічування активного пункту в меню під час скролінгу
const sections = document.querySelectorAll('.topic-section');
const navLinks = document.querySelectorAll('.toc a');

const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px', // Визначаємо, де саме на екрані секція вважається активною
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            // Прибираємо активний клас у всіх посилань
            navLinks.forEach(link => link.classList.remove('active'));
            // Додаємо активний клас посиланню, яке відповідає видимій секції
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