const characters = [
    {
        rank: null, img: 'top-10-strongest-characters-in-mushoku-tensei/1.webp',
        ru: { 
            name: 'Хитогами (Бог Человеческий)', 
            desc: `<p>Хотя он не является бойцом в классическом понимании и не числится в Мировых Силах, Хитогами — едва ли не самое могущественное существо во вселенной. Он обитает в Пустом Мире, куда практически невозможно добраться.</p>
                   <p><strong>Сила и способности:</strong> Его главная сила — абсолютное предвидение и чтение мыслей. Он способен видеть множество вариантов будущего и манипулировать судьбами людей через сны и видения.</p>
                   <p><strong>Слабость:</strong> Его предвидение слепнет, когда дело касается Орстеда (из-за проклятия) и потомков Рудеуса из других миров.</p>` 
        },
        en: { 
            name: 'Hitogami (Human God)', 
            desc: `<p>Although not a fighter in the classic sense and unlisted in the World Powers, Hitogami is arguably the most powerful entity in this universe. He resides in the Void World, which is nearly impossible to reach.</p>
                   <p><strong>Power & Abilities:</strong> His main power is absolute foresight and mind reading. He can see multiple futures and manipulate people's fates through dreams and visions.</p>
                   <p><strong>Weakness:</strong> His foresight is blinded when it comes to Orsted (due to a curse) and Rudeus's descendants from other worlds.</p>` 
        }
    },
    {
        rank: null, img: 'top-10-strongest-characters-in-mushoku-tensei/3.webp',
        ru: { 
            name: 'Демон-Дракон Лаплас (Изначальный)', 
            desc: `<p>Историческая фигура невероятной мощи. Изначальный Лаплас был вторым Богом Драконов и самым верным соратником первого.</p>
                   <p><strong>Сила и способности:</strong> До раскола души надвое он обладал колоссальными физическими способностями драконов, непревзойденным интеллектом и магией демонов. Создатель монумента Семи Великих Мировых Сил.</p>` 
        },
        en: { 
            name: 'Demon Dragon Laplace (Original)', 
            desc: `<p>A historical figure of incredible power. The Original Laplace was the second Dragon God and the most loyal companion of the first.</p>
                   <p><strong>Power & Abilities:</strong> Before his soul was split, he possessed the colossal physical abilities of dragons, unmatched intellect, and demon magic. Creator of the Seven Great World Powers monument.</p>` 
        }
    },
    {
        rank: 1, img: 'top-10-strongest-characters-in-mushoku-tensei/3.webp',
        ru: { 
            name: 'Бог Техник (Первая половина Лапласа)', 
            desc: `<p>Занимает 1-е место в рейтинге Семи Мировых Сил.</p>
                   <p><strong>Сила и способности:</strong> Унаследовал физическую мощь Изначального Лапласа, знания боевых искусств и память, но полностью потерял способность использовать магию. Непревзойденный мастер ближнего боя. В текущем сюжете его местонахождение неизвестно.</p>` 
        },
        en: { 
            name: 'Technique God (First Half of Laplace)', 
            desc: `<p>Ranks 1st in the Seven Great World Powers.</p>
                   <p><strong>Power & Abilities:</strong> Inherited the physical might of the Original Laplace, martial arts knowledge, and memories, but entirely lost the ability to use magic. An unmatched close-combat master. His current whereabouts are unknown.</p>` 
        }
    },
    {
        rank: 2, img: 'https://i.pinimg.com/736x/ff/9a/10/ff9a1094849228a52dfaa6b20b266ef8.jpg',
        ru: { 
            name: 'Орстед (Бог Драконов)', 
            desc: `<p>Официально занимает 2-е место среди Мировых Сил, но фактически является сильнейшим активным существом в мире.</p>
                   <p><strong>Сила и способности:</strong> Владеет абсолютно всеми стилями меча на божественном уровне и знает все заклинания. Его Боевая Аура (Токи) настолько плотная, что пробить её могут лишь единицы.</p>
                   <p><strong>Проклятия:</strong> Вынужден экономить силы из-за бесконечно долгого восстановления маны. Кроме того, все живые существа инстинктивно испытывают к нему непреодолимый ужас.</p>` 
        },
        en: { 
            name: 'Orsted (Dragon God)', 
            desc: `<p>Officially ranks 2nd among the World Powers, but is practically the strongest active being in the world.</p>
                   <p><strong>Power & Abilities:</strong> Masters absolutely all sword styles at a god tier and knows all spells. His Battle Aura (Toki) is so dense that only a few can pierce it.</p>
                   <p><strong>Curses:</strong> Forced to conserve energy due to infinitely slow mana regeneration. Furthermore, all living beings instinctively feel insurmountable terror towards him.</p>` 
        }
    },
    {
        rank: 3, img: 'https://cosplayfu-website.s3.amazonaws.com/_Upload/b/109217-Badigadi-Cosplay-from-Mushoku-Tensei-1-2.jpg',
        ru: { 
            name: 'Бадигади (Бог Сражений)', 
            desc: `<p>Занимает 3-е место в Мировых Силах (в золотой броне).</p>
                   <p><strong>Сила и способности:</strong> Сам Повелитель Демонов бессмертен, но его истинная сила раскрывается в Броне Бога Сражений. Она дарует безграничную физическую силу и скорость, игнорируя усталость.</p>
                   <p><strong>Слабость:</strong> Броня обладает разумом и поглощает жизненную энергию носителя. Бессмертие Бадигади делает его идеальным «вечным двигателем».</p>` 
        },
        en: { 
            name: 'Badigadi (Fighting God)', 
            desc: `<p>Ranks 3rd in the World Powers (in golden armor).</p>
                   <p><strong>Power & Abilities:</strong> The Demon King himself is immortal, but his true power unlocks in the Fighting God Armor. It grants boundless physical strength and speed, ignoring fatigue.</p>
                   <p><strong>Weakness:</strong> The armor is sentient and drains the wearer's life energy. Badigadi's immortality makes him the perfect "perpetual motion machine".</p>` 
        }
    },
    {
        rank: 4, img: 'top-10-strongest-characters-in-mushoku-tensei/3.webp',
        ru: { 
            name: 'Бог Магии Лаплас (Вторая половина)', 
            desc: `<p>Занимает 4-е место в Мировых Силах.</p>
                   <p><strong>Сила и способности:</strong> Унаследовал весь чудовищный запас маны Изначального Лапласа и магический талант, но потерял рассудок и воспоминания. Сохранил лишь иррациональную ненависть к человечеству. Именно он развязал Великую Человеко-Демоническую войну. Сейчас запечатан.</p>` 
        },
        en: { 
            name: 'Magic God Laplace (Second Half)', 
            desc: `<p>Ranks 4th in the World Powers.</p>
                   <p><strong>Power & Abilities:</strong> Inherited the original's colossal mana pool and magic talent but lost his sanity and memories. Kept only an irrational hatred for humanity. He started the Great Human-Demon War. Currently sealed.</p>` 
        }
    },
    {
        rank: 5, img: 'top-10-strongest-characters-in-mushoku-tensei/5.webp',
        ru: { 
            name: 'Рэндольф Марианна (Бог Смерти)', 
            desc: `<p>Официально занимает 5-е место в Мировых Силах.</p>
                   <p><strong>Сила и способности:</strong> Мастер «Стиля Очаровывающего Меча». В отличие от воинов, полагающихся на грубую силу, Рэндольф использует иллюзии, гипнотические движения (напоминающие готовку еды), финты и контроль дистанции, чтобы обмануть врага и нанести один смертельный удар.</p>
                   <p><strong>Слабость:</strong> Давно утратил былую мотивацию к битвам ради мечты открыть ресторан и стать поваром. Кроме того, его трюки плохо работают против противников с идеальными животными инстинктами или особыми глазами.</p>` 
        },
        en: { 
            name: 'Randolph Marianne (Death God)', 
            desc: `<p>Officially ranks 5th in the World Powers.</p>
                   <p><strong>Power & Abilities:</strong> Master of the "Bewitching Sword Style". Unlike warriors who rely on brute strength, Randolph uses illusions, hypnotic movements (resembling cooking), feints, and distance control to deceive the enemy and land a single fatal blow.</p>
                   <p><strong>Weakness:</strong> Long ago lost his motivation for battles to pursue his dream of opening a restaurant and becoming a chef. Additionally, his tricks are largely ineffective against opponents with perfect animal instincts or special eyes.</p>` 
        }
    },
    {
        rank: 6, img: 'top-10-strongest-characters-in-mushoku-tensei/7.webp',
        ru: { 
            name: 'Джино Бритц (Новый Бог Меча)', 
            desc: `<p>Гений фехтования, превзошедший своего учителя Гала Фариона и забравший титул Бога Меча (6-е место в Мировых Силах).</p>
                   <p><strong>Сила и способности:</strong> Довел стиль Бога Меча (построенный на скорости и "Световом Мече") до абсолютного совершенства. Его скорость реакции и удара такова, что даже Рудеус с Глазом Предвидения не способен среагировать на его атаки.</p>` 
        },
        en: { 
            name: 'Jino Britz (New Sword God)', 
            desc: `<p>A fencing genius who surpassed his teacher Gal Farion and claimed the Sword God title (6th in World Powers).</p>
                   <p><strong>Power & Abilities:</strong> Perfected the Sword God style (built on speed and the "Sword of Light") to absolute mastery. His reaction and striking speed are so fast that even Rudeus with the Eye of Foresight cannot react to his attacks.</p>` 
        }
    },
    {
        rank: null, img: 'top-10-strongest-characters-in-mushoku-tensei/8.webp',
        ru: { 
            name: 'Александр Рыбак / Калман III', 
            desc: `<p>Бывший 7-й в Мировых Силах (потерял титул после поражения Рудеусу).</p>
                   <p><strong>Сила и способности:</strong> Принадлежит к роду бессмертных демонов (колоссальная регенерация). Его главное оружие — легендарный Меч Короля Драконов Кадзякут, позволяющий манипулировать гравитацией. Это делает удары стиля Бога Севера неотразимыми, а движения непредсказуемыми.</p>` 
        },
        en: { 
            name: 'Aleksander Rybak / Kalman III', 
            desc: `<p>Former 7th in the World Powers (lost the title after being defeated by Rudeus).</p>
                   <p><strong>Power & Abilities:</strong> Belongs to an immortal demon lineage (colossal regeneration). His main weapon is the legendary Dragon King Sword Kajakut, allowing gravity manipulation. This makes his North God style strikes irresistible and movements unpredictable.</p>` 
        }
    },
    {
        rank: 7, img: 'https://i.pinimg.com/736x/5f/74/f6/5f74f60fb3440f85582b161447ac7322.jpg',
        ru: { 
            name: 'Рудеус Грейрат (с Бронёй)', 
            desc: `<p>Главный герой истории. Занял 7-е место в Мировых Силах. Не может использовать Боевую Ауру, но компенсирует это тремя факторами:</p>
                   <ul>
                       <li><strong>Мана:</strong> Объем маны равен запасу Лапласа.</li>
                       <li><strong>Глаз Предвидения:</strong> Позволяет видеть на несколько секунд в будущее.</li>
                       <li><strong>Магическая Броня:</strong> Броня Mk. 0 дает ему силу и скорость уровня Семи Великих Сил, позволяя сражаться с Орстедом на равных.</li>
                   </ul>` 
        },
        en: { 
            name: 'Rudeus Greyrat (with Armor)', 
            desc: `<p>The main protagonist. Took 7th place in the World Powers. Cannot use Battle Aura but compensates with three factors:</p>
                   <ul>
                       <li><strong>Mana:</strong> Mana pool equal to Laplace's.</li>
                       <li><strong>Eye of Foresight:</strong> Allows him to see seconds into the future.</li>
                       <li><strong>Magic Armor:</strong> The Mk. 0 Armor grants him the strength and speed of the Seven Great Powers, allowing him to fight Orsted on equal terms.</li>
                   </ul>` 
        }
    },
    {
        rank: null, img: 'https://i.namu.wiki/i/AfRDOYbIpzWxA1k_akMIQVcTIQVrSCiB5oPqv_7TABqRN76fzt0D0MU6lJ1ZAWubZhx8qz0qTROsEd3u1HMc6g.webp',
        ru: { 
            name: 'Атофератофе Рыбак', 
            desc: `<p>Повелительница Демонов, мать Бога Севера Калмана II.</p>
                   <p><strong>Сила и способности:</strong> Абсолютное бессмертие и колоссальная физическая мощь. Сражается огромным чёрным мечом, полагаясь на грубую силу. Даже если разрубить её на куски, она соберется воедино, изматывая противников в бою.</p>` 
        },
        en: { 
            name: 'Atoferatofe Rybak', 
            desc: `<p>Demon King, mother of the North God Kalman II.</p>
                   <p><strong>Power & Abilities:</strong> Absolute immortality and colossal physical might. Fights with a massive black sword relying on brute force. Even if chopped to pieces, she pieces herself back together, exhausting opponents in combat.</p>` 
        }
    },
    {
        rank: null, img: 'top-10-strongest-characters-in-mushoku-tensei/11.webp',
        ru: { 
            name: 'Эрис Бореас Грейрат', 
            desc: `<p>Король Меча «Бешеная Собака». Жена Рудеуса и сильнейший человеческий воин без божественного титула.</p>
                   <p><strong>Сила и способности:</strong> Овладела стилем Бога Меча, изучила техники отражения Бога Воды и непредсказуемость Бога Севера. С помощью Изящного Меча Феникса (игнорирующего защиту) и невероятных инстинктов смогла превзойти в дуэли Гала Фариона.</p>` 
        },
        en: { 
            name: 'Eris Boreas Greyrat', 
            desc: `<p>Sword King "Mad Dog". Rudeus's wife and the strongest human warrior without a divine title.</p>
                   <p><strong>Power & Abilities:</strong> Mastered the Sword God style, learned Water God deflection techniques, and North God unpredictability. Using the Elegant Phoenix Sword (ignoring defenses) and her incredible instincts, she bested Gal Farion in a duel.</p>` 
        }
    },
    {
        rank: null, img: 'https://shikimori.io/uploads/poster/characters/118215/main_alt-5db9a7af772429b384acc3418ad09db5.jpeg',
        ru: { 
            name: 'Гал Фарион', 
            desc: `<p>Предыдущий Бог Меча (утратил титул).</p>
                   <p><strong>Сила и способности:</strong> Долгое время удерживал титул. Его мастерство мгновенного обнажения клинка («Световой Меч») считалось эталонным. Обладает невероятной интуицией и огромным опытом. Уступил позиции, но остается смертоносной угрозой для 99% существ.</p>` 
        },
        en: { 
            name: 'Gal Farion', 
            desc: `<p>The previous Sword God (lost the title).</p>
                   <p><strong>Power & Abilities:</strong> Held the title for a long time. His mastery of the instant draw ("Sword of Light") was considered the gold standard. Possesses incredible intuition and vast experience. Lost his position but remains a deadly threat to 99% of beings.</p>` 
        }
    },
    {
        rank: null, img: 'top-10-strongest-characters-in-mushoku-tensei/13.webp',
        ru: { 
            name: 'Руиджерд Спардия', 
            desc: `<p>Легендарный воин из расы супардов, «Смертельный Тупик».</p>
                   <p><strong>Сила и способности:</strong> Мастер копья с 400-летним боевым опытом. Его главный козырь — изумрудный глаз на лбу, работающий как идеальный радар. Он видит потоки маны и предсказывает атаки за долю секунды до их начала.</p>` 
        },
        en: { 
            name: 'Ruijerd Superdia', 
            desc: `<p>A legendary warrior from the Superd race, "Dead End".</p>
                   <p><strong>Power & Abilities:</strong> A spear master with 400 years of combat experience. His main trump card is the emerald eye on his forehead, acting as a perfect radar. He sees mana flows and predicts attacks a split second before they start.</p>` 
        }
    }
];

let currentLang = localStorage.getItem('siteLang') || 'ru';
let isDark = localStorage.getItem('siteTheme') !== 'light';

const grid = document.getElementById('characters-grid');
const langToggle = document.getElementById('lang-toggle');
const langText = document.getElementById('lang-text');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const siteTitle = document.getElementById('site-title');

const uiTranslations = {
    ru: { 
        title: 'Иерархия Сил', 
        btn: 'RU', 
        powerRank: 'Мировая Сила №', 
        unranked: 'Вне Мировых Сил',
        disclaimer: 'Данный топ основан на расстановке сил к концу основной истории (ранобэ). В последующем лоре рейтинг отличается.'
    },
    en: { 
        title: 'Power Hierarchy', 
        btn: 'EN', 
        powerRank: 'World Power #', 
        unranked: 'Not a World Power',
        disclaimer: 'This ranking is based on the balance of power at the conclusion of the main storyline (light novel). In subsequent works set in this universe, the hierarchy differs.'
    }
};

function renderCards() {
    grid.innerHTML = '';
    characters.forEach(char => {
        const data = char[currentLang];
        const card = document.createElement('div');
        card.className = 'card';
        
        // Логика отрисовки ранга: если он есть в монументе, показываем коронку и номер
        const t = uiTranslations[currentLang];
        const rankHtml = char.rank !== null 
            ? `<span class="rank"><i class='bx bx-crown'></i> ${t.powerRank}${char.rank}</span>` 
            : `<span class="rank" style="background: var(--text-color); opacity: 0.6;"><i class='bx bx-user'></i> ${t.unranked}</span>`;

        card.innerHTML = `
            <div class="card-img-wrapper">
                <div class="skeleton"></div>
                <img src="${char.img}" alt="${data.name}" onload="this.classList.add('loaded'); this.previousElementSibling.style.display='none'" onerror="this.previousElementSibling.style.display='none'">
            </div>
            <div class="card-content">
                ${rankHtml}
                <h2>${data.name}</h2>
                <div class="card-desc">${data.desc}</div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function updateUI() {
    siteTitle.textContent = uiTranslations[currentLang].title;
    langText.textContent = uiTranslations[currentLang].btn;
    
    const disclaimerEl = document.getElementById('disclaimer-text');
    if(disclaimerEl) {
        disclaimerEl.textContent = uiTranslations[currentLang].disclaimer;
    }
    
    renderCards();
}

function applyTheme() {
    if (isDark) {
        document.body.classList.add('dark-theme');
        themeIcon.className = 'bx bxs-sun';
    } else {
        document.body.classList.remove('dark-theme');
        themeIcon.className = 'bx bxs-moon';
    }
}

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('siteLang', currentLang);
    updateUI();
});

themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    localStorage.setItem('siteTheme', isDark ? 'dark' : 'light');
    applyTheme();
});

applyTheme();
updateUI();