const kanbanColumns = [
    { id: 'planned', title: "<i class='bx bx-list-ul'></i> В планах", statuses: ['planned'] },
    { id: 'playing', title: "<i class='bx bx-joystick'></i> Играю", statuses: ['playing'] },
    { id: 'completed', title: "<i class='bx bx-check-double'></i> Пройдено", statuses: ['completed'] },
    { id: 'dropped', title: "<i class='bx bx-trash'></i> Заброшено", statuses: ['dropped'] }
];

async function updateSteamAvatar() {
    const avatarContainer = document.getElementById('avatar-container');
    const dataUrl = 'https://kiwwij.github.io/kiwwij-anime-tier-list/data/steam-profile-data.js';
    try {
        const response = await fetch(dataUrl);
        if (response.ok) {
            const scriptContent = await response.text();
            const match = scriptContent.match(/["']avatar["']\s*:\s*["']([^"']+)["']/);
            if (match && match[1]) {
                avatarContainer.innerHTML = `<img src="${match[1]}" alt="Avatar">`;
            }
        }
    } catch (err) {}
}

function handleImageLoad(imgElement) {
    const coverDiv = imgElement.previousElementSibling;
    if (coverDiv && coverDiv.classList.contains('card-cover')) {
        coverDiv.classList.add('loaded'); 
    }
}

function handleImageError(imgElement) {
    const coverDiv = imgElement.previousElementSibling;
    if (coverDiv && coverDiv.classList.contains('card-cover')) {
        coverDiv.classList.add('loaded');
        coverDiv.style.backgroundColor = '#1e293b';
        coverDiv.style.backgroundImage = 'none';
        coverDiv.innerHTML = "<div style='display:flex; height:100%; align-items:center; justify-content:center; color:#475569; font-size:2rem;'><i class='bx bx-image-alt'></i></div>";
    }
}

function updateQuickStats() {
    const statsContainer = document.getElementById('quick-stats');
    if (!statsContainer || typeof gamesData === 'undefined') return;

    let totalGames = gamesData.length;
    let totalValue = 0;
    let totalValueDiscounted = 0;

    let pausedGames = gamesData.filter(g => g.play_status === 'paused');
    let changedMindGames = gamesData.filter(g => g.play_status === 'changed_mind');
    let unplannedGames = gamesData.filter(g => g.play_status === 'unplanned_completed');
    let unplannedDroppedGames = gamesData.filter(g => g.play_status === 'unplanned_dropped');

    const validPriceStatuses = ['planned', 'playing', 'paused', 'completed', 'dropped'];

    gamesData.forEach(game => {
        if (game.price_uah && game.price_uah > 0 && validPriceStatuses.includes(game.play_status)) {
            let basePrice = parseFloat(game.price_uah);
            totalValue += basePrice;
            
            let discount = game.discount_percent ? parseFloat(game.discount_percent) : 0;
            totalValueDiscounted += basePrice - (basePrice * (discount / 100));
        }
    });

    const mcIconUrl = "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/metacritic-v4mt6kt4i7dvc1ouf1yu5.png/metacritic-ftfgubcsl0406bwla6utd4u.png?_a=DATAiZAAZAA0";

    const generateTooltipList = (games) => {
        games.sort((a, b) => a.title.localeCompare(b.title));

        return games.map(g => {
            const escapedTitle = g.title.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
            let discount = g.discount_percent || 0;
            let badgeSale = '';
            
            if (discount > 0) {
                badgeSale = `<div class="card-badge badge-sale" style="top: 5px; left: 5px; padding: 2px 6px; border-radius: 4px; font-size: 0.65rem; line-height: normal;">-${discount}%</div>`;
            }

            let priceClass = "";
            let priceContent = `<span style="opacity: 0.5;"><i class='bx bx-loader-alt bx-spin'></i></span>`;
            
            if (g.price_uah === undefined || g.price_uah === null || g.price_uah === "") {
                priceClass = "auto-price-container"; 
                let cachedPrice = localStorage.getItem(`steam_price_${g.title}`);
                if (cachedPrice && cachedPrice !== "null") {
                    let p = parseFloat(cachedPrice);
                    if (p === 0) priceContent = `<span style="color: var(--accent-green);">Бесплатно</span>`;
                    else priceContent = `<span>${p}₴</span>`;
                } else if (cachedPrice === "null") {
                    priceContent = `<span style="opacity: 0.5;">tbd</span>`;
                }
            } else if (g.price_uah > 0) {
                priceContent = `<span>${g.price_uah}₴</span>`;
            } else {
                priceContent = `<span style="color: var(--accent-green);">Бесплатно</span>`;
            }

            let timeText = g.playtime ? `~${g.playtime}ч` : '<span style="opacity:0.5;">tbd</span>';
            let releaseText = g.release_date ? g.release_date : '<span style="opacity:0.5;">tbd</span>';

            let cachedRating = g.rating || localStorage.getItem(`mc_rating_${g.title}`);
            let ratingContent = `<span style="opacity: 0.5;"><i class='bx bx-loader-alt bx-spin'></i></span>`;
            if (cachedRating && cachedRating !== "null" && !isNaN(parseFloat(cachedRating))) {
                let score = parseFloat(cachedRating);
                let ratingColor = "#94a3b8"; 
                if (score >= 75) ratingColor = "#10b981"; 
                else if (score >= 50) ratingColor = "#f59e0b"; 
                else if (score > 0) ratingColor = "#ef4444"; 
                ratingContent = `<span style="color: ${ratingColor}; font-weight: 600;">${score}/100</span>`;
            } else if (cachedRating === "null") {
                ratingContent = `<span style="opacity: 0.5;">tbd</span>`;
            }

            let currentProgress = g.progress || 0;
            let progressColor;
            switch(g.play_status) {
                case 'completed': 
                case 'unplanned_completed': progressColor = '#10b981'; break; 
                case 'playing': progressColor = '#06b6d4'; break;   
                case 'planned': progressColor = '#f59e0b'; break;   
                case 'dropped': 
                case 'unplanned_dropped': progressColor = '#ef4444'; break;   
                default: progressColor = '#94a3b8';                 
            }

            return `
            <div class="hover-item-container">
                <a href="${g.steam_link}" target="_blank" class="hover-item">${g.title}</a>
                <div class="game-mini-tooltip">
                    <div style="position: relative; display: block;">
                        <img src="${g.poster}" alt="poster" style="display: block;">
                        ${badgeSale}
                    </div>
                    <div class="tt-details">
                        <div class="auto-rating-container" data-game-title="${escapedTitle}" data-fallback-rating="${g.rating || ''}">
                            <span style="display: inline-flex; width: 1.1rem; justify-content: center; align-items: center;">
                                <img src="${mcIconUrl}" style="width: 14px; height: 14px; filter: invert(48%) sepia(13%) saturate(735%) hue-rotate(176deg) brightness(93%) contrast(89%); margin: 0;">
                            </span> 
                            ${ratingContent}
                        </div>
                        <div class="${priceClass}" data-game-title="${escapedTitle}" data-discount="${discount}">
                            <i class='bx bx-purchase-tag'></i> 
                            ${priceContent}
                        </div>
                        <div><i class='bx bx-time-five'></i> <span>${timeText}</span></div>
                        <div><i class='bx bx-calendar'></i> <span>${releaseText}</span></div>
                        <div style="width: 100%; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; margin-top: 6px; overflow: hidden; display: flex;" title="Прогресс: ${currentProgress}%">
                            <div style="width: ${currentProgress}%; height: 100%; background: ${progressColor}; transition: width 0.3s;"></div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }).join('');
    };

    let pausedListHtml = generateTooltipList(pausedGames);
    let changedMindListHtml = generateTooltipList(changedMindGames);
    let unplannedListHtml = generateTooltipList(unplannedGames);
    let unplannedDroppedListHtml = generateTooltipList(unplannedDroppedGames);

    let pausedHtml = pausedGames.length > 0 ? `
        <div class="stat-hover-group">
            <span style="color: #f59e0b;"><i class='bx bx-pause-circle'></i> На паузе: ${pausedGames.length}</span>
            <div class="stat-hover-list">${pausedListHtml}</div>
        </div>
    ` : '';

    let changedMindHtml = changedMindGames.length > 0 ? `
        <div class="stat-hover-group">
            <span style="color: #64748b;"><i class='bx bx-refresh'></i> Передумал: ${changedMindGames.length}</span>
            <div class="stat-hover-list">${changedMindListHtml}</div>
        </div>
    ` : '';

    let unplannedHtml = unplannedGames.length > 0 ? `
        <div class="stat-hover-group">
            <span style="color: #10b981;"><i class='bx bx-trophy'></i> Вне плана (Пройдено): ${unplannedGames.length}</span>
            <div class="stat-hover-list">${unplannedListHtml}</div>
        </div>
    ` : '';

    let unplannedDroppedHtml = unplannedDroppedGames.length > 0 ? `
        <div class="stat-hover-group">
            <span style="color: #ef4444;"><i class='bx bx-x-circle'></i> Вне плана (Дроп): ${unplannedDroppedGames.length}</span>
            <div class="stat-hover-list">${unplannedDroppedListHtml}</div>
        </div>
    ` : '';

    let isLate = new Date() >= new Date('2027-01-01T00:00:00');

    let outOfTimeHtml = '';
    if (isLate) {
        let outOfTimeGames = gamesData.filter(g => g.play_status === 'planned' || g.play_status === 'paused');
        if (outOfTimeGames.length > 0) {
            let outOfTimeListHtml = generateTooltipList(outOfTimeGames);
            outOfTimeHtml = `
                <div class="stat-hover-group">
                    <span style="color: #ef4444;" title="Игры, которые не были пройдены до конца 2026 года"><i class='bx bx-alarm-exclamation'></i> Не успел: ${outOfTimeGames.length}</span>
                    <div class="stat-hover-list">${outOfTimeListHtml}</div>
                </div>
            `;
        }
    }

    statsContainer.innerHTML = `
        <span title="Общее количество игр"><i class='bx bx-layer'></i> Всего игр: ${totalGames}</span>
        ${pausedHtml}
        ${changedMindHtml}
        ${unplannedHtml}
        ${unplannedDroppedHtml}
        ${outOfTimeHtml}
        <span style="color: #06b6d4;" title="Включая скидки: ${Math.round(totalValueDiscounted).toLocaleString()} ₴"><i class='bx bx-wallet'></i> Общая стоимость: ${Math.round(totalValue).toLocaleString()} ₴</span>
    `;
}

function renderBoard() {
    if (typeof gamesData === 'undefined') return;

    gamesData.sort((a, b) => a.title.localeCompare(b.title));

    const board = document.getElementById('kanban-board');
    board.innerHTML = '';

    updateQuickStats();

    let activeColumns = kanbanColumns;
    let isLate = new Date() >= new Date('2027-01-01T00:00:00');

    if (isLate) {
        activeColumns = kanbanColumns.filter(col => col.id !== 'planned');
    }

    activeColumns.forEach(col => {
        const columnEl = document.createElement('div');
        columnEl.className = 'kanban-column';
        
        const columnGames = gamesData.filter(game => col.statuses.includes(game.play_status));
        let cardsHtml = columnGames.map(game => createCardHtml(game)).join('');

        columnEl.innerHTML = `
            <div class="column-header" style="display: flex; justify-content: space-between; align-items: center;">
                <h2 style="display: flex; align-items: center; gap: 8px; margin: 0;">
                    ${col.title} <span class="game-count">${columnGames.length}</span>
                </h2>
                ${columnGames.length > 0 ? `
                    <button onclick="toggleAllInColumn(this)" title="Свернуть/развернуть все игры" style="background: none; border: none; color: var(--text-muted); cursor: pointer; display: flex; padding: 4px; border-radius: 6px; transition: 0.2s;" onmouseover="this.style.color='#fff'; this.style.background='rgba(255,255,255,0.1)';" onmouseout="this.style.color='var(--text-muted)'; this.style.background='none';">
                        <i class='bx bx-collapse-vertical' style="font-size: 1.3rem;"></i>
                    </button>
                ` : ''}
            </div>
            <div class="column-content">
                ${cardsHtml || '<div class="empty-column"><i class="bx bx-ghost"></i> Пусто</div>'}
            </div>
        `;
        board.appendChild(columnEl);
    });
}

function toggleAllInColumn(btn) {
    const column = btn.closest('.kanban-column');
    const cards = column.querySelectorAll('.kanban-card');
    if (cards.length === 0) return;

    const hasExpanded = Array.from(cards).some(card => !card.classList.contains('collapsed'));

    cards.forEach(card => {
        const isCollapsed = card.classList.contains('collapsed');
        const toggleBtn = card.querySelector('.toggle-btn');
        
        if (hasExpanded && !isCollapsed) {
            if (toggleBtn) toggleCard(toggleBtn);
        } else if (!hasExpanded && isCollapsed) {
            if (toggleBtn) toggleCard(toggleBtn);
        }
    });
}

function createCardHtml(game) {
    const escapedTitle = game.title.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    
    let badgeSale = '';
    let priceHtml = '';

    if (game.price_uah === undefined || game.price_uah === null || game.price_uah === "") {
        priceHtml = `
            <div class="meta-row auto-price-container" data-game-title="${escapedTitle}" data-discount="${game.discount_percent || 0}" title="Загрузка цены...">
                <i class='bx bx-purchase-tag'></i> 
                <span style="opacity: 0.5;"><i class='bx bx-loader-alt bx-spin'></i></span>
            </div>`;
    } else if (game.price_uah > 0) {
        priceHtml = `<div class="meta-row" title="Базовая стоимость игры в Steam"><i class='bx bx-purchase-tag'></i> <span>${game.price_uah}₴</span></div>`;
        if (game.discount_percent > 0) {
            badgeSale = `<div class="card-badge badge-sale" title="Скидка: ${game.discount_percent}%">-${game.discount_percent}%</div>`;
        }
    } else {
        priceHtml = `<div class="meta-row" title="Базовая стоимость игры в Steam"><i class='bx bx-purchase-tag'></i> <span style="color: var(--accent-green);">Бесплатно</span></div>`;
    }

    let playtimeHtml = game.playtime 
        ? `<div class="meta-row" title="Примерное время прохождения сюжета"><i class='bx bx-time-five'></i> <span>Сюжет: ~${game.playtime}ч</span></div>` 
        : `<div class="meta-row" title="Время прохождения неизвестно"><i class='bx bx-time-five'></i> <span style="opacity: 0.5;">Время: tbd</span></div>`;
    
    let releaseHtml = game.release_date 
        ? `<div class="meta-row" title="Дата выхода игры"><i class='bx bx-calendar'></i> <span>${game.release_date}</span></div>` 
        : `<div class="meta-row" title="Точная дата выхода неизвестна"><i class='bx bx-calendar'></i> <span style="opacity: 0.5;">Дата: tbd</span></div>`;
    
    let mcIconUrl = "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/metacritic-v4mt6kt4i7dvc1ouf1yu5.png/metacritic-ftfgubcsl0406bwla6utd4u.png?_a=DATAiZAAZAA0";
    
    let ratingHtml = `
        <div class="meta-row auto-rating-container" data-game-title="${escapedTitle}" data-fallback-rating="${game.rating || ''}" title="Загрузка рейтинга...">
            <span style="display: inline-flex; width: 1.1rem; justify-content: center; align-items: center;">
                <img src="${mcIconUrl}" style="width: 14px; height: 14px; filter: invert(48%) sepia(13%) saturate(735%) hue-rotate(176deg) brightness(93%) contrast(89%); margin: 0;">
            </span> 
            <span style="opacity: 0.5;"><i class='bx bx-loader-alt bx-spin'></i></span>
        </div>`;

    let reviewHtml = game.review_link ? `<a href="${game.review_link}" target="_blank" class="action-btn" title="Открыть обзор на игру"><i class='bx bxs-message-square-detail'></i></a>` : '';
    let steamHtml = game.steam_link ? `<a href="${game.steam_link}" target="_blank" class="action-btn steam-color" title="Открыть страницу игры в Steam"><i class='bx bxl-steam'></i></a>` : '';

    let currentProgress = game.progress || 0;
    
    let progressColor;
    switch(game.play_status) {
        case 'completed': 
        case 'unplanned_completed': progressColor = '#10b981'; break; 
        case 'playing': progressColor = '#06b6d4'; break;   
        case 'planned': progressColor = '#f59e0b'; break;   
        case 'dropped': 
        case 'unplanned_dropped': progressColor = '#ef4444'; break;   
        default: progressColor = '#94a3b8';                 
    }

    let collapsedCards = JSON.parse(localStorage.getItem('collapsed_cards') || '[]');
    let isCollapsed = collapsedCards.includes(game.title);

    let cardClasses = 'kanban-card';
    if (game.play_status === 'dropped' || game.play_status === 'unplanned_dropped') {
        cardClasses += ' opacity-70';
    }
    if (isCollapsed) {
        cardClasses += ' collapsed';
    }

    let toggleIcon = isCollapsed ? 'bx-chevron-down' : 'bx-chevron-up';

    return `
        <div class="${cardClasses}">
            <div class="card-cover-wrapper">
                <div class="card-cover" style="background-image: url('${game.poster}');"></div>
                <img src="${game.poster}" style="position: absolute; width: 1px; height: 1px; opacity: 0;" onload="handleImageLoad(this)" onerror="handleImageError(this)">
                ${badgeSale}
            </div>
            
            <div class="card-body">
                <div class="card-header-row" style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
                    <h3 class="card-title" 
                        title="${escapedTitle}" 
                        data-title="${escapedTitle}"
                        style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; flex-grow: 1; margin: 0; transition: color 0.2s;"
                        onclick="handleTitleClick(event, this)"
                    >${game.title}</h3>
                    <button class="toggle-btn" onclick="toggleCard(this)" title="Свернуть/Развернуть" style="background: none; border: none; color: var(--text-muted); cursor: pointer; display: flex; padding: 2px; border-radius: 4px; transition: 0.2s; flex-shrink: 0;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--text-muted)'">
                        <i class='bx ${toggleIcon}' style="font-size: 1.4rem;"></i>
                    </button>
                </div>
                
                <div class="collapsible-wrapper">
                    <div class="collapsible-inner">
                        <div class="card-info-grid">
                            ${ratingHtml}
                            ${playtimeHtml}
                            ${releaseHtml}
                            ${priceHtml}
                        </div>
                        
                        <div class="card-bottom">
                            <div class="progress-container" title="Текущий прогресс прохождения: ${currentProgress}%">
                                <div class="progress-bar" style="width: ${currentProgress}%; background: ${progressColor};"></div>
                            </div>
                            <div class="card-actions">
                                ${reviewHtml}
                                ${steamHtml}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function handleTitleClick(event, el) {
    const card = el.closest('.kanban-card');
    
    if (card.classList.contains('collapsed')) {
        const btn = card.querySelector('.toggle-btn');
        if (btn) toggleCard(btn);
    } else {
        copyTitleToClipboard(el.dataset.title);
    }
}

function toggleCard(btn) {
    const card = btn.closest('.kanban-card');
    const icon = btn.querySelector('i');
    const titleEl = card.querySelector('.card-title');
    
    const gameTitle = titleEl.getAttribute('data-title').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    
    card.classList.toggle('collapsed');
    
    let collapsedCards = JSON.parse(localStorage.getItem('collapsed_cards') || '[]');
    
    if (card.classList.contains('collapsed')) {
        icon.classList.replace('bx-chevron-up', 'bx-chevron-down');
        if (!collapsedCards.includes(gameTitle)) {
            collapsedCards.push(gameTitle);
        }
    } else {
        icon.classList.replace('bx-chevron-down', 'bx-chevron-up');
        collapsedCards = collapsedCards.filter(t => t !== gameTitle);
    }
    
    localStorage.setItem('collapsed_cards', JSON.stringify(collapsedCards));
}

document.addEventListener('DOMContentLoaded', () => {
    const animationStyles = document.createElement('style');
    animationStyles.innerHTML = `
        .board-header {
            position: relative;
            z-index: 1000;
        }
        
        .card-cover-wrapper {
            transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease;
        }
        .kanban-card.collapsed .card-cover-wrapper {
            height: 0 !important;
            opacity: 0;
            border-bottom: 0px solid transparent;
        }
        
        .card-body {
            transition: padding 0.3s cubic-bezier(0.4, 0, 0.2, 1), gap 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .kanban-card.collapsed .card-body {
            padding: 10px 15px !important;
            gap: 0 !important;
        }
        
        .collapsible-wrapper {
            display: grid;
            grid-template-rows: 1fr;
            transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .kanban-card.collapsed .collapsible-wrapper {
            grid-template-rows: 0fr;
        }
        
        .collapsible-inner {
            min-height: 0;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        
        .stat-hover-list { overflow: visible !important; }
        .hover-item-container { position: relative; }
        .game-mini-tooltip {
            position: absolute;
            left: calc(100% + 15px);
            top: -20px;
            width: 220px;
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5);
            opacity: 0;
            visibility: hidden;
            transform: translateX(-10px);
            transition: all 0.2s ease;
            z-index: 200;
            pointer-events: none;
            display: flex;
            flex-direction: column;
            gap: 8px;
            backdrop-filter: blur(10px);
        }
        .hover-item-container:hover .game-mini-tooltip {
            opacity: 1;
            visibility: visible;
            transform: translateX(0);
        }
        .game-mini-tooltip img {
            width: 100%;
            height: 100px;
            object-fit: cover;
            border-radius: 4px;
            border: 1px solid rgba(255,255,255,0.05);
        }
        .game-mini-tooltip .tt-details {
            display: flex;
            flex-direction: column;
            gap: 5px;
            font-size: 0.8rem;
            color: var(--text-muted);
        }
        .game-mini-tooltip .tt-details div {
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .game-mini-tooltip::before {
            content: '';
            position: absolute;
            top: 25px;
            left: -6px;
            width: 10px;
            height: 10px;
            background: var(--card-bg);
            border-bottom: 1px solid var(--border-color);
            border-left: 1px solid var(--border-color);
            transform: rotate(45deg);
        }
    `;
    document.head.appendChild(animationStyles);

    const profileLink = document.querySelector('.profile-area a');
    if (profileLink) {
        profileLink.title = "Перейти в мой профиль Steam";
    }

    updateSteamAvatar();
    renderBoard();
    setupStatsModal();
    setupRefreshButton();
    fetchMetacriticRatings(); 
});

function copyTitleToClipboard(title) {
    navigator.clipboard.writeText(title).then(() => {
        let toast = document.getElementById('copy-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'copy-toast';
            document.body.appendChild(toast);
        }
        
        toast.innerHTML = `<i class='bx bx-check-circle'></i> Название скопировано`;
        toast.classList.add('show');
        
        if (toast.timeoutId) clearTimeout(toast.timeoutId);
        
        toast.timeoutId = setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    });
}

function setupStatsModal() {
    const openBtn = document.getElementById('open-stats-btn');
    const overlay = document.getElementById('stats-modal-overlay');
    const closeBtn = document.getElementById('close-stats-btn');
    
    if (!openBtn || !overlay || !closeBtn) return;

    openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        populateStats();
        overlay.classList.add('show');
    });

    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('show');
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('show');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('show')) {
            overlay.classList.remove('show');
        }
    });
}

function populateStats() {
    if (typeof gamesData === 'undefined' || gamesData.length === 0) return;

    let totalPlaytimeSpent = 0;
    let totalBacklogTime = 0;
    let completedCount = 0;
    
    let totalRating = 0;
    let gamesWithRating = 0;
    let totalProgressSum = 0;
    const validStatuses = ['planned', 'playing', 'paused', 'completed', 'dropped'];
    let validGamesCount = gamesData.filter(g => validStatuses.includes(g.play_status)).length;

    gamesData.forEach(game => {
        if (game.play_status === 'completed') completedCount++;

        if (game.playtime && !isNaN(parseFloat(game.playtime))) {
            let time = parseFloat(game.playtime);
            totalBacklogTime += time;
            
            const validTimeStatuses = ['completed', 'unplanned_completed', 'paused', 'dropped', 'unplanned_dropped'];
            if (validTimeStatuses.includes(game.play_status)) {
                let prog = game.progress || 0;
                totalPlaytimeSpent += (time * (prog / 100));
            }
        }

        if (game.rating && !isNaN(parseFloat(game.rating))) {
            totalRating += parseFloat(game.rating);
            gamesWithRating++;
        }

        totalProgressSum += (game.progress || 0);
    });

    let completionRate = Math.round(totalProgressSum / gamesData.length) || 0;
    let avgRating = gamesWithRating > 0 ? Math.round(totalRating / gamesWithRating) : 0;

    const modalBody = document.getElementById('stats-modal-body');
    const mcIconUrl = "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/metacritic-v4mt6kt4i7dvc1ouf1yu5.png/metacritic-ftfgubcsl0406bwla6utd4u.png?_a=DATAiZAAZAA0";
    
    modalBody.innerHTML = `
        <div class="stats-dashboard">
            <div class="stats-hero">
                <div class="hero-progress">
                    <svg viewBox="0 0 36 36" class="circular-chart cyan">
                        <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path class="circle" stroke-dasharray="${completionRate}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <text x="18" y="20.35" class="percentage">~${completionRate}%</text>
                    </svg>
                    <div class="hero-text">Общий прогресс</div>
                </div>
                <div class="hero-main-stats">
                    <div class="main-stat-item">
                        <div class="icon-wrap green"><i class='bx bx-check-double'></i></div>
                        <div class="stat-text">
                            <div><span class="val">${completedCount}</span> <span class="lbl">/ ${validGamesCount} пройдено</span></div>
                            <span style="font-size: 0.65rem; color: var(--text-muted); opacity: 0.8; margin-top: 3px;">Без учёта спонтанно пройденных, дропнутых игр</span>
                        </div>
                    </div>
                    <div class="main-stat-item">
                        <div class="icon-wrap orange"><i class='bx bx-time-five'></i></div>
                        <div class="stat-text">
                            <div><span class="val">~${Math.round(totalPlaytimeSpent)}</span> <span class="lbl">часов</span></div>
                            <span style="font-size: 0.65rem; color: var(--text-muted); opacity: 0.8; margin-top: 3px;">Рассчитано по формуле: время сюжета × % прогресса + n</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="stats-grid-new">
                <div class="stat-box">
                    <div class="box-icon">
                        <img src="${mcIconUrl}" style="width: 28px; height: 28px; filter: invert(1); opacity: 0.5;">
                    </div>
                    <div class="box-info">
                        <span class="box-title">Средняя оценка</span>
                        <span class="box-val">${avgRating} / 100</span>
                        <span class="box-sub">По данным Metacritic</span>
                    </div>
                </div>
                <div class="stat-box highlight-box">
                    <div class="box-icon"><i class='bx bx-collection'></i></div>
                    <div class="box-info">
                        <span class="box-title">Потенциально посраное время</span>
                        <span class="box-val">~${Math.round(totalBacklogTime)} ч.</span>
                        <span class="box-sub">Время на прохождение всех игр</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

async function fetchMetacriticRatings() {
    const rawgApiKey = 'eff5af7536f94b1b862edf995f4ee1f9'; 
    const ratingContainers = document.querySelectorAll('.auto-rating-container');
    const priceContainers = document.querySelectorAll('.auto-price-container');
    const mcIconUrl = "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/metacritic-v4mt6kt4i7dvc1ouf1yu5.png/metacritic-ftfgubcsl0406bwla6utd4u.png?_a=DATAiZAAZAA0";

    const uniqueGames = new Set();
    ratingContainers.forEach(c => uniqueGames.add(c.getAttribute('data-game-title')));
    priceContainers.forEach(c => uniqueGames.add(c.getAttribute('data-game-title')));

    const renderScore = (escapedTitle, score) => {
        const containers = document.querySelectorAll(`.auto-rating-container[data-game-title="${escapedTitle}"]`);
        
        let ratingColor = "#94a3b8"; 
        if (score >= 75) ratingColor = "#10b981"; 
        else if (score >= 50) ratingColor = "#f59e0b"; 
        else if (score > 0) ratingColor = "#ef4444"; 

        containers.forEach(container => {
            container.title = "Рейтинг игры на сайте Metacritic";
            container.innerHTML = `
                <span style="display: inline-flex; width: 1.1rem; justify-content: center; align-items: center;">
                    <img src="${mcIconUrl}" style="width: 14px; height: 14px; filter: invert(1); margin: 0;">
                </span> 
                <span style="color: ${ratingColor}; font-weight: 600;">${score}/100</span>`;
        });
        
        const gameObj = gamesData.find(g => g.title === escapedTitle.replace(/&quot;/g, '"').replace(/&#39;/g, "'"));
        if (gameObj) gameObj.rating = score;
    };

    const renderEmptyRating = (escapedTitle) => {
        const containers = document.querySelectorAll(`.auto-rating-container[data-game-title="${escapedTitle}"]`);
        containers.forEach(container => {
            container.title = "У игры пока нет рейтинга на Metacritic";
            container.innerHTML = `
                <span style="display: inline-flex; width: 1.1rem; justify-content: center; align-items: center;">
                    <img src="${mcIconUrl}" style="width: 14px; height: 14px; filter: invert(48%) sepia(13%) saturate(735%) hue-rotate(176deg) brightness(93%) contrast(89%); margin: 0;">
                </span> 
                <span style="opacity: 0.5;">tbd</span>`;
        });
    };

    const renderPrice = (escapedTitle, price) => {
        const containers = document.querySelectorAll(`.auto-price-container[data-game-title="${escapedTitle}"]`);
        
        containers.forEach(container => {
            const discount = parseInt(container.getAttribute('data-discount')) || 0;
            
            if (price === 0) {
                container.title = "Бесплатная игра";
                container.innerHTML = `<i class='bx bx-purchase-tag'></i> <span style="color: var(--accent-green);">Бесплатно</span>`;
            } else if (price > 0) {
                container.title = "Базовая стоимость игры в Steam";
                container.innerHTML = `<i class='bx bx-purchase-tag'></i> <span>${price}₴</span>`;
                
                if (discount > 0) {
                    const card = container.closest('.kanban-card');
                    if (card) {
                        const coverWrapper = card.querySelector('.card-cover-wrapper');
                        if (coverWrapper) {
                            let badge = coverWrapper.querySelector('.badge-sale');
                            if (!badge) {
                                coverWrapper.insertAdjacentHTML('beforeend', `<div class="card-badge badge-sale" title="Скидка: ${discount}%">-${discount}%</div>`);
                            }
                        }
                    }
                }
            } else {
                container.title = "Цена неизвестна";
                container.innerHTML = `<i class='bx bx-purchase-tag'></i> <span style="opacity: 0.5;">tbd</span>`;
            }
        });
        
        const originalTitle = escapedTitle.replace(/&quot;/g, '"').replace(/&#39;/g, "'");
        const gameObj = gamesData.find(g => g.title === originalTitle);
        if (gameObj) {
            gameObj.price_uah = price;
            gameObj._is_dynamic_price = true;
        }
    };

    const gamesToFetch = [];

    uniqueGames.forEach(escapedTitle => {
        const originalTitle = escapedTitle.replace(/&quot;/g, '"').replace(/&#39;/g, "'");
        const gameObj = gamesData.find(g => g.title === originalTitle);
        
        const cachedRating = localStorage.getItem(`mc_rating_${originalTitle}`);
        const cachedPrice = localStorage.getItem(`steam_price_${originalTitle}`);
        
        const hasRatingContainer = document.querySelector(`.auto-rating-container[data-game-title="${escapedTitle}"]`);
        const hasPriceContainer = document.querySelector(`.auto-price-container[data-game-title="${escapedTitle}"]`);

        let needsFetch = false;
        let itemTask = { 
            title: originalTitle, 
            escapedTitle: escapedTitle, 
            fetchRating: false, 
            fetchPrice: false,
            fallbackRating: gameObj?.rating 
        };

        if (hasRatingContainer) {
            if (cachedRating && cachedRating !== "null") {
                renderScore(escapedTitle, parseFloat(cachedRating));
            } else if (cachedRating === "null") {
                renderEmptyRating(escapedTitle);
            } else {
                itemTask.fetchRating = true;
                needsFetch = true;
            }
        }

        if (hasPriceContainer) {
            if (cachedPrice && cachedPrice !== "null") {
                renderPrice(escapedTitle, parseFloat(cachedPrice));
            } else if (cachedPrice === "null") {
                renderPrice(escapedTitle, null);
            } else {
                itemTask.fetchPrice = true;
                needsFetch = true;
            }
        }

        if (needsFetch) gamesToFetch.push(itemTask);
    });

    const fetchSingleGame = async (item) => {
        let finalScore = null;
        let finalPrice = null;
        const gameObj = gamesData.find(g => g.title === item.title);
        
        if (gameObj && gameObj.steam_link) {
            const appIdMatch = gameObj.steam_link.match(/\/app\/(\d+)/);
            if (appIdMatch && appIdMatch[1]) {
                try {
                    const targetUrl = `https://store.steampowered.com/api/appdetails?appids=${appIdMatch[1]}`;
                    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
                    
                    const response = await fetch(proxyUrl);
                    const data = await response.json();
                    const appData = data[appIdMatch[1]]?.data;
                    
                    if (appData) {
                        if (appData.metacritic) {
                            finalScore = appData.metacritic.score;
                        }
                        if (item.fetchPrice) {
                            if (appData.is_free) {
                                finalPrice = 0;
                            } else if (appData.price_overview) {
                                finalPrice = appData.price_overview.initial / 100;
                            }
                        }
                    }
                } catch (e) {
                    console.warn(`Steam API недоступен для ${item.title}`);
                }
            }
        }

        if (item.fetchRating && !finalScore) {
            try {
                const response = await fetch(`https://api.rawg.io/api/games?key=${rawgApiKey}&search=${encodeURIComponent(item.title)}&page_size=1`);
                const data = await response.json();
                if (data.results?.[0]?.metacritic) {
                    finalScore = data.results[0].metacritic;
                }
            } catch (e) {}
        }

        if (item.fetchRating) {
            if (!finalScore && item.fallbackRating && !isNaN(parseFloat(item.fallbackRating))) {
                finalScore = parseFloat(item.fallbackRating);
            }
            if (finalScore) {
                localStorage.setItem(`mc_rating_${item.title}`, finalScore);
                renderScore(item.escapedTitle, finalScore);
            } else {
                localStorage.setItem(`mc_rating_${item.title}`, "null");
                renderEmptyRating(item.escapedTitle);
            }
        }

        if (item.fetchPrice) {
            if (finalPrice !== null) {
                localStorage.setItem(`steam_price_${item.title}`, finalPrice);
                renderPrice(item.escapedTitle, finalPrice);
            } else {
                localStorage.setItem(`steam_price_${item.title}`, "null");
                renderPrice(item.escapedTitle, null);
            }
        }
    };

    const batchSize = 3;
    for (let i = 0; i < gamesToFetch.length; i += batchSize) {
        const batch = gamesToFetch.slice(i, i + batchSize);
        await Promise.all(batch.map(item => fetchSingleGame(item)));
        if (i + batchSize < gamesToFetch.length) {
            await new Promise(resolve => setTimeout(resolve, 250));
        }
    }
    
    updateQuickStats();
}

function setupRefreshButton() {
    const refreshBtn = document.getElementById('refresh-ratings-btn');
    if (!refreshBtn) return;

    refreshBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const icon = refreshBtn.querySelector('i');
        
        icon.classList.add('bx-spin');
        refreshBtn.style.pointerEvents = 'none';

        if (typeof gamesData !== 'undefined') {
            gamesData.forEach(game => {
                localStorage.removeItem(`mc_rating_${game.title}`);
                localStorage.removeItem(`steam_price_${game.title}`);
                if (game._is_dynamic_price) {
                    game.price_uah = ""; 
                }
            });
        }

        renderBoard();

        const containers = document.querySelectorAll('.auto-rating-container');
        const mcIconUrl = "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/metacritic-v4mt6kt4i7dvc1ouf1yu5.png/metacritic-ftfgubcsl0406bwla6utd4u.png?_a=DATAiZAAZAA0";
        
        containers.forEach(container => {
            container.title = "Обновление рейтинга...";
            container.innerHTML = `
                <span style="display: inline-flex; width: 1.1rem; justify-content: center; align-items: center;">
                    <img src="${mcIconUrl}" style="width: 14px; height: 14px; filter: invert(48%) sepia(13%) saturate(735%) hue-rotate(176deg) brightness(93%) contrast(89%); margin: 0;">
                </span> 
                <span style="opacity: 0.5;"><i class='bx bx-loader-alt bx-spin'></i></span>
            `;
        });

        await fetchMetacriticRatings();

        icon.classList.remove('bx-spin');
        refreshBtn.style.pointerEvents = 'auto';
        
        let toast = document.getElementById('copy-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'copy-toast';
            document.body.appendChild(toast);
        }
        
        toast.innerHTML = `<i class='bx bx-check-circle'></i> Данные обновлены`;
        toast.classList.add('show');
        
        if (toast.timeoutId) clearTimeout(toast.timeoutId);
        
        toast.timeoutId = setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    });
}