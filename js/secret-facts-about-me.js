document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = themeBtn.querySelector('i');
    const cards = document.querySelectorAll('.fact-card');
    
    const setTheme = (isDark) => {
        if (isDark) {
            document.body.classList.add('theme-dark');
            themeIcon.className = 'bx bx-moon';
            localStorage.setItem('facts_theme', 'dark');
        } else {
            document.body.classList.remove('theme-dark');
            themeIcon.className = 'bx bx-sun';
            localStorage.setItem('facts_theme', 'light');
        }
    };

    const savedTheme = localStorage.getItem('facts_theme');
    setTheme(savedTheme !== 'light');

    themeBtn.addEventListener('click', () => {
        const isDark = document.body.classList.contains('theme-dark');
        setTheme(!isDark);
    });

    const checkOverflow = () => {
        if (window.innerWidth <= 768) return;

        cards.forEach(card => {
            if (card.scrollHeight > card.clientHeight + 5) {
                card.classList.add('has-overflow');
            } else {
                card.classList.remove('has-overflow');
            }
        });
    };

    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('loaded');
        }, index * 80);
    });

    document.fonts.ready.then(() => {
        checkOverflow();
    });

    window.addEventListener('resize', checkOverflow);
});