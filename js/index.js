const username = 'kiwwij';
const repo = 'my-projects';
const folder = 'html';
const configUrl = 'projects.json';

const HIDDEN_FILES = ['manga.html', 'girls-inst.html', 'tg-alt.html', 'secret-facts-about-me.html', /* '' */];
const SECRET_CODE = 'hentaif';
let inputBuffer = '';

const container = document.getElementById('projects-grid');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search');

let allProjects = [];
let inputTimeout;
let currentFilter = null;
let showNewOnly = false;
let isSecretModeEnabled = false;
let showUnseenOnly = false;

const techColors = {
    'html': '#e34c26', 'css': '#563d7c', 'js': '#f1e05a', 'javascript': '#f1e05a', 'python': '#3572A5',
    'php': '#4F5D95', 'java': '#b07219', 'c++': '#f34b7d', 'cpp': '#f34b7d', 'c#': '#178600',
    'typescript': '#2b7489', 'ts': '#2b7489', 'vue': '#41b883', 'react': '#61dafb', 'github': '#181717',
    'git': '#F05032', 'mysql': '#4479a1', 'sql': '#4479a1'
};

function isProjectNew(dateString) {
    if (!dateString) return false;
    const projectDate = new Date(dateString);
    const currentDate = new Date();
    const diffTime = currentDate - projectDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 30;
}

async function loadProjects() {
    const showHidden = isSecretModeEnabled;

    try {
        const response = await fetch(configUrl);
        
        if (response.status === 404) {
            window.location.href = '404.html';
            return;
        }
        
        if (response.status === 403) {
            window.location.href = '403.html';
            return;
        }

        if (response.status >= 500 && response.status < 600) {
            window.location.href = '500.html';
            return;
        }

        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const projectsConfig = await response.json();
        let htmlFiles = [];

        for (const [fileName, config] of Object.entries(projectsConfig)) {
            if (fileName === '.html' || fileName === '') continue;

            const isSecret = HIDDEN_FILES.includes(fileName);
            if (!showHidden && isSecret) continue;

            htmlFiles.push({
                name: fileName,
                ...config
            });
        }

        htmlFiles.sort((a, b) => a.name.localeCompare(b.name));

        renderTechStats(htmlFiles, projectsConfig);

        container.innerHTML = '';
        allProjects = [];

        if (htmlFiles.length === 0) {
            container.innerHTML = '<p>There are no projects yet.</p>';
            return;
        }

        htmlFiles.forEach(project => {
            const rawName = project.name.replace('.html', '');
            const displayName = rawName
                .replace(/[-_]/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase());

            const imageSource = project.image || null;
            const description = project.description || '';
            const stack = project.stack || [];
            const customUrl = project.url || null;

            let badgeHTML = '';
            if (project.date && isProjectNew(project.date)) {
                badgeHTML = `<div class="new-badge" title="Added in the last month">new</div>`;
            }

            let imageHTML;
            if (imageSource) {
                if (imageSource.includes('/') || imageSource.includes('http')) {
                    imageHTML = `
                        <div class="card-image-wrapper">
                            <img src="${imageSource}" alt="${displayName}" class="card-image-real" loading="lazy"
                                onload="this.parentElement.classList.add('loaded')"
                                onerror="this.parentElement.innerHTML='<div class=\\'card-image placeholder\\' style=\\'height:100%\\'><i class=\\'bx bx-image-alt\\' style=\\'font-size: 3rem\\'></i></div>'">
                        </div>`;
                } else if (imageSource.startsWith('bx')) {
                    const color = getRandomColor();
                    imageHTML = `<div class="card-image placeholder" style="background-color: ${color};"><i class='${imageSource}' style="font-size: 5rem; color: white;"></i></div>`;
                } else {
                    const color = getRandomColor();
                    imageHTML = `<div class="card-image placeholder" style="background-color: ${color};"><span style="font-size: 4rem; color: white;">${imageSource}</span></div>`;
                }
            } else {
                const color = getRandomColor();
                imageHTML = `<div class="card-image placeholder" style="background-color: ${color};"><span style="font-size: 4rem; color: white; font-weight: bold;">${displayName.charAt(0).toUpperCase()}</span></div>`;
            }

            const MAX_ICONS = 6;
            let stackHTML = '';
            const createIconHtml = (tech) => `<i class='${getTechIcon(tech)} tech-icon' title='Filter by ${tech.toUpperCase()}' onclick="event.preventDefault(); event.stopPropagation(); filterByTech('${tech}')"></i>`;

            if (stack.length <= MAX_ICONS) {
                stackHTML = stack.map(tech => createIconHtml(tech)).join('');
            } else {
                const visibleCount = MAX_ICONS - 1;
                const visibleTechs = stack.slice(0, visibleCount).map(tech => createIconHtml(tech)).join('');
                const hiddenTechsString = stack.slice(visibleCount).join(', ').toUpperCase();
                stackHTML = `${visibleTechs}<span class="tech-more" title="More: ${hiddenTechsString}">+${stack.length - visibleCount}</span>`;
            }

            const card = document.createElement('a');
            card.href = customUrl ? customUrl : `${folder}/${project.name}`;
            card.className = 'project-card';
            card.target = '_blank';
            card.setAttribute('data-name', displayName.toLowerCase());
            card.setAttribute('data-desc', description.toLowerCase());
            card.setAttribute('data-stack', stack.join(',').toLowerCase());
            card.setAttribute('data-id', project.name);
            card.setAttribute('data-is-new', (project.date && isProjectNew(project.date)) ? 'true' : 'false');

            card.innerHTML = `
                ${badgeHTML}
                <div class="pin-btn" title="Pin project" onclick="togglePin(event, '${project.name}')">
                    <i class='bx bx-pin'></i>
                </div>
                ${imageHTML}
                <div class="card-content">
                    <div class="card-title">${displayName}</div>
                    ${description ? `<p class="card-description">${description}</p>` : ''}
                    <div class="card-footer">
                        <div class="tech-stack">${stackHTML}</div>
                        <div class="card-arrow"><i class='bx bx-right-arrow-alt'></i></div>
                    </div>
                </div>
            `;

            container.appendChild(card);
            allProjects.push(card);
        });

        updateProjectCount();
        updatePinnedOrder();

    } catch (error) {
        container.innerHTML = `<p style="color:red; text-align:center;">Error loading projects.</p>`;
    }
}

function showToast(message, duration = 2500) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    clearTimeout(inputTimeout);

    inputBuffer += e.key.toLowerCase();
    if (inputBuffer.length > SECRET_CODE.length) {
        inputBuffer = inputBuffer.substring(inputBuffer.length - SECRET_CODE.length);
    }

    inputTimeout = setTimeout(() => {
        inputBuffer = '';
    }, 1500);

    if (inputBuffer === SECRET_CODE) {
        isSecretModeEnabled = !isSecretModeEnabled;
        if (isSecretModeEnabled) {
            showToast('<i class="bx bx-lock-open-alt"></i> Secret mode activated!');
        } else {
            showToast('<i class="bx bx-lock-alt"></i> Secret mode deactivated.');
        }
        inputBuffer = '';
        loadProjects().then(() => applyAllFilters());
        return;
    }

    if (e.code === 'Slash' || e.key === '/') {
        e.preventDefault();
        document.getElementById('search-input').focus();
    } else if (e.code === 'KeyR') {
        e.preventDefault();
        openRandomProject();
    } else if (e.code === 'KeyT') {
        if (!inputBuffer.endsWith('hent')) {
            e.preventDefault();
            document.getElementById('color_mode').click();
        }
    }
});

function getTechIcon(tech) {
    const lowerTech = tech.toLowerCase();
    const map = {
        'html': 'bx bxl-html5', 'css': 'bx bxl-css3', 'js': 'bx bxl-javascript', 'javascript': 'bx bxl-javascript',
        'ts': 'bx bxl-typescript', 'typescript': 'bx bxl-typescript', 'react': 'bx bxl-react', 'angular': 'bx bxl-angular',
        'vue': 'bx bxl-vuejs', 'node': 'bx bxl-nodejs', 'jquery': 'bx bxl-jquery', 'bootstrap': 'bx bxl-bootstrap',
        'tailwind': 'bx bxl-tailwind-css', 'sass': 'bx bxl-sass', 'php': 'bx bxl-php', 'python': 'bx bxl-python',
        'java': 'bx bxl-java', 'c++': 'bx bxl-c-plus-plus', 'cpp': 'bx bxl-c-plus-plus', 'go': 'bx bxl-go-lang',
        'ruby': 'bx bxl-ruby', 'git': 'bx bxl-git', 'github': 'bx bxl-github', 'docker': 'bx bxl-docker',
        'figma': 'bx bxl-figma', 'unity': 'bx bxl-unity', 'blender': 'bx bxl-blender', 'android': 'bx bxl-android',
        'apple': 'bx bxl-apple', 'windows': 'bx bxl-windows', 'database': 'bx bxs-data', 'sql': 'bx bxs-data',
        'mysql': 'bx bxs-data', 'postgresql': 'bx bxl-postgresql', 'mongodb': 'bx bxl-mongodb', 'leaflet.js': 'bx bx-leaf', 'chart.js': 'bx bx-chart',
    };
    return map[lowerTech] || 'bx bx-code-alt';
}

function getRandomColor() {
    return ['#0984e3', '#00b894', '#6c5ce7', '#e17055', '#d63031', '#2d3436'][Math.floor(Math.random() * 6)];
}

async function updateSteamAvatar() {
    const avatarElement = document.querySelector('.avatar');
    if (!avatarElement) return;

    const dataUrl = 'https://kiwwij.github.io/kiwwij-anime-tier-list/data/steam-profile-data.js';

    try {
        const response = await fetch(dataUrl);
        if (response.ok) {
            const scriptContent = await response.text();
            const match = scriptContent.match(/["']avatar["']\s*:\s*["']([^"']+)["']/);
            if (match && match[1]) {
                const newAvatarUrl = match[1];
                if (avatarElement.src !== newAvatarUrl) {
                    avatarElement.src = newAvatarUrl;
                }
            }
        }
    } catch (err) {}
}

function initTheme() {
    const toggle = document.getElementById('color_mode');
    if (!toggle) return;
    const saved = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && systemDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggle.checked = true;
    }
    toggle.addEventListener('change', (e) => {
        const theme = e.target.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', e.target.checked ? 'dark' : null);
        localStorage.setItem('theme', theme);
    });
}

function applyAllFilters() {
    const rawVal = searchInput.value;
    const val = typeof processSearchQuery === 'function' ? processSearchQuery(rawVal) : rawVal.toLowerCase();
    const openedProjects = JSON.parse(localStorage.getItem('opened_projects')) || [];

    allProjects.forEach(card => {
        const name = card.getAttribute('data-name') || '';
        const desc = card.getAttribute('data-desc') || '';
        const stackString = card.getAttribute('data-stack') || '';
        const stackArray = stackString ? stackString.split(',') : [];
        const isNew = card.getAttribute('data-is-new') === 'true';
        const projectId = card.getAttribute('data-id');

        let matchesSearch = val === '' || name.includes(val) || desc.includes(val) || stackString.includes(val);
        let matchesTech = currentFilter === null || stackArray.includes(currentFilter);
        let matchesNew = !showNewOnly || isNew;
        
        let matchesUnseen = !showUnseenOnly || !openedProjects.includes(projectId);

        if (matchesSearch && matchesTech && matchesNew && matchesUnseen) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
    updateProjectCount();
}

const filterNewBtn = document.getElementById('filter-new-btn');
if (filterNewBtn) {
    filterNewBtn.addEventListener('click', () => {
        showNewOnly = !showNewOnly;
        filterNewBtn.classList.toggle('active', showNewOnly);
        applyAllFilters();
    });
}

const filterUnseenBtn = document.getElementById('filter-unseen-btn');
if (filterUnseenBtn) {
    filterUnseenBtn.addEventListener('click', () => {
        showUnseenOnly = !showUnseenOnly;
        filterUnseenBtn.classList.toggle('active', showUnseenOnly);
        
        const icon = filterUnseenBtn.querySelector('i');
        if (showUnseenOnly) {
            icon.className = 'bx bx-show';
            filterUnseenBtn.title = "Show all projects";
        } else {
            icon.className = 'bx bx-hide';
            filterUnseenBtn.title = "Show only unviewed projects";
        }
        
        applyAllFilters();
    });
}

searchInput.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    clearSearchBtn.style.display = val.length > 0 ? 'block' : 'none';

    if (val === SECRET_CODE) {
        isSecretModeEnabled = !isSecretModeEnabled;
        if (isSecretModeEnabled) {
            showToast('<i class="bx bx-lock-open-alt"></i> Secret mode activated!');
        } else {
            showToast('<i class="bx bx-lock-alt"></i> Secret mode deactivated.');
        }
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        loadProjects().then(() => applyAllFilters());
        return;
    }

    applyAllFilters();
});

clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    applyAllFilters();
    searchInput.focus();
});

function openRandomProject() {
    const visibleProjects = allProjects.filter(card => card.style.display !== 'none');
    if (visibleProjects.length > 0) {
        const randomIndex = Math.floor(Math.random() * visibleProjects.length);
        const randomProject = visibleProjects[randomIndex];
        window.open(randomProject.href, '_blank');
    } else {
        showToast('<i class="bx bx-error"></i> No projects found!');
    }
}

document.getElementById('random-btn').addEventListener('click', openRandomProject);
document.getElementById('current-year').textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    updateSteamAvatar();
    initTheme();
    injectDragStyles();
    initDragAndDrop();

    const secretBtn = document.getElementById('secret-facts-btn');
    if (secretBtn) {
        secretBtn.addEventListener('click', () => {
            if (typeof unlockAchievement === 'function') {
                unlockAchievement('fact_seeker');
            }
            window.open('html/secret-facts-about-me.html', '_blank');
        });
    }

    const avatarImg = document.querySelector('.avatar');
    if (avatarImg) {
        avatarImg.addEventListener('click', () => {
            avatarImg.classList.add('strange-clicked');
            setTimeout(() => avatarImg.classList.remove('strange-clicked'), 500);
            avatarImg.src = 'https://kiwwij.github.io/kiwwij-anime-tier-list/img/about%20me/secret_avatar.png';
            avatarImg.classList.add('strange-frame');
        });
    }
});

function renderTechStats(files, projectsConfig) {
    const statsContainer = document.getElementById('tech-stats');
    if (!statsContainer) return;

    let cloudContainer = document.getElementById('tech-cloud');
    if (!cloudContainer) {
        cloudContainer = document.createElement('div');
        cloudContainer.id = 'tech-cloud';
        cloudContainer.className = 'tech-cloud';
        statsContainer.parentNode.insertBefore(cloudContainer, statsContainer.nextSibling);
    }

    const totalStats = {};
    let totalCount = 0;

    files.forEach(file => {
        const configEntry = projectsConfig[file.name];
        let stack = (configEntry && configEntry.stack) ? configEntry.stack : [];
        stack.forEach(tech => {
            const key = tech.toLowerCase();
            totalStats[key] = (totalStats[key] || 0) + 1;
            totalCount++;
        });
    });

    if (totalCount === 0) {
        statsContainer.style.display = 'none';
        cloudContainer.style.display = 'none';
        return;
    } else {
        statsContainer.style.display = 'flex';
        cloudContainer.style.display = 'flex';
    }

    const sortedStats = Object.entries(totalStats).sort(([, a], [, b]) => b - a);

    const top5 = sortedStats.slice(0, 5);
    const top5Count = top5.reduce((sum, item) => sum + item[1], 0);
    const others = sortedStats.slice(5);

    statsContainer.innerHTML = top5.map(([tech, count]) => {
        const percentage = (count / top5Count) * 100;
        const realPercent = Math.round((count / totalCount) * 100);
        const color = techColors[tech] || getRandomColor();

        return `<div class="stat-bar" id="filter-${tech}" onclick="filterByTech('${tech}')" 
            style="width: ${percentage}%; background-color: ${color};" 
            title="${tech.toUpperCase()}: ${count} projects (${realPercent}%)"></div>`;
    }).join('');

    cloudContainer.innerHTML = others.map(([tech, count]) => {
        return `<span class="tech-tag" id="tag-${tech}" onclick="filterByTech('${tech}')">
            <i class='${getTechIcon(tech)}'></i> ${tech} <span class="tag-count">${count}</span>
        </span>`;
    }).join('');
}

function filterByTech(tech) {
    const statsContainer = document.getElementById('tech-stats');
    const cloudContainer = document.getElementById('tech-cloud');

    if (currentFilter === tech) {
        currentFilter = null;
        if(statsContainer) statsContainer.classList.remove('has-active-filter');
        if(cloudContainer) cloudContainer.classList.remove('has-active-filter');
        document.querySelectorAll('.stat-bar').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.tech-tag').forEach(el => el.classList.remove('active'));
    } else {
        currentFilter = tech;
        if(statsContainer) statsContainer.classList.add('has-active-filter');
        if(cloudContainer) cloudContainer.classList.add('has-active-filter');

        document.querySelectorAll('.stat-bar').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.tech-tag').forEach(el => el.classList.remove('active'));

        const activeBar = document.getElementById(`filter-${tech}`);
        if (activeBar) activeBar.classList.add('active');

        const activeTag = document.getElementById(`tag-${tech}`);
        if (activeTag) activeTag.classList.add('active');
    }

    applyAllFilters();
}

function updateProjectCount() {
    const counter = document.getElementById('project-count');
    const visibleCount = allProjects.filter(card => card.style.display !== 'none').length;
    if (counter) {
        counter.textContent = visibleCount;
        counter.style.color = visibleCount === 0 ? '#e74c3c' : '';
    }
}

const scrollTopBtn = document.getElementById("scrollTopBtn");
const scrollBottomBtn = document.getElementById("scrollBottomBtn");
let scrollTimeout;
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    let documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    let windowHeight = window.innerHeight;

    clearTimeout(scrollTimeout);

    if (st > lastScrollTop) {
        if (st < documentHeight - windowHeight - 50) {
            if (scrollBottomBtn) scrollBottomBtn.classList.add("show");
            if (scrollTopBtn) scrollTopBtn.classList.remove("show");
        } else {
            if (scrollBottomBtn) scrollBottomBtn.classList.remove("show");
            if (scrollTopBtn) scrollTopBtn.classList.add("show");
        }
    } else if (st < lastScrollTop) {
        if (st > 100) {
            if (scrollTopBtn) scrollTopBtn.classList.add("show");
            if (scrollBottomBtn) scrollBottomBtn.classList.remove("show");
        } else {
            if (scrollTopBtn) scrollTopBtn.classList.remove("show");
        }
    }

    lastScrollTop = st <= 0 ? 0 : st;

    scrollTimeout = setTimeout(() => {
        if (scrollTopBtn) scrollTopBtn.classList.remove("show");
        if (scrollBottomBtn) scrollBottomBtn.classList.remove("show");
    }, 3000);
});

function topFunction() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function bottomFunction() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

function updatePinnedOrder() {
    const pinned = JSON.parse(localStorage.getItem('pinned_projects')) || [];
    allProjects.forEach(card => {
        const id = card.getAttribute('data-id');
        const pinIndex = pinned.indexOf(id);
        const icon = card.querySelector('.pin-btn i');

        if (pinIndex > -1) {
            card.classList.add('is-pinned');
            card.style.order = pinIndex - 10;
            if(icon) icon.className = 'bx bxs-pin';
            card.setAttribute('draggable', 'true');
        } else {
            card.classList.remove('is-pinned');
            card.style.order = 0;
            if(icon) icon.className = 'bx bx-pin';
            card.removeAttribute('draggable');
        }
    });
}

function togglePin(event, fileId) {
    event.preventDefault();
    event.stopPropagation();
    let pinned = JSON.parse(localStorage.getItem('pinned_projects')) || [];
    const index = pinned.indexOf(fileId);

    if (index > -1) {
        pinned.splice(index, 1);
        showToast('<i class="bx bx-pin"></i> Project unpinned');
    } else {
        if (pinned.length >= 4) {
            showToast('<i class="bx bx-error-circle"></i> You can only pin up to 4 projects!', 3000);
            return;
        }
        pinned.push(fileId);
        showToast('<i class="bx bxs-pin"></i> Project pinned to top!');
    }
    localStorage.setItem('pinned_projects', JSON.stringify(pinned));
    updatePinnedOrder();
}

function injectDragStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        .project-card.is-pinned {
            cursor: grab;
        }
        .project-card.is-pinned:active {
            cursor: grabbing;
        }
        .project-card.dragging {
            opacity: 0.6;
            transform: scale(0.95);
            transition: transform 0.2s, opacity 0.2s;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10;
        }
        .project-card.drag-over {
            border: 2px dashed #0984e3 !important;
            transform: scale(1.02);
            opacity: 0.9;
        }
    `;
    document.head.appendChild(style);
}

function initDragAndDrop() {
    let draggedElement = null;
    
    let touchDropTarget = null;
    let touchTimer = null;
    let isDragging = false;

    container.addEventListener('dragstart', (e) => {
        const card = e.target.closest('.project-card.is-pinned');
        if (!card) return;
        draggedElement = card;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', card.getAttribute('data-id')); 
        setTimeout(() => card.classList.add('dragging'), 0);
    });

    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        const targetCard = e.target.closest('.project-card.is-pinned');
        if (targetCard && targetCard !== draggedElement) {
            targetCard.classList.add('drag-over');
        }
    });

    container.addEventListener('dragleave', (e) => {
        const targetCard = e.target.closest('.project-card.is-pinned');
        if (targetCard) targetCard.classList.remove('drag-over');
    });

    container.addEventListener('drop', (e) => {
        e.preventDefault();
        const targetCard = e.target.closest('.project-card.is-pinned');
        if (targetCard) targetCard.classList.remove('drag-over');

        if (targetCard && draggedElement && targetCard !== draggedElement) {
            reorderPinnedItems(draggedElement.getAttribute('data-id'), targetCard.getAttribute('data-id'));
        }
    });

    container.addEventListener('dragend', () => {
        if (draggedElement) draggedElement.classList.remove('dragging');
        draggedElement = null;
        document.querySelectorAll('.project-card').forEach(c => c.classList.remove('drag-over'));
    });

    container.addEventListener('touchstart', (e) => {
        const card = e.target.closest('.project-card.is-pinned');
        if (!card || e.target.closest('.pin-btn')) return;

        touchTimer = setTimeout(() => {
            isDragging = true;
            draggedElement = card;
            card.classList.add('dragging');
            if(navigator.vibrate) navigator.vibrate(50);
        }, 500);
    }, {passive: true});

    container.addEventListener('touchmove', (e) => {
        if (!isDragging) {
            clearTimeout(touchTimer);
            return;
        }
        e.preventDefault();

        const touch = e.touches[0];
        const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
        const targetCard = targetElement ? targetElement.closest('.project-card.is-pinned') : null;

        document.querySelectorAll('.project-card.is-pinned').forEach(c => c.classList.remove('drag-over'));

        if (targetCard && targetCard !== draggedElement) {
            targetCard.classList.add('drag-over');
            touchDropTarget = targetCard;
        } else {
            touchDropTarget = null;
        }
    }, {passive: false});

    container.addEventListener('touchend', (e) => {
        clearTimeout(touchTimer);
        
        if (isDragging) {
            e.preventDefault();
            draggedElement.classList.remove('dragging');

            if (touchDropTarget && touchDropTarget !== draggedElement) {
                reorderPinnedItems(draggedElement.getAttribute('data-id'), touchDropTarget.getAttribute('data-id'));
            }

            isDragging = false;
            draggedElement = null;
            touchDropTarget = null;
            document.querySelectorAll('.project-card').forEach(c => c.classList.remove('drag-over'));
        }
    });
}

function reorderPinnedItems(draggedId, targetId) {
    let pinned = JSON.parse(localStorage.getItem('pinned_projects')) || [];
    const fromIndex = pinned.indexOf(draggedId);
    const toIndex = pinned.indexOf(targetId);

    if (fromIndex > -1 && toIndex > -1) {
        pinned.splice(fromIndex, 1);
        pinned.splice(toIndex, 0, draggedId);
        
        localStorage.setItem('pinned_projects', JSON.stringify(pinned));
        updatePinnedOrder();
        showToast('<i class="bx bx-sort"></i> Order saved!');
    }
}