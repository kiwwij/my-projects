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
    } else {
        writeOutput('Unknown command: ' + rawCmd + '. Type "help" or "/help" for a list of commands.');
    }
}