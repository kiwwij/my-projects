const wrapper = document.getElementById('stats-wrapper');

if (localStorage.getItem('finance_unlocked') !== 'true') {
    window.location.href = '../my-expenses.html'; 
} else {
    wrapper.style.display = 'block';
}

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

let mainBarChart, hBarChart, trendChart;

let yearlyChartData = {};
let allTimeChartData = { 
    labels: [], income: [], expense: [], 
    cumulativeData: [], categoryTotals: {} 
};
let availableYears = [];
let currentDisplayYear;

function initStatistics() {
    let globalIncome = 0;
    let globalExpense = 0;
    let monthsCount = 0;
    
    let globalFixIncome = 0;
    let globalExtraIncome = 0;

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

        monthsCount++;
        const monthData = database[key];
        const labelFull = `${monthNames[monthStr]} ${yearStr.slice(-2)}`;

        const mIncome = (monthData.income.fix || 0) + (monthData.income.extra || 0);
        
        globalFixIncome += (monthData.income.fix || 0);
        globalExtraIncome += (monthData.income.extra || 0);

        let mExpense = 0;

        if (!yearlyChartData[year]) {
            yearlyChartData[year] = { 
                labels: [], income: [], expense: [], 
                cumulativeData: [], categoryTotals: {} 
            };
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

    const avgIncome = monthsCount > 0 ? (globalIncome / monthsCount) : 0;
    const avgExpense = monthsCount > 0 ? (globalExpense / monthsCount) : 0;
    const totalSaved = globalIncome - globalExpense;
    const saveRate = globalIncome > 0 ? ((totalSaved / globalIncome) * 100) : 0;

    const baseUAH = 48500;
    const dollarsAmount = 500;
    const absSavedEl = document.getElementById('absolute-total-saved');
    const usdAmountEl = document.getElementById('usd-amount');

    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json')
        .then(response => response.json())
        .then(data => {
            const usdRate = data[0].rate;
            const absoluteTotal = baseUAH + (dollarsAmount * usdRate) + totalSaved;
            
            if (absSavedEl) {
                absSavedEl.innerText = `Общий капитал: ~${absoluteTotal.toFixed(0)} ₴`;
            }
            
            if (usdAmountEl) {
                usdAmountEl.title = `Курс НБУ: ${usdRate.toFixed(2)} ₴ / $`;
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки курса валют:', error);
            const fallbackRate = 41.0; 
            const absoluteTotal = baseUAH + (dollarsAmount * fallbackRate) + totalSaved;
            
            if (absSavedEl) {
                absSavedEl.innerText = `Общий капитал: ~${absoluteTotal.toFixed(0)} ₴ (без учета нового курса)`;
            }
            
            if (usdAmountEl) {
                usdAmountEl.title = `Курс (запасной): ${fallbackRate.toFixed(2)} ₴ / $`;
            }
        });

    let topCatName = "—";
    let topCatVal = 0;
    let topCatColor = "var(--text-color)";
    for (const [cat, val] of Object.entries(allTimeChartData.categoryTotals)) {
        if (val > topCatVal) {
            topCatVal = val;
            topCatName = categoryConfig[cat]?.label || 'Другое';
            topCatColor = categoryConfig[cat]?.color || '#95a5a6';
        }
    }
    const topCatPct = globalExpense > 0 ? ((topCatVal / globalExpense) * 100) : 0;

    document.getElementById('m-total-income').innerText = `+${globalIncome.toFixed(0)} ₴`;
    document.getElementById('m-avg-income').innerText = `В среднем: ${avgIncome.toFixed(0)} ₴/мес`;

    if (document.getElementById('m-fix-income')) {
        document.getElementById('m-fix-income').innerText = globalFixIncome.toFixed(0);
        document.getElementById('m-extra-income').innerText = globalExtraIncome.toFixed(0);
    }

    document.getElementById('m-total-expense').innerText = `-${globalExpense.toFixed(0)} ₴`;
    document.getElementById('m-avg-expense').innerText = `В среднем: ${avgExpense.toFixed(0)} ₴/мес`;
    
    const savedEl = document.getElementById('m-total-saved');
    savedEl.innerText = `${totalSaved.toFixed(0)} ₴`;
    savedEl.style.color = totalSaved >= 0 ? 'var(--success)' : 'var(--danger)';
    document.getElementById('m-save-rate').innerText = `Сбережения: ${saveRate.toFixed(1)}% от дохода`;

    document.getElementById('m-top-month').innerText = maxExpenseMonthName;
    document.getElementById('m-top-month-val').innerText = `Сумма: -${maxExpenseMonthVal.toFixed(0)} ₴`;

    const tcEl = document.getElementById('m-top-category');
    tcEl.innerText = topCatName;
    tcEl.style.color = topCatColor;
    document.getElementById('m-top-category-val').innerText = `-${topCatVal.toFixed(0)} ₴`;
    document.getElementById('m-top-category-pct').innerText = `${topCatPct.toFixed(1)}% от всех трат`;

    availableYears.sort((a, b) => a - b);
    currentDisplayYear = availableYears.length > 0 ? availableYears[availableYears.length - 1] : now.getFullYear();
    
    if(availableYears.length === 0) {
        availableYears.push(currentDisplayYear);
        yearlyChartData[currentDisplayYear] = { 
            labels: [], income: [], expense: [], 
            cumulativeData: [], categoryTotals: {} 
        };
    }

    drawCharts(allTimeChartData);
    setupChartControls();
    updateDashboard(currentDisplayYear);
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

    const ctxHBar = document.getElementById('hBarChart').getContext('2d');
    hBarChart = new Chart(ctxHBar, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{ label: 'Потрачено', data: [], backgroundColor: [], borderRadius: 4 }]
        },
        options: {
            indexAxis: 'y',
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { x: { grid: { color: gridColor }, beginAtZero: true }, y: { grid: { display: false } } }
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
                            const income = mainBarChart.data.datasets[0].data[index] || 0;
                            const expense = mainBarChart.data.datasets[1].data[index] || 0;
                            
                            const diff = income - expense;
                            const sign = diff > 0 ? '+' : '';
                            
                            return `За месяц: ${sign}${diff.toFixed(0)} ₴`;
                        }
                    }
                }
            },
            scales: { x: { grid: { display: false } }, y: { grid: { color: gridColor } } }
        }
    });
}

function updateChartsColors() {
    if (!mainBarChart || !hBarChart || !trendChart) return;
    
    const gridColor = document.body.classList.contains('dark-mode') ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
    Chart.defaults.color = document.body.classList.contains('dark-mode') ? '#e4e6eb' : '#333333';
    
    mainBarChart.options.scales.y.grid.color = gridColor;
    hBarChart.options.scales.x.grid.color = gridColor;
    trendChart.options.scales.y.grid.color = gridColor;
    
    mainBarChart.update(); hBarChart.update(); trendChart.update();
}

function setupChartControls() {
    document.getElementById('prev-year-btn').addEventListener('click', () => {
        if (currentDisplayYear === 'all') currentDisplayYear = availableYears[availableYears.length - 1];
        let idx = availableYears.indexOf(currentDisplayYear);
        if (idx > 0) {
            currentDisplayYear = availableYears[idx - 1];
            updateDashboard(currentDisplayYear);
        }
    });

    document.getElementById('next-year-btn').addEventListener('click', () => {
        if (currentDisplayYear === 'all') return;
        let idx = availableYears.indexOf(currentDisplayYear);
        if (idx !== -1 && idx < availableYears.length - 1) {
            currentDisplayYear = availableYears[idx + 1];
            updateDashboard(currentDisplayYear);
        }
    });

    document.getElementById('all-time-btn').addEventListener('click', () => {
        currentDisplayYear = 'all';
        updateDashboard('all');
    });
}

function updateDashboard(year) {
    if (!mainBarChart || !hBarChart || !trendChart) return;

    const prevBtn = document.getElementById('prev-year-btn');
    const nextBtn = document.getElementById('next-year-btn');
    const displayYear = document.getElementById('current-year-display');
    const allTimeBtn = document.getElementById('all-time-btn');

    let targetData = year === 'all' ? allTimeChartData : yearlyChartData[year];
    if (!targetData) return;

    mainBarChart.data.labels = targetData.labels;
    mainBarChart.data.datasets[0].data = targetData.income;
    mainBarChart.data.datasets[1].data = targetData.expense;

    trendChart.data.labels = targetData.labels;
    trendChart.data.datasets[0].data = targetData.cumulativeData;

    const cats = targetData.categoryTotals;
    const sortedCats = Object.keys(cats).sort((a, b) => cats[b] - cats[a]);
    const catLabels = [];
    const catData = [];
    const catColors = [];

    sortedCats.forEach(cat => {
        catLabels.push(categoryConfig[cat]?.label || 'Другое');
        catData.push(cats[cat].toFixed(2));
        catColors.push(categoryConfig[cat]?.color || '#95a5a6');
    });

    hBarChart.data.labels = catLabels;
    hBarChart.data.datasets[0].data = catData;
    hBarChart.data.datasets[0].backgroundColor = catColors;

    if (year === 'all') {
        displayYear.innerText = 'Все время';
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        allTimeBtn.classList.add('active');
    } else {
        displayYear.innerText = year;
        const currentIndex = availableYears.indexOf(year);
        prevBtn.disabled = currentIndex <= 0;
        nextBtn.disabled = currentIndex >= availableYears.length - 1;
        allTimeBtn.classList.remove('active');
    }

    mainBarChart.update();
    hBarChart.update();
    trendChart.update();
}

initStatistics();