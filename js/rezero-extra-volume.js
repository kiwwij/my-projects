document.addEventListener('DOMContentLoaded', () => {

    const placeholderText = "Пересказ этого тома находится в процессе написания. Возвращайтесь позже, чтобы узнать продолжение истории!";

    const exVolumesData = [
        {
            id: "ex1",
            titleRu: "Мечта Короля-льва",
            titleEn: "The Dream the Lion King Saw",
            poster: "https://cover.cdnlibs.org/uploads/cover/rezero-kara-hajimeru-isekai-seikatsu-ex4/cover/f4f10779-0445-4581-a5b3-e2560605eca8_orig.jpg",
            ranobeLink: "https://ranobelib.me/ru/book/48302--rezero-kara-hajimeru-isekai-seikatsu-ex4",
            ranobeInfo: "Нет перевода",
            summary: `
Глава начинается в роскошной гостевой комнате Королевской Резиденции в столице Лугуники. Эмилия и Фельт пьют чай и обсуждают смерть Присциллы Бариэль.

Эмилия лично принесла эту трагичную весть в столицу. Она переживает, что выглядит слишком подавленной, и боится, что Субару бы отругал её за то, что она не может быть сильной. Фельт же, напротив, воспринимает новость со свойственной ей прямотой и силой. 

Оставшись наедине с Фельт, Эмилия решает действовать прямо. Смерть Присциллы и её сожаление о том, что она так и не успела стать с ней друзьями, научила Эмилию не откладывать важные слова на потом.
Эмилия смотрит Фельт в глаза и заявляет:

Эмилия: [― Я хочу быть твоим другом, Фельт-тян. И не просто обычным другом, а по-настоящему хорошим.]

Она рассказывает, что уже пообещала стать друзьями с Анастасией после выборов. Фельт, улыбаясь, отвечает в своей хулиганской манере:

Фельт: [― Поняла, без проблем. Я буду твоим другом, Эмилия-нее-тян. И я стану им <b>до</b> того, как закончатся выборы, чтобы утереть нос Анастасии!]

Девушки искренне смеются. Эмилия чувствует тепло на сердце и надеется, что когда-нибудь сможет говорить о Присцилле без слёз.
https://ranobelib.me/uploads/ranobe/94231/chapters/3949933/021f3c3c-db3f-49ea-be94-70152872350e.jpg

Тем временем Отто и Райнхард идут по коридору с чайным подносом. Отто делится с Райнхардом важной информацией.

Райнхард: [― Мой отец хочет победить в Королевских Выборах. Но он не хочет, чтобы победил <b>я</b>. Поэтому он никогда не станет помогать Фельт-сама.]

[Термины]
Мечта: цель всей жизни Круш Карстен.
Фурье Лугуника: принц, ставший причиной ее мотивации.
`
        },
        {
            id: "ex2",
            titleRu: "Песнь любви Демона Меча",
            titleEn: "Sword Demon Love Song",
            poster: "https://cover.cdnlibs.org/uploads/cover/rezero-kara-hajimeru-isekai-seikatsu-ex4/cover/022fc9b8-adc6-491b-9c0c-c77b2ab18217_orig.jpg",
            ranobeLink: "https://ranobelib.me/ru/book/48302--rezero-kara-hajimeru-isekai-seikatsu-ex4",
            ranobeInfo: "том 2 глава 0 - 8",
            summary: placeholderText
        },
        {
            id: "ex3",
            titleRu: "История любви Демона Меча",
            titleEn: "Sword Demon Love Story",
            poster: "https://cover.cdnlibs.org/uploads/cover/rezero-kara-hajimeru-isekai-seikatsu-ex4/cover/714e83d8-9789-49b3-8de5-b3c59fef4ccf_orig.jpg",
            ranobeLink: "https://ranobelib.me/ru/book/48302--rezero-kara-hajimeru-isekai-seikatsu-ex4",
            ranobeInfo: "том 3 глава 0 - 4",
            summary: placeholderText
        },
        {
            id: "ex4",
            titleRu: "Великие путешествия",
            titleEn: "The Travelogue of the Finest",
            poster: "https://cover.cdnlibs.org/uploads/cover/rezero-kara-hajimeru-isekai-seikatsu-ex4/cover/c11401bb-3c2c-4700-8557-3cd8c64fc850_orig.jpg",
            ranobeLink: "https://ranobelib.me/ru/book/48302--rezero-kara-hajimeru-isekai-seikatsu-ex4?section=chapters&ui=4427630",
            ranobeInfo: "том 1 гл. 1-37 / том 4 гл. 0-2",
            summary: placeholderText
        },
        {
            id: "ex5",
            titleRu: "Сказание об Алой Принцессе",
            titleEn: "The Tale of the Scarlet Princess",
            poster: "https://cover.cdnlibs.org/uploads/cover/rezero-kara-hajimeru-isekai-seikatsu-ex4/cover/84965368-b5fe-4386-96d1-aabb66af2e13_orig.jpg",
            ranobeLink: "https://ranobelib.me/ru/book/48302--rezero-kara-hajimeru-isekai-seikatsu-ex4",
            ranobeInfo: "Нет перевода",
            summary: placeholderText
        },
        {
            id: "ex6",
            titleRu: "Боевая Баллада Демона Меча",
            titleEn: "Sword Demon Battle Ballad",
            poster: "https://cover.cdnlibs.org/uploads/cover/rezero-kara-hajimeru-isekai-seikatsu-ex4/cover/0a19abf0-83da-4fec-b895-0a7457a46d3d_orig.jpg",
            ranobeLink: "https://ranobelib.me/ru/book/48302--rezero-kara-hajimeru-isekai-seikatsu-ex4",
            ranobeInfo: "том 6 глава 0 - 7",
            summary: placeholderText
        },
        {
            id: "ex7",
            titleRu: "Сказ о скорпионе",
            titleEn: "Scorpion Tale",
            poster: "rezero-extra-volume/scorpion-tale.png",
            ranobeLink: "https://www.youtube.com/watch?v=HWaBiEZiP9Q&lc=UgzaOiYvenQpm6U8AvN4AaABAg.A_FE13VVo9MA_FPDj3hV44",
            ranobeInfo: "Пересказ на ютубе",
            summary: placeholderText
        }
    ];

    const gridState = document.getElementById('volumesGridState');
    const contentState = document.getElementById('volumeContentState');
    const initialState = document.getElementById('initialState');
    let currentVolume = null;

    function parseStoryText(rawText) {
        if (!rawText || rawText.trim() === "") return "<p>Текст отсутствует.</p>";
        
        let contentHtml = rawText.trim();
        let glossaryHtml = '';
        
        const glossarySplit = contentHtml.split(/\[Термины\]/i);
        if (glossarySplit.length > 1) {
            contentHtml = glossarySplit[0].trim();
            const glossaryText = glossarySplit[1].trim();
            
            const terms = glossaryText.split(/\n+/).filter(line => line.trim().length > 0);
            const termsList = terms.map(termLine => {
                const parts = termLine.split(':');
                if (parts.length > 1) {
                    const termName = parts[0].trim();
                    const termDesc = parts.slice(1).join(':').trim();
                    return `<div class="glossary-item"><span class="glossary-term">${termName}</span> &mdash; <span class="glossary-desc">${termDesc}</span></div>`;
                }
                return `<div class="glossary-item"><span class="glossary-desc">${termLine}</span></div>`;
            }).join('');
            
            glossaryHtml = `<div class="glossary-section"><h3 class="glossary-title"><i class='bx bx-book-bookmark'></i> Справка / Термины</h3>${termsList}</div>`;
        }

        const imgRegex = /(?<!["'])(https?:\/\/[^\s<]+?(?:\.(?:jpg|jpeg|png|gif|webp)|\?format=(?:jpg|jpeg|png|gif|webp))[^\s<]*)/gi;
        contentHtml = contentHtml.replace(imgRegex, '<img src="$1" class="chapter-inline-image" alt="Иллюстрация" loading="lazy">');

        contentHtml = contentHtml.split(/\n+/).map(line => line.trim()).filter(line => line.length > 0).map(line => {
            if (line.startsWith('<img') || line.startsWith('<div')) return line;
            return `<p>${line}</p>`;
        }).join('');

        contentHtml = contentHtml.replace(/([А-ЯЁ][а-яё]+:?\s*)?(\[―?\s*.*?\])/g, '<span class="character-speech"><span class="char-name">$1</span>$2</span>');

        return contentHtml + glossaryHtml;
    }

    function renderGrid() {
        gridState.innerHTML = '';
        exVolumesData.forEach((vol, index) => {
            const card = document.createElement('div');
            card.className = `volume-card fade-in`;
            card.style.animationDelay = `${index * 0.1}s`; 
            
            card.innerHTML = `
                <div class="card-img-wrapper">
                    <div class="skeleton"></div>
                    <img src="${vol.poster}" alt="${vol.titleRu}" style="opacity: 0;" onload="this.style.opacity=1; this.previousElementSibling.style.opacity=0;" onerror="this.src='https://via.placeholder.com/300x420/1c1917/e11d48?text=Нет+постера'">
                </div>
                <div class="volume-card-info">
                    <h3>${vol.titleRu}</h3>
                    <p>${vol.titleEn}</p>
                </div>
            `;
            card.addEventListener('click', () => openVolume(vol));
            gridState.appendChild(card);
        });
    }

    function openVolume(vol) {
        currentVolume = vol;
        
        document.getElementById('exTitleRu').innerText = vol.titleRu;
        document.getElementById('exTitleEn').innerText = vol.titleEn;
        
        const posterImg = document.getElementById('exVolumePoster');
        const skeleton = posterImg.previousElementSibling;
        
        posterImg.style.opacity = '0';
        skeleton.style.opacity = '1';
        
        posterImg.src = vol.poster;
        posterImg.onload = () => { 
            posterImg.style.opacity = '1'; 
            skeleton.style.opacity = '0'; 
        };
        posterImg.onerror = () => { 
            posterImg.src = 'https://via.placeholder.com/300x420/1c1917/e11d48?text=Нет+постера'; 
        };
        
        const ranobeBtn = document.getElementById('exRanobeLink');
        ranobeBtn.href = vol.ranobeLink;
        ranobeBtn.innerHTML = `<i class='bx bx-book-open'></i> Читать (${vol.ranobeInfo})`;
        
        const textContainer = document.getElementById('exVolumeText');
        textContainer.innerHTML = parseStoryText(vol.summary);
        
        initialState.style.display = 'none';
        contentState.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.getElementById('backToGridBtn').addEventListener('click', () => {
        currentVolume = null;
        contentState.style.display = 'none';
        initialState.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function stripHtmlToText(html) {
        let tmp = document.createElement("DIV");
        let prepHtml = html.replace(/<\/p>/gi, '\n\n')
                           .replace(/<br\s*\/?>/gi, '\n')
                           .replace(/<span class="char-name">/gi, '')
                           .replace(/<\/span>/gi, '')
                           .replace(/<div class="glossary-item">/gi, '\n')
                           .replace(/<img[^>]*>/gi, '[Иллюстрация]\n');
        tmp.innerHTML = prepHtml;
        return (tmp.textContent || tmp.innerText || "").replace(/\n{3,}/g, '\n\n').trim();
    }

    document.getElementById('downloadSingleBtn').addEventListener('click', () => {
        if(!currentVolume) return;
        const textToSave = `Re:Zero EX - ${currentVolume.titleRu}\n==========================================================\n\n${stripHtmlToText(parseStoryText(currentVolume.summary))}`;
        
        const blob = new Blob([textToSave], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `ReZero_EX_${currentVolume.id}.txt`;
        link.click();
        URL.revokeObjectURL(link.href);
    });

    document.getElementById('downloadAllBtn').addEventListener('click', () => {
        let fullText = "Re:Zero EX — Все пересказы побочных историй\n==========================================================\n\n";
        exVolumesData.forEach(vol => {
            fullText += `=== ${vol.titleRu} (${vol.titleEn}) ===\n\n`;
            fullText += stripHtmlToText(parseStoryText(vol.summary));
            fullText += "\n\n----------------------------------------------------------\n\n";
        });
        
        const blob = new Blob([fullText], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `ReZero_EX_All.txt`;
        link.click();
        URL.revokeObjectURL(link.href);
    });

    const themeBtn = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('arc9-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeBtn.querySelector('i').className = savedTheme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';

    themeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const target = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', target);
        localStorage.setItem('arc9-theme', target);
        themeBtn.querySelector('i').className = target === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
    });

    renderGrid();
});