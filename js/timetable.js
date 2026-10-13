if (!window.TimetableData) window.TimetableData = { schedules: {}, semesters: {} };

const allSchedules = window.TimetableData.schedules;
const semesterConfigs = window.TimetableData.semesters;

const dateOverrides = {
    "2026-03-06": { remove: [2, 3, 4] }, "2026-03-13": { remove: [2, 3, 4] }, "2026-03-20": { remove: [2, 3, 4] },
    "2026-04-02": { remove: [7, 8] }, "2026-04-09": { remove: [7, 8] },
    "2026-04-22": { remove: [3, 4, 5, 6], },
    "2026-05-25": { remove: [5, 6], }, "2026-06-01": { remove: [1, 2, 3, 4, 5], },
    "2026-03-25": { add: [{ num: 8, start: "14:05", end: "14:40", subj: "Основи прогр. інженерії (Відпр.)", type: "EX", room: "2247", teacher: "Коваленко О.О." }] },
    "2026-03-27": { add: [{ num: 8, start: "14:05", end: "14:40", subj: "Основи прогр. інженерії (Відпр.)", type: "EX", room: "2247", teacher: "Коваленко О.О." }] },
    "2026-03-30": { add: [{ num: 8, start: "15:30", end: "16:15", subj: "Основи прогр. інженерії (Відпр.)", type: "EX", room: "2247", teacher: "Коваленко О.О." }] },
    "2026-04-01": { remove: [1], add: [{ num: 1, start: "08:15", end: "09:00", subj: "Графічні редактори (Кол.)", type: "KOL", room: "2247A", teacher: "Чехместрук Р.Ю." }, { num: 8, start: "15:30", end: "16:15", subj: "Основи прогр. інженерії (Відпр.)", type: "EX", room: "2247", teacher: "Коваленко О.О." }] },
    "2026-04-03": { add: [{ num: 8, start: "15:30", end: "16:15", subj: "Основи прогр. інженерії (Відпр.)", type: "EX", room: "2247", teacher: "Коваленко О.О." }] },
    "2026-04-06": { add: [{ num: 8, start: "15:30", end: "16:15", subj: "Основи прогр. інженерії (Відпр.)", type: "EX", room: "2247", teacher: "Коваленко О.О." }] },
    "2026-04-08": { remove: [1, 2, 6], add: [{ num: 1, start: "08:15", end: "09:00", subj: "Архітектура та проект. ПЗ (Кол.)", type: "KOL", room: "2247A", teacher: "Бабюк Н.П." }, { num: 2, start: "09:15", end: "10:00", subj: "Архітектура та проект. ПЗ (Кол.)", type: "KOL", room: "2247A", teacher: "Бабюк Н.П." }, { num: 6, start: "13:15", end: "14:00", subj: "Архітектура та проект. ПЗ (Кол.)", type: "KOL", room: "2247A", teacher: "Бабюк Н.П." }, { num: 8, start: "15:30", end: "16:15", subj: "Основи прогр. інженерії (Відпр.)", type: "EX", room: "2247", teacher: "Коваленко О.О." }] },
    "2026-04-10": { remove: [2, 3], add: [{ num: 2, start: "09:15", end: "10:00", subj: "Основи прогр. інженерії (Кол.)", type: "KOL", room: "2247A", teacher: "Коваленко О.О." }, { num: 3, start: "10:15", end: "11:00", subj: "Основи прогр. інженерії (Кол.)", type: "KOL", room: "2247A", teacher: "Коваленко О.О." }, { num: 8, start: "15:30", end: "16:15", subj: "Основи прогр. інженерії (Кол.)", type: "KOL", room: "Онлайн", teacher: "Коваленко О.О." }] },
    "2026-04-13": { remove: [5, 6], add: [{ num: 8, start: "15:30", end: "16:15", subj: "Основи прогр. інженерії (Відпр.)", type: "EX", room: "2247", teacher: "Коваленко О.О." }] },
    "2026-04-20": { remove: [5], add: [{ num: 5, start: "12:15", end: "13:00", subj: "Метрол. оцінювання ПЗ (Кол.)", type: "KOL", room: "12 Зал", teacher: "Дудатьєв І.А." }] },
    "2026-04-27": { remove: [7], add: [{ num: 7, start: "14:00", end: "15:00", subj: "Основи прогр. інженерії (Відпр.)", type: "EX", room: "2108", teacher: "Денисюк А.В." }] },
    "2026-05-18": { remove: [1, 2, 3, 4, 5], add: [{ num: 5, start: "12:15", end: "13:00", subj: "Метрол. оцінювання ПЗ (Кол.)", type: "KOL", room: "12 Зал", teacher: "Дудатьєв І.А." }] },
    "2026-05-27": { remove: [1, 3, 4], add: [{ num: 1, start: "08:15", end: "09:00", subj: "Графічні редактори (Кол.)", type: "KOL", room: "2247A", teacher: "Чехместрук Р.Ю." }] },
    "2026-05-29": { remove: [7] },
    "2026-06-03": { remove: [1, 2, 3, 4, 6], add: [{ num: 1, start: "08:15", end: "09:00", subj: "Архітектура та проект. ПЗ (Кол.)", type: "KOL", room: "2247A", teacher: "Бабюк Н.П." }, { num: 2, start: "09:15", end: "10:00", subj: "Архітектура та проект. ПЗ (Кол.)", type: "KOL", room: "2247A", teacher: "Бабюк Н.П." }] },
    "2026-06-08": { add: [{ num: 3, start: "09:00", end: "10:00", subj: "Архітектура та проект. ПЗ", type: "CONS", room: "2108", teacher: "Бабюк Н.П." }] },
    "2026-06-09": { add: [{ num: 3, start: "10:00", end: "11:20", subj: "Архітектура та проект. ПЗ", type: "EXAM", room: "2108", teacher: "Бабюк Н.П." }] },
    "2026-06-10": { add: [{ num: 3, start: "09:00", end: "10:00", subj: "Основи прогр. інженерії", type: "CONS", room: "2110", teacher: "Коваленко О.О." }] },
    "2026-06-11": { add: [{ num: 3, start: "10:00", end: "11:20", subj: "Основи прогр. інженерії", type: "EXAM", room: "2110", teacher: "Коваленко О.О." }] },
    "2026-06-12": { add: [{ num: 3, start: "09:00", end: "10:00", subj: "Навчальна практика", type: "ZALIK", room: "2108", teacher: "Романюк О.В." }] },
    "2026-06-13": { add: [{ num: 3, start: "10:00", end: "11:20", subj: "Теор. ймов. та мат. стат.", type: "CONS", room: "2110", teacher: "Ракитянська Г.Б." }] },
    "2026-06-14": { add: [{ num: 3, start: "10:00", end: "11:20", subj: "Теор. ймов. та мат. стат.", type: "EXAM", room: "2110", teacher: "Ракитянська Г.Б." }] },
    "2026-06-15": { add: [{ num: 3, start: "10:00", end: "11:20", subj: "Метрол. оцінювання ПЗ", type: "CONS", room: "1315", teacher: "Дудатьєв І.А." }] },
    "2026-06-16": { add: [{ num: 3, start: "10:00", end: "11:20", subj: "Метрол. оцінювання ПЗ", type: "EXAM", room: "1411", teacher: "Дудатьєв І.А." }] },
    "2026-06-17": { add: [{ num: 3, start: "09:00", end: "10:00", subj: "Графічні редактори", type: "ZALIK", room: "2110", teacher: "Чехместрук Р.Ю." }] },
    "2026-06-18": { add: [{ num: 3, start: "09:00", end: "10:00", subj: "Політ. історія України ХХ ст.", type: "ZALIK", room: "2362", teacher: "Пономаренко А.Б." }] },
    "2026-06-19": { add: [{ num: 3, start: "09:00", end: "10:00", subj: "Іноземна мова", type: "ZALIK", room: "3416", teacher: "Кухарчук Г.В.", subgroup: 1 }, { num: 3, start: "09:00", end: "10:00", subj: "Іноземна мова", type: "ZALIK", room: "3433", teacher: "Чопляк В.В.", subgroup: 2 }] },
    "2026-10-07": { remove: [1, 2], add: [{ num: 1, start: "08:15", end: "09:00", subj: "Якість програмного забезпечення", type: "LR", room: "2431", teacher: "Миргородський А.В.", subgroup: 2 }, { num: 2, start: "09:15", end: "10:00", subj: "Якість програмного забезпечення", type: "LR", room: "2431", teacher: "Миргородський А.В.", subgroup: 2 }, { num: 1, start: "08:15", end: "09:00", subj: "Якість програмного забезпечення", type: "LR", room: "2431", teacher: "Романюк О.В.", subgroup: 1 }, { num: 2, start: "09:15", end: "10:00", subj: "Якість програмного забезпечення", type: "LR", room: "2431", teacher: "Романюк О.В.", subgroup: 1 }] },
    "2026-10-09": { remove: [3, 4], add: [{ num: 3, start: "10:15", end: "11:00", subj: "Комп'ютерна графіка", type: "LK", room: "5128", teacher: "Романюк О.Н." }, { num: 4, start: "11:15", end: "12:00", subj: "Комп'ютерна графіка", type: "LK", room: "5128", teacher: "Романюк О.Н." }] }
};

let viewDate = new Date(); 
let selectedDay = new Date().getDay();
if (selectedDay === 0) selectedDay = 7;

let currentSettings = { group: '5pi-24b', subgroup: 1 };

const savedSettings = localStorage.getItem('scheduleSettings');
if (savedSettings) {
    currentSettings = JSON.parse(savedSettings);
    const subgroupSelect = document.getElementById('subgroup-select');
    if (subgroupSelect) {
        subgroupSelect.value = currentSettings.subgroup;
    }
}

const subgroupSelectEl = document.getElementById('subgroup-select');
if (subgroupSelectEl) {
    subgroupSelectEl.addEventListener('change', (e) => {
        currentSettings.subgroup = parseInt(e.target.value);
        localStorage.setItem('scheduleSettings', JSON.stringify(currentSettings));
        renderSchedule();
        updateStatus();
    });
}

function getSemesterInfo(date) {
    for (const semId in semesterConfigs) {
        const config = semesterConfigs[semId];
        const start = new Date(config.startStudy);
        const endHol = new Date(config.endHolidays);
        if (date >= start && date <= endHol) {
            return { id: config.id, config: config };
        }
    }
    const y = date.getFullYear();
    const m = date.getMonth(); 
    if (y < 2026 || (y === 2026 && m < 7)) return { id: 4, config: semesterConfigs[4] };
    if ((y === 2026 && m >= 7) || (y === 2027 && m < 1)) return { id: 5, config: semesterConfigs[5] };
    return { id: 6, config: semesterConfigs[6] };
}

function getPeriodType(date, semConfig) {
    if (!semConfig) return 'study';
    const d = date.getTime();
    const startSess = new Date(semConfig.startSession).getTime();
    const endSess = new Date(semConfig.endSession).getTime();
    const startHol = new Date(semConfig.startHolidays).getTime();
    const endHol = new Date(semConfig.endHolidays).getTime();
    
    if (d >= startSess && d <= endSess) return 'session';
    if (d >= startHol && d <= endHol) return 'holidays';
    return 'study';
}

function getWeekType(date) {
    const semInfo = getSemesterInfo(date);
    if (!semInfo.config) return 1;
    const startSemester = new Date(semInfo.config.startStudy);
    const target = new Date(date);
    target.setHours(0,0,0,0);
    
    const diffTime = target.getTime() - startSemester.getTime();
    const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
    
    if (diffDays < 0) return 1;
    
    const weeksPassed = Math.floor((diffDays + (startSemester.getDay() || 7) - 1) / 7);
    return (weeksPassed % 2 === 0) ? 1 : 2; 
}

function getViewedDate() {
    const currentViewDayIndex = viewDate.getDay() || 7; 
    const diff = selectedDay - currentViewDayIndex;
    const d = new Date(viewDate);
    d.setDate(viewDate.getDate() + diff);
    return d;
}

function formatDateString(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function applyLateMayFilter(lessons, targetDate) {
    const filterStart = new Date('2026-05-18T00:00:00');
    const filterEnd = new Date('2026-06-07T23:59:59'); 
    if (targetDate >= filterStart && targetDate <= filterEnd) {
        return lessons.filter(l => {
            const subj = l.subj.toLowerCase();
            const type = l.type;
            if (subj.includes("іноземна")) return false;
            if (subj.includes("фізична культура")) return false;
            if (subj.includes("політ. історія") && type === "LK") return false;
            if (subj.includes("граф") && type === "PZ") return false;
            if (subj.includes("теор. ймов") && (type === "PZ" || type === "LR")) return false;
            if (subj.includes("метрол. оцінювання") && type === "LR") return false;
            if (subj.includes("основи прогр. інженерії") && type === "LR") return false;
            return true;
        });
    }
    return lessons;
}

function applyTimeOverrides(lessons, targetDate) {
    const cutoffDate = new Date('2026-03-30T00:00:00');
    const compareDate = new Date(targetDate);
    compareDate.setHours(0,0,0,0);
    
    if (compareDate >= cutoffDate) {
        const newTimes = {
            1: { start: "08:15", end: "09:00" }, 2: { start: "09:15", end: "10:00" },
            3: { start: "10:15", end: "11:00" }, 4: { start: "11:15", end: "12:00" },
            5: { start: "12:15", end: "13:00" }, 6: { start: "13:15", end: "14:00" },
            7: { start: "14:30", end: "15:15" }, 8: { start: "15:25", end: "16:10" }
        };
        lessons.forEach(l => {
            if(newTimes[l.num] && !['EXAM', 'CONS', 'ZALIK'].includes(l.type)) {
                l.start = newTimes[l.num].start; l.end = newTimes[l.num].end;
            }
        });
    }
}

function injectStyles() {
    if (!document.getElementById('dynamic-schedule-styles')) {
        const style = document.createElement('style');
        style.id = 'dynamic-schedule-styles';
        style.innerHTML = `
            .type-EX { border-left-color: #9333ea !important; } 
            .type-KOL { border-left-color: #ef4444 !important; } 
            .type-EXAM { border-left-color: #e11d48 !important; } 
            .type-CONS { border-left-color: #f59e0b !important; } 
            .type-ZALIK { border-left-color: #10b981 !important; } 
        `;
        document.head.appendChild(style);
    }
}

function init() {
    injectStyles(); initSwipeGestures(); updateDateDisplay(); renderTabs(); renderSchedule();
    updateStatus(); setCurrentYear(); updateDailyStreak(); setInterval(updateStatus, 1000);
}

function setCurrentYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.innerText = new Date().getFullYear();
}

function updateDailyStreak() {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const todayTime = today.getTime();
    let streakData = JSON.parse(localStorage.getItem('daily_streak')) || { count: 0, best: 0, lastVisit: 0 };
    const diffDays = Math.round((todayTime - streakData.lastVisit) / 86400000); 
    if (streakData.lastVisit === 0 || diffDays > 3) { streakData.count = 1; streakData.lastVisit = todayTime; } 
    else if (diffDays > 0 && diffDays <= 3) { streakData.count += 1; streakData.lastVisit = todayTime; }
    if (streakData.count > streakData.best) streakData.best = streakData.count;
    localStorage.setItem('daily_streak', JSON.stringify(streakData));
}

function initSwipeGestures() {
    let tStartX = 0; let tStartY = 0; let tEndX = 0; let tEndY = 0;
    document.addEventListener('touchstart', e => { tStartX = e.changedTouches[0].screenX; tStartY = e.changedTouches[0].screenY; }, {passive: true});
    document.addEventListener('touchend', e => { tEndX = e.changedTouches[0].screenX; tEndY = e.changedTouches[0].screenY; handleSwipe(); }, {passive: true});
    function handleSwipe() {
        const diffX = tEndX - tStartX; const diffY = tEndY - tStartY;
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 60) {
            if (diffX < 0) navigateDay(1); else navigateDay(-1);
        }
    }
}

function animateScheduleChange(updateStateCallback, direction) {
    const container = document.getElementById('schedule-container');
    if (!container) { updateStateCallback(); return; }
    const outClass = direction === 1 ? 'slide-out-left' : 'slide-out-right';
    const inClass = direction === 1 ? 'slide-in-right' : 'slide-in-left';
    container.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
    container.classList.add(outClass);
    setTimeout(() => {
        updateStateCallback(); 
        container.classList.remove(outClass); container.classList.add(inClass);
        setTimeout(() => container.classList.remove(inClass), 250);
    }, 250);
}

function navigateDay(direction) {
    let newDay = selectedDay + direction; let weekOffset = 0;
    if (newDay > 7) { weekOffset = 1; newDay = 1; } else if (newDay < 1) { weekOffset = -1; newDay = 7; }
    
    if (weekOffset === -1) {
        const nextViewDate = new Date(viewDate);
        nextViewDate.setDate(nextViewDate.getDate() - 7);
        const mondayOfNextView = new Date(nextViewDate);
        const day = mondayOfNextView.getDay() || 7;
        mondayOfNextView.setDate(mondayOfNextView.getDate() - day + 1);
        mondayOfNextView.setHours(0,0,0,0);
        
        if (mondayOfNextView < new Date('2026-01-26T00:00:00')) return;
    }

    animateScheduleChange(() => {
        if (weekOffset !== 0) { viewDate.setDate(viewDate.getDate() + (weekOffset * 7)); checkIfTodayView(); }
        selectedDay = newDay; renderTabs(); updateDateDisplay(); renderSchedule(); updateStatus();
    }, direction);
}

function selectDay(dayIndex) {
    if (dayIndex === selectedDay) return;
    const direction = dayIndex > selectedDay ? 1 : -1;
    animateScheduleChange(() => { selectedDay = dayIndex; renderTabs(); updateDateDisplay(); renderSchedule(); updateStatus(); }, direction);
}

function changeWeek(offset) {
    const nextViewDate = new Date(viewDate);
    nextViewDate.setDate(nextViewDate.getDate() + (offset * 7));
    
    const mondayOfNextView = new Date(nextViewDate);
    const day = mondayOfNextView.getDay() || 7;
    mondayOfNextView.setDate(mondayOfNextView.getDate() - day + 1);
    mondayOfNextView.setHours(0,0,0,0);

    if (mondayOfNextView < new Date('2026-01-26T00:00:00')) return;

    const direction = offset > 0 ? 1 : -1;
    animateScheduleChange(() => { viewDate = nextViewDate; checkIfTodayView(); updateDateDisplay(); renderSchedule(); updateStatus(); }, direction);
}

function resetToToday() {
    viewDate = new Date(); selectedDay = new Date().getDay(); if (selectedDay === 0) selectedDay = 7;
    renderTabs(); checkIfTodayView(); updateDateDisplay(); renderSchedule(); updateStatus();
}

function checkIfTodayView() {
    const today = new Date();
    document.getElementById('reset-view-btn').style.display = isSameWeek(viewDate, today) ? 'none' : 'block';
}

function isSameWeek(d1, d2) {
    const one = new Date(d1); const two = new Date(d2);
    const day1 = one.getDay() || 7; const day2 = two.getDay() || 7;
    one.setHours(0,0,0,0); two.setHours(0,0,0,0);
    one.setDate(one.getDate() - day1 + 1); two.setDate(two.getDate() - day2 + 1);
    return one.getTime() === two.getTime();
}

function updateDateDisplay() {
    const displayDate = getViewedDate();
    const days = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'];
    
    let dateStr = displayDate.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' });
    
    if (displayDate.getFullYear() !== new Date().getFullYear()) {
        dateStr += ` ${displayDate.getFullYear()} р.`;
    }
    
    document.getElementById('current-date').innerText = `${days[displayDate.getDay()]}, ${dateStr}`;
    const weekType = getWeekType(viewDate);
    const badge = document.getElementById('week-badge');
    badge.innerText = weekType === 1 ? "Тиждень 1" : "Тиждень 2"; 
    badge.className = `week-badge week-${weekType}`;
}

function renderTabs() {
    document.querySelectorAll('.day-btn').forEach((btn, index) => {
        if (index + 1 === selectedDay) btn.classList.add('active'); else btn.classList.remove('active');
    });
}

function renderSchedule() {
    const container = document.getElementById('schedule-container');
    container.innerHTML = '';
    const displayDate = getViewedDate();

    if (displayDate < new Date('2026-02-02T00:00:00')) {
        container.innerHTML = `
            <div class="empty-day" style="color: var(--accent); padding: 50px 0;">
                <i class="bx bx-ghost" style="font-size: 4rem; margin-bottom: 10px;"></i>
                <br><span style="font-size: 1.2rem; font-weight: bold;">Розклад цього періоду загублений</span>
                <br><span style="font-size: 0.9rem; opacity: 0.8;">Даних до 4-го семестру не існує</span>
            </div>`;
        return;
    }

    const semInfo = getSemesterInfo(displayDate);
    const periodType = getPeriodType(displayDate, semInfo.config);

    if (periodType === 'holidays') {
        const isWinter = displayDate.getMonth() === 0 || displayDate.getMonth() === 11;
        const icon = isWinter ? 'bx-cloud-snow' : 'bx-sun';
        const title = isWinter ? 'Зимові канікули!' : 'Літні канікули!';
        container.innerHTML = `
            <div class="empty-day" style="color: var(--accent); padding: 50px 0;">
                <i class="bx ${icon}" style="font-size: 4rem; margin-bottom: 10px;"></i>
                <br><span style="font-size: 1.2rem; font-weight: bold;">${title}</span>
                <br><span style="font-size: 0.9rem; opacity: 0.8;">Час відпочивати</span>
            </div>`;
        return;
    }

    const currentWeekType = getWeekType(displayDate);
    const semesterData = allSchedules[semInfo.id];

    if (!semesterData || !semesterData[1] || Object.keys(semesterData[1]).length === 0) {
        container.innerHTML = `
            <div class="empty-day" style="color: var(--accent); padding: 50px 0;">
                <i class="bx bx-calendar-x" style="font-size: 4rem; margin-bottom: 10px;"></i>
                <br><span style="font-size: 1.2rem; font-weight: bold;">Розклад відсутній</span>
                <br><span style="font-size: 0.9rem; opacity: 0.8;">Дані для цього семестру ще не додано</span>
            </div>`;
        return;
    }

    let allLessons = (semesterData[currentWeekType] && semesterData[currentWeekType][selectedDay]) || [];
    const isSessionPeriod = (periodType === 'session');
    
    let lessons = [];
    if (!isSessionPeriod) {
        lessons = allLessons.filter(l => !l.subgroup || l.subgroup === currentSettings.subgroup).map(l => ({...l}));
    }

    const dateStr = formatDateString(displayDate);
    if (dateOverrides[dateStr]) {
        const override = dateOverrides[dateStr];
        if (override.remove) lessons = lessons.filter(l => !override.remove.includes(l.num));
        if (override.add) {
            const added = override.add.filter(l => !l.subgroup || l.subgroup === currentSettings.subgroup).map(l => ({...l}));
            lessons.push(...added);
        }
    }
    
    lessons.sort((a, b) => a.num - b.num);
    lessons = applyLateMayFilter(lessons, displayDate);
    applyTimeOverrides(lessons, displayDate); 

    if (!lessons || lessons.length === 0) {
        container.innerHTML = '<div class="empty-day"><i class="bx bx-coffee"></i><br>Пар немає, відпочивай!</div>';
        return;
    }

    const maxLessonNum = Math.max(...lessons.map(l => l.num));
    const typeLabels = { 'LK': 'ЛК', 'PZ': 'ПЗ', 'LR': 'ЛР', 'EX': 'СПЕЦ', 'KOL': 'КОЛ', 'EXAM': 'Іспит', 'CONS': 'Конс.', 'ZALIK': 'Залік / ДЗ' }; 
    const isToday = isSameDate(viewDate, new Date()) && (selectedDay === (new Date().getDay() || 7));
    const now = new Date();

    if (isSessionPeriod) {
        lessons.forEach(lesson => container.appendChild(createLessonCard(lesson, typeLabels, isToday, now)));
    } else {
        for (let i = 1; i <= maxLessonNum; i++) {
            const lesson = lessons.find(l => l.num === i);
            if (lesson) {
                container.appendChild(createLessonCard(lesson, typeLabels, isToday, now));
            } else {
                const card = document.createElement('div');
                card.className = 'lesson-card empty-lesson';
                card.innerHTML = `<div class="time-box"><div class="lesson-num">${i}</div></div><div class="info-box"><div class="subject-name" style="color: var(--text-muted); font-weight: 400;">Пари немає</div></div>`;
                container.appendChild(card);
            }
        }
    }
}

function createLessonCard(lesson, typeLabels, isToday, now) {
    const card = document.createElement('div');
    card.className = `lesson-card type-${lesson.type}`;
    card.id = `lesson-${lesson.num}`;
    if (isToday) {
        const [endH, endM] = lesson.end.split(':').map(Number);
        const lessonEnd = new Date(); lessonEnd.setHours(endH, endM, 0);
        if (now > lessonEnd) card.classList.add('past');
    }
    card.innerHTML = `
        <div class="time-box">
            <div class="lesson-num">${lesson.num}</div>
            <div>${lesson.start}</div>
            <div style="font-size: 0.75rem; opacity: 0.7">${lesson.end}</div>
        </div>
        <div class="info-box">
            <div class="subject-name">${lesson.subj}</div>
            <div class="lesson-details">
                <div class="detail-item"><i class='bx bx-user'></i> <span class="teacher-name">${lesson.teacher}</span></div>
                <div class="detail-item"><i class='bx bx-building'></i> <span>${lesson.room}</span></div>
                <div class="detail-item"><i class='bx bx-purchase-tag-alt'></i> <span>${typeLabels[lesson.type] || lesson.type}</span></div>
            </div>
        </div>`;
    return card;
}

function updateStatus() {
    const now = new Date();
    const semInfo = getSemesterInfo(now);
    const periodType = getPeriodType(now, semInfo.config);
    const titleEl = document.getElementById('status-title');
    const timerEl = document.getElementById('main-timer');
    const subtitleEl = document.getElementById('time-left-desc');

    if (periodType === 'holidays') {
    const isWinter = now.getMonth() === 0 || now.getMonth() === 11;
    titleEl.innerText = isWinter ? "Зимові канікули!" : "Літні канікули!";
    timerEl.innerHTML = isWinter ? "<i class='bx bx-cloud-snow'></i>" : "<i class='bx bx-sun'></i>";
    subtitleEl.innerHTML = isWinter ? "<i class='bx bx-cloud-snow'></i> Насолоджуйся відпочинком" : "<i class='bx bx-sun'></i> Насолоджуйся відпочинком";
    return;
}

    if (!isSameWeek(viewDate, now)) {
        titleEl.innerText = "Перегляд розкладу"; timerEl.innerText = "--:--"; subtitleEl.innerText = "Інший тиждень";
        return;
    }

    const dayOfWeek = now.getDay() === 0 ? 7 : now.getDay();
    const currentWeekType = getWeekType(now);
    const semesterData = allSchedules[semInfo.id];
    const isSessionPeriod = (periodType === 'session');
    
    let lessons = [];
    if (!isSessionPeriod && semesterData && semesterData[currentWeekType] && semesterData[currentWeekType][dayOfWeek]) {
        lessons = semesterData[currentWeekType][dayOfWeek].filter(l => !l.subgroup || l.subgroup === currentSettings.subgroup).map(l => ({...l})); 
    }
    
    const dateStr = formatDateString(now);
    if (dateOverrides[dateStr]) {
        const override = dateOverrides[dateStr];
        if (override.remove) lessons = lessons.filter(l => !override.remove.includes(l.num));
        if (override.add) lessons.push(...override.add.filter(l => !l.subgroup || l.subgroup === currentSettings.subgroup).map(l => ({...l})));
    }

    lessons.sort((a, b) => a.num - b.num);
    lessons = applyLateMayFilter(lessons, now);
    applyTimeOverrides(lessons, now); 

    if (!lessons || lessons.length === 0) {
        titleEl.innerText = "Сьогодні вихідний"; timerEl.innerText = "Відпочивай"; subtitleEl.innerText = "Пар немає"; return;
    }

    let activeLesson = null; let nextLesson = null;
    for (let i = 0; i < lessons.length; i++) {
        const lesson = lessons[i];
        const [startH, startM] = lesson.start.split(':').map(Number);
        const [endH, endM] = lesson.end.split(':').map(Number);
        const startDate = new Date(); startDate.setHours(startH, startM, 0);
        const endDate = new Date(); endDate.setHours(endH, endM, 0);

        if (now >= startDate && now < endDate) { activeLesson = lesson; break; }
        if (now < startDate) { nextLesson = lesson; break; }
    }

    document.querySelectorAll('.lesson-card').forEach(c => c.classList.remove('active'));

    if (activeLesson) {
        titleEl.innerText = `Зараз: ${activeLesson.subj} (${activeLesson.room})`;
        const [endH, endM] = activeLesson.end.split(':').map(Number);
        const endDate = new Date(); endDate.setHours(endH, endM, 0);
        timerEl.innerText = formatTime(endDate - now); subtitleEl.innerHTML = "<i class='bx bx-timer'></i> до завершення";
        if (isSameDate(viewDate, now) && selectedDay === dayOfWeek) {
            const activeCard = document.getElementById(`lesson-${activeLesson.num}`);
            if (activeCard) activeCard.classList.add('active');
        }
    } else if (nextLesson) {
        const [startH, startM] = nextLesson.start.split(':').map(Number);
        const startDate = new Date(); startDate.setHours(startH, startM, 0);
        let sleepUntilHour = 7;
        if (nextLesson.num === 3) sleepUntilHour = 8;
        else if (nextLesson.num === 4) sleepUntilHour = 9;
        else if (nextLesson.num >= 5) sleepUntilHour = 10;
        const wakeUpTime = new Date(); wakeUpTime.setHours(sleepUntilHour, 0, 0, 0);
        const midnight = new Date(); midnight.setHours(0, 0, 0, 0);

        if (now >= midnight && now < wakeUpTime && isSameDate(viewDate, now) && selectedDay === dayOfWeek) {
            const toLessonDiff = startDate - now;
            let h = Math.floor(toLessonDiff / 3600000); let m = Math.floor((toLessonDiff % 3600000) / 60000);
            titleEl.innerText = "Ви ще можете поспати"; timerEl.innerText = formatTime(wakeUpTime - now);
            subtitleEl.innerHTML = `<i class='bx bx-bed'></i> до пробудження (До пари: ${h}:${pad(m)} год)`;
            return;
        }

        titleEl.innerText = `Наступна: ${nextLesson.subj}`; timerEl.innerText = formatTime(startDate - now);
        subtitleEl.innerHTML = "<i class='bx bx-coffee'></i> до початку";
    } else {
        titleEl.innerText = isSessionPeriod ? "На сьогодні іспити завершено!" : "Пари на сьогодні все!";
        timerEl.innerText = now.getHours() >= 15 ? "" : "Додому"; subtitleEl.innerText = "Гарного відпочинку";
    }
}

function isSameDate(d1, d2) { return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate(); }
function formatTime(ms) {
    if (ms < 0) return "00:00";
    const totalSeconds = Math.floor(ms / 1000); const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60); const seconds = totalSeconds % 60;
    return hours > 0 ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${pad(minutes)}:${pad(seconds)}`;
}
function pad(n) { return n < 10 ? '0' + n : n; }

init();

async function checkAirRaidAlert() {
    const alertBanner = document.getElementById('air-raid-alert'); if (!alertBanner) return; 
    try {
        const response = await fetch(`https://api.codetabs.com/v1/proxy?quest=https://ubilling.net.ua/aerialalerts/`);
        if (!response.ok) return; const data = await response.json();
        let isAlert = data.states['Вінниця'] || data.states['м. Вінниця'] || data.states['Вінницька територіальна громада'] || data.states['Вінницька міська територіальна громада']; 
        if (isAlert) { alertBanner.style.display = 'flex'; document.body.classList.add('alert-mode'); } 
        else { alertBanner.style.display = 'none'; document.body.classList.remove('alert-mode'); }
    } catch (e) { console.log(e); }
}
checkAirRaidAlert(); setInterval(checkAirRaidAlert, 30000);

async function fetchWeather() {
    try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=49.2328&longitude=28.481&current=temperature_2m,is_day,weather_code&timezone=auto');
        if (!response.ok) return; const data = await response.json();
        document.getElementById('weather-temp').innerText = `${Math.round(data.current.temperature_2m)}°C`;
        const code = data.current.weather_code; const isDay = data.current.is_day === 1;
        const iconEl = document.getElementById('weather-icon');
        if (code <= 1) iconEl.className = isDay ? 'bx bx-sun' : 'bx bx-moon'; 
        else if (code <= 3) iconEl.className = 'bx bx-cloud'; 
        else if (code >= 45 && code <= 48) iconEl.className = 'bx bx-fog';
        else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) iconEl.className = 'bx bx-cloud-rain'; 
        else if ((code >= 71 && code <= 77) || code === 85 || code === 86) iconEl.className = 'bx bx-cloud-snow'; 
        else if (code >= 95) iconEl.className = 'bx bx-cloud-lightning'; 
        else iconEl.className = 'bx bx-cloud'; 
        document.getElementById('weather-widget').style.display = 'flex';
    } catch (error) { console.error("Weather err:", error); }
}
fetchWeather(); setInterval(fetchWeather, 1800000);