const ACHIEVEMENTS = {
    gambler: { title: "The Gambler", desc: "You're feeling lucky today, aren't you?", icon: "bx-dice-5" },
    nightowl: { title: "Luke Skywalker", desc: "Can't decide between the light and the dark side?", icon: "bx-moon" },
    hacker: { title: "Hacker Man", desc: "Access granted. Welcome to the underground.", icon: "bx-terminal" },
    qa_tester: { title: "Bug Hunter", desc: "It's not a bug, it's a feature.", icon: "bx-bug" }, 
    survivor: { title: "Student", desc: "Are you still breathing?", icon: "bx bxs-graduation" },
    whoami: { title: "Who is this?", desc: "Yeah, that’s my selfie. Trust me, bro!", icon: "bx-user-circle" },
    collector: { title: "The Collector", desc: "I wonder what kind of projects these are?)", icon: "bx-pin" }
};

const TOTAL_ACHIEVEMENTS = Object.keys(ACHIEVEMENTS).length;

const achContainer = document.createElement('div');
achContainer.id = 'achievements-container';
document.body.appendChild(achContainer);

function playAchievementSound() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    } catch (e) {}
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
            <span class="achievement-title">Achievement Unlocked</span>
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
        const val = e.target.value.toLowerCase();
        if (val === 'qa') unlockAchievement('qa_tester');
        if (val === 'vntu') unlockAchievement('survivor');
    });
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