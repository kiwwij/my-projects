document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 500);
    }

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const soundSelect = document.getElementById('soundSelect');
    
    const savedSound = localStorage.getItem('kb-sound');
    if (savedSound) soundSelect.value = savedSound;

    soundSelect.addEventListener('change', (e) => {
        localStorage.setItem('kb-sound', e.target.value);
        playTypingSound();
    });
    
    const playTypingSound = () => {
        const type = soundSelect.value;
        if (type === 'none') return;
        
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        const now = audioCtx.currentTime;
        
        if (type === 'mechanical') {
            osc.type = 'sine'; 
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.05);
            gainNode.gain.setValueAtTime(0.4, now);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            
        } else if (type === 'typewriter') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
            
        } else if (type === 'membrane') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(200, now);
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);
            gainNode.gain.setValueAtTime(0.2, now);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        }
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(now + 0.1);
    };


    let currentTheme = localStorage.getItem('kb-theme') || 'dark';
    const themeBtn = document.getElementById('themeToggle');
    
    const applyTheme = (theme) => {
        document.body.setAttribute('data-theme', theme);
        const icon = theme === 'dark' ? 'bx-sun' : 'bx-moon';
        const text = theme === 'dark' ? 'Light' : 'Dark';
        themeBtn.innerHTML = `<i class='bx ${icon}'></i> <span>${text}</span>`;
    };

    applyTheme(currentTheme);

    themeBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('kb-theme', currentTheme);
        applyTheme(currentTheme);
        playTypingSound();
    });


    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const infoBtn = document.getElementById('infoBtn');

    const openModal = () => modalOverlay.classList.remove('hidden');
    const closeModal = () => modalOverlay.classList.add('hidden');

    infoBtn.addEventListener('click', () => { openModal(); playTypingSound(); });
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });


    window.addEventListener('keydown', (e) => {
        if (e.code !== 'F12' && e.code !== 'F5') {
            e.preventDefault();
        }

        if (e.code === 'Escape' && !modalOverlay.classList.contains('hidden')) {
            closeModal();
        }

        if (e.code === 'F5') {
            const f5Key = document.querySelector(`.key[data-code="F5"]`);
            if (f5Key) {
                f5Key.classList.add('active', 'tested');
                playTypingSound();
            }
            return; 
        }

        const keyElement = document.querySelector(`.key[data-code="${e.code}"]`);
        if (keyElement && !e.repeat) {
            keyElement.classList.add('active');
            keyElement.classList.add('tested');
            playTypingSound();
        }
    });

    window.addEventListener('keyup', (e) => {
        const keyElement = document.querySelector(`.key[data-code="${e.code}"]`);
        if (keyElement) {
            keyElement.classList.remove('active');
        }
    });
});