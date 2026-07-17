function generateFinancialPDF() {
    if (typeof html2pdf === 'undefined') {
        alert('Библиотека html2pdf не загружена!');
        return;
    }

    const btn = document.getElementById('export-pdf-btn');
    const originalIcon = btn.innerHTML;
    btn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i>";
    btn.disabled = true;

    const isDark = document.body.classList.contains('dark-mode');
    const bgColor = isDark ? '#121212' : '#ffffff';
    const cardBg = isDark ? '#1e1e1e' : '#f8f9fa';
    const textColor = isDark ? '#e4e6eb' : '#333333';
    const subTextColor = isDark ? '#aaaaaa' : '#777777';
    const borderColor = isDark ? '#333333' : '#eeeeee';

    function getVal(id) { 
        const el = document.getElementById(id); 
        return el ? (el.dataset.realValue || el.innerText) : ''; 
    }
    function getSpan(sel) { 
        const el = document.querySelector(sel); 
        return el ? (el.dataset.realValue || el.innerText) : ''; 
    }

    const barImg = mainBarChart.toBase64Image();
    const pieImg = doughnutChart.toBase64Image();
    const trendImg = trendChart.toBase64Image();

    const htmlContent = `
        <div style="background-color: ${bgColor}; color: ${textColor}; font-family: 'Inter', sans-serif; padding: 25px 30px; box-sizing: border-box; width: 794px;">
            <style>
                .pdf-grid { display: grid; gap: 15px; margin-bottom: 15px; }
                .pdf-card { background: ${cardBg}; padding: 15px; border-radius: 12px; border: 1px solid ${borderColor}; }
                .pdf-title { margin: 0 0 8px; font-size: 11px; color: ${subTextColor}; text-transform: uppercase; letter-spacing: 0.5px; }
                .pdf-value { margin: 0 0 5px; font-size: 20px; font-weight: 600; }
                .pdf-sub { font-size: 11px; color: ${subTextColor}; margin: 3px 0; }
                
                /* Стили для блока целей, чтобы они красиво отрендерились в PDF */
                .goal-item { margin-bottom: 12px; }
                .goal-header { display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 5px; font-weight: 600; }
                .progress-bar-bg { width: 100%; height: 8px; background-color: ${isDark ? '#2c2c2c' : '#e2e8f0'}; border-radius: 4px; overflow: hidden; }
                .progress-bar-fill { height: 100%; border-radius: 4px; }
            </style>

            <div style="text-align: center; margin-bottom: 25px; border-bottom: 2px solid ${borderColor}; padding-bottom: 15px;">
                <h1 style="margin: 0 0 5px; font-size: 24px; font-weight: 600;">Детальный Финансовый Отчет</h1>
                <p style="margin: 0; color: ${subTextColor}; font-size: 12px;">
                    Трекер kiwwij | Период: ${document.getElementById('current-year-display').innerText} | Сформировано: ${new Date().toLocaleDateString('ru-RU')}
                </p>
            </div>

            <!-- Строка 1: Главные цифры (Доход, Расход, Копилка) -->
            <div class="pdf-grid" style="grid-template-columns: 1fr 1fr 1fr;">
                <div class="pdf-card" style="text-align: center;">
                    <h3 class="pdf-title">Всего заработано</h3>
                    <h2 class="pdf-value" style="color: #2ecc71;">${getVal('m-total-income')}</h2>
                    <p class="pdf-sub">В среднем: ${getSpan('#m-avg-income span')} ₴/мес</p>
                    <p class="pdf-sub">Медиана: ${getSpan('#m-median-income span')} ₴/мес</p>
                </div>
                <div class="pdf-card" style="text-align: center;">
                    <h3 class="pdf-title">Всего потрачено</h3>
                    <h2 class="pdf-value" style="color: #e74c3c;">${getVal('m-total-expense')}</h2>
                    <p class="pdf-sub">В среднем: ${getSpan('#m-avg-expense span')} ₴/мес</p>
                    <p class="pdf-sub">Медиана: ${getSpan('#m-median-expense span')} ₴/мес</p>
                </div>
                <div class="pdf-card" style="text-align: center;">
                    <h3 class="pdf-title">Отложено (Копилка)</h3>
                    <h2 class="pdf-value">${getVal('m-total-saved')}</h2>
                    <p class="pdf-sub" style="font-weight: 600;">${document.getElementById('m-save-rate').innerText}</p>
                    <p class="pdf-sub">${document.querySelector('#absolute-total-saved').innerText}</p>
                </div>
            </div>

            <!-- Строка 2: Рекорды и категории -->
            <div class="pdf-grid" style="grid-template-columns: 1fr 1fr;">
                <div class="pdf-card">
                    <h3 class="pdf-title">Самый затратный месяц</h3>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h2 class="pdf-value" style="margin: 0;">${getVal('m-top-month')}</h2>
                        <span style="font-weight: 600; font-size: 16px;">-${getSpan('#m-top-month-val')} ₴</span>
                    </div>
                </div>
                <div class="pdf-card">
                    <h3 class="pdf-title">Главная статья расходов</h3>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h2 class="pdf-value" style="margin: 0; color: ${document.getElementById('m-top-category').style.color};">${getVal('m-top-category')}</h2>
                        <div style="text-align: right;">
                            <div style="font-weight: 600; font-size: 15px;">${getVal('m-top-category-val')}</div>
                            <div class="pdf-sub" style="margin: 0;">${getVal('m-top-category-pct')}</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Строка 3: Графики 1 -->
            <div class="pdf-grid" style="grid-template-columns: 1.6fr 1fr;">
                <div class="pdf-card">
                    <h3 class="pdf-title">Доходы и Расходы по месяцам</h3>
                    <img src="${barImg}" style="width: 100%; height: 180px; object-fit: contain; display: block;">
                </div>
                <div class="pdf-card">
                    <h3 class="pdf-title">Структура трат</h3>
                    <img src="${pieImg}" style="width: 100%; height: 180px; object-fit: contain; display: block;">
                </div>
            </div>

            <!-- Строка 4: Графики 2 и Цели -->
            <div class="pdf-grid" style="grid-template-columns: 1.6fr 1fr;">
                <div class="pdf-card">
                    <h3 class="pdf-title">Динамика сбережений</h3>
                    <img src="${trendImg}" style="width: 100%; height: 180px; object-fit: contain; display: block;">
                </div>
                <div class="pdf-card">
                    <h3 class="pdf-title">Прогресс целей</h3>
                    <div style="margin-top: 15px;">
                        ${document.getElementById('goals-container').innerHTML}
                    </div>
                </div>
            </div>
            
            <div style="text-align: right; color: ${subTextColor}; font-size: 10px; margin-top: 5px;">
                Учтен курс НБУ: ${getVal('usd-amount')} $
            </div>
        </div>
    `;

    const opt = {
        margin:       5,
        filename:     `finance_report_${document.getElementById('current-year-display').innerText}.pdf`,
        image:        { type: 'jpeg', quality: 1.0 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(htmlContent).save().then(() => {
        btn.innerHTML = originalIcon;
        btn.disabled = false;
    }).catch(err => {
        console.error("Ошибка при генерации PDF:", err);
        btn.innerHTML = originalIcon;
        btn.disabled = false;
    });
}