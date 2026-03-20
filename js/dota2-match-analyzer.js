const API_URL = "https://api.opendota.com/api";
const CDN_URL = "https://cdn.cloudflare.steamstatic.com";
const RANK_ICON_URL = "https://www.opendota.com/assets/images/dota2/rank_icons/";

let heroesRef = {};
let itemById = {}; 
let currentUserId = null;
let currentOffset = 0;
let leaderboardLoaded = false; // Флаг загрузки лидерборда

// Инициализация
async function init() {
    try {
        const [heroesRes, itemsRes] = await Promise.all([
            fetch(`${API_URL}/constants/heroes`),
            fetch(`${API_URL}/constants/items`)
        ]);
        heroesRef = await heroesRes.json();
        const itemsData = await itemsRes.json();
        for (const key in itemsData) {
            if (itemsData[key].id) itemById[itemsData[key].id] = itemsData[key];
        }
    } catch (e) { console.error("Initialization failed", e); }
}
init();

function timeAgo(timestamp) {
    if (!timestamp) return 'Never';
    const seconds = Math.floor((new Date() - timestamp * 1000) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return interval + "y ago";
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return interval + "mo ago";
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + "d ago";
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + "h ago";
    return "Recently";
}

// === Обновленное управление вкладками ===
window.switchTab = function(tabName) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(`tab-${tabName}`).classList.add('active');
    
    const btns = document.querySelectorAll('.tab-btn');
    btns[0].classList.toggle('active', tabName === 'matches');
    btns[1].classList.toggle('active', tabName === 'heroes');
    btns[2].classList.toggle('active', tabName === 'peers');
    btns[3].classList.toggle('active', tabName === 'leaderboard');

    // Загружаем лидерборд только при первом открытии вкладки
    if (tabName === 'leaderboard' && !leaderboardLoaded) {
        loadLeaderboard();
    }
}

// === НОВОЕ: Загрузка Топ Игроков ===
async function loadLeaderboard() {
    const tbody = document.getElementById('leaderboardTableBody');
    try {
        const res = await fetch(`${API_URL}/proPlayers`);
        const players = await res.json();
        tbody.innerHTML = '';
        
        // Берем топ-50
        players.slice(0, 50).forEach(p => {
            const teamName = p.team_name || '<i class="text-muted">No Team</i>';
            const country = p.loccountrycode ? `<img src="https://flagcdn.com/16x12/${p.loccountrycode.toLowerCase()}.png" alt="${p.loccountrycode}"> ${p.loccountrycode}` : 'Unknown';
            const avatar = p.avatar || 'https://steamuserimages-a.akamaihd.net/ugc/868480752636431336/1D2881C5C9B3AD28A1D8852903A8F9E1FF45C2C8/';
            
            tbody.innerHTML += `
                <tr onclick="analyzeFromMatch('${p.account_id}')" title="Analyze ${p.name}">
                    <td>
                        <div class="hero-cell">
                            <img src="${avatar}" class="avatar-small" style="object-fit:cover;">
                            <span class="fw-500 text-white">${p.name}</span>
                            <i class='bx bx-search-alt-2 player-search-icon'></i>
                        </div>
                    </td>
                    <td class="text-muted">${teamName}</td>
                    <td class="text-muted font-rajdhani text-lg">${country}</td>
                </tr>
            `;
        });
        leaderboardLoaded = true;
    } catch (e) {
        tbody.innerHTML = '<tr><td colspan="3" class="text-loss text-center">Failed to load pro players.</td></tr>';
    }
}

async function fullAnalysis() {
    const idInput = document.getElementById('playerIdInput');
    const id = idInput.value.trim();
    if (!id) return showError("Please enter a Steam ID.", "Empty Input");

    currentUserId = id;
    currentOffset = 0;

    document.getElementById('loader').classList.remove('hidden');
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('privacyWarning').style.display = 'none';
    document.getElementById('matchesGrid').innerHTML = "";
    
    switchTab('matches');

    try {
        const [profileRes, wlRes, heroesRes, peersRes, totalsRes, recentRes] = await Promise.all([
            fetch(`${API_URL}/players/${id}`), fetch(`${API_URL}/players/${id}/wl`),
            fetch(`${API_URL}/players/${id}/heroes`), fetch(`${API_URL}/players/${id}/peers`),
            fetch(`${API_URL}/players/${id}/totals`), fetch(`${API_URL}/players/${id}/recentMatches`)
        ]);

        const profile = await profileRes.json();
        if (profile.error || !profile.profile) {
            document.getElementById('loader').classList.add('hidden');
            return showError("Player not found or profile is private.", "Search Error");
        }

        const [wl, playerHeroes, peers, totals, recentMatches] = await Promise.all([
            wlRes.json(), heroesRes.json(), peersRes.json(), totalsRes.json(), recentRes.json()
        ]);

        if ((wl.win + wl.lose) < 20) document.getElementById('privacyWarning').style.display = 'flex';

        renderHeader(profile, wl);
        updateBannerBackground(playerHeroes);
        renderHeroesTable(playerHeroes);
        renderPeersTable(peers);
        renderTotals(totals);
        renderRecentForm(recentMatches);

        await loadMoreMatches();
        document.getElementById('dashboard').classList.remove('hidden');

    } catch (e) {
        showError("Failed to fetch data.", "API Error");
    } finally {
        document.getElementById('loader').classList.add('hidden');
    }
}

function updateBannerBackground(playerHeroes) {
    const sortedHeroes = playerHeroes.sort((a, b) => b.games - a.games);
    if (sortedHeroes.length > 0) {
        const bestHeroStat = sortedHeroes[0];
        const heroData = heroesRef[bestHeroStat.hero_id];
        if (heroData) {
            const heroNameShort = heroData.name.replace('npc_dota_hero_', '');
            const bgUrl = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroNameShort}.png`;
            const overlay = document.querySelector('.ph-bg-overlay');
            overlay.style.backgroundImage = `url('${bgUrl}')`;
        }
    }
}

window.analyzeFromMatch = function(accountId) {
    closeMatchModal();
    document.getElementById('playerIdInput').value = accountId;
    fullAnalysis();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.openMatchDetails = async function(matchId) {
    const modal = document.getElementById('matchModal');
    const loader = document.getElementById('matchLoader');
    const scoreboard = document.getElementById('matchScoreboard');
    
    // Сбрасываем скролл модалки вверх при открытии нового матча
    document.querySelector('.match-modal-body').scrollTop = 0;
    
    modal.classList.remove('hidden');
    loader.classList.remove('hidden');
    scoreboard.innerHTML = '';
    document.getElementById('matchModalTitle').innerText = `Match ${matchId}`;
    document.getElementById('matchModalSubtitle').innerText = '';

    try {
        const res = await fetch(`${API_URL}/matches/${matchId}`);
        const match = await res.json();
        
        const duration = `${Math.floor(match.duration / 60)}:${(match.duration % 60).toString().padStart(2, '0')}`;
        const winner = match.radiant_win ? "<span class='text-win fw-600'>Radiant Victory</span>" : "<span class='text-loss fw-600'>Dire Victory</span>";
        document.getElementById('matchModalSubtitle').innerHTML = `${winner} <span style="margin: 0 8px">•</span> ${duration} <span style="margin: 0 8px">•</span> ${match.game_mode === 23 ? 'Turbo' : 'Ranked/Normal'}`;

        scoreboard.innerHTML = renderTeamTable(match.players.filter(p => p.isRadiant), 'Radiant', 'var(--win)') + 
                               renderTeamTable(match.players.filter(p => !p.isRadiant), 'Dire', 'var(--loss)');

    } catch (e) {
        scoreboard.innerHTML = '<p class="text-loss" style="text-align:center; padding: 20px;">Failed to load details.</p>';
    } finally {
        loader.classList.add('hidden');
    }
}

window.closeMatchModal = function() {
    document.getElementById('matchModal').classList.add('hidden');
}

function renderTeamTable(players, teamName, color) {
    let html = `
        <div class="team-header" style="border-left: 3px solid ${color}">
            <h3 style="color: ${color}; margin: 0;">${teamName}</h3>
        </div>
        <div class="table-responsive">
        <table class="data-table scoreboard-table">
            <thead>
                <tr>
                    <th>Player</th>
                    <th>Lvl</th>
                    <th>K / D / A</th>
                    <th>Net</th>
                    <th>GPM/XPM</th>
                    <th>Dmg</th>
                    <th>Items</th>
                </tr>
            </thead>
            <tbody>
    `;

    players.forEach(p => {
        const hero = heroesRef[p.hero_id] || {};
        const isTargetUser = p.account_id && p.account_id.toString() === currentUserId;
        
        const hasAccount = p.account_id ? true : false;
        const rowClass = isTargetUser ? 'target-user-row' : (hasAccount ? 'clickable-player-row' : 'anon-player-row');
        const clickAction = hasAccount ? `onclick="analyzeFromMatch('${p.account_id}')"` : '';
        const nameDisplay = p.personaname ? p.personaname : '<i class="text-muted">Anonymous</i>';
        const searchIcon = hasAccount && !isTargetUser ? `<i class='bx bx-search-alt-2 player-search-icon'></i>` : '';

        const itemIds = [p.item_0, p.item_1, p.item_2, p.item_3, p.item_4, p.item_5, p.item_neutral];
        let itemsHtml = '<div class="items-row">';
        itemIds.forEach((itemId, idx) => {
            const isNeutral = idx === 6;
            if (itemId && itemById[itemId]) {
                const itemImg = `${CDN_URL}${itemById[itemId].img}`;
                itemsHtml += `<img src="${itemImg}" class="item-icon ${isNeutral ? 'neutral-item' : ''}" title="${itemById[itemId].dname}">`;
            } else {
                itemsHtml += `<div class="item-icon empty-item ${isNeutral ? 'neutral-item' : ''}"></div>`;
            }
        });
        itemsHtml += '</div>';

        html += `
            <tr class="${rowClass}" ${clickAction} title="${hasAccount ? 'Click to analyze player' : 'Private Profile'}">
                <td>
                    <div class="hero-cell">
                        <img src="${CDN_URL}${hero.img}" alt="hero" class="hero-icon-small">
                        <div class="player-name-wrap" style="max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                            <span class="hero-name" style="color: ${isTargetUser ? '#fff' : 'inherit'}">${nameDisplay}</span>
                            ${searchIcon}
                        </div>
                    </div>
                </td>
                <td class="fw-600 text-muted">${p.level}</td>
                <td class="font-rajdhani fw-600">
                    <span class="text-white">${p.kills}</span> / <span class="text-loss">${p.deaths}</span> / <span class="text-muted">${p.assists}</span>
                </td>
                <td style="color:#FFD700">${(p.net_worth / 1000).toFixed(1)}k</td>
                <td class="text-muted">${p.gold_per_min}<span style="opacity:0.4">/</span>${p.xp_per_min}</td>
                <td class="text-muted">${(p.hero_damage / 1000).toFixed(1)}k</td>
                <td>${itemsHtml}</td>
            </tr>
        `;
    });

    html += `</tbody></table></div>`;
    return html;
}

function renderTotals(totals) {
    const container = document.getElementById('lifetimeStats');
    container.innerHTML = "";
    const fields = [
        {k:'kills', l:'Kills'}, {k:'deaths', l:'Deaths'}, {k:'assists', l:'Assists'},
        {k:'gold_per_min', l:'GPM'}, {k:'xp_per_min', l:'XPM'}, {k:'last_hits', l:'Last Hits'},
        {k:'hero_damage', l:'Hero Dmg'}, {k:'hero_healing', l:'Healing'}, {k:'tower_damage', l:'Tower Dmg'}
    ];
    fields.forEach(f => {
        const item = totals.find(t => t.field === f.k);
        let val = '-';
        if (item && item.n > 0) {
            const avg = item.sum / item.n;
            val = avg > 1000 ? (avg/1000).toFixed(1) + 'k' : Math.floor(avg);
        }
        container.innerHTML += `<div class="ds-item"><span class="text-muted text-sm">${f.l}</span><span class="ds-val">${val}</span></div>`;
    });
}

function renderRecentForm(recent) {
    const container = document.getElementById('recentStats');
    if (!recent || recent.length === 0) {
        container.innerHTML = "<div class='ds-item'><span class='text-muted'>No data</span></div>";
        return;
    }
    let wins = 0, kills = 0, deaths = 0, assists = 0, gpm = 0;
    recent.forEach(m => {
        const isRadiant = m.player_slot <= 127;
        if ((isRadiant && m.radiant_win) || (!isRadiant && !m.radiant_win)) wins++;
        kills += m.kills; deaths += m.deaths; assists += m.assists; gpm += m.gold_per_min;
    });
    const total = recent.length;
    const wr = ((wins / total) * 100).toFixed(0);
    const wrColor = wr >= 50 ? 'var(--win)' : 'var(--loss)';
    
    container.innerHTML = `
        <div class="ds-item"><span class="text-muted text-sm">Winrate</span><span class="ds-val" style="color:${wrColor}">${wr}% <span class="text-xs text-muted">(${wins}-${total-wins})</span></span></div>
        <div class="ds-item"><span class="text-muted text-sm">Avg KDA</span><span class="ds-val">${(kills/total).toFixed(1)} / ${(deaths/total).toFixed(1)} / ${(assists/total).toFixed(1)}</span></div>
        <div class="ds-item"><span class="text-muted text-sm">Avg GPM</span><span class="ds-val">${(gpm/total).toFixed(0)}</span></div>
    `;
}

function renderHeader(data, wl) {
    const p = data.profile;
    document.getElementById('avatar').src = p.avatarfull;
    document.getElementById('personaName').innerText = p.personaname;
    document.getElementById('steamLink').href = p.profileurl;
    renderRank(data.rank_tier);
    document.getElementById('headerWins').innerText = wl.win;
    document.getElementById('headerLosses').innerText = wl.lose;
    const wr = wl.win + wl.lose > 0 ? ((wl.win / (wl.win + wl.lose)) * 100).toFixed(1) : 0;
    document.getElementById('headerWinrate').innerText = `${wr}%`;
    document.getElementById('headerWinrate').className = `ph-val ${wr >= 50 ? 'text-win' : 'text-loss'}`;
}

function renderRank(tier) {
    const container = document.getElementById('rankContainer');
    container.innerHTML = "";
    if(!tier) return;
    const rankNum = Math.floor(tier / 10);
    const stars = tier % 10;
    container.innerHTML = `
        <img src="${RANK_ICON_URL}rank_icon_${rankNum}.png" class="rank-medal">
        ${stars > 0 ? `<img src="${RANK_ICON_URL}rank_star_${stars}.png" class="rank-star">` : ''}
    `;
}

window.loadPeer = function(peerId) {
    document.getElementById('playerIdInput').value = peerId;
    fullAnalysis();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderPeersTable(peers) {
    const tbody = document.getElementById('peersTableBody');
    tbody.innerHTML = "";
    peers.slice(0, 15).forEach(peer => {
        const wr = ((peer.win / peer.games) * 100).toFixed(1);
        const winClass = wr >= 50 ? 'text-win' : 'text-loss';
        tbody.innerHTML += `
            <tr onclick="loadPeer('${peer.account_id}')" title="Analyze ${peer.personaname}">
                <td><div class="hero-cell"><img src="${peer.avatar}" class="avatar-small"><span class="fw-500 text-white">${peer.personaname}</span><i class='bx bx-search-alt-2 player-search-icon'></i></div></td>
                <td>${peer.games}</td>
                <td><span class="${winClass} fw-600">${wr}%</span></td>
            </tr>`;
    });
}

window.showError = function(msg, title = "Error") {
    document.getElementById('errorTitle').innerText = title;
    document.getElementById('errorMessage').innerText = msg;
    document.getElementById('errorModal').classList.remove('hidden');
}
window.closeError = function() { document.getElementById('errorModal').classList.add('hidden'); }

function renderHeroesTable(playerHeroes) {
    const tbody = document.getElementById('heroesTableBody');
    tbody.innerHTML = "";
    playerHeroes.filter(h => h.games > 0).forEach(ph => {
        const heroBase = heroesRef[ph.hero_id]; 
        if(!heroBase) return;
        const winrate = ((ph.win / ph.games) * 100).toFixed(1);
        const winClass = winrate >= 50 ? 'bg-win' : 'bg-loss';
        const textClass = winrate >= 50 ? 'text-win' : 'text-muted';
        
        tbody.innerHTML += `
            <tr>
                <td>
                    <div class="hero-cell">
                        <img src="${CDN_URL}${heroBase.img}" class="hero-icon">
                        <span class="fw-500 text-white">${heroBase.localized_name}</span>
                    </div>
                </td>
                <td class="fw-600">${ph.games}</td>
                <td>
                    <div class="fw-600 ${textClass}" style="margin-bottom: 4px;">${winrate}%</div>
                    <div class="progress-bar"><div class="progress-fill ${winClass}" style="width:${winrate}%"></div></div>
                </td>
                <td class="text-muted text-sm">${timeAgo(ph.last_played)}</td>
            </tr>
        `;
    });
}

async function loadMoreMatches() {
    const btn = document.getElementById('loadMoreBtn');
    btn.innerText = "Loading...";
    const res = await fetch(`${API_URL}/players/${currentUserId}/matches?limit=20&offset=${currentOffset}`);
    const matches = await res.json();
    const container = document.getElementById('matchesGrid');
    
    if(matches.length === 0) {
        btn.innerText = "No More Data"; btn.disabled = true; return;
    }

    matches.forEach(m => {
        const hero = heroesRef[m.hero_id] || {};
        const isRadiant = m.player_slot <= 127;
        const isWin = (isRadiant && m.radiant_win) || (!isRadiant && !m.radiant_win);
        const duration = `${Math.floor(m.duration / 60)}:${(m.duration % 60).toString().padStart(2, '0')}`;
        
        container.innerHTML += `
            <div class="match-card ${isWin ? 'border-win' : 'border-loss'}" onclick="openMatchDetails(${m.match_id})">
                <div class="match-card-hero">
                    <img src="${CDN_URL}${hero.img}" class="hero-icon">
                    <div>
                        <div class="fw-600 text-white">${hero.localized_name || 'Unknown'}</div>
                        <div class="text-xs text-muted">${timeAgo(m.start_time)}</div>
                    </div>
                </div>
                <div class="match-card-stats font-rajdhani text-lg">
                    <span class="text-white">${m.kills}</span> / <span class="text-loss">${m.deaths}</span> / <span class="text-muted">${m.assists}</span>
                </div>
                <div class="match-card-result">
                    <div class="text-xs text-muted mb-1">${duration}</div>
                    <div class="fw-700 ${isWin ? 'text-win' : 'text-loss'}">${isWin ? 'WIN' : 'LOSS'}</div>
                </div>
            </div>
        `;
    });
    currentOffset += 20;
    btn.innerText = "Load More History";
}