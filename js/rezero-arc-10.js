document.addEventListener('DOMContentLoaded', () => {

   // localStorage.setItem('rezero_arc10_unlocked', 'true');  разкоммитить для разблокировки страницы

    const lockKey = 'rezero_arc10_unlocked';
    const attemptsKey = 'rezero_arc10_attempts';
    const lockoutTimeKey = 'rezero_arc10_lockout_time';

    const lockoutTime = localStorage.getItem(lockoutTimeKey);
    if (lockoutTime && Date.now() < parseInt(lockoutTime)) {
        showLockScreen(true);
        return;
    } else if (lockoutTime && Date.now() >= parseInt(lockoutTime)) {
        localStorage.removeItem(attemptsKey);
        localStorage.removeItem(lockoutTimeKey);
    }

    if (localStorage.getItem(lockKey) === 'true') {
        initPage();
    } else {
        showLockScreen(false);
    }

    function showLockScreen(isLockedOut) {
        document.body.style.overflow = 'hidden';

        const overlay = document.createElement('div');
        overlay.id = 'rezero-login-overlay';
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: radial-gradient(circle, #1a0f00 0%, #050300 100%);
            z-index: 10000; display: flex; justify-content: center; align-items:center;
            font-family: 'Inter', sans-serif; transition: opacity 0.5s ease;
        `;

        const lockMessage = isLockedOut
            ? `<h2 style="margin: 0 0 10px; color: #FF4C4C; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; text-shadow: 0 0 15px rgba(255, 76, 76, 0.6);">Доступ заблокирован</h2>
               <p style="margin: 0 0 30px; color: #E0E0E0; font-size: 0.95rem; line-height: 1.5;">Слишком много неверных попыток.<br>Система заблокирована на 24 часа.</p>`
            : `<h2 style="margin: 0 0 10px; color: #FFFFFF; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; text-shadow: 0 0 15px rgba(245, 158, 11, 0.4);">Страна Короля Льва</h2>
               <p style="margin: 0 0 30px; color: #E0E0E0; font-size: 0.95rem; line-height: 1.5;">Доступ ограничен. Подсказка:<br><strong style="color: #f59e0b;">Лучшая девочка из Re:Zero 🦋</strong></p>
               <input type="password" id="rezero-pwd" placeholder="****" style="
                   width: 100%; padding: 18px; margin-bottom: 20px;
                   border: 2px solid #4a2d00; border-radius: 15px;
                   background: #0c0a09; color: #FFFFFF;
                   outline: none; font-size: 1.8rem; text-align: center;
                   letter-spacing: 8px; font-family: monospace; transition: all 0.3s ease; box-sizing: border-box;
               ">
               <button id="rezero-btn" style="
                   width: 100%; padding: 18px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
                   color: #000; border: none; border-radius: 15px; cursor: pointer; font-weight: 700; font-size: 1.2rem;
                   text-transform: uppercase; letter-spacing: 1px; transition: transform 0.1s ease, box-shadow 0.3s ease;
                   box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
               ">Разблокировать</button>
               <p id="rezero-err" style="color: #FF4C4C; margin: 15px 0 0; font-size: 0.95rem; font-weight: 600; opacity: 0; transition: opacity 0.3s;">❌ Неверный пароль!</p>`;

        overlay.innerHTML = `
            <div id="rezero-lock-card" style="
                background: rgba(28, 25, 23, 0.95); padding: 40px; border-radius: 20px;
                box-shadow: 0 10px 40px rgba(245, 158, 11, 0.15), inset 0 0 20px rgba(245, 158, 11, 0.05);
                border: 1px solid #5c3a00; text-align: center; width: 90%; max-width: 400px;
                position: relative; overflow: hidden; backdrop-filter: blur(5px);
            ">
                <i class='bx bxs-lock-alt' style="font-size: 5rem; color: #f59e0b; filter: drop-shadow(0 0 15px rgba(245, 158, 11, 0.5)); margin-bottom: 15px;"></i>
                ${lockMessage}
                <a href="../index.html" style="display: inline-block; margin-top: 25px; color: #888; text-decoration: none; font-size: 0.85rem; transition: color 0.2s;">&larr; Назад к проектам</a>
            </div>
        `;
        document.body.appendChild(overlay);

        if (isLockedOut) return;

        const input = document.getElementById('rezero-pwd');
        const btn = document.getElementById('rezero-btn');
        const err = document.getElementById('rezero-err');
        const card = document.getElementById('rezero-lock-card');

        input.addEventListener('focus', () => { input.style.borderColor = '#f59e0b'; input.style.boxShadow = '0 0 10px rgba(245, 158, 11, 0.3)'; });
        input.addEventListener('blur', () => { input.style.borderColor = '#4a2d00'; input.style.boxShadow = 'none'; });
        btn.addEventListener('mousedown', () => btn.style.transform = 'scale(0.98)');
        btn.addEventListener('mouseup', () => btn.style.transform = 'scale(1)');

        function attemptUnlock() {
            if (input.value.toLowerCase() === 'hentaif') {
                localStorage.setItem(lockKey, 'true');
                localStorage.removeItem(attemptsKey);
                overlay.style.opacity = '0';
                setTimeout(() => { overlay.remove(); document.body.style.overflow = ''; initPage(); }, 500);
            } else {
                let attempts = parseInt(localStorage.getItem(attemptsKey) || '0') + 1;
                localStorage.setItem(attemptsKey, attempts);

                if (attempts >= 9) {
                    localStorage.setItem(lockoutTimeKey, Date.now() + (24 * 60 * 60 * 1000));
                    location.reload();
                } else {
                    err.style.opacity = '1';
                    input.value = ''; input.focus();
                    card.animate([
                        { transform: 'translateX(0)' }, { transform: 'translateX(-10px)' },
                        { transform: 'translateX(10px)' }, { transform: 'translateX(-10px)' },
                        { transform: 'translateX(10px)' }, { transform: 'translateX(0)' }
                    ], { duration: 400 });
                    setTimeout(() => err.style.opacity = '0', 2500);
                }
            }
        }
        btn.addEventListener('click', attemptUnlock);
        input.addEventListener('keypress', (e) => { if (e.key === 'Enter') attemptUnlock(); });
    }









    
    function initPage() {
        const chaptersContent = {};
        const chapterOrder = [
            '1', '2', '3', '4', '5', '6',  '7', 'i1', '8', '9', '10', '11', '12',
            '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23',

            '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36',
            '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49',
            '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', 'i2', 'c1'
        ];

        chapterOrder.forEach(ch => {
            chaptersContent[ch] = `Пересказ этой главы находится в процессе написания. Возвращайтесь позже, чтобы узнать продолжение истории!`;
        });

        // — </i> </b> [Термины]  
        chaptersContent["1"] = `

        `;

        chaptersContent["2"] = `

        `;

        chaptersContent["3"] = `

        `;

        chaptersContent["4"] = `

        `;

        chaptersContent["5"] = `

        `;

        chaptersContent["6"] = `

        `;

        chaptersContent["7"] = `

        `;

        chaptersContent["і1"] = `

        `;

        chaptersContent["8"] = `

        `;

        chaptersContent["9"] = `

        `;

        chaptersContent["10"] = `

        `;

        chaptersContent["11"] = `

        `;

        // — </i> </b> [Термины]  
        chaptersContent["12"] = `

        `;

        chaptersContent["13"] = `

        `;

        chaptersContent["14"] = `

        `;

        chaptersContent["15"] = `

        `;

        chaptersContent["16"] = `

        `;

        chaptersContent["17"] = `

        `;

        chaptersContent["18"] = `

        `;

        chaptersContent["19"] = `

        `;

        chaptersContent["20"] = `

        `;

        chaptersContent["21"] = `

        `;

        chaptersContent["22"] = `

        `;
        // — </i> </b> [Термины]  
        chaptersContent["23"] = `

        `;






        const downloadBtn = document.getElementById('downloadTxtBtn');
        if (downloadBtn) {
            downloadBtn.addEventListener('mousedown', () => downloadBtn.style.transform = 'scale(0.98)');
            downloadBtn.addEventListener('mouseup', () => downloadBtn.style.transform = 'scale(1)');

            downloadBtn.addEventListener('click', () => {
                let txtContent = "Re:Zero Arc 9 - Свет безымянной звезды | Полный пересказ\n";
                txtContent += "==========================================================\n\n";

                chapterOrder.forEach(chId => {
                    const btnEl = document.querySelector(`.chapter-btn[data-ch="${chId}"]`);
                    const title = btnEl ? btnEl.innerText : `Глава ${chId}`;

                    txtContent += `=== ${title} ===\n\n`;

                    const rawHtml = chaptersContent[chId];

                    if (rawHtml) {
                        const formattedHtml = rawHtml
                            .replace(/<\/p>/gi, '\n\n')
                            .replace(/<br\s*[\/]?>/gi, '\n');

                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = formattedHtml;

                        const cleanText = tempDiv.textContent || tempDiv.innerText || "";
                        txtContent += cleanText.trim() + "\n\n";
                    } else {
                        txtContent += "[Текст этой главы ещё не написан...]\n\n";
                    }

                    txtContent += "----------------------------------------------------------\n\n";
                });

                const blob = new Blob([txtContent], { type: "text/plain;charset=utf-8" });
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "ReZero_Arc9.txt";

                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            });
        }

        const posters = {
            "phase1": "rezero-arc-10/44.jpg",
            "phase2": "rezero-arc-10/45.jpg",

            "phase3": "rezero-arc-10/46.webp",
            "phase4": "rezero-arc-10/47.webp",
            "phase5": "rezero-arc-10/48.webp"
        };

        const themeBtn = document.getElementById('themeToggle');
        const savedTheme = localStorage.getItem('arc9-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'light') themeBtn.querySelector('i').className = 'bx bx-moon';

        themeBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const target = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', target);
            localStorage.setItem('arc9-theme', target);
            themeBtn.querySelector('i').className = target === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
        });

        document.querySelectorAll('.phase-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                btn.nextElementSibling.classList.toggle('open');
            });
        });

        const initialState = document.getElementById('initialState');
        const chapterContent = document.getElementById('chapterContent');
        const titleEl = document.getElementById('chapterTitle');
        const textEl = document.getElementById('chapterText');
        const sidebar = document.getElementById('sidebar');
        const posterContainer = document.getElementById('posterContainer');
        const volumePoster = document.getElementById('volumePoster');
        const skeleton = document.querySelector('.poster-skeleton');

        function loadChapter(btnElement) {
            const chId = btnElement.getAttribute('data-ch');
            const phaseGroup = btnElement.closest('.phase-group');
            const phaseId = phaseGroup.getAttribute('data-phase');

            document.querySelectorAll('.chapter-btn').forEach(b => b.classList.remove('active'));
            btnElement.classList.add('active');

            const chaptersDiv = btnElement.closest('.phase-chapters');
            const phaseBtn = phaseGroup.querySelector('.phase-btn');
            if (!chaptersDiv.classList.contains('open')) {
                chaptersDiv.classList.add('open');
                phaseBtn.classList.add('active');
            }

            initialState.style.display = 'none';
            chapterContent.style.display = 'block';
            titleEl.innerText = btnElement.innerText;

            let contentHtml = chaptersContent[chId] || `Текст не найден.`;

            contentHtml = contentHtml.replace(/<p>/gi, '').replace(/<\/p>/gi, '\n\n').replace(/<br\s*\/?>/gi, '\n');

            let glossaryHtml = '';
            const glossarySplit = contentHtml.split(/\[Термины\]/i);
            if (glossarySplit.length > 1) {
                contentHtml = glossarySplit[0];
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

                glossaryHtml = `
                    <div class="glossary-section">
                        <h3 class="glossary-title"><i class='bx bx-book-bookmark'></i> Справка / Термины</h3>
                        <div class="glossary-content">${termsList}</div>
                    </div>
                `;
            }

            const imgRegex = /(?<!["'])(https?:\/\/[^\s<]+?(?:\.(?:jpg|jpeg|png|gif|webp)|\?format=(?:jpg|jpeg|png|gif|webp))[^\s<]*)/gi;
            contentHtml = contentHtml.replace(imgRegex, '<img src="$1" class="chapter-inline-image" alt="Иллюстрация">');

            contentHtml = contentHtml.split(/\n+/).map(line => line.trim()).filter(line => line.length > 0).map(line => `<p>${line}</p>`).join('');

            contentHtml = contentHtml.replace(/([А-ЯЁ][а-яё]+:?\s*)?(\[―?\s*.*?\])/g, '<span class="character-speech"><span class="char-name">$1</span>$2</span>');

            contentHtml += glossaryHtml;

            const currentIndex = chapterOrder.indexOf(chId);
            let navHtml = '<div class="chapter-navigation">';
            let hasNav = false;

            if (currentIndex > 0) {
                const prevChId = chapterOrder[currentIndex - 1];
                navHtml += `
                    <button class="nav-btn prev-chapter-btn" data-target="${prevChId}">
                        <i class='bx bx-left-arrow-alt'></i> Предыдущая глава
                    </button>`;
                hasNav = true;
            }

            if (currentIndex !== -1 && currentIndex < chapterOrder.length - 1) {
                const nextChId = chapterOrder[currentIndex + 1];
                navHtml += `
                    <button class="nav-btn next-chapter-btn" data-target="${nextChId}">
                        Следующая глава <i class='bx bx-right-arrow-alt'></i>
                    </button>`;
                hasNav = true;
            }
            navHtml += '</div>';

            if (hasNav) {
                contentHtml += navHtml;
            }

            textEl.innerHTML = contentHtml;
            localStorage.setItem('arc9_last_read', chId);

            const progressContainer = document.getElementById('readingProgressContainer');
            if (progressContainer) {
                progressContainer.style.display = 'block';
                document.getElementById('readingProgressBar').style.width = '0%';
            }

            if (posters[phaseId]) {
                posterContainer.style.display = 'block';
                skeleton.style.display = 'block';
                volumePoster.style.display = 'none';
                volumePoster.src = posters[phaseId];
                volumePoster.onload = () => { skeleton.style.display = 'none'; volumePoster.style.display = 'block'; };
            } else {
                posterContainer.style.display = 'none';
            }

            if (window.innerWidth <= 992) sidebar.classList.remove('open');
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                const contentDiv = document.getElementById('chapterContent');
                if (contentDiv) {
                    contentDiv.scrollTop = 0;
                }
                const titleElement = document.getElementById('chapterTitle');
                if (titleElement) {
                    titleElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 50);
        }

        document.querySelectorAll('.chapter-btn').forEach(btn => {
            btn.addEventListener('click', () => loadChapter(btn));
        });

        textEl.addEventListener('click', (e) => {
            const navBtn = e.target.closest('.nav-btn');
            if (navBtn) {
                const targetId = navBtn.getAttribute('data-target');
                const targetMenuBtn = document.querySelector(`.chapter-btn[data-ch="${targetId}"]`);
                if (targetMenuBtn) {
                    loadChapter(targetMenuBtn);
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            }
        });

        document.getElementById('mobileMenuBtn').addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        const lastRead = localStorage.getItem('arc9_last_read');
        if (lastRead) {
            const targetBtn = document.querySelector(`.chapter-btn[data-ch="${lastRead}"]`);
            if (targetBtn) {
                const modal = document.getElementById('resumeModal');
                document.getElementById('resumeChapterName').innerText = targetBtn.innerText;
                modal.style.display = 'flex';

                document.getElementById('resumeYes').onclick = () => {
                    modal.style.display = 'none';
                    loadChapter(targetBtn);
                };
                document.getElementById('resumeNo').onclick = () => {
                    modal.style.display = 'none';
                };
            }
        }

        window.addEventListener('scroll', () => {
            const progressContainer = document.getElementById('readingProgressContainer');
            if (progressContainer && progressContainer.style.display !== 'none') {
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
                document.getElementById('readingProgressBar').style.width = progress + '%';
            }
        });
    }
});