document.addEventListener("DOMContentLoaded", () => {
    const subgroupSelect = document.getElementById('stats-subgroup-select');
    if (subgroupSelect && currentSettings) {
        subgroupSelect.value = currentSettings.subgroup;
        subgroupSelect.addEventListener('change', (e) => {
            currentSettings.subgroup = parseInt(e.target.value);
            localStorage.setItem('scheduleSettings', JSON.stringify(currentSettings));
            renderStatistics();
        });
    }
    initPeriodTabs();
    renderStatistics();
});

function initPeriodTabs() {
    const tabsContainer = document.getElementById('stats-tabs');
    if (!tabsContainer) return;
    const now = new Date();
    let defaultPeriod = 'all';

    if (now < new Date('2026-08-01')) { defaultPeriod = 'course-2'; } 
    else if (now < new Date('2027-08-01')) { defaultPeriod = 'course-3'; }

    const tabs = tabsContainer.querySelectorAll('.period-tab');
    tabs.forEach(tab => {
        if (tab.dataset.period === defaultPeriod) tab.classList.add('active');
        tab.addEventListener('click', (e) => {
            if (e.target.classList.contains('active')) return;
            tabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active'); renderStatistics();
        });
    });
}

function getLessonsForSpecificDate(date) {
    const semInfo = getSemesterInfo(date);
    const periodType = getPeriodType(date, semInfo.config);
    
    if (periodType === 'holidays') return { lessons: [], isHoliday: true };
    
    const currentWeekType = getWeekType(date);
    const semesterData = window.TimetableData.schedules[semInfo.id];
    const dayOfWeek = date.getDay() === 0 ? 7 : date.getDay();
    
    let lessons = [];
    const isSessionPeriod = (periodType === 'session');

    if (!isSessionPeriod && semesterData && semesterData[currentWeekType] && semesterData[currentWeekType][dayOfWeek]) {
        lessons = semesterData[currentWeekType][dayOfWeek]
            .filter(l => !l.subgroup || l.subgroup === currentSettings.subgroup).map(l => ({...l})); 
    }
    
    const dateStr = formatDateString(date);
    if (dateOverrides[dateStr]) {
        const override = dateOverrides[dateStr];
        if (override.remove) lessons = lessons.filter(l => !override.remove.includes(l.num));
        if (override.add) lessons.push(...override.add.filter(l => !l.subgroup || l.subgroup === currentSettings.subgroup).map(l => ({...l})));
    }

    lessons.sort((a, b) => a.num - b.num);
    lessons = applyLateMayFilter(lessons, date);
    applyTimeOverrides(lessons, date); 
    
    return { lessons, isHoliday: false };
}

function timeToMinutes(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
}

function calculateHolidaysForPeriod(start, end) {
    let count = 0; let current = new Date(start); current.setHours(0,0,0,0);
    while (current <= end) {
        const { isHoliday } = getLessonsForSpecificDate(current);
        if (isHoliday) count++;
        current.setDate(current.getDate() + 1); current.setHours(0,0,0,0);
    }
    return count;
}

function renderStatistics() {
    const activeTab = document.querySelector('.period-tab.active');
    const period = activeTab ? activeTab.dataset.period : 'course-3';
    const container = document.getElementById('stats-content');
    container.innerHTML = `<div style="text-align:center; padding: 40px;"><i class='bx bx-loader-alt bx-spin' style="font-size: 3rem; color: var(--accent);"></i></div>`;

    let startDate, endDate;
    
    if (period === 'course-2') {
        startDate = new Date('2026-01-26T00:00:00'); endDate = new Date('2026-08-30T23:59:59');
    } else if (period === 'course-3') {
        startDate = new Date('2026-08-31T00:00:00'); endDate = new Date('2027-06-30T23:59:59'); 
    } else {
        startDate = new Date('2026-01-26T00:00:00'); endDate = new Date('2027-06-30T23:59:59');
    }

    let subjectCounts = {}; let typeCounts = {}; let totalLessonMinutes = 0;
    let totalBreakMinutes = 0; let windowsCount = 0; let totalPairsCount = 0;
    let daysCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
    const periodHolidays = calculateHolidaysForPeriod(startDate, endDate);

    let currentDate = new Date(startDate); currentDate.setHours(0,0,0,0); 
    const nonRegularTypes = ['EX', 'KOL', 'EXAM', 'ZALIK', 'CONS'];

    setTimeout(() => {
        while (currentDate <= endDate) {
            const { lessons } = getLessonsForSpecificDate(currentDate);
            if (lessons.length > 0) {
                const currentDayNum = currentDate.getDay() || 7; 
                let lastEndMin = null; let lastLessonNum = null;
                let lastType = null; let lastRoom = null;

                lessons.forEach(l => {
                    const isPhysEd = l.subj.toLowerCase().includes("фізична культура");
                    const isRegular = !nonRegularTypes.includes(l.type);
                    
                    if (!isPhysEd) {
                        let weight = 0;
                        if (l.type === 'LK') {
                            weight = 1.5;
                            if (lastType === 'LK' && lastRoom === l.room) {
                                weight += 0.5;
                            }
                        }
                        else if (l.type === 'LR') weight = 2.25;
                        else if (l.type === 'PZ') weight = 2.5;
                        else if (['KOL', 'EXAM', 'EX'].includes(l.type)) weight = 4;
                        else weight = 1;

                        daysCount[currentDayNum] += weight; 
                        
                        lastType = l.type;
                        lastRoom = l.room;
                        
                        typeCounts[l.type] = (typeCounts[l.type] || 0) + 1;
                        totalLessonMinutes += (timeToMinutes(l.end) - timeToMinutes(l.start));
                    } else {
                        windowsCount++;
                    }
                    
                    if (isRegular && !isPhysEd) {
                        const cleanSubj = l.subj.replace(/\s*\(.*?\)\s*/g, '').trim();
                        subjectCounts[cleanSubj] = (subjectCounts[cleanSubj] || 0) + 1; totalPairsCount++; 
                    }
                    if (lastEndMin !== null) totalBreakMinutes += (timeToMinutes(l.start) - lastEndMin);
                    if (lastLessonNum !== null && l.num - lastLessonNum > 1) windowsCount += (l.num - lastLessonNum - 1);
                    lastEndMin = timeToMinutes(l.end); lastLessonNum = l.num;
                });
            }
            currentDate.setDate(currentDate.getDate() + 1); currentDate.setHours(0,0,0,0);
        }

        const dayNames = { 1: 'Понеділок', 2: 'Вівторок', 3: 'Середа', 4: 'Четвер', 5: 'П\'ятниця', 6: 'Субота', 7: 'Неділя' };
        let maxLessons = -1; let heaviestDay = "Немає";
        for (let d = 1; d <= 7; d++) {
            if (daysCount[d] > maxLessons && daysCount[d] > 0) { maxLessons = daysCount[d]; heaviestDay = dayNames[d]; }
        }

        const now = new Date();
        let totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
        let passedDays = (now - startDate) / (1000 * 60 * 60 * 24);
        if (passedDays < 0) passedDays = 0;
        if (passedDays > totalDays) passedDays = totalDays;
        let progressPercent = (totalDays > 0) ? Math.round((passedDays / totalDays) * 100) : 0;

        drawStats(container, {
            hours: (totalLessonMinutes / 60).toFixed(1), totalPairs: totalPairsCount,
            breaks: (totalBreakMinutes / 60).toFixed(1), windows: windowsCount,
            holidays: periodHolidays, subjects: subjectCounts, types: typeCounts,
            heaviestDay: heaviestDay, progress: progressPercent
        });
    }, 50);
}

const typeLabelsMap = { 'LK': 'Лекції', 'PZ': 'Практичні', 'LR': 'Лабораторні', 'EX': 'Спец. відпрацювання', 'KOL': 'Колоквіуми', 'EXAM': 'Іспити', 'CONS': 'Консультації', 'ZALIK': 'Заліки' };
const typeColorsMap = { 'Лекції': '#f59e0b', 'Практичні': '#10b981', 'Лабораторні': '#3b82f6', 'Спец. відпрацювання': '#9333ea', 'Колоквіуми': '#ef4444', 'Іспити': '#e11d48', 'Консультації': '#f59e0b', 'Заліки': '#10b981' };

function getPluralWord(number, one, two, five) {
    let n = Math.abs(number) % 100; let n1 = n % 10;
    if (n > 10 && n < 20) return five; 
    if (n1 > 1 && n1 < 5) return two;  
    if (n1 === 1) return one; return five;                       
}

function drawStats(container, data) {
    let allSubjectsHtml = '';
    const allSortedSubjects = Object.entries(data.subjects).sort((a, b) => b[1] - a[1]);
    if (allSortedSubjects.length === 0) {
        allSubjectsHtml = `<div class="empty-day" style="padding: 10px;">Немає даних для списку</div>`;
    } else {
        allSubjectsHtml = `<div class="stat-list">`;
        allSortedSubjects.forEach(([subj, count]) => {
            const word = getPluralWord(count, 'пара', 'пари', 'пар');
            allSubjectsHtml += `<div class="stat-list-item"><span class="stat-subj-name">${subj}</span><span class="stat-badge">${count} ${word}</span></div>`;
        });
        allSubjectsHtml += `</div>`;
    }

    container.innerHTML = `
        <div class="progress-container" style="margin-bottom: 25px; background: var(--card-bg); padding: 15px; border-radius: 12px; border-left: 4px solid var(--accent); box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-weight: 600; color: var(--text-main);">
                <span>Прогрес періоду</span><span>${data.progress}%</span>
            </div>
            <div style="width: 100%; background: rgba(255,255,255,0.05); border-radius: 10px; height: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
                <div style="width: ${data.progress}%; background: linear-gradient(90deg, var(--accent), #60a5fa); height: 100%; border-radius: 10px; transition: width 1s ease-in-out;"></div>
            </div>
        </div>

       <style>
            .info-tooltip { 
                position: absolute; 
                top: 12px; 
                right: 12px; 
                display: inline-flex; 
                align-items: center; 
            }
            .info-tooltip .tooltip-text {
                visibility: hidden; width: 230px; background-color: var(--card-bg); 
                color: var(--text-main); text-align: left; border-radius: 8px; 
                padding: 10px; position: absolute; z-index: 10; 
                top: 100%; 
                left: 50%; 
                transform: translateX(-50%);
                margin-top: 8px; 
                opacity: 0; transition: opacity 0.2s; border: 1px solid #333; 
                box-shadow: 0 4px 15px rgba(0,0,0,0.5); font-size: 0.75rem; 
                text-transform: none; letter-spacing: normal; font-weight: normal; line-height: 1.4;
            }
            .info-tooltip:hover .tooltip-text,
            .info-tooltip:active .tooltip-text { 
                visibility: visible; opacity: 1; 
            }
        </style>

        <div class="stat-grid">
            <div class="stat-card"><i class='bx bx-book-open stat-icon' style="color: var(--accent)"></i><div class="stat-value">${data.totalPairs}</div><div class="stat-label">Всього пар</div></div>
            <div class="stat-card orange"><i class='bx bx-time-five stat-icon' style="color: #f59e0b"></i><div class="stat-value">${data.hours}</div><div class="stat-label">Годин навчання</div></div>
            <div class="stat-card" style="border-color: #8b5cf6;"><i class='bx bx-coffee stat-icon' style="color: #8b5cf6"></i><div class="stat-value">${data.breaks}</div><div class="stat-label">Годин перерв</div></div>
            <div class="stat-card red"><i class='bx bx-window-alt stat-icon' style="color: #ef4444"></i><div class="stat-value">${data.windows}</div><div class="stat-label">Вікна (+ Фіз-ра)</div></div>
            
            <div class="stat-card" style="border-color: #ec4899; overflow: visible; position: relative;">
                <div class="info-tooltip">
                    <i class='bx bx-info-circle' style="cursor: help; font-size: 1.2rem; color: var(--text-muted);"></i>
                    <div class="tooltip-text">
                        <b>Формула розрахунку:</b><br>
                        • Лекція: 1.5 бали<br>
                        • 2+ лекції підряд в 1 ауд: +0.5 балів<br>
                        • Лабораторна: 2.25 балів<br>
                        • Практика: 2.5 балів<br>
                        • Колоквіум/Іспит: 4 бали<br>
                        <i style="color: var(--text-muted); margin-top: 4px; display: block;">Фізкультура не враховується. Сумуються всі бали за обраний період.</i>
                    </div>
                </div>
                <i class='bx bx-calendar-exclamation stat-icon' style="color: #ec4899"></i>
                <div class="stat-value" style="font-size: 1.35rem;">${data.heaviestDay}</div>
                <div class="stat-label">Найважчий день</div>
            </div>
            
            <div class="stat-card green"><i class='bx bx-sun stat-icon' style="color: #10b981"></i><div class="stat-value">${data.holidays}</div><div class="stat-label">Канікули (Днів)</div></div>
        </div>

        <h3 class="stat-section-title"><i class='bx bx-pie-chart-alt-2' style="color: var(--accent)"></i> Топ 10 предметів</h3>
        <div style="background: var(--card-bg); padding: 20px; border-radius: 12px; height: 280px; margin-bottom: 25px;"><canvas id="subjectsChart"></canvas></div>
        
        <details><summary><div class="summary-title"><i class='bx bx-list-ul' style="color: var(--accent); font-size: 1.3rem;"></i> Усі предмети</div><i class='bx bx-chevron-down summary-arrow'></i></summary><div class="details-content">${allSubjectsHtml}</div></details>

        <h3 class="stat-section-title" style="margin-top: 30px;"><i class='bx bx-doughnut-chart' style="color: #10b981"></i> Розподіл за типами</h3>
        <div style="background: var(--card-bg); padding: 20px; border-radius: 12px; height: 280px; margin-bottom: 25px;"><canvas id="typesChart"></canvas></div>
    `;

    createDoughnutChart('subjectsChart', data.subjects, null, null, true);
    createDoughnutChart('typesChart', data.types, typeLabelsMap, typeColorsMap, false);
}

function createDoughnutChart(canvasId, dataObject, labelsMap, specificColorsMap, isSubjectChart) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    let entries = Object.entries(dataObject).sort((a, b) => b[1] - a[1]);
    if (isSubjectChart) entries = entries.slice(0, 10);
    const labels = entries.map(e => labelsMap ? (labelsMap[e[0]] || e[0]) : e[0]);
    const dataValues = entries.map(e => e[1]);
    let backgroundColors = specificColorsMap ? labels.map(label => specificColorsMap[label] || '#888888') : ['#3b82f6', '#10b981', '#f59e0b', '#9333ea', '#ef4444', '#ec4899', '#14b8a6', '#6366f1', '#f43f5e', '#10b981'].slice(0, labels.length);

    new Chart(ctx, {
        type: 'doughnut',
        data: { labels: labels, datasets: [{ data: dataValues, backgroundColor: backgroundColors, borderWidth: 2, borderColor: '#1e1e1e', hoverOffset: 4 }] },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                tooltip: { callbacks: { label: function(c) { return `${c.label ? c.label + ': ' : ''}${c.raw} (${Math.round((c.raw / c.chart._metasets[c.datasetIndex].total) * 100)}%)`; } } },
                legend: { position: 'right', labels: { color: '#e0e0e0', font: { family: 'Segoe UI', size: 12 }, boxWidth: 12, padding: 10 } }
            }, cutout: '65%'
        }
    });
}