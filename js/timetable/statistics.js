document.addEventListener("DOMContentLoaded", () => {
    const subgroupDisplay = document.getElementById('current-subgroup-display');
    if (subgroupDisplay && currentSettings) {
        subgroupDisplay.innerText = `Підгрупа ${currentSettings.subgroup}`;
    }

    buildPeriodDropdown();

    const periodSelect = document.getElementById('stats-period-select');
    if (periodSelect) {
        periodSelect.addEventListener('change', renderStatistics);
    }

    renderStatistics();
});

function buildPeriodDropdown() {
    const periodSelect = document.getElementById('stats-period-select');
    if (!periodSelect) return;

    let html = '<option value="course-2" selected>2 курс</option>';
    html += '<option value="course-3">3 курс</option>';
    html += '<option value="all">За весь час (з 26 січня 2026 р.)</option>';
    
    periodSelect.innerHTML = html;
}

function getLessonsForSpecificDate(date) {
    const semInfo = getSemesterInfo(date);
    const currentWeekType = getWeekType(date);
    const semesterData = allSchedules[semInfo.id];
    
    const year = date.getFullYear();
    const month = date.getMonth();
    const d = date.getDate();
    
    let isHoliday = false;
    
    // Літо
    if ((month === 5 && d > 19) || month === 6 || month === 7) {
        isHoliday = true;
    }
    // Січень
    if (month === 0) {
        if (year === 2026 && d >= 26) {
            isHoliday = false; // Початок семестру
        } else {
            isHoliday = true;
        }
    }
    
    if (isHoliday) return { lessons: [], isHoliday: true };
    
    const dayOfWeek = date.getDay() === 0 ? 7 : date.getDay();
    let lessons = [];
    const isSessionPeriod = date >= new Date('2026-06-08T00:00:00') && date <= new Date('2026-06-19T23:59:59');

    if (!isSessionPeriod && semesterData && semesterData[currentWeekType] && semesterData[currentWeekType][dayOfWeek]) {
        lessons = semesterData[currentWeekType][dayOfWeek]
            .filter(l => !l.subgroup || l.subgroup === currentSettings.subgroup).map(l => ({...l})); 
    }
    
    const dateStr = formatDateString(date);
    if (dateOverrides[dateStr]) {
        const override = dateOverrides[dateStr];
        if (override.remove) lessons = lessons.filter(l => !override.remove.includes(l.num));
        if (override.add) {
            const added = override.add.filter(l => !l.subgroup || l.subgroup === currentSettings.subgroup).map(l => ({...l}));
            lessons.push(...added);
        }
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

function calculateGlobalHolidays() {
    let count = 0;
    let start = new Date('2026-01-26T00:00:00');
    let end = new Date('2027-06-30T23:59:59'); 
    
    let current = new Date(start);
    current.setHours(0,0,0,0);
    while (current <= end) {
        if (current.getDay() !== 0 && current.getDay() !== 6) { 
            const { isHoliday } = getLessonsForSpecificDate(current);
            if (isHoliday) count++;
        }
        current.setDate(current.getDate() + 1);
        current.setHours(0,0,0,0);
    }
    return count;
}

function renderStatistics() {
    const period = document.getElementById('stats-period-select').value;
    const container = document.getElementById('stats-content');
    
    container.innerHTML = `<div style="text-align:center; padding: 40px;"><i class='bx bx-loader-alt bx-spin' style="font-size: 3rem; color: var(--accent);"></i></div>`;

    let startDate, endDate;
    
    if (period === 'course-2') {
        startDate = new Date('2026-01-26T00:00:00'); 
        endDate = new Date('2026-06-30T23:59:59');
    } else if (period === 'course-3') {
        startDate = new Date('2026-09-01T00:00:00');
        endDate = new Date('2027-06-30T23:59:59');
    } else { // all
        startDate = new Date('2026-01-26T00:00:00');
        endDate = new Date('2027-06-30T23:59:59');
    }

    let subjectCounts = {};
    let typeCounts = {};
    let totalLessonMinutes = 0;
    let totalBreakMinutes = 0;
    let windowsCount = 0;

    const globalHolidays = calculateGlobalHolidays();

    let currentDate = new Date(startDate);
    currentDate.setHours(0,0,0,0); 
    
    const nonRegularTypes = ['EX', 'KOL', 'EXAM', 'ZALIK', 'CONS'];

    setTimeout(() => {
        while (currentDate <= endDate) {
            const { lessons } = getLessonsForSpecificDate(currentDate);
            
            if (lessons.length > 0) {
                let lastEndMin = null;
                let lastLessonNum = null;

                lessons.forEach(l => {
                    const isPhysEd = l.subj.toLowerCase().includes("фізична культура");
                    const isRegular = !nonRegularTypes.includes(l.type);
                    
                    if (isPhysEd) {
                        windowsCount++; 
                    } else {
                        typeCounts[l.type] = (typeCounts[l.type] || 0) + 1;
                        const startMin = timeToMinutes(l.start);
                        const endMin = timeToMinutes(l.end);
                        totalLessonMinutes += (endMin - startMin);
                    }

                    if (isRegular && !isPhysEd) {
                        const cleanSubj = l.subj.replace(/\s*\(.*?\)\s*/g, '').trim();
                        subjectCounts[cleanSubj] = (subjectCounts[cleanSubj] || 0) + 1;
                    }

                    if (lastEndMin !== null) {
                        totalBreakMinutes += (timeToMinutes(l.start) - lastEndMin);
                    }
                    if (lastLessonNum !== null) {
                        if (l.num - lastLessonNum > 1) {
                            windowsCount += (l.num - lastLessonNum - 1);
                        }
                    }

                    lastEndMin = timeToMinutes(l.end);
                    lastLessonNum = l.num;
                });
            }
            currentDate.setDate(currentDate.getDate() + 1);
            currentDate.setHours(0,0,0,0);
        }

        drawStats(container, {
            hours: (totalLessonMinutes / 60).toFixed(1),
            breaks: (totalBreakMinutes / 60).toFixed(1),
            windows: windowsCount,
            holidays: globalHolidays,
            subjects: subjectCounts,
            types: typeCounts
        });

    }, 50);
}

const typeLabelsMap = { 
    'LK': 'Лекції', 'PZ': 'Практичні', 'LR': 'Лабораторні', 
    'EX': 'Спец. відпрацювання', 'KOL': 'Колоквіуми', 
    'EXAM': 'Іспити', 'CONS': 'Консультації', 'ZALIK': 'Заліки' 
};

const typeColorsMap = {
    'Лекції': '#f59e0b',
    'Практичні': '#10b981',
    'Лабораторні': '#3b82f6',
    'Спец. відпрацювання': '#9333ea', 
    'Колоквіуми': '#ef4444',       
    'Іспити': '#e11d48',           
    'Консультації': '#f59e0b',     
    'Заліки': '#10b981'            
};

function getPluralWord(number, one, two, five) {
    let n = Math.abs(number) % 100;
    let n1 = n % 10;
    if (n > 10 && n < 20) return five; 
    if (n1 > 1 && n1 < 5) return two;  
    if (n1 === 1) return one;          
    return five;                       
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
            allSubjectsHtml += `
                <div class="stat-list-item">
                    <span class="stat-subj-name">${subj}</span>
                    <span class="stat-badge">${count} ${word}</span>
                </div>`;
        });
        allSubjectsHtml += `</div>`;
    }

    container.innerHTML = `
        <div class="stat-grid">
            <div class="stat-card">
                <i class='bx bx-time-five stat-icon' style="color: var(--accent)"></i>
                <div class="stat-value">${data.hours}</div>
                <div class="stat-label">Годин навчання</div>
            </div>
            <div class="stat-card orange">
                <i class='bx bx-coffee stat-icon' style="color: #f59e0b"></i>
                <div class="stat-value">${data.breaks}</div>
                <div class="stat-label">Годин перерв</div>
            </div>
            <div class="stat-card red">
                <i class='bx bx-window-alt stat-icon' style="color: #ef4444"></i>
                <div class="stat-value">${data.windows}</div>
                <div class="stat-label">Вікна (+ Фіз-ра)</div>
            </div>
            <div class="stat-card green">
                <i class='bx bx-sun stat-icon' style="color: #10b981"></i>
                <div class="stat-value">${data.holidays}</div>
                <div class="stat-label">Канікули (Всього)</div>
            </div>
        </div>

        <h3 class="stat-section-title"><i class='bx bx-pie-chart-alt-2' style="color: var(--accent)"></i> Топ 10 предметів за весь час (з 26 січня 2026 р.)</h3>
        <div style="background: var(--card-bg); padding: 20px; border-radius: 12px; height: 280px; margin-bottom: 25px;">
            <canvas id="subjectsChart"></canvas>
        </div>
        
        <details>
            <summary>
                <div class="summary-title">
                    <i class='bx bx-list-ul' style="color: var(--accent); font-size: 1.3rem;"></i> 
                    Усі предмети
                </div>
                <i class='bx bx-chevron-down summary-arrow'></i>
            </summary>
            <div class="details-content">
                ${allSubjectsHtml}
            </div>
        </details>

        <h3 class="stat-section-title" style="margin-top: 30px;"><i class='bx bx-doughnut-chart' style="color: #10b981"></i> Розподіл за типами</h3>
        <div style="background: var(--card-bg); padding: 20px; border-radius: 12px; height: 280px; margin-bottom: 25px;">
            <canvas id="typesChart"></canvas>
        </div>
    `;

    createDoughnutChart('subjectsChart', data.subjects, null, null, true);
    createDoughnutChart('typesChart', data.types, typeLabelsMap, typeColorsMap, false);
}

function createDoughnutChart(canvasId, dataObject, labelsMap, specificColorsMap, isSubjectChart) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    let entries = Object.entries(dataObject).sort((a, b) => b[1] - a[1]);
    
    if (isSubjectChart) {
        entries = entries.slice(0, 10);
    }

    const labels = entries.map(e => labelsMap ? (labelsMap[e[0]] || e[0]) : e[0]);
    const dataValues = entries.map(e => e[1]);

    let backgroundColors = [];
    if (specificColorsMap) {
        backgroundColors = labels.map(label => specificColorsMap[label] || '#888888');
    } else {
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#9333ea', '#ef4444', '#ec4899', '#14b8a6', '#6366f1', '#f43f5e', '#10b981'];
        backgroundColors = colors.slice(0, labels.length);
    }

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: dataValues,
                backgroundColor: backgroundColors,
                borderWidth: 2,
                borderColor: '#1e1e1e', 
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#e0e0e0',
                        font: { family: 'Segoe UI', size: 12 },
                        boxWidth: 12,
                        padding: 10
                    }
                }
            },
            cutout: '65%'
        }
    });
}