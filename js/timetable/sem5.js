if (!window.TimetableData) window.TimetableData = { schedules: {}, semesters: {} };

window.TimetableData.semesters[5] = {
    id: 5,
    startStudy: "2026-08-31T00:00:00",
    endStudy: "2027-01-01T23:59:59",
    startSession: "2027-01-02T00:00:00",
    endSession: "2027-01-15T23:59:59",
    startHolidays: "2027-01-16T00:00:00",
    endHolidays: "2027-01-31T23:59:59"
};

window.TimetableData.schedules[5] = {
    1: {
        1: [
            { num: 3, start: "10:15", end: "11:00", subj: "Комп`ютерна графіка", type: "LK", room: "5128", teacher: "Романюк О.Н." },
            { num: 4, start: "11:15", end: "12:00", subj: "Комп`ютерна графіка", type: "LK", room: "5128", teacher: "Романюк О.Н." },
            { num: 5, start: "12:15", end: "13:00", subj: "Спеціальні розділи математики", type: "LK", room: "1318", teacher: "Бондаренко З.В." },
            { num: 6, start: "13:15", end: "14:00", subj: "Спеціальні розділи математики", type: "LK", room: "1318", teacher: "Бондаренко З.В." }
        ],
        2: [
            { num: 1, start: "08:15", end: "09:00", subj: "Комп`ютерна графіка", type: "LR", room: "2104", teacher: "Романюк О.Н.", subgroup: 1 },
            { num: 2, start: "09:15", end: "10:00", subj: "Комп`ютерна графіка", type: "LR", room: "2104", teacher: "Романюк О.Н.", subgroup: 1 },
            { num: 1, start: "08:15", end: "09:00", subj: "Операційні системи", type: "LR", room: "2431", teacher: "Рейда О.М.", subgroup: 2 },
            { num: 2, start: "09:15", end: "10:00", subj: "Операційні системи", type: "LR", room: "2431", teacher: "Рейда О.М.", subgroup: 2 },
            { num: 3, start: "10:15", end: "11:00", subj: "Операційні системи", type: "LK", room: "5128", teacher: "Рейда О.М." },
            { num: 4, start: "11:15", end: "12:00", subj: "Операційні системи", type: "LK", room: "5128", teacher: "Рейда О.М." },
            { num: 5, start: "12:15", end: "13:00", subj: "Фізична культура", type: "PZ", room: "Спортзал", teacher: "Тихонова С.В." },
            { num: 6, start: "13:15", end: "14:00", subj: "Фізична культура", type: "PZ", room: "Спортзал", teacher: "Тихонова С.В." }
        ],
        3: [
            { num: 1, start: "08:15", end: "09:00", subj: "Якість програмного забезпечення", type: "LR", room: "2431", teacher: "Романюк О.В.", subgroup: 1 },
            { num: 2, start: "09:15", end: "10:00", subj: "Якість програмного забезпечення", type: "LR", room: "2431", teacher: "Романюк О.В.", subgroup: 1 },
            { num: 1, start: "08:15", end: "09:00", subj: "Комп`ютерна графіка", type: "LR", room: "2408", teacher: "Романюк О.В.", subgroup: 2 },
            { num: 2, start: "09:15", end: "10:00", subj: "Комп`ютерна графіка", type: "LR", room: "2408", teacher: "Романюк О.В.", subgroup: 2 },
            { num: 3, start: "10:15", end: "11:00", subj: "Спеціальні розділи математики", type: "PZ", room: "2247А", teacher: "Бондаренко З.В." },
            { num: 4, start: "11:15", end: "12:00", subj: "Організація програмних систем", type: "PZ", room: "2104", teacher: "Бабюк Н.П." },
            { num: 5, start: "12:15", end: "13:00", subj: "Організація програмних систем", type: "PZ", room: "2104", teacher: "Бабюк Н.П." }
        ],
        4: [
            { num: 2, start: "09:15", end: "10:00", subj: "Управління експ. та функц. характ. ПЗ", type: "PZ", room: "1318", teacher: "Гавенко О.В." },
            { num: 3, start: "10:15", end: "11:00", subj: "Управління експ. та функц. характ. ПЗ", type: "LK", room: "1224", teacher: "Гавенко О.В." },
            { num: 4, start: "11:15", end: "12:00", subj: "Управління експ. та функц. характ. ПЗ", type: "LK", room: "1224", teacher: "Гавенко О.В." },
            { num: 5, start: "12:15", end: "13:00", subj: "Екологія та основи біобезпеки і біоетики", type: "PZ", room: "1311", teacher: "Сакалова Г.В." },
            { num: 6, start: "13:15", end: "14:00", subj: "Політологія", type: "PZ", room: "2259", teacher: "Сідлецька Т.І." }
        ],
        5: [
            { num: 1, start: "08:15", end: "09:00", subj: "Організація програмних систем", type: "LK", room: "2428", teacher: "Бабюк Н.П." },
            { num: 2, start: "09:15", end: "10:00", subj: "Організація програмних систем", type: "LK", room: "2428", teacher: "Бабюк Н.П." },
            { num: 3, start: "10:15", end: "11:00", subj: "Якість програмного забезпечення", type: "LK", room: "5128", teacher: "Романюк О.В." },
            { num: 4, start: "11:15", end: "12:00", subj: "Якість програмного забезпечення", type: "LK", room: "5128", teacher: "Романюк О.В." },
            { num: 5, start: "12:15", end: "13:00", subj: "Політологія", type: "LK", room: "5128", teacher: "Корнієнко В.О." },
            { num: 6, start: "13:15", end: "14:00", subj: "Екологія та основи біобезпеки і біоетики", type: "LK", room: "5128", teacher: "Сакалова Г.В." }
        ]
    },
    2: {
        1: [
            { num: 3, start: "10:15", end: "11:00", subj: "Комп`ютерна графіка", type: "LK", room: "5128", teacher: "Романюк О.Н." },
            { num: 4, start: "11:15", end: "12:00", subj: "Комп`ютерна графіка", type: "LK", room: "5128", teacher: "Романюк О.Н." },
            { num: 5, start: "12:15", end: "13:00", subj: "Спеціальні розділи математики", type: "LK", room: "1318", teacher: "Бондаренко З.В." }
        ],
        2: [
            { num: 1, start: "08:15", end: "09:00", subj: "Операційні системи", type: "LR", room: "2431", teacher: "Рейда О.М.", subgroup: 1 },
            { num: 2, start: "09:15", end: "10:00", subj: "Операційні системи", type: "LR", room: "2431", teacher: "Рейда О.М.", subgroup: 1 },
            { num: 1, start: "08:15", end: "09:00", subj: "Комп`ютерна графіка", type: "LR", room: "2104", teacher: "Романюк О.Н.", subgroup: 2 },
            { num: 2, start: "09:15", end: "10:00", subj: "Комп`ютерна графіка", type: "LR", room: "2104", teacher: "Романюк О.Н.", subgroup: 2 },
            { num: 3, start: "10:15", end: "11:00", subj: "Операційні системи", type: "LK", room: "5128", teacher: "Рейда О.М." },
            { num: 4, start: "11:15", end: "12:00", subj: "Операційні системи", type: "LK", room: "5128", teacher: "Рейда О.М." },
            { num: 5, start: "12:15", end: "13:00", subj: "Фізична культура", type: "PZ", room: "Спортзал", teacher: "Тихонова С.В." },
            { num: 6, start: "13:15", end: "14:00", subj: "Фізична культура", type: "PZ", room: "Спортзал", teacher: "Тихонова С.В." }
        ],
        3: [
            { num: 1, start: "08:15", end: "09:00", subj: "Комп`ютерна графіка", type: "LR", room: "2433", teacher: "Романюк О.Н.", subgroup: 1 },
            { num: 2, start: "09:15", end: "10:00", subj: "Комп`ютерна графіка", type: "LR", room: "2433", teacher: "Романюк О.Н.", subgroup: 1 },
            { num: 1, start: "08:15", end: "09:00", subj: "Якість програмного забезпечення", type: "LR", room: "2431", teacher: "Романюк О.В.", subgroup: 2 },
            { num: 2, start: "09:15", end: "10:00", subj: "Якість програмного забезпечення", type: "LR", room: "2431", teacher: "Романюк О.В.", subgroup: 2 },
            { num: 3, start: "10:15", end: "11:00", subj: "Спеціальні розділи математики", type: "PZ", room: "2247А", teacher: "Бондаренко З.В." },
            { num: 4, start: "11:15", end: "12:00", subj: "Організація програмних систем", type: "PZ", room: "2104", teacher: "Бабюк Н.П." }
        ],
        4: [
            { num: 1, start: "08:15", end: "09:00", subj: "Управління експ. та функц. характ. ПЗ", type: "PZ", room: "1318", teacher: "Гавенко О.В." },
            { num: 2, start: "09:15", end: "10:00", subj: "Управління експ. та функц. характ. ПЗ", type: "PZ", room: "1318", teacher: "Гавенко О.В." },
            { num: 3, start: "10:15", end: "11:00", subj: "Управління експ. та функц. характ. ПЗ", type: "LK", room: "1224", teacher: "Гавенко О.В." },
            { num: 4, start: "11:15", end: "12:00", subj: "Управління експ. та функц. характ. ПЗ", type: "LK", room: "1224", teacher: "Гавенко О.В." },
            { num: 5, start: "12:15", end: "13:00", subj: "Екологія та основи біобезпеки і біоетики", type: "PZ", room: "1311", teacher: "Сакалова Г.В." },
            { num: 6, start: "13:15", end: "14:00", subj: "Політологія", type: "PZ", room: "2259", teacher: "Сідлецька Т.І." }
        ],
        5: [
            { num: 1, start: "08:15", end: "09:00", subj: "Організація програмних систем", type: "LK", room: "2428", teacher: "Бабюк Н.П." },
            { num: 2, start: "09:15", end: "10:00", subj: "Організація програмних систем", type: "LK", room: "2428", teacher: "Бабюк Н.П." },
            { num: 3, start: "10:15", end: "11:00", subj: "Якість програмного забезпечення", type: "LK", room: "5128", teacher: "Романюк О.В." },
            { num: 4, start: "11:15", end: "12:00", subj: "Якість програмного забезпечення", type: "LK", room: "5128", teacher: "Романюк О.В." },
            { num: 5, start: "12:15", end: "13:00", subj: "Політологія", type: "LK", room: "5128", teacher: "Корнієнко В.О." },
            { num: 6, start: "13:15", end: "14:00", subj: "Екологія та основи біобезпеки і біоетики", type: "LK", room: "5128", teacher: "Сакалова Г.В." }
        ]
    }
};