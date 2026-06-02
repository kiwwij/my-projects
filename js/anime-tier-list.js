document.addEventListener('DOMContentLoaded', () => {
    const rootEl = document.documentElement;
    const themeBtn = document.getElementById('theme-btn');
    const layoutBtn = document.getElementById('layout-btn');
    const mainContainer = document.getElementById('main-container');
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedLayout = localStorage.getItem('layout') || 'default';
    
    rootEl.setAttribute('data-theme', savedTheme);
    themeBtn.querySelector('i').className = savedTheme === 'dark' ? 'bx bxs-sun' : 'bx bxs-moon';

    if (savedLayout === 'split') {
        mainContainer.classList.add('split-view');
        layoutBtn.querySelector('i').className = 'bx bx-list-ul';
    }

    themeBtn.addEventListener('click', () => {
        const isDark = rootEl.getAttribute('data-theme') === 'dark';
        rootEl.setAttribute('data-theme', isDark ? 'light' : 'dark');
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
        themeBtn.querySelector('i').className = isDark ? 'bx bxs-sun' : 'bx bxs-moon';
    });

    layoutBtn.addEventListener('click', () => {
        mainContainer.classList.toggle('split-view');
        const isSplit = mainContainer.classList.contains('split-view');
        localStorage.setItem('layout', isSplit ? 'split' : 'default');
        layoutBtn.querySelector('i').className = isSplit ? 'bx bx-list-ul' : 'bx bx-dock-left';
    });

    const searchInput = document.getElementById('search-input');
    const clearBtn = document.getElementById('clear-search');
    const resultsArea = document.getElementById('results-area');
    const animeCache = new Map();
    let searchTimer;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        clearBtn.style.display = query ? 'block' : 'none';
        
        clearTimeout(searchTimer);
        if (query.length < 3) {
            resultsArea.innerHTML = '';
            return;
        }
        searchTimer = setTimeout(() => searchAnime(query), 500);
    });

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        resultsArea.innerHTML = '';
        clearBtn.style.display = 'none';
        searchInput.focus();
    });

    async function searchAnime(query) {
        try {
            const res = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(query)}&page[limit]=15`);
            const { data } = await res.json();
            
            data.forEach(anime => animeCache.set(anime.id, anime.attributes));
            renderCards(data);
        } catch (err) {
            console.error('Ошибка загрузки:', err);
        }
    }

    function renderCards(animes) {
        resultsArea.innerHTML = '';
        animes.forEach(anime => {
            if (!document.querySelector(`.anime-card[data-id="${anime.id}"]`)) {
                resultsArea.appendChild(createCard(anime));
            }
        });
    }

    function createCard(data, isFromFile = false) {
        const card = document.createElement('div');
        card.className = 'anime-card';
        card.draggable = true;
        
        const attr = isFromFile ? null : data.attributes;
        const id = data.id;
        const titles = attr?.titles || {};
        const title = isFromFile ? data.title : (titles.ru || titles.en || attr.canonicalTitle || 'Без названия');
        
        const imgSrc = isFromFile ? data.img : (attr?.posterImage?.small || '');
        const type = isFromFile ? data.typeStr : (attr?.subtype?.toUpperCase() || 'TV');
        const year = isFromFile ? data.yearStr : (attr?.startDate?.split('-')[0] || '???');

        Object.assign(card.dataset, { id, title, img: imgSrc, typeStr: type, yearStr: year });

        card.innerHTML = `
            <img src="${imgSrc}" alt="${title}" loading="lazy">
            <div class="anime-info">
                <span class="info-title">${title}</span>
                <div class="info-meta-row">
                    <span class="info-type">${type}</span>
                    <span class="info-year">${year}</span>
                </div>
            </div>
        `;
        
        card.addEventListener('dragstart', function() { setTimeout(() => this.style.opacity = '0.5', 0); activeCard = this; });
        card.addEventListener('dragend', function() { setTimeout(() => this.style.opacity = '1', 0); activeCard = null; });
        
        let isDragging = false;
        card.addEventListener('mousedown', () => isDragging = false);
        card.addEventListener('mousemove', () => isDragging = true);
        card.addEventListener('click', () => { if (!isDragging) showModal(id, title, imgSrc); });

        return card;
    }

    let activeCard = null;

    document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.addEventListener('dragover', e => { e.preventDefault(); zone.style.background = 'rgba(255,255,255,0.1)'; });
        zone.addEventListener('dragleave', () => zone.style.background = 'transparent');
        zone.addEventListener('drop', e => {
            e.preventDefault();
            zone.style.background = 'transparent';
            if (activeCard) zone.appendChild(activeCard);
        });
    });

    window.addEventListener('dragover', e => {
        if (!activeCard) return;
        const edge = 80, speed = 15;
        if (e.clientY < edge) window.scrollBy(0, -speed);
        else if (window.innerHeight - e.clientY < edge) window.scrollBy(0, speed);
    });

    async function translateText(text) {
        if (!text) return 'Описание отсутствует.';
        try {
            const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ru&dt=t&q=${encodeURIComponent(text)}`);
            const data = await res.json();
            return data[0].map(item => item[0]).join('');
        } catch (e) {
            return text;
        }
    }

    const modal = document.getElementById('anime-modal');
    
    async function showModal(id, fbTitle, fbImg) {
        modal.classList.add('active');
        
        document.getElementById('modal-title').innerText = fbTitle;
        document.getElementById('modal-img').src = fbImg;
        document.getElementById('modal-desc').innerText = 'Переводим описание на русский...';
        
        let attr = animeCache.get(id);
        if (!attr) {
            try {
                const res = await fetch(`https://kitsu.io/api/edge/anime/${id}`);
                const json = await res.json();
                attr = json.data.attributes;
                animeCache.set(id, attr);
            } catch (e) {
                document.getElementById('modal-desc').innerText = 'Не удалось загрузить данные.';
                return;
            }
        }

        const title = attr.titles?.ru || attr.titles?.en || attr.canonicalTitle || fbTitle;
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-type').innerHTML = `<i class='bx bx-tv'></i> ${attr.subtype?.toUpperCase() || 'TV'}`;
        document.getElementById('modal-year').innerHTML = `<i class='bx bx-calendar'></i> ${attr.startDate?.split('-')[0] || '???'}`;
        
        const ratingSpan = document.getElementById('rating-val');
        ratingSpan.innerText = attr.averageRating ? attr.averageRating + '%' : 'N/A';
        
        document.getElementById('modal-episodes').innerHTML = `<i class='bx bx-list-ol'></i> ${attr.episodeCount || '???'} эп.`;
        
        document.getElementById('modal-desc').innerText = await translateText(attr.synopsis);
    }

    document.getElementById('modal-close').onclick = () => modal.classList.remove('active');
    modal.onclick = e => { if (e.target === modal) modal.classList.remove('active'); };

    const tierBoard = document.getElementById('tier-board');
    const btnAddTier = document.getElementById('btn-add-tier');
    const MAX_TIERS = 6;
    const tierColors = ['var(--tier-s)', 'var(--tier-a)', 'var(--tier-b)', 'var(--tier-c)', 'var(--tier-d)', 'var(--tier-f)'];
    const tierLetters = ['S', 'A', 'B', 'C', 'D', 'F'];

    function renderTier(name, color) {
        const row = document.createElement('div');
        row.className = 'tier-line';
        row.innerHTML = `
            <div class="tier-badge" style="background-color: ${color};">
                <button class="delete-tier"><i class='bx bx-x'></i></button>
                <span contenteditable="true" spellcheck="false">${name}</span>
            </div>
            <div class="tier-zone drop-zone"></div>
        `;
        
        row.querySelector('span').addEventListener('keydown', e => {
            if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); }
        });
        
        row.querySelector('.delete-tier').onclick = () => {
            const storage = document.getElementById('storage-area');
            row.querySelectorAll('.anime-card').forEach(card => storage.appendChild(card));
            row.remove();
            checkLimits();
        };

        const zone = row.querySelector('.tier-zone');
        zone.addEventListener('dragover', e => { e.preventDefault(); zone.style.background = 'rgba(255,255,255,0.1)'; });
        zone.addEventListener('dragleave', () => zone.style.background = 'transparent');
        zone.addEventListener('drop', e => {
            e.preventDefault();
            zone.style.background = 'transparent';
            if (activeCard) zone.appendChild(activeCard);
        });

        tierBoard.appendChild(row);
        checkLimits();
    }

    function checkLimits() {
        const count = tierBoard.children.length;
        btnAddTier.disabled = count >= MAX_TIERS;
        btnAddTier.style.opacity = count >= MAX_TIERS ? '0.5' : '1';
    }

    for (let i = 0; i < 4; i++) renderTier(tierLetters[i], tierColors[i]);

    btnAddTier.onclick = () => {
        const count = tierBoard.children.length;
        if (count < MAX_TIERS) renderTier(tierLetters[count], tierColors[count]);
    };

    document.getElementById('btn-save').onclick = () => {
        const data = { tiers: [], storage: [] };
        
        document.querySelectorAll('.tier-line').forEach(row => {
            data.tiers.push({
                name: row.querySelector('span').innerText,
                color: row.querySelector('.tier-badge').style.backgroundColor,
                items: Array.from(row.querySelectorAll('.anime-card')).map(c => Object.assign({}, c.dataset))
            });
        });
        
        data.storage = Array.from(document.getElementById('storage-area').querySelectorAll('.anime-card')).map(c => Object.assign({}, c.dataset));
        
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'tier-list.json';
        a.click();
    };

    document.getElementById('file-upload').onchange = e => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = ev => {
            try {
                const data = JSON.parse(ev.target.result);
                tierBoard.innerHTML = '';
                data.tiers.forEach(t => {
                    renderTier(t.name, t.color);
                    const zone = tierBoard.lastElementChild.querySelector('.tier-zone');
                    t.items.forEach(item => zone.appendChild(createCard(item, true)));
                });
                
                const storage = document.getElementById('storage-area');
                storage.innerHTML = '';
                if (data.storage) data.storage.forEach(item => storage.appendChild(createCard(item, true)));
                
                resultsArea.innerHTML = '';
            } catch (err) { alert('Неверный формат файла!'); }
        };
        reader.readAsText(file);
        e.target.value = '';
    };
});