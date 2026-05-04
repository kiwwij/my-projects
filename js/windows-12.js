document.addEventListener('DOMContentLoaded', () => {
    const OS = {
        activated: false,
        username: "Пользователь",
        avatar: "<i class='bx bx-user'></i>",
        zIndexCounter: 100,
        layout: 'grid',
        iconSize: 'medium',
        language: 'ru',
        deletedItems: [],
        itemsIdCounter: 10,
        desktopItems: [
            { id: 1, name: 'Мой компьютер', icon: 'bx-desktop', app: 'explorer', type: 'app' },
            { id: 2, name: 'Корзина', icon: 'bx-trash', app: 'recycle_bin', type: 'app' },
            { id: 3, name: 'Мои документы', icon: 'bx-folder', app: 'explorer', type: 'folder' },
            { id: 4, name: 'Заметки', icon: 'bx-notepad', app: 'notepad', type: 'file' }
        ]
    };

    const DOM = {
        desktop: document.getElementById('desktop'),
        windowsContainer: document.getElementById('windows-container'),
        startMenu: document.getElementById('start-menu'),
        contextMenu: document.getElementById('context-menu'),
        watermark: document.getElementById('activation-watermark')
    };

    const appsConfig = {
        explorer: {
            title: '<i class="bx bx-folder"></i> Проводник', width: 700, height: 500,
            content: `
                <div class="explorer-app">
                    <div class="ex-address-bar">
                        <button class="icon-btn"><i class='bx bx-arrow-back'></i></button>
                        <input type="text" value="C:/Users/${OS.username}/Desktop" readonly>
                    </div>
                    <div class="ex-body">
                        <div class="ex-sidebar">
                            <div><i class='bx bx-desktop'></i> Рабочий стол</div>
                            <div><i class='bx bx-download'></i> Загрузки</div>
                            <div><i class='bx bx-file'></i> Документы</div>
                            <div class="disk-space">
                                Диск C: (250 ГБ)
                                <div class="progress-bar"><div class="progress-fill"></div></div>
                                112 ГБ свободно
                            </div>
                        </div>
                        <div class="ex-main">
                            <div class="desktop-icon"><i class='bx bx-folder'></i><span>Фотографии</span></div>
                            <div class="desktop-icon"><i class='bx bx-file'></i><span>Отчёт.pdf</span></div>
                        </div>
                    </div>
                </div>
            `
        },
        notepad: {
            title: '<i class="bx bx-notepad"></i> Блокнот', width: 400, height: 300,
            content: `<textarea style="width:100%;height:100%;resize:none;border:none;background:transparent;color:var(--text-color);padding:10px;outline:none;font-family:monospace;"></textarea>`
        },
        recycle_bin: {
            title: '<i class="bx bx-trash"></i> Корзина', width: 500, height: 400,
            onOpen: (win) => {
                const container = win.querySelector('.ex-main');
                container.innerHTML = OS.deletedItems.length === 0 ? '<p style="padding:20px; opacity:0.5;">Корзина пуста</p>' : '';
                OS.deletedItems.forEach(item => {
                    const el = document.createElement('div');
                    el.className = 'desktop-icon';
                    el.innerHTML = `<i class='bx ${item.icon}'></i><span>${item.name}</span>`;
                    container.appendChild(el);
                });
            },
            content: `
                <div class="explorer-app">
                    <div class="ex-address-bar" style="justify-content:space-between">
                        <button class="setting-btn" id="empty-bin" style="background:#e81123">Очистить корзину</button>
                        <button class="setting-btn" id="restore-bin">Восстановить всё</button>
                    </div>
                    <div class="ex-body"><div class="ex-main" style="width:100%"></div></div>
                </div>
            `
        },
        settings: {
            title: '<i class="bx bx-cog"></i> Параметры', width: 650, height: 450,
            onOpen: setupSettingsLogic,
            content: `
                <div class="settings-app">
                    <div class="settings-sidebar">
                        <div class="settings-tab active" data-target="set-personal"><i class='bx bx-palette'></i> Персонализация</div>
                        <div class="settings-tab" data-target="set-account"><i class='bx bx-user'></i> Учётная запись</div>
                        <div class="settings-tab" data-target="set-time"><i class='bx bx-time'></i> Время и язык</div>
                        <div class="settings-tab" data-target="set-system"><i class='bx bx-info-circle'></i> О системе</div>
                    </div>
                    <div class="settings-main">
                        <div id="set-personal" class="settings-section active">
                            <h2>Персонализация</h2>
                            <div class="setting-group" style="margin-top:15px">
                                <label>Тема оформления</label>
                                <select class="setting-input" id="theme-select">
                                    <option value="light">Светлая</option>
                                    <option value="dark">Тёмная</option>
                                </select>
                            </div>
                            <div class="setting-group">
                                <label>Акцентный цвет</label>
                                <input type="color" id="accent-color" class="color-picker" value="#0078D4">
                            </div>
                            <div class="setting-group">
                                <label>Обои по умолчанию</label>
                                <select class="setting-input" id="wallpaper-select">
                                    <option value="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe">Обои 1 (Абстракция)</option>
                                    <option value="https://images.unsplash.com/photo-1472214103451-9374bd1c798e">Обои 2 (Природа)</option>
                                    <option value="https://images.unsplash.com/photo-1550684848-fac1c5b4e853">Обои 3 (Космос)</option>
                                    <option value="https://images.unsplash.com/photo-1506744626753-1fa7673b22de">Обои 4 (Горы)</option>
                                </select>
                            </div>
                            <div class="setting-group">
                                <label>Обои по ссылке</label>
                                <input type="text" class="setting-input" id="custom-wallpaper-url" placeholder="https://...">
                                <button class="setting-btn" id="apply-custom-wall">Применить ссылку</button>
                            </div>
                            <div class="setting-group">
                                <label><input type="checkbox" id="toggle-glass" checked> Эффект прозрачности панелей</label><br><br>
                                <label><input type="checkbox" id="toggle-anim" checked> Эффекты анимации окон</label>
                            </div>
                        </div>
                        <div id="set-account" class="settings-section">
                            <h2>Учётная запись</h2>
                            <div class="setting-group" style="margin-top:15px">
                                <label>Имя пользователя</label>
                                <input type="text" class="setting-input" id="set-username-input" value="${OS.username}">
                                <button class="setting-btn" id="save-username">Сохранить</button>
                            </div>
                            <div class="setting-group">
                                <h3>Активация Windows</h3>
                                <p style="font-size:12px; margin:5px 0;">Статус: <span id="act-status" style="color:red">Не активирована</span></p>
                                <button class="setting-btn" id="activate-win-btn">Активировать систему</button>
                            </div>
                        </div>
                        <div id="set-time" class="settings-section">
                            <h2>Время и язык</h2>
                            <div class="setting-group" style="margin-top:15px">
                                <label>Язык интерфейса</label>
                                <select class="setting-input" id="lang-select">
                                    <option value="ru" selected>Русский</option>
                                    <option value="en">English</option>
                                    <option value="uk">Українська</option>
                                </select>
                            </div>
                            <div class="setting-group">
                                <label>Часовой пояс</label>
                                <select class="setting-input"><option>Определить автоматически</option></select>
                            </div>
                        </div>
                        <div id="set-system" class="settings-section">
                            <h2>О системе</h2>
                            <ul style="font-size:13px; line-height:2; margin-top:15px; list-style:none;">
                                <li><b>Выпуск:</b> Windows 12 Web Concept</li>
                                <li><b>Версия:</b> 26H2</li>
                                <li><b>Процессор:</b> Симуляция Neural JS Core</li>
                                <li><b>ОЗУ:</b> 16.0 ГБ (доступно: 15.8 ГБ)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        },
        paint: {
            title: '<i class="bx bx-paint"></i> Paint', width: 700, height: 500,
            onOpen: setupPaintLogic,
            content: `
                <div class="paint-app">
                    <div class="paint-toolbar">
                        <input type="color" id="paint-color" value="#000000" title="Цвет">
                        <input type="range" id="paint-size" min="1" max="20" value="5" title="Толщина">
                        <button class="setting-btn" id="paint-clear" style="padding: 5px 10px; font-size:12px;">Очистить</button>
                    </div>
                    <div class="paint-canvas-container">
                        <canvas id="paint-canvas" width="600" height="400"></canvas>
                    </div>
                </div>
            `
        }
    };

    function renderDesktop() {
        DOM.desktop.innerHTML = '';
        OS.desktopItems.forEach(item => {
            const el = document.createElement('div');
            el.className = 'desktop-icon';
            el.setAttribute('data-id', item.id);
            if (item.app) el.setAttribute('data-app', item.app);
            
            if (OS.layout === 'free') {
                el.style.left = (item.x || 20) + 'px';
                el.style.top = (item.y || 20) + 'px';
            }

            el.innerHTML = `<i class='bx ${item.icon}'></i><span>${item.name}</span>`;
            
            el.addEventListener('dblclick', () => {
                if (item.app) openWindow(item.app);
                else alert('Это просто файл!');
            });

            el.addEventListener('contextmenu', (e) => {
                e.stopPropagation();
                e.preventDefault();
                if(confirm(`Удалить "${item.name}" в корзину?`)) {
                    OS.deletedItems.push(item);
                    OS.desktopItems = OS.desktopItems.filter(i => i.id !== item.id);
                    renderDesktop();
                }
            });

            let isDragging = false, startX, startY, initX, initY;
            el.addEventListener('mousedown', (e) => {
                if (OS.layout === 'grid' || e.button !== 0) return;
                isDragging = true; startX = e.clientX; startY = e.clientY;
                initX = el.offsetLeft; initY = el.offsetTop;
                el.style.zIndex = 1000;
            });
            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                el.style.left = `${initX + (e.clientX - startX)}px`;
                el.style.top = `${initY + (e.clientY - startY)}px`;
            });
            document.addEventListener('mouseup', (e) => {
                if (isDragging) {
                    isDragging = false; el.style.zIndex = 1;
                    item.x = el.offsetLeft; item.y = el.offsetTop;
                }
            });

            DOM.desktop.appendChild(el);
        });
    }

    function openWindow(appId) {
        const app = appsConfig[appId];
        if (!app) return;

        const win = document.createElement('div');
        win.className = 'window';
        win.style.width = `${app.width}px`; win.style.height = `${app.height}px`;
        win.style.top = '50px'; win.style.left = '100px';
        win.style.zIndex = ++OS.zIndexCounter;

        win.innerHTML = `
            <div class="window-header">
                <div class="window-title">${app.title}</div>
                <div class="window-controls">
                    <button class="win-btn min"><i class='bx bx-minus'></i></button>
                    <button class="win-btn max"><i class='bx bx-square'></i></button>
                    <button class="win-btn close"><i class='bx bx-x'></i></button>
                </div>
            </div>
            <div class="window-content">${app.content}</div>
        `;

        DOM.windowsContainer.appendChild(win);

        if (app.onOpen) app.onOpen(win);

        win.querySelector('.close').addEventListener('click', () => win.remove());
        win.querySelector('.max').addEventListener('click', () => win.classList.toggle('fullscreen'));
        win.querySelector('.min').addEventListener('click', () => win.style.display = 'none');
        win.addEventListener('mousedown', () => win.style.zIndex = ++OS.zIndexCounter);

        const header = win.querySelector('.window-header');
        let isDrag = false, sx, sy, ix, iy;
        header.addEventListener('mousedown', (e) => {
            if (e.target.closest('.win-btn') || win.classList.contains('fullscreen')) return;
            isDrag = true; sx = e.clientX; sy = e.clientY;
            ix = win.offsetLeft; iy = win.offsetTop;
        });
        document.addEventListener('mousemove', (e) => {
            if (!isDrag) return;
            win.style.left = `${ix + (e.clientX - sx)}px`;
            win.style.top = `${iy + (e.clientY - sy)}px`;
        });
        document.addEventListener('mouseup', () => isDrag = false);
    }

    function setupSettingsLogic(win) {
        const tabs = win.querySelectorAll('.settings-tab');
        const sections = win.querySelectorAll('.settings-section');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                sections.forEach(s => s.classList.remove('active'));
                tab.classList.add('active');
                win.querySelector(`#${tab.dataset.target}`).classList.add('active');
            });
        });

        const themeSel = win.querySelector('#theme-select');
        themeSel.value = document.documentElement.getAttribute('data-theme');
        themeSel.addEventListener('change', (e) => document.documentElement.setAttribute('data-theme', e.target.value));

        const accentInput = win.querySelector('#accent-color');
        accentInput.addEventListener('input', (e) => document.documentElement.style.setProperty('--accent-color', e.target.value));

        const wallSel = win.querySelector('#wallpaper-select');
        wallSel.addEventListener('change', (e) => document.getElementById('wallpaper').style.backgroundImage = `url('${e.target.value}?q=80&w=2564&auto=format&fit=crop')`);
        
        win.querySelector('#apply-custom-wall').addEventListener('click', () => {
            const url = win.querySelector('#custom-wallpaper-url').value;
            if(url) document.getElementById('wallpaper').style.backgroundImage = `url('${url}')`;
        });

        win.querySelector('#toggle-glass').addEventListener('change', (e) => document.documentElement.classList.toggle('glass-on', e.target.checked));
        win.querySelector('#toggle-anim').addEventListener('change', (e) => document.documentElement.classList.toggle('animations-on', e.target.checked));

        win.querySelector('#save-username').addEventListener('click', () => {
            OS.username = win.querySelector('#set-username-input').value;
            document.getElementById('start-username').innerText = OS.username;
        });

        const actBtn = win.querySelector('#activate-win-btn');
        if (OS.activated) {
            actBtn.disabled = true; actBtn.innerText = "Уже активировано";
            win.querySelector('#act-status').innerText = "Активирована";
            win.querySelector('#act-status').style.color = "green";
        }
        actBtn.addEventListener('click', () => {
            OS.activated = true;
            DOM.watermark.classList.add('hidden');
            actBtn.disabled = true; actBtn.innerText = "Уже активировано";
            win.querySelector('#act-status').innerText = "Активирована надёжно!";
            win.querySelector('#act-status').style.color = "green";
        });

        document.body.addEventListener('click', (e) => {
            if(e.target.id === 'empty-bin') {
                OS.deletedItems = [];
                win.querySelector('.ex-main').innerHTML = '<p style="padding:20px; opacity:0.5;">Корзина пуста</p>';
            }
            if(e.target.id === 'restore-bin') {
                OS.desktopItems.push(...OS.deletedItems);
                OS.deletedItems = [];
                renderDesktop();
                win.querySelector('.ex-main').innerHTML = '<p style="padding:20px; opacity:0.5;">Корзина пуста</p>';
            }
        });
    }

    function setupPaintLogic(win) {
        const canvas = win.querySelector('#paint-canvas');
        const ctx = canvas.getContext('2d');
        const colorPicker = win.querySelector('#paint-color');
        const sizePicker = win.querySelector('#paint-size');
        const clearBtn = win.querySelector('#paint-clear');

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let painting = false;

        function startPosition(e) { painting = true; draw(e); }
        function endPosition() { painting = false; ctx.beginPath(); }
        function draw(e) {
            if (!painting) return;
            const rect = canvas.getBoundingClientRect();
            ctx.lineWidth = sizePicker.value;
            ctx.lineCap = 'round';
            ctx.strokeStyle = colorPicker.value;
            
            ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
        }

        canvas.addEventListener('mousedown', startPosition);
        canvas.addEventListener('mouseup', endPosition);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseleave', endPosition);

        clearBtn.addEventListener('click', () => {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        });
    }

    document.addEventListener('contextmenu', (e) => {
        if (e.target === DOM.desktop) {
            e.preventDefault();
            DOM.contextMenu.style.left = `${e.pageX}px`;
            DOM.contextMenu.style.top = `${e.pageY}px`;
            DOM.contextMenu.classList.remove('hidden');
            DOM.startMenu.classList.add('hidden');
        } else if (!e.target.closest('.desktop-icon')) {
             DOM.contextMenu.classList.add('hidden');
        }
    });

    document.addEventListener('click', (e) => {
        if (!DOM.contextMenu.contains(e.target)) DOM.contextMenu.classList.add('hidden');
        if (!DOM.startMenu.contains(e.target) && !e.target.closest('#start-btn')) DOM.startMenu.classList.add('hidden');
    });

    function updateMenuChecks(ids, activeId) {
        ids.forEach(id => document.getElementById(id).querySelector('.ctx-check').classList.add('hidden'));
        document.getElementById(activeId).querySelector('.ctx-check').classList.remove('hidden');
    }

    document.getElementById('ctx-view-large').addEventListener('click', () => { document.documentElement.style.setProperty('--icon-size', '96px'); updateMenuChecks(['ctx-view-large','ctx-view-medium','ctx-view-small'], 'ctx-view-large'); });
    document.getElementById('ctx-view-medium').addEventListener('click', () => { document.documentElement.style.setProperty('--icon-size', '64px'); updateMenuChecks(['ctx-view-large','ctx-view-medium','ctx-view-small'], 'ctx-view-medium'); });
    document.getElementById('ctx-view-small').addEventListener('click', () => { document.documentElement.style.setProperty('--icon-size', '48px'); updateMenuChecks(['ctx-view-large','ctx-view-medium','ctx-view-small'], 'ctx-view-small'); });

    document.getElementById('ctx-view-grid').addEventListener('click', () => { 
        OS.layout = 'grid'; DOM.desktop.classList.add('grid-layout'); 
        updateMenuChecks(['ctx-view-grid','ctx-view-free'], 'ctx-view-grid'); renderDesktop(); 
    });
    document.getElementById('ctx-view-free').addEventListener('click', () => { 
        OS.layout = 'free'; DOM.desktop.classList.remove('grid-layout'); 
        updateMenuChecks(['ctx-view-grid','ctx-view-free'], 'ctx-view-free'); renderDesktop(); 
    });

    document.getElementById('ctx-new-folder').addEventListener('click', () => {
        OS.desktopItems.push({ id: ++OS.itemsIdCounter, name: 'Новая папка', icon: 'bx-folder', type: 'folder' });
        renderDesktop();
    });
    document.getElementById('ctx-new-txt').addEventListener('click', () => {
        OS.desktopItems.push({ id: ++OS.itemsIdCounter, name: 'Новый документ', icon: 'bx-file-blank', app: 'notepad', type: 'file' });
        renderDesktop();
    });
    document.getElementById('ctx-personalize').addEventListener('click', () => { openWindow('settings'); });-
    document.getElementById('start-btn').addEventListener('click', () => DOM.startMenu.classList.toggle('hidden'));
    
    document.querySelectorAll('.start-app').forEach(app => {
        app.addEventListener('click', () => {
            openWindow(app.dataset.app);
            DOM.startMenu.classList.add('hidden');
        });
    });

    function updateClock() {
        const now = new Date();
        document.getElementById('time').innerText = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        document.getElementById('date').innerText = now.toLocaleDateString('ru-RU');
    }
    setInterval(updateClock, 1000); updateClock();

    renderDesktop();
});




// document.addEventListener('DOMContentLoaded', () => {
//     // --- 1. Глобальное состояние (Сохраняется в localStorage) ---
//     const defaultState = {
//         setupDone: false,
//         user: { name: 'Пользователь', avatar: 'bx-user', lang: 'ru', city: 'Винница', country: 'Украина', lat: 49.23, lon: 28.46 },
//         settings: { theme: 'light', wallpaper: 'wallpaper-1', layout: 'grid', iconSize: 'medium', glass: true, anim: true, accentColor: '#0078D4' },
//         activated: false,
//         zIndexCounter: 100,
//         fileSystem: [
//             { id: 'desktop', parent: 'root', name: 'Рабочий стол', type: 'folder', icon: 'bx-desktop' },
//             { id: 'docs', parent: 'root', name: 'Документы', type: 'folder', icon: 'bx-folder' },
//             { id: 'trash', parent: 'root', name: 'Корзина', type: 'folder', icon: 'bx-trash' },
//             { id: 1, parent: 'desktop', name: 'Мой компьютер', icon: 'bx-desktop', type: 'app', app: 'explorer', x: 20, y: 20 },
//             { id: 2, parent: 'desktop', name: 'Корзина', icon: 'bx-trash', type: 'app', app: 'recycle_bin', x: window.innerWidth - 120, y: window.innerHeight - 150 },
//             { id: 3, parent: 'desktop', name: 'Параметры', icon: 'bx-cog', type: 'app', app: 'settings', x: 20, y: 130 }
//         ],
//         pinnedApps: ['explorer', 'notepad', 'paint', 'calculator', 'settings'],
//         openWindows: []
//     };

//     let OS = JSON.parse(localStorage.getItem('win12_state_v2')) || defaultState;
//     const saveState = () => localStorage.setItem('win12_state_v2', JSON.stringify(OS));

//     const DOM = {
//         desktop: document.getElementById('desktop'),
//         windowsContainer: document.getElementById('windows-container'),
//         startMenu: document.getElementById('start-menu'),
//         contextMenu: document.getElementById('context-menu'),
//         setupScreen: document.getElementById('setup-screen'),
//         taskbarApps: document.getElementById('taskbar-apps-container'),
//         calendar: document.getElementById('calendar-widget'),
//         startSearchInput: document.getElementById('start-search-input'),
//         startPinnedGrid: document.getElementById('start-pinned-grid'),
//         startSearchResults: document.getElementById('start-search-results'),
//         startPinnedSection: document.getElementById('start-pinned-section'),
//         startSearchSection: document.getElementById('start-search-section')
//     };

//     const cellSize = 100;

//     // --- 2. Конфигурация Приложений ---
//     const appsConfig = {
//         explorer: {
//             title: '<i class="bx bx-folder"></i> Проводник', width: 750, height: 500, icon: 'bx-folder',
//             onOpen: (win, data) => renderExplorer(win, data?.path || 'desktop'),
//             content: `
//                 <div class="explorer-app">
//                     <div class="ex-address-bar">
//                         <button class="icon-btn" id="ex-up"><i class='bx bx-up-arrow-alt'></i></button>
//                         <input type="text" id="ex-path" readonly>
//                         <button class="icon-btn" id="ex-upload" title="Загрузить файл с ПК"><i class='bx bx-upload'></i></button>
//                     </div>
//                     <div class="ex-body">
//                         <div class="ex-sidebar">
//                             <div data-path="desktop"><i class='bx bx-desktop'></i> Рабочий стол</div>
//                             <div data-path="docs"><i class='bx bx-file'></i> Документы</div>
//                             <div data-path="trash"><i class='bx bx-trash'></i> Корзина</div>
//                             <div class="disk-space">
//                                 Диск C: (250 ГБ)
//                                 <div class="progress-bar"><div class="progress-fill"></div></div>
//                                 112 ГБ свободно
//                             </div>
//                         </div>
//                         <div class="ex-main" id="ex-view"></div>
//                     </div>
//                 </div>`
//         },
//         settings: {
//             title: '<i class="bx bx-cog"></i> Параметры', width: 700, height: 500, icon: 'bx-cog',
//             onOpen: setupSettingsLogic,
//             content: `
//                 <div class="settings-app">
//                     <div class="settings-sidebar">
//                         <div class="settings-tab active" data-target="set-personal"><i class='bx bx-palette'></i> Персонализация</div>
//                         <div class="settings-tab" data-target="set-account"><i class='bx bx-user'></i> Учётная запись</div>
//                         <div class="settings-tab" data-target="set-time"><i class='bx bx-time'></i> Время и язык</div>
//                         <div class="settings-tab" data-target="set-system"><i class='bx bx-info-circle'></i> О системе</div>
//                     </div>
//                     <div class="settings-main">
//                         <div id="set-personal" class="settings-section active">
//                             <h2>Персонализация</h2>
//                             <div class="setting-group"><label>Обои (CSS)</label>
//                                 <select class="setting-input" id="wall-sel">
//                                     <option value="wallpaper-1">Сетка сфер (Светлые тона)</option>
//                                     <option value="wallpaper-2">Тёплый закат</option>
//                                     <option value="wallpaper-3">Абстракция неона</option>
//                                     <option value="wallpaper-4">Минимализм геометрии</option>
//                                 </select>
//                             </div>
//                             <div class="setting-group"><label>Тема</label>
//                                 <select class="setting-input" id="theme-sel"><option value="light">Светлая</option><option value="dark">Тёмная</option></select>
//                             </div>
//                             <div class="setting-group"><label>Акцентный цвет</label>
//                                 <input type="color" id="accent-color" class="color-picker" value="${OS.settings.accentColor}">
//                             </div>
//                             <div class="setting-group">
//                                 <label><input type="checkbox" id="toggle-glass" ${OS.settings.glass?'checked':''}> Эффект прозрачности (Glassmorphism)</label>
//                                 <label style="margin-top:10px;"><input type="checkbox" id="toggle-anim" ${OS.settings.anim?'checked':''}> Анимации окон</label>
//                             </div>
//                         </div>
//                         <div id="set-account" class="settings-section">
//                             <h2>Учётная запись</h2>
//                             <div class="setting-group"><label>Имя</label>
//                                 <input type="text" class="setting-input" id="acc-name" value="${OS.user.name}">
//                                 <button class="setting-btn" id="save-acc" style="margin-top:10px;">Сохранить</button>
//                             </div>
//                             <div class="setting-group" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid var(--glass-border);">
//                                 <h3>Активация Windows</h3>
//                                 <p style="margin: 5px 0 15px;">Статус: <span id="act-status" style="font-weight:bold; color:${OS.activated?'#107C10':'#e81123'}">${OS.activated?'Активирована надёжно':'Не активирована'}</span></p>
//                                 <button class="setting-btn" id="activate-btn" ${OS.activated?'disabled':''}>${OS.activated?'Уже активировано':'Активировать'}</button>
//                             </div>
//                         </div>
//                         <div id="set-time" class="settings-section">
//                             <h2>Время и язык</h2>
//                             <div class="setting-group"><label>Язык интерфейса</label>
//                                 <select class="setting-input" id="lang-sel">
//                                     <option value="ru" ${OS.user.lang==='ru'?'selected':''}>Русский</option>
//                                     <option value="en" ${OS.user.lang==='en'?'selected':''}>English</option>
//                                     <option value="uk" ${OS.user.lang==='uk'?'selected':''}>Українська</option>
//                                 </select>
//                             </div>
//                             <div class="setting-group"><label>Страна / Город</label>
//                                 <div style="display:flex; gap:10px;">
//                                     <input type="text" class="setting-input" id="set-country" value="${OS.user.country}">
//                                     <input type="text" class="setting-input" id="set-city" value="${OS.user.city}">
//                                 </div>
//                                 <button class="setting-btn" id="save-geo" style="margin-top:10px;">Обновить погоду</button>
//                             </div>
//                         </div>
//                         <div id="set-system" class="settings-section">
//                             <h2>О системе</h2>
//                             <ul style="font-size:14px; line-height:2.2; list-style:none;">
//                                 <li><b>Выпуск:</b> Windows 12 Web Concept</li>
//                                 <li><b>Версия:</b> 26H2 (Финальная сборка)</li>
//                                 <li><b>Процессор:</b> Neural JS Core (Эмуляция)</li>
//                                 <li><b>ОЗУ:</b> 16.0 ГБ (доступно: 15.8 ГБ)</li>
//                             </ul>
//                             <button class="setting-btn" id="reset-os" style="background:#e81123; margin-top:30px;">Сбросить систему к заводским</button>
//                         </div>
//                     </div>
//                 </div>`
//         },
//         notepad: {
//             title: '<i class="bx bx-notepad"></i> Блокнот', width: 450, height: 350, icon: 'bx-notepad',
//             onOpen: (win, data) => { if(data?.text) win.querySelector('textarea').value = data.text; },
//             content: `<textarea style="width:100%;height:100%;resize:none;border:none;background:transparent;color:var(--text-color);padding:15px;outline:none;font-family:monospace;font-size:14px;"></textarea>`
//         },
//         calculator: {
//             title: '<i class="bx bx-calculator"></i> Калькулятор', width: 320, height: 460, icon: 'bx-calculator',
//             onOpen: (win) => {
//                 const disp = win.querySelector('#calc-disp');
//                 win.querySelectorAll('.calc-btn').forEach(b => {
//                     b.onclick = () => {
//                         const v = b.innerText;
//                         if(v === 'C') disp.innerText = '0';
//                         else if(v === '⌫') disp.innerText = disp.innerText.slice(0,-1) || '0';
//                         else if(v === '=') { try{ disp.innerText = eval(disp.innerText.replace('×','*').replace('÷','/')) } catch{ disp.innerText='Ошибка' } }
//                         else { disp.innerText = disp.innerText === '0' ? v : disp.innerText + v; }
//                     };
//                 });
//             },
//             content: `
//                 <div style="padding:15px; display:flex; flex-direction:column; height:100%;">
//                     <div class="calc-display" id="calc-disp">0</div>
//                     <div class="calc-grid">
//                         <button class="calc-btn">C</button><button class="calc-btn">÷</button><button class="calc-btn">×</button><button class="calc-btn">⌫</button>
//                         <button class="calc-btn">7</button><button class="calc-btn">8</button><button class="calc-btn">9</button><button class="calc-btn">-</button>
//                         <button class="calc-btn">4</button><button class="calc-btn">5</button><button class="calc-btn">6</button><button class="calc-btn">+</button>
//                         <button class="calc-btn">1</button><button class="calc-btn">2</button><button class="calc-btn">3</button><button class="calc-btn accent" style="grid-row:span 2">=</button>
//                         <button class="calc-btn" style="grid-column:span 2">0</button><button class="calc-btn">.</button>
//                     </div>
//                 </div>`
//         },
//         paint: {
//             title: '<i class="bx bx-paint"></i> Paint', width: 700, height: 500, icon: 'bx-paint',
//             onOpen: (win) => {
//                 const canvas = win.querySelector('#paint-canvas'), ctx = canvas.getContext('2d');
//                 ctx.fillStyle = '#ffffff'; ctx.fillRect(0,0,canvas.width,canvas.height);
//                 let painting = false;
//                 canvas.onmousedown = (e) => { painting = true; draw(e); };
//                 canvas.onmouseup = () => { painting = false; ctx.beginPath(); };
//                 canvas.onmousemove = draw;
//                 function draw(e) {
//                     if(!painting) return;
//                     const r = canvas.getBoundingClientRect();
//                     ctx.lineWidth = win.querySelector('#p-size').value; ctx.lineCap = 'round'; ctx.strokeStyle = win.querySelector('#p-color').value;
//                     ctx.lineTo(e.clientX - r.left, e.clientY - r.top); ctx.stroke();
//                     ctx.beginPath(); ctx.moveTo(e.clientX - r.left, e.clientY - r.top);
//                 }
//                 win.querySelector('#p-clear').onclick = () => { ctx.fillStyle = '#ffffff'; ctx.fillRect(0,0,canvas.width,canvas.height); };
//             },
//             content: `
//                 <div style="display:flex;flex-direction:column;height:100%;">
//                     <div class="paint-toolbar">
//                         <input type="color" id="p-color" value="#000000" title="Цвет" style="cursor:pointer; border:none; background:transparent;">
//                         <input type="range" id="p-size" min="1" max="20" value="5" title="Толщина">
//                         <button class="setting-btn" id="p-clear" style="padding: 6px 12px;">Очистить</button>
//                     </div>
//                     <div class="paint-canvas-container"><canvas id="paint-canvas" width="600" height="400"></canvas></div>
//                 </div>`
//         },
//         pdf_viewer: {
//             title: '<i class="bx bxs-file-pdf"></i> PDF Просмотр', width: 800, height: 600, icon: 'bxs-file-pdf',
//             onOpen: (win, data) => { if(data?.url) win.querySelector('iframe').src = data.url; },
//             content: `<iframe style="width:100%;height:100%;border:none;background:white;"></iframe>`
//         },
//         recycle_bin: {
//             title: '<i class="bx bx-trash"></i> Корзина', width: 650, height: 450, icon: 'bx-trash',
//             onOpen: (win) => renderExplorer(win, 'trash'),
//             content: `
//                 <div class="explorer-app">
//                     <div class="ex-address-bar">
//                         <button class="setting-btn" id="empty-bin" style="background:#e81123">Очистить корзину</button>
//                         <button class="setting-btn" id="restore-bin" style="margin-left:10px;">Восстановить всё</button>
//                     </div>
//                     <div class="ex-main" id="ex-view"></div>
//                 </div>`
//         }
//     };

//     // --- 3. Инициализация и Onboarding ---
//     function initOS() {
//         if (!OS.setupDone) {
//             DOM.setupScreen.classList.remove('hidden');
//             setupOnboarding();
//         } else {
//             applySettings(); renderDesktop(); renderStartMenu(); updateTaskbarApps(); fetchWeather();
//         }
//     }

//     function setupOnboarding() {
//         const avatars = document.querySelectorAll('.avatar-option');
//         avatars.forEach(av => av.onclick = () => {
//             avatars.forEach(a => a.classList.remove('selected'));
//             av.classList.add('selected');
//             OS.user.avatar = av.dataset.icon;
//         });

//         document.getElementById('auto-detect-geo').onclick = async () => {
//             try {
//                 const res = await fetch('https://ipapi.co/json/');
//                 const data = await res.json();
//                 document.getElementById('setup-country').value = data.country_name || '';
//                 document.getElementById('setup-city').value = data.city || '';
//                 OS.user.lat = data.latitude; OS.user.lon = data.longitude;
//             } catch (e) {}
//         };

//         document.getElementById('finish-setup').onclick = () => {
//             OS.user.name = document.getElementById('setup-name').value || 'Пользователь';
//             OS.user.country = document.getElementById('setup-country').value || 'Украина';
//             OS.user.city = document.getElementById('setup-city').value || 'Винница';
//             OS.user.lang = document.getElementById('setup-lang').value;
//             OS.setupDone = true;
//             saveState();
//             DOM.setupScreen.classList.add('hidden');
//             applySettings(); renderDesktop(); renderStartMenu(); updateTaskbarApps(); fetchWeather();
//         };
//     }

//     function applySettings() {
//         document.body.className = OS.settings.wallpaper;
//         document.documentElement.setAttribute('data-theme', OS.settings.theme);
//         document.documentElement.classList.toggle('glass-on', OS.settings.glass);
//         document.documentElement.classList.toggle('animations-on', OS.settings.anim);
//         document.documentElement.style.setProperty('--accent-color', OS.settings.accentColor);
//         document.documentElement.style.setProperty('--icon-size', OS.settings.iconSize === 'large' ? '96px' : OS.settings.iconSize === 'small' ? '48px' : '64px');
        
//         DOM.desktop.className = `desktop ${OS.settings.layout === 'grid' ? 'grid-layout' : ''} icon-size-${OS.settings.iconSize}`;
//         document.getElementById('start-username').innerText = OS.user.name;
//         document.getElementById('start-avatar').innerHTML = `<i class='bx ${OS.user.avatar}'></i>`;
//         document.getElementById('lang-toggle').innerText = OS.user.lang.toUpperCase();
//         if(OS.activated) DOM.watermark.classList.add('hidden');
//         else DOM.watermark.classList.remove('hidden');
//     }

//     // --- 4. Рабочий стол ---
//     function renderDesktop() {
//         DOM.desktop.innerHTML = '';
//         const desktopItems = OS.fileSystem.filter(i => i.parent === 'desktop');
        
//         desktopItems.forEach(item => {
//             const el = document.createElement('div');
//             el.className = 'desktop-icon';
//             el.innerHTML = `<i class='bx ${item.icon}'></i><span>${item.name}</span>`;
            
//             if (OS.settings.layout === 'free') {
//                 el.style.left = `${item.x}px`; el.style.top = `${item.y}px`;
//             } else {
//                 el.style.left = `${Math.round((item.x || 0) / cellSize) * cellSize}px`;
//                 el.style.top = `${Math.round((item.y || 0) / cellSize) * cellSize}px`;
//             }

//             el.ondblclick = () => {
//                 if (item.type === 'app') openWindow(item.app);
//                 else if (item.type === 'folder') openWindow('explorer', {path: item.id});
//                 else if (item.type === 'file') {
//                     if(item.name.endsWith('.txt')) openWindow('notepad', {text: item.content});
//                     if(item.name.endsWith('.pdf')) openWindow('pdf_viewer', {url: item.url});
//                 }
//             };

//             el.oncontextmenu = (e) => {
//                 e.preventDefault(); e.stopPropagation();
//                 if([1,2,3].includes(item.id)) return; 
//                 if(confirm(`Удалить "${item.name}" в корзину?`)) {
//                     item.parent = 'trash'; saveState(); renderDesktop();
//                 }
//             };

//             let isDragging = false, startX, startY, initX, initY;
//             el.onmousedown = (e) => {
//                 if (e.button !== 0) return;
//                 isDragging = true; startX = e.clientX; startY = e.clientY;
//                 initX = el.offsetLeft; initY = el.offsetTop;
//                 el.style.zIndex = 1000;
//             };
//             document.addEventListener('mousemove', (e) => {
//                 if (!isDragging) return;
//                 el.style.left = `${initX + (e.clientX - startX)}px`; el.style.top = `${initY + (e.clientY - startY)}px`;
//             });
//             document.addEventListener('mouseup', () => {
//                 if (isDragging) {
//                     isDragging = false; el.style.zIndex = 1;
//                     let finalX = el.offsetLeft, finalY = el.offsetTop;
//                     if (OS.settings.layout === 'grid') {
//                         finalX = Math.round(finalX / cellSize) * cellSize;
//                         finalY = Math.round(finalY / cellSize) * cellSize;
//                         el.style.left = `${finalX}px`; el.style.top = `${finalY}px`;
//                     }
//                     item.x = finalX; item.y = finalY; saveState();
//                 }
//             });

//             DOM.desktop.appendChild(el);
//         });
//     }

//     // --- 5. Оконный менеджер и Панель задач ---
//     function openWindow(appId, data = null) {
//         const app = appsConfig[appId];
//         if (!app) return;
//         const winId = `win-${Date.now()}`;

//         const win = document.createElement('div');
//         win.className = 'window'; win.id = winId;
//         win.style.width = `${app.width}px`; win.style.height = `${app.height}px`;
//         win.style.top = '60px'; win.style.left = '120px';
//         win.style.zIndex = ++OS.zIndexCounter;

//         win.innerHTML = `
//             <div class="window-header">
//                 <div class="window-title">${app.title}</div>
//                 <div class="window-controls">
//                     <button class="win-btn min"><i class='bx bx-minus'></i></button>
//                     <button class="win-btn max"><i class='bx bx-square'></i></button>
//                     <button class="win-btn close"><i class='bx bx-x'></i></button>
//                 </div>
//             </div>
//             <div class="window-content">${app.content}</div>`;

//         DOM.windowsContainer.appendChild(win);
//         if (app.onOpen) app.onOpen(win, data);

//         OS.openWindows.push({ id: winId, appId: appId, title: app.title.replace(/<[^>]*>?/gm, ''), icon: app.icon });
//         updateTaskbarApps();

//         win.querySelector('.close').onclick = () => {
//             win.remove(); OS.openWindows = OS.openWindows.filter(w => w.id !== winId); updateTaskbarApps();
//         };
//         win.querySelector('.max').onclick = () => win.classList.toggle('fullscreen');
//         win.querySelector('.min').onclick = () => { win.style.display = 'none'; updateTaskbarApps(); };
//         win.onmousedown = () => win.style.zIndex = ++OS.zIndexCounter;

//         const header = win.querySelector('.window-header');
//         let isDrag = false, sx, sy, ix, iy;
//         header.onmousedown = (e) => {
//             if (e.target.closest('.win-btn') || win.classList.contains('fullscreen')) return;
//             isDrag = true; sx = e.clientX; sy = e.clientY; ix = win.offsetLeft; iy = win.offsetTop;
//         };
//         document.addEventListener('mousemove', (e) => {
//             if (!isDrag) return;
//             win.style.left = `${ix + (e.clientX - sx)}px`; win.style.top = `${iy + (e.clientY - sy)}px`;
//         });
//         document.addEventListener('mouseup', () => isDrag = false);
//     }

//     function updateTaskbarApps() {
//         Array.from(DOM.taskbarApps.children).forEach(child => { if(child.id !== 'start-btn') child.remove(); });

//         const allIcons = new Set([...OS.pinnedApps, ...OS.openWindows.map(w => w.appId)]);
        
//         allIcons.forEach(appId => {
//             const conf = appsConfig[appId];
//             if(!conf) return;
//             const btn = document.createElement('button');
//             btn.className = `taskbar-app ${OS.pinnedApps.includes(appId) ? 'pinned' : ''}`;
            
//             const openWins = OS.openWindows.filter(w => w.appId === appId);
//             if(openWins.length > 0) btn.classList.add('active');

//             btn.innerHTML = `<i class='bx ${conf.icon}'></i>`;
//             btn.title = conf.title.replace(/<[^>]*>?/gm, '');
            
//             btn.draggable = true;
//             btn.ondragstart = e => e.dataTransfer.setData('text/plain', appId);
//             btn.ondragover = e => e.preventDefault();
//             btn.ondrop = e => {
//                 e.preventDefault();
//                 const dAppId = e.dataTransfer.getData('text/plain');
//                 if(dAppId !== appId && OS.pinnedApps.includes(dAppId) && OS.pinnedApps.includes(appId)) {
//                     const i1 = OS.pinnedApps.indexOf(dAppId);
//                     const i2 = OS.pinnedApps.indexOf(appId);
//                     [OS.pinnedApps[i1], OS.pinnedApps[i2]] = [OS.pinnedApps[i2], OS.pinnedApps[i1]];
//                     saveState(); updateTaskbarApps(); renderStartMenu();
//                 }
//             };

//             btn.onclick = () => {
//                 DOM.startMenu.classList.add('hidden');
//                 if(openWins.length === 0) { openWindow(appId); return; }
//                 const winEl = document.getElementById(openWins[0].id);
//                 if(winEl.style.display === 'none') { winEl.style.display = 'flex'; winEl.style.zIndex = ++OS.zIndexCounter; }
//                 else if (winEl.style.zIndex < OS.zIndexCounter) { winEl.style.zIndex = ++OS.zIndexCounter; }
//                 else { winEl.style.display = 'none'; updateTaskbarApps(); }
//             };

//             btn.oncontextmenu = (e) => {
//                 e.preventDefault();
//                 if(OS.pinnedApps.includes(appId)) OS.pinnedApps = OS.pinnedApps.filter(id => id !== appId);
//                 else OS.pinnedApps.push(appId);
//                 saveState(); updateTaskbarApps(); renderStartMenu();
//             };

//             DOM.taskbarApps.appendChild(btn);
//         });
//     }

//     // Меню Пуск (Рендер сетки закрепленных)
//     function renderStartMenu() {
//         DOM.startPinnedGrid.innerHTML = '';
//         OS.pinnedApps.forEach(appId => {
//             const conf = appsConfig[appId];
//             if(!conf) return;
//             DOM.startPinnedGrid.innerHTML += `<div class="start-app" onclick="document.getElementById('start-menu').classList.add('hidden'); openWindow('${appId}')"><i class='bx ${conf.icon}'></i><br>${conf.title.replace(/<[^>]*>?/gm, '')}</div>`;
//         });
//     }

//     DOM.startSearchInput.oninput = (e) => {
//         const val = e.target.value.toLowerCase();
//         if(!val) {
//             DOM.startPinnedSection.classList.remove('hidden');
//             DOM.startSearchSection.classList.add('hidden');
//             return;
//         }
        
//         DOM.startPinnedSection.classList.add('hidden');
//         DOM.startSearchSection.classList.remove('hidden');
//         DOM.startSearchResults.innerHTML = '';
        
//         const foundApps = Object.keys(appsConfig).filter(k => appsConfig[k].title.toLowerCase().includes(val));
//         const foundFiles = OS.fileSystem.filter(f => f.name.toLowerCase().includes(val));

//         foundApps.forEach(k => {
//             DOM.startSearchResults.innerHTML += `<div class="start-app" onclick="document.getElementById('start-menu').classList.add('hidden'); openWindow('${k}')"><i class='bx ${appsConfig[k].icon}'></i><br>${appsConfig[k].title.replace(/<[^>]*>?/gm, '')}</div>`;
//         });
//         foundFiles.forEach(f => {
//             DOM.startSearchResults.innerHTML += `<div class="start-app"><i class='bx ${f.icon}'></i><br>${f.name}</div>`;
//         });
//     };

//     // --- 6. Проводник и Корзина ---
//     function renderExplorer(win, currentPath) {
//         const view = win.querySelector('#ex-view');
//         if(!view) return; 
//         const pathInput = win.querySelector('#ex-path');
//         if(pathInput) pathInput.value = `C:/${currentPath === 'root' ? '' : currentPath}`;

//         view.innerHTML = '';
//         const items = OS.fileSystem.filter(i => i.parent === currentPath);
        
//         if(currentPath === 'trash' && items.length === 0) view.innerHTML = '<p style="padding:20px; opacity:0.6;">Корзина пуста</p>';

//         items.forEach(item => {
//             const el = document.createElement('div');
//             el.className = 'ex-item';
//             el.innerHTML = `<i class='bx ${item.icon}'></i><br>${item.name}`;
//             el.ondblclick = () => {
//                 if(currentPath === 'trash') { alert('Восстановите элемент, чтобы открыть его.'); return; }
//                 if (item.type === 'folder') renderExplorer(win, item.id);
//                 else if (item.type === 'app') openWindow(item.app);
//                 else if (item.type === 'file') {
//                     if(item.name.endsWith('.txt')) openWindow('notepad', {text: item.content});
//                     if(item.name.endsWith('.pdf')) openWindow('pdf_viewer', {url: item.url});
//                 }
//             };
//             view.appendChild(el);
//         });

//         win.querySelectorAll('.ex-sidebar div[data-path]').forEach(sb => {
//             sb.onclick = () => renderExplorer(win, sb.dataset.path);
//         });
        
//         const upBtn = win.querySelector('#ex-up');
//         if(upBtn) {
//             upBtn.onclick = () => {
//                 const currentFolder = OS.fileSystem.find(i => i.id === currentPath);
//                 if(currentFolder && currentFolder.parent !== 'root') renderExplorer(win, currentFolder.parent);
//             };
//         }

//         const upFile = win.querySelector('#ex-upload');
//         if(upFile) {
//             upFile.onclick = () => {
//                 const input = document.getElementById('global-file-upload');
//                 input.onchange = (e) => {
//                     const file = e.target.files[0];
//                     if(!file) return;
//                     if (file.type === 'text/plain') {
//                         const reader = new FileReader();
//                         reader.onload = (ev) => {
//                             OS.fileSystem.push({ id: Date.now(), parent: currentPath, name: file.name, type: 'file', icon: 'bx-file', content: ev.target.result });
//                             saveState(); renderExplorer(win, currentPath); renderDesktop();
//                         };
//                         reader.readAsText(file);
//                     } else if (file.type === 'application/pdf') {
//                         OS.fileSystem.push({ id: Date.now(), parent: currentPath, name: file.name, type: 'file', icon: 'bxs-file-pdf', url: URL.createObjectURL(file) });
//                         saveState(); renderExplorer(win, currentPath); renderDesktop();
//                     } else alert('Поддерживаются только .txt и .pdf файлы.');
//                 };
//                 input.click();
//             };
//         }
        
//         // Корзина 
//         const emptyBtn = win.querySelector('#empty-bin');
//         if(emptyBtn) emptyBtn.onclick = () => { OS.fileSystem = OS.fileSystem.filter(i => i.parent !== 'trash'); saveState(); renderExplorer(win, 'trash'); };
//         const restoreBtn = win.querySelector('#restore-bin');
//         if(restoreBtn) restoreBtn.onclick = () => { OS.fileSystem.forEach(i => { if(i.parent === 'trash') i.parent = 'desktop'; }); saveState(); renderExplorer(win, 'trash'); renderDesktop(); };
//     }

//     // --- 7. Контекстное меню Рабочего стола ---
//     DOM.desktop.oncontextmenu = (e) => {
//         if (e.target !== DOM.desktop) return;
//         e.preventDefault();
//         DOM.contextMenu.style.left = `${e.pageX}px`; DOM.contextMenu.style.top = `${e.pageY}px`;
//         DOM.contextMenu.classList.remove('hidden');

//         document.querySelectorAll('.ctx-check').forEach(c => c.classList.add('hidden'));
//         document.getElementById(`ctx-view-${OS.settings.iconSize}`).querySelector('.ctx-check').classList.remove('hidden');
//         document.getElementById(`ctx-view-${OS.settings.layout}`).querySelector('.ctx-check').classList.remove('hidden');
//     };

//     document.onclick = (e) => { 
//         if(!DOM.contextMenu.contains(e.target)) DOM.contextMenu.classList.add('hidden'); 
//         if(!DOM.startMenu.contains(e.target) && !e.target.closest('#start-btn')) DOM.startMenu.classList.add('hidden');
//     };

//     const closeCtx = () => DOM.contextMenu.classList.add('hidden');
//     document.getElementById('ctx-view-large').onclick = () => { OS.settings.iconSize = 'large'; saveState(); applySettings(); closeCtx(); };
//     document.getElementById('ctx-view-medium').onclick = () => { OS.settings.iconSize = 'medium'; saveState(); applySettings(); closeCtx(); };
//     document.getElementById('ctx-view-small').onclick = () => { OS.settings.iconSize = 'small'; saveState(); applySettings(); closeCtx(); };
//     document.getElementById('ctx-view-grid').onclick = () => { OS.settings.layout = 'grid'; saveState(); applySettings(); renderDesktop(); closeCtx(); };
//     document.getElementById('ctx-view-free').onclick = () => { OS.settings.layout = 'free'; saveState(); applySettings(); renderDesktop(); closeCtx(); };

//     document.getElementById('ctx-new-folder').onclick = () => {
//         OS.fileSystem.push({ id: `f-${Date.now()}`, parent: 'desktop', name: 'Новая папка', type: 'folder', icon: 'bx-folder', x: 200, y: 200 });
//         saveState(); renderDesktop(); closeCtx();
//     };
//     document.getElementById('ctx-new-txt').onclick = () => {
//         OS.fileSystem.push({ id: `t-${Date.now()}`, parent: 'desktop', name: 'Новый документ.txt', type: 'file', icon: 'bx-file-blank', content: '', x: 200, y: 300 });
//         saveState(); renderDesktop(); closeCtx();
//     };
//     document.getElementById('ctx-personalize').onclick = () => { openWindow('settings'); closeCtx(); };

//     // --- 8. Настройки, Виджеты и Система ---
//     function setupSettingsLogic(win) {
//         win.querySelector('#wall-sel').value = OS.settings.wallpaper;
//         win.querySelector('#wall-sel').onchange = (e) => { OS.settings.wallpaper = e.target.value; saveState(); applySettings(); };
//         win.querySelector('#theme-sel').value = OS.settings.theme;
//         win.querySelector('#theme-sel').onchange = (e) => { OS.settings.theme = e.target.value; saveState(); applySettings(); };
//         win.querySelector('#accent-color').onchange = (e) => { OS.settings.accentColor = e.target.value; saveState(); applySettings(); };
//         win.querySelector('#toggle-glass').onchange = (e) => { OS.settings.glass = e.target.checked; saveState(); applySettings(); };
//         win.querySelector('#toggle-anim').onchange = (e) => { OS.settings.anim = e.target.checked; saveState(); applySettings(); };
        
//         win.querySelector('#lang-sel').onchange = (e) => { OS.user.lang = e.target.value; saveState(); applySettings(); };
//         win.querySelector('#save-geo').onclick = () => { OS.user.country = win.querySelector('#set-country').value; OS.user.city = win.querySelector('#set-city').value; saveState(); fetchWeather(); };
        
//         win.querySelector('#save-acc').onclick = () => { OS.user.name = win.querySelector('#acc-name').value; saveState(); applySettings(); };
        
//         const actBtn = win.querySelector('#activate-btn');
//         actBtn.onclick = () => { OS.activated = true; saveState(); applySettings(); actBtn.disabled = true; actBtn.innerText = "Уже активировано"; win.querySelector('#act-status').innerText = "Активирована надёжно"; win.querySelector('#act-status').style.color = "#107C10"; };
        
//         win.querySelector('#reset-os').onclick = () => { if(confirm("Сбросить всё? Данные будут удалены.")) { localStorage.removeItem('win12_state_v2'); location.reload(); }};

//         win.querySelectorAll('.settings-tab').forEach(tab => {
//             tab.onclick = () => {
//                 win.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
//                 win.querySelectorAll('.settings-section').forEach(s => s.classList.remove('active'));
//                 tab.classList.add('active');
//                 win.querySelector(`#${tab.dataset.target}`).classList.add('active');
//             };
//         });
//     }

//     setInterval(() => {
//         const now = new Date();
//         document.getElementById('time').innerText = now.toLocaleTimeString(OS.user.lang==='en'?'en-US':'ru-RU', { hour: '2-digit', minute: '2-digit' });
//         document.getElementById('date').innerText = now.toLocaleDateString(OS.user.lang==='en'?'en-US':'ru-RU');
//     }, 1000);

//     document.getElementById('clock-widget').onclick = () => {
//         DOM.calendar.classList.toggle('hidden'); renderCalendar();
//     };

//     function renderCalendar() {
//         const now = new Date();
//         document.getElementById('cal-month-year').innerText = now.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });
//         const grid = document.getElementById('cal-grid'); grid.innerHTML = '';
//         const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
//         const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay() || 7;
//         for(let i = 1; i < firstDay; i++) grid.innerHTML += `<div></div>`;
//         for(let i = 1; i <= daysInMonth; i++) {
//             grid.innerHTML += `<div class="cal-day ${i === now.getDate() ? 'today' : ''}">${i}</div>`;
//         }
//     }

//     async function fetchWeather() {
//         const ww = document.getElementById('weather-widget');
//         try {
//             const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${OS.user.lat}&longitude=${OS.user.lon}&current_weather=true`);
//             const data = await res.json();
//             ww.innerHTML = `<i class='bx bx-cloud'></i> <span>${data.current_weather.temperature}°C, ${OS.user.city}</span>`;
//         } catch(e) {
//             ww.innerHTML = `<i class='bx bx-cloud'></i> <span>--°C, ${OS.user.city}</span>`;
//         }
//     }

//     document.getElementById('start-btn').onclick = (e) => { e.stopPropagation(); DOM.startMenu.classList.toggle('hidden'); };
//     document.getElementById('lang-toggle').onclick = (e) => {
//         const langs = ['РУС', 'ENG', 'УКР'];
//         const valMaps = ['ru', 'en', 'uk'];
//         const currentIdx = langs.indexOf(e.target.innerText);
//         const nextIdx = (currentIdx + 1) % langs.length;
//         e.target.innerText = langs[nextIdx];
//         OS.user.lang = valMaps[nextIdx]; saveState(); applySettings();
//     };

//     initOS();
// });