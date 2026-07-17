const mainWrapper = document.querySelector('.main-wrapper');

if (localStorage.getItem('finance_unlocked') !== 'true') {
    mainWrapper.style.display = 'none';
    
    const overlay = document.createElement('div');
    overlay.id = 'finance-login-overlay';
    overlay.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:var(--bg-color); z-index:9999; display:flex; justify-content:center; align-items:center; transition: background-color 0.3s;';
    
    overlay.innerHTML = `
        <div style="background:var(--card-bg); padding:40px; border-radius:var(--border-radius); box-shadow:var(--shadow); text-align:center; width: 90%; max-width: 380px;">
            <i class='bx bxs-lock-alt' style="font-size: 4rem; color: var(--primary-color); margin-bottom: 10px;"></i>
            <h2 style="margin-bottom: 5px; color: var(--text-color);">У вас нет доступа к финансам</h2>
            <p style="margin-bottom: 25px; color: var(--text-color); opacity: 0.6; font-size: 0.85rem;">
                Подсказка: Лучшая девочка из Re:Zero 🦋 
            </p>
            
            <input type="password" id="finance-pwd" placeholder="****" 
                style="width: 100%; padding: 15px; margin-bottom: 15px; border: 2px solid var(--input-bg); border-radius: 12px; background: var(--input-bg); color: var(--text-color); outline: none; font-size: 1.5rem; text-align: center; letter-spacing: 5px; transition: border-color 0.3s;">
            
            <button id="finance-btn" 
                style="width: 100%; padding: 15px; background: var(--primary-color); color: white; border: none; border-radius: 12px; cursor: pointer; font-weight: 600; font-size: 1.1rem; transition: opacity 0.2s;">
                Войти
            </button>
            
            <p id="finance-err" style="color: var(--danger); margin-top: 15px; font-size: 0.9rem; opacity: 0; transition: opacity 0.3s;">
                Неверный пароль!
            </p>
            
            <a href="../index.html" style="display: block; margin-top: 20px; color: var(--text-color); opacity: 0.5; text-decoration: none; font-size: 0.85rem; transition: opacity 0.2s;">
                &larr; Назад к проектам
            </a>
        </div>
    `;
    
    document.body.appendChild(overlay);

    const input = document.getElementById('finance-pwd');
    const btn = document.getElementById('finance-btn');
    const err = document.getElementById('finance-err');

    input.addEventListener('focus', () => input.style.borderColor = 'var(--primary-color)');
    input.addEventListener('blur', () => input.style.borderColor = 'var(--input-bg)');

    function checkPassword() {
        if (input.value === 'hentaif') {
            localStorage.setItem('finance_unlocked', 'true');
            overlay.remove();
            mainWrapper.style.display = '';
        } else {
            err.style.opacity = '1';
            input.value = '';
            
            overlay.firstElementChild.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(0)' }
            ], { duration: 400 });
            
            setTimeout(() => { err.style.opacity = '0'; }, 2000);
        }
    }

    btn.addEventListener('click', checkPassword);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPassword();
    });

}

const balanceEl = document.getElementById('display-balance');
const incomeEl = document.getElementById('display-income');
const expenseEl = document.getElementById('display-expense');
const statsContainer = document.getElementById('categories-stats');
const currentMonthLabel = document.getElementById('current-month-label');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const weekBtns = document.querySelectorAll('.week-btn');
const statsTitle = document.getElementById('stats-title');
const themeToggle = document.getElementById('theme-toggle');
const incomeLabel = incomeEl.previousElementSibling;
const globalSavingsEl = document.getElementById('global-savings');

const categoryConfig = {
    food: { label: 'Продукты', icon: 'bx-baguette', color: 'cat-food' },
    snacks: { label: 'Вкусняшки', icon: 'bx-cookie', color: 'cat-snacks' },
    dining: { label: 'Рестораны', icon: 'bx-restaurant', color: 'cat-dining' }, 
    transport: { label: 'Проезд', icon: 'bx-bus', color: 'cat-transport' },
    rent: { label: 'Оренда', icon: 'bx-home', color: 'cat-rent' },
    services: { label: 'Услуги', icon: 'bx-wifi', color: 'cat-services' },
    health: { label: 'Здоровье', icon: 'bx-plus-medical', color: 'cat-health' },
    barber: { label: 'Барбершоп', icon: 'bx-cut', color: 'cat-barber' },
    clothes: { label: 'Одежда', icon: 'bx-closet', color: 'cat-clothes' },
    tech: { label: 'Техника', icon: 'bx-chip', color: 'cat-tech' },
    gifts: { label: 'Подарки', icon: 'bx-gift', color: 'cat-gifts' },
    games: { label: 'Игры', icon: 'bx-joystick', color: 'cat-games' },
    saved: { label: 'Отложено', icon: 'bx-piggy-bank', color: 'cat-saved' },
    other: { label: 'Другое', icon: 'bx-question-mark', color: 'cat-other' }
};

let currentDate = new Date(); 
let currentWeek = 'all';

function init() {
    updateMonthLabel();
    render();
    renderGlobalSavings();
}

function updateMonthLabel() {
    const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    currentMonthLabel.innerText = `${monthNames[month]} ${year}`;
    
    if (year <= 2026 && month <= 0) {
        prevMonthBtn.disabled = true;
    } else {
        prevMonthBtn.disabled = false;
    }
}

function render() {
    statsContainer.innerHTML = '';
    
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const key = `${year}-${month}`;

    const monthData = (typeof database !== 'undefined' && database[key]) ? database[key] : null;

    if (!monthData) {
        setValues(0, 0);
        statsContainer.innerHTML = `<div style="text-align:center; opacity:0.5; margin-top:20px;"><p>Нет данных (${key})</p></div>`;
        return;
    }

    const totalMonthIncome = (monthData.income.fix || 0) + (monthData.income.extra || 0);

    let startBalanceForView = totalMonthIncome;
    let expensesForView = 0; 
    let categoriesForView = {};

    if (currentWeek === 'all') {
        incomeLabel.innerText = "Доход";
        startBalanceForView = totalMonthIncome;
        
        ['1', '2', '3', '4', '5', '6'].forEach(w => {
            const weekStats = getWeekStats(monthData, w);
            expensesForView += weekStats.total;
            mergeCategories(categoriesForView, weekStats.categories);
        });

    } else {
        
        const weekNum = parseInt(currentWeek);
        let previousExpenses = 0;

        for (let i = 1; i < weekNum; i++) {
            const weekStats = getWeekStats(monthData, i.toString());
            previousExpenses += weekStats.total;
        }

        startBalanceForView = totalMonthIncome - previousExpenses;
        
        incomeLabel.innerText = weekNum === 1 ? "Доход" : "На начало недели";

        const currentWeekStats = getWeekStats(monthData, currentWeek);
        expensesForView = currentWeekStats.total;
        categoriesForView = currentWeekStats.categories;
    }

    setValues(startBalanceForView, expensesForView);
    renderStats(categoriesForView, expensesForView);
}

function renderGlobalSavings() {
    if (!globalSavingsEl) return;

    let totalSaved = 0;
    
    const now = new Date();
    const currentRealYear = now.getFullYear();
    const currentRealMonth = now.getMonth() + 1;

    for (const key in database) {
        const [yearStr, monthStr] = key.split('-');
        const year = parseInt(yearStr);
        const month = parseInt(monthStr);

        if (year < 2026) continue;
        if (year > currentRealYear) continue;
        if (year === currentRealYear && month > currentRealMonth) continue;

        const monthData = database[key];
        const income = (monthData.income.fix || 0) + (monthData.income.extra || 0);
        
        let expense = 0;
        if (monthData.weeks) {
            Object.values(monthData.weeks).forEach(week => {
                Object.values(week).forEach(amount => {
                    expense += amount;
                });
            });
        }

        totalSaved += (income - expense);
    }

    globalSavingsEl.innerText = `${totalSaved.toFixed(0)} ₴`;
    if (totalSaved >= 0) {
        globalSavingsEl.style.color = 'var(--success)';
    } else {
        globalSavingsEl.style.color = 'var(--danger)';
    }
}

function getWeekStats(monthData, weekKey) {
    let total = 0;
    let cats = {};
    
    if (monthData.weeks && monthData.weeks[weekKey]) {
        for (const [cat, amount] of Object.entries(monthData.weeks[weekKey])) {
            if (amount > 0) {
                if (!cats[cat]) cats[cat] = 0;
                cats[cat] += amount;
                total += amount;
            }
        }
    }
    return { total: total, categories: cats };
}

function mergeCategories(target, source) {
    for (const [cat, amount] of Object.entries(source)) {
        if (!target[cat]) target[cat] = 0;
        target[cat] += amount;
    }
}

function setValues(income, expense) {
    const balance = income - expense;
    incomeEl.innerText = `+${income.toFixed(0)} ₴`; 
    expenseEl.innerText = `-${expense.toFixed(2)} ₴`;
    balanceEl.innerText = `${balance.toFixed(2)} ₴`;
    balanceEl.style.color = balance >= 0 ? 'var(--success)' : 'var(--danger)';
}

function renderStats(categories, totalExpenses) {
    const sortedCats = Object.keys(categories).sort((a, b) => categories[b] - categories[a]);

    if (sortedCats.length === 0) {
        statsContainer.innerHTML = '<p style="text-align:center; opacity:0.5; margin-top:20px;">Трат нет</p>';
        return;
    }

    sortedCats.forEach(cat => {
        const amount = categories[cat];
        const percentage = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;
        const config = categoryConfig[cat] || categoryConfig.other;

        const el = document.createElement('div');
        el.className = 'stat-item';
        el.innerHTML = `
            <div class="stat-header">
                <span><i class='bx ${config.icon}'></i> ${config.label}</span>
                <span>${amount.toFixed(2)} ₴ (${Math.round(percentage)}%)</span>
            </div>
            <div class="progress-bar-bg">
                <div class="progress-bar-fill ${config.color}" style="width: ${percentage}%"></div>
            </div>
        `;
        statsContainer.appendChild(el);
    });
}

weekBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        weekBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentWeek = btn.dataset.week;
        statsTitle.innerText = currentWeek === 'all' ? 'Расходы: Весь месяц' : `Расходы: Неделя ${currentWeek}`;
        render();
    });
});

prevMonthBtn.addEventListener('click', () => {
    if (currentDate.getFullYear() <= 2026 && currentDate.getMonth() <= 0) return;
    
    currentDate.setMonth(currentDate.getMonth() - 1); 
    init(); 
});
nextMonthBtn.addEventListener('click', () => { currentDate.setMonth(currentDate.getMonth() + 1); init(); });

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = "<i class='bx bx-sun'></i>";
} else {
    document.body.classList.remove('dark-mode');
    themeToggle.innerHTML = "<i class='bx bx-moon'></i>";
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    themeToggle.innerHTML = isDark ? "<i class='bx bx-sun'></i>" : "<i class='bx bx-moon'></i>";
});

const openCalendarBtn = document.getElementById('open-calendar-btn');
const closeCalendarBtn = document.getElementById('close-calendar-btn');
const calendarModal = document.getElementById('calendar-modal');
const calendarGrid = document.getElementById('calendar-grid');

const shortMonthNames = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

function populateCalendar() {
    calendarGrid.innerHTML = '';
    
    const availableKeys = Object.keys(database).sort();
    const realNow = new Date();
    const realYear = realNow.getFullYear();
    const realMonth = realNow.getMonth();

    availableKeys.forEach(key => {
        const [yearStr, monthStr] = key.split('-');
        const year = parseInt(yearStr);
        const monthIndex = parseInt(monthStr) - 1; 

        const btn = document.createElement('button');
        btn.className = 'week-btn'; 
        btn.innerText = `${shortMonthNames[monthIndex]} ${year}`;
        
        if (currentDate.getFullYear() === year && currentDate.getMonth() === monthIndex) {
            btn.classList.add('active');
        }

        if (year === realYear && monthIndex === realMonth) {
            btn.classList.add('real-current-month');
            btn.title = "Текущий месяц";
        }

        btn.addEventListener('click', () => {
            currentDate = new Date(year, monthIndex, 1);
            init();
            calendarModal.style.display = 'none';
        });

        calendarGrid.appendChild(btn);
    });
}

openCalendarBtn.addEventListener('click', () => {
    populateCalendar();
    calendarModal.style.display = 'flex';
});

closeCalendarBtn.addEventListener('click', () => {
    calendarModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === calendarModal) {
        calendarModal.style.display = 'none';
    }
});

init();