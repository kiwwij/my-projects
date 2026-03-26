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

    const board = document.getElementById('kanban-board');
    const statsContainer = document.getElementById('quick-stats');
    board.innerHTML = '';

    let totalGames = gamesData.length;
    let playingCount = gamesData.filter(g => g.play_status === 'playing').length;
    let totalValue = 0;

    let pausedGames = gamesData.filter(g => g.play_status === 'paused');
    let changedMindGames = gamesData.filter(g => g.play_status === 'changed_mind');

    gamesData.forEach(game => {
        if (game.price_uah > 0) totalValue += game.price_uah;
    });

    let pausedListHtml = pausedGames.map(g => `<div class="hover-item">${g.title}</div>`).join('');
    let changedMindListHtml = changedMindGames.map(g => `<div class="hover-item">${g.title}</div>`).join('');

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
            badgeSale = `<div class="card-badge badge-sale">-${game.discount_percent}%</div>`;
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
    
    let priceHtml = `<div class="meta-row" title="Базовая стоимость игры в Steam"><i class='bx bx-purchase-tag'></i> ${priceDisplay}</div>`;
    
    let mcIconUrl = "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/metacritic-v4mt6kt4i7dvc1ouf1yu5.png/metacritic-ftfgubcsl0406bwla6utd4u.png?_a=DATAiZAAZAA0";
    
    let ratingColor = "#94a3b8"; 
    if (game.rating >= 75) ratingColor = "#10b981"; 
    else if (game.rating >= 50) ratingColor = "#f59e0b"; 
    else if (game.rating > 0) ratingColor = "#ef4444"; 

    let ratingHtml = (game.rating && game.rating !== "") 
        ? `<div class="meta-row" title="Рейтинг игры на сайте Metacritic"><img src="${mcIconUrl}" style="width: 14px; height: 14px; filter: invert(1);"> <span style="color: ${ratingColor}; font-weight: 600;">${game.rating}/100</span></div>` 
        : `<div class="meta-row" title="У игры пока нет рейтинга на Metacritic"><img src="${mcIconUrl}" style="width: 14px; height: 14px; filter: invert(1) opacity(0.5);"> <span style="opacity: 0.5;">Рейтинг: tbd</span></div>`;

    let reviewHtml = game.review_link ? `<a href="${game.review_link}" target="_blank" class="action-btn" title="Открыть обзор на игру"><i class='bx bxs-message-square-detail'></i></a>` : '';
    let steamHtml = game.steam_link ? `<a href="${game.steam_link}" target="_blank" class="action-btn steam-color" title="Открыть страницу игры в Steam"><i class='bx bxl-steam'></i></a>` : '';

    let currentProgress = game.progress || 0;
    let progressColor = currentProgress === 100 ? '#10b981' : '#06b6d4';

    return `
        <div class="kanban-card">
            <div class="card-cover-wrapper">
                <div class="card-cover" style="background-image: url('${game.poster}');"></div>
                <img src="${game.poster}" style="position: absolute; width: 1px; height: 1px; opacity: 0;" onload="handleImageLoad(this)" onerror="handleImageError(this)">
                ${badgeSale}
            </div>
            
            <div class="card-body">
                <h3 class="card-title">${game.title}</h3>
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
});