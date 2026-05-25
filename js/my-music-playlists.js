const playlistsData = [
    {
        id: "Main",
        link: "https://music.youtube.com/playlist?list=PLov5IgTS5pqlgCtFnLEi7x7uFdu6mQj-C"
    },
    {
        id: "Off Screen",
        link: "https://music.youtube.com/playlist?list=PLov5IgTS5pqmmF8hmlVcQXWpUBai2C7EZ"
    },
    {
        id: "Game OSTs",
        link: "https://music.youtube.com/playlist?list=PLov5IgTS5pqkDuC__SDej4G0zxH4KKTCJ"
    },
    {
        id: "Sewerslvt",
        link: "https://music.youtube.com/playlist?list=PLov5IgTS5pqnkO9-TBA6AJOF9-2tvdvXk"
    },
    {
        id: "Dead inside",
        link: "https://music.youtube.com/playlist?list=PLov5IgTS5pqktJQvn8Qsd9tMlrR1XNnu2"
    }
];

const i18n = {
    ru: {
        title: "All my music playlists",
        desc: "Избранные вайбы и треки под любое настроение. Погрузись в атмосферу звука.",
        btnListen: "Открыть плейлист",
        items: {
            "Main": { title: "annoying noise", desc: "Подборка треков, которые заслушал до дыр. Примерно все в одном стиле." },
            "Off Screen": { title: "У ПОНИ НЕТ ПЕН*СОВ!", desc: "Песни из аниме, мультфильмов и других произведений." },
            "Game OSTs": { title: "А Я ЕБ* ЧТО ЛИ", desc: "Оригинальные саундтреки, темы из видеоигр." },
            "Sewerslvt": { title: "ABSOLUTE SLVTCORE", desc: "Брейккор и драм-н-бейс от sewerslvt'a." },
            "Dead inside": { title: "GRAVE 🪦", desc: "Архив абсолютно всех композиций, которые мне когда-либо понравились." }
        }
    }
};

const currentLang = 'ru';
let currentTheme = localStorage.getItem('appTheme') || 'dark';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLang();
    renderPlaylists();

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});

function initTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
}

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('appTheme', currentTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
        icon.className = currentTheme === 'dark' ? 'bx bx-moon' : 'bx bx-sun';
    }
}

function initLang() {
    document.documentElement.lang = currentLang;
    updateStaticText();
}

function updateStaticText() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[currentLang][key]) {
            el.textContent = i18n[currentLang][key];
        }
    });
}

function renderPlaylists() {
    const container = document.getElementById('playlistsList');
    if (!container) return;
    
    container.innerHTML = '';

    if (typeof musicData === 'undefined') {
        container.innerHTML = `
            <div style="text-align:center; padding: 50px; color: #ff4444;">
                <h3>Ошибка загрузки данных</h3>
                <p>Убедись, что подключен jsDelivr скрипт в HTML, и страница открыта через локальный сервер (127.0.0.1).</p>
            </div>
        `;
        return;
    }

    playlistsData.forEach(pl => {
        const t = i18n[currentLang].items[pl.id];
        
        const playlistTracks = musicData.filter(track => track.playlist === pl.id);
        
        const row = document.createElement('div');
        row.className = 'playlist-row glass-panel';
        
        const dynamicPoster = (typeof playlistsMeta !== 'undefined' && playlistsMeta[pl.id]) 
            ? playlistsMeta[pl.id].poster 
            : null;

        const imageContent = dynamicPoster 
            ? `<img src="${dynamicPoster}" alt="Poster" class="loaded">`
            : `<i class='bx bx-disc'></i>`;

        let tracksHTML = '';
        if (playlistTracks.length > 0) {
            playlistTracks.forEach((track) => {
                const searchQuery = encodeURIComponent(`${track.artist} ${track.title}`);
                const ytMusicLink = `https://music.youtube.com/search?q=${searchQuery}`;

                tracksHTML += `
                    <a href="${ytMusicLink}" target="_blank" class="track-item" title="Слушать в YouTube Music">
                        <div class="track-play"><i class='bx bx-play'></i></div>
                        <div class="track-info">
                            <span class="track-name">${track.title}</span>
                            <span class="track-artist">${track.artist}</span>
                        </div>
                        <div class="track-duration">${track.duration}</div>
                    </a>
                `;
            });
        } else {
            tracksHTML = `<div style="padding: 20px; color: var(--text-secondary); text-align: center;">Треки отсутствуют</div>`;
        }

        row.innerHTML = `
            <div class="playlist-left">
                <div class="img-placeholder">${imageContent}</div>
                <h3 class="playlist-title">${t.title}</h3>
                <p class="playlist-desc">${t.desc}</p>
                <a href="${pl.link}" target="_blank" class="listen-btn">
                    <i class='bx bxl-youtube'></i> ${i18n[currentLang].btnListen}
                </a>
            </div>
            
            <div class="playlist-right">
                <div class="tracks-header">
                    <span style="width: 40px;">#</span>
                    <span style="flex: 1;">Трек / Автор</span>
                    <span>Время</span>
                </div>
                <div class="track-list-container">
                    ${tracksHTML}
                </div>
            </div>
        `;
        
        container.appendChild(row);
    });
}