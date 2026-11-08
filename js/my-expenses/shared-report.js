const categoryConfig = {
    food: { label: 'Продукты', color: '#2ecc71', icon: 'bx-basket' },
    snacks: { label: 'Вкусняшки', color: '#f1c40f', icon: 'bx-cookie' },
    dining: { label: 'Рестораны', color: '#e84393', icon: 'bx-restaurant' },
    transport: { label: 'Проезд', color: '#00cec9', icon: 'bx-bus' },
    rent: { label: 'Оренда', color: '#ff7f50', icon: 'bx-home-heart' },
    services: { label: 'Услуги', color: '#e67e22', icon: 'bx-receipt' },
    health: { label: 'Здоровье', color: '#e74c3c', icon: 'bx-plus-medical' },
    barber: { label: 'Барбершоп', color: '#8c7ae6', icon: 'bx-cut' },
    clothes: { label: 'Одежда', color: '#3498db', icon: 'bx-closet' },
    tech: { label: 'Техника', color: '#34495e', icon: 'bx-chip' },
    gifts: { label: 'Подарки', color: '#ff9ff3', icon: 'bx-gift' },
    games: { label: 'Игры', color: '#9b59b6', icon: 'bx-joystick' },
    saved: { label: 'Отложено', color: '#1abc9c', icon: 'bx-piggy-bank' },
    other: { label: 'Другое', color: '#95a5a6', icon: 'bx-category' }
};

const monthNamesFull = {
    "01": "Январь", "02": "Февраль", "03": "Март", "04": "Апрель",
    "05": "Май", "06": "Июнь", "07": "Июль", "08": "Август",
    "09": "Сентябрь", "10": "Октябрь", "11": "Ноябрь", "12": "Декабрь"
};

const monthNamesShort = {
    "01": "Янв", "02": "Фев", "03": "Мар", "04": "Апр",
    "05": "Май", "06": "Июн", "07": "Июл", "08": "Авг",
    "09": "Сен", "10": "Окт", "11": "Ноя", "12": "Дек"
};

const OWNER_ASSETS = {
    cardUAH: 46470,
    cashUAH: 2180,
    dollarsAmount: 500
};

const STORAGE_SESSION_KEY = 'kiwwij_shared_finance_session';
const SECRET_SALT = 'kiwwij_vntu_2026';

let selectedMode = 'brief';
let selectedPeriod = '2026';
let selectedMinutes = 60;

let countdownInterval = null;
let mainChartInstance = null;
let doughnutChartInstance = null;
let trendChartInstance = null;

const isOwnerUnlocked = localStorage.getItem('finance_unlocked') === 'true';

const themeToggle = document.getElementById('theme-toggle');
if (localStorage.getItem('theme') !== 'light') {
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
    updateChartsTheme();
});

function signTokenData(mode, period, exp) {
    const raw = `${mode}|${period}|${exp}|${SECRET_SALT}`;
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
        hash = ((hash << 5) - hash) + raw.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash).toString(36);
}

function encodeSessionToken(sessionObj) {
    const sig = signTokenData(sessionObj.mode, sessionObj.period, sessionObj.exp);
    const payload = {
        m: sessionObj.mode,
        p: sessionObj.period,
        e: sessionObj.exp,
        s: sig
    };
    return btoa(encodeURIComponent(JSON.stringify(payload)));
}

function decodeSessionToken(tokenStr) {
    try {
        const jsonStr = decodeURIComponent(atob(tokenStr));
        const data = JSON.parse(jsonStr);
        if (!data.m || !data.p || !data.e || !data.s) return null;
        const expectedSig = signTokenData(data.m, data.p, data.e);
        if (data.s !== expectedSig) return null;
        return {
            mode: data.m === 'close' ? 'close' : 'brief',
            period: String(data.p),
            exp: Number(data.e)
        };
    } catch (e) {
        return null;
    }
}

function formatMoney(num, showDecimals = false) {
    const val = showDecimals ? Number(num).toFixed(2) : Math.round(Number(num));
    return Number(val).toLocaleString('ru-RU');
}

function getMedian(arr) {
    if (!arr || arr.length === 0) return 0;
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

async function getExchangeRate() {
    const cachedRate = localStorage.getItem('nbu_rate');
    const cachedTime = localStorage.getItem('nbu_rate_time');
    const now = Date.now();
    if (cachedRate && cachedTime && (now - cachedTime < 86400000)) {
        return parseFloat(cachedRate);
    }
    try {
        const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json');
        const data = await response.json();
        const rate = data[0].rate;
        localStorage.setItem('nbu_rate', rate);
        localStorage.setItem('nbu_rate_time', now);
        return rate;
    } catch (e) {
        return 41.5;
    }
}

function collectPeriodData(periodFilter) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    let totalIncome = 0;
    let totalExpense = 0;
    let cumulativeSaved = 0;

    const monthlyIncomes = [];
    const monthlyExpenses = [];
    const chartLabels = [];
    const chartIncomes = [];
    const chartExpenses = [];
    const chartCumulative = [];
    const categoryTotals = {};
    const monthsDetailed = [];

    let maxExpenseMonth = { name: '—', val: 0 };
    let minExpenseMonth = { name: '—', val: Infinity };
    let activeWeeksCount = 0;

    const sortedKeys = Object.keys(database).sort();

    for (const key of sortedKeys) {
        const [yearStr, monthStr] = key.split('-');
        const year = parseInt(yearStr, 10);
        const month = parseInt(monthStr, 10);

        if (year > currentYear || (year === currentYear && month > currentMonth)) continue;
        if (year < 2026) continue;

        const mData = database[key];
        const mIncome = (mData.income?.fix || 0) + (mData.income?.extra || 0);
        let mExpense = 0;
        const weekBreakdown = [];

        if (mData.weeks) {
            for (const [weekNum, weekObj] of Object.entries(mData.weeks)) {
                let weekSum = 0;
                const weekCats = [];

                for (const [cat, amount] of Object.entries(weekObj)) {
                    if (amount > 0) {
                        mExpense += amount;
                        weekSum += amount;
                        if (periodFilter === 'all' || String(year) === String(periodFilter)) {
                            categoryTotals[cat] = (categoryTotals[cat] || 0) + amount;
                        }
                        weekCats.push({
                            cat,
                            label: categoryConfig[cat]?.label || 'Другое',
                            color: categoryConfig[cat]?.color || '#95a5a6',
                            amount
                        });
                    }
                }

                if (weekSum > 0) {
                    weekCats.sort((a, b) => b.amount - a.amount);
                    weekBreakdown.push({
                        weekNum,
                        total: weekSum,
                        categories: weekCats
                    });
                }
            }
        }

        cumulativeSaved += (mIncome - mExpense);

        if (periodFilter !== 'all' && String(year) !== String(periodFilter)) {
            continue;
        }

        const shortLabel = periodFilter === 'all'
            ? `${monthNamesShort[monthStr]} ${yearStr.slice(-2)}`
            : monthNamesShort[monthStr];
        const fullLabel = `${monthNamesFull[monthStr]} ${year}`;

        totalIncome += mIncome;
        totalExpense += mExpense;
        activeWeeksCount += weekBreakdown.length;

        if (mIncome > 0 || mExpense > 0) {
            monthlyIncomes.push(mIncome);
            monthlyExpenses.push(mExpense);
        }

        if (mExpense > maxExpenseMonth.val) {
            maxExpenseMonth = { name: fullLabel, val: mExpense };
        }
        if (mExpense > 0 && mExpense < minExpenseMonth.val) {
            minExpenseMonth = { name: fullLabel, val: mExpense };
        }

        chartLabels.push(shortLabel);
        chartIncomes.push(Number(mIncome.toFixed(2)));
        chartExpenses.push(Number(mExpense.toFixed(2)));
        chartCumulative.push(Number(cumulativeSaved.toFixed(2)));

        monthsDetailed.push({
            key,
            fullLabel,
            income: mIncome,
            expense: mExpense,
            saved: mIncome - mExpense,
            weeks: weekBreakdown
        });
    }

    if (minExpenseMonth.val === Infinity) {
        minExpenseMonth = { name: '—', val: 0 };
    }

    let allTimeSaved = 0;
    for (const key of sortedKeys) {
        const [yearStr, monthStr] = key.split('-');
        const year = parseInt(yearStr, 10);
        const month = parseInt(monthStr, 10);
        if (year > currentYear || (year === currentYear && month > currentMonth)) continue;
        if (year < 2026) continue;
        const m = database[key];
        const inc = (m.income?.fix || 0) + (m.income?.extra || 0);
        let exp = 0;
        if (m.weeks) {
            Object.values(m.weeks).forEach(w => {
                Object.values(w).forEach(v => { if (v > 0) exp += v; });
            });
        }
        allTimeSaved += (inc - exp);
    }

    return {
        totalIncome,
        totalExpense,
        totalSaved: totalIncome - totalExpense,
        allTimeSaved,
        avgIncome: monthlyIncomes.length ? totalIncome / monthlyIncomes.length : 0,
        avgExpense: monthlyExpenses.length ? totalExpense / monthlyExpenses.length : 0,
        medIncome: getMedian(monthlyIncomes),
        medExpense: getMedian(monthlyExpenses),
        avgWeeklyExpense: activeWeeksCount > 0 ? totalExpense / activeWeeksCount : 0,
        monthsCount: monthlyExpenses.length || 1,
        activeWeeksCount,
        maxExpenseMonth,
        minExpenseMonth,
        chartLabels,
        chartIncomes,
        chartExpenses,
        chartCumulative,
        categoryTotals,
        monthsDetailed: monthsDetailed.reverse()
    };
}

async function renderReportSession(session) {
    document.getElementById('setup-view').style.display = 'none';
    document.getElementById('expired-view').style.display = 'none';
    document.getElementById('report-view').style.display = 'block';

    const isClose = session.mode === 'close';
    const data = collectPeriodData(session.period);

    document.getElementById('page-main-title').innerText = isClose
        ? 'Полный финансовый отчёт (Для близких)'
        : 'Аналитическая выжимка по тратам';

    const modeBadge = document.getElementById('active-mode-badge');
    if (isClose) {
        modeBadge.className = 'mode-pill';
        modeBadge.innerHTML = "<i class='bx bx-shield-quarter'></i> Режим: Для близких (Полный)";
    } else {
        modeBadge.className = 'mode-pill mode-brief';
        modeBadge.innerHTML = "<i class='bx bx-pie-chart-alt-2'></i> Режим: Для знакомых (Только траты)";
    }

    document.getElementById('report-period-label').innerText =
        `Период: ${session.period === 'all' ? 'За всё время' : session.period + ' год'}`;

    const ownerControls = document.getElementById('owner-controls');
    const backLink = document.getElementById('back-to-stats-link');
    if (!isOwnerUnlocked) {
        ownerControls.style.display = 'none';
        backLink.removeAttribute('href');
        backLink.style.cursor = 'default';
        const arrowIcon = backLink.querySelector('.bx-arrow-back');
        if (arrowIcon) arrowIcon.style.display = 'none';
    } else {
        ownerControls.style.display = 'flex';
    }

    const sortedCats = Object.entries(data.categoryTotals).sort((a, b) => b[1] - a[1]);
    const topCatKey = sortedCats[0]?.[0] || 'other';
    const topCatVal = sortedCats[0]?.[1] || 0;
    const topCatLabel = categoryConfig[topCatKey]?.label || '—';
    const topCatPct = data.totalExpense > 0 ? ((topCatVal / data.totalExpense) * 100).toFixed(1) : '0.0';

    const metricsGrid = document.getElementById('report-metrics-grid');
    if (!isClose) {
        metricsGrid.innerHTML = `
            <div class="card stat-card">
                <div class="stat-card-top">
                    <span>Всего потрачено</span>
                    <i class='bx bx-credit-card'></i>
                </div>
                <div class="stat-card-val minus">-${formatMoney(data.totalExpense)} ₴</div>
                <div class="stat-card-meta">
                    Активных месяцев: <strong>${data.monthsCount}</strong> (${data.activeWeeksCount} нед.)
                </div>
            </div>

            <div class="card stat-card">
                <div class="stat-card-top">
                    <span>Средний расход в месяц</span>
                    <i class='bx bx-calculator'></i>
                </div>
                <div class="stat-card-val">${formatMoney(data.avgExpense)} ₴/мес</div>
                <div class="stat-card-meta">
                    Медиана: <strong>${formatMoney(data.medExpense)} ₴/мес</strong><br>
                    В среднем в неделю: <strong>~${formatMoney(data.avgWeeklyExpense)} ₴</strong>
                </div>
            </div>

            <div class="card stat-card">
                <div class="stat-card-top">
                    <span>Диапазон трат по месяцам</span>
                    <i class='bx bx-transfer-alt'></i>
                </div>
                <div class="stat-card-val" style="font-size: 1.25rem;">
                    Макс: -${formatMoney(data.maxExpenseMonth.val)} ₴
                </div>
                <div class="stat-card-meta">
                    Пик: <strong>${data.maxExpenseMonth.name}</strong><br>
                    Минимум: <strong>${data.minExpenseMonth.name} (-${formatMoney(data.minExpenseMonth.val)} ₴)</strong>
                </div>
            </div>

            <div class="card stat-card">
                <div class="stat-card-top">
                    <span>Главная статья расходов</span>
                    <i class='bx bx-pie-chart-alt'></i>
                </div>
                <div class="stat-card-val" style="color: ${categoryConfig[topCatKey]?.color || 'var(--text-color)'};">
                    ${topCatLabel}
                </div>
                <div class="stat-card-meta">
                    Сумма: <strong>-${formatMoney(topCatVal)} ₴</strong> (${topCatPct}% всех трат)
                </div>
            </div>
        `;
    } else {
        const saveRate = data.totalIncome > 0 ? ((data.totalSaved / data.totalIncome) * 100).toFixed(1) : '0.0';
        metricsGrid.innerHTML = `
            <div class="card stat-card">
                <div class="stat-card-top">
                    <span>Всего заработано</span>
                    <i class='bx bx-wallet'></i>
                </div>
                <div class="stat-card-val plus">+${formatMoney(data.totalIncome)} ₴</div>
                <div class="stat-card-meta">
                    В среднем: <strong>${formatMoney(data.avgIncome)} ₴/мес</strong><br>
                    Медиана: <strong>${formatMoney(data.medIncome)} ₴/мес</strong>
                </div>
            </div>

            <div class="card stat-card">
                <div class="stat-card-top">
                    <span>Всего потрачено</span>
                    <i class='bx bx-credit-card'></i>
                </div>
                <div class="stat-card-val minus">-${formatMoney(data.totalExpense)} ₴</div>
                <div class="stat-card-meta">
                    В среднем: <strong>${formatMoney(data.avgExpense)} ₴/мес</strong><br>
                    Медиана: <strong>${formatMoney(data.medExpense)} ₴/мес</strong>
                </div>
            </div>

            <div class="card stat-card">
                <div class="stat-card-top">
                    <span>Отложено в копилку</span>
                    <i class='bx bx-piggy-bank'></i>
                </div>
                <div class="stat-card-val" style="color: var(--primary-color);">
                    ${data.totalSaved >= 0 ? '+' : ''}${formatMoney(data.totalSaved)} ₴
                </div>
                <div class="stat-card-meta">
                    Норма сбережений: <strong>${saveRate}% от дохода</strong><br>
                    Пик трат: <strong>${data.maxExpenseMonth.name} (-${formatMoney(data.maxExpenseMonth.val)} ₴)</strong>
                </div>
            </div>

            <div class="card stat-card">
                <div class="stat-card-top">
                    <span>Главная категория трат</span>
                    <i class='bx bx-pie-chart-alt'></i>
                </div>
                <div class="stat-card-val" style="color: ${categoryConfig[topCatKey]?.color || 'var(--text-color)'};">
                    ${topCatLabel}
                </div>
                <div class="stat-card-meta">
                    Потрачено: <strong>-${formatMoney(topCatVal)} ₴</strong><br>
                    Доля: <strong>${topCatPct}%</strong> от всех расходов
                </div>
            </div>
        `;
    }

    const assetsStrip = document.getElementById('report-assets-strip');
    const trendCard = document.getElementById('close-trend-card');
    const goalsCard = document.getElementById('close-goals-card');

    if (isClose) {
        const usdRate = await getExchangeRate();
        const totalUAH = Math.max(0, OWNER_ASSETS.cardUAH + OWNER_ASSETS.cashUAH + data.allTimeSaved);
        const dollarsInUAH = OWNER_ASSETS.dollarsAmount * usdRate;
        const absoluteTotal = totalUAH + dollarsInUAH;

        assetsStrip.style.display = 'grid';
        assetsStrip.innerHTML = `
            <div class="asset-box">
                <i class='bx bx-credit-card-front'></i>
                <div>
                    <span class="asset-label">На карте (база + копилка)</span>
                    <span class="asset-val">~${formatMoney(OWNER_ASSETS.cardUAH + data.allTimeSaved)} ₴</span>
                </div>
            </div>
            <div class="asset-box">
                <i class='bx bx-coin-stack'></i>
                <div>
                    <span class="asset-label">Наличные в гривнах</span>
                    <span class="asset-val">~${formatMoney(OWNER_ASSETS.cashUAH)} ₴</span>
                </div>
            </div>
            <div class="asset-box">
                <i class='bx bx-dollar-circle'></i>
                <div>
                    <span class="asset-label">Валюта (курс НБУ ${usdRate.toFixed(2)} ₴)</span>
                    <span class="asset-val">${OWNER_ASSETS.dollarsAmount} $ (~${formatMoney(dollarsInUAH)} ₴)</span>
                </div>
            </div>
            <div class="asset-box">
                <i class='bx bx-shield-alt-2'></i>
                <div>
                    <span class="asset-label">Общий капитал</span>
                    <span class="asset-val plus">~${formatMoney(absoluteTotal)} ₴</span>
                </div>
            </div>
        `;

        trendCard.style.display = 'block';
        goalsCard.style.display = 'block';
        renderCloseGoals(totalUAH, absoluteTotal, dollarsInUAH);
    } else {
        assetsStrip.style.display = 'none';
        assetsStrip.innerHTML = '';
        trendCard.style.display = 'none';
        goalsCard.style.display = 'none';
        document.getElementById('report-goals-list').innerHTML = '';
    }

    renderReportCharts(data, isClose);
    renderCategoriesList(sortedCats, data);
    renderMonthsAccordion(data.monthsDetailed, isClose);
}

function renderCloseGoals(totalUAH, absoluteTotal, dollarsInUAH) {
    const goalsContainer = document.getElementById('report-goals-list');
    goalsContainer.innerHTML = '';

    if (typeof MY_GOALS === 'undefined') return;

    const cushionGoal = MY_GOALS.find(g => g.isCushion);
    const activeGoals = MY_GOALS.filter(g => !g.isCushion && !g.isArchived);

    const cushionTarget = cushionGoal ? cushionGoal.target : 0;
    const cushionAllocated = Math.min(absoluteTotal, cushionTarget);
    const uahNeededForCushion = Math.max(0, cushionTarget - dollarsInUAH);
    const freeUAH = Math.max(0, totalUAH - uahNeededForCushion);

    const allToRender = [];
    if (cushionGoal) {
        allToRender.push({
            name: cushionGoal.name,
            allocated: cushionAllocated,
            target: cushionTarget,
            pct: Math.min((cushionAllocated / cushionTarget) * 100, 100),
            note: 'Учитывает весь капитал (₴ + $)'
        });
    }

    activeGoals.forEach(g => {
        const allocated = Math.min(freeUAH, g.target);
        allToRender.push({
            name: g.name,
            allocated,
            target: g.target,
            pct: Math.min((allocated / g.target) * 100, 100),
            note: 'Свободные средства в ₴ сверх подушки'
        });
    });

    allToRender.forEach(item => {
        const isDone = item.pct >= 100;
        const barColor = isDone ? 'var(--success)' : 'var(--primary-color)';
        goalsContainer.innerHTML += `
            <div class="goal-box">
                <div class="goal-box-top">
                    <span style="display: flex; align-items: center; gap: 6px;">
                        <i class='bx ${isDone ? "bxs-check-circle" : "bx-target-lock"}' style="color: ${barColor}; font-size: 1.1rem;"></i>
                        ${item.name}
                    </span>
                    <span>${formatMoney(item.allocated)} / ~${formatMoney(item.target)} ₴ (${item.pct.toFixed(0)}%)</span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${item.pct}%; background: ${barColor};"></div>
                </div>
                <div style="font-size: 0.73rem; opacity: 0.6; margin-top: 5px;">${item.note}</div>
            </div>
        `;
    });

    const totalActiveTarget = cushionTarget + activeGoals.reduce((sum, g) => sum + g.target, 0);
    const overallPct = totalActiveTarget > 0 ? Math.min((absoluteTotal / totalActiveTarget) * 100, 100) : 0;
    document.getElementById('shared-overall-goal-badge').innerText = `Общий прогресс: ${overallPct.toFixed(1)}%`;
}

function renderCategoriesList(sortedCats, data) {
    const container = document.getElementById('report-categories-list');
    container.innerHTML = '';

    if (sortedCats.length === 0) {
        container.innerHTML = '<p style="opacity: 0.6;">Нет данных о расходах за выбранный период.</p>';
        return;
    }

    sortedCats.forEach(([catKey, sum], index) => {
        const cfg = categoryConfig[catKey] || { label: 'Другое', color: '#95a5a6', icon: 'bx-category' };
        const pct = data.totalExpense > 0 ? ((sum / data.totalExpense) * 100).toFixed(1) : '0.0';
        const avgPerMonth = sum / data.monthsCount;

        container.innerHTML += `
            <div class="cat-row-card">
                <div class="cat-row-top">
                    <div class="cat-dot-name">
                        <span style="opacity: 0.45; font-size: 0.8rem;">#${index + 1}</span>
                        <span class="cat-dot" style="background: ${cfg.color};"></span>
                        <i class='bx ${cfg.icon}' style="color: ${cfg.color}; font-size: 1.1rem;"></i>
                        <span>${cfg.label}</span>
                    </div>
                    <div>${formatMoney(sum, true)} ₴</div>
                </div>
                <div class="progress-bar-bg" style="height: 8px;">
                    <div class="progress-bar-fill" style="width: ${pct}%; background: ${cfg.color};"></div>
                </div>
                <div class="cat-row-sub">
                    <span>Доля в расходах: <strong>${pct}%</strong></span>
                    <span>В среднем: <strong>~${formatMoney(avgPerMonth)} ₴/мес</strong></span>
                </div>
            </div>
        `;
    });
}

function renderMonthsAccordion(monthsList, isClose) {
    const container = document.getElementById('report-months-accordion');
    container.innerHTML = '';

    monthsList.forEach((m, idx) => {
        const weeksHTML = m.weeks.map(w => {
            const lines = w.categories.map(c => `
                <div class="week-cat-line">
                    <span style="display: flex; align-items: center; gap: 5px;">
                        <span style="width: 6px; height: 6px; border-radius: 50%; background: ${c.color};"></span>
                        ${c.label}
                    </span>
                    <strong>-${formatMoney(c.amount, true)} ₴</strong>
                </div>
            `).join('');

            return `
                <div class="week-box">
                    <div class="week-box-head">
                        <span>Неделя ${w.weekNum}</span>
                        <span class="minus">-${formatMoney(w.total, true)} ₴</span>
                    </div>
                    ${lines}
                </div>
            `;
        }).join('');

        const rightSummaryHTML = isClose
            ? `
                <span class="plus">+${formatMoney(m.income)} ₴</span>
                <span class="minus">-${formatMoney(m.expense)} ₴</span>
                <span style="color: var(--primary-color);">Итог: ${m.saved >= 0 ? '+' : ''}${formatMoney(m.saved)} ₴</span>
            `
            : `
                <span class="minus">Потрачено: -${formatMoney(m.expense, true)} ₴</span>
            `;

        const itemEl = document.createElement('div');
        itemEl.className = `month-item ${idx === 0 ? 'open' : ''}`;
        itemEl.innerHTML = `
            <div class="month-summary">
                <div class="month-title">
                    <i class='bx bx-calendar-alt' style="color: var(--primary-color); font-size: 1.2rem;"></i>
                    <span>${m.fullLabel}</span>
                </div>
                <div class="month-Write-nums">
                    ${rightSummaryHTML}
                    <i class='bx bx-chevron-down' style="font-size: 1.3rem; transition: transform 0.25s;"></i>
                </div>
            </div>
            <div class="month-details">
                ${m.weeks.length > 0
                    ? `<div class="weeks-breakdown-grid">${weeksHTML}</div>`
                    : `<p style="font-size: 0.82rem; opacity: 0.6; margin-top: 10px;">Траты по неделям не зафиксированы.</p>`
                }
            </div>
        `;

        itemEl.querySelector('.month-summary').addEventListener('click', () => {
            itemEl.classList.toggle('open');
        });

        container.appendChild(itemEl);
    });
}

function renderReportCharts(data, isClose) {
    if (mainChartInstance) mainChartInstance.destroy();
    if (doughnutChartInstance) doughnutChartInstance.destroy();
    if (trendChartInstance) trendChartInstance.destroy();

    const isDark = document.body.classList.contains('dark-mode');
    const textColor = isDark ? '#e4e6eb' : '#333333';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)';

    Chart.defaults.color = textColor;
    Chart.defaults.font.family = "'Inter', sans-serif";

    document.getElementById('main-chart-title').innerHTML = isClose
        ? "<i class='bx bx-bar-chart-alt-2'></i> Доходы и Расходы по месяцам"
        : "<i class='bx bx-bar-chart-alt-2'></i> Динамика трат по месяцам";
    document.getElementById('main-chart-sub').innerText = isClose
        ? "Сравнение поступлений и трат за выбранный период"
        : "Помесячный объём расходов";

    const datasetsMain = isClose
        ? [
            { label: 'Доход', data: data.chartIncomes, backgroundColor: '#2ecc71', borderRadius: 6 },
            { label: 'Расход', data: data.chartExpenses, backgroundColor: '#e74c3c', borderRadius: 6 }
        ]
        : [
            { label: 'Расходы', data: data.chartExpenses, backgroundColor: '#e74c3c', borderRadius: 6 }
        ];

    const ctxMain = document.getElementById('sharedMainChart').getContext('2d');
    mainChartInstance = new Chart(ctxMain, {
        type: 'bar',
        data: {
            labels: data.chartLabels,
            datasets: datasetsMain
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { grid: { display: false } },
                y: {
                    beginAtZero: true,
                    grid: { color: gridColor },
                    ticks: { callback: val => `${val} ₴` }
                }
            },
            plugins: {
                legend: { display: isClose },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: ctx => `${ctx.dataset.label}: ${formatMoney(ctx.parsed.y, true)} ₴`
                    }
                }
            }
        }
    });

    const sortedCats = Object.entries(data.categoryTotals).sort((a, b) => b[1] - a[1]);
    const catLabels = sortedCats.map(([k]) => categoryConfig[k]?.label || 'Другое');
    const catData = sortedCats.map(([, v]) => Number(v.toFixed(2)));
    const catColors = sortedCats.map(([k]) => categoryConfig[k]?.color || '#95a5a6');

    const ctxDoughnut = document.getElementById('sharedDoughnutChart').getContext('2d');
    doughnutChartInstance = new Chart(ctxDoughnut, {
        type: 'doughnut',
        data: {
            labels: catLabels,
            datasets: [{
                data: catData,
                backgroundColor: catColors,
                borderColor: isDark ? '#1e1e1e' : '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '64%',
            plugins: {
                legend: { position: 'right', labels: { boxWidth: 12, padding: 10 } },
                tooltip: {
                    callbacks: {
                        label: ctx => {
                            const val = ctx.raw || 0;
                            const pct = data.totalExpense > 0 ? ((val / data.totalExpense) * 100).toFixed(1) : 0;
                            return ` ${ctx.label}: ${formatMoney(val, true)} ₴ (${pct}%)`;
                        }
                    }
                }
            }
        }
    });

    if (isClose) {
        const ctxTrend = document.getElementById('sharedTrendChart').getContext('2d');
        trendChartInstance = new Chart(ctxTrend, {
            type: 'line',
            data: {
                labels: data.chartLabels,
                datasets: [{
                    label: 'Баланс копилки',
                    data: data.chartCumulative,
                    borderColor: '#4e54c8',
                    backgroundColor: 'rgba(78, 84, 200, 0.16)',
                    borderWidth: 3,
                    tension: 0.35,
                    fill: true,
                    pointBackgroundColor: '#4e54c8',
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { grid: { display: false } },
                    y: {
                        grid: { color: gridColor },
                        ticks: { callback: val => `${val} ₴` }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: ctx => `Накоплено: ${formatMoney(ctx.parsed.y)} ₴`
                        }
                    }
                }
            }
        });
    }
}

function updateChartsTheme() {
    const isDark = document.body.classList.contains('dark-mode');
    const textColor = isDark ? '#e4e6eb' : '#333333';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)';

    Chart.defaults.color = textColor;

    [mainChartInstance, trendChartInstance].forEach(chart => {
        if (!chart) return;
        chart.options.scales.x.ticks.color = textColor;
        chart.options.scales.y.ticks.color = textColor;
        chart.options.scales.y.grid.color = gridColor;
        if (chart.options.plugins.legend?.labels) {
            chart.options.plugins.legend.labels.color = textColor;
        }
        chart.update();
    });

    if (doughnutChartInstance) {
        doughnutChartInstance.options.plugins.legend.labels.color = textColor;
        doughnutChartInstance.data.datasets[0].borderColor = isDark ? '#1e1e1e' : '#ffffff';
        doughnutChartInstance.update();
    }
}

function startSessionCountdown(session) {
    if (countdownInterval) clearInterval(countdownInterval);

    const countdownEl = document.getElementById('countdown-text');

    const tick = () => {
        const diff = session.exp - Date.now();
        if (diff <= 0) {
            clearInterval(countdownInterval);
            expireCurrentSession();
            return;
        }

        const totalSec = Math.floor(diff / 1000);
        const days = Math.floor(totalSec / 86400);
        const hours = Math.floor((totalSec % 86400) / 3600);
        const mins = Math.floor((totalSec % 3600) / 60);
        const secs = totalSec % 60;

        const pad = n => String(n).padStart(2, '0');
        if (days > 0) {
            countdownEl.innerText = `${days}д ${pad(hours)}:${pad(mins)}:${pad(secs)}`;
        } else {
            countdownEl.innerText = `${pad(hours)}:${pad(mins)}:${pad(secs)}`;
        }
    };

    tick();
    countdownInterval = setInterval(tick, 1000);
}

function expireCurrentSession() {
    localStorage.removeItem(STORAGE_SESSION_KEY);
    if (mainChartInstance) mainChartInstance.destroy();
    if (doughnutChartInstance) doughnutChartInstance.destroy();
    if (trendChartInstance) trendChartInstance.destroy();

    document.getElementById('report-metrics-grid').innerHTML = '';
    document.getElementById('report-assets-strip').innerHTML = '';
    document.getElementById('report-categories-list').innerHTML = '';
    document.getElementById('report-goals-list').innerHTML = '';
    document.getElementById('report-months-accordion').innerHTML = '';

    document.getElementById('setup-view').style.display = 'none';
    document.getElementById('report-view').style.display = 'none';
    document.getElementById('expired-view').style.display = 'block';

    const expiredBackBtn = document.getElementById('expired-back-btn');
    if (isOwnerUnlocked) {
        expiredBackBtn.style.display = 'inline-flex';
        expiredBackBtn.onclick = (e) => {
            e.preventDefault();
            window.history.replaceState({}, document.title, window.location.pathname);
            showSetupView();
        };
    }
}

function showSetupView() {
    if (countdownInterval) clearInterval(countdownInterval);
    document.getElementById('page-main-title').innerText = 'Поделиться статистикой';
    document.getElementById('report-view').style.display = 'none';
    document.getElementById('expired-view').style.display = 'none';
    document.getElementById('setup-view').style.display = 'block';
}

function showToast(message) {
    const toast = document.getElementById('toast-notification');
    document.getElementById('toast-text').innerText = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2800);
}

function initSetupControls() {
    const modeCards = document.querySelectorAll('.mode-card');
    modeCards.forEach(card => {
        card.addEventListener('click', () => {
            modeCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedMode = card.dataset.mode;
        });
    });

    const periodBtns = document.querySelectorAll('#period-selector .option-pill');
    periodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            periodBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedPeriod = btn.dataset.period;
        });
    });

    const durationBtns = document.querySelectorAll('#duration-selector .option-pill');
    durationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            durationBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedMinutes = parseInt(btn.dataset.minutes, 10);
        });
    });

    document.getElementById('create-session-btn').addEventListener('click', () => {
        const expTime = Date.now() + selectedMinutes * 60 * 1000;
        const newSession = {
            mode: selectedMode,
            period: selectedPeriod,
            exp: expTime
        };

        localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(newSession));
        const token = encodeSessionToken(newSession);
        const newUrl = `${window.location.pathname}?s=${token}`;
        window.history.replaceState({}, document.title, newUrl);

        renderReportSession(newSession);
        startSessionCountdown(newSession);
        showToast('Временная страница создана!');
    });

    document.getElementById('copy-link-btn').addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            showToast('Временная ссылка скопирована!');
        });
    });

    document.getElementById('reconfigure-btn').addEventListener('click', () => {
        showSetupView();
    });

    document.getElementById('destroy-session-btn').addEventListener('click', () => {
        window.history.replaceState({}, document.title, window.location.pathname);
        expireCurrentSession();
        showToast('Временная страница удалена');
    });
}

function initApp() {
    initSetupControls();

    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get('s');

    if (tokenParam) {
        const decoded = decodeSessionToken(tokenParam);
        if (!decoded || Date.now() >= decoded.exp) {
            expireCurrentSession();
            return;
        }
        renderReportSession(decoded);
        startSessionCountdown(decoded);
        return;
    }

    if (!isOwnerUnlocked) {
        window.location.href = '../my-expenses.html';
        return;
    }

    const savedRaw = localStorage.getItem(STORAGE_SESSION_KEY);
    if (savedRaw) {
        try {
            const savedSession = JSON.parse(savedRaw);
            if (savedSession.exp && Date.now() < savedSession.exp) {
                const token = encodeSessionToken(savedSession);
                window.history.replaceState({}, document.title, `${window.location.pathname}?s=${token}`);
                renderReportSession(savedSession);
                startSessionCountdown(savedSession);
                return;
            } else {
                localStorage.removeItem(STORAGE_SESSION_KEY);
            }
        } catch (e) {
            localStorage.removeItem(STORAGE_SESSION_KEY);
        }
    }

    showSetupView();
}

initApp();