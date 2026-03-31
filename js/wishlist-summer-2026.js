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

function renderBoard() {
    if (typeof gamesData === 'undefined') return;

    gamesData.sort((a, b) => a.title.localeCompare(b.title));

    const board = document.getElementById('kanban-board');
    const statsContainer = document.getElementById('quick-stats');
    board.innerHTML = '';

    let totalGames = gamesData.length;
    let playingCount = gamesData.filter(g => g.play_status === 'playing').length;
    let totalValue = 0;

    let pausedGames = gamesData.filter(g => g.play_status === 'paused');
    let changedMindGames = gamesData.filter(g => g.play_status === 'changed_mind');

    gamesData.forEach(game => {
        if (game.price_uah > 0 && game.play_status !== 'changed_mind') {
            totalValue += game.price_uah;
        }
    });

    let pausedListHtml = pausedGames.map(g => `<a href="${g.steam_link}" target="_blank" class="hover-item">${g.title}</a>`).join('');
    let changedMindListHtml = changedMindGames.map(g => `<a href="${g.steam_link}" target="_blank" class="hover-item">${g.title}</a>`).join('');

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

    statsContainer.innerHTML = `
        <span title="Общее количество игр"><i class='bx bx-layer'></i> Всего игр: ${totalGames}</span>
        ${pausedHtml}
        ${changedMindHtml}
        <span style="color: #06b6d4;" title="Суммарная стоимость всех игр без учёта скидок"><i class='bx bx-wallet'></i> Общая стоимость: ${Math.round(totalValue).toLocaleString()} ₴</span>
    `;

    kanbanColumns.forEach(col => {
        const columnEl = document.createElement('div');
        columnEl.className = 'kanban-column';
        
        const columnGames = gamesData.filter(game => col.statuses.includes(game.play_status));
        let cardsHtml = columnGames.map(game => createCardHtml(game)).join('');

        columnEl.innerHTML = `
            <div class="column-header">
                <h2>${col.title} <span class="game-count">${columnGames.length}</span></h2>
            </div>
            <div class="column-content">
                ${cardsHtml || '<div class="empty-column"><i class="bx bx-ghost"></i> Пусто</div>'}
            </div>
        `;
        board.appendChild(columnEl);
    });
}

function createCardHtml(game) {
    let priceDisplay = '';
    let badgeSale = '';
    
    if (game.price_uah === undefined || game.price_uah === null || game.price_uah === "") {
        priceDisplay = `<span style="opacity: 0.5;">tbd</span>`;
    } else if (game.price_uah > 0) {
        priceDisplay = `<span>${game.price_uah}₴</span>`;
        if (game.discount_percent > 0) {
            badgeSale = `<div class="card-badge badge-sale" title="Возможная скидка">-${game.discount_percent}%</div>`;
        }
    } else {
        priceDisplay = `<span style="color: var(--accent-green);">Бесплатно</span>`;
    }

    let playtimeHtml = game.playtime 
        ? `<div class="meta-row" title="Примерное время прохождения сюжета"><i class='bx bx-time-five'></i> <span>Сюжет: ~${game.playtime}ч</span></div>` 
        : `<div class="meta-row" title="Время прохождения неизвестно"><i class='bx bx-time-five'></i> <span style="opacity: 0.5;">Время: tbd</span></div>`;
    
    let releaseHtml = game.release_date 
        ? `<div class="meta-row" title="Дата выхода игры"><i class='bx bx-calendar'></i> <span>${game.release_date}</span></div>` 
        : `<div class="meta-row" title="Точная дата выхода неизвестна"><i class='bx bx-calendar'></i> <span style="opacity: 0.5;">Дата: tbd</span></div>`;
    
    let priceHtml = `<div class="meta-row" title="Базовая стоимость игры в Steam"><i class='bx bx-purchase-tag'></i> <span>${priceDisplay}</span></div>`;
    
    let mcIconUrl = "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/metacritic-v4mt6kt4i7dvc1ouf1yu5.png/metacritic-ftfgubcsl0406bwla6utd4u.png?_a=DATAiZAAZAA0";
    
    let ratingColor = "#94a3b8"; 
    if (game.rating >= 75) ratingColor = "#10b981"; 
    else if (game.rating >= 50) ratingColor = "#f59e0b"; 
    else if (game.rating > 0) ratingColor = "#ef4444"; 

    let ratingHtml = (game.rating && game.rating !== "") 
        ? `<div class="meta-row" title="Рейтинг игры на сайте Metacritic"><img src="${mcIconUrl}" style="width: 14px; height: 14px; filter: invert(1); margin: 0;"> <span style="color: ${ratingColor}; font-weight: 600;">${game.rating}/100</span></div>` 
        : `<div class="meta-row" title="У игры пока нет рейтинга на Metacritic"><img src="${mcIconUrl}" style="width: 14px; height: 14px; filter: invert(46%) sepia(14%) saturate(996%) hue-rotate(176deg) brightness(94%) contrast(88%); margin: 0;"> <span style="opacity: 0.5;">Рейтинг: tbd</span></div>`;

    let reviewHtml = game.review_link ? `<a href="${game.review_link}" target="_blank" class="action-btn" title="Открыть обзор на игру"><i class='bx bxs-message-square-detail'></i></a>` : '';
    let steamHtml = game.steam_link ? `<a href="${game.steam_link}" target="_blank" class="action-btn steam-color" title="Открыть страницу игры в Steam"><i class='bx bxl-steam'></i></a>` : '';

    let currentProgress = game.progress || 0;
    
    let progressColor;
    switch(game.play_status) {
        case 'completed': progressColor = '#10b981'; break; 
        case 'playing': progressColor = '#06b6d4'; break;   
        case 'planned': progressColor = '#f59e0b'; break;   
        case 'dropped': progressColor = '#ef4444'; break;   
        default: progressColor = '#94a3b8';                 
    }

    let cardClasses = 'kanban-card';
    if (game.play_status === 'dropped') {
        cardClasses += ' opacity-70';
    }

    // Экранируем кавычки для HTML атрибутов, чтобы скрипт не сломался, если в названии игры есть кавычка
    const escapedTitle = game.title.replace(/"/g, '&quot;').replace(/'/g, '&#39;');

    return `
        <div class="${cardClasses}">
            <div class="card-cover-wrapper">
                <div class="card-cover" style="background-image: url('${game.poster}');"></div>
                <img src="${game.poster}" style="position: absolute; width: 1px; height: 1px; opacity: 0;" onload="handleImageLoad(this)" onerror="handleImageError(this)">
                ${badgeSale}
            </div>
            
            <div class="card-body">
                <h3 class="card-title" 
                    title="${escapedTitle}" 
                    data-title="${escapedTitle}"
                    style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer;"
                    onclick="copyTitleToClipboard(this.dataset.title)"
                >${game.title}</h3>
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
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    updateSteamAvatar();
    renderBoard();
    setupStatsModal();
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

    let totalPlaytime = 0;
    let completedCount = 0;
    let playingCount = 0;
    let plannedCount = 0;
    let frozenCount = 0; // НОВАЯ ПЕРЕМЕННАЯ: для игр на паузе и заброшенных
    
    let totalRating = 0;
    let gamesWithRating = 0;
    
    let totalProgressSum = 0;

    gamesData.forEach(game => {
        if (game.play_status === 'completed') completedCount++;
        if (game.play_status === 'playing') playingCount++;
        if (game.play_status === 'planned') plannedCount++;
        
        // Считаем замороженные игры
        if (game.play_status === 'paused' || game.play_status === 'dropped') frozenCount++;

        if (game.playtime && !isNaN(parseFloat(game.playtime))) {
            totalPlaytime += parseFloat(game.playtime);
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
                            <span class="val">${completedCount}</span><span class="lbl"> / ${gamesData.length} пройдено</span>
                        </div>
                    </div>
                    <div class="main-stat-item">
                        <div class="icon-wrap orange"><i class='bx bx-time-five'></i></div>
                        <div class="stat-text">
                            <span class="val">~${Math.round(totalPlaytime)}</span><span class="lbl"> часов суммарно</span>
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
                <div class="stat-box">
                    <div class="box-icon"><i class='bx bx-archive-in'></i></div>
                    <div class="box-info">
                        <span class="box-title">Заморожено</span>
                        <span class="box-val">${frozenCount} шт.</span>
                        <span class="box-sub">На паузе или брошено</span>
                    </div>
                </div>
                <div class="stat-box highlight-box">
                    <div class="box-icon"><i class='bx bx-play-circle'></i></div>
                    <div class="box-info">
                        <span class="box-title">Сейчас играю</span>
                        <span class="box-val">${playingCount} шт.</span>
                        <span class="box-sub">В активном процессе</span>
                    </div>
                </div>
                <div class="stat-box highlight-box">
                    <div class="box-icon"><i class='bx bx-calendar-star'></i></div>
                    <div class="box-info">
                        <span class="box-title">В планах</span>
                        <span class="box-val">${plannedCount} шт.</span>
                        <span class="box-sub">Ожидают запуска</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}