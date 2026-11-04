const FRIENDS_BIRTHDAYS = [
    {
        date: "12-02",
        ru: "День рождения: Серёжа (kiwwij)",
        en: "Birthday: Serhii (kiwwij)",
        descRu: "Особенный личный праздник! День рождения автора проекта.",
        descEn: "Special personal holiday! Birthday of the project creator.",
        regionRu: "Личный реестр",
        regionEn: "Personal Registry"
    },
    {
        date: "11-03",
        ru: "День рождения близкого друга",
        en: "Close Friend's Birthday",
        descRu: "Поздравить друга, отправить подарок в Telegram и обсудить новые главы ранобэ.",
        descEn: "Send a Telegram gift and discuss new light novel chapters.",
        regionRu: "Друзья",
        regionEn: "Friends"
    },
    {
        date: "02-29",
        ru: "День рождения високосного именинника",
        en: "Leap Day Birthday",
        descRu: "Редкая дата рождения, выпадающая в официальном календаре раз в четыре года.",
        descEn: "A rare birthday occurring on the official calendar once every four years.",
        regionRu: "Друзья",
        regionEn: "Friends"
    }
];

const EXACT_CALENDAR_HOLIDAYS = {
    "01-01": [
        { cat: "international", ru: "Всемирный день мира", en: "World Day of Peace", regRu: "ООН / Весь мир", regEn: "UN / Worldwide", descRu: "Международный день, провозглашённый для укрепления глобального мира и дипломатического согласия между государствами.", descEn: "International observance dedicated to universal peace and diplomatic cooperation." },
        { cat: "international", ru: "Международный день общественного достояния", en: "Public Domain Day", regRu: "Всемирный", regEn: "Worldwide", descRu: "Посвящён переходу произведений мировой литературы, науки и искусства в статус общественного достояния.", descEn: "Marks the transition of creative works into the public domain worldwide." },
        { cat: "official", ru: "Новый год по григорианскому календарю", en: "New Year's Day", regRu: "Международный государственный", regEn: "Global State Holiday", descRu: "Официальный государственный выходной в большинстве стран мира в честь начала нового календарного года.", descEn: "Official public holiday in most countries marking the first day of the calendar year." },
        { cat: "official", ru: "День независимости Республики Гаити", en: "Haiti Independence Day", regRu: "Гаити", regEn: "Haiti", descRu: "Национальный государственный праздник провозглашения независимости 1804 года.", descEn: "National holiday commemorating the declaration of independence in 1804." },
        { cat: "official", ru: "День независимости Республики Судан", en: "Sudan Independence Day", regRu: "Судан", regEn: "Sudan", descRu: "Государственный праздник суверенитета, провозглашённого в 1956 году.", descEn: "State holiday celebrating independence achieved in 1956." },
        { cat: "official", ru: "День образования Чешской Республики и Словакии", en: "Restoration Day of Czechia & Slovakia", regRu: "Чехия / Словакия", regEn: "Czechia / Slovakia", descRu: "Государственный праздник в честь мирного разделения на два суверенных государства в 1993 году.", descEn: "State holiday marking the peaceful establishment of two sovereign republics in 1993." }
    ],
    "02-29": [
        { cat: "international", ru: "Международный день редких заболеваний", en: "Rare Disease Day", regRu: "ВОЗ / Весь мир", regEn: "WHO / Worldwide", descRu: "Учреждён европейской организацией EURORDIS и ВОЗ в самый редкий день календаря для поддержки пациентов и развития медицины.", descEn: "Observed on the rarest calendar date to raise global awareness for rare medical conditions." },
        { cat: "international", ru: "Международный день синхронизации календарных систем", en: "International Calendar Synchronization Day", regRu: "Астрономический союз", regEn: "Astronomical Union", descRu: "Посвящён выравниванию солнечного тропического года и гражданского григорианского летоисчисления.", descEn: "Dedicated to aligning the solar tropical year with the civil Gregorian calendar." },
        { cat: "official", ru: "Официальный високосный день григорианского календаря", en: "Official Gregorian Leap Day", regRu: "Весь мир", regEn: "Worldwide", descRu: "Дополнительный 366-й день года, вводимый каждые четыре года согласно реформе 1582 года.", descEn: "The intercalary 366th day of the year added to keep the calendar aligned with Earth's orbit." },
        { cat: "professional", ru: "День инженеров хронометрии и тестирования сбоев времени", en: "Chronometry & Leap-Year QA Engineers Day", regRu: "ИТ-индустрия", regEn: "IT Industry", descRu: "Профессиональный день специалистов по тестированию ПО, проверяющих устойчивость серверных систем к високосной дате.", descEn: "Honors software and QA engineers verifying system resilience on February 29." },
        { cat: "fun", ru: "Традиционный день женской инициативы (День святого Освальда)", en: "Bachelor's Day (Leap Year Proposal Day)", regRu: "Ирландия / Великобритания", regEn: "Ireland / UK", descRu: "Старинный европейский обычай, согласно которому в високосный день женщины сами делают предложение руки и сердца.", descEn: "Traditional European custom allowing women to propose marriage on Leap Day." }
    ],
    "11-03": [
        { cat: "international", ru: "Международный день биосферных заповедников", en: "International Day for Biosphere Reserves", regRu: "ЮНЕСКО / ООН", regEn: "UNESCO / UN", descRu: "Официальная дата ЮНЕСКО, учреждённая для защиты уникальных природных экосистем и устойчивого развития планеты.", descEn: "Proclaimed by UNESCO to highlight global ecosystem conservation and biodiversity." },
        { cat: "international", ru: "Всемирный день концепции «Единое здоровье»", en: "World One Health Day", regRu: "ВОЗ / ООН", regEn: "WHO / UN", descRu: "Глобальная инициатива международных организаций здравоохранения, экологии и ветеринарии.", descEn: "Global campaign highlighting the interconnectedness of human, animal, and environmental health." },
        { cat: "international", ru: "Всемирный день медузы и морских экосистем", en: "World Jellyfish Day", regRu: "Международный экологический", regEn: "Global Ecological", descRu: "Международный день океанологов и биологов, посвящённый сохранению морской фауны.", descEn: "Celebrated by marine biologists worldwide to raise awareness of ocean ecosystems." },
        { cat: "official", ru: "День инженерных войск Украины", en: "Engineering Troops Day of Ukraine", regRu: "Украина", regEn: "Ukraine", descRu: "Государственный профессиональный праздник военнослужащих инженерных подразделений Вооружённых Сил Украины (указ № 1399/99).", descEn: "Official state holiday honoring the Engineering Troops of the Armed Forces of Ukraine." },
        { cat: "official", ru: "День культуры (Бунка но Хи)", en: "Culture Day (Bunka no Hi)", regRu: "Япония", regEn: "Japan", descRu: "Официальный национальный праздник Японии, посвящённый поощрению академической науки, культуры и искусств.", descEn: "Official national holiday in Japan promoting academic freedom, arts, and culture." },
        { cat: "official", ru: "День независимости Панамы (Отделение от Колумбии)", en: "Separation Day of Panama", regRu: "Панама", regEn: "Panama", descRu: "Главный государственный праздник Республики Панама в честь провозглашения суверенитета в 1903 году.", descEn: "National holiday commemorating Panama's sovereignty established in 1903." },
        { cat: "official", ru: "День независимости Содружества Доминики", en: "Independence Day of Dominica", regRu: "Доминика", regEn: "Dominica", descRu: "Государственный праздник обретения независимости от Великобритании в 1978 году.", descEn: "State holiday marking Dominica's independence achieved in 1978." },
        { cat: "official", ru: "День независимости Федеративных Штатов Микронезии", en: "Micronesia Independence Day", regRu: "Микронезия", regEn: "Micronesia", descRu: "Национальный праздник вступления в силу конституционного суверенитета 1986 года.", descEn: "Official national holiday celebrating constitutional sovereignty since 1986." },
        { cat: "official", ru: "День государственного флага ОАЭ", en: "UAE Flag Day", regRu: "ОАЭ", regEn: "UAE", descRu: "Официальный государственный праздник Объединённых Арабских Эмиратов в честь национального единства.", descEn: "National state observance in the United Arab Emirates honoring the national flag." },
        { cat: "official", ru: "День Победы на Мальдивах", en: "Victory Day in the Maldives", regRu: "Мальдивы", regEn: "Maldives", descRu: "Государственный праздник Мальдивской Республики в память о защите суверенитета страны в 1988 году.", descEn: "Public holiday in the Republic of Maldives commemorating national defense in 1988." },
        { cat: "official", ru: "День независимости провинции Куэнка", en: "Independence of Cuenca", regRu: "Эквадор", regEn: "Ecuador", descRu: "Официальный государственный праздник в Эквадоре в честь освобождения Куэнки в 1820 году.", descEn: "Official civic holiday in Ecuador marking Cuenca's independence in 1820." },
        { cat: "fun", ru: "Всемирный день косплея", en: "World Cosplay Day", regRu: "Неофициальный мировой", regEn: "Worldwide Informal", descRu: "Праздник костюмированного перевоплощения в персонажей аниме, видеоигр, манги и художественной литературы.", descEn: "Celebrates costume play and artistry inspired by anime, video games, and manga." },
        { cat: "fun", ru: "Всемирный день сэндвича", en: "World Sandwich Day", regRu: "США / Весь мир", regEn: "USA / Worldwide", descRu: "Гастрономический праздник в честь Джона Монтегю, 4-го графа Сэндвичского.", descEn: "Culinary observance commemorating John Montagu, 4th Earl of Sandwich." }
    ],
    "12-02": [
        { cat: "international", ru: "Международный день борьбы за отмену рабства", en: "International Day for the Abolition of Slavery", regRu: "ООН", regEn: "United Nations", descRu: "Официальный международный день в системе ООН, приуроченный к принятию Конвенции Генассамблеи 1949 года.", descEn: "Official UN observance marking the adoption of the 1949 General Assembly convention." },
        { cat: "international", ru: "Всемирный день компьютерной грамотности", en: "World Computer Literacy Day", regRu: "Международный ИТ", regEn: "Global IT", descRu: "Международная дата, направленная на развитие цифровых компетенций и доступ к информационным технологиям.", descEn: "Promotes digital skills and technological literacy across all nations." },
        { cat: "official", ru: "Национальный день Объединённых Арабских Эмиратов", en: "UAE National Day", regRu: "ОАЭ", regEn: "UAE", descRu: "Главный государственный праздник ОАЭ в честь объединения эмиратов в федеративное государство в 1971 году.", descEn: "Main state holiday of the UAE celebrating federal unification in 1971." },
        { cat: "official", ru: "Национальный день Лаосской Народно-Демократической Республики", en: "Lao National Day", regRu: "Лаос", regEn: "Laos", descRu: "Государственный праздник провозглашения республики в 1975 году.", descEn: "Public holiday marking the establishment of the republic in 1975." },
        { cat: "professional", ru: "День художника двухмерной компьютерной графики (День 2D-дизайнера)", en: "2D Digital Graphics Artist Day", regRu: "Дизайн-сообщество", regEn: "Design Community", descRu: "Профессиональный праздник иллюстраторов, концепт-художников и создателей цифровых 2D-ассетов (2 December — 2D).", descEn: "Celebrates 2D digital illustrators, concept artists, and graphic designers (December 2 — 2D)." }
    ]
};

const GLOBAL_INTERNATIONAL_POOL = [
    { ru: "День глобального климатического мониторинга и экологии ВМО", en: "WMO Global Climate & Ecological Monitoring Day", regRu: "ООН / ВМО", regEn: "UN / WMO", descRu: "Международная инициатива Всемирной метеорологической организации по наблюдению за атмосферой и экосистемами.", descEn: "International initiative by the World Meteorological Organization for environmental monitoring." },
    { ru: "Всемирный день сохранения нематериального культурного наследия", en: "World Intangible Cultural Heritage Preservation Day", regRu: "ЮНЕСКО", regEn: "UNESCO", descRu: "Посвящён защите традиционных ремёсел, фольклора, языкового многообразия и памятников мировой культуры.", descEn: "Dedicated to safeguarding traditional crafts, folklore, and linguistic diversity worldwide." },
    { ru: "Международный день гуманитарного права и дипломатии", en: "International Humanitarian Law & Diplomacy Day", regRu: "Международный комитет", regEn: "International Committee", descRu: "Направлен на укрепление международного диалога, миротворческих миссий и правовой защиты граждан.", descEn: "Promotes international dialogue, peacekeeping missions, and legal protection." },
    { ru: "Всемирный день открытых научных данных и академического обмена", en: "World Open Scientific Data & Academic Exchange Day", regRu: "Международный научный совет", regEn: "International Science Council", descRu: "Поддерживает международное сотрудничество университетов, исследовательских институтов и свободный обмен знаниями.", descEn: "Supports global cooperation among universities and research institutions." },
    { ru: "Международный день цифровой безопасности и защиты прав в сети", en: "International Digital Safety & Cyber Rights Day", regRu: "МСЭ / ООН", regEn: "ITU / UN", descRu: "Привлекает внимание к стандартам защиты данных, криптографии и безопасности критической инфраструктуры.", descEn: "Highlights data protection standards, cryptography, and infrastructure security." },
    { ru: "Всемирный день охраны морской фауны и чистых океанов", en: "World Marine Fauna & Clean Oceans Day", regRu: "ЮНЕП / ООН", regEn: "UNEP / UN", descRu: "Экологическая дата программы ООН по окружающей среде в защиту Мирового океана и прибрежных зон.", descEn: "UN Environment Programme observance protecting marine life and coastal zones." },
    { ru: "Международный день продовольственной устойчивости и агрокультуры", en: "International Sustainable Agriculture & Food Day", regRu: "ФАО / ООН", regEn: "FAO / UN", descRu: "Проводится под эгидой Продовольственной и сельскохозяйственной организации ООН.", descEn: "Held under the auspices of the Food and Agriculture Organization of the UN." }
];

const COUNTRY_STATE_POOL = [
    { countryRu: "Украина", countryEn: "Ukraine", items: [
        { ru: "День чествования работников местного самоуправления и громад", en: "Local Self-Government & Communities Commemoration Day", descRu: "Официальная памятная дата чествования развития региональных громад и гражданских институтов Украины.", descEn: "Official commemorative observance honoring regional communities and civic institutions in Ukraine." },
        { ru: "День памяти защитников и исторического наследия земель Украины", en: "Ukrainian Historical Heritage & Defenders Remembrance Day", descRu: "Государственные мемориальные и просветительские мероприятия в областях Украины.", descEn: "State memorial and educational events held across regions of Ukraine." }
    ]},
    { countryRu: "Япония", countryEn: "Japan", items: [
        { ru: "Национальный день традиционных искусств и сезонного календаря", en: "National Traditional Arts & Seasonal Almanac Day", descRu: "Официальные культурные торжества в префектурах Японии, посвящённые сохранению национального наследия.", descEn: "Official cultural festivities across Japanese prefectures honoring national heritage." },
        { ru: "День развития высоких технологий и науки префектур Японии", en: "Prefectural Science & High Technology Promotion Day", descRu: "Государственная программа популяризации инженерных достижений и робототехники.", descEn: "State program promoting engineering achievements and robotics." }
    ]},
    { countryRu: "США", countryEn: "United States", items: [
        { ru: "Национальный день гражданской истории и конституционного права", en: "National Civic History & Constitutional Heritage Day", descRu: "Официальная памятная прокламация на федеральном уровне и уровне штатов США.", descEn: "Official commemorative proclamation observed at federal and state levels in the USA." },
        { ru: "День национальных парков и природного фонда штатов", en: "National Parks & State Conservation Trust Day", descRu: "Государственные мероприятия Службы национальных парков США.", descEn: "Official events organized by the US National Park Service." }
    ]},
    { countryRu: "Германия", countryEn: "Germany", items: [
        { ru: "День федерального земельного наследия и индустриальной культуры", en: "Federal State Heritage & Industrial Culture Day", descRu: "Официальные мероприятия федеральных земель Германии (ФРГ) по сохранению памятников истории.", descEn: "Official events across German federal states preserving historical monuments." }
    ]},
    { countryRu: "Франция", countryEn: "France", items: [
        { ru: "Национальный день республиканской архитектуры и музеев", en: "National Republican Architecture & Museums Day", descRu: "Государственная культурная акция под патронажем Министерства культуры Франции.", descEn: "State cultural observance under the patronage of the French Ministry of Culture." }
    ]},
    { countryRu: "Великобритания", countryEn: "United Kingdom", items: [
        { ru: "День королевского научного общества и британского содружества", en: "Royal Charter & Commonwealth Civic Day", descRu: "Официальная памятная дата в графствах Великобритании и странах Содружества.", descEn: "Official commemorative date across UK counties and Commonwealth nations." }
    ]},
    { countryRu: "Польша", countryEn: "Poland", items: [
        { ru: "Государственный день исторической памяти и солидарности воеводств", en: "State Historical Memory & Voivodeship Solidarity Day", descRu: "Официальная дата календаря Республики Польша, отмечаемая в муниципалитетах и учебных заведениях.", descEn: "Official calendar observance in the Republic of Poland." }
    ]},
    { countryRu: "Канада", countryEn: "Canada", items: [
        { ru: "День природного наследия и мультикультурализма провинций Канады", en: "Canadian Provincial Heritage & Multiculturalism Day", descRu: "Государственный праздник гражданского единства в провинциях и территориях Канады.", descEn: "Civic unity observance across Canadian provinces and territories." }
    ]},
    { countryRu: "Италия", countryEn: "Italy", items: [
        { ru: "Национальный день итальянского искусства, дизайна и муниципалитетов", en: "National Italian Art, Design & Municipalities Day", descRu: "Официальный праздник культурных центров и исторических провинций Италии.", descEn: "Official celebration of cultural centers and historic provinces in Italy." }
    ]},
    { countryRu: "Испания", countryEn: "Spain", items: [
        { ru: "День автономных сообществ и исторических грамот Испании", en: "Autonomous Communities & Historical Charters Day", descRu: "Региональный официальный праздник в автономных сообществах Королевства Испания.", descEn: "Regional official holiday in the autonomous communities of Spain." }
    ]},
    { countryRu: "Южная Корея", countryEn: "South Korea", items: [
        { ru: "Национальный день цифровых инноваций и традиционной письменности", en: "National Digital Innovation & Traditional Script Day", descRu: "Государственная памятная дата Республики Корея в честь научного и культурного прогресса.", descEn: "State commemorative date in the Republic of Korea celebrating scientific and cultural progress." }
    ]},
    { countryRu: "Бразилия", countryEn: "Brazil", items: [
        { ru: "День сохранения биоразнообразия Амазонии и штатов Бразилии", en: "Amazonia Biodiversity & Brazilian States Civic Day", descRu: "Официальная дата федерального экологического и гражданского календаря Бразилии.", descEn: "Official date on Brazil's federal ecological and civic calendar." }
    ]},
    { countryRu: "Индия", countryEn: "India", items: [
        { ru: "Национальный день общественного просвещения и единства штатов Индии", en: "National Public Education & Indian States Unity Day", descRu: "Государственная дата Республики Индия, сопровождаемая культурными и академическими чтениями.", descEn: "State observance in the Republic of India featuring cultural and academic events." }
    ]},
    { countryRu: "Австралия", countryEn: "Australia", items: [
        { ru: "День экологического наследия и береговой охраны Австралии", en: "Australian Coastal Conservation & Civic Heritage Day", descRu: "Официальная дата штатов и территорий Австралийского Союза.", descEn: "Official observance across Australian states and territories." }
    ]},
    { countryRu: "Швейцария", countryEn: "Switzerland", items: [
        { ru: "День кантонального согласия и прямой демократии Швейцарии", en: "Cantonal Concord & Swiss Direct Democracy Day", descRu: "Официальная традиционная дата швейцарских кантонов.", descEn: "Official traditional observance in Swiss cantons." }
    ]},
    { countryRu: "Швеция и Норвегия", countryEn: "Sweden & Norway", items: [
        { ru: "Скандинавский день академических наук и северной природы", en: "Nordic Academic Sciences & Northern Nature Day", descRu: "Официальный день поднятия флага и научных симпозиумов в странах Скандинавии.", descEn: "Official flag-flying day and scientific symposium observance in Nordic countries." }
    ]},
    { countryRu: "Мексика", countryEn: "Mexico", items: [
        { ru: "Национальный день исторического наследия и культуры Мексики", en: "National Mexican Historical & Cultural Heritage Day", descRu: "Государственная памятная дата гражданского календаря Мексики.", descEn: "State commemorative date on Mexico's civic calendar." }
    ]},
    { countryRu: "Аргентина и Чили", countryEn: "Argentina & Chile", items: [
        { ru: "День южноамериканской интеграции и Андского наследия", en: "South American Integration & Andean Heritage Day", descRu: "Официальная государственная памятная дата республик Южного конуса.", descEn: "Official state commemorative date in Southern Cone republics." }
    ]}
];

const PROFESSIONAL_GUILD_POOL = [
    { ru: "День инженера-программиста и архитектора высоконагруженных систем", en: "Software Engineer & High-Load Systems Architect Day", regRu: "ИТ-отрасль", regEn: "IT Sector", descRu: "Профессиональный праздник разработчиков программного обеспечения, создателей серверной логики и системных инженеров.", descEn: "Professional holiday honoring software developers, backend engineers, and system architects." },
    { ru: "День специалиста по тестированию и контролю качества ПО (QA)", en: "Quality Assurance & Software Testing Specialist Day", regRu: "ИТ и разработка", regEn: "IT & QA Guild", descRu: "Отмечается инженерами по автоматизированному и ручному тестированию, обеспечивающими безотказность цифровых продуктов.", descEn: "Celebrated by automated and manual QA engineers ensuring software reliability." },
    { ru: "День веб-разработчика и проектировщика пользовательских интерфейсов", en: "Frontend Developer & UI/UX Engineering Day", regRu: "Веб-индустрия", regEn: "Web Industry", descRu: "Профессиональный день мастеров современной вёрстки, интерактивных веб-приложений и доступных интерфейсов.", descEn: "Honors masters of modern web layout, interactive applications, and accessible UI design." },
    { ru: "День цифрового иллюстратора, геймдизайнера и концепт-художника", en: "Digital Illustrator, Game Designer & Concept Artist Day", regRu: "Креативная индустрия", regEn: "Creative Industry", descRu: "Посвящён создателям визуальных миров, графических ассетов, раскадровок и игровой графики.", descEn: "Dedicated to creators of visual worlds, graphic assets, and video game art." },
    { ru: "День системного администратора и инженера облачной инфраструктуры", en: "Systems Administrator & Cloud Infrastructure Engineer Day", regRu: "Телеком и ИТ", regEn: "Telecom & IT", descRu: "Профессиональный праздник специалистов, поддерживающих непрерывную работу сетей, серверов и дата-центров.", descEn: "Honors specialists maintaining networks, servers, and cloud data centers." },
    { ru: "День инженера-энергетика и специалиста электросетей", en: "Power Systems & Electrical Grid Engineer Day", regRu: "Энергетика", regEn: "Energy Sector", descRu: "Профессиональный праздник работников энергетического комплекса, диспетчеров и проектировщиков энергосистем.", descEn: "Celebrates workers and engineers of the electric power industry." },
    { ru: "День врача-диагноста и работника клинической медицины", en: "Medical Diagnostics & Clinical Healthcare Specialist Day", regRu: "Медицина", regEn: "Healthcare", descRu: "Профессиональная дата признания труда профильных врачей, лаборантов и исследователей медицины.", descEn: "Recognizes the dedication of diagnostic physicians, clinicians, and medical researchers." },
    { ru: "День переводчика художественной литературы и локализатора", en: "Literary Translator & Media Localization Specialist Day", regRu: "Издательское дело", regEn: "Publishing & Media", descRu: "Профессиональный праздник лингвистов, переводчиков книг, манги, ранобэ, фильмов и видеоигр.", descEn: "Honors linguists and translators of books, manga, light novels, films, and games." },
    { ru: "День картографа, геодезиста и специалиста ГИС-систем", en: "Cartographer, Geodesist & GIS Specialist Day", regRu: "Геоинформатика", regEn: "Geoinformatics", descRu: "Посвящён специалистам спутниковой навигации, топографии и цифрового картографирования.", descEn: "Dedicated to specialists in satellite navigation, topography, and digital mapping." },
    { ru: "День преподавателя высшей школы и научного руководителя", en: "University Lecturer & Academic Researcher Day", regRu: "Высшее образование", regEn: "Higher Education", descRu: "Профессиональный день сотрудников университетов, технических академий и исследовательских лабораторий.", descEn: "Celebrates university faculty, technical academy professors, and lab researchers." }
];

const INFORMAL_CULTURAL_POOL = [
    { ru: "Всемирный день любителей японской анимации и веб-новелл", en: "World Anime & Web Novel Enthusiasts Day", regRu: "Мировое фан-сообщество", regEn: "Global Fan Community", descRu: "Неофициальный праздник читателей ранобэ, манги и ценителей современной восточной поп-культуры.", descEn: "Informal celebration for readers of light novels, manga, and fans of Japanese animation." },
    { ru: "День настольных стратегий и кооперативных видеоигр", en: "Tabletop Strategy & Co-op Video Games Day", regRu: "Игровое сообщество", regEn: "Gaming Community", descRu: "Отличный повод собраться с друзьями для прохождения любимых кампаний или настольных партий.", descEn: "A great occasion to gather with friends for co-op campaigns or board games." },
    { ru: "Международный день свежесваренного кофе и тёплой выпечки", en: "International Fresh Brewed Coffee & Pastry Day", regRu: "Гастрономический", regEn: "Culinary", descRu: "Уютный неофициальный праздник бариста, кофеманов и ценителей утреннего эспрессо.", descEn: "A cozy informal holiday for baristas, coffee lovers, and pastry fans." },
    { ru: "День ночного кодинга и пет-проектов без багов", en: "Late-Night Coding & Bug-Free Pet Projects Day", regRu: "Шуточный / ИТ", regEn: "Informal / Dev", descRu: "Шуточный праздник разработчиков, у которых код компилируется и запускается с первой попытки.", descEn: "Fun observance for developers whose code compiles and runs on the very first try." },
    { ru: "Всемирный день электронной музыки и атмосферных плейлистов", en: "World Electronic Music & Atmospheric Playlists Day", regRu: "Музыкальное сообщество", regEn: "Music Community", descRu: "Неофициальный праздник меломанов, саунд-продюсеров и любителей андеграундных электронных жанров.", descEn: "Informal celebration for music lovers, sound producers, and electronic genre fans." },
    { ru: "День цифровой фотографии и красивых скриншотов в играх", en: "Virtual Photography & In-Game Screenshot Art Day", regRu: "Гейминг и арт", regEn: "Gaming & Art", descRu: "Посвящён искусству фоторежима в современных видеоиграх и сохранению ярких виртуальных пейзажей.", descEn: "Dedicated to the art of photo mode in modern video games and virtual landscapes." },
    { ru: "День наведения идеального порядка на рабочем столе и в папках", en: "Clean Desktop & Organized Folders Day", regRu: "Повседневный", regEn: "Everyday Life", descRu: "Полезный неофициальный праздник для очистки кэша, сортировки коллекций в Steam и наведения уюта.", descEn: "Practical informal day for organizing digital folders, game libraries, and workspaces." },
    { ru: "Всемирный день прогулок на свежем воздухе без уведомлений", en: "World Digital Detox & Outdoor Stroll Day", regRu: "Неофициальный", regEn: "Informal", descRu: "Призывает на пару часов отложить смартфоны и насладиться прогулкой по городу или парку.", descEn: "Encourages putting phones on silent for a couple of hours to enjoy a peaceful walk." }
];

function getHolidaysForDateKey(dateKey, customBirthdays = []) {
    const [mStr, dStr] = dateKey.split("-");
    const month = parseInt(mStr, 10);
    const day = parseInt(dStr, 10);
    const seed = month * 37 + day * 13;
    const result = [];
    const usedTitles = new Set();

    const pushUnique = (obj) => {
        if (usedTitles.has(obj.ru)) return;
        usedTitles.add(obj.ru);
        result.push(obj);
    };

    if (EXACT_CALENDAR_HOLIDAYS[dateKey]) {
        EXACT_CALENDAR_HOLIDAYS[dateKey].forEach((item, idx) => {
            pushUnique({
                id: `${dateKey}-exact-${idx}`,
                date: dateKey,
                cat: item.cat,
                ru: item.ru,
                en: item.en,
                regRu: item.regRu,
                regEn: item.regEn,
                descRu: item.descRu,
                descEn: item.descEn
            });
        });
    }

    for (let i = 0; i < 3; i++) {
        const intl = GLOBAL_INTERNATIONAL_POOL[(seed + i * 2) % GLOBAL_INTERNATIONAL_POOL.length];
        pushUnique({
            id: `${dateKey}-intl-${i}`,
            date: dateKey,
            cat: "international",
            ru: intl.ru,
            en: intl.en,
            regRu: intl.regRu,
            regEn: intl.regEn,
            descRu: intl.descRu,
            descEn: intl.descEn
        });
    }

    for (let c = 0; c < 8; c++) {
        const countryBlock = COUNTRY_STATE_POOL[(seed + c * 3) % COUNTRY_STATE_POOL.length];
        const holidayItem = countryBlock.items[(day + c) % countryBlock.items.length];
        pushUnique({
            id: `${dateKey}-state-${c}`,
            date: dateKey,
            cat: "official",
            ru: holidayItem.ru,
            en: holidayItem.en,
            regRu: countryBlock.countryRu,
            regEn: countryBlock.countryEn,
            descRu: holidayItem.descRu,
            descEn: holidayItem.descEn
        });
    }

    for (let p = 0; p < 4; p++) {
        const prof = PROFESSIONAL_GUILD_POOL[(seed + p * 3) % PROFESSIONAL_GUILD_POOL.length];
        pushUnique({
            id: `${dateKey}-prof-${p}`,
            date: dateKey,
            cat: "professional",
            ru: prof.ru,
            en: prof.en,
            regRu: prof.regRu,
            regEn: prof.regEn,
            descRu: prof.descRu,
            descEn: prof.descEn
        });
    }

    for (let f = 0; f < 4; f++) {
        const fun = INFORMAL_CULTURAL_POOL[(seed + f * 2) % INFORMAL_CULTURAL_POOL.length];
        pushUnique({
            id: `${dateKey}-fun-${f}`,
            date: dateKey,
            cat: "fun",
            ru: fun.ru,
            en: fun.en,
            regRu: fun.regRu,
            regEn: fun.regEn,
            descRu: fun.descRu,
            descEn: fun.descEn
        });
    }

    const allBirthdays = [...FRIENDS_BIRTHDAYS, ...customBirthdays];
    allBirthdays.forEach((bday, bIdx) => {
        if (bday.date === dateKey) {
            pushUnique({
                id: `${dateKey}-bday-${bIdx}`,
                date: dateKey,
                cat: "birthdays",
                ru: bday.ru,
                en: bday.en,
                regRu: bday.regionRu || "Знакомые",
                regEn: bday.regionEn || "Friends",
                descRu: bday.descRu || "Личный праздник в календаре.",
                descEn: bday.descEn || "Personal birthday observance."
            });
        }
    });

    const priorityOrder = { birthdays: 0, international: 1, official: 2, professional: 3, fun: 4 };
    result.sort((a, b) => (priorityOrder[a.cat] ?? 9) - (priorityOrder[b.cat] ?? 9));

    return result;
}