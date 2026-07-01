document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const htmlEl = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');
    const themeText = themeToggle.querySelector('span');
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeUI(newTheme);
    });

    function updateThemeUI(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'bx bx-sun';
            themeText.textContent = 'Світла тема';
        } else {
            themeIcon.className = 'bx bx-moon';
            themeText.textContent = 'Темна тема';
        }
    }

    const tabBtns = document.querySelectorAll('.tab-btn');
    const lessonSections = document.querySelectorAll('.lesson-section');

    function switchTab(targetId) {
        tabBtns.forEach(b => b.classList.remove('active'));
        lessonSections.forEach(s => s.classList.remove('active'));

        const targetBtn = document.querySelector(`.tab-btn[data-target="${targetId}"]`);
        if(targetBtn) targetBtn.classList.add('active');
        
        const targetSection = document.getElementById(targetId);
        if(targetSection) targetSection.classList.add('active');
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.getAttribute('data-target'));
        });
    });

    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.getAttribute('data-target'));
        });
    });

    const generatePdfBtn = document.getElementById('generatePdfBtn');
    
    if(generatePdfBtn) {
        generatePdfBtn.addEventListener('click', () => {
            window.print();
        });
    }
});