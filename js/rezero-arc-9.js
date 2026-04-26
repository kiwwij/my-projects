document.addEventListener('DOMContentLoaded', () => {
    const lockKey = 'rezero_arc9_unlocked';
    const attemptsKey = 'rezero_arc9_attempts';
    const lockoutTimeKey = 'rezero_arc9_lockout_time';

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
            background: radial-gradient(circle, #1a1600 0%, #050505 100%);
            z-index: 10000; display: flex; justify-content: center; align-items:center;
            font-family: 'Inter', sans-serif; transition: opacity 0.5s ease;
        `;

        const lockMessage = isLockedOut 
            ? `<h2 style="margin: 0 0 10px; color: #FF4C4C; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; text-shadow: 0 0 15px rgba(255, 76, 76, 0.6);">Доступ заблокирован</h2>
               <p style="margin: 0 0 30px; color: #E0E0E0; font-size: 0.95rem; line-height: 1.5;">Слишком много неверных попыток.<br>Система заблокирована на 24 часа.</p>`
            : `<h2 style="margin: 0 0 10px; color: #FFFFFF; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; text-shadow: 0 0 15px rgba(255, 215, 0, 0.4);">Архивы Безымянной Звезды</h2>
               <p style="margin: 0 0 30px; color: #E0E0E0; font-size: 0.95rem; line-height: 1.5;">Доступ ограничен. Подсказка:<br><strong style="color: #ffd700;">Лучшая девочка из Re:Zero 🦋</strong></p>
               <input type="password" id="rezero-pwd" placeholder="****" style="
                   width: 100%; padding: 18px; margin-bottom: 20px;
                   border: 2px solid #332b00; border-radius: 15px;
                   background: #09090B; color: #FFFFFF;
                   outline: none; font-size: 1.8rem; text-align: center;
                   letter-spacing: 8px; font-family: monospace; transition: all 0.3s ease; box-sizing: border-box;
               ">
               <button id="rezero-btn" style="
                   width: 100%; padding: 18px; background: linear-gradient(135deg, #ffd700 0%, #ffaa00 100%);
                   color: #000; border: none; border-radius: 15px; cursor: pointer; font-weight: 700; font-size: 1.2rem;
                   text-transform: uppercase; letter-spacing: 1px; transition: transform 0.1s ease, box-shadow 0.3s ease;
                   box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
               ">Разблокировать</button>
               <p id="rezero-err" style="color: #FF4C4C; margin: 15px 0 0; font-size: 0.95rem; font-weight: 600; opacity: 0; transition: opacity 0.3s;">❌ Неверный пароль!</p>`;

        overlay.innerHTML = `
            <div id="rezero-lock-card" style="
                background: rgba(15, 15, 18, 0.95); padding: 40px; border-radius: 20px;
                box-shadow: 0 10px 40px rgba(255, 215, 0, 0.15), inset 0 0 20px rgba(255, 215, 0, 0.05);
                border: 1px solid #4a3f00; text-align: center; width: 90%; max-width: 400px;
                position: relative; overflow: hidden; backdrop-filter: blur(5px);
            ">
                <i class='bx bxs-lock-alt' style="font-size: 5rem; color: #ffd700; filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.5)); margin-bottom: 15px;"></i>
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

        input.addEventListener('focus', () => { input.style.borderColor = '#ffd700'; input.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.3)'; });
        input.addEventListener('blur', () => { input.style.borderColor = '#332b00'; input.style.boxShadow = 'none'; });
        btn.addEventListener('mousedown', () => btn.style.transform = 'scale(0.98)');
        btn.addEventListener('mouseup', () => btn.style.transform = 'scale(1)');

        function attemptUnlock() {
            if (input.value === 'hentaif') {
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
            '1','2','3','4','5','6','i1','7','8','9','10','11','12','13',
            '14','15','16','17','18','19','20','21','22','23',
            '24','25','26','27','28','29','30','31','32','33','34','35','36',
            '37','38','39','40','41','42','43','44','45','46','47','48','49',
            '50','51','52','53','54','55','56','57','58','59','i2','c1'
        ];

        chapterOrder.forEach(ch => {
            chaptersContent[ch] = `<p>Пересказ этой главы находится в процессе написания. Возвращайтесь позже, чтобы узнать продолжение истории!</p>`;
        });







        
        // для курсива можно использовать <i></i>, а для выделения важных моментов <b></b>
        chaptersContent["1"] = `
            <p>Начало 9-й арки. Винсент Волакия и <i>Субару</i> оценивают последствия победы. Война окончена, но настоящие испытания только начинаются...</p>
        `;
        chaptersContent["2"] = `
            <p>Сейчас я пробуюу добавить сюда картинку. Например смотретя на Ала.
            https://witchculttranslation.com/wp-content/uploads/2024/06/FtIVMO-XoAACX6_.jpg
            
            Надеюсь получилось.</p>
        `;

        // Интерлюдия: Катя Орели (Английская буква 'i')
        chaptersContent["i1"] = `
            <p>Текст первой интерлюдии...</p>
        `;

        // Интерлюдия: Ликование (Английская буква 'i')
        chaptersContent["i2"] = `
            <p>Текст второй интерлюдии...</p>
        `;

        // Занавес: Переплетение (Английские буквы 'c')
        chaptersContent["c1"] = `
            <p>Текст финала Девятой арки...</p>
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
                        txtContent += "[Текст этой главы еще не написан...]\n\n";
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
            "phase1": "rezero-arc-9/39.webp", 
            "phase2": "rezero-arc-9/40.webp",
            "phase3": "rezero-arc-9/41.webp", 
            "phase4": "rezero-arc-9/42.webp", 
            "phase5": "rezero-arc-9/43.webp"
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
            
            let contentHtml = chaptersContent[chId] || `<p>Текст не найден.</p>`;

            // Ищем ссылки, оканчивающиеся на форматы картинок, и оборачиваем их в <img>
            const imgRegex = /(?<!["'])(https?:\/\/[^\s<]+?\.(?:jpg|jpeg|png|gif|webp))/gi;
            contentHtml = contentHtml.replace(imgRegex, '<img src="$1" class="chapter-inline-image" alt="Иллюстрация">');

            const currentIndex = chapterOrder.indexOf(chId);
            if (currentIndex !== -1 && currentIndex < chapterOrder.length - 1) {
                const nextChId = chapterOrder[currentIndex + 1];
                contentHtml += `
                    <div class="next-chapter-container">
                        <button class="next-chapter-btn" data-target="${nextChId}">
                            Следующая глава <i class='bx bx-right-arrow-alt'></i>
                        </button>
                    </div>`;
            }
            
            textEl.innerHTML = contentHtml;
            localStorage.setItem('arc9_last_read', chId);

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
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        document.querySelectorAll('.chapter-btn').forEach(btn => {
            btn.addEventListener('click', () => loadChapter(btn));
        });

        textEl.addEventListener('click', (e) => {
            const nextBtn = e.target.closest('.next-chapter-btn');
            if (nextBtn) {
                const targetId = nextBtn.getAttribute('data-target');
                const targetMenuBtn = document.querySelector(`.chapter-btn[data-ch="${targetId}"]`);
                if (targetMenuBtn) loadChapter(targetMenuBtn);
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
    }
});