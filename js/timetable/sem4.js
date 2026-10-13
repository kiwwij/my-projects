if (!window.TimetableData) window.TimetableData = { schedules: {}, semesters: {} };

window.TimetableData.semesters[4] = {
    id: 4,
    startStudy: "2026-02-02T00:00:00",
    endStudy: "2026-06-07T23:59:59",
    startSession: "2026-06-08T00:00:00",
    endSession: "2026-06-19T23:59:59",
    startHolidays: "2026-06-20T00:00:00",
    endHolidays: "2026-08-30T23:59:59"
};

window.TimetableData.schedules[4] = {
    1: {
        1: [
            { num: 5, start: "11:35", end: "12:10", subj: "Метрол. оцінювання ПЗ", type: "LK", room: "12 Зал", teacher: "Дудатьєв І.А." },
            { num: 6, start: "12:25", end: "13:00", subj: "Метрол. оцінювання ПЗ", type: "LK", room: "12 Зал", teacher: "Дудатьєв І.А." }
        ],
        2: [
            { num: 2, start: "09:05", end: "09:40", subj: "Політ. історія України", type: "LK", room: "12 Зал", teacher: "Пономаренко А.Б." },
            { num: 3, start: "09:55", end: "10:30", subj: "Фізична культура", type: "PZ", room: "Спортзал", teacher: "Тихонова С.В." },
            { num: 4, start: "10:45", end: "11:20", subj: "Фізична культура", type: "PZ", room: "Спортзал", teacher: "Тихонова С.В." },
            { num: 5, start: "11:35", end: "12:10", subj: "Теор. ймов. та мат. стат.", type: "LK", room: "2248", teacher: "Ракитянська Г.Б." },
            { num: 6, start: "12:25", end: "13:00", subj: "Теор. ймов. та мат. стат.", type: "LK", room: "2248", teacher: "Ракитянська Г.Б." },
            { num: 7, start: "13:20", end: "13:55", subj: "Теор. ймов. та мат. стат.", type: "PZ", room: "2248", teacher: "Ракитянська Г.Б." }
        ],
        3: [
            { num: 1, start: "08:15", end: "08:50", subj: "Графічні редактори", type: "PZ", room: "2247A", teacher: "Чехместрук Р.Ю." },
            { num: 2, start: "09:05", end: "09:40", subj: "Архітектура та проект. ПЗ", type: "LK", room: "2247A", teacher: "Бабюк Н.П." },
            { num: 3, start: "09:55", end: "10:30", subj: "Графічні редактори", type: "LK", room: "1318", teacher: "Чехместрук Р.Ю." },
            { num: 4, start: "10:45", end: "11:20", subj: "Графічні редактори", type: "LK", room: "1318", teacher: "Чехместрук Р.Ю." },
            { num: 5, start: "11:35", end: "12:10", subj: "Графічні редактори", type: "PZ", room: "1318", teacher: "Чехместрук Р.Ю." },
            { num: 6, start: "12:25", end: "13:00", subj: "Архітектура та проект. ПЗ", type: "PZ", room: "2247A", teacher: "Бабюк Н.П." }
        ],
        4: [
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
        5: [
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
    2: {
        1: [
            { num: 1, start: "08:15", end: "08:50", subj: "БЗВП", type: "PZ", room: "", teacher: "" },
            { num: 2, start: "09:05", end: "09:40", subj: "БЗВП", type: "PZ", room: "", teacher: "" },
            { num: 3, start: "09:55", end: "10:30", subj: "БЗВП", type: "PZ", room: "", teacher: "" },
            { num: 4, start: "10:45", end: "11:20", subj: "БЗВП", type: "PZ", room: "", teacher: "" },
            { num: 5, start: "11:35", end: "12:10", subj: "Метрол. оцінювання ПЗ", type: "LK", room: "12 Зал", teacher: "Дудатьєв І.А." }
        ],
        2: [
            { num: 2, start: "09:05", end: "09:40", subj: "Політ. історія України", type: "LK", room: "12 Зал", teacher: "Пономаренко А.Б." },
            { num: 3, start: "09:55", end: "10:30", subj: "Фізична культура", type: "PZ", room: "Спортзал", teacher: "Тихонова С.В." },
            { num: 4, start: "10:45", end: "11:20", subj: "Фізична культура", type: "PZ", room: "Спортзал", teacher: "Тихонова С.В." },
            { num: 5, start: "11:35", end: "12:10", subj: "Теор. ймов. та мат. стат.", type: "LK", room: "2248", teacher: "Ракитянська Г.Б." },
            { num: 6, start: "12:25", end: "13:00", subj: "Теор. ймов. та мат. стат.", type: "LK", room: "2248", teacher: "Ракитянська Г.Б." },
            { num: 7, start: "13:20", end: "13:55", subj: "Теор. ймов. та мат. стат.", type: "PZ", room: "2248", teacher: "Ракитянська Г.Б." }
        ],
        3: [
            { num: 1, start: "08:15", end: "08:50", subj: "Архітектура та проект. ПЗ", type: "LK", room: "2247A", teacher: "Бабюк Н.П." },
            { num: 2, start: "09:05", end: "09:40", subj: "Архітектура та проект. ПЗ", type: "LK", room: "2247A", teacher: "Бабюк Н.П." },
            { num: 3, start: "09:55", end: "10:30", subj: "Графічні редактори", type: "LK", room: "1318", teacher: "Чехместрук Р.Ю." },
            { num: 4, start: "10:45", end: "11:20", subj: "Графічні редактори", type: "LK", room: "1318", teacher: "Чехместрук Р.Ю." },
            { num: 5, start: "11:35", end: "12:10", subj: "Графічні редактори", type: "PZ", room: "1318", teacher: "Чехместрук Р.Ю." },
            { num: 6, start: "12:25", end: "13:00", subj: "Архітектура та проект. ПЗ", type: "PZ", room: "2247A", teacher: "Бабюк Н.П." }
        ],
        4: [
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
        5: [
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