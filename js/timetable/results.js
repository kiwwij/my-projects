let currentDegree = 'bachelor';
let currentSemester = 4;
let chartInstance = null;
let currentSortMode = 'name';

document.addEventListener('DOMContentLoaded', () => {
    renderNavs();
    renderChart();
    selectSemester('bachelor', 4);
});

function getGradeInfo(score) {
    if (score >= 95) return { label: 'A+', color: '#FF00AA' };
    if (score >= 90) return { label: 'A',  color: '#00FF00' };
    if (score >= 82) return { label: 'B',  color: '#00AAFF' };
    if (score >= 75) return { label: 'C',  color: '#FFE600' };
    if (score >= 64) return { label: 'D',  color: '#FF6600' };
    if (score >= 60) return { label: 'E',  color: '#FF0000' };
    return { label: 'F', color: '#800000' };
}
function setSortMode(mode) {
    currentSortMode = mode;
    document.getElementById('sort-name').classList.toggle('active', mode === 'name');
    document.getElementById('sort-score').classList.toggle('active', mode === 'score');
    renderResults();
}

function renderNavs() {
    const bacNav = document.getElementById('bachelor-nav');
    const masNav = document.getElementById('master-nav');
    
    let bacHtml = '';
    academicResults.bachelor.forEach(sem => {
        bacHtml += `<button class="day-btn" id="btn-bachelor-${sem.semester}" onclick="selectSemester('bachelor', ${sem.semester})">${sem.semester} сем</button>`;
    });
    bacNav.innerHTML = bacHtml;

    let masHtml = '';
    academicResults.master.forEach(sem => {
        masHtml += `<button class="day-btn" id="btn-master-${sem.semester}" onclick="selectSemester('master', ${sem.semester})">${sem.semester} сем</button>`;
    });
    masNav.innerHTML = masHtml;
}

function selectSemester(degree, semNumber) {
    document.querySelectorAll('.day-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-${degree}-${semNumber}`);
    if (activeBtn) activeBtn.classList.add('active');
    
    if (currentDegree !== degree) {
        currentDegree = degree;
        updateChart();
    }
    
    currentDegree = degree;
    currentSemester = semNumber;
    renderResults();
}

function renderResults() {
    const container = document.getElementById('results-content');
    const data = academicResults[currentDegree].find(s => s.semester === currentSemester);
    const sortControls = document.getElementById('sort-controls');
    
    if (!data || !data.officialRating) {
        sortControls.style.display = 'none';
        container.innerHTML = `
            <div class="empty-day animated-card" style="background: var(--card-bg); border-radius: 12px; padding: 40px 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                <i class="bx bx-ghost" style="font-size: 4rem; color: var(--text-muted); margin-bottom: 10px;"></i>
                <br><span style="font-size: 1.2rem; font-weight: bold; color: var(--text-main);">Інформація відсутня</span>
                <br><span style="font-size: 0.9rem; opacity: 0.8;">Для цього семестру результатів ще немає</span>
            </div>`;
        return;
    }

    sortControls.style.display = 'flex';
    
    let diffHtml = '';
    const prevData = academicResults[currentDegree].find(s => s.semester === currentSemester - 1);
    if (prevData && prevData.officialRating) {
        const diff = ((data.officialRating / prevData.officialRating) - 1) * 100;
        const sign = diff > 0 ? '+' : '';
        const diffClass = diff > 0 ? 'positive' : (diff < 0 ? 'negative' : 'neutral');
        diffHtml = `<span class="rating-diff ${diffClass}">(${sign}${diff.toFixed(1)}%)</span>`;
    }
    
    let html = `
        <div class="animated-card" style="text-align: center; margin-bottom: 15px; animation-delay: 0s;">
            <span style="font-size: 1.2rem; font-weight: 600;">Рейтинг семестру: 
                <span style="color: var(--accent);">${data.officialRating}</span>${diffHtml}
            </span>
        </div>`;
    
    let subjects = [...data.subjects];
    if (currentSortMode === 'name') {
        subjects.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSortMode === 'score') {
        subjects.sort((a, b) => b.score - a.score);
    }
    
    subjects.forEach((subj, index) => {
        const gradeInfo = getGradeInfo(subj.score);
        const delay = (index + 1) * 0.05;
        
        html += `
        <div class="lesson-card animated-card" style="grid-template-columns: 1fr auto; border-left-color: ${gradeInfo.color}; padding: 15px; animation-delay: ${delay}s;">
            <div class="info-box">
                <div class="subject-name">${subj.name}</div>
                <div class="lesson-details">
                    <div class="detail-item"><i class='bx bx-user'></i> <span class="teacher-name">${subj.teacher}</span></div>
                    <div class="detail-item"><i class='bx bx-bookmark-alt'></i> <span>${subj.examType}</span></div>
                </div>
            </div>
            <div class="time-box" style="border-right: none; padding-right: 0; padding-left: 15px; border-left: 1px solid rgba(255,255,255,0.05); font-size: 1.3rem; color: #ffffff; font-weight: 700;">
                ${subj.score}<span style="font-size: 1.1rem; color: ${gradeInfo.color}; margin-left: 2px;">${gradeInfo.label}</span>
            </div>
        </div>`;
    });
    
    container.innerHTML = html;
}

function renderChart() {
    const ctx = document.getElementById('resultsChart').getContext('2d');
    const gradientFill = ctx.createLinearGradient(0, 0, 0, 220);
    gradientFill.addColorStop(0, 'rgba(187, 134, 252, 0.5)');
    gradientFill.addColorStop(1, 'rgba(187, 134, 252, 0.0)');

    const validData = academicResults[currentDegree].filter(s => s.officialRating !== null);
    const labels = validData.map(s => `${s.semester} сем`);
    const dataPoints = validData.map(s => s.officialRating);
    
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Рейтинг',
                data: dataPoints,
                borderColor: '#bb86fc',
                backgroundColor: gradientFill,
                fill: true,
                borderWidth: 3,
                tension: 0.4,
                pointBackgroundColor: '#bb86fc',
                pointBorderColor: '#121212',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(30, 30, 30, 0.9)',
                    titleFont: { size: 13 },
                    bodyFont: { size: 14, weight: 'bold' },
                    padding: 10,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: (context) => `Рейтинг: ${context.parsed.y}`
                    }
                }
            },
            scales: {
                y: {
                    min: 70,
                    max: 100,
                    grid: { color: 'rgba(255, 255, 255, 0.05)', borderDash: [5, 5] },
                    ticks: { color: '#a0a0a0', padding: 10 }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#a0a0a0' }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
        }
    });
}

function updateChart() {
    if (!chartInstance) return;
    
    const validData = academicResults[currentDegree].filter(s => s.officialRating !== null);
    const labels = validData.map(s => `${s.semester} сем`);
    const dataPoints = validData.map(s => s.officialRating);
    
    chartInstance.data.labels = labels;
    chartInstance.data.datasets[0].data = dataPoints;
    
    if(validData.length === 0) {
        chartInstance.options.scales.y.min = 0;
        chartInstance.options.scales.y.max = 100;
    } else {
        const minVal = Math.min(...dataPoints);
        chartInstance.options.scales.y.min = Math.floor(minVal) - 5 < 70 ? Math.floor(minVal) - 5 : 70;
        chartInstance.options.scales.y.max = 100;
    }
    
    chartInstance.update();
}