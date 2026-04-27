const scheduleData = {
    // Тиждень 1 (Верхній)
    1: {
        1: [ // Понеділок
            { num: 5, start: "11:35", end: "12:10", subj: "Метрол. оцінювання ПЗ", type: "LK", room: "12 Зал", teacher: "Дудатьєв І.А." },
            { num: 6, start: "12:25", end: "13:00", subj: "Метрол. оцінювання ПЗ", type: "LK", room: "12 Зал", teacher: "Дудатьєв І.А." }
        ],
        2: [ // Вівторок
            { num: 2, start: "09:05", end: "09:40", subj: "Політ. історія України", type: "LK", room: "12 Зал", teacher: "Пономаренко А.Б." },
            { num: 3, start: "09:55", end: "10:30", subj: "Фізична культура", type: "PZ", room: "Спортзал", teacher: "Тихонова С.В." },
            { num: 4, start: "10:45", end: "11:20", subj: "Фізична культура", type: "PZ", room: "Спортзал", teacher: "Тихонова С.В." },
            { num: 5, start: "11:35", end: "12:10", subj: "Теор. ймов. та мат. стат.", type: "LK", room: "2248", teacher: "Ракитянська Г.Б." },
            { num: 6, start: "12:25", end: "13:00", subj: "Теор. ймов. та мат. стат.", type: "LK", room: "2248", teacher: "Ракитянська Г.Б." },
            { num: 7, start: "13:20", end: "13:55", subj: "Теор. ймов. та мат. стат.", type: "PZ", room: "2248", teacher: "Ракитянська Г.Б." }
        ],
        3: [ // Середа
            { num: 1, start: "08:15", end: "08:50", subj: "Графічні редактори", type: "PZ", room: "2247A", teacher: "Чехместрук Р.Ю." },
            { num: 2, start: "09:05", end: "09:40", subj: "Архітектура та проект. ПЗ", type: "LK", room: "2247A", teacher: "Бабюк Н.П." },
            { num: 3, start: "09:55", end: "10:30", subj: "Графічні редактори", type: "LK", room: "1318", teacher: "Чехместрук Р.Ю." },
            { num: 4, start: "10:45", end: "11:20", subj: "Графічні редактори", type: "LK", room: "1318", teacher: "Чехместрук Р.Ю." },
            { num: 5, start: "11:35", end: "12:10", subj: "Графічні редактори", type: "PZ", room: "1318", teacher: "Чехместрук Р.Ю." },
            { num: 6, start: "12:25", end: "13:00", subj: "Архітектура та проект. ПЗ", type: "PZ", room: "2247A", teacher: "Бабюк Н.П." }
        ],
        4: [ // Четвер
            { num: 1, start: "08:15", end: "08:50", subj: "Політ. історія України", type: "PZ", room: "2257", teacher: "Пономаренко А.Б." },
            { num: 2, start: "09:05", end: "09:40", subj: "Теор. ймов. та мат. стат.", type: "LK", room: "2248", teacher: "Ракитянська Г.Б." },
            { num: 3, start: "09:55", end: "10:30", subj: "Арх. та проект. ПЗ", type: "LR", room: "2110", teacher: "Барчук Н.Є.", subgroup: 1 },
            { num: 3, start: "09:55", end: "10:30", subj: "Метрол. оцінювання", type: "LR", room: "1310", teacher: "Дудатьєв І.А.", subgroup: 2 },
            { num: 4, start: "10:45", end: "11:20", subj: "Арх. та проект. ПЗ", type: "LR", room: "2110", teacher: "Барчук Н.Є.", subgroup: 1 },
            { num: 4, start: "10:45", end: "11:20", subj: "Метрол. оцінювання", type: "LR", room: "1310", teacher: "Дудатьєв І.А.", subgroup: 2 },
            { num: 5, start: "11:35", end: "12:10", subj: "Теор. ймов. та мат. стат.", type: "LR", room: "2210", teacher: "Васильківський М.В.", subgroup: 1 },
            { num: 5, start: "11:35", end: "12:10", subj: "Іноземна мова", type: "PZ", room: "3425", teacher: "Чопик В.В.", subgroup: 2 },
            { num: 6, start: "12:25", end: "13:00", subj: "Теор. ймов. та мат. стат.", type: "LR", room: "2210", teacher: "Васильківський М.В.", subgroup: 1 },
            { num: 6, start: "12:25", end: "13:00", subj: "Іноземна мова", type: "PZ", room: "3425", teacher: "Чопик В.В.", subgroup: 2 },
            { num: 7, start: "13:20", end: "13:55", subj: "Основи прогр. інженерії", type: "LR", room: "2108", teacher: "Денисюк А.В.", subgroup: 1 },
            { num: 8, start: "14:05", end: "14:40", subj: "Основи прогр. інженерії", type: "LR", room: "2108", teacher: "Денисюк А.В.", subgroup: 1 }
        ],
        5: [ // П'ятниця
            { num: 2, start: "09:05", end: "09:40", subj: "Основи прогр. інженерії", type: "LK", room: "2247A", teacher: "Коваленко О.О." },
            { num: 3, start: "09:55", end: "10:30", subj: "Основи прогр. інженерії", type: "LK", room: "2247A", teacher: "Коваленко О.О." },
            { num: 4, start: "10:45", end: "11:20", subj: "Основи прогр. інженерії", type: "LK", room: "2247A", teacher: "Коваленко О.О." },
            { num: 5, start: "11:35", end: "12:10", subj: "Іноземна мова", type: "PZ", room: "3317", teacher: "Кухарчук Г.В.", subgroup: 1 },
            { num: 5, start: "11:35", end: "12:10", subj: "Теор. ймов.", type: "LR", room: "2320", teacher: "Васильківський", subgroup: 2 },
            { num: 6, start: "12:25", end: "13:00", subj: "Іноземна мова", type: "PZ", room: "3317", teacher: "Кухарчук Г.В.", subgroup: 1 },
            { num: 6, start: "12:25", end: "13:00", subj: "Теор. ймов.", type: "LR", room: "2320", teacher: "Васильківський", subgroup: 2 },
            { num: 7, start: "13:20", end: "13:55", subj: "Арх. та проект. ПЗ", type: "LR", room: "2110", teacher: "Барчук Н.Є.", subgroup: 1 }
        ]
    },
    // Тиждень 2 (Нижній)
    2: {
        1: [ // Понеділок
            { num: 1, start: "08:15", end: "08:50", subj: "БЗВП", type: "PZ", room: "", teacher: "" },
            { num: 2, start: "09:05", end: "09:40", subj: "БЗВП", type: "PZ", room: "", teacher: "" },
            { num: 3, start: "09:55", end: "10:30", subj: "БЗВП", type: "PZ", room: "", teacher: "" },
            { num: 4, start: "10:45", end: "11:20", subj: "БЗВП", type: "PZ", room: "", teacher: "" },
            { num: 5, start: "11:35", end: "12:10", subj: "Метрол. оцінювання ПЗ", type: "LK", room: "12 Зал", teacher: "Дудатьєв І.А." }
        ],
        2: [ // Вівторок
            { num: 2, start: "09:05", end: "09:40", subj: "Політ. історія України", type: "LK", room: "12 Зал", teacher: "Пономаренко А.Б." },
            { num: 3, start: "09:55", end: "10:30", subj: "Фізична культура", type: "PZ", room: "Спортзал", teacher: "Тихонова С.В." },
            { num: 4, start: "10:45", end: "11:20", subj: "Фізична культура", type: "PZ", room: "Спортзал", teacher: "Тихонова С.В." },
            { num: 5, start: "11:35", end: "12:10", subj: "Теор. ймов. та мат. стат.", type: "LK", room: "2248", teacher: "Ракитянська Г.Б." },
            { num: 6, start: "12:25", end: "13:00", subj: "Теор. ймов. та мат. стат.", type: "LK", room: "2248", teacher: "Ракитянська Г.Б." },
            { num: 7, start: "13:20", end: "13:55", subj: "Теор. ймов. та мат. стат.", type: "PZ", room: "2248", teacher: "Ракитянська Г.Б." }
        ],
        3: [ // Середа
            { num: 1, start: "08:15", end: "08:50", subj: "Архітектура та проект. ПЗ", type: "LK", room: "2247A", teacher: "Бабюк Н.П." },
            { num: 2, start: "09:05", end: "09:40", subj: "Архітектура та проект. ПЗ", type: "LK", room: "2247A", teacher: "Бабюк Н.П." },
            { num: 3, start: "09:55", end: "10:30", subj: "Графічні редактори", type: "LK", room: "1318", teacher: "Чехместрук Р.Ю." },
            { num: 4, start: "10:45", end: "11:20", subj: "Графічні редактори", type: "LK", room: "1318", teacher: "Чехместрук Р.Ю." },
            { num: 5, start: "11:35", end: "12:10", subj: "Графічні редактори", type: "PZ", room: "1318", teacher: "Чехместрук Р.Ю." },
            { num: 6, start: "12:25", end: "13:00", subj: "Архітектура та проект. ПЗ", type: "PZ", room: "2247A", teacher: "Бабюк Н.П." }
        ],
        4: [ // Четвер
            { num: 1, start: "08:15", end: "08:50", subj: "Політ. історія України", type: "PZ", room: "2257", teacher: "Пономаренко А.Б." },
            { num: 2, start: "09:05", end: "09:40", subj: "Теор. ймов. та мат. стат.", type: "LK", room: "2248", teacher: "Ракитянська Г.Б." },
            { num: 3, start: "09:55", end: "10:30", subj: "Метрол. оцінювання", type: "LR", room: "1310", teacher: "Дудатьєв І.А.", subgroup: 1 },
            { num: 3, start: "09:55", end: "10:30", subj: "Арх. та проект. ПЗ", type: "LR", room: "2110", teacher: "Барчук Н.Є.", subgroup: 2 },
            { num: 4, start: "10:45", end: "11:20", subj: "Метрол. оцінювання", type: "LR", room: "1310", teacher: "Дудатьєв І.А.", subgroup: 1 },
            { num: 4, start: "10:45", end: "11:20", subj: "Арх. та проект. ПЗ", type: "LR", room: "2110", teacher: "Барчук Н.Є.", subgroup: 2 },
            { num: 5, start: "11:35", end: "12:10", subj: "Теор. ймов. та мат. стат.", type: "LR", room: "2110", teacher: "Васильківський М.В.", subgroup: 1 },
            { num: 5, start: "11:35", end: "12:10", subj: "Іноземна мова", type: "PZ", room: "3317", teacher: "Кухарчук Г.В.", subgroup: 2 },
            { num: 6, start: "12:25", end: "13:00", subj: "Теор. ймов. та мат. стат.", type: "LR", room: "2110", teacher: "Васильківський М.В.", subgroup: 1 },
            { num: 6, start: "12:25", end: "13:00", subj: "Іноземна мова", type: "PZ", room: "3317", teacher: "Кухарчук Г.В.", subgroup: 2 },
            { num: 7, start: "13:20", end: "13:55", subj: "Основи прогр. інженерії", type: "LR", room: "2108", teacher: "Денисюк А.В.", subgroup: 2 },
            { num: 8, start: "14:05", end: "14:40", subj: "Основи прогр. інженерії", type: "LR", room: "2108", teacher: "Денисюк А.В.", subgroup: 2 }
        ],
        5: [ // П'ятниця
            { num: 2, start: "09:05", end: "09:40", subj: "Основи прогр. інженерії", type: "LK", room: "2247A", teacher: "Коваленко О.О." },
            { num: 3, start: "09:55", end: "10:30", subj: "Основи прогр. інженерії", type: "LK", room: "2247A", teacher: "Коваленко О.О." },
            { num: 4, start: "10:45", end: "11:20", subj: "Основи прогр. інженерії", type: "LK", room: "2247A", teacher: "Коваленко О.О." },
            { num: 5, start: "11:35", end: "12:10", subj: "Іноземна мова", type: "PZ", room: "3317", teacher: "Кухарчук Г.В.", subgroup: 1 },
            { num: 5, start: "11:35", end: "12:10", subj: "Теор. ймов.", type: "LR", room: "2320", teacher: "Васильківський", subgroup: 2 },
            { num: 6, start: "12:25", end: "13:00", subj: "Іноземна мова", type: "PZ", room: "3317", teacher: "Кухарчук Г.В.", subgroup: 1 },
            { num: 6, start: "12:25", end: "13:00", subj: "Теор. ймов.", type: "LR", room: "2320", teacher: "Васильківський", subgroup: 2 },
            { num: 7, start: "13:20", end: "13:55", subj: "Арх. та проект. ПЗ", type: "LR", room: "2110", teacher: "Барчук Н.Є.", subgroup: 2 }
        ]
    }
};

const dateOverrides = {
    // Скасування пар через стажування Коваленко О.О.
    "2026-03-06": { remove: [2, 3, 4] },
    "2026-03-13": { remove: [2, 3, 4] },
    "2026-03-20": { remove: [2, 3, 4] },

    // Скасування пар через хворобу Денисюк А.В.
    "2026-04-02": { remove: [7, 8] },
    "2026-04-09": { remove: [7, 8] },

    // Скасування пар через "День ВНТУ" 66 років
    "2026-04-22": { remove: [3, 4, 5, 6], },

    // EX = Відпрацювання (СПЕЦ), KOL = Колоквіум
    "2026-03-25": { add: [{ num: 8, start: "14:05", end: "14:40", subj: "Основи прогр. інженерії (Відпр.)", type: "EX", room: "2247", teacher: "Коваленко О.О." }] },
    "2026-03-27": { add: [{ num: 8, start: "14:05", end: "14:40", subj: "Основи прогр. інженерії (Відпр.)", type: "EX", room: "2247", teacher: "Коваленко О.О." }] },
    "2026-03-30": { add: [{ num: 8, start: "15:30", end: "16:15", subj: "Основи прогр. інженерії (Відпр.)", type: "EX", room: "2247", teacher: "Коваленко О.О." }] },
    "2026-04-01": { 
        remove: [1], 
        add: [
            { num: 1, start: "08:15", end: "09:00", subj: "Графічні редактори (Кол.)", type: "KOL", room: "2247A", teacher: "Чехместрук Р.Ю." },
            { num: 8, start: "15:30", end: "16:15", subj: "Основи прогр. інженерії (Відпр.)", type: "EX", room: "2247", teacher: "Коваленко О.О." }
        ] 
    },
    "2026-04-03": { add: [{ num: 8, start: "15:30", end: "16:15", subj: "Основи прогр. інженерії (Відпр.)", type: "EX", room: "2247", teacher: "Коваленко О.О." }] },
    "2026-04-06": { add: [{ num: 8, start: "15:30", end: "16:15", subj: "Основи прогр. інженерії (Відпр.)", type: "EX", room: "2247", teacher: "Коваленко О.О." }] },
    "2026-04-08": { 
        remove: [1, 2, 6], 
        add: [
            { num: 1, start: "08:15", end: "09:00", subj: "Архітектура та проект. ПЗ (Кол.)", type: "KOL", room: "2247A", teacher: "Бабюк Н.П." },
            { num: 2, start: "09:15", end: "10:00", subj: "Архітектура та проект. ПЗ (Кол.)", type: "KOL", room: "2247A", teacher: "Бабюк Н.П." },
            { num: 6, start: "13:15", end: "14:00", subj: "Архітектура та проект. ПЗ (Кол.)", type: "KOL", room: "2247A", teacher: "Бабюк Н.П." },
            { num: 8, start: "15:30", end: "16:15", subj: "Основи прогр. інженерії (Відпр.)", type: "EX", room: "2247", teacher: "Коваленко О.О." }
        ] 
    },
    "2026-04-10": { 
        remove: [2, 3],
        add: [
            { num: 2, start: "09:15", end: "10:00", subj: "Основи прогр. інженерії (Кол.)", type: "KOL", room: "2247A", teacher: "Коваленко О.О." },
            { num: 3, start: "10:15", end: "11:00", subj: "Основи прогр. інженерії (Кол.)", type: "KOL", room: "2247A", teacher: "Коваленко О.О." },
            { num: 8, start: "15:30", end: "16:15", subj: "Основи прогр. інженерії (Кол.)", type: "KOL", room: "Онлайн", teacher: "Коваленко О.О." }
        ] 
    },
    "2026-04-13": { 
        remove: [5, 6],
        add: [{ num: 8, start: "15:30", end: "16:15", subj: "Основи прогр. інженерії (Відпр.)", type: "EX", room: "2247", teacher: "Коваленко О.О." }] 
    },
    "2026-04-20": { 
        remove: [5], 
        add: [
            { num: 5, start: "12:15", end: "13:00", subj: "Метрол. оцінювання ПЗ (Кол.)", type: "KOL", room: "12 Зал", teacher: "Дудатьєв І.А." }
        ] 
    },
    "2026-04-27": {
        remove: [7],
        add: [
            { num: 7, start: "14:00", end: "15:00", subj: "Основи прогр. інженерії (Відпр.)", type: "EX", room: "2108", teacher: "Денисюк А.В." },
            // { num: 8, start: "15:25", end: "16:10", subj: "Основи прогр. інженерії (Відпр.)", type: "EX", room: "2108", teacher: "Денисюк А.В." }
        ] 
    },
    "2026-05-11": {
        add: [
            { num: 7, start: "14:30", end: "15:15", subj: "ОПІ, лабор (Відпр.)", type: "EX", room: "2105", teacher: "Денисюк А.В.", subgroup: 1 },
            { num: 8, start: "15:25", end: "16:10", subj: "ОПІ, лабор (Відпр.)", type: "EX", room: "2105", teacher: "Денисюк А.В.", subgroup: 1 }
        ]
    },

    // --- РОЗКЛАД СЕСІЇ (08.06 - 19.06) ---
    "2026-06-08": { add: [{ num: 3, start: "10:00", end: "11:20", subj: "Архітектура та проект. ПЗ", type: "CONS", room: "Уточнюється", teacher: "Бабюк Н.П." }] },
    "2026-06-09": { add: [{ num: 3, start: "10:00", end: "11:20", subj: "Архітектура та проект. ПЗ", type: "EXAM", room: "Уточнюється", teacher: "Бабюк Н.П." }] },
    "2026-06-10": { add: [{ num: 3, start: "10:00", end: "11:20", subj: "Основи прогр. інженерії", type: "CONS", room: "Уточнюється", teacher: "Коваленко О.О." }] },
    "2026-06-11": { add: [{ num: 3, start: "10:00", end: "11:20", subj: "Основи прогр. інженерії", type: "EXAM", room: "Уточнюється", teacher: "Коваленко О.О." }] },
    "2026-06-12": { add: [{ num: 3, start: "10:00", end: "11:20", subj: "Навчальна практика", type: "ZALIK", room: "Уточнюється", teacher: "Романюк О.В." }] },
    "2026-06-13": { add: [{ num: 3, start: "10:00", end: "11:20", subj: "Теор. ймов. та мат. стат.", type: "CONS", room: "Уточнюється", teacher: "Ракитянська Г.Б." }] },
    "2026-06-14": { add: [{ num: 3, start: "10:00", end: "11:20", subj: "Теор. ймов. та мат. стат.", type: "EXAM", room: "Уточнюється", teacher: "Ракитянська Г.Б." }] },
    "2026-06-15": { add: [{ num: 3, start: "10:00", end: "11:20", subj: "Метрол. оцінювання ПЗ", type: "CONS", room: "Уточнюється", teacher: "Дудатьєв І.А." }] },
    "2026-06-16": { add: [{ num: 3, start: "10:00", end: "11:20", subj: "Метрол. оцінювання ПЗ", type: "EXAM", room: "Уточнюється", teacher: "Дудатьєв І.А." }] },
    "2026-06-17": { add: [{ num: 3, start: "10:00", end: "11:20", subj: "Графічні редактори", type: "ZALIK", room: "Уточнюється", teacher: "Чехместрук Р.Ю." }] },
    "2026-06-18": { add: [{ num: 3, start: "10:00", end: "11:20", subj: "Політ. історія України ХХ ст.", type: "ZALIK", room: "Уточнюється", teacher: "Пономаренко А.Б." }] },
    "2026-06-19": { add: [
        { num: 3, start: "10:00", end: "11:20", subj: "Іноземна мова", type: "ZALIK", room: "Уточнюється", teacher: "Кухарчук Г.В.", subgroup: 1 },
        { num: 3, start: "10:00", end: "11:20", subj: "Іноземна мова", type: "ZALIK", room: "Уточнюється", teacher: "Чопляк В.В.", subgroup: 2 }
    ] },
};

let viewDate = new Date(); 
let selectedDay = new Date().getDay();
if (selectedDay === 0) selectedDay = 7;

let currentSettings = {
    group: '5pi-24b',
    subgroup: 1
};

const savedSettings = localStorage.getItem('scheduleSettings');
if (savedSettings) {
    currentSettings = JSON.parse(savedSettings);
    document.getElementById('subgroup-select').value = currentSettings.subgroup;
}

document.getElementById('subgroup-select').addEventListener('change', (e) => {
    currentSettings.subgroup = parseInt(e.target.value);
    localStorage.setItem('scheduleSettings', JSON.stringify(currentSettings));
    renderSchedule();
    updateStatus();
});

function getWeekType(date) {
    const startSemester = new Date('2026-02-02T00:00:00');
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

function applyTimeOverrides(lessons, targetDate) {
    const cutoffDate = new Date('2026-03-30T00:00:00');
    const compareDate = new Date(targetDate);
    compareDate.setHours(0,0,0,0);
    
    if (compareDate >= cutoffDate) {
        const newTimes = {
            1: { start: "08:15", end: "09:00" },
            2: { start: "09:15", end: "10:00" },
            3: { start: "10:15", end: "11:00" },
            4: { start: "11:15", end: "12:00" },
            5: { start: "12:15", end: "13:00" },
            6: { start: "13:15", end: "14:00" },
            7: { start: "14:30", end: "15:15" },
            8: { start: "15:25", end: "16:10" },
            9: { start: "16:20", end: "17:05" },
            10: { start: "17:15", end: "18:00" },
            11: { start: "18:10", end: "18:55" },
            12: { start: "19:05", end: "19:50" },
            13: { start: "20:00", end: "20:45" },
            14: { start: "20:55", end: "21:40" }
        };
        lessons.forEach(l => {
            if(newTimes[l.num] && !['EXAM', 'CONS', 'ZALIK'].includes(l.type)) {
                l.start = newTimes[l.num].start;
                l.end = newTimes[l.num].end;
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
    injectStyles();
    initSwipeGestures();
    updateDateDisplay();
    renderTabs();
    renderSchedule();
    updateStatus();
    setInterval(updateStatus, 1000);
}

function initSwipeGestures() {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, {passive: true});

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 60) {
            if (diffX < 0) navigateDay(1);
            else navigateDay(-1);
        }
    }
}

function animateScheduleChange(updateStateCallback, direction) {
    const container = document.getElementById('schedule-container');
    if (!container) {
        updateStateCallback();
        return;
    }
    const outClass = direction === 1 ? 'slide-out-left' : 'slide-out-right';
    const inClass = direction === 1 ? 'slide-in-right' : 'slide-in-left';

    container.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
    container.classList.add(outClass);

    setTimeout(() => {
        updateStateCallback(); 
        container.classList.remove(outClass);
        container.classList.add(inClass);
        setTimeout(() => container.classList.remove(inClass), 250);
    }, 250);
}

function navigateDay(direction) {
    let newDay = selectedDay + direction;
    let weekOffset = 0;
    
    if (newDay > 7) { 
        weekOffset = 1;
        newDay = 1;
    } else if (newDay < 1) { 
        weekOffset = -1;
        newDay = 7;
    }

    animateScheduleChange(() => {
        if (weekOffset !== 0) {
            viewDate.setDate(viewDate.getDate() + (weekOffset * 7));
            checkIfTodayView();
        }
        selectedDay = newDay;
        renderTabs();
        updateDateDisplay();
        renderSchedule();
        updateStatus();
    }, direction);
}

function selectDay(dayIndex) {
    if (dayIndex === selectedDay) return;
    const direction = dayIndex > selectedDay ? 1 : -1;
    
    animateScheduleChange(() => {
        selectedDay = dayIndex;
        renderTabs();
        updateDateDisplay(); 
        renderSchedule();
        updateStatus();
    }, direction);
}

function changeWeek(offset) {
    const direction = offset > 0 ? 1 : -1;
    animateScheduleChange(() => {
        viewDate.setDate(viewDate.getDate() + (offset * 7));
        checkIfTodayView();
        updateDateDisplay();
        renderSchedule();
        updateStatus(); 
    }, direction);
}

function resetToToday() {
    viewDate = new Date();
    selectedDay = new Date().getDay();
    if (selectedDay === 0) selectedDay = 7;
    
    renderTabs();
    checkIfTodayView();
    updateDateDisplay();
    renderSchedule();
    updateStatus();
}

function checkIfTodayView() {
    const today = new Date();
    const sameWeek = isSameWeek(viewDate, today);
    const btn = document.getElementById('reset-view-btn');
    btn.style.display = sameWeek ? 'none' : 'block';
}

function isSameWeek(d1, d2) {
    const one = new Date(d1);
    const two = new Date(d2);
    const day1 = one.getDay() || 7;
    const day2 = two.getDay() || 7;
    one.setHours(0,0,0,0);
    two.setHours(0,0,0,0);
    one.setDate(one.getDate() - day1 + 1);
    two.setDate(two.getDate() - day2 + 1);
    return one.getTime() === two.getTime();
}

function updateDateDisplay() {
    const displayDate = getViewedDate();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    document.getElementById('current-date').innerText = displayDate.toLocaleDateString('uk-UA', options);
    
    const weekType = getWeekType(viewDate);
    const badge = document.getElementById('week-badge');
    badge.innerText = weekType === 1 ? "Тиждень 1" : "Тиждень 2";
    badge.className = `week-badge week-${weekType}`;
}

function renderTabs() {
    const buttons = document.querySelectorAll('.day-btn');
    buttons.forEach((btn, index) => {
        if (index + 1 === selectedDay) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}

function renderSchedule() {
    const container = document.getElementById('schedule-container');
    container.innerHTML = '';

    const displayDate = getViewedDate();
    const minHistoryDate = new Date('2024-08-31T23:59:59');

    if (displayDate <= minHistoryDate) {
        container.innerHTML = `
            <div class="empty-day" style="color: var(--accent); padding: 50px 0;">
                <i class="bx bx-history" style="font-size: 4rem; margin-bottom: 10px;"></i>
                <br><span style="font-size: 1.2rem; font-weight: bold;">Ви ще не навчались</span>
                <br><span style="font-size: 0.9rem; opacity: 0.8;">Розклад для цього періоду відсутній</span>
            </div>`;
        return;
    }

    const year = displayDate.getFullYear();
    const month = displayDate.getMonth();
    const date = displayDate.getDate();

    if (year > 2026 || (year === 2026 && month >= 8)) {
        container.innerHTML = `
            <div class="empty-day" style="color: var(--accent); padding: 50px 0;">
                <i class="bx bx-calendar-x" style="font-size: 4rem; margin-bottom: 10px;"></i>
                <br><span style="font-size: 1.2rem; font-weight: bold;">На даний момент розкладу немає</span>
                <br><span style="font-size: 0.9rem; opacity: 0.8;">Очікуйте оновлення на новий семестр</span>
            </div>`;
        return;
    }

    if ((month === 5 && date > 19) || month === 6 || month === 7) {
        container.innerHTML = `
            <div class="empty-day" style="color: var(--accent); padding: 50px 0;">
                <i class="bx bx-sun" style="font-size: 4rem; margin-bottom: 10px;"></i>
                <br><span style="font-size: 1.2rem; font-weight: bold;">Літні канікули!</span>
                <br><span style="font-size: 0.9rem; opacity: 0.8;">Час відпочивати</span>
            </div>`;
        return;
    }

    const currentWeekType = getWeekType(displayDate);
    let allLessons = scheduleData[currentWeekType][selectedDay] || [];
    
    const isSessionPeriod = displayDate >= new Date('2026-06-08T00:00:00') && displayDate <= new Date('2026-06-19T23:59:59');
    
    let lessons = [];
    if (!isSessionPeriod) {
        lessons = allLessons.filter(l => !l.subgroup || l.subgroup === currentSettings.subgroup).map(l => ({...l}));
    }

    const dateStr = formatDateString(displayDate);
    if (dateOverrides[dateStr]) {
        const override = dateOverrides[dateStr];
        if (override.remove) {
            lessons = lessons.filter(l => !override.remove.includes(l.num));
        }
        if (override.add) {
            const addedLessons = override.add.filter(l => !l.subgroup || l.subgroup === currentSettings.subgroup).map(l => ({...l}));
            lessons.push(...addedLessons);
        }
    }
    
    lessons.sort((a, b) => a.num - b.num);
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
        lessons.forEach(lesson => {
            const card = createLessonCard(lesson, typeLabels, isToday, now);
            container.appendChild(card);
        });
    } else {
        for (let i = 1; i <= maxLessonNum; i++) {
            const lesson = lessons.find(l => l.num === i);
            if (lesson) {
                container.appendChild(createLessonCard(lesson, typeLabels, isToday, now));
            } else {
                const card = document.createElement('div');
                card.className = 'lesson-card empty-lesson';
                card.innerHTML = `
                    <div class="time-box">
                        <div class="lesson-num">${i}</div>
                    </div>
                    <div class="info-box">
                        <div class="subject-name" style="color: var(--text-muted); font-weight: 400;">Пари немає</div>
                    </div>`;
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
        const lessonEnd = new Date();
        lessonEnd.setHours(endH, endM, 0);
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
    const minHistoryDate = new Date('2024-08-31T23:59:59');

    if (now <= minHistoryDate) {
        document.getElementById('status-title').innerText = "Ви ще не навчались";
        document.getElementById('main-timer').innerText = "🕰️";
        document.getElementById('time-left-desc').innerText = "Розклад відсутній";
        return;
    }

    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();

    if (year > 2026 || (year === 2026 && month >= 8)) {
        document.getElementById('status-title').innerText = "Розклад відсутній";
        document.getElementById('main-timer').innerText = "🗓️";
        document.getElementById('time-left-desc').innerText = "Очікуємо розклад на осінь";
        return;
    }
    
    if ((month === 5 && date > 19) || month === 6 || month === 7) {
        document.getElementById('status-title').innerText = "Літні канікули!";
        document.getElementById('main-timer').innerText = "☀️🏖️";
        document.getElementById('time-left-desc').innerText = "Насолоджуйся відпочинком";
        return;
    }

    if (!isSameWeek(viewDate, now)) {
        document.getElementById('status-title').innerText = "Перегляд розкладу";
        document.getElementById('main-timer').innerText = "--:--";
        document.getElementById('time-left-desc').innerText = "Інший тиждень";
        return;
    }

    const dayOfWeek = now.getDay() === 0 ? 7 : now.getDay();
    const currentWeekType = getWeekType(now);
    const isSessionPeriod = now >= new Date('2026-06-08T00:00:00') && now <= new Date('2026-06-19T23:59:59');
    
    let lessons = [];
    if (!isSessionPeriod && scheduleData[currentWeekType][dayOfWeek]) {
        lessons = scheduleData[currentWeekType][dayOfWeek]
            .filter(l => !l.subgroup || l.subgroup === currentSettings.subgroup)
            .map(l => ({...l})); 
    }
    
    const dateStr = formatDateString(now);
    if (dateOverrides[dateStr]) {
        const override = dateOverrides[dateStr];
        if (override.remove) {
            lessons = lessons.filter(l => !override.remove.includes(l.num));
        }
        if (override.add) {
            const addedLessons = override.add.filter(l => !l.subgroup || l.subgroup === currentSettings.subgroup).map(l => ({...l}));
            lessons.push(...addedLessons);
        }
    }

    lessons.sort((a, b) => a.num - b.num);
    applyTimeOverrides(lessons, now); 

    const titleEl = document.getElementById('status-title');
    const timerEl = document.getElementById('main-timer');
    const subtitleEl = document.getElementById('time-left-desc');

    if (!lessons || lessons.length === 0) {
        titleEl.innerText = "Сьогодні вихідний";
        timerEl.innerText = "Відпочивай";
        subtitleEl.innerText = "Пар немає";
        return;
    }

    let activeLesson = null;
    let nextLesson = null;

    for (let i = 0; i < lessons.length; i++) {
        const lesson = lessons[i];
        const [startH, startM] = lesson.start.split(':').map(Number);
        const [endH, endM] = lesson.end.split(':').map(Number);
        
        const startDate = new Date(); startDate.setHours(startH, startM, 0);
        const endDate = new Date(); endDate.setHours(endH, endM, 0);

        if (now >= startDate && now < endDate) {
            activeLesson = lesson;
            break;
        }
        if (now < startDate) {
            nextLesson = lesson;
            break;
        }
    }

    document.querySelectorAll('.lesson-card').forEach(c => c.classList.remove('active'));

    if (activeLesson) {
        titleEl.innerText = `Зараз: ${activeLesson.subj} (${activeLesson.room})`;
        const [endH, endM] = activeLesson.end.split(':').map(Number);
        const endDate = new Date(); endDate.setHours(endH, endM, 0);
        const diff = endDate - now;
        
        timerEl.innerText = formatTime(diff);
        subtitleEl.innerHTML = "<i class='bx bx-timer'></i> до завершення";
        
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

        const wakeUpTime = new Date();
        wakeUpTime.setHours(sleepUntilHour, 0, 0, 0);
        const midnight = new Date();
        midnight.setHours(0, 0, 0, 0);

        if (now >= midnight && now < wakeUpTime && isSameDate(viewDate, now) && selectedDay === dayOfWeek) {
            const sleepDiff = wakeUpTime - now;
            const toLessonDiff = startDate - now;
            
            let h = Math.floor(toLessonDiff / 3600000);
            let m = Math.floor((toLessonDiff % 3600000) / 60000);
            let toLessonStr = `${h}:${m < 10 ? '0' : ''}${m} год`;

            titleEl.innerText = "Ви ще можете поспати";
            timerEl.innerText = formatTime(sleepDiff);
            subtitleEl.innerHTML = `<i class='bx bx-bed'></i> до пробудження (До пари: ${toLessonStr})`;
            return;
        }

        const diff = startDate - now;
        titleEl.innerText = `Наступна: ${nextLesson.subj}`;
        timerEl.innerText = formatTime(diff);
        subtitleEl.innerHTML = "<i class='bx bx-coffee'></i> до початку";

    } else {
        titleEl.innerText = isSessionPeriod ? "На сьогодні іспити завершено!" : "Пари на сьогодні все!";
        timerEl.innerText = "Додому";
        subtitleEl.innerText = "Гарного відпочинку";
    }
}

function isSameDate(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
}

function formatTime(ms) {
    if (ms < 0) return "00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) return `${hours}:${pad(minutes)}:${pad(seconds)}`;
    return `${pad(minutes)}:${pad(seconds)}`;
}

function pad(n) {
    return n < 10 ? '0' + n : n;
}

init();

async function checkAirRaidAlert() {
    const alertBanner = document.getElementById('air-raid-alert');
    if (!alertBanner) return; 

    try {
        const targetUrl = 'https://ubilling.net.ua/aerialalerts/';
        const response = await fetch(`https://api.codetabs.com/v1/proxy?quest=${targetUrl}`);
        
        if (!response.ok) throw new Error(`Помилка мережі: ${response.status}`);
        
        const data = await response.json();
        
        let isAlert = data.states['Вінниця'] || 
                      data.states['м. Вінниця'] || 
                      data.states['Вінницька територіальна громада'] ||
                      data.states['Вінницька міська територіальна громада']; 

        if (isAlert) {
            alertBanner.style.display = 'flex';
            document.body.classList.add('alert-mode');
        } else {
            alertBanner.style.display = 'none';
            document.body.classList.remove('alert-mode');
        }
    } catch (error) {
        console.error("Не вдалося перевірити статус тривоги. CORS або сервер недоступний:", error);
    }
}

checkAirRaidAlert();
setInterval(checkAirRaidAlert, 30000);