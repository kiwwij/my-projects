const PLACEHOLDER_IMG = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect width='200' height='300' fill='%231e1e1e'/%3E%3C/svg%3E";

const EMOJIS = "😀 😃 😄 😁 😆 😅 😂 🤣 🥲 ☺️ 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎 🥸 🤩 🥳 😏 😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🤫 🤥 😶 😐 😑 😬 🙄 😯 😦 😧 😮 😲 🥱 😴 🤤 😪 😵 🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕 🤑 🤠 😈 👿 👹 👺 🤡 💩 👻 💀 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 🙈 🙉 🙊 💋 💌 💘 💝 💖 💗 💓 💞 💕 💟 ❣️ 💔 ❤️ 🧡 💛 💚 💙 💜 🤎 🖤 🤍 💯 💢 💥 💫 💦 💨 🕳️ 💣 💬 👁️‍🗨️ 🗨️ 🗯️ 💭 💤 👋 🤚 🖐️ ✋ 🖖 👌 🤌 ✌️ 🤞 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝️ 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 👐 🤲 🤝 🙏 ✍️ 💅 🤳 💪 🦾 🦿 🦵 🦶 👂 🦻 👃 🫀 🫁 🧠 🦷 🦴 👀 👁️ 👅 👄 🍎 🍏 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🍈 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🍆 🥑 🥦 🥬 🥒 🌶️ 🫑 🌽 🥕 🧄 🧅 🥔 🍠 🥐 🥯 🍞 🥖 🥨 🧀 🥚 🍳 🧈 🥞 🧇 🥓 🥩 🍗 🍖 🌭 🍔 🍟 🍕 🫓 🥪 🥙 🧆 🌮 🌯 🥗 🥘 🫕 🥫 🍝 🍜 🍲 🍛 🍣 🍱 🥟 🦪 🍤 🍙 🍚 🍘 🍥 🥠 🥮 🍢 🍡 🍧 🍨 🍦 🥧 🧁 🍰 🎂 🍮 🍭 🍬 🍫 🍿 🍩 🍪 🌰 🥜 🍯 🥛 🍼 🫖 ☕ 🍵 🧃 🥤 🧋 🍶 🍺 🍻 🥂 🍷 🥃 🍸 🍹 🧉 🍾 🧊 🥄 🍴 🍽️ 🥣 🥡 🥢 🧂 ⚽ 🏀 🏈 ⚾ 🥎 🎾 🏐 🏉 🥏 🎱 🪀 🏓 🏸 🏒 🏑 🥍 🏏 🪃 🥅 ⛳ 🪁 🏹 🎣 🤿 🥊 🥋 🎽 🛹 🛼 🛷 ⛸️ 🥌 🎿 ⛷️ 🏂 🪂 🏋️ 🤼 🤸 ⛹️ 🤺 🤾 🏌️ 🏇 🧘 🏄 🏊 🤽 🚣 🧗 🚵 🚴 🏆 🥇 🥈 🥉 🏅 🎖️ 🏵️ 🎗️ 🎫 🎟️ 🎪 🤹 🎭 🩰 🎨 🎬 🎤 🎧 🎼 🎹 🥁 🪘 🎷 🎺 🪗 🎸 🪕 🎻 🎲 ♟️ 🎯 🎳 🎮 🎰 🧩".split(" ");

const i18n = {
    ru: {
        title: "Аниме Хаб", tierList: "Тирлист", lists: "Списки", saveFile: "Сохранить", loadFile: "Загрузить", share: "Поделиться", searchPlaceholder: "Найти аниме...",
        socialsTitle: "Соцсети автора", save: "Сохранить", viewMode: "Режим просмотра. Автор: ", remove: "Удалить отовсюду", resetTiers: "Сбросить названия", create: "Создать",
        selectTier: "Выберите 1 Тир:", selectLists: "Добавить в списки (можно несколько):", listName: "Название списка...", authorName: "Ваше имя...",
        phYT: "Ник YouTube", phTW: "Ник Twitch", phTT: "Ник TikTok", phIG: "Ник Instagram", phTG: "Ник / Канал Telegram", phSteam: "Steam Custom ID",
        defWatched: "Просмотрено", defDropped: "Дропнуто", defFavorites: "Любимые", filterAll: "Все форматы", filterTV: "ТВ Сериал", filterMovie: "Фильм", filterOVA: "OVA",
        hintAuthor: "Имя будет видно друзьям по ссылке", hintShare: "Создать постоянную ссылку", hintListName: "Название для нового списка", hintEmoji: "Выбрать эмодзи", hintColor: "Цвет шапки",
        hintYT: "Ваш YouTube", hintTW: "Ваш Twitch", hintTT: "Ваш TikTok", hintIG: "Ваш Instagram", hintTG: "Ваш Telegram", hintSteam: "Ваш Steam",
        msgSaved: "Сохранено успешно!", msgLinkCopied: "Ссылка скопирована!", msgListCreated: "Список создан", msgListDeleted: "Список удален", msgRemoved: "Удалено отовсюду", msgEnterName: "Введите название!",
        msgErrorLoad: "Ошибка загрузки", msgReset: "Названия сброшены", msgConfirmDelete: "Удалить этот список?", undo: "ВЕРНУТЬ", ratingLabel: "Оценка (0-10):", msgNeedRating: "Сначала поставьте оценку!"
    },
    uk: {
        title: "Аніме Хаб", tierList: "Тірліст", lists: "Списки", saveFile: "Зберегти", loadFile: "Завантажити", share: "Поділитися", searchPlaceholder: "Знайти аніме...",
        socialsTitle: "Соцмережі автора", save: "Зберегти", viewMode: "Режим перегляду. Автор: ", remove: "Видалити звідусіль", resetTiers: "Скинути назви", create: "Створити",
        selectTier: "Оберіть 1 Тір:", selectLists: "Додати до списків (можна декілька):", listName: "Назва списку...", authorName: "Ваше ім'я...",
        phYT: "Нік YouTube", phTW: "Нік Twitch", phTT: "Нік TikTok", phIG: "Нік Instagram", phTG: "Нік / Канал Telegram", phSteam: "Steam Custom ID",
        defWatched: "Переглянуто", defDropped: "Кинуто", defFavorites: "Улюблені", filterAll: "Всі формати", filterTV: "ТБ Серіал", filterMovie: "Фільм", filterOVA: "OVA",
        hintAuthor: "Ім'я буде видно друзям", hintShare: "Створити постійне посилання", hintListName: "Назва нового списку", hintEmoji: "Обрати емодзі", hintColor: "Колір шапки",
        hintYT: "Ваш YouTube", hintTW: "Ваш Twitch", hintTT: "Ваш TikTok", hintIG: "Ваш Instagram", hintTG: "Ваш Telegram", hintSteam: "Ваш Steam",
        msgSaved: "Збережено!", msgLinkCopied: "Посилання скопійовано!", msgListCreated: "Список створено", msgListDeleted: "Список видалено", msgRemoved: "Видалено звідусіль", msgEnterName: "Введіть назву!",
        msgErrorLoad: "Помилка завантаження", msgReset: "Назви скинуто", msgConfirmDelete: "Видалити цей список?", undo: "ПОВЕРНУТИ", ratingLabel: "Оцінка (0-10):", msgNeedRating: "Спочатку поставте оцінку!"
    },
    en: {
        title: "Anime Hub", tierList: "Tier List", lists: "Lists", saveFile: "Save File", loadFile: "Load", share: "Share", searchPlaceholder: "Search anime...",
        socialsTitle: "Creator's Socials", save: "Save", viewMode: "View-only mode. Author: ", remove: "Remove entirely", resetTiers: "Reset Labels", create: "Create",
        selectTier: "Select 1 Tier:", selectLists: "Add to Lists (multiple):", listName: "List name...", authorName: "Your Name...",
        phYT: "YouTube Handle", phTW: "Twitch Username", phTT: "TikTok Username", phIG: "Instagram Username", phTG: "Telegram Username", phSteam: "Steam Custom ID",
        defWatched: "Watched", defDropped: "Dropped", defFavorites: "Favorites", filterAll: "All Formats", filterTV: "TV Series", filterMovie: "Movie", filterOVA: "OVA",
        hintAuthor: "Name visible to friends", hintShare: "Generate a permanent link", hintListName: "Name for your new list", hintEmoji: "Pick an emoji", hintColor: "Header color",
        hintYT: "Your YouTube", hintTW: "Your Twitch", hintTT: "Your TikTok", hintIG: "Your Instagram", hintTG: "Your Telegram", hintSteam: "Your Steam",
        msgSaved: "Saved successfully!", msgLinkCopied: "Link copied!", msgListCreated: "List created", msgListDeleted: "List deleted", msgRemoved: "Removed entirely", msgEnterName: "Enter a name!",
        msgErrorLoad: "Error loading", msgReset: "Labels reset", msgConfirmDelete: "Delete this list?", undo: "UNDO", ratingLabel: "Rating (0-10):", msgNeedRating: "Please set a rating first!"
    }
};

const DEFAULT_TIERS = ['S', 'A', 'B', 'C', 'D', 'E', 'F'];
const DEFAULT_LISTS = [
    { id: 'watched', nameKey: 'defWatched', emoji: '✅', color: '#10b981', isFolded: false },
    { id: 'dropped', nameKey: 'defDropped', emoji: '🗑️', color: '#ef4444', isFolded: false },
    { id: 'favorites', nameKey: 'defFavorites', emoji: '⭐', color: '#f59e0b', isFolded: false }
];

let state = {
    author: "", shareDate: "", data: {}, tiers: {}, lists: {}, ratings: {},
    tierLabels: { S: 'S', A: 'A', B: 'B', C: 'C', D: 'D', E: 'E', F: 'F' }, customLists: [...DEFAULT_LISTS], socials: { yt: "", tw: "", tt: "", ig: "", tg: "", steam: "" }
};

let isReadOnly = false;
let currentLang = localStorage.getItem('lang') || 'en';

document.addEventListener('DOMContentLoaded', () => {
    initTheme(); initLang(); checkURLForSharedData();
    setupSwitchers(); setupEmojis(); setupEventListeners();
    renderAll();
});

function showToast(messageKey, actionText = null, actionCallback = null) {
    const msg = i18n[currentLang][messageKey] || messageKey;
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div'); toast.className = 'toast'; 
    
    const textSpan = document.createElement('span'); textSpan.textContent = msg;
    toast.appendChild(textSpan);

    if (actionText && actionCallback) {
        const btn = document.createElement('button'); btn.className = 'btn btn-small'; btn.textContent = actionText;
        btn.onclick = () => { actionCallback(); toast.classList.remove('show'); };
        toast.appendChild(btn);
        container.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 10000);
    } else {
        container.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3000);
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.getElementById('theme-toggle').addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next); localStorage.setItem('theme', next);
    });
}

function initLang() {
    document.getElementById('lang-toggle').value = currentLang; applyTranslations();
    document.getElementById('lang-toggle').addEventListener('change', (e) => {
        currentLang = e.target.value; localStorage.setItem('lang', currentLang);
        applyTranslations(); renderAll();
    });
}

function applyTranslations() {
    const dict = i18n[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        if (el.getAttribute('data-i18n') === 'viewMode') el.textContent = dict['viewMode'];
        else el.textContent = dict[el.getAttribute('data-i18n')];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => el.setAttribute('placeholder', dict[el.getAttribute('data-i18n-placeholder')]));
    document.querySelectorAll('[data-i18n-title]').forEach(el => el.setAttribute('title', dict[el.getAttribute('data-i18n-title')]));
}

function saveState() {
    if (isReadOnly) return;
    state.author = document.getElementById('author-name').value.trim();

    const activeIds = new Set([
        ...Object.keys(state.tiers),
        ...Object.values(state.lists).flat()
    ]);

    const cleanData = {};
    activeIds.forEach(id => {
        if (state.data[id]) {
            cleanData[id] = {
                id: state.data[id].id,
                title: state.data[id].title,
                image: state.data[id].image
            };
        }
    });
    
    state.data = cleanData;

    try {
        localStorage.setItem('animeHubStateStrictV2', JSON.stringify(state));
    } catch (e) {
        console.error("Ошибка сохранения: превышен лимит localStorage", e);
        showToast('msgErrorLoad');
    }
}

function loadState() {
    const saved = localStorage.getItem('animeHubStateStrictV2');
    if (saved) {
        let parsed = JSON.parse(saved);
        if(!parsed.lists) parsed.lists = {}; if(!parsed.tiers) parsed.tiers = {}; if(!parsed.ratings) parsed.ratings = {};
        state = { ...state, ...parsed };
    }
    document.getElementById('author-name').value = state.author || "";
}

function checkURLForSharedData() {
    const params = new URLSearchParams(window.location.search);
    const sharedData = params.get('s') || params.get('share');

    if (sharedData) {
        try {
            let decodedStr = sharedData.startsWith('JTd') ? 
                decodeURIComponent(atob(sharedData)) : 
                LZString.decompressFromEncodedURIComponent(sharedData);

            let parsed = JSON.parse(decodedStr);

            if (params.has('s')) {
                const fullData = {};
                for (const [id, arr] of Object.entries(parsed.d || {})) {
                    let imgUrl = arr[1];
                    if (imgUrl.startsWith('/system/') || imgUrl.startsWith('/assets/')) imgUrl = 'https://shikimori.one' + imgUrl;
                    else if (imgUrl.match(/^[0-9]+/)) imgUrl = 'https://media.kitsu.io/anime/poster_images/' + imgUrl;
                    
                    fullData[id] = { id: id, title: arr[0], image: imgUrl };
                }
                
                state = {
                    author: parsed.a || "", shareDate: parsed.shareDate || "",
                    tiers: parsed.t || {}, lists: parsed.l || {}, ratings: parsed.r || {}, data: fullData,
                    customLists: (parsed.c || []).map(cl => ({ id: cl[0], name: cl[1], emoji: cl[2], color: cl[3], isFolded: false })),
                    tierLabels: { S: 'S', A: 'A', B: 'B', C: 'C', D: 'D', E: 'E', F: 'F' },
                    socials: state.socials
                };
            } else {
                state = parsed;
            }

            isReadOnly = true;
            document.getElementById('readonly-banner').classList.remove('hidden');
            document.getElementById('readonly-author').textContent = state.author || "Anonymous";
            
            ['file-controls', 'search-section', 'socials-edit', 'list-creation-tools', 'reset-tiers', 'author-name'].forEach(id => document.getElementById(id).classList.add('hidden'));
            document.getElementById('modal-rating-input').disabled = true;
            document.getElementById('socials-display').classList.remove('hidden');
        } catch (e) { 
            console.error("Ошибка расшифровки ссылки", e);
            loadState(); 
        }
    } else { 
        loadState(); 
    }
}

function setupSwitchers() {
    document.querySelectorAll('.switcher').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.switcher').forEach(b => b.classList.remove('active')); e.currentTarget.classList.add('active');
            document.querySelectorAll('.view-section').forEach(s => s.classList.add('hidden'));
            document.getElementById(e.currentTarget.getAttribute('data-view')).classList.remove('hidden');
        });
    });
}

function setupEmojis() {
    const input = document.getElementById('new-list-emoji'); const popup = document.getElementById('emoji-popup');
    EMOJIS.forEach(em => { const span = document.createElement('span'); span.className = 'emoji-item'; span.textContent = em; span.onclick = () => { input.value = em; popup.classList.add('hidden'); }; popup.appendChild(span); });
    input.addEventListener('click', (e) => { e.stopPropagation(); popup.classList.toggle('hidden'); });
    document.addEventListener('click', () => popup.classList.add('hidden')); popup.addEventListener('click', (e) => e.stopPropagation());
}

const searchInput = document.getElementById('search-input'); const clearSearchBtn = document.getElementById('clear-search'); const searchType = document.getElementById('search-type'); let searchTimeout;
searchInput.addEventListener('input', (e) => { const query = e.target.value.trim(); clearSearchBtn.classList.toggle('hidden', query.length === 0); clearTimeout(searchTimeout); if (query.length < 3) { document.getElementById('search-results').innerHTML = ''; return; } searchTimeout = setTimeout(() => searchAnime(query), 500); });
searchType.addEventListener('change', () => { if (searchInput.value.trim().length >= 3) searchAnime(searchInput.value.trim()); });
clearSearchBtn.addEventListener('click', () => { searchInput.value = ''; clearSearchBtn.classList.add('hidden'); document.getElementById('search-results').innerHTML = ''; });

async function searchAnime(query) {
    const type = searchType.value;
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    try {
        let url = `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(query)}&page[limit]=20&sort=startDate`;
        if (type !== 'all') url += `&filter[subtype]=${type}`;
        
        const res = await fetch(url);
        if (!res.ok) throw new Error('Kitsu network error');
        
        const json = await res.json();
        
        if (!json.data || json.data.length === 0) {
            throw new Error('Kitsu returned empty array');
        }
        
        json.data.forEach(item => {
            const attr = item.attributes;
            resultsContainer.appendChild(createAnimeCard({
                id: 'k_' + item.id,
                title: attr.canonicalTitle,
                image: attr.posterImage ? attr.posterImage.small : PLACEHOLDER_IMG,
                type: attr.subtype,
                year: attr.startDate ? attr.startDate.substring(0,4) : '?',
                eps: attr.episodeCount || '?',
                status: attr.status
            }));
        });

    } catch(err) {
        try {
            const shikiUrl = `https://shikimori.one/api/animes?search=${encodeURIComponent(query)}&limit=20`;
            const res = await fetch(shikiUrl);
            if (!res.ok) throw new Error('Shikimori network error');
            
            const json = await res.json();
            
            if (!json || json.length === 0) {
                resultsContainer.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 20px;">Ничего не найдено</div>';
                return;
            }
            
            json.forEach(item => {
                resultsContainer.appendChild(createAnimeCard({
                    id: 's_' + item.id,
                    title: item.name,
                    image: `https://shikimori.one${item.image.original}`,
                    type: item.kind,
                    year: item.aired_on ? item.aired_on.substring(0,4) : '?',
                    eps: item.episodes || '?',
                    status: item.status
                }));
            });
            
        } catch(shikiErr) {
            resultsContainer.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--danger); padding: 20px;">Ошибка загрузки данных с серверов</div>';
        }
    }
}

function renderSearchResults(dataArray) {
    const resultsContainer = document.getElementById('search-results');
    dataArray.forEach(anime => {
        resultsContainer.appendChild(createAnimeCard(anime));
    });
}

let draggedAnimeId = null;
function handleDragStart(e, anime) { if (isReadOnly) return e.preventDefault(); draggedAnimeId = anime.id; state.data[anime.id] = anime; e.dataTransfer.effectAllowed = 'copyMove'; }
function handleDragOver(e) { e.preventDefault(); e.currentTarget.classList.add('drag-over'); }
function handleDragLeave(e) { e.currentTarget.classList.remove('drag-over'); }
function handleDropTier(e, tierId) {
    e.preventDefault(); e.currentTarget.classList.remove('drag-over');
    if (draggedAnimeId && !isReadOnly) {
        if (state.ratings[draggedAnimeId] === undefined || state.ratings[draggedAnimeId] === "") { showToast('msgNeedRating'); return; }
        state.tiers[draggedAnimeId] = tierId; saveState(); renderAll();
    }
}
function handleDropList(e, listId) {
    e.preventDefault(); e.currentTarget.classList.remove('drag-over');
    if (draggedAnimeId && !isReadOnly) {
        if (!state.lists[draggedAnimeId]) state.lists[draggedAnimeId] = [];
        if (!state.lists[draggedAnimeId].includes(listId)) state.lists[draggedAnimeId].push(listId);
        saveState(); renderAll();
    }
}

function createAnimeCard(anime) {
    const div = document.createElement('div'); div.className = 'anime-card'; div.setAttribute('draggable', !isReadOnly);
    let ratingHTML = '';
    if (state.ratings && state.ratings[anime.id] !== undefined) {
        ratingHTML = `<div class="anime-rating-badge"><i class='bx bxs-star'></i> ${state.ratings[anime.id]}</div>`;
    }
    div.innerHTML = `<div class="anime-img-wrap">${ratingHTML}<img src="${PLACEHOLDER_IMG}" data-src="${anime.image}" alt="poster" onload="this.onload=null; this.src=this.getAttribute('data-src')"></div><div class="anime-info"><div class="anime-title" title="${anime.title}">${anime.title}</div></div>`;
    if (!isReadOnly) div.addEventListener('dragstart', (e) => handleDragStart(e, anime));
    div.addEventListener('click', () => openActionModal(anime)); return div;
}

function renderAll() {
    renderTiers(); renderLists(); renderSocials();
    for (const [id, tierId] of Object.entries(state.tiers)) { if (state.data[id]) { const c = document.getElementById(`loc-tier-${tierId}`); if (c) c.appendChild(createAnimeCard(state.data[id])); } }
    for (const [id, listArray] of Object.entries(state.lists)) { if (state.data[id]) listArray.forEach(listId => { const c = document.getElementById(`loc-list-${listId}`); if (c) c.appendChild(createAnimeCard(state.data[id])); }); }
}

function renderTiers() {
    const container = document.getElementById('tiers-container'); container.innerHTML = '';
    DEFAULT_TIERS.forEach(tier => {
        const row = document.createElement('div'); row.className = 'tier-row';
        const label = document.createElement('div'); label.className = `tier-label tier-${tier.toLowerCase()}-bg`; label.textContent = state.tierLabels[tier] || tier;
        if (!isReadOnly) {
            label.setAttribute('contenteditable', 'true'); label.addEventListener('blur', (e) => { state.tierLabels[tier] = e.target.textContent.trim() || tier; saveState(); });
            row.addEventListener('dragover', handleDragOver); row.addEventListener('dragleave', handleDragLeave); row.addEventListener('drop', (e) => handleDropTier(e, tier));
        }
        const items = document.createElement('div'); items.className = 'tier-items'; items.id = `loc-tier-${tier}`;
        row.appendChild(label); row.appendChild(items); container.appendChild(row);
    });
}

function getListName(list) { return (list.nameKey && i18n[currentLang][list.nameKey]) ? i18n[currentLang][list.nameKey] : list.name; }
function moveList(index, direction) {
    if (index + direction < 0 || index + direction >= state.customLists.length) return;
    const temp = state.customLists[index]; state.customLists[index] = state.customLists[index + direction]; state.customLists[index + direction] = temp; saveState(); renderAll();
}

function renderLists() {
    const container = document.getElementById('custom-lists-container'); container.innerHTML = '';
    state.customLists.forEach((list, index) => {
        const div = document.createElement('div'); div.className = 'custom-list'; if (list.isFolded) div.classList.add('collapsed');
        const header = document.createElement('div'); header.className = 'custom-list-header'; header.style.backgroundColor = list.color;
        
        const nameCont = document.createElement('div'); nameCont.innerHTML = `<span>${list.emoji} </span>`;
        const nameSpan = document.createElement('span'); nameSpan.textContent = getListName(list);
        if (!isReadOnly) {
            nameSpan.setAttribute('contenteditable', 'true'); nameSpan.className = 'editable-list-name';
            nameSpan.addEventListener('blur', (e) => { const newName = e.target.textContent.trim(); if (newName) { list.name = newName; if (list.nameKey) delete list.nameKey; } saveState(); });
        }
        nameCont.appendChild(nameSpan); header.appendChild(nameCont);
        const actions = document.createElement('div'); actions.className = 'custom-list-actions';
        
        const foldBtn = document.createElement('button'); foldBtn.className = 'btn-icon'; foldBtn.innerHTML = list.isFolded ? "<i class='bx bx-show'></i>" : "<i class='bx bx-hide'></i>";
        foldBtn.onclick = () => { list.isFolded = !list.isFolded; saveState(); renderAll(); }; actions.appendChild(foldBtn);

        if (!isReadOnly) {
            if (index > 0) { const upBtn = document.createElement('button'); upBtn.className = 'btn-icon'; upBtn.innerHTML = "<i class='bx bx-up-arrow-alt'></i>"; upBtn.onclick = () => moveList(index, -1); actions.appendChild(upBtn); }
            if (index < state.customLists.length - 1) { const downBtn = document.createElement('button'); downBtn.className = 'btn-icon'; downBtn.innerHTML = "<i class='bx bx-down-arrow-alt'></i>"; downBtn.onclick = () => moveList(index, 1); actions.appendChild(downBtn); }
            
            const delBtn = document.createElement('button'); delBtn.className = 'btn-icon'; delBtn.innerHTML = "<i class='bx bx-trash'></i>";
            delBtn.onclick = () => {
                if (!confirm(i18n[currentLang].msgConfirmDelete || "Delete?")) return;
                
                const listBackup = { ...list };
                const linksBackup = {};
                for (let k in state.lists) {
                    if (state.lists[k].includes(list.id)) {
                        linksBackup[k] = true;
                        state.lists[k] = state.lists[k].filter(id => id !== list.id);
                        if (state.lists[k].length === 0) delete state.lists[k];
                    }
                }
                state.customLists = state.customLists.filter(l => l.id !== list.id);
                saveState(); renderAll();
                
                showToast('msgListDeleted', i18n[currentLang].undo || "UNDO", () => {
                    state.customLists.splice(index, 0, listBackup);
                    for (let k in linksBackup) {
                        if (!state.lists[k]) state.lists[k] = [];
                        state.lists[k].push(list.id);
                    }
                    saveState(); renderAll();
                });
            };
            actions.appendChild(delBtn);
            div.addEventListener('dragover', handleDragOver); div.addEventListener('dragleave', handleDragLeave); div.addEventListener('drop', (e) => handleDropList(e, list.id));
        }

        header.appendChild(actions); const items = document.createElement('div'); items.className = 'list-items'; items.id = `loc-list-${list.id}`;
        div.appendChild(header); div.appendChild(items); container.appendChild(div);
    });
}

function renderSocials() {
    const pre = { yt: 'https://youtube.com/@', tw: 'https://twitch.tv/', tt: 'https://tiktok.com/@', ig: 'https://instagram.com/', tg: 'https://t.me/', steam: 'https://steamcommunity.com/id/' };
    const ico = { yt: 'bx bxl-youtube', tw: 'bx bxl-twitch', tt: 'bx bxl-tiktok', ig: 'bx bxl-instagram', tg: 'bx bxl-telegram', steam: 'bx bxl-steam' };
    if (isReadOnly) {
        const cont = document.getElementById('socials-display'); cont.innerHTML = '';
        for (const [key, val] of Object.entries(state.socials)) {
            if (val) {
                const a = document.createElement('a'); a.className = 'social-link'; a.href = pre[key] + encodeURIComponent(val.replace(/[^a-zA-Z0-9_]/g, ''));
                a.target = "_blank"; a.innerHTML = `<i class='${ico[key]}'></i> ${val}`; cont.appendChild(a);
            }
        }
    } else { Object.keys(state.socials).forEach(k => { const el = document.getElementById(`soc-${k}`); if (el) el.value = state.socials[k] || ""; }); }
}

function setupEventListeners() {
    document.getElementById('save-socials').addEventListener('click', () => {
        const clean = (val) => val.replace(/@/g, '').replace(/[^a-zA-Z0-9_]/g, '').trim();
        Object.keys(state.socials).forEach(k => { state.socials[k] = clean(document.getElementById(`soc-${k}`).value); }); saveState(); showToast('msgSaved');
    });

    document.getElementById('btn-create-list').addEventListener('click', () => {
        const name = document.getElementById('new-list-name').value.trim(); const emoji = document.getElementById('new-list-emoji').value.trim() || '📁'; const color = document.getElementById('new-list-color').value;
        if (!name) return showToast('msgEnterName');
        state.customLists.push({ id: 'list_' + Date.now(), name, emoji, color, isFolded: false }); document.getElementById('new-list-name').value = '';
        saveState(); renderAll(); showToast('msgListCreated');
    });

    document.getElementById('reset-tiers').addEventListener('click', () => { state.tierLabels = { S: 'S', A: 'A', B: 'B', C: 'C', D: 'D', E: 'E', F: 'F' }; saveState(); renderAll(); showToast('msgReset'); });

    document.getElementById('btn-export').addEventListener('click', () => {
        saveState(); const blob = new Blob([JSON.stringify(state)], {type: "application/json"}); const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = "anime_hub_backup.json"; document.body.appendChild(a); a.click(); document.body.removeChild(a); showToast('msgSaved');
    });
    
    document.getElementById('file-import').addEventListener('change', (e) => {
        const file = e.target.files[0]; if (!file) return; const reader = new FileReader();
        reader.onload = (ev) => { try { let parsed = JSON.parse(ev.target.result); if(!parsed.lists) parsed.lists = {}; if(!parsed.tiers) parsed.tiers = {}; if(!parsed.ratings) parsed.ratings = {}; state = parsed; saveState(); renderAll(); showToast('msgSaved'); } catch(err) { showToast('msgErrorLoad'); } }; reader.readAsText(file);
    });

    document.getElementById('btn-share').addEventListener('click', () => {
        state.shareDate = new Date().toLocaleDateString();

        const activeIds = new Set([...Object.keys(state.tiers), ...Object.values(state.lists).flat()]);
        const minimalData = {};

        activeIds.forEach(id => {
            if (state.data[id]) {
                let img = state.data[id].image.replace('https://shikimori.one', '').replace('https://media.kitsu.io/anime/poster_images/', '');
                minimalData[id] = [state.data[id].title, img]; 
            }
        });

        const microState = {
            a: state.author,
            t: state.tiers,
            l: state.lists,
            r: state.ratings,
            d: minimalData,
            c: state.customLists.map(cl => [cl.id, cl.name, cl.emoji, cl.color])
        };

        const compressedStr = LZString.compressToEncodedURIComponent(JSON.stringify(microState));
        const url = window.location.origin + window.location.pathname + '?s=' + compressedStr;
        
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(url).then(() => showToast('msgLinkCopied')).catch(() => {
                prompt("Скопируйте ссылку:", url);
            });
        } else {
            prompt("Ваш браузер блокирует авто-копирование. Скопируйте ссылку вручную:", url);
        }
    });

    document.getElementById('author-name').addEventListener('blur', saveState);

    document.getElementById('modal-rating-input').addEventListener('change', (e) => {
        if (isReadOnly) return;
        const val = e.target.value;
        const currentId = document.getElementById('modal-rating-input').getAttribute('data-anime-id');
        if (val === "") { delete state.ratings[currentId]; } 
        else { state.ratings[currentId] = Number(val); }
        saveState(); renderAll();
    });

    const closeModal = () => document.getElementById('action-modal').classList.add('hidden');
    document.getElementById('modal-close').addEventListener('click', closeModal); document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeModal(); });
}

function openActionModal(anime) {
    const modal = document.getElementById('action-modal'); document.getElementById('modal-title').textContent = anime.title;
    document.getElementById('modal-details').innerHTML = `<img src="${anime.image}" alt="poster"><div class="modal-info-text"><span><strong>Type:</strong> ${anime.type ? anime.type.toUpperCase() : '?'}</span><span><strong>Year:</strong> ${anime.year}</span><span><strong>Eps:</strong> ${anime.eps}</span><span><strong>Status:</strong> ${anime.status || '?'}</span></div>`;
    
    const ratingInput = document.getElementById('modal-rating-input');
    ratingInput.setAttribute('data-anime-id', anime.id);
    ratingInput.value = (state.ratings && state.ratings[anime.id] !== undefined) ? state.ratings[anime.id] : "";

    const actionsCont = document.getElementById('modal-actions-container');
    if (isReadOnly) { actionsCont.classList.add('hidden'); modal.classList.remove('hidden'); return; }
    actionsCont.classList.remove('hidden');
    
    const tiersCont = document.getElementById('modal-tiers-actions'); const listsCont = document.getElementById('modal-lists-actions');
    tiersCont.innerHTML = ''; listsCont.innerHTML = ''; state.data[anime.id] = anime;

    DEFAULT_TIERS.forEach(t => {
        const btn = document.createElement('button'); btn.className = 'btn'; if (state.tiers[anime.id] === t) btn.classList.add('active-tier');
        btn.innerHTML = state.tierLabels[t] || t;
        btn.onclick = () => { 
            if (state.tiers[anime.id] === t) {
                delete state.tiers[anime.id]; 
            } else {
                if (state.ratings[anime.id] === undefined || state.ratings[anime.id] === "") { showToast('msgNeedRating'); return; }
                state.tiers[anime.id] = t; 
            }
            saveState(); renderAll(); openActionModal(anime); 
        };
        tiersCont.appendChild(btn);
    });

    state.customLists.forEach(l => {
        const btn = document.createElement('button'); btn.className = 'btn'; const inList = state.lists[anime.id] && state.lists[anime.id].includes(l.id);
        if (inList) btn.classList.add('active-list'); btn.innerHTML = `${l.emoji} ${getListName(l)}`;
        btn.onclick = () => {
            if (!state.lists[anime.id]) state.lists[anime.id] = [];
            if (inList) { state.lists[anime.id] = state.lists[anime.id].filter(id => id !== l.id); if (state.lists[anime.id].length === 0) delete state.lists[anime.id]; }
            else state.lists[anime.id].push(l.id);
            saveState(); renderAll(); openActionModal(anime);
        }; listsCont.appendChild(btn);
    });

    if (state.tiers[anime.id] || state.lists[anime.id]) {
        const rmvBtn = document.createElement('button'); rmvBtn.className = 'btn'; rmvBtn.style.color = 'var(--danger)'; rmvBtn.style.gridColumn = '1 / -1'; rmvBtn.style.marginTop = '10px';
        rmvBtn.innerHTML = `<i class='bx bx-trash'></i> ${i18n[currentLang].remove}`;
        rmvBtn.onclick = () => { delete state.tiers[anime.id]; delete state.lists[anime.id]; saveState(); renderAll(); modal.classList.add('hidden'); showToast('msgRemoved'); };
        listsCont.appendChild(rmvBtn);
    }
    modal.classList.remove('hidden');
}