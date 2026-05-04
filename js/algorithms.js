const dict = {
    ru: {
        title: "Битва Алгоритмов",
        desc: "Анимация алгоритмической битвы за территорию, где 8 стратегий соревнуются за доминирование на сетке.",
        start: "Начать",
        pause: "Пауза",
        reset: "Сброс",
        speed: "Скорость",
        size: "Размер сетки",
        shape: "Форма поля",
        square: "Квадратная",
        circle: "Круглая",
        blocks: "бл.",
        algos: {
            greedy: { name: "Жадный", desc: "Ближайшая пустая клетка" },
            spiral: { name: "Спираль", desc: "Движение по часовой стрелке" },
            mimic: { name: "Подражатель", desc: "Копирует лидера" },
            random: { name: "Случайный", desc: "Абсолютный хаос" },
            hunter: { name: "Охотник", desc: "Преследует врага" },
            explorer: { name: "Странник", desc: "Прямолинейный маршрут" },
            expander: { name: "Экспансер", desc: "Равномерное расширение" },
            defender: { name: "Защитник", desc: "Укрепляет свои границы" }
        }
    },
    en: {
        title: "Arena War",
        desc: "An algorithmic territory war simulation where 8 distinct strategies compete for grid dominance.",
        start: "Start",
        pause: "Pause",
        reset: "Reset",
        speed: "Speed",
        size: "Grid Size",
        shape: "Shape",
        square: "Square",
        circle: "Circle",
        blocks: "bl.",
        algos: {
            greedy: { name: "Greedy", desc: "Nearest empty cell" },
            spiral: { name: "Spiral", desc: "Clockwise sweep" },
            mimic: { name: "Mimic", desc: "Copy leading strategy" },
            random: { name: "Random", desc: "Pure chaos" },
            hunter: { name: "Hunter", desc: "Chase nearest enemy" },
            explorer: { name: "Explorer", desc: "Straight line routing" },
            expander: { name: "Expander", desc: "Uniform expansion" },
            defender: { name: "Defender", desc: "Fortifies own borders" }
        }
    }
};

let currentLang = localStorage.getItem('lang') || 'dark';
if (currentLang !== 'ru' && currentLang !== 'en') currentLang = 'ru';

let currentTheme = localStorage.getItem('theme') || 'dark';

const canvas = document.getElementById('arenaCanvas');
const ctx = canvas.getContext('2d');

let gridSize = 50; 
let grid = [];
let totalPlayableCells = 0;
let isRunning = false;
let hasStarted = false;
let simTimer;
let algorithms = [];

function initUI() {
    document.body.setAttribute('data-theme', currentTheme);
    
    document.getElementById('themeToggle').addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        document.body.setAttribute('data-theme', currentTheme);
        drawGrid();
    });

    document.getElementById('langToggle').addEventListener('click', () => {
        currentLang = currentLang === 'ru' ? 'en' : 'ru';
        localStorage.setItem('lang', currentLang);
        updateTexts();
    });

    document.getElementById('startBtn').addEventListener('click', toggleSim);
    document.getElementById('resetBtn').addEventListener('click', resetSim);
    
    document.getElementById('sizeCtrl').addEventListener('change', resetSim);
    document.getElementById('shapeCtrl').addEventListener('change', resetSim);

    setTimeout(() => {
        document.getElementById('canvasSkeleton').style.display = 'none';
        canvas.style.display = 'block';
        updateTexts();
        resetSim();
        resizeCanvas();
    }, 500);

    window.addEventListener('resize', resizeCanvas);
}

function updateTexts() {
    const t = dict[currentLang];
    document.getElementById('titleText').innerText = t.title;
    document.getElementById('descText').innerText = t.desc;
    document.getElementById('startText').innerText = isRunning ? t.pause : t.start;
    document.getElementById('resetText').innerText = t.reset;
    
    document.getElementById('speedLabel').innerText = t.speed;
    document.getElementById('sizeLabel').innerText = t.size;
    document.getElementById('shapeLabel').innerText = t.shape;
    document.getElementById('optSquare').innerText = t.square;
    document.getElementById('optCircle').innerText = t.circle;
    
    renderLeaderboard(false);
}

function resizeCanvas() {
    const wrapper = document.querySelector('.canvas-wrapper');
    canvas.width = wrapper.clientWidth;
    canvas.height = wrapper.clientHeight;
    drawGrid();
}

function initGrid() {
    gridSize = parseInt(document.getElementById('sizeCtrl').value);
    grid = Array(gridSize).fill().map(() => Array(gridSize).fill(null));
    totalPlayableCells = 0;
    
    const shape = document.getElementById('shapeCtrl').value;
    const center = gridSize / 2;
    const radius = gridSize / 2 - 0.5;

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (shape === 'circle') {
                const dx = x - center + 0.5;
                const dy = y - center + 0.5;
                if (dx * dx + dy * dy > radius * radius) {
                    grid[y][x] = 'wall';
                } else {
                    totalPlayableCells++;
                }
            } else {
                totalPlayableCells++;
            }
        }
    }
}

function findValidStart(targetX, targetY) {
    let bestCell = null;
    let minDist = Infinity;
    for(let y = 0; y < gridSize; y++){
        for(let x = 0; x < gridSize; x++){
            if(grid[y][x] === null) {
                let d = Math.abs(x - targetX) + Math.abs(y - targetY);
                if(d < minDist) {
                    minDist = d;
                    bestCell = {x, y};
                }
            }
        }
    }
    return bestCell || {x: Math.floor(gridSize/2), y: Math.floor(gridSize/2)};
}

function initLeaderboardDOM() {
    const board = document.getElementById('leaderboard');
    if (!board) return;
    board.innerHTML = '';
    const rowHeight = 72; 
    board.style.height = (algorithms.length * rowHeight) + 'px';

    algorithms.forEach(algo => {
        const row = document.createElement('div');
        row.className = 'stat-row';
        row.id = `row-${algo.id}`;
        board.appendChild(row);
    });
}

function resetSim() {
    clearTimeout(simTimer);
    isRunning = false;
    hasStarted = false;
    
    document.getElementById('sizeCtrl').disabled = false;
    document.getElementById('shapeCtrl').disabled = false;
    
    updateTexts();
    initGrid();
    
    let starts = [
        findValidStart(0, 0),
        findValidStart(gridSize - 1, 0),
        findValidStart(0, gridSize - 1),
        findValidStart(gridSize - 1, gridSize - 1),
        findValidStart(Math.floor(gridSize / 2), 0),
        findValidStart(Math.floor(gridSize / 2), gridSize - 1),
        findValidStart(0, Math.floor(gridSize / 2)),
        findValidStart(gridSize - 1, Math.floor(gridSize / 2))
    ];

    algorithms = [
        { id: 'greedy', x: starts[0].x, y: starts[0].y, count: 1, logic: runGreedy },
        { id: 'spiral', x: starts[1].x, y: starts[1].y, count: 1, logic: runSpiral, dir: 0 },
        { id: 'mimic',  x: starts[2].x, y: starts[2].y, count: 1, logic: runMimic },
        { id: 'random', x: starts[3].x, y: starts[3].y, count: 1, logic: runRandom },
        { id: 'hunter', x: starts[4].x, y: starts[4].y, count: 1, logic: runHunter },
        { id: 'explorer', x: starts[5].x, y: starts[5].y, count: 1, logic: runExplorer, dir: 0 },
        { id: 'expander', x: starts[6].x, y: starts[6].y, count: 1, logic: runExpander },
        { id: 'defender', x: starts[7].x, y: starts[7].y, count: 1, logic: runDefender }
    ];

    algorithms.forEach(a => {
        grid[a.y][a.x] = a.id;
        a.frontier = getNeighbors(a.x, a.y);
    });

    initLeaderboardDOM();
    renderLeaderboard(false);
    drawGrid();
}

function getNeighbors(x, y) {
    const dirs = [[0,-1], [1,0], [0,1], [-1,0]];
    const n = [];
    for(let d of dirs) {
        let nx = x + d[0], ny = y + d[1];
        if(nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize && grid[ny][nx] === null) {
            n.push({x: nx, y: ny});
        }
    }
    return n;
}

function updateFrontier(algo) {
    let newF = [];
    for (let f of algo.frontier) {
        if (grid[f.y][f.x] === null) newF.push(f);
    }
    algo.frontier = newF;
}

function runGreedy(algo) {
    if (algo.frontier.length === 0) return;
    algo.frontier.sort((a, b) => {
        let d1 = Math.abs(a.x - gridSize/2) + Math.abs(a.y - gridSize/2);
        let d2 = Math.abs(b.x - gridSize/2) + Math.abs(b.y - gridSize/2);
        return d1 - d2;
    });
    capture(algo, algo.frontier[0]);
}

function runSpiral(algo) {
    if (algo.frontier.length === 0) return;
    const dirs = [[1,0], [0,1], [-1,0], [0,-1]];
    let {x, y} = algo;
    let nx = x + dirs[algo.dir][0];
    let ny = y + dirs[algo.dir][1];
    
    if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize && grid[ny][nx] === null) {
        capture(algo, {x: nx, y: ny});
        algo.x = nx; algo.y = ny;
    } else {
        algo.dir = (algo.dir + 1) % 4;
        runGreedy(algo);
    }
}

function runRandom(algo) {
    if (algo.frontier.length === 0) return;
    let r = Math.floor(Math.random() * algo.frontier.length);
    capture(algo, algo.frontier[r]);
}

function runMimic(algo) {
    let leader = algorithms.reduce((max, a) => a.count > max.count && a.id !== 'mimic' ? a : max, algorithms[0]);
    if(leader.id === 'spiral') runSpiral(algo);
    else if(leader.id === 'hunter') runHunter(algo);
    else if(leader.id === 'explorer') runExplorer(algo);
    else if(leader.id === 'expander') runExpander(algo);
    else if(leader.id === 'defender') runDefender(algo);
    else runRandom(algo);
}

function runHunter(algo) {
    if (algo.frontier.length === 0) return;
    algo.frontier.sort((a, b) => a.x - b.x);
    capture(algo, algo.frontier[0]);
}

function runExplorer(algo) {
    if (algo.frontier.length === 0) return;
    const dirs = [[1,0], [0,1], [-1,0], [0,-1]];
    let {x, y} = algo;
    let nx = x + dirs[algo.dir][0];
    let ny = y + dirs[algo.dir][1];
    
    if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize && grid[ny][nx] === null) {
        capture(algo, {x: nx, y: ny});
        algo.x = nx; algo.y = ny;
    } else {
        algo.dir = Math.floor(Math.random() * 4);
        runGreedy(algo);
    }
}

function runExpander(algo) {
    if (algo.frontier.length === 0) return;
    capture(algo, algo.frontier[0]);
}

function runDefender(algo) {
    if (algo.frontier.length === 0) return;
    algo.frontier.sort((a, b) => {
        return countFriendlyNeighbors(b.x, b.y, algo.id) - countFriendlyNeighbors(a.x, a.y, algo.id);
    });
    capture(algo, algo.frontier[0]);
}

function countFriendlyNeighbors(x, y, id) {
    const dirs = [[0,-1], [1,0], [0,1], [-1,0]];
    let c = 0;
    for(let d of dirs) {
        let nx = x + d[0], ny = y + d[1];
        if(nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize && grid[ny][nx] === id) c++;
    }
    return c;
}

function capture(algo, cell) {
    grid[cell.y][cell.x] = algo.id;
    algo.count++;
    let n = getNeighbors(cell.x, cell.y);
    algo.frontier.push(...n);
    updateFrontier(algo);
}

function drawGrid() {
    if (grid.length === 0 || !grid[0]) return; 
    const cw = canvas.width;
    const ch = canvas.height;
    const cellW = cw / gridSize;
    const cellH = ch / gridSize;

    const computedStyles = getComputedStyle(document.body);
    
    ctx.fillStyle = computedStyles.getPropertyValue('--border-color').trim();
    ctx.fillRect(0, 0, cw, ch);
    
    const surfaceColor = computedStyles.getPropertyValue('--surface-color').trim();
    const bgColor = computedStyles.getPropertyValue('--bg-color').trim();

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (grid[y][x] === 'wall') {
                ctx.fillStyle = surfaceColor;
                ctx.fillRect(x * cellW, y * cellH, cellW + 1, cellH + 1); 
            } else {
                if (grid[y][x] === null) {
                    ctx.fillStyle = bgColor;
                } else {
                    ctx.fillStyle = computedStyles.getPropertyValue(`--c-${grid[y][x]}`).trim();
                }
                ctx.fillRect(x * cellW + 0.5, y * cellH + 0.5, cellW - 1, cellH - 1);
            }
        }
    }
}

function renderLeaderboard(isFinished = false) {
    const t = dict[currentLang];
    let sorted = [...algorithms].sort((a, b) => b.count - a.count);
    const rowHeight = 72;

    sorted.forEach((algo, index) => {
        const row = document.getElementById(`row-${algo.id}`);
        if (!row) return;

        let percent = totalPlayableCells > 0 ? ((algo.count / totalPlayableCells) * 100).toFixed(1) : 0;
        
        row.innerHTML = `
            <div class="stat-info">
                <div class="color-box" style="background-color: var(--c-${algo.id})"></div>
                <div>
                    <div class="stat-name">${t.algos[algo.id].name}</div>
                    <div class="stat-desc">${t.algos[algo.id].desc}</div>
                </div>
            </div>
            <div class="stat-results">
                <div class="stat-blocks">${algo.count} ${t.blocks}</div>
                <div class="stat-percent">${percent}%</div>
            </div>
        `;
        
        row.style.transform = `translateY(${index * rowHeight}px)`;

        if (isFinished && index === 0) {
            row.classList.add('winner');
            row.style.setProperty('--winner-color', `var(--c-${algo.id})`);
        } else {
            row.classList.remove('winner');
        }
    });
}

function step() {
    let active = false;
    let speed = parseInt(document.getElementById('speedCtrl').value);
    
    let iterations = Math.floor(speed / 20) || 1; 

    for (let i = 0; i < iterations; i++) {
        algorithms.forEach(a => {
            if (a.frontier.length > 0) {
                a.logic(a);
                active = true;
            }
        });
    }

    drawGrid();
    if(Math.random() < 0.2) renderLeaderboard(false);

    if (active && isRunning) {
        let delay = Math.max(0, 100 - speed * 1.5);
        simTimer = setTimeout(step, delay);
    } else if (!active) {
        isRunning = false;
        updateTexts();
        renderLeaderboard(true);
    }
}

function toggleSim() {
    isRunning = !isRunning;
    
    if (!hasStarted && isRunning) {
        hasStarted = true;
        document.getElementById('sizeCtrl').disabled = true;
        document.getElementById('shapeCtrl').disabled = true;
    }
    
    updateTexts();
    if (isRunning) step();
    else clearTimeout(simTimer);
}

document.addEventListener('DOMContentLoaded', initUI);