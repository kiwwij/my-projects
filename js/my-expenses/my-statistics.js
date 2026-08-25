const wrapper = document.getElementById('stats-wrapper');

if (localStorage.getItem('finance_unlocked') !== 'true') {
    window.location.href = '../my-expenses.html'; 
} else {
    wrapper.style.display = 'block';
}

const MY_GOALS = [
    { name: 'Новый ПК', target: 70000 },
    { name: 'Поездка в Японию', target: 300000 },
    { name: 'Финансовая подушка', target: 100000 }
];

const themeToggle = document.getElementById('theme-toggle');
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = "<i class='bx bx-sun'></i>";
} else {
    themeToggle.innerHTML = "<i class='bx bx-moon'></i>";
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.innerHTML = isDark ? "<i class='bx bx-sun'></i>" : "<i class='bx bx-moon'></i>";
    updateChartsColors(); 
});

const categoryConfig = {
    food: { label: 'Продукты', color: '#2ecc71' },
    snacks: { label: 'Вкусняшки', color: '#f1c40f' },
    dining: { label: 'Рестораны', color: '#e84393' },    
    transport: { label: 'Проезд', color: '#00cec9' }, 
    rent: { label: 'Оренда', color: '#ff7f50' },
    services: { label: 'Услуги', color: '#e67e22' },
    health: { label: 'Здоровье', color: '#e74c3c' },
    barber: { label: 'Барбершоп', color: '#8c7ae6' },
    clothes: { label: 'Одежда', color: '#3498db' },
    tech: { label: 'Техника', color: '#34495e' },
    gifts: { label: 'Подарки', color: '#ff9ff3' },
    games: { label: 'Игры', color: '#9b59b6' },
    saved: { label: 'Отложено', color: '#1abc9c' },
    other: { label: 'Другое', color: '#95a5a6' }
};

const monthNames = {
    "01": "Янв", "02": "Фев", "03": "Мар", "04": "Апр", 
    "05": "Май", "06": "Июн", "07": "Июл", "08": "Авг", 
    "09": "Сен", "10": "Окт", "11": "Ноя", "12": "Дек"
};

let mainBarChart, doughnutChart, trendChart;
let yearlyChartData = {};
let allTimeChartData = { labels: [], income: [], expense: [], cumulativeData: [], categoryTotals: {} };
let availableYears = [];
let currentDisplayYear;
let isHidden = false;

function animateValue(obj, start, end, duration, prefix = '', suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        if(!isHidden) obj.innerText = `${prefix}${current}${suffix}`;
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

function getMedian(arr) {
    if (arr.length === 0) return 0;
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

async function getExchangeRate() {
    const cachedRate = localStorage.getItem('nbu_rate');
    const cachedTime = localStorage.getItem('nbu_rate_time');
    const now = new Date().getTime();
    if (cachedRate && cachedTime && (now - cachedTime < 86400000)) return parseFloat(cachedRate);
    try {
        const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json');
        const data = await response.json();
        const rate = data[0].rate;
        localStorage.setItem('nbu_rate', rate);
        localStorage.setItem('nbu_rate_time', now);
        return rate;
    } catch (e) {
        return 41.0; 
    }
}

async function initStatistics() {
    let globalIncome = 0;
    let globalExpense = 0;
    let allIncomes = [];
    let allExpenses = [];
    let maxExpenseMonthVal = 0;
    let maxExpenseMonthName = "—";
    let currentCumulative = 0;
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    for (const key in database) {
        const [yearStr, monthStr] = key.split('-');
        const year = parseInt(yearStr);
        const month = parseInt(monthStr);

        if (year > currentYear || (year === currentYear && month > currentMonth)) continue;
        if (year < 2026) continue;

        const monthData = database[key];
        const labelFull = `${monthNames[monthStr]} ${yearStr.slice(-2)}`;
        const mIncome = (monthData.income.fix || 0) + (monthData.income.extra || 0);
        let mExpense = 0;

        if (!yearlyChartData[year]) {
            yearlyChartData[year] = { labels: [], income: [], expense: [], cumulativeData: [], categoryTotals: {} };
            if (!availableYears.includes(year)) availableYears.push(year);
        }

        if (monthData.weeks) {
            Object.values(monthData.weeks).forEach(week => {
                Object.entries(week).forEach(([cat, amount]) => {
                    if (amount > 0) {
                        mExpense += amount;
                        if (!allTimeChartData.categoryTotals[cat]) allTimeChartData.categoryTotals[cat] = 0;
                        allTimeChartData.categoryTotals[cat] += amount;
                        if (!yearlyChartData[year].categoryTotals[cat]) yearlyChartData[year].categoryTotals[cat] = 0;
                        yearlyChartData[year].categoryTotals[cat] += amount;
                    }
                });
            });
        }

        if (mExpense > maxExpenseMonthVal) {
            maxExpenseMonthVal = mExpense;
            maxExpenseMonthName = labelFull;
        }

        if(mIncome > 0 || mExpense > 0) {
            allIncomes.push(mIncome);
            allExpenses.push(mExpense);
        }

        currentCumulative += (mIncome - mExpense);
        globalIncome += mIncome;
        globalExpense += mExpense;

        allTimeChartData.labels.push(labelFull);
        allTimeChartData.income.push(mIncome);
        allTimeChartData.expense.push(mExpense);
        allTimeChartData.cumulativeData.push(currentCumulative);

        yearlyChartData[year].labels.push(monthNames[monthStr]);
        yearlyChartData[year].income.push(mIncome);
        yearlyChartData[year].expense.push(mExpense);
        yearlyChartData[year].cumulativeData.push(currentCumulative);
    }

    const avgIncome = allIncomes.length > 0 ? (globalIncome / allIncomes.length) : 0;
    const avgExpense = allExpenses.length > 0 ? (globalExpense / allExpenses.length) : 0;
    const medIncome = getMedian(allIncomes);
    const medExpense = getMedian(allExpenses);
    const totalSaved = globalIncome - globalExpense;
    const saveRate = globalIncome > 0 ? ((totalSaved / globalIncome) * 100) : 0;

    const lastMonthIncome = allIncomes[allIncomes.length - 1] || 0;
    const lastMonthExpense = allExpenses[allExpenses.length - 1] || 0;
    
    const incDiff = lastMonthIncome - avgIncome;
    const incTrendEl = document.getElementById('trend-income');
    if (allIncomes.length > 1) {
        const absIncDiff = Math.abs(Math.round(incDiff));
        if(incDiff > 0) { 
            incTrendEl.innerHTML = `<i class='bx bx-trending-up'></i> Доход выше среднего на <span class="money-value" data-real-value="${absIncDiff}">${absIncDiff}</span> ₴`; 
            incTrendEl.className = 'trend-badge trend-up good'; 
        } else { 
            incTrendEl.innerHTML = `<i class='bx bx-trending-down'></i> Доход ниже среднего на <span class="money-value" data-real-value="${absIncDiff}">${absIncDiff}</span> ₴`; 
            incTrendEl.className = 'trend-badge trend-down bad'; 
        }
    }

    const expDiff = lastMonthExpense - avgExpense;
    const expTrendEl = document.getElementById('trend-expense');
    if (allExpenses.length > 1) {
        const absExpDiff = Math.abs(Math.round(expDiff));
        if(expDiff < 0) { 
            expTrendEl.innerHTML = `<i class='bx bx-trending-down'></i> Траты ниже среднего на <span class="money-value" data-real-value="${absExpDiff}">${absExpDiff}</span> ₴`; 
            expTrendEl.className = 'trend-badge trend-down good'; 
        } else { 
            expTrendEl.innerHTML = `<i class='bx bx-trending-up'></i> Траты выше среднего на <span class="money-value" data-real-value="${absExpDiff}">${absExpDiff}</span> ₴`; 
            expTrendEl.className = 'trend-badge trend-up bad'; 
        }
    }

    animateValue(document.getElementById('m-total-income'), 0, globalIncome, 1000, '+', ' ₴');
    document.querySelector('#m-avg-income span').innerText = Math.round(avgIncome);
    document.querySelector('#m-median-income span').innerText = Math.round(medIncome);

    animateValue(document.getElementById('m-total-expense'), 0, globalExpense, 1000, '-', ' ₴');
    document.querySelector('#m-avg-expense span').innerText = Math.round(avgExpense);
    document.querySelector('#m-median-expense span').innerText = Math.round(medExpense);
    
    const savedEl = document.getElementById('m-total-saved');
    animateValue(savedEl, 0, totalSaved, 1000, '', ' ₴');
    savedEl.style.color = totalSaved >= 0 ? 'var(--success)' : 'var(--danger)';
    document.getElementById('m-save-rate').innerText = `Сохранено: ${saveRate.toFixed(1)}% от дохода`;

    document.getElementById('m-top-month').innerText = maxExpenseMonthName;
    document.getElementById('m-top-month-val').innerText = maxExpenseMonthVal.toFixed(0);

    let topCatName = "—", topCatVal = 0, topCatColor = "var(--text-color)";
    for (const [cat, val] of Object.entries(allTimeChartData.categoryTotals)) {
        if (val > topCatVal) {
            topCatVal = val;
            topCatName = categoryConfig[cat]?.label || 'Другое';
            topCatColor = categoryConfig[cat]?.color || '#95a5a6';
        }
    }
    const topCatPct = globalExpense > 0 ? ((topCatVal / globalExpense) * 100) : 0;
    
    document.getElementById('m-top-category').innerText = topCatName;
    document.getElementById('m-top-category').style.color = topCatColor;
    animateValue(document.getElementById('m-top-category-val'), 0, topCatVal, 1000, '-', ' ₴');
    document.getElementById('m-top-category-pct').innerText = `${topCatPct.toFixed(1)}% от всех трат`;

    const cardUAH = 46560;              // на карте
    const cashUAH = 1900;               // В гривнах
    const dollarsAmount = 500;          // В долларах

    const usdRate = await getExchangeRate();
    const totalUAH = Math.max(0, cardUAH + cashUAH + totalSaved);
    const dollarsInUAH = dollarsAmount * usdRate;
    const absoluteTotal = totalUAH + dollarsInUAH;

    const cardEl = document.getElementById('card-amount');
    const cashEl = document.getElementById('cash-uah-amount');
    const usdEl = document.getElementById('usd-amount');

    if (cardEl) cardEl.innerText = cardUAH.toLocaleString('ru-RU');
    if (cashEl) cashEl.innerText = cashUAH.toLocaleString('ru-RU');
    if (usdEl) {
        usdEl.innerText = dollarsAmount;
        usdEl.title = `Курс НБУ: ${usdRate.toFixed(2)} ₴ / $ (~${Math.round(dollarsInUAH).toLocaleString('ru-RU')} ₴)`;
    }

    // Общий капитал
    document.querySelector('#absolute-total-saved span').innerText = Math.round(absoluteTotal).toLocaleString('ru-RU');

    renderGoals(totalSaved, absoluteTotal);

    availableYears.sort((a, b) => a - b);
    currentDisplayYear = availableYears.length > 0 ? availableYears[availableYears.length - 1] : now.getFullYear();
    if(availableYears.length === 0) availableYears.push(currentDisplayYear);

    drawCharts(allTimeChartData);
    setupChartControls();
    updateDashboard(currentDisplayYear);
    
    if(isHidden) hideAllSums(true);
}

function renderGoals(savedUAH, absoluteTotal) {
    const container = document.getElementById('goals-container');
    container.innerHTML = '';
    
    let totalTarget = 0;
    let currentSavings = savedUAH > 0 ? savedUAH : 0;

    MY_GOALS.forEach(goal => {
        totalTarget += goal.target;
        
        let isCushion = goal.name === 'Финансовая подушка';
        let pool = isCushion ? absoluteTotal : currentSavings;
        
        let allocated = pool;
        let pct = Math.min((allocated / goal.target) * 100, 100);

        container.innerHTML += `
            <div class="goal-item">
                <div class="goal-header">
                    <span>${goal.name}</span>
                    <span><span class="money-value">${allocated.toFixed(0)}</span> / ~${goal.target} ₴</span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill ${pct >= 100 ? 'cat-saved' : 'cat-primary'}" 
                         style="width: ${pct}%; background: ${pct >= 100 ? 'var(--success)' : 'var(--primary-color)'}"></div>
                </div>
            </div>
        `;
    });

    const overallPct = totalTarget > 0 ? Math.min((currentSavings / totalTarget) * 100, 100) : 0;
    document.getElementById('overall-goal-text').innerText = `${overallPct.toFixed(1)}%`;
    document.getElementById('overall-goal-fill').style.width = `${overallPct}%`;
}

function drawCharts(data) {
    const textColor = document.body.classList.contains('dark-mode') ? '#e4e6eb' : '#333333';
    const gridColor = document.body.classList.contains('dark-mode') ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';

    Chart.defaults.color = textColor;
    Chart.defaults.font.family = "'Inter', sans-serif";

    const ctxBar = document.getElementById('barChart').getContext('2d');
    mainBarChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [
                { label: 'Доход', data: data.income, backgroundColor: '#2ecc71', borderRadius: 4 },
                { label: 'Расход', data: data.expense, backgroundColor: '#e74c3c', borderRadius: 4 }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: { x: { grid: { display: false } }, y: { grid: { color: gridColor }, beginAtZero: true } },
            plugins: { tooltip: { mode: 'index', intersect: false } }
        }
    });

    const ctxDoughnut = document.getElementById('doughnutChart').getContext('2d');
    doughnutChart = new Chart(ctxDoughnut, {
        type: 'doughnut',
        data: { labels: [], datasets: [{ data: [], backgroundColor: [], borderWidth: 2 }] },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { 
                legend: { position: 'right', labels: { boxWidth: 12 } },
                tooltip: { 
                    callbacks: { 
                        label: function(context) {
                            let label = context.label || '';
                            let value = context.raw || 0;
                            let total = context.chart._metasets[context.datasetIndex].total;
                            let percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                            return ` ${label}: ${value} ₴ (${percentage}%)`;
                        }
                    } 
                }
            },
            cutout: '65%'
        }
    });

    const ctxTrend = document.getElementById('trendChart').getContext('2d');
    trendChart = new Chart(ctxTrend, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Баланс копилки',
                data: data.cumulativeData,
                borderColor: '#4e54c8', backgroundColor: 'rgba(78, 84, 200, 0.15)',
                borderWidth: 3, tension: 0.4, fill: true,
                pointBackgroundColor: '#4e54c8', pointRadius: 4
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { 
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Баланс: ${context.parsed.y.toFixed(0)} ₴`;
                        },
                        afterLabel: function(context) {
                            const index = context.dataIndex;
                            if (index === 0) {
                                const val = context.parsed.y;
                                return `Изменение: ${val > 0 ? '+' : ''}${val.toFixed(0)} ₴`;
                            }
                            const prev = context.chart.data.datasets[0].data[index - 1];
                            const diff = context.parsed.y - prev;
                            const sign = diff > 0 ? '+' : '';
                            return `Изменение: ${sign}${diff.toFixed(0)} ₴`;
                        }
                    }
                }
            },
            scales: { x: { grid: { display: false } }, y: { grid: { color: gridColor } } }
        }
    });
}

function updateChartsColors() {
    if (!mainBarChart || !doughnutChart || !trendChart) return;
    const gridColor = document.body.classList.contains('dark-mode') ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
    Chart.defaults.color = document.body.classList.contains('dark-mode') ? '#e4e6eb' : '#333333';
    
    mainBarChart.options.scales.y.grid.color = gridColor;
    trendChart.options.scales.y.grid.color = gridColor;
    
    if(document.body.classList.contains('dark-mode')){
        doughnutChart.data.datasets[0].borderColor = '#1e1e1e';
    } else {
        doughnutChart.data.datasets[0].borderColor = '#ffffff';
    }
    
    mainBarChart.update(); doughnutChart.update(); trendChart.update();
}

function updateDashboard(year) {
    if (!mainBarChart || !doughnutChart || !trendChart) return;

    const displayYear = document.getElementById('current-year-display');
    let targetData = year === 'all' ? allTimeChartData : yearlyChartData[year];
    if (!targetData) return;

    mainBarChart.data.labels = targetData.labels;
    mainBarChart.data.datasets[0].data = targetData.income;
    mainBarChart.data.datasets[1].data = targetData.expense;
    trendChart.data.labels = targetData.labels;
    trendChart.data.datasets[0].data = targetData.cumulativeData;

    const cats = targetData.categoryTotals;
    const sortedCats = Object.keys(cats).sort((a, b) => cats[b] - cats[a]);
    const catLabels = [], catData = [], catColors = [];

    sortedCats.forEach((cat) => {
        catLabels.push(categoryConfig[cat]?.label || 'Другое');
        catData.push(cats[cat].toFixed(2));
        catColors.push(categoryConfig[cat]?.color || '#95a5a6');
    });

    doughnutChart.data.labels = catLabels;
    doughnutChart.data.datasets[0].data = catData;
    doughnutChart.data.datasets[0].backgroundColor = catColors;

    displayYear.innerText = year === 'all' ? 'Все время' : year;
    
    const allTimeBtn = document.getElementById('all-time-btn');
    if (year === 'all') {
        allTimeBtn.innerText = 'Текущий год';
        allTimeBtn.classList.add('active');
        document.getElementById('prev-year-btn').disabled = true;
        document.getElementById('next-year-btn').disabled = true;
    } else {
        allTimeBtn.innerText = 'За всё время';
        allTimeBtn.classList.remove('active');
        const currentIndex = availableYears.indexOf(year);
        document.getElementById('prev-year-btn').disabled = currentIndex <= 0;
        document.getElementById('next-year-btn').disabled = currentIndex >= availableYears.length - 1;
    }

    mainBarChart.update(); doughnutChart.update(); trendChart.update();
}

function hideAllSums(hide) {
    const moneyEls = document.querySelectorAll('.money-value');
    moneyEls.forEach(el => {
        if(hide) {
            if(!el.dataset.realValue) el.dataset.realValue = el.innerText;
            el.innerText = '***';
            el.classList.add('money-hidden');
        } else {
            if(el.dataset.realValue) el.innerText = el.dataset.realValue;
            el.classList.remove('money-hidden');
        }
    });
    document.getElementById('hide-sums-btn').innerHTML = hide ? "<i class='bx bx-show'></i>" : "<i class='bx bx-hide'></i>";
}

function setupChartControls() {
    document.getElementById('prev-year-btn').addEventListener('click', () => {
        if (currentDisplayYear === 'all') currentDisplayYear = availableYears[availableYears.length - 1];
        let idx = availableYears.indexOf(currentDisplayYear);
        if (idx > 0) { currentDisplayYear = availableYears[idx - 1]; updateDashboard(currentDisplayYear); }
    });
    
    document.getElementById('next-year-btn').addEventListener('click', () => {
        if (currentDisplayYear === 'all') return;
        let idx = availableYears.indexOf(currentDisplayYear);
        if (idx !== -1 && idx < availableYears.length - 1) {
            currentDisplayYear = availableYears[idx + 1]; updateDashboard(currentDisplayYear);
        }
    });
    
    document.getElementById('all-time-btn').addEventListener('click', () => {
        if (currentDisplayYear === 'all') {
            const nowYear = new Date().getFullYear();
            currentDisplayYear = availableYears.includes(nowYear) ? nowYear : availableYears[availableYears.length - 1];
            updateDashboard(currentDisplayYear);
        } else {
            currentDisplayYear = 'all'; 
            updateDashboard('all');
        }
    });

    document.getElementById('hide-sums-btn').addEventListener('click', () => {
        isHidden = !isHidden;
        hideAllSums(isHidden);
    });

    document.getElementById('export-pdf-btn').addEventListener('click', () => {
        if (typeof generateFinancialPDF === 'function') {
            generateFinancialPDF();
        } else {
            alert('Скрипт генерации PDF не загружен!');
        }
    });
}

initStatistics();