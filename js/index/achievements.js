const ACHIEVEMENTS = {
    gambler: { 
        title: "The Gambler", 
        desc: "You're feeling lucky today, aren't you?", 
        icon: "bx-dice-5", 
        hint: "Try your luck with the random project button a few times." 
    },
    nightowl: { 
        title: "Luke Skywalker", 
        desc: "Can't decide between the light and the dark side?", 
        icon: "bx-moon", 
        hint: "Switch between the light and dark themes repeatedly." 
    },
    whoami: { 
        title: "Who is this?", 
        desc: "Yeah, that’s my selfie. Trust me, bro!", 
        icon: "bx-user-circle", 
        hint: "Click on the profile avatar multiple times." 
    },
    collector: { 
        title: "The Collector", 
        desc: "I wonder what kind of projects these are?)", 
        icon: "bx-pin", 
        hint: "Pin the maximum allowed number of projects to the top." 
    },
    survivor: { 
        title: "Student", 
        desc: "Are you still breathing?", 
        icon: "bx bxs-graduation", 
        hint: "Search for the university where you study." 
    },
    qa_tester: { 
        title: "Bug Hunter", 
        desc: "It's not a bug, it's a feature.", 
        icon: "bx-bug", 
        hint: "Try searching for the abbreviation of Quality Assurance." 
    },
    hacker: { 
        title: "Hacker Man", 
        desc: "Access granted. Welcome to the underground.", 
        icon: "bx-terminal", 
        isHidden: true
    },
    tech_explorer: { 
        title: "Tech Stack Explorer", 
        desc: "These are the programming languages and technologies I use in my projects.", 
        icon: "bx-code-block", 
        hint: "Filter projects using 5 different technology tags." 
    },
    stalker: { 
        title: "Stalker Mode", 
        desc: "Are you checking out my social media? I'm flattered.", 
        icon: "bx-glasses", 
        hint: "Find and click the link to my social networks." 
    },
    aishiteru: { 
        title: "Aishiteru", 
        desc: "Starting life in another world from zero.", 
        icon: "bx-heart", // написать имя персонажа из Re:Zero в поиске
        isHidden: true 
    },
    fact_seeker: { 
        title: "Fact Seeker", 
        desc: "How did you find that?", 
        icon: "bx bx-search-alt", 
        isHidden: true // нажать в левый верхний угол страницы
    },
    project_buff: { 
        title: "Interested", 
        desc: "Are you really interested in my projects?", 
        icon: "bx-folder-open", 
        hint: "View 10 different projects." 
    },
};

const TOTAL_ACHIEVEMENTS = Object.keys(ACHIEVEMENTS).length;

const achContainer = document.createElement('div');
achContainer.id = 'achievements-container';
document.body.appendChild(achContainer);

let audioCtx = null;

function playAchievementSound() {
    try {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            audioCtx = new AudioContext();
        }
        
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1760, audioCtx.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
        console.error("Ошибка воспроизведения звука:", e);
    }
}

function updateProgressUI() {
    const unlocked = JSON.parse(localStorage.getItem('unlocked_achievements')) || [];
    const progressEl = document.getElementById('achievement-progress');
    if (progressEl) {
        progressEl.innerText = `🏆 ${unlocked.length}/${TOTAL_ACHIEVEMENTS}`;
        if (unlocked.length === TOTAL_ACHIEVEMENTS) {
            progressEl.classList.add('completed');
            progressEl.title = "100% Completed!";
        }
    }
}

function unlockAchievement(id) {
    let unlocked = JSON.parse(localStorage.getItem('unlocked_achievements')) || [];
    if (unlocked.includes(id)) return;
    
    unlocked.push(id);
    localStorage.setItem('unlocked_achievements', JSON.stringify(unlocked));
    
    playAchievementSound();
    updateProgressUI();
    
    const ach = ACHIEVEMENTS[id];
    const el = document.createElement('div');
    el.className = 'achievement-toast';
    el.innerHTML = `
        <div class="achievement-icon"><i class='bx ${ach.icon}'></i></div>
        <div class="achievement-text">
            <span class="achievement-subtitle">Achievement unlocked</span>
            <span class="achievement-title">${ach.title}</span>
            <span class="achievement-desc">${ach.desc}</span>
        </div>
    `;
    
    achContainer.appendChild(el);
    setTimeout(() => el.classList.add('show'), 50);
    setTimeout(() => {
        el.classList.remove('show');
        setTimeout(() => el.remove(), 500);
    }, 4500);
}

document.addEventListener('DOMContentLoaded', updateProgressUI);

let randomClicks = 0;
const randomBtn = document.getElementById('random-btn');
if (randomBtn) {
    randomBtn.addEventListener('click', () => {
        randomClicks++;
        if (randomClicks === 5) unlockAchievement('gambler');
    });
}

let themeToggles = 0;
const themeBtn = document.getElementById('color_mode');
if (themeBtn) {
    themeBtn.addEventListener('change', () => {
        themeToggles++;
        if (themeToggles === 5) unlockAchievement('nightowl');
    });
}

let secretBuffer = '';
document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    secretBuffer += e.key.toLowerCase();
    if (secretBuffer.length > 7) secretBuffer = secretBuffer.slice(-7);
    if (secretBuffer === 'hentaif') unlockAchievement('hacker');
});

const sInput = document.getElementById('search-input');
if (sInput) {
    sInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase().trim(); 
        
        if (val === 'qa') unlockAchievement('qa_tester');
        if (val === 'vntu') unlockAchievement('survivor');
        if (val === 'hentaif') unlockAchievement('hacker'); 

        const rezeroPool = [
            'emilia', 'эмилия', 'rem', 'рем', 'ram', 'рам', 'subaru', 'субару', 'shaula', 'шаула', 'beatrice', 'беатрис',  'otto', 'отто', 'vincent', 'винсент', 'al', 'ал', 'roswaal', 'echidna', 'puck', 'розвааль', 'эхидна', 'пак', 'crusch', 'круш', 'priscilla', 'присцилла', 'lilia', 'лилия', 'anastasia', 'анастасия', 'felt', 'фелт', 'regulus', 'регулус', 'minerva', 'минерва', 'garfiel', 'гарфиэль'
        ];
        
        if (rezeroPool.includes(val)) {
            unlockAchievement('aishiteru');
        }
    }, true);
}

let avatarClicks = 0;
const avatar = document.querySelector('.avatar');
if (avatar) {
    avatar.style.cursor = 'pointer';
    avatar.addEventListener('click', () => {
        avatarClicks++;
        if (avatarClicks === 3) unlockAchievement('whoami');
    });
}

document.addEventListener('click', (e) => {
    if (e.target.closest('.pin-btn')) {
        setTimeout(() => {
            const pinned = JSON.parse(localStorage.getItem('pinned_projects')) || [];
            if (pinned.length === 4) unlockAchievement('collector');
        }, 100);
    }
}, true);

let modalOverlay = document.querySelector('.achievements-modal-overlay');
if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.className = 'achievements-modal-overlay';
    modalOverlay.innerHTML = `
        <div class="achievements-modal">
            <div class="ach-modal-header">
                <h2>🏆 Showcase of Achievements</h2>
                <button class="ach-close-btn"><i class='bx bx-x'></i></button>
            </div>
            <div class="ach-grid" id="ach-grid"></div>
            <div id="ach-hidden-count" style="text-align: center; margin-top: 20px; color: var(--text-muted); font-size: 0.95rem; font-weight: 600;"></div>
        </div>
    `;
    document.body.appendChild(modalOverlay);
}

const achGrid = document.getElementById('ach-grid');
const hiddenCountEl = document.getElementById('ach-hidden-count');
const closeBtn = modalOverlay.querySelector('.ach-close-btn');

closeBtn.addEventListener('click', () => modalOverlay.classList.remove('active'));
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) modalOverlay.classList.remove('active');
});

function renderShowcase() {
    const unlocked = JSON.parse(localStorage.getItem('unlocked_achievements')) || [];
    if (achGrid) achGrid.innerHTML = '';

    let hiddenLockedCount = 0;
    let displayList = [];

    Object.keys(ACHIEVEMENTS).forEach(id => {
        const ach = ACHIEVEMENTS[id];
        const isUnlocked = unlocked.includes(id);

        if (!isUnlocked && ach.isHidden) {
            hiddenLockedCount++;
        } else {
            displayList.push({ id, ...ach, isUnlocked });
        }
    });

    displayList.sort((a, b) => a.title.localeCompare(b.title));

    displayList.forEach(item => {
        const card = document.createElement('div');
        card.className = `ach-card ${item.isUnlocked ? 'unlocked' : 'locked'}`;
        
        let icon = `bx ${item.icon}`;
        let title = item.title;
        let desc = item.isUnlocked ? item.desc : `<span style="color: var(--text-main); font-weight: 600;">Hint:</span> ${item.hint}`;

        card.innerHTML = `
            <div class="achievement-icon"><i class='${icon}'></i></div>
            <div class="ach-card-info">
                <div class="ach-card-title">${title}</div>
                <div class="ach-card-desc">${desc}</div>
            </div>
        `;
        if (achGrid) achGrid.appendChild(card);
    });

    if (hiddenLockedCount > 0) {
        const hiddenCard = document.createElement('div');
        hiddenCard.className = 'ach-card locked';
        hiddenCard.innerHTML = `
            <div class="achievement-icon"><i class='bx bxs-lock-alt'></i></div>
            <div class="ach-card-info">
                <div class="ach-card-title">Remaining hidden achievements: ${hiddenLockedCount}</div>
                <div class="ach-card-desc">Information about each achievement will be available once it is unlocked.</div>
            </div>
        `;
        if (achGrid) achGrid.appendChild(hiddenCard);
    }

    if (hiddenCountEl) {
        hiddenCountEl.style.display = 'none';
    }
}

const progressBadge = document.getElementById('achievement-progress');
if (progressBadge) {
    progressBadge.style.cursor = 'pointer';
    
    const newBadge = progressBadge.cloneNode(true);
    progressBadge.parentNode.replaceChild(newBadge, progressBadge);
    
    newBadge.addEventListener('click', () => {
        renderShowcase(); 
        modalOverlay.classList.add('active');
    });
}

let clickedTechs = new Set();
document.addEventListener('click', (e) => {
    const techTag = e.target.closest('.tech-tag') || e.target.closest('.tech-icon');
    if (techTag) {
        const onclickAttr = techTag.getAttribute('onclick');
        if (onclickAttr) {
            const techMatch = onclickAttr.match(/'([^']+)'/);
            if (techMatch && techMatch[1]) {
                clickedTechs.add(techMatch[1]);
                if (clickedTechs.size === 5) unlockAchievement('tech_explorer');
            }
        }
    }
}, true);

document.addEventListener('click', (e) => {
    const link = e.target.closest('footer a');
    if (link && link.href.includes('social-links')) {
        unlockAchievement('stalker');
    }
});

const consoleStyle = "color: #c77dff; font-size: 14px; font-weight: bold; font-family: monospace;";
const asciiArt = `
⣿⣿⣿⡇⢩⠘⣴⣿⣥⣤⢦⢁⠄⠉⡄⡇⠛⠛⠛⢛⣭⣾⣿⣿⡏
⣿⣿⣿⡇⠹⢇⡹⣿⣿⣛⣓⣿⡿⠞⠑⣱⠄⢀⣴⣿⣿⣿⣿⡟
⣿⣿⣿⣧⣸⡄⣿⣪⡻⣿⠿⠋⠄⠄⣀⣀⢡⣿⣿⣿⣿⡿⠋
⠘⣿⣿⣿⣿⣷⣭⣓⡽⡆⡄⢀⣤⣾⣿⣿⣿⣿⣿⡿⠋
⠄⢨⡻⡇⣿⢿⣿⣿⣭⡶⣿⣿⣿⣜⢿⡇⡿⠟⠉
⠄⠸⣷⡅⣫⣾⣿⣿⣿⣷⣙⢿⣿⣿⣷⣦⣚⡀
⠄⠄⢉⣾⡟+Rep⠈⢻⣿⣷⣅⢻⣿⣿⣿⣿⣿⣶⣶⡆⠄⣤⡀
⠄⢠⣿⣿⣧⣀⣀⣀⣀⣼⣿⣿⣿⡎⢿⣿⣿⣿⣿⣿⣿⣇⠄⠈⠁
⠄⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢇⣎⢿⣿⣿⣿⣿⣿⣿⣿⣶⣶
⠄⠄⠻⢿⣿⣿⣿⣿⣿⣿⣿⢟⣫⣾⣿⣷⡹⣿⣿⣿⣿⣿⣿⣿⡟
⠄⠄⠄⠄⢮⣭⣍⡭⣭⡵⣾⣿⣿⣿⡎⣿⣿⣌⠻⠿⠿⠿⠟⠋
⠄⠄⠄⠄⠈⠻⣿⣿⣿⣿⣹⣿⣿⣿⡇⣿⣿⡿
⠄⠄⣀⣴⣾⣶⡞⣿⣿⣿⣿⣿⣿⣿⣾⣿⡿⠃
⣠⣾⣿⣿⣿⣿⣿⣹⣿⣿⣿⣿⣿⡟⣹⣿⣳⡄

⣿⣿⣿⣿⠛⠛⠉⠄⠁⠄⠄⠉⠛⢿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⡟⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣿⣿⣿⣿⣿⣿⣿
⣿⣿⡇⠄⠄⠄⠐⠄⠄⠄⠄⠄⠄⠄⠠⣿⣿⣿⣿⣿⣿
⣿⣿⡇⠄⢀⡀⠠⠃⡐⡀⠠⣶⠄⠄⢀⣿⣿⣿⣿⣿⣿
⣿⣿⣶⠄⠰⣤⣕⣿⣾⡇⠄⢛⠃⠄⢈⣿⣿⣿⣿⣿⣿
⣿⣿⣿⡇⢀⣻⠟⣻⣿⡇⠄⠧⠄⢀⣾⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣟⢸⣻⣭⡙⢄⢀⠄⠄⠄⠈⢹⣯⣿⣿⣿⣿⣿
⣿⣿⣿⣭⣿⣿⣿⣧⢸⠄⠄⠄⠄⠄⠈⢸⣿⣿⣿⣿⣿
⣿⣿⣿⣼⣿⣿⣿⣽⠘⡄⠄⠄⠄⠄⢀⠸⣿⣿⣿⣿⣿
⡿⣿⣳⣿⣿⣿⣿⣿⠄⠓⠦⠤⠤⠤⠼⢸⣿⣿⣿⣿⣿
⡹⣧⣿⣿⣿⠿⣿⣿⣿⣿⣿⣿⣿⢇⣓⣾⣿⣿⣿⣿⣿
⡞⣸⣿⣿⢏⣼⣶⣶⣶⣶⣤⣶⡤⠐⣿⣿⣿⣿⣿⣿⣿
⣯⣽⣛⠅⣾⣿⣿⣿⣿⣿⡽⣿⣧⡸⢿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⡷⠹⠛⠉⠁⠄⠄⠄⠄⠄⠄⠐⠛⠻⣿⣿⣿⣿
⣿⣿⣿⠃⠄⠄⠄⠄⠄⣠⣤⣤⣤⡄⢤⣤⣤⣤⡘⠻⣿
⣿⣿⡟⠄⠄⣀⣤⣶⣿⣿⣿⣿⣿⣿⣆⢻⣿⣿⣿⡎⠝
⣿⡏⠄⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡎⣿⣿⣿⣿⠐
⣿⡏⣲⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢇⣿⣿⣿⡟⣼
⣿⡠⠜⣿⣿⣿⣿⣟⡛⠿⠿⠿⠿⠟⠃⠾⠿⢟⡋⢶⣿
⣿⣧⣄⠙⢿⣿⣿⣿⣿⣿⣷⣦⡀⢰⣾⣿⣿⡿⢣⣿⣿
⣿⣿⣿⠂⣷⣶⣬⣭⣭⣭⣭⣵⢰⣴⣤⣤⣶⡾⢐⣿⣿
⣿⣿⣿⣷⡘⣿⣿⣿⣿⣿⣿⣿⢸⣿⣿⣿⣿⢃⣼⣿⣿

⠄⣀⣤⣶⣶⣿⣿⣿⣿⣿⣿⣷⣶⣶⣶⣦⣤⣄⡀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄
⣿⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⣿⢿⡏⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧
⣥⣇⡝⡟⣿⢱⠉⡽⣏⢻⠃⢹⠘⠇⠈⢦⣽⣟⢻⣛⣟⢻⢻⢻⢻
⣿⡟⠒⠒⠧⢼⣿⠃⡟⠈⠄⠠⠤⠒⠒⠨⢿⣾⡀⣿⣿⣿⣿⣿⣾
⡿⢹⣿⡿⣷⢼⡿⠄⠁⠄⠄⢠⣾⠋⣻⣿⢾⡧⣄⣸⣿⣿⣿⣿⣿
⡛⢿⣿⡷⣻⠈⡇⠄⠄⠄⠄⠄⡟⢿⣿⡿⡚⢇⠟⢹⢻⣿⣿⣿⣿
⠑⠚⠒⠚⠊⠄⠄⠄⠄⠄⠄⠄⠘⠒⠒⠚⠚⠁⠄⠘⣸⣿⣿⣿⣿
⠄⠄⠄⠄⠄⠄⠄⠄⢠⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢰⣿⣿⣿⣿⣿
⠄⠄⠄⠄⠄⠄⠄⠄⠼⠄⠄⠄⠄⠄⠄⠄⠄⠄⢠⣿⣿⣿⣿⣿⣿
⠄⠄⠄⠄⠄⡤⠒⠒⠉⠉⠐⠒⣦⠄⠄⠄⠄⣰⣿⣿⣿⣿⣿⣿⡿
⣷⣄⠄⠄⠄⢻⡀⠄⠄⠄⠄⢀⡟⠄⠄⢠⣾⣿⣿⣿⣿⣿⣿⣿⡇
⣿⣿⣷⣤⡀⠄⠙⠦⠤⡤⠤⠚⠄⣀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃
⣿⣿⣿⣿⣿⡷⣤⡀⠈⠋⢀⣤⠞⣿⣿⣿⣿⣿⡏⣿⣿⣿⢻⣿
⠿⣿⢻⣿⣿⡇⠄⠉⠛⠛⠉⠄⠄⣿⣿⡿⠏⢻⠁⡏⡿⣿⢸⠁
⠄⠈⢸⣿⣿⡇⠄⠄⠄⠄⠄⠄⠄⣿⢻⠇⠄⠄⠄⠁⠁⢹⠘
⠄⠄⠸⣣⠿⣄⠄⢀⣀⠄⢀⡀⢀⡽⢲⣄⡀⠄⢀⣴⡶⣬⣄
⢹⠛⠛⠙⠶⣌⢻⣿⣿⣿⣿⣿⣇⡴⠋⠈⢩⢏⣿⣿⣿⣿⣿⣿⣧⣤⣄
⡌⢧⡀⠄⠄⠈⠙⣿⣿⣿⣿⣿⠃⠄⠄⢀⠎⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠄
⣿⣦⠳⣄⠄⠄⠄⠈⠻⣿⠟⠁⠄⠄⡠⢊⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀
⣿⣿⣿⣮⣙⠲⢤⣀⣀⣀⣀⣀⡬⢚⣩⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
⣿⣿⣿⣿⣿⣿⣶⣦⣬⣭⣥⣴⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⢟⣻⠏
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠖⠒⠛⠉⣽⠁
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠄⠄⠄⢠⡇
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠄⠄⠄⣼
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠄⠄⢠⡇
`;

console.log("%c" + asciiArt, consoleStyle);

document.addEventListener('click', (e) => {
    const card = e.target.closest('.project-card');
    
    if (card) {
        const projectId = card.getAttribute('data-id');
        if (projectId) {
            let opened = JSON.parse(localStorage.getItem('opened_projects')) || [];
            
            if (!opened.includes(projectId)) {
                opened.push(projectId);
                localStorage.setItem('opened_projects', JSON.stringify(opened));
            }
            
            if (opened.length >= 10) {
                unlockAchievement('project_buff');
            }
        }
    }
}, true);

console.log("%cDo you want to unlock all achievements? Type Y or N and press Enter.", "color: #00cec9; font-size: 16px; font-weight: bold; background: #2d3436; padding: 10px; border-radius: 5px;");

function unlockAllAchievements() {
    const achKeys = Object.keys(ACHIEVEMENTS);
    let delay = 0;
    
    achKeys.forEach((id) => {
        let unlocked = JSON.parse(localStorage.getItem('unlocked_achievements')) || [];
        if (!unlocked.includes(id)) {
            setTimeout(() => {
                unlockAchievement(id);
            }, delay);
            delay += 400;
        }
    });
    
    return "Achievement sequence initiated... Enjoy!";
}

Object.defineProperty(window, 'Y', { get: unlockAllAchievements });
Object.defineProperty(window, 'y', { get: unlockAllAchievements });
Object.defineProperty(window, 'N', { get: () => "Alright, maybe next time! Keep exploring." });
Object.defineProperty(window, 'n', { get: () => "Alright, maybe next time! Keep exploring." });

// для сброза ачивок
// localStorage.removeItem('unlocked_achievements');
// location.reload();