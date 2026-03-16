const wrapper = document.getElementById('stats-wrapper');

// Проверка доступа
if (sessionStorage.getItem('finance_unlocked') !== 'true') {
    window.location.href = '../my-expenses.html'; 
} else {
    wrapper.style.display = 'block';
}

// Тема
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
    services: { label: 'Услуги', color: '#e67e22' },
    games: { label: 'Игры', color: '#9b59b6' },
    tech: { label: 'Техника', color: '#34495e' },
    health: { label: 'Здоровье', color: '#e74c3c' },
    clothes: { label: 'Одежда', color: '#3498db' },
    saved: { label: 'Отложено', color: '#1abc9c' },
    other: { label: 'Другое', color: '#95a5a6' }
};

const monthNames = {
    "01": "Янв", "02": "Фев", "03": "Мар", "04": "Апр", 
    "05": "Май", "06": "Июн", "07": "Июл", "08": "Авг", 
    "09": "Сен", "10": "Окт", "11": "Ноя", "12": "Дек"
};

let mainBarChart, hBarChart, trendChart;

function initStatistics() {
    let globalIncome = 0;
    let globalExpense = 0;
    let monthsCount = 0;
    
    let maxExpenseMonthVal = 0;
    let maxExpenseMonthName = "—";

    const monthsLabels = [];
    const incomeData = [];
    const expenseData = [];
    const cumulativeSavingsData = [];
    const categoryTotals = {};
    
    let currentCumulative = 0;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    for (const key in database) {
        const [yearStr, monthStr] = key.split('-');
        const year = parseInt(yearStr);
        const month = parseInt(monthStr);

        // Игнорируем будущее и года до 2026
        if (year > currentYear || (year === currentYear && month > currentMonth)) continue;
        if (year < 2026) continue;

        monthsCount++;
        const monthData = database[key];
        const label = `${monthNames[monthStr]} ${yearStr.slice(-2)}`;
        monthsLabels.push(label);

        const mIncome = (monthData.income.fix || 0) + (monthData.income.extra || 0);
        let mExpense = 0;

        if (monthData.weeks) {
            Object.values(monthData.weeks).forEach(week => {
                Object.entries(week).forEach(([cat, amount]) => {
                    if (amount > 0) {
                        mExpense += amount;
                        if (!categoryTotals[cat]) categoryTotals[cat] = 0;
                        categoryTotals[cat] += amount;
                    }
                });
            });
        }

        // Поиск самого затратного месяца
        if (mExpense > maxExpenseMonthVal) {
            maxExpenseMonthVal = mExpense;
            maxExpenseMonthName = label;
        }

        incomeData.push(mIncome);
        expenseData.push(mExpense);
        
        currentCumulative += (mIncome - mExpense);
        cumulativeSavingsData.push(currentCumulative);

        globalIncome += mIncome;
        globalExpense += mExpense;
    }

    // --- РАСЧЁТ МЕТРИК ДЛЯ КАРТОЧЕК ---
    const avgIncome = monthsCount > 0 ? (globalIncome / monthsCount) : 0;
    const avgExpense = monthsCount > 0 ? (globalExpense / monthsCount) : 0;
    const totalSaved = globalIncome - globalExpense;
    const saveRate = globalIncome > 0 ? ((totalSaved / globalIncome) * 100) : 0;

    // Поиск топ категории
    let topCatName = "—";
    let topCatVal = 0;
    let topCatColor = "var(--text-color)";
    for (const [cat, val] of Object.entries(categoryTotals)) {
        if (val > topCatVal) {
            topCatVal = val;
            topCatName = categoryConfig[cat]?.label || 'Другое';
            topCatColor = categoryConfig[cat]?.color || '#95a5a6';
        }
    }
    const topCatPct = globalExpense > 0 ? ((topCatVal / globalExpense) * 100) : 0;

    // --- ЗАПОЛНЕНИЕ DOM ---
    document.getElementById('m-total-income').innerText = `+${globalIncome.toFixed(0)} ₴`;
    document.getElementById('m-avg-income').innerText = `В среднем: ${avgIncome.toFixed(0)} ₴/мес`;
    
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

    // Отрисовка графиков
    drawCharts(monthsLabels, incomeData, expenseData, cumulativeSavingsData, categoryTotals);
}

function drawCharts(months, incomeData, expenseData, cumulativeData, categories) {
    const textColor = document.body.classList.contains('dark-mode') ? '#e4e6eb' : '#333333';
    const gridColor = document.body.classList.contains('dark-mode') ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';

    Chart.defaults.color = textColor;
    Chart.defaults.font.family = "'Inter', sans-serif";

    // 1. ГРАФИК ДОХОД VS РАСХОД (Сгруппированные столбцы)
    const ctxBar = document.getElementById('barChart').getContext('2d');
    mainBarChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Доход',
                    data: incomeData,
                    backgroundColor: '#2ecc71',
                    borderRadius: 4
                },
                {
                    label: 'Расход',
                    data: expenseData,
                    backgroundColor: '#e74c3c',
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: {
                x: { grid: { display: false } },
                y: { grid: { color: gridColor }, beginAtZero: true }
            },
            plugins: { tooltip: { mode: 'index', intersect: false } }
        }
    });

    // 2. ГОРИЗОНТАЛЬНЫЙ ГРАФИК ТОП КАТЕГОРИЙ
    const sortedCats = Object.keys(categories).sort((a, b) => categories[b] - categories[a]);
    const catLabels = [];
    const catData = [];
    const catColors = [];

    sortedCats.forEach(cat => {
        catLabels.push(categoryConfig[cat]?.label || 'Другое');
        catData.push(categories[cat].toFixed(2));
        catColors.push(categoryConfig[cat]?.color || '#95a5a6');
    });

    const ctxHBar = document.getElementById('hBarChart').getContext('2d');
    hBarChart = new Chart(ctxHBar, {
        type: 'bar',
        data: {
            labels: catLabels,
            datasets: [{
                label: 'Потрачено',
                data: catData,
                backgroundColor: catColors,
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y', // Делает график горизонтальным
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: gridColor }, beginAtZero: true },
                y: { grid: { display: false } }
            }
        }
    });

    // 3. ГРАФИК ДИНАМИКИ КОПИЛКИ (Area chart)
    const ctxTrend = document.getElementById('trendChart').getContext('2d');
    trendChart = new Chart(ctxTrend, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Баланс копилки',
                data: cumulativeData,
                borderColor: '#4e54c8',
                backgroundColor: 'rgba(78, 84, 200, 0.15)',
                borderWidth: 3,
                tension: 0.4, // Плавная линия
                fill: true,
                pointBackgroundColor: '#4e54c8',
                pointRadius: 4
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false } },
                y: { grid: { color: gridColor } }
            }
        }
    });
}

function updateChartsColors() {
    if (!mainBarChart || !hBarChart || !trendChart) return;
    
    const textColor = document.body.classList.contains('dark-mode') ? '#e4e6eb' : '#333333';
    const gridColor = document.body.classList.contains('dark-mode') ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';

    Chart.defaults.color = textColor;
    
    // Обновляем сетку
    mainBarChart.options.scales.y.grid.color = gridColor;
    hBarChart.options.scales.x.grid.color = gridColor;
    trendChart.options.scales.y.grid.color = gridColor;
    
    mainBarChart.update();
    hBarChart.update();
    trendChart.update();
}

initStatistics();