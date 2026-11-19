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

    window.timeTrackerInterval = setInterval(() => {
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
                *** WELCOME TO KIWWIJ'S HOMEPAGE (1999 EDITION) *** BEST VIEWED IN NETSCAPE NAVIGATOR 4.0 (800x600) *** DO NOT TIE UP THE PHONE LINE; PROJECTS ARE BEING LOADED... ***
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

const GH_TOKEN_KEY = 'gh_sync_token';
const GH_GIST_ID_KEY = 'gh_sync_gist';

function importStatsFromFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const save = JSON.parse(event.target.result);
                const validKeys = ['daily_streak', 'hub_time_spent', 'unlocked_achievements', 'opened_projects', 'pinned_projects', 'theme', 'show_dates'];
                const hasValidData = validKeys.some(k => k in save);

                if (!hasValidData) throw new Error('Invalid save format');
                
                if (window.timeTrackerInterval) clearInterval(window.timeTrackerInterval);
                if (save.daily_streak) localStorage.setItem('daily_streak', JSON.stringify(save.daily_streak));
                if (typeof save.hub_time_spent === 'number') localStorage.setItem('hub_time_spent', save.hub_time_spent);
                if (Array.isArray(save.unlocked_achievements)) localStorage.setItem('unlocked_achievements', JSON.stringify(save.unlocked_achievements));
                if (Array.isArray(save.opened_projects)) localStorage.setItem('opened_projects', JSON.stringify(save.opened_projects));
                if (Array.isArray(save.pinned_projects)) localStorage.setItem('pinned_projects', JSON.stringify(save.pinned_projects));
                if (save.show_dates !== undefined) localStorage.setItem('show_dates', String(save.show_dates));
                if (save.theme) {
                    localStorage.setItem('theme', save.theme);
                    document.documentElement.setAttribute('data-theme', save.theme === 'dark' ? 'dark' : null);
                }

                if (localStorage.getItem(GH_TOKEN_KEY)) {
                    await syncToGitHub(false);
                }

                if (typeof showToast === 'function') {
                    showToast('<i class="bx bx-check-circle"></i> Stats imported! Reloading...');
                }
                setTimeout(() => location.reload(), 1200);
            } catch (err) {
                console.error('Import error:', err);
                if (typeof showToast === 'function') {
                    showToast('<i class="bx bx-error-circle"></i> Invalid JSON save file.');
                }
            }
        };
        reader.readAsText(file);
    };

    input.click();
}

function showSyncModal(onConfirm) {
    const overlay = document.createElement('div');
    overlay.className = 'sync-modal-overlay';
    
    overlay.innerHTML = `
        <div class="sync-modal">
            <div class="sync-modal-header">
                <h2><i class='bx bxl-github'></i> Cloud Sync & Backup</h2>
                <button class="sync-close-btn">&times;</button>
            </div>
            <div class="sync-modal-body">
                <p>Enter your <strong>Personal Access Token</strong> (with <code>gist</code> scope) to enable automatic cloud saving.</p>
                <input type="password" id="gh-token-input" placeholder="ghp_xxxxxxxxxxxxxxxxxxxx..." autocomplete="off">
                
                <div class="sync-divider"><span>or</span></div>
                
                <button class="conflict-btn file-import-btn">
                    <i class='bx bx-upload'></i>
                    <div>
                        <strong>Import from File (.json)</strong>
                        <span>Restore stats manually from a local backup</span>
                    </div>
                </button>
            </div>
            <div class="sync-modal-footer">
                <button class="sync-btn-cancel">Cancel</button>
                <button class="sync-btn-confirm"><i class='bx bx-link'></i> Connect</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('active'), 10);

    const closeBtn = overlay.querySelector('.sync-close-btn');
    const cancelBtn = overlay.querySelector('.sync-btn-cancel');
    const confirmBtn = overlay.querySelector('.sync-btn-confirm');
    const fileImportBtn = overlay.querySelector('.file-import-btn');
    const input = overlay.querySelector('#gh-token-input');

    input.focus();

    const closeModal = () => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    };

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

    fileImportBtn.addEventListener('click', () => {
        closeModal();
        importStatsFromFile();
    });

    const submit = () => {
        const val = input.value.trim();
        if (val) {
            onConfirm(val);
            closeModal();
        }
    };

    confirmBtn.addEventListener('click', submit);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
}

function showBackupMenuModal() {
    const overlay = document.createElement('div');
    overlay.className = 'sync-modal-overlay';
    
    overlay.innerHTML = `
        <div class="sync-modal">
            <div class="sync-modal-header">
                <h2><i class='bx bx-cloud'></i> Cloud Sync & Backup</h2>
                <button class="sync-close-btn">&times;</button>
            </div>
            <div class="sync-modal-body">
                <div class="conflict-actions">
                    <button class="conflict-btn force-save-btn">
                        <i class='bx bx-cloud-upload'></i>
                        <div>
                            <strong>Save to GitHub Now</strong>
                            <span>Manually push current stats to Gist</span>
                        </div>
                    </button>
                    <button class="conflict-btn file-import-btn">
                        <i class='bx bx-upload'></i>
                        <div>
                            <strong>Import from File (.json)</strong>
                            <span>Load stats from a local backup file</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('active'), 10);

    const closeModal = () => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    };

    overlay.querySelector('.sync-close-btn').addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

    overlay.querySelector('.force-save-btn').addEventListener('click', () => {
        closeModal();
        syncToGitHub(true);
    });

    overlay.querySelector('.file-import-btn').addEventListener('click', () => {
        closeModal();
        importStatsFromFile();
    });
}

function showConflictModal(onDownload, onUpload) {
    const overlay = document.createElement('div');
    overlay.className = 'sync-modal-overlay';
    
    overlay.innerHTML = `
        <div class="sync-modal">
            <div class="sync-modal-header">
                <h2><i class='bx bx-error-circle' style="color: #e17055;"></i> Save Conflict Detected</h2>
            </div>
            <div class="sync-modal-body">
                <p>We found an existing cloud save on this GitHub account. How would you like to proceed?</p>
                <div class="conflict-actions">
                    <button class="conflict-btn download-btn">
                        <i class='bx bx-cloud-download'></i>
                        <div>
                            <strong>Load from Cloud</strong>
                            <span>Overwrites current device data</span>
                        </div>
                    </button>
                    <button class="conflict-btn upload-btn">
                        <i class='bx bx-cloud-upload'></i>
                        <div>
                            <strong>Overwrite Cloud</strong>
                            <span>Saves current device data to cloud</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('active'), 10);

    overlay.querySelector('.download-btn').addEventListener('click', () => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
        onDownload();
    });

    overlay.querySelector('.upload-btn').addEventListener('click', () => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
        onUpload();
    });
}

function updateSyncStatus(state, message = '') {
    let statusEl = document.getElementById('gh-sync-status');
    
    if (!statusEl) {
        const footer = document.querySelector('footer');
        if (!footer) return;
        
        const sep = document.createElement('span');
        sep.textContent = '•';
        sep.id = 'gh-sync-sep';
        
        statusEl = document.createElement('span');
        statusEl.id = 'gh-sync-status';
        statusEl.className = 'ach-progress';
        statusEl.style.cursor = 'pointer';
        statusEl.title = 'Cloud Sync & Backup';
        statusEl.addEventListener('click', showBackupMenuModal);
        
        footer.appendChild(sep);
        footer.appendChild(statusEl);
    }

    if (state === 'idle') {
        statusEl.innerHTML = `<i class='bx bx-cloud'></i>`;
    } else if (state === 'loading') {
        statusEl.innerHTML = `<i class='bx bx-cloud-download bx-flashing' style="color: var(--accent);"></i> Loading...`;
    } else if (state === 'saving') {
        statusEl.innerHTML = `<i class='bx bx-cloud-upload bx-flashing' style="color: var(--accent);"></i> Saving...`;
    } else if (state === 'saved') {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        statusEl.innerHTML = `<i class='bx bx-check-circle' style="color: #00b894;"></i> Saved`;
        statusEl.title = `Last saved at ${timeStr}. Click for options.`;
        
        setTimeout(() => {
            if (statusEl.innerHTML.includes('Saved')) {
                statusEl.innerHTML = `<i class='bx bx-cloud'></i>`;
            }
        }, 3000);
    } else if (state === 'error') {
        statusEl.innerHTML = `<i class='bx bx-error-circle' style="color: #e17055;"></i> Sync Error`;
        statusEl.title = message || 'Failed to sync with GitHub. Click for options.';
    }
}

async function initGitHubSync() {
    const token = localStorage.getItem(GH_TOKEN_KEY);
    const syncBtns = document.querySelectorAll('.gh-sync-btn');

    if (token) {
        syncBtns.forEach(btn => btn.style.display = 'none');
        updateSyncStatus('idle');
        
        setTimeout(() => syncToGitHub(false), 5000);
        window.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') syncToGitHub(false);
        });
        window.addEventListener('beforeunload', () => syncToGitHub(false));
    } else {
        syncBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                showSyncModal(async (inputToken) => {
                    syncBtns.forEach(b => b.style.display = 'none');
                    if (typeof showToast === 'function') showToast('<i class="bx bx-loader-alt bx-spin"></i> Checking cloud data...');

                    try {
                        const res = await fetch('https://api.github.com/gists', {
                            headers: { 'Authorization': `token ${inputToken}` }
                        });
                        
                        if (!res.ok) throw new Error("Invalid token");
                        const gists = await res.json();
                        const existingGist = gists.find(g => g.description === "kiwwij Hub Save Data");

                        if (existingGist) {
                            showConflictModal(
                                async () => {
                                    localStorage.setItem(GH_TOKEN_KEY, inputToken);
                                    localStorage.setItem(GH_GIST_ID_KEY, existingGist.id);
                                    await syncFromGitHub();
                                    
                                    if (typeof unlockAchievement === 'function') unlockAchievement('cloud_sync');
                                    await syncToGitHub(false);
                                    
                                    if (typeof showToast === 'function') showToast('<i class="bx bx-cloud-download"></i> Data loaded! Reloading...');
                                    setTimeout(() => location.reload(), 3000);
                                },
                                async () => {
                                    localStorage.setItem(GH_TOKEN_KEY, inputToken);
                                    localStorage.setItem(GH_GIST_ID_KEY, existingGist.id);
                                    if (typeof unlockAchievement === 'function') unlockAchievement('cloud_sync');
                                    await syncToGitHub(false);
                                    
                                    if (typeof showToast === 'function') showToast('<i class="bx bx-cloud-upload"></i> Cloud overwritten! Reloading...');
                                    setTimeout(() => location.reload(), 3000);
                                }
                            );
                        } else {
                            localStorage.setItem(GH_TOKEN_KEY, inputToken);
                            if (typeof unlockAchievement === 'function') unlockAchievement('cloud_sync');
                            await syncToGitHub(false);
                            
                            if (typeof showToast === 'function') showToast('<i class="bx bx-cloud-upload"></i> Cloud save created!');
                        }

                    } catch (err) {
                        console.error('Sync error:', err);
                        if (typeof showToast === 'function') showToast('<i class="bx bx-error"></i> Error! Invalid token.');
                        syncBtns.forEach(b => b.style.display = 'flex');
                    }
                });
            });
        });
    }
}

async function syncToGitHub(isManual = false) {
    const token = localStorage.getItem(GH_TOKEN_KEY);
    const gistId = localStorage.getItem(GH_GIST_ID_KEY);
    if (!token) return;

    updateSyncStatus('saving');

    const payload = {
        daily_streak: JSON.parse(localStorage.getItem('daily_streak')) || {},
        hub_time_spent: parseInt(localStorage.getItem('hub_time_spent'), 10) || 0,
        unlocked_achievements: JSON.parse(localStorage.getItem('unlocked_achievements')) || [],
        opened_projects: JSON.parse(localStorage.getItem('opened_projects')) || [],
        pinned_projects: JSON.parse(localStorage.getItem('pinned_projects')) || [],
        show_dates: localStorage.getItem('show_dates') || 'false',
        theme: localStorage.getItem('theme') || 'dark',
        last_sync: new Date().toISOString()
    };

    const requestData = { files: { "kiwwij_hub_save.json": { content: JSON.stringify(payload, null, 2) } } };

    try {
        let res;
        if (gistId) {
            res = await fetch(`https://api.github.com/gists/${gistId}`, {
                method: 'PATCH',
                headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' },
                body: JSON.stringify(requestData)
            });
        } else {
            requestData.description = "kiwwij Hub Save Data";
            requestData.public = false; 
            res = await fetch('https://api.github.com/gists', {
                method: 'POST',
                headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' },
                body: JSON.stringify(requestData)
            });
            const data = await res.json();
            if (data.id) localStorage.setItem(GH_GIST_ID_KEY, data.id);
        }

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        updateSyncStatus('saved');
        if (isManual && typeof showToast === 'function') {
            showToast('<i class="bx bx-cloud-upload"></i> Progress saved to GitHub!');
        }
    } catch (err) {
        console.error('GitHub save error:', err);
        updateSyncStatus('error', err.message);
    }
}

async function syncFromGitHub() {
    const token = localStorage.getItem(GH_TOKEN_KEY);
    const gistId = localStorage.getItem(GH_GIST_ID_KEY);
    if (!token || !gistId) return;

    updateSyncStatus('loading');

    try {
        const res = await fetch(`https://api.github.com/gists/${gistId}`, { 
            headers: { 'Authorization': `token ${token}` } 
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        const data = await res.json();
        
        if (data.files && data.files['kiwwij_hub_save.json']) {
            const save = JSON.parse(data.files['kiwwij_hub_save.json'].content);

            if (window.timeTrackerInterval) clearInterval(window.timeTrackerInterval);
            if (save.daily_streak) localStorage.setItem('daily_streak', JSON.stringify(save.daily_streak));
            if (typeof save.hub_time_spent === 'number') localStorage.setItem('hub_time_spent', save.hub_time_spent);
            if (Array.isArray(save.unlocked_achievements)) localStorage.setItem('unlocked_achievements', JSON.stringify(save.unlocked_achievements));
            if (Array.isArray(save.opened_projects)) localStorage.setItem('opened_projects', JSON.stringify(save.opened_projects));
            if (Array.isArray(save.pinned_projects)) localStorage.setItem('pinned_projects', JSON.stringify(save.pinned_projects));
            if (save.show_dates !== undefined) localStorage.setItem('show_dates', String(save.show_dates));
            if (save.theme) {
                localStorage.setItem('theme', save.theme);
                document.documentElement.setAttribute('data-theme', save.theme === 'dark' ? 'dark' : null);
            }
        }
        updateSyncStatus('saved');
    } catch (err) {
        console.error('GitHub load error:', err);
        updateSyncStatus('error', err.message);
    }
}

document.addEventListener('DOMContentLoaded', initGitHubSync);

function updateSyncStatus(state, message = '') {
    let statusEl = document.getElementById('gh-sync-status');
    
    if (!statusEl) {
        const footer = document.querySelector('footer');
        if (!footer) return;
        
        const sep = document.createElement('span');
        sep.textContent = '•';
        sep.id = 'gh-sync-sep';
        
        statusEl = document.createElement('span');
        statusEl.id = 'gh-sync-status';
        statusEl.className = 'ach-progress';
        statusEl.style.cursor = 'pointer';
        statusEl.title = 'Click to force cloud sync';
        statusEl.addEventListener('click', () => syncToGitHub(true));
        
        footer.appendChild(sep);
        footer.appendChild(statusEl);
    }

    if (state === 'loading') {
        statusEl.innerHTML = `<i class='bx bx-cloud-download bx-flashing' style="color: var(--accent);"></i> Loading...`;
    } else if (state === 'saving') {
        statusEl.innerHTML = `<i class='bx bx-cloud-upload bx-flashing' style="color: var(--accent);"></i> Saving...`;
    } else if (state === 'saved') {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        statusEl.innerHTML = `<i class='bx bx-check-circle' style="color: #00b894;"></i> Saved`;
        statusEl.title = `Last synced at ${timeStr}. Click to sync now.`;
        
        setTimeout(() => {
            if (statusEl.innerHTML.includes('Saved')) {
                statusEl.innerHTML = `<i class='bx bx-cloud'></i>`;
            }
        }, 3000);
    } else if (state === 'error') {
        statusEl.innerHTML = `<i class='bx bx-error-circle' style="color: #e17055;"></i> Sync Error`;
        statusEl.title = message || 'Failed to sync with GitHub. Click to retry.';
    }
}

async function syncToGitHub(isManual = false) {
    const token = localStorage.getItem(GH_TOKEN_KEY);
    const gistId = localStorage.getItem(GH_GIST_ID_KEY);
    if (!token) return;

    updateSyncStatus('saving');

    const payload = {
        daily_streak: JSON.parse(localStorage.getItem('daily_streak')) || {},
        hub_time_spent: parseInt(localStorage.getItem('hub_time_spent'), 10) || 0,
        unlocked_achievements: JSON.parse(localStorage.getItem('unlocked_achievements')) || [],
        opened_projects: JSON.parse(localStorage.getItem('opened_projects')) || [],
        pinned_projects: JSON.parse(localStorage.getItem('pinned_projects')) || [],
        show_dates: localStorage.getItem('show_dates') || 'false',
        theme: localStorage.getItem('theme') || 'dark',
        last_sync: new Date().toISOString()
    };

    const requestData = { files: { "kiwwij_hub_save.json": { content: JSON.stringify(payload, null, 2) } } };

    try {
        let res;
        if (gistId) {
            res = await fetch(`https://api.github.com/gists/${gistId}`, {
                method: 'PATCH',
                headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' },
                body: JSON.stringify(requestData)
            });
        } else {
            requestData.description = "kiwwij Hub Save Data";
            requestData.public = false; 
            res = await fetch('https://api.github.com/gists', {
                method: 'POST',
                headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' },
                body: JSON.stringify(requestData)
            });
            const data = await res.json();
            if (data.id) localStorage.setItem(GH_GIST_ID_KEY, data.id);
        }

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        updateSyncStatus('saved');
        if (isManual && typeof showToast === 'function') {
            showToast('<i class="bx bx-cloud-upload"></i> Progress saved to GitHub!');
        }
    } catch (err) {
        console.error('GitHub save error:', err);
        updateSyncStatus('error', err.message);
    }
}

async function syncFromGitHub() {
    const token = localStorage.getItem(GH_TOKEN_KEY);
    const gistId = localStorage.getItem(GH_GIST_ID_KEY);
    if (!token || !gistId) return;

    updateSyncStatus('loading');

    try {
        const res = await fetch(`https://api.github.com/gists/${gistId}`, { 
            headers: { 'Authorization': `token ${token}` } 
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        const data = await res.json();
        
        if (data.files && data.files['kiwwij_hub_save.json']) {
            const save = JSON.parse(data.files['kiwwij_hub_save.json'].content);
            
            const localTime = parseInt(localStorage.getItem('hub_time_spent'), 10) || 0;
            if (save.hub_time_spent && save.hub_time_spent > localTime) {
                localStorage.setItem('hub_time_spent', save.hub_time_spent);
            }
            
            if (save.daily_streak) {
                const localStreak = JSON.parse(localStorage.getItem('daily_streak')) || { count: 0, best: 0, lastVisit: 0 };
                const cloudStreak = save.daily_streak;
                
                const mergedStreak = {
                    count: (localStreak.lastVisit >= cloudStreak.lastVisit) 
                        ? Math.max(localStreak.count, cloudStreak.count) 
                        : cloudStreak.count,
                    best: Math.max(localStreak.best || 0, cloudStreak.best || 0),
                    lastVisit: Math.max(localStreak.lastVisit || 0, cloudStreak.lastVisit || 0)
                };
                localStorage.setItem('daily_streak', JSON.stringify(mergedStreak));
            }
            
            if (Array.isArray(save.unlocked_achievements)) {
                const localAch = JSON.parse(localStorage.getItem('unlocked_achievements')) || [];
                const mergedAch = [...new Set([...localAch, ...save.unlocked_achievements])];
                localStorage.setItem('unlocked_achievements', JSON.stringify(mergedAch));
            }
            
            if (Array.isArray(save.opened_projects)) {
                const localOpened = JSON.parse(localStorage.getItem('opened_projects')) || [];
                const mergedOpened = [...new Set([...localOpened, ...save.opened_projects])];
                localStorage.setItem('opened_projects', JSON.stringify(mergedOpened));
            }
            
            if (Array.isArray(save.pinned_projects)) {
                localStorage.setItem('pinned_projects', JSON.stringify(save.pinned_projects));
            }
            if (save.theme) {
                localStorage.setItem('theme', save.theme);
                document.documentElement.setAttribute('data-theme', save.theme === 'dark' ? 'dark' : null);
            }
            if (save.show_dates) {
                localStorage.setItem('show_dates', save.show_dates);
            }
        }
        updateSyncStatus('saved');
    } catch (err) {
        console.error('GitHub load error:', err);
        updateSyncStatus('error', err.message);
    }
}