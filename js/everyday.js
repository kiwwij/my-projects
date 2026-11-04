const STORAGE_KEYS = {
    THEME: "kiwwij_chronograph_theme",
    LANG: "kiwwij_chronograph_lang",
    SECRET: "kiwwij_chronograph_secret_unlocked",
    CUSTOM_BDAYS: "kiwwij_chronograph_custom_bdays"
};

const DAYS_IN_MONTH_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const I18N = {
    ru: {
        sitePageTitle: "ХроноГраф — Всемирный реестр праздников",
        brandName: "ХроноГраф",
        brandSub: "Всемирный реестр дат",
        labelTodayFull: "Сегодня в вашем регионе:",
        labelDateFormat: "Формат:",
        monthsGenitive: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
        monthsNominative: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        weekdays: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        btnPickDate: "Календарь дат",
        btnAddBday: "Личный список ДР",
        btnToday: "Вернуться к сегодня",
        btnLeapDay: "29 февраля (Високосный день)",
        searchPlaceholder: "Поиск по названию, стране или описанию (код «др» — скрытый фильтр)...",
        catAll: "Все категории",
        catInternational: "Международные",
        catOfficial: "Государственные",
        catProfessional: "Профессиональные",
        catFun: "Неофициальные",
        catBirthdays: "Дни рождения",
        intlPriorityBanner: "Международный статус • ООН / Мир",
        intlLegendText: "Международные праздники выделены приоритетным блоком",
        foundPrefix: "Записей в реестре за выбранный день: ",
        emptyTitle: "Записи по заданным критериям отсутствуют",
        emptyDesc: "Активируйте отключённые категории на панели фильтров выше или измените текст поискового запроса.",
        btnResetFilters: "Восстановить фильтры",
        footerCopy: "ХроноГраф • Всемирный справочник праздников (366 дней) • Разработка:",
        modalCalendarTitle: "Навигация по календарю (366 дней)",
        leapYearSupportHint: "Включён високосный день 29 февраля",
        modalBdayTitle: "Личный реестр дней рождения",
        labelBdayName: "Имя / Никнейм",
        labelBdayDate: "Дата (ММ-ДД)",
        labelBdayNote: "Примечание / Подарок",
        btnSaveBday: "Добавить запись",
        secretUnlockedToast: "Скрытый фильтр «Дни рождения» активирован!",
        secretLockedToast: "Скрытый фильтр «Дни рождения» скрыт.",
        leapNoteWeekday: "Официальный високосный день (раз в 4 года)",
        tooltipBrand: "Вернуться к сегодняшней дате",
        tooltipCalendar: "Открыть календарь всех 366 дней года",
        tooltipAddBday: "Управление списком дней рождения знакомых",
        tooltipLang: "Переключить язык интерфейса (RU / EN)",
        tooltipTheme: "Переключить тёмную или светлую тему",
        tooltipRegion: "Региональный стандарт даты и времени вашего браузера (5 кликов — секретный фильтр)",
        tooltipPrevDay: "Перейти к предыдущему дню",
        tooltipNextDay: "Перейти к следующему дню",
        tooltipDateCenter: "Нажмите для выбора любого месяца и числа",
        tooltipToday: "Сбросить дату на сегодняшнее число вашего региона",
        tooltipLeap: "Перейти сразу к 29 февраля",
        tooltipSearch: "Введите название праздника или страну",
        tooltipClearSearch: "Очистить строку поиска",
        tooltipFilterAll: "Включить или выключить все категории",
        tooltipFilterIntl: "Международные дни ООН, ЮНЕСКО и всемирные даты",
        tooltipFilterOfficial: "Государственные праздники стран мира",
        tooltipFilterProf: "Официальные и отраслевые профессиональные праздники",
        tooltipFilterFun: "Неофициальные, культурные и шуточные праздники",
        tooltipFilterBday: "Скрытая категория: дни рождения знакомых",
        tooltipResetFilters: "Вернуть все категории по умолчанию",
        tooltipCloseModal: "Закрыть окно (клавиша Esc)"
    },
    en: {
        sitePageTitle: "ChronoGraph — World Holiday Registry",
        brandName: "ChronoGraph",
        brandSub: "World Registry of Dates",
        labelTodayFull: "Today in your region:",
        labelDateFormat: "Format:",
        monthsGenitive: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthsNominative: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        btnPickDate: "Date Picker",
        btnAddBday: "Personal Birthdays",
        btnToday: "Return to Today",
        btnLeapDay: "February 29 (Leap Day)",
        searchPlaceholder: "Search by holiday title, country, or description (type 'bday' for secret)...",
        catAll: "All Categories",
        catInternational: "International",
        catOfficial: "State & National",
        catProfessional: "Professional",
        catFun: "Informal & Cultural",
        catBirthdays: "Birthdays",
        intlPriorityBanner: "International Status • UN / Global",
        intlLegendText: "International holidays are highlighted with priority styling",
        foundPrefix: "Registry entries for selected date: ",
        emptyTitle: "No registry entries match your criteria",
        emptyDesc: "Enable additional categories on the filter bar above or clear your search query.",
        btnResetFilters: "Restore Filters",
        footerCopy: "ChronoGraph • World Holiday Almanac (366 Days) • Crafted by:",
        modalCalendarTitle: "Calendar Navigation (All 366 Days)",
        leapYearSupportHint: "Leap day February 29 is active",
        modalBdayTitle: "Personal Birthdays Registry",
        labelBdayName: "Name / Nickname",
        labelBdayDate: "Date (MM-DD)",
        labelBdayNote: "Note / Gift Idea",
        btnSaveBday: "Add Entry",
        secretUnlockedToast: "Hidden 'Birthdays' filter unlocked!",
        secretLockedToast: "Hidden 'Birthdays' filter hidden.",
        leapNoteWeekday: "Official Leap Day (Occurs every 4 years)",
        tooltipBrand: "Return to today's date",
        tooltipCalendar: "Open full 366-day calendar picker",
        tooltipAddBday: "Manage personal birthdays registry",
        tooltipLang: "Switch interface language (RU / EN)",
        tooltipTheme: "Toggle dark or light theme",
        tooltipRegion: "Your browser's regional date format and timezone (click 5 times for secret filter)",
        tooltipPrevDay: "Go to previous day",
        tooltipNextDay: "Go to next day",
        tooltipDateCenter: "Click to select any month and day",
        tooltipToday: "Return to your local today's date",
        tooltipLeap: "Jump directly to February 29",
        tooltipSearch: "Type keywords or country name to filter",
        tooltipClearSearch: "Clear search field",
        tooltipFilterAll: "Toggle all categories on or off",
        tooltipFilterIntl: "UN, UNESCO, and worldwide international days",
        tooltipFilterOfficial: "Official state and national holidays worldwide",
        tooltipFilterProf: "Professional and industry holidays",
        tooltipFilterFun: "Informal, cultural, and fun observances",
        tooltipFilterBday: "Hidden category: friends' birthdays",
        tooltipResetFilters: "Restore default filters",
        tooltipCloseModal: "Close modal window (Esc key)"
    }
};

const SVG_PLACEHOLDERS = {
    international: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' rx='10' fill='%230c2a3e' stroke='%2338bdf8' stroke-width='2'/%3E%3Ccircle cx='40' cy='40' r='20' stroke='%2338bdf8' stroke-width='3.5' fill='none'/%3E%3Cellipse cx='40' cy='40' rx='10' ry='20' stroke='%23eab308' stroke-width='2.5' fill='none'/%3E%3Cpath d='M20 40h40' stroke='%2338bdf8' stroke-width='2.5'/%3E%3C/svg%3E",
    official: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' rx='10' fill='%231e223d'/%3E%3Cpath d='M20 56h40M25 56V34h30v22M18 34l22-14 22 14' stroke='%23818cf8' stroke-width='3.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E",
    professional: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' rx='10' fill='%23332414'/%3E%3Crect x='20' y='28' width='40' height='28' rx='4' stroke='%23f59e0b' stroke-width='3.5' fill='none'/%3E%3Cpath d='M32 28v-5h16v5' stroke='%23f59e0b' stroke-width='3.5' fill='none'/%3E%3C/svg%3E",
    fun: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' rx='10' fill='%23281d3d'/%3E%3Ccircle cx='40' cy='40' r='19' stroke='%23a78bfa' stroke-width='3.5' fill='none'/%3E%3Ccircle cx='33' cy='35' r='2.5' fill='%23a78bfa'/%3E%3Ccircle cx='47' cy='35' r='2.5' fill='%23a78bfa'/%3E%3Cpath d='M32 46c4 4 12 4 16 0' stroke='%23a78bfa' stroke-width='3.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E",
    birthdays: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' rx='10' fill='%233b1929'/%3E%3Crect x='22' y='38' width='36' height='20' rx='4' stroke='%23f472b6' stroke-width='3.5' fill='none'/%3E%3Cpath d='M40 24v14M32 28v10M48 28v10' stroke='%23f472b6' stroke-width='3.5' stroke-linecap='round'/%3E%3C/svg%3E",
    fallback: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' rx='16' fill='%231b2332'/%3E%3Ccircle cx='60' cy='60' r='28' stroke='%2338bdf8' stroke-width='4' stroke-dasharray='6 6' fill='none'/%3E%3C/svg%3E"
};

function detectInitialLanguage() {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    if (saved === "ru" || saved === "en") return saved;

    const browserLangs = navigator.languages || [navigator.language || "ru"];
    for (const code of browserLangs) {
        const lower = String(code).toLowerCase();
        if (lower.startsWith("ru") || lower.startsWith("uk") || lower.startsWith("be")) {
            return "ru";
        }
        if (lower.startsWith("en")) {
            return "en";
        }
    }
    return "ru";
}

function detectRegionalFormatPattern(locale, lang) {
    try {
        const parts = new Intl.DateTimeFormat(locale, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }).formatToParts(new Date(2026, 10, 3));

        const tokenMap = lang === "ru"
            ? { day: "ДД", month: "ММ", year: "ГГГГ" }
            : { day: "DD", month: "MM", year: "YYYY" };

        return parts
            .map((p) => tokenMap[p.type] || p.value)
            .join("");
    } catch {
        return lang === "ru" ? "ДД.ММ.ГГГГ" : "MM/DD/YYYY";
    }
}

function getDayOfYearIndex(month, day) {
    let total = 0;
    for (let i = 0; i < month - 1; i++) {
        total += DAYS_IN_MONTH_LEAP[i];
    }
    return total + day;
}

const state = {
    theme: localStorage.getItem(STORAGE_KEYS.THEME) || "dark",
    lang: detectInitialLanguage(),
    secretUnlocked: localStorage.getItem(STORAGE_KEYS.SECRET) === "true",
    customBirthdays: JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_BDAYS) || "[]"),
    selectedMonth: 1,
    selectedDay: 1,
    modalMonth: 1,
    activeCategories: new Set(["international", "official", "professional", "fun"]),
    searchQuery: "",
    regionClicks: 0,
    regionClickTimer: null
};

function initApp() {
    const now = new Date();
    state.selectedMonth = now.getMonth() + 1;
    state.selectedDay = now.getDate();
    state.modalMonth = state.selectedMonth;

    if (state.secretUnlocked) {
        state.activeCategories.add("birthdays");
    }

    document.getElementById("emptyPlaceholderImg").src = SVG_PLACEHOLDERS.fallback;

    applyTheme(state.theme);
    applyLanguage(state.lang, false);
    syncSecretUI();
    updateClockAndRegion();
    setInterval(updateClockAndRegion, 1000);

    renderCurrentDateView();
    bindEvents();
}

function formatKey(month, day) {
    return `${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function applyTheme(theme) {
    state.theme = theme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", state.theme);
    localStorage.setItem(STORAGE_KEYS.THEME, state.theme);

    const icon = document.getElementById("themeIcon");
    if (icon) {
        icon.className = state.theme === "dark" ? "bx bx-sun" : "bx bx-moon";
    }
}

function applyLanguage(lang, persistChoice = true) {
    state.lang = lang === "en" ? "en" : "ru";
    document.documentElement.lang = state.lang;
    if (persistChoice) {
        localStorage.setItem(STORAGE_KEYS.LANG, state.lang);
    }

    const dict = I18N[state.lang];
    document.title = dict.sitePageTitle;
    document.getElementById("langLabel").textContent = state.lang.toUpperCase();
    document.getElementById("searchInput").placeholder = dict.searchPlaceholder;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-tooltip]").forEach((el) => {
        const key = el.getAttribute("data-i18n-tooltip");
        if (dict[key]) el.setAttribute("title", dict[key]);
    });

    updateClockAndRegion();
    renderCurrentDateView();
}

function updateClockAndRegion() {
    const now = new Date();
    const browserLocale = navigator.language || (state.lang === "ru" ? "ru-RU" : "en-US");
    const displayLocale = state.lang === "ru" ? "ru-RU" : "en-US";
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

    const fullDateStr = new Intl.DateTimeFormat(displayLocale, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(now);

    const regionalNumericDate = new Intl.DateTimeFormat(browserLocale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }).format(now);

    const patternStr = detectRegionalFormatPattern(browserLocale, state.lang);

    const timeStr = now.toLocaleTimeString(displayLocale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    document.getElementById("fullRegionalDateText").textContent = fullDateStr;
    document.getElementById("regionalShortDate").textContent = regionalNumericDate;
    document.getElementById("regionalFormatPattern").textContent = `${patternStr} (${browserLocale})`;
    document.getElementById("userRegionText").textContent = tz.replace(/_/g, " ");
    document.getElementById("userClockText").textContent = timeStr;
}

function renderCurrentDateView() {
    const dict = I18N[state.lang];
    const dateKey = formatKey(state.selectedMonth, state.selectedDay);
    const dayIdx = getDayOfYearIndex(state.selectedMonth, state.selectedDay);

    document.getElementById("displayDayNum").textContent = String(state.selectedDay).padStart(2, "0");
    document.getElementById("displayMonthName").textContent = dict.monthsGenitive[state.selectedMonth - 1];
    document.getElementById("dayOfYearBadge").textContent = state.lang === "ru"
        ? `День ${dayIdx} из 366`
        : `Day ${dayIdx} of 366`;

    if (state.selectedMonth === 2 && state.selectedDay === 29) {
        document.getElementById("displayWeekday").textContent = dict.leapNoteWeekday;
    } else {
        const refYear = new Date().getFullYear();
        const dateObj = new Date(refYear, state.selectedMonth - 1, state.selectedDay);
        document.getElementById("displayWeekday").textContent = `${dict.weekdays[dateObj.getDay()]} • ${refYear}`;
    }

    const now = new Date();
    const isToday = state.selectedMonth === (now.getMonth() + 1) && state.selectedDay === now.getDate();
    document.getElementById("todayResetBtn").classList.toggle("hidden", isToday);

    renderHolidaysList(dateKey);
}

function renderHolidaysList(dateKey) {
    const dict = I18N[state.lang];
    const allItems = getHolidaysForDateKey(dateKey, state.customBirthdays);

    const counts = { all: 0, international: 0, official: 0, professional: 0, fun: 0, birthdays: 0 };
    allItems.forEach((item) => {
        if (item.cat === "birthdays" && !state.secretUnlocked) return;
        counts[item.cat] = (counts[item.cat] || 0) + 1;
        counts.all += 1;
    });

    Object.keys(counts).forEach((cat) => {
        const badge = document.getElementById(`count-${cat}`);
        if (badge) badge.textContent = counts[cat];
    });

    const query = state.searchQuery.trim().toLowerCase();
    const filtered = allItems.filter((item) => {
        if (item.cat === "birthdays" && !state.secretUnlocked) return false;
        if (!state.activeCategories.has(item.cat)) return false;
        if (!query) return true;
        const title = (state.lang === "ru" ? item.ru : item.en).toLowerCase();
        const desc = (state.lang === "ru" ? item.descRu : item.descEn).toLowerCase();
        const reg = (state.lang === "ru" ? item.regRu : item.regEn).toLowerCase();
        return title.includes(query) || desc.includes(query) || reg.includes(query);
    });

    document.getElementById("resultsCounterText").textContent = `${dict.foundPrefix}${filtered.length}`;

    const grid = document.getElementById("holidaysGrid");
    const emptyBox = document.getElementById("emptyStateBox");
    grid.innerHTML = "";

    if (filtered.length === 0) {
        emptyBox.classList.remove("hidden");
        return;
    }

    emptyBox.classList.add("hidden");
    const fragment = document.createDocumentFragment();

    const catMeta = {
        international: { icon: "bx-globe", label: dict.catInternational },
        official: { icon: "bx-buildings", label: dict.catOfficial },
        professional: { icon: "bx-briefcase-alt-2", label: dict.catProfessional },
        fun: { icon: "bx-party", label: dict.catFun },
        birthdays: { icon: "bx-cake", label: dict.catBirthdays }
    };

    filtered.forEach((item) => {
        const card = document.createElement("article");
        const isIntl = item.cat === "international";
        card.className = `holiday-card ${isIntl ? "card-international" : ""}`;
        card.setAttribute("tabindex", "0");
        card.setAttribute("title", state.lang === "ru" ? "Нажмите для открытия полной справки о празднике" : "Click to open full holiday reference");

        const meta = catMeta[item.cat] || catMeta.fun;
        const titleText = state.lang === "ru" ? item.ru : item.en;
        const descText = state.lang === "ru" ? item.descRu : item.descEn;
        const regText = state.lang === "ru" ? item.regRu : item.regEn;

        card.innerHTML = `
            ${isIntl ? `<div class="intl-priority-banner"><i class="bx bxs-star"></i><span>${dict.intlPriorityBanner}</span></div>` : ""}
            <div class="card-top">
                <span class="card-category-tag tag-${item.cat}">
                    <i class="bx ${meta.icon}"></i>
                    <span>${meta.label}</span>
                </span>
                <span class="card-region" title="${regText}">
                    <i class="bx bx-map-alt"></i>
                    <span>${regText}</span>
                </span>
            </div>
            <div class="card-body-row">
                <img class="card-thumb" src="${SVG_PLACEHOLDERS[item.cat] || SVG_PLACEHOLDERS.fallback}" alt="" loading="lazy">
                <h3 class="card-title">${titleText}</h3>
            </div>
            <p class="card-desc">${descText}</p>
        `;

        const imgEl = card.querySelector(".card-thumb");
        imgEl.onerror = () => { imgEl.src = SVG_PLACEHOLDERS.fallback; };

        card.addEventListener("click", () => openDetailModal(item, meta));
        fragment.appendChild(card);
    });

    grid.appendChild(fragment);
}

function stepDate(delta) {
    let m = state.selectedMonth;
    let d = state.selectedDay + delta;

    if (d > DAYS_IN_MONTH_LEAP[m - 1]) {
        m = m === 12 ? 1 : m + 1;
        d = 1;
    } else if (d < 1) {
        m = m === 1 ? 12 : m - 1;
        d = DAYS_IN_MONTH_LEAP[m - 1];
    }

    state.selectedMonth = m;
    state.selectedDay = d;
    renderCurrentDateView();
}

function toggleSecretMode(forceState) {
    state.secretUnlocked = typeof forceState === "boolean" ? forceState : !state.secretUnlocked;
    localStorage.setItem(STORAGE_KEYS.SECRET, String(state.secretUnlocked));

    if (state.secretUnlocked) {
        state.activeCategories.add("birthdays");
    } else {
        state.activeCategories.delete("birthdays");
    }

    syncSecretUI();
    renderCurrentDateView();

    const dict = I18N[state.lang];
    showToast(state.secretUnlocked ? dict.secretUnlockedToast : dict.secretLockedToast);
}

function syncSecretUI() {
    const chip = document.getElementById("secretBirthdayChip");
    const addBtn = document.getElementById("addBirthdayBtn");

    chip.classList.toggle("hidden", !state.secretUnlocked);
    addBtn.classList.toggle("hidden", !state.secretUnlocked);
    chip.classList.toggle("active", state.activeCategories.has("birthdays"));
}

function showToast(message) {
    const toast = document.getElementById("toastNotification");
    document.getElementById("toastText").textContent = message;
    toast.classList.remove("hidden");
    clearTimeout(toast.hideTimer);
    toast.hideTimer = setTimeout(() => toast.classList.add("hidden"), 3200);
}

function openModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.add("open");
}

function closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.remove("open");
}

function closeAllModals() {
    document.querySelectorAll(".modal-overlay.open").forEach((m) => m.classList.remove("open"));
}

function openDetailModal(item, meta) {
    const dict = I18N[state.lang];
    const badge = document.getElementById("detailCategoryBadge");
    badge.className = `card-category-tag tag-${item.cat}`;
    badge.innerHTML = `<i class="bx ${meta.icon}"></i> <span>${meta.label}</span>`;

    const img = document.getElementById("detailModalImg");
    img.src = SVG_PLACEHOLDERS[item.cat] || SVG_PLACEHOLDERS.fallback;
    img.onerror = () => { img.src = SVG_PLACEHOLDERS.fallback; };

    document.getElementById("detailModalTitle").textContent = state.lang === "ru" ? item.ru : item.en;
    document.getElementById("detailModalDesc").textContent = state.lang === "ru" ? item.descRu : item.descEn;
    document.querySelector("#detailDateBadge span").textContent = `${state.selectedDay} ${dict.monthsGenitive[state.selectedMonth - 1]}`;
    document.querySelector("#detailRegionBadge span").textContent = state.lang === "ru" ? item.regRu : item.regEn;

    openModal("detailModal");
}

function renderCalendarModal() {
    const dict = I18N[state.lang];
    const monthGrid = document.getElementById("modalMonthGrid");
    const daysGrid = document.getElementById("modalDaysGrid");
    monthGrid.innerHTML = "";
    daysGrid.innerHTML = "";

    dict.monthsNominative.forEach((mName, idx) => {
        const mNum = idx + 1;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `month-btn ${mNum === state.modalMonth ? "active" : ""}`;
        btn.textContent = mName;
        btn.addEventListener("click", () => {
            state.modalMonth = mNum;
            renderCalendarModal();
        });
        monthGrid.appendChild(btn);
    });

    document.getElementById("selectedMonthLabel").textContent = dict.monthsNominative[state.modalMonth - 1];
    const maxDays = DAYS_IN_MONTH_LEAP[state.modalMonth - 1];

    for (let d = 1; d <= maxDays; d++) {
        const dBtn = document.createElement("button");
        dBtn.type = "button";
        const isCurrent = state.modalMonth === state.selectedMonth && d === state.selectedDay;
        const isLeap = state.modalMonth === 2 && d === 29;
        dBtn.className = `day-btn ${isCurrent ? "active" : ""} ${isLeap ? "leap-special" : ""}`;
        dBtn.textContent = d;
        if (isLeap) {
            dBtn.setAttribute("title", "29 февраля — високосный день");
        }
        dBtn.addEventListener("click", () => {
            state.selectedMonth = state.modalMonth;
            state.selectedDay = d;
            renderCurrentDateView();
            closeModal("calendarModal");
        });
        daysGrid.appendChild(dBtn);
    }
}

function renderCustomBirthdaysModal() {
    const container = document.getElementById("customBdayList");
    container.innerHTML = "";

    const combined = [
        ...FRIENDS_BIRTHDAYS.map((b) => ({ ...b, fixed: true })),
        ...state.customBirthdays.map((b, i) => ({ ...b, fixed: false, cIdx: i }))
    ];

    combined.forEach((item) => {
        const row = document.createElement("div");
        row.className = "bday-item";
        row.innerHTML = `
            <div>
                <strong>${item.date}</strong> — ${state.lang === "ru" ? item.ru : item.en}
            </div>
            ${item.fixed ? "" : `<button type="button" class="bday-del-btn" title="Удалить"><i class="bx bx-trash"></i></button>`}
        `;
        if (!item.fixed) {
            row.querySelector(".bday-del-btn").addEventListener("click", () => {
                state.customBirthdays.splice(item.cIdx, 1);
                localStorage.setItem(STORAGE_KEYS.CUSTOM_BDAYS, JSON.stringify(state.customBirthdays));
                renderCustomBirthdaysModal();
                renderCurrentDateView();
            });
        }
        container.appendChild(row);
    });
}

function bindEvents() {
    document.getElementById("themeToggleBtn").addEventListener("click", () => {
        applyTheme(state.theme === "dark" ? "light" : "dark");
    });

    document.getElementById("langToggleBtn").addEventListener("click", () => {
        applyLanguage(state.lang === "ru" ? "en" : "ru", true);
    });

    document.getElementById("prevDayBtn").addEventListener("click", () => stepDate(-1));
    document.getElementById("nextDayBtn").addEventListener("click", () => stepDate(1));

    document.getElementById("todayResetBtn").addEventListener("click", () => {
        const now = new Date();
        state.selectedMonth = now.getMonth() + 1;
        state.selectedDay = now.getDate();
        renderCurrentDateView();
    });

    document.getElementById("leapDayQuickBtn").addEventListener("click", () => {
        state.selectedMonth = 2;
        state.selectedDay = 29;
        renderCurrentDateView();
    });

    const openCal = () => {
        state.modalMonth = state.selectedMonth;
        renderCalendarModal();
        openModal("calendarModal");
    };
    document.getElementById("openCalendarBtn").addEventListener("click", openCal);
    document.getElementById("dateCenterTrigger").addEventListener("click", openCal);

    document.getElementById("addBirthdayBtn").addEventListener("click", () => {
        renderCustomBirthdaysModal();
        openModal("birthdayModal");
    });

    document.getElementById("addBirthdayForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("bdayNameInput").value.trim();
        const date = document.getElementById("bdayDateInput").value.trim();
        const note = document.getElementById("bdayNoteInput").value.trim();
        if (!name || !date) return;

        state.customBirthdays.push({
            date,
            ru: `День рождения: ${name}`,
            en: `Birthday: ${name}`,
            descRu: note || "Поздравить с днём рождения!",
            descEn: note || "Wish a Happy Birthday!",
            regionRu: "Знакомые",
            regionEn: "Friends"
        });

        localStorage.setItem(STORAGE_KEYS.CUSTOM_BDAYS, JSON.stringify(state.customBirthdays));
        e.target.reset();
        renderCustomBirthdaysModal();
        renderCurrentDateView();
    });

    document.getElementById("regionBadge").addEventListener("click", () => {
        state.regionClicks += 1;
        clearTimeout(state.regionClickTimer);
        state.regionClickTimer = setTimeout(() => { state.regionClicks = 0; }, 1600);
        if (state.regionClicks >= 5) {
            state.regionClicks = 0;
            toggleSecretMode();
        }
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeAllModals();
        if (e.altKey && (e.code === "KeyB" || e.key.toLowerCase() === "b" || e.key.toLowerCase() === "и")) {
            e.preventDefault();
            toggleSecretMode();
        }
    });

    document.querySelectorAll("[data-close-modal]").forEach((btn) => {
        btn.addEventListener("click", () => closeModal(btn.getAttribute("data-close-modal")));
    });

    document.querySelectorAll(".modal-overlay").forEach((overlay) => {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) overlay.classList.remove("open");
        });
    });

    const searchInput = document.getElementById("searchInput");
    const clearBtn = document.getElementById("clearSearchBtn");

    searchInput.addEventListener("input", (e) => {
        const val = e.target.value;
        if (val.trim().toLowerCase() === "др" || val.trim().toLowerCase() === "bday") {
            toggleSecretMode(true);
            searchInput.value = "";
            state.searchQuery = "";
            clearBtn.classList.add("hidden");
            return;
        }
        state.searchQuery = val;
        clearBtn.classList.toggle("hidden", !val);
        renderCurrentDateView();
    });

    clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        state.searchQuery = "";
        clearBtn.classList.add("hidden");
        renderCurrentDateView();
    });

    document.querySelectorAll(".filter-chip").forEach((chip) => {
        chip.addEventListener("click", () => {
            const cat = chip.getAttribute("data-category");
            const baseCats = ["international", "official", "professional", "fun", ...(state.secretUnlocked ? ["birthdays"] : [])];

            if (cat === "all") {
                const allActive = baseCats.every((c) => state.activeCategories.has(c));
                if (allActive) {
                    state.activeCategories.clear();
                } else {
                    baseCats.forEach((c) => state.activeCategories.add(c));
                }
            } else {
                if (state.activeCategories.has(cat)) {
                    state.activeCategories.delete(cat);
                } else {
                    state.activeCategories.add(cat);
                }
            }

            document.querySelectorAll(".filter-chip").forEach((c) => {
                const cKey = c.getAttribute("data-category");
                if (cKey === "all") {
                    c.classList.toggle("active", baseCats.every((k) => state.activeCategories.has(k)));
                } else {
                    c.classList.toggle("active", state.activeCategories.has(cKey));
                }
            });

            renderCurrentDateView();
        });
    });

    document.getElementById("resetFiltersBtn").addEventListener("click", () => {
        ["international", "official", "professional", "fun"].forEach((c) => state.activeCategories.add(c));
        if (state.secretUnlocked) state.activeCategories.add("birthdays");
        state.searchQuery = "";
        searchInput.value = "";
        clearBtn.classList.add("hidden");
        document.querySelectorAll(".filter-chip").forEach((c) => c.classList.add("active"));
        renderCurrentDateView();
    });

    window.addEventListener("storage", (e) => {
        if (e.key === STORAGE_KEYS.THEME && e.newValue) applyTheme(e.newValue);
        if (e.key === STORAGE_KEYS.LANG && e.newValue) applyLanguage(e.newValue, false);
    });
}

document.addEventListener("DOMContentLoaded", initApp);