document.addEventListener('keydown', (e) => {
    if (e.key === '`') {
        e.preventDefault();
        toggleTerminal();
    }
});

function toggleTerminal() {
    if (typeof unlockAchievement === 'function') {
        unlockAchievement('terminal_found');
    }

    let term = document.getElementById('terminal-console');
    if (!term) {
        term = document.createElement('div');
        term.id = 'terminal-console';
        term.className = 'terminal-console';
        term.innerHTML = `
            <div class="terminal-header">
                <span>SYSTEM CORE TERMINAL</span>
                <button id="close-terminal" class="terminal-close">&times;</button>
            </div>
            <div id="terminal-output" class="terminal-output"></div>
            <div class="terminal-input-row">
                <span>></span>
                <input type="text" id="terminal-input" autocomplete="off" autofocus>
            </div>
        `;
        document.body.appendChild(term);

        document.getElementById('close-terminal').addEventListener('click', toggleTerminal);
        document.getElementById('terminal-input').addEventListener('keydown', handleCommand);
        
        writeOutput('Welcome to the core system mainframe. Type "help" or "/help" for a list of commands.');
    } else {
        term.classList.toggle('active');
        if (term.classList.contains('active')) {
            document.getElementById('terminal-input').focus();
        }
    }
}

function writeOutput(text) {
    const output = document.getElementById('terminal-output');
    if (!output) return;
    const line = document.createElement('div');
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

function handleCommand(e) {
    if (e.key !== 'Enter') return;
    const input = e.target;
    const rawCmd = input.value.trim();
    input.value = '';

    if (!rawCmd) return;
    writeOutput('> ' + rawCmd);

    let cmdStr = rawCmd.toLowerCase();
    if (cmdStr.startsWith('/')) {
        cmdStr = cmdStr.substring(1);
    }

    const args = cmdStr.split(' ');
    const cmd = args[0];

    if (cmd === 'help') {
        writeOutput('Available commands:');
        writeOutput('  help, /help             - Show this menu');
        writeOutput('  clear, clr, /clear      - Clear terminal window');
        writeOutput('  matrix, /matrix         - Toggle terminal visual shift');
        writeOutput('  ping, /ping             - Check network latency');
        writeOutput('  whoami, /whoami         - Display current user');
        writeOutput('  time, date, /time       - Display system time');
        writeOutput('  echo, /echo [text]      - Print text');
        writeOutput('  dir, ls, /dir           - List directory contents');
        writeOutput('  ipconfig, /ipconfig     - Display IP configuration');
        writeOutput('  gamemode, /gamemode     - Update game mode');
        writeOutput('  kill, /kill             - Terminate entity');
        writeOutput('  exit, /exit             - Close terminal');
    } else if (cmd === 'clear' || cmd === 'cls') {
        const output = document.getElementById('terminal-output');
        if (output) output.innerHTML = '';
    } else if (cmd === 'unlock-all') {
        if (typeof unlockAllAchievements === 'function') {
            unlockAllAchievements();
            writeOutput('Sequence initiated successfully.');
        } else {
            writeOutput('Error: Core achievement module missing.');
        }
    } else if (cmd === 'matrix') {
        document.body.classList.toggle('matrix-mode');
        writeOutput('Visual matrix reconfiguration complete.');
    } else if (cmd === 'ping') {
        writeOutput('Pong! ' + (Math.floor(Math.random() * 45) + 5) + 'ms');
    } else if (cmd === 'whoami') {
        writeOutput('User: kiwwij (Administrator)');
    } else if (cmd === 'time' || cmd === 'date') {
        writeOutput('Current system time: ' + new Date().toLocaleString());
    } else if (cmd === 'echo') {
        writeOutput(args.slice(1).join(' '));
    } else if (cmd === 'dir' || cmd === 'ls') {
        writeOutput('Volume in drive C is KIWWIJ_HUB');
        writeOutput('Directory of C:\\Projects\\Hub');
        writeOutput('');
        writeOutput('11/04/2026  10:24 AM    <DIR>          html');
        writeOutput('11/04/2026  10:24 AM    <DIR>          css');
        writeOutput('11/04/2026  10:24 AM    <DIR>          js');
        writeOutput('11/04/2026  10:24 AM            24,532 index.html');
        writeOutput('11/04/2026  10:24 AM            12,105 projects.json');
    } else if (cmd === 'ipconfig') {
        writeOutput('Windows IP Configuration');
        writeOutput('');
        writeOutput('Ethernet adapter Ethernet:');
        writeOutput('   Connection-specific DNS Suffix  . : localdomain');
        writeOutput('   IPv4 Address. . . . . . . . . . . : 192.168.1.' + (Math.floor(Math.random() * 150) + 2));
        writeOutput('   Subnet Mask . . . . . . . . . . . : 255.255.255.0');
        writeOutput('   Default Gateway . . . . . . . . . : 192.168.1.1');
    } else if (cmd === 'gamemode') {
        const mode = args[1];
        if (mode === '1' || mode === 'creative') {
            writeOutput('Your game mode has been updated to Creative Mode');
        } else if (mode === '0' || mode === 'survival') {
            writeOutput('Your game mode has been updated to Survival Mode');
        } else if (mode === '3' || mode === 'spectator') {
            writeOutput('Your game mode has been updated to Spectator Mode');
        } else {
            writeOutput('Usage: /gamemode <0|1|3|survival|creative|spectator>');
        }
    } else if (cmd === 'kill') {
        writeOutput('Ouch! You died.');
        setTimeout(toggleTerminal, 1500);
    } else if (cmd === 'exit') {
        toggleTerminal();
    } else if (cmd === 'preset' || cmd === 'godmode') {
        writeOutput('Applying master profile preset...');
        applyMasterPreset();
    } else if (cmd === 'export' || cmd === 'backup') {
        writeOutput('Generating backup & stats page...');
        exportProfileStatsHTML();
    } else if (cmd === 'import' || cmd === 'restore') {
        writeOutput('Opening file selector for restore...');
        importProfileBackup();
    } else {
        writeOutput('Unknown command: ' + rawCmd + '. Type "help" or "/help" for a list of commands.');
    }
}

function initTimeTracker() {
    const trackerEl = document.getElementById('time-tracker');
    if (!trackerEl) return;

    let totalSeconds = parseInt(localStorage.getItem('hub_time_spent'), 10) || 0;

    function renderTime() {
        let displayStr = '';

        if (totalSeconds < 3600) {
            const minutes = Math.floor(totalSeconds / 60);
            displayStr = `${minutes}m`;
        } else {
            const hours = parseFloat((totalSeconds / 3600).toFixed(1));
            displayStr = `${hours}h`;
        }

        trackerEl.innerHTML = `<i class='bx bx-time-five'></i> ${displayStr}`;

        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        trackerEl.title = `Time spent: ${h}h ${m}m ${s}s`;
    }

    renderTime();

    function checkTimeAchievements(sec) {
        if (typeof unlockAchievement !== 'function') return;
        if (sec >= 600) unlockAchievement('time_10m');
        if (sec >= 3600) unlockAchievement('time_1h');
        if (sec >= 36000) unlockAchievement('time_10h');
        if (sec >= 151200) unlockAchievement('time_42h');
        if (sec >= 360000) unlockAchievement('time_100h');
    }

    checkTimeAchievements(totalSeconds);

    setInterval(() => {
        if (!document.hidden) {
            totalSeconds++;
            localStorage.setItem('hub_time_spent', totalSeconds);
            renderTime();
            checkTimeAchievements(totalSeconds);
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', initTimeTracker);

function initRetroWebPrank() {
    const params = new URLSearchParams(window.location.search);
    const isRetroMode = params.get('retro') === '1';

    if (isRetroMode) {
        document.body.classList.add('retro-web-mode');

        setTimeout(() => {
            if (typeof unlockAchievement === 'function') {
                unlockAchievement('retro_web');
            }
        }, 500);

        const retroBanner = document.createElement('div');
        retroBanner.className = 'retro-top-bar';
        retroBanner.innerHTML = `
            <marquee scrollamount="6">
                *** WELCOME TO KIWWIJ'S HOMEPAGE (1999 EDITION) *** BEST VIEWED IN NETSCAPE NAVIGATOR 4.0 (800x600) *** НЕ ЗАНИМАЙТЕ ТЕЛЕФОННУЮ ЛИНИЮ, ИДЁТ ЗАГРУЗКА ПРОЕКТОВ... ***
            </marquee>
            <div class="retro-sub-bar">
                <span>[ Visitors: <b>00001337</b> ]</span>
                <span>[ Status: <b>Dial-Up 56k Connected</b> ]</span>
                <button id="exit-retro-btn" class="retro-action-btn">⏪ Return to 2026</button>
            </div>
        `;
        document.body.prepend(retroBanner);

        document.getElementById('exit-retro-btn').addEventListener('click', () => {
            window.location.href = window.location.pathname;
        });

        return;
    }

    const triggerChance = 0.14 + Math.random() * 0.03;
    if (Math.random() < triggerChance) {
        const prankBtn = document.createElement('button');
        prankBtn.id = 'retro-prank-btn';
        prankBtn.className = 'retro-prank-btn';
        prankBtn.innerHTML = `<i class='bx bxs-hot'></i> <span>CONGRATULATIONS! YOU ARE THE 99,999th VISITOR! [CLICK HERE]</span>`;
        prankBtn.title = "Totally not a virus from 1999.exe";

        prankBtn.addEventListener('click', () => {
            if (typeof unlockAchievement === 'function') {
                unlockAchievement('retro_web');
            }
            window.location.href = window.location.pathname + '?retro=1';
        });

        document.body.appendChild(prankBtn);
    }
}

document.addEventListener('DOMContentLoaded', initRetroWebPrank);

// Для активации нажать "`" и вписатиь "preset"
// ============================================================================
const MASTER_PROFILE_CONFIG = {
    streakDays: 166,          // Текущее количество дней в стрике
    bestStreakDays: 166,      // Лучший стрик (рекорд)
    timeSpentHours: 0,      // Проведённое время на сайте: ЧАСЫ
    timeSpentMinutes: 0,    // Проведённое время на сайте: МИНУТЫ
    unlockAllAch: true,      // Открыть все ачивки (true / false)
    markAllViewed: true,     // Сделать все проекты просмотренными (true / false)
    enableShowDates: true,   // Сделать кнопку показа дат проектов активной (true / false)
    theme: 'dark'            // Тема сайта ('dark' или 'light')
};
// ============================================================================

async function applyMasterPreset() {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const streakData = {
            count: MASTER_PROFILE_CONFIG.streakDays,
            best: Math.max(MASTER_PROFILE_CONFIG.streakDays, MASTER_PROFILE_CONFIG.bestStreakDays),
            lastVisit: today.getTime()
        };
        localStorage.setItem('daily_streak', JSON.stringify(streakData));

        const totalSeconds = (MASTER_PROFILE_CONFIG.timeSpentHours * 3600) + (MASTER_PROFILE_CONFIG.timeSpentMinutes * 60);
        localStorage.setItem('hub_time_spent', totalSeconds);

        localStorage.setItem('show_dates', MASTER_PROFILE_CONFIG.enableShowDates ? 'true' : 'false');
        if (MASTER_PROFILE_CONFIG.theme) {
            localStorage.setItem('theme', MASTER_PROFILE_CONFIG.theme);
        }

        if (MASTER_PROFILE_CONFIG.unlockAllAch && typeof ACHIEVEMENTS !== 'undefined') {
            const allAchIds = Object.keys(ACHIEVEMENTS);
            localStorage.setItem('unlocked_achievements', JSON.stringify(allAchIds));
        }

        if (MASTER_PROFILE_CONFIG.markAllViewed) {
            const response = await fetch('projects.json');
            if (response.ok) {
                const projectsData = await response.json();
                const allProjectKeys = Object.keys(projectsData).filter(k => k !== '.html' && k !== '');
                localStorage.setItem('opened_projects', JSON.stringify(allProjectKeys));
            }
        }

        if (typeof writeOutput === 'function') {
            writeOutput('Master preset applied! Reloading hub...');
        }
        setTimeout(() => location.reload(), 600);
    } catch (err) {
        console.error('Ошибка применения пресета:', err);
    }
}

window.kiwwijPreset = applyMasterPreset;

function exportProfileStatsHTML() {
    const backupPayload = {
        daily_streak: JSON.parse(localStorage.getItem('daily_streak')) || { count: 1, best: 1, lastVisit: Date.now() },
        hub_time_spent: parseInt(localStorage.getItem('hub_time_spent'), 10) || 0,
        unlocked_achievements: JSON.parse(localStorage.getItem('unlocked_achievements')) || [],
        opened_projects: JSON.parse(localStorage.getItem('opened_projects')) || [],
        pinned_projects: JSON.parse(localStorage.getItem('pinned_projects')) || [],
        show_dates: localStorage.getItem('show_dates') || 'false',
        theme: localStorage.getItem('theme') || 'dark',
        exportDate: new Date().toISOString()
    };

    const hours = (backupPayload.hub_time_spent / 3600).toFixed(1);
    const jsonString = JSON.stringify(backupPayload, null, 2);

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>kiwwij Hub | User Stats & Backup</title>
    <style>
        body { background: #0d1117; color: #f0f6fc; font-family: 'Inter', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; }
        .card { background: #161b22; border: 1px solid #30363d; border-radius: 16px; padding: 30px; max-width: 520px; width: 100%; box-shadow: 0 10px 30px rgba(0,0,0,0.4); }
        h1 { margin: 0 0 8px; font-size: 1.5rem; color: #58a6ff; }
        .sub { color: #8b949e; font-size: 0.85rem; margin-bottom: 24px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }
        .stat { background: #0d1117; border: 1px solid #30363d; padding: 14px; border-radius: 10px; }
        .stat-val { font-size: 1.4rem; font-weight: 800; color: #f0f6fc; }
        .stat-label { font-size: 0.8rem; color: #8b949e; margin-top: 4px; }
        textarea { width: 100%; height: 90px; background: #0d1117; color: #8b949e; border: 1px solid #30363d; border-radius: 8px; padding: 8px; font-family: monospace; font-size: 0.75rem; resize: none; box-sizing: border-box; margin-bottom: 12px; }
        .btn { background: #58a6ff; color: #0d1117; border: none; padding: 10px 16px; border-radius: 8px; font-weight: 700; cursor: pointer; width: 100%; font-size: 0.9rem; }
        .btn:hover { filter: brightness(1.1); }
    </style>
</head>
<body>
    <div class="card">
        <h1>📂 kiwwij Hub — Profile Backup</h1>
        <div class="sub">Exported: ${new Date().toLocaleString()}</div>
        <div class="grid">
            <div class="stat"><div class="stat-val">🔥 ${backupPayload.daily_streak.count}d</div><div class="stat-label">Current Streak (Best: ${backupPayload.daily_streak.best}d)</div></div>
            <div class="stat"><div class="stat-val">⏱️ ${hours}h</div><div class="stat-label">Time Spent (${backupPayload.hub_time_spent}s)</div></div>
            <div class="stat"><div class="stat-val">🏆 ${backupPayload.unlocked_achievements.length}</div><div class="stat-label">Achievements Unlocked</div></div>
            <div class="stat"><div class="stat-val">👁️ ${backupPayload.opened_projects.length}</div><div class="stat-label">Projects Viewed</div></div>
        </div>
        <textarea id="backup-data" readonly>${jsonString}</textarea>
        <button class="btn" onclick="downloadJson()">💾 Download .JSON for Restore (/import)</button>
    </div>
    <script id="raw-backup" type="application/json">${jsonString}<\/script>
    <script>
        function downloadJson() {
            const data = document.getElementById('raw-backup').textContent;
            const blob = new Blob([data], { type: 'application/json' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'kiwwij-hub-backup.json';
            a.click();
        }
    <\/script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `kiwwij-hub-stats-${new Date().toISOString().slice(0, 10)}.html`;
    a.click();
}

function importProfileBackup() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.html';

    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                let content = event.target.result;
                let data;

                if (file.name.endsWith('.html')) {
                    const match = content.match(/<script id="raw-backup" type="application\/json">([\s\S]*?)<\/script>/);
                    if (!match) throw new Error('Backup block not found in HTML');
                    data = JSON.parse(match[1]);
                } else {
                    data = JSON.parse(content);
                }

                if (data.daily_streak) {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    data.daily_streak.lastVisit = today.getTime();
                    localStorage.setItem('daily_streak', JSON.stringify(data.daily_streak));
                }
                if (typeof data.hub_time_spent === 'number') {
                    localStorage.setItem('hub_time_spent', data.hub_time_spent);
                }
                if (Array.isArray(data.unlocked_achievements)) {
                    localStorage.setItem('unlocked_achievements', JSON.stringify(data.unlocked_achievements));
                }
                if (Array.isArray(data.opened_projects)) {
                    localStorage.setItem('opened_projects', JSON.stringify(data.opened_projects));
                }
                if (Array.isArray(data.pinned_projects)) {
                    localStorage.setItem('pinned_projects', JSON.stringify(data.pinned_projects));
                }
                if (data.show_dates) {
                    localStorage.setItem('show_dates', data.show_dates);
                }
                if (data.theme) {
                    localStorage.setItem('theme', data.theme);
                }

                if (typeof writeOutput === 'function') {
                    writeOutput('Backup successfully restored! Reloading...');
                }
                setTimeout(() => location.reload(), 600);
            } catch (err) {
                if (typeof writeOutput === 'function') {
                    writeOutput('Error: Invalid backup file.');
                }
            }
        };
        reader.readAsText(file);
    };

    input.click();
}