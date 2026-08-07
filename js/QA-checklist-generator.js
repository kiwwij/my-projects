const dict = {
    uk: {
        pageTitle: "QA Checklist Generator",
        headerTitle: "QA Checklists",
        projDesc: "Структурована утиліта тестування",
        helpBtn: "Довідка",
        importBtn: "Імпорт",
        resetBtn: "Скинути",
        lblDate: "Date:",
        lblBuild: "Build:",
        lblTester: "Tester Name:",
        lblEnv: "Environment:",
        addRowBtn: "Add New Module",
        modalHelpTitle: "Як створювати чек-листи",
        modalHelpContent: "<p><b>Швидке додавання елементів:</b> У стовпці <i>Add / Actions</i> використовуйте кнопки:<br>• <b>+Sub</b> — додає рядок з тим самим Module.<br>• <b>+Elem</b> — додає рядок з тим самим Module і Submodule.<br>• <b>+Sum</b> — додає рядок з тими самими Module, Submodule та Element.</p><p><b>Автозбереження:</b> Дані зберігаються автоматично після будь-якої зміни.</p><p><b>Збереження та Завантаження (JSON):</b> Кнопка <b>JSON</b> дає змогу вивантажити файл чек-листа, а <b>Імпорт</b> — завантажити його знов.</p>",
        optPassed: "passed",
        optFailed: "failed",
        optUntested: "untested",
        optBlocked: "blocked",
        phBuild: "v1.0.0",
        phTester: "Ім'я...",
        phEnv: "Win 11, Chrome...",
        confirmReset: "Ви впевнені, що хочете очистити весь чек-лист?",
        importError: "Помилка при завантаженні JSON файлу!"
    },
    ru: {
        pageTitle: "QA Checklist Generator",
        headerTitle: "QA Checklists",
        projDesc: "Структурированная утилита тестирования",
        helpBtn: "Справка",
        importBtn: "Импорт",
        resetBtn: "Сбросить",
        lblDate: "Date:",
        lblBuild: "Build:",
        lblTester: "Tester Name:",
        lblEnv: "Environment:",
        addRowBtn: "Add New Module",
        modalHelpTitle: "Как создавать чек-листы",
        modalHelpContent: "<p><b>Быстрое добавление элементов:</b> В колонке <i>Add / Actions</i> используйте кнопки:<br>• <b>+Sub</b> — создаёт строку с тем же Module.<br>• <b>+Elem</b> — создаёт строку с теми же Module и Submodule.<br>• <b>+Sum</b> — создаёт строку с теми же Module, Submodule и Element.</p><p><b>Автосохранение:</b> Все изменения автоматически сохраняются в браузере.</p><p><b>Сохранение и Загрузка (JSON):</b> Кнопка <b>JSON</b> позволяет выгрузить чек-лист, а <b>Импорт</b> — вставить его обратно позже.</p>",
        optPassed: "passed",
        optFailed: "failed",
        optUntested: "untested",
        optBlocked: "blocked",
        phBuild: "v1.0.0",
        phTester: "Имя...",
        phEnv: "Win 11, Chrome...",
        confirmReset: "Вы уверены, что хотите сбросить весь чек-лист?",
        importError: "Ошибка при чтении JSON файла!"
    },
    en: {
        pageTitle: "QA Checklist Generator",
        headerTitle: "QA Checklists",
        projDesc: "Structured testing utility",
        helpBtn: "Help",
        importBtn: "Import",
        resetBtn: "Reset",
        lblDate: "Date:",
        lblBuild: "Build:",
        lblTester: "Tester Name:",
        lblEnv: "Environment:",
        addRowBtn: "Add New Module",
        modalHelpTitle: "How to create checklists",
        modalHelpContent: "<p><b>Adding elements:</b> Use action buttons in <i>Add / Actions</i> column:<br>• <b>+Sub</b> — copies Module.<br>• <b>+Elem</b> — copies Module and Submodule.<br>• <b>+Sum</b> — copies Module, Submodule, and Element.</p><p><b>Auto-save:</b> State saves automatically on any change.</p><p><b>Save / Load (JSON):</b> Click <b>JSON</b> to download state, and <b>Import</b> to restore it anytime.</p>",
        optPassed: "passed",
        optFailed: "failed",
        optUntested: "untested",
        optBlocked: "blocked",
        phBuild: "v1.0.0",
        phTester: "Name...",
        phEnv: "Win 11, Chrome...",
        confirmReset: "Are you sure you want to reset the checklist?",
        importError: "Invalid JSON file format!"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('tableBody');
    const testDate = document.getElementById('testDate');
    const buildVersion = document.getElementById('buildVersion');
    const testerName = document.getElementById('testerName');
    const environmentStr = document.getElementById('environmentStr');
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const curr = document.body.getAttribute('data-theme');
        const next = curr === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
    });

    function updateThemeIcon(theme) {
        themeToggle.innerHTML = theme === 'dark' ? "<i class='bx bx-sun'></i>" : "<i class='bx bx-moon'></i>";
    }

    const langSelect = document.getElementById('langSelect');
    const savedLang = localStorage.getItem('lang') || 'uk';
    langSelect.value = savedLang;
    applyTranslation(savedLang);

    langSelect.addEventListener('change', (e) => {
        const lang = e.target.value;
        localStorage.setItem('lang', lang);
        applyTranslation(lang);
    });

    function applyTranslation(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[lang] && dict[lang][key]) el.innerHTML = dict[lang][key];
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[lang] && dict[lang][key]) el.placeholder = dict[lang][key];
        });
        
        document.querySelectorAll('.status-select').forEach(select => {
            const val = select.value;
            select.innerHTML = `
                <option value="untested" ${val === 'untested' ? 'selected' : ''}>${dict[lang].optUntested}</option>
                <option value="passed" ${val === 'passed' ? 'selected' : ''}>${dict[lang].optPassed}</option>
                <option value="failed" ${val === 'failed' ? 'selected' : ''}>${dict[lang].optFailed}</option>
                <option value="blocked" ${val === 'blocked' ? 'selected' : ''}>${dict[lang].optBlocked}</option>
            `;
            updateStatusColor(select);
        });
    }

    function createRow(mod = '', sub = '', elem = '', sum = '', stat = 'untested') {
        const tr = document.createElement('tr');
        const lang = localStorage.getItem('lang') || 'uk';
        
        tr.innerHTML = `
            <td data-label="Module"><input type="text" class="mod-input" value="${mod}" placeholder="Module..." title="Введіть модуль"></td>
            <td data-label="Submodule"><input type="text" class="sub-input" value="${sub}" placeholder="Submodule..." title="Введіть субмодуль"></td>
            <td data-label="Element"><input type="text" class="elem-input" value="${elem}" placeholder="Element..." title="Введіть елемент або функцію"></td>
            <td data-label="Summary"><input type="text" class="sum-input" value="${sum}" placeholder="Summary..." title="Короткий зміст перевірки"></td>
            <td data-label="Status">
                <select class="status-select" title="Статус виконання">
                    <option value="untested" ${stat === 'untested' ? 'selected' : ''}>${dict[lang].optUntested}</option>
                    <option value="passed" ${stat === 'passed' ? 'selected' : ''}>${dict[lang].optPassed}</option>
                    <option value="failed" ${stat === 'failed' ? 'selected' : ''}>${dict[lang].optFailed}</option>
                    <option value="blocked" ${stat === 'blocked' ? 'selected' : ''}>${dict[lang].optBlocked}</option>
                </select>
            </td>
            <td data-label="Actions">
                <div class="row-actions">
                    <button class="btn-add-sub" title="Додати Submodule в цей модуль">+Sub</button>
                    <button class="btn-add-elem" title="Додати Element в цей субмодуль">+Elem</button>
                    <button class="btn-add-sum" title="Додати Summary для цього елемента">+Sum</button>
                    <button class="del-row" title="Видалити рядок"><i class='bx bx-trash'></i></button>
                </div>
            </td>
        `;

        const select = tr.querySelector('.status-select');
        updateStatusColor(select);

        tr.querySelectorAll('input').forEach(i => i.addEventListener('input', autoSave));
        select.addEventListener('change', function() {
            updateStatusColor(this);
            autoSave();
        });

        tr.querySelector('.btn-add-sub').addEventListener('click', () => {
            const currMod = tr.querySelector('.mod-input').value;
            const newRow = createRow(currMod, '', '', '', 'untested');
            tr.insertAdjacentElement('afterend', newRow);
            autoSave();
        });

        tr.querySelector('.btn-add-elem').addEventListener('click', () => {
            const currMod = tr.querySelector('.mod-input').value;
            const currSub = tr.querySelector('.sub-input').value;
            const newRow = createRow(currMod, currSub, '', '', 'untested');
            tr.insertAdjacentElement('afterend', newRow);
            autoSave();
        });

        tr.querySelector('.btn-add-sum').addEventListener('click', () => {
            const currMod = tr.querySelector('.mod-input').value;
            const currSub = tr.querySelector('.sub-input').value;
            const currElem = tr.querySelector('.elem-input').value;
            const newRow = createRow(currMod, currSub, currElem, '', 'untested');
            tr.insertAdjacentElement('afterend', newRow);
            autoSave();
        });

        tr.querySelector('.del-row').addEventListener('click', () => {
            tr.remove();
            autoSave();
        });

        return tr;
    }

    function updateStatusColor(select) {
        select.className = 'status-select'; 
        if (select.value === 'passed') select.classList.add('status-passed');
        if (select.value === 'failed') select.classList.add('status-failed');
        if (select.value === 'untested') select.classList.add('status-untested');
        if (select.value === 'blocked') select.classList.add('status-blocked');
    }

    function autoSave() {
        const rowsData = [];
        document.querySelectorAll('#tableBody tr').forEach(tr => {
            const inputs = tr.querySelectorAll('input');
            const select = tr.querySelector('select');
            rowsData.push({
                mod: inputs[0].value,
                sub: inputs[1].value,
                elem: inputs[2].value,
                sum: inputs[3].value,
                stat: select.value
            });
        });

        const state = {
            testDate: testDate.value,
            buildVersion: buildVersion.value,
            testerName: testerName.value,
            environmentStr: environmentStr.value,
            rows: rowsData
        };

        localStorage.setItem('qa_checklist_auto_save', JSON.stringify(state));
    }

    function restoreState(state) {
        if (!state) return;
        if (state.testDate !== undefined) testDate.value = state.testDate;
        if (state.buildVersion !== undefined) buildVersion.value = state.buildVersion;
        if (state.testerName !== undefined) testerName.value = state.testerName;
        if (state.environmentStr !== undefined) environmentStr.value = state.environmentStr;

        tableBody.innerHTML = '';
        if (state.rows && state.rows.length > 0) {
            state.rows.forEach(r => {
                tableBody.appendChild(createRow(r.mod, r.sub, r.elem, r.sum, r.stat));
            });
        } else {
            tableBody.appendChild(createRow());
        }
    }

    const savedData = localStorage.getItem('qa_checklist_auto_save');
    if (savedData) {
        try {
            restoreState(JSON.parse(savedData));
        } catch(e) {
            tableBody.appendChild(createRow());
        }
    } else {
        tableBody.appendChild(createRow());
    }

    document.getElementById('addRowBtnMain').addEventListener('click', () => {
        tableBody.appendChild(createRow());
        autoSave();
    });

    [testDate, buildVersion, testerName, environmentStr].forEach(el => {
        el.addEventListener('input', autoSave);
    });

    document.getElementById('btnReset').addEventListener('click', () => {
        const lang = localStorage.getItem('lang') || 'uk';
        if (confirm(dict[lang].confirmReset)) {
            localStorage.removeItem('qa_checklist_auto_save');
            testDate.value = '';
            buildVersion.value = '';
            testerName.value = '';
            environmentStr.value = '';
            tableBody.innerHTML = '';
            tableBody.appendChild(createRow());
            autoSave();
        }
    });

    document.getElementById('btnExportJson').addEventListener('click', () => {
        const rawState = localStorage.getItem('qa_checklist_auto_save') || '{}';
        downloadFile(rawState, 'qa_checklist_state.json', 'application/json');
    });

    const btnImportJson = document.getElementById('btnImportJson');
    const importFileInput = document.getElementById('importFileInput');

    btnImportJson.addEventListener('click', () => importFileInput.click());

    importFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const parsed = JSON.parse(event.target.result);
                restoreState(parsed);
                autoSave();
            } catch (err) {
                const lang = localStorage.getItem('lang') || 'uk';
                alert(dict[lang].importError);
            }
        };
        reader.readAsText(file);
        importFileInput.value = '';
    });

    const modalHelp = document.getElementById('modalHelp');
    document.getElementById('btnHelp').addEventListener('click', () => {
        modalHelp.style.display = 'flex';
    });

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
        }
    });

    function cleanTextForExport(text) {
        return text.replace(/!\[.*?\]\([^)]+\)/g, '')
                   .replace(/<img[^>]*>/g, '')
                   .trim();
    }

    document.getElementById('btnExportTxt').addEventListener('click', () => {
        let content = `PROJECT QA CHECKLIST\n====================\n`;
        content += `Date: ${testDate.value}\n`;
        content += `Build: ${buildVersion.value}\n`;
        content += `Tester: ${testerName.value}\n`;
        content += `Environment: ${environmentStr.value}\n\n`;
        content += `--------------------------------------------------\n`;

        document.querySelectorAll('#tableBody tr').forEach(row => {
            const inputs = row.querySelectorAll('input');
            const select = row.querySelector('select');
            
            const mod = cleanTextForExport(inputs[0].value) || '-';
            const sub = cleanTextForExport(inputs[1].value) || '-';
            const elem = cleanTextForExport(inputs[2].value) || '-';
            const sum = cleanTextForExport(inputs[3].value) || '-';
            const stat = select.value.toUpperCase();

            content += `[${mod}] > [${sub}] > ${elem}: ${sum} | STATUS: ${stat}\n`;
        });

        downloadFile(content, 'qa_checklist.txt', 'text/plain');
    });

    function downloadFile(content, fileName, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
});