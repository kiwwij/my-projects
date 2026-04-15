const tiersConfig = [
    { id: 'S', name: 'S', color: 'var(--color-s)' },
    { id: 'A', name: 'A', color: 'var(--color-a)' },
    { id: 'B', name: 'B', color: 'var(--color-b)' },
    { id: 'C', name: 'C', color: 'var(--color-c)' },
    { id: 'D', name: 'D', color: 'var(--color-d)' },
    { id: 'E', name: 'E', color: 'var(--color-e)' },
    { id: 'F', name: 'F', color: 'var(--color-f)' },
    { id: 'want', name: 'Хочу поиграть', color: 'var(--color-want)' },
    // { id: 'not', name: 'Не играл', color: 'var(--color-not)' }
];

let games = [
    {
        id: 2,
        title: "FINAL FANTASY VII REBIRTH",
        img: "https://m.media-amazon.com/images/M/MV5BMjk2MWI2NTctZjFkZS00ZWY2LWE1ZDQtZTY3MzZmNjRjMzBjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        steam: "https://store.steampowered.com/app/2909400/FINAL_FANTASY_VII_REBIRTH/",
        mc: 92,
        comment: "Отличное продолжение 1-ой части, которое раскрывает персонажей и углубляется в сюжет серии.",
        tier: "S" 
    },
    {
        id: 1,
        title: "Final Fantasy VII Remake Intergrade",
        img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1462040/library_600x900_2x.jpg",
        steam: "https://store.steampowered.com/app/1462040/FINAL_FANTASY_VII_REMAKE_INTERGRADE/",
        mc: 81,
        comment: "Моя 1-ая игра в серии игр FF, которая показала мне, что JRPG - это круто. Вся 7-ая часть финалки (ремейка) с крутой графикой, интересным сюжетом и персонажами.",
        tier: "S"
    },
    {
        id: 4,
        title: "Final Fantasy XIII",
        img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292120/library_600x900_2x.jpg",
        steam: "https://store.steampowered.com/app/292120/",
        mc: 83,
        comment: "Потонциально 2-ая любимая часть серии FF, но если бы не старовизна игры. В 1-ой части 13-ой финалки не хватает современости: переработанной механики боёв, чутка подредактированого сюжета, графики, короче ремейка.",
        tier: "A"
    },


    {
        id: 6,
        title: "LIGHTNING RETURNS™: FINAL FANTASY® XIII",
        img: "https://gh.cdn.sewest.net/assets/ident/games/lightning-returns-final-fantasy-xiii/en_GB/GamePage_Header_Portrait.jpg?quality=65&width=66%25&height=66%25",
        steam: "https://store.steampowered.com/app/345350/LIGHTNING_RETURNS_FINAL_FANTASY_XIII/",
        mc: 66,
        comment: "Не плохая саключительная часть игры, но если оценивать всю историю 13-ой финалки, то становится грустно, т.к. сюжет этой части, мягко говоря, странный.",
        tier: "B"
    },


    {
        id: 3,
        title: "Final Fantasy XV Windows Edition",
        img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/637650/library_600x900_2x.jpg",
        steam: "https://store.steampowered.com/app/637650/",
        mc: 85,
        comment: "Хорошая игра. Но мне не нравится простата сюжета, персонажи и боёвка в этой игре.",
        tier: "C" 
    },
    {
        id: 4,
        title: "FINAL FANTASY® XIII-2",
        img: "https://assets.altarofgaming.com/wp-content/uploads/2022/01/Final-Fantasy-XIII-2-poster-art-altar-of-gaming-726x1024.jpg",
        steam: "https://store.steampowered.com/app/292140/FINAL_FANTASY_XIII2/",
        mc: 79,
        comment: "Продолжение, на которые я возлогал большие надежды, т.к. очень сильно хотел увидеть там Лайтнинг, но в итоге она появляется почти в самом конце игры. А сюжет с временными петлями тяжело сделать нормальным.",
        tier: "C" 
    },


    {
        id: 7,
        title: "FINAL FANTASY XIV Online",
        img: "https://i.playground.ru/e/55ofWs3SU4OEMkJXK4Dj6A.jpeg?414x574",
        steam: "https://store.steampowered.com/app/39210/FINAL_FANTASY_XIV_Online/?curator_clanid=34459938",
        mc: 86,
        comment: "Мне ненравятся MMORPG, и эта игра не исключение.",
        tier: "E" 
    },


    {
        id: 9,
        title: "CRISIS CORE –FINAL FANTASY VII– REUNION",
        img: "https://image.api.playstation.com/vulcan/ap/rnd/202208/2505/7GhpNUWSPdoNFdMLroXaPXm8.png",
        steam: "https://store.steampowered.com/app/1608070/CRISIS_CORE_FINAL_FANTASY_VII_REUNION/?curator_clanid=34459938",
        mc: 78,
        comment: "Хочу пройти приувел к 7-ой части, чтобы узнать всю историю.",
        tier: "want"
    },
    {
        id: 10,
        title: "FINAL FANTASY XVI",
        img: "https://upload.wikimedia.org/wikipedia/ru/2/21/Final_Fantasy_XVI.png",
        steam: "https://store.steampowered.com/app/2515020/FINAL_FANTASY_XVI/?curator_clanid=34459938",
        mc: 87,
        comment: "Смотрил пару видосов про 16-ую часть, заинтересовался, хочу поиграть, чтобы понять, стоит ли оно того.",
        tier: "want"
    },
    {
        id: 8,
        title: "FINAL FANTASY VII",
        img: "https://m.media-amazon.com/images/M/MV5BOTllNGEyMTAtNmU3OS00YjAwLWFhZWItOGY0MTFiYzU1ZmFlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        steam: "https://store.steampowered.com/app/3837340/FINAL_FANTASY_VII/?curator_clanid=34459938",
        mc: 92,
        comment: "Хочу пройти оригинальную 7-ую часть, чтобы понять в чём отличия от ремейка.",
        tier: "want"
    },
    {
        id: 6,
        title: "Final Fantasy X/X-2 HD Remaster",
        img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/359870/library_600x900_2x.jpg",
        steam: "https://store.steampowered.com/app/359870/",
        mc: 92,
        comment: "Одна из лучших историй в серии с отличным вайбом, по словам игроков.",
        tier: "want"
    },
    {
        id: 11,
        title: "FINAL FANTASY IX",
        img: "ff-tier-list/ff9.jpg",
        steam: "https://store.steampowered.com/app/377840/FINAL_FANTASY_IX/",
        mc: 94,
        comment: "Вообще ничего не известно про эту чатсь.",
        tier: "want"
    },
];

let draggedGame = null;

const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
});

function updateThemeIcon(theme) {
    themeToggle.innerHTML = theme === 'dark' ? "<i class='bx bx-sun'></i>" : "<i class='bx bx-moon'></i>";
}

function initTiers() {
    const tierList = document.getElementById('tier-list');

    tiersConfig.forEach(tier => {
        const row = document.createElement('div');
        row.className = 'tier-row';
        row.innerHTML = `
            <div class="tier-label" style="background-color: ${tier.color}">${tier.name}</div>
            <div class="tier-row-content" data-tier="${tier.id}"></div>
        `;
        tierList.appendChild(row);
    });

    document.querySelectorAll('.tier-row-content').forEach(container => {
        container.addEventListener('dragover', e => e.preventDefault());
        container.addEventListener('drop', handleDrop);
    });
}

function renderGames() {
    document.querySelectorAll('.tier-row-content').forEach(c => c.innerHTML = '');
    
    games.forEach(game => {
        const el = document.createElement('div');
        el.className = 'game-item';
        el.draggable = true;
        el.dataset.id = game.id;
        
        el.innerHTML = `
            <div class="skeleton"></div>
            <img src="${game.img}" alt="${game.title}" loading="lazy">
        `;

        el.querySelector('img').onload = function() {
            this.classList.add('loaded');
        };

        el.addEventListener('dragstart', () => {
            draggedGame = game;
            el.classList.add('dragging');
        });
        
        el.addEventListener('dragend', () => el.classList.remove('dragging'));
        el.addEventListener('click', () => openModal(game));

        const container = document.querySelector(`[data-tier="${game.tier}"]`);
        if(container) container.appendChild(el);
    });
}

function handleDrop(e) {
    e.preventDefault();
    const targetTier = e.target.closest('.tier-row-content').dataset.tier;
    if (draggedGame && targetTier) {
        draggedGame.tier = targetTier;
        renderGames();
    }
}

const modal = document.getElementById('modal');

function openModal(game) {
    document.getElementById('modal-title').textContent = game.title;
    document.getElementById('modal-score').textContent = game.mc;
    document.getElementById('modal-steam').href = game.steam;
    document.getElementById('modal-desc').textContent = game.comment || "Нет комментариев.";
    
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
}

document.getElementById('close-modal').addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

document.getElementById('export-btn').addEventListener('click', () => {
    const exportData = games.map(g => ({ id: g.id, tier: g.tier }));
    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = "my_ff_tier_list.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

document.getElementById('import-btn').addEventListener('click', () => {
    document.getElementById('import-file').click();
});

document.getElementById('import-file').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const importedData = JSON.parse(event.target.result);
            
            importedData.forEach(importedItem => {
                const gameIndex = games.findIndex(g => g.id === importedItem.id);
                if (gameIndex !== -1) {
                    games[gameIndex].tier = importedItem.tier;
                }
            });
            
            renderGames();
            e.target.value = ''; 
        } catch (error) {
            alert('Ошибка при чтении файла. Убедитесь, что это корректный JSON.');
        }
    };
    reader.readAsText(file);
});

initTiers();
renderGames();