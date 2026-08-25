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

    // пошук працью тільки з 13-го уроку
    const searchInput = document.getElementById('qaSearch');
    const searchResults = document.getElementById('searchResults');
    
    const searchableLessons = ['lesson13', 'lesson14', 'lesson15', 'lesson16', 'lesson17', 'lesson18', 'lesson19', 'lesson20', 'lesson21', 'lesson22', 'lesson23', 'lesson24', 'lesson25', 'lesson26', 'lesson27', 'lesson28', 'lesson29', 'lesson30', 'lesson31', 'lesson32', 'lesson33', 'lesson34', 'lesson35', 'lesson36', 'lesson37', 'lesson38', 'lesson39', 'lesson40', 'lesson41', 'lesson42'];

    const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().replace(/\s+/g, ' ').trim();
            searchResults.innerHTML = '';
            
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }

            let results = [];
            
            searchableLessons.forEach(id => {
                const section = document.getElementById(id);
                if (!section) return;
                
                const lessonTitle = section.querySelector('h2') ? section.querySelector('h2').textContent.trim() : 'Урок';
                
                const elements = section.querySelectorAll('h2, h3, h4, p, li');
                let lessonMatches = 0;

                elements.forEach(el => {
                    if (lessonMatches >= 3) return; 
                    
                    const text = el.textContent.replace(/\s+/g, ' ').trim();
                    const lowerText = text.toLowerCase();
                    
                    if (lowerText.includes(query)) {
                        const matchIndex = lowerText.indexOf(query);
                        
                        const start = Math.max(0, matchIndex - 40);
                        const end = Math.min(text.length, matchIndex + query.length + 40);
                        
                        let snippet = text.substring(start, end);
                        if (start > 0) snippet = '...' + snippet;
                        if (end < text.length) snippet = snippet + '...';
                        
                        const safeQuery = escapeRegExp(query);
                        const regex = new RegExp(`(${safeQuery})`, 'gi');
                        snippet = snippet.replace(regex, '<mark>$1</mark>');

                        if (!results.some(r => r.id === id && r.originalText === text)) {
                            results.push({
                                id: id,
                                lessonTitle: lessonTitle,
                                snippet: snippet,
                                originalText: text
                            });
                            lessonMatches++;
                        }
                    }
                });
            });

            if (results.length > 0) {
                searchResults.style.display = 'block';
                results.forEach(res => {
                    const item = document.createElement('div');
                    item.className = 'search-result-item';
                    item.innerHTML = `<strong>${res.lessonTitle}</strong><span>${res.snippet}</span>`;
                    
                    item.addEventListener('click', () => {
                        switchTab(res.id);
                        searchInput.value = '';
                        searchResults.style.display = 'none';
                    });
                    
                    searchResults.appendChild(item);
                });
            } else {
                searchResults.style.display = 'block';
                searchResults.innerHTML = '<div class="search-no-results"><i class="bx bx-sad" style="font-size: 24px; display: block; margin-bottom: 5px;"></i>Нічого не знайдено</div>';
            }
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                searchResults.style.display = 'none';
            }
        });
    }
});