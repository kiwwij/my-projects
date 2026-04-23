const translations = {
    en: {
        desc: "Here you can find all my social links and favorite playlists.",
        socialsTitle: "Social Media",
        musicTitle: "Music & Playlists",
        ytm1: "YouTube Music 1", ytm2: "YouTube Music 2", ytm3: "YouTube Music 4", ytm4: "YouTube Music 3",
        descYT: "My main YouTube channel",
        descTG: "My Telegram profile",
        descSteam: "My Steam profile",
        descGH: "My GitHub repositories",
        descDS: "My Discord server",
        descTW: "My Twitch channel",
        descKick: "My Kick channel",
        descX: "My X (Twitter) profile",
        descIG: "My Instagram profile",
        descTT: "My TikTok profile",
        descBSky: "My Bluesky profile",
        descWtv: "My W.tv profile",
        descGR: "My Goodreads library",
        descSC: "My SoundCloud profile",
        descYTM1: "Listen to Playlist 1", descYTM2: "Listen to Playlist 2", descYTM3: "Listen to Playlist 3", descYTM4: "Listen to Playlist 4",
        avatarSteam: "Avatar from Steam"
    },
    ru: {
        desc: "Здесь собраны все мои социальные сети и любимые плейлисты.",
        socialsTitle: "Социальные сети",
        musicTitle: "Музыка и Плейлисты",
        ytm1: "YouTube Music 1", ytm2: "YouTube Music 2", ytm3: "YouTube Music 4", ytm4: "YouTube Music 3",
        descYT: "Мой основной YouTube канал",
        descTG: "Мой профиль в Telegram",
        descSteam: "Мой профиль Steam",
        descGH: "Мои репозитории на GitHub",
        descDS: "Мой сервер в Discord",
        descTW: "Мой Twitch канал",
        descKick: "Мой Kick канал",
        descX: "Мой профиль X (Twitter)",
        descIG: "Мой профиль в Instagram",
        descTT: "Мой профиль в TikTok",
        descBSky: "Мой профиль Bluesky",
        descWtv: "Мой профиль на W.tv",
        descGR: "Моя библиотека на Goodreads",
        descSC: "Мой профиль SoundCloud",
        descYTM1: "Слушать Плейлист 1", descYTM2: "Слушать Плейлист 2", descYTM3: "Слушать Плейлист 3", descYTM4: "Слушать Плейлист 4",
        avatarSteam: "Аватарка из Steam"
    },
    uk: {
        desc: "Тут зібрані всі мої соціальні мережі та улюблені плейлисти.",
        socialsTitle: "Соціальні мережі",
        musicTitle: "Музика та Плейлисти",
        ytm1: "YouTube Music 1", ytm2: "YouTube Music 2", ytm3: "YouTube Music 4", ytm4: "YouTube Music 3",
        descYT: "Мій основний YouTube канал",
        descTG: "Мій профіль у Telegram",
        descSteam: "Мій профіль Steam",
        descGH: "Мої репозиторії на GitHub",
        descDS: "Мій сервер у Discord",
        descTW: "Мій Twitch канал",
        descKick: "Мій Kick канал",
        descX: "Мій профіль X (Twitter)",
        descIG: "Мій профіль в Instagram",
        descTT: "Мій профіль у TikTok",
        descBSky: "Мій профіль Bluesky",
        descWtv: "Мій профіль на W.tv",
        descGR: "Моя бібліотека на Goodreads",
        descSC: "Мій профіль SoundCloud",
        descYTM1: "Слухати Плейлист 1", descYTM2: "Слухати Плейлист 2", descYTM3: "Слухати Плейлист 3", descYTM4: "Слухати Плейлист 4",
        avatarSteam: "Аватарка зі Steam"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-switch');
    const themeIcon = document.getElementById('theme-icon');
    const langSelect = document.getElementById('lang-switch');

    // Инициализация темы
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.classList.replace('bx-moon', 'bx-sun');
    }
    
    // Запускаем фоновые эффекты в зависимости от темы
    initBgEffects();

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        
        if (isLight) {
            themeIcon.classList.replace('bx-moon', 'bx-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.replace('bx-sun', 'bx-moon');
            localStorage.setItem('theme', 'dark');
        }
        
        // Перерисовываем фон при смене темы
        initBgEffects();
    });

    // Язык
    const savedLang = localStorage.getItem('lang') || 'en';
    langSelect.value = savedLang;
    applyTranslation(savedLang);

    langSelect.addEventListener('change', (e) => {
        const lang = e.target.value;
        localStorage.setItem('lang', lang);
        applyTranslation(lang);
    });

    function applyTranslation(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        document.querySelectorAll('[data-title-i18n]').forEach(el => {
            const key = el.getAttribute('data-title-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.setAttribute('title', translations[lang][key]);
            }
        });
    }

    updateSteamAvatar();
});

// Логика фоновых эффектов
function initBgEffects() {
    const bgContainer = document.getElementById('bg-effects');
    bgContainer.innerHTML = ''; // очищаем перед сменой
    const isLight = document.body.classList.contains('light-theme');

    if (isLight) {
        // Светлая тема: плавающие мягкие пылинки
        for (let i = 0; i < 15; i++) {
            const dust = document.createElement('div');
            dust.className = 'dust';
            dust.style.width = Math.random() * 80 + 30 + 'px';
            dust.style.height = dust.style.width;
            dust.style.left = Math.random() * 100 + 'vw';
            dust.style.top = Math.random() * 100 + 'vh';
            dust.style.animationDuration = Math.random() * 10 + 10 + 's';
            dust.style.animationDelay = Math.random() * -10 + 's'; // чтобы уже были на экране
            bgContainer.appendChild(dust);
        }
    } else {
        // Тёмная тема: падающие звёзды (метеоры)
        for (let i = 0; i < 10; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 150 + 'vw';
            star.style.top = Math.random() * -50 + 'vh';
            star.style.animationDuration = Math.random() * 3 + 2 + 's';
            star.style.animationDelay = Math.random() * 5 + 's';
            bgContainer.appendChild(star);
        }
    }
}

async function updateSteamAvatar() {
    const avatarImg = document.getElementById('profile-avatar');
    const placeholder = document.getElementById('avatar-placeholder');
    // const fallbackUrl = 'https://kiwwij.github.io/kiwwij-anime-tier-list/img/about%20me/secret_avatar.png';
    const dataUrl = 'https://kiwwij.github.io/kiwwij-anime-tier-list/data/steam-profile-data.js';

    try {
        const response = await fetch(dataUrl);
        if (response.ok) {
            const scriptContent = await response.text();
            const match = scriptContent.match(/["']avatar["']\s*:\s*["']([^"']+)["']/);
            
            if (match && match[1]) {
                avatarImg.src = match[1];
            } else {
                avatarImg.src = fallbackUrl;
            }
        } else {
            avatarImg.src = fallbackUrl;
        }
    } catch (err) {
        avatarImg.src = fallbackUrl;
    }

    avatarImg.onload = () => {
        avatarImg.style.display = 'block';
        placeholder.style.display = 'none';
    };
}