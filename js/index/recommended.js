document.addEventListener('DOMContentLoaded', () => {
    const manualProjects = [
        "kiwwij-anime-tier-list", 
        "my-music-playlists.html", 
        "rezero-arc-9.html"
    ];

    const toggleBtn = document.getElementById('recommended-toggle');
    const grid = document.getElementById('recommended-grid');
    const icon = document.getElementById('recommended-icon');

    if (toggleBtn && grid && icon) {
        icon.className = 'bx bx-chevron-right';

        toggleBtn.addEventListener('click', () => {
            grid.classList.toggle('is-open');
            
            if (typeof unlockAchievement === 'function') {
                unlockAchievement('curious_explorer');
            }
            
            if (grid.classList.contains('is-open')) {
                icon.className = 'bx bx-chevron-down';
                toggleBtn.classList.add('is-open');
            } else {
                icon.className = 'bx bx-chevron-right';
                toggleBtn.classList.remove('is-open');
            }
        });
    }

    loadRecommendedProjects();

    async function loadRecommendedProjects() {
        try {
            const response = await fetch('projects.json');
            const projects = await response.json();

            let recommendedKeys = [...manualProjects];
            let newestKey = null;
            let newestDate = new Date('1970-01-01');

            for (const [key, data] of Object.entries(projects)) {
                if (key === '.html' || key === '') continue;
                if (recommendedKeys.includes(key)) continue; 
                
                if (data.date) {
                    const projDate = new Date(data.date);
                    if (projDate > newestDate) {
                        newestDate = projDate;
                        newestKey = key;
                    }
                }
            }

            if (newestKey) {
                recommendedKeys.push(newestKey);
            }

            renderRecommendedCards(recommendedKeys, projects, newestKey);
        } catch (error) {
            console.error("Error loading recommended projects:", error);
        }
    }

    function renderRecommendedCards(keys, allProjects, newestKey) {
        if (!grid) return;
        grid.innerHTML = ''; 

        keys.forEach(key => {
            const data = allProjects[key];
            if (!data) return;

            const card = document.createElement('a');
            card.href = data.url || `html/${key}`; 
            card.target = "_blank";
            card.className = 'project-card';
            card.setAttribute('data-name', key);

            const newBadgeHTML = (key === newestKey) 
                ? `<div class="newest-badge">Latest</div>` 
                : '';

            let imageHTML = '';
            const bgColor = (typeof getRandomColor === 'function') ? getRandomColor() : '#0984e3';

            if (data.image && data.image.startsWith('bx ')) {
                imageHTML = `<div class="card-image-wrapper loaded"><div class="card-image placeholder" style="background-color: ${bgColor};"><i class='${data.image}' style="font-size: 5rem; color: white;"></i></div></div>`;
            } else if (data.image) {
                imageHTML = `
                    <div class="card-image-wrapper loaded">
                        <img src="${data.image}" alt="${key}" class="card-image-real" loading="lazy" onload="this.style.opacity=1" onerror="this.parentElement.innerHTML='<div class=\\'card-image placeholder\\' style=\\'background-color: ${bgColor}\\'>...</div>'">
                    </div>`;
            } else {
                imageHTML = `<div class="card-image-wrapper loaded"><div class="card-image placeholder" style="background-color: ${bgColor};"><i class='bx bx-folder' style="font-size: 5rem; color: white;"></i></div></div>`;
            }

            let techHTML = '';
            if (data.stack) {
                data.stack.slice(0, 5).forEach(tech => {
                    const iconClass = (typeof getTechIcon === 'function') ? getTechIcon(tech) : `bx bxl-${tech}`;
                    techHTML += `<i class='${iconClass} tech-icon' onclick='event.preventDefault(); event.stopPropagation();' style='cursor: default;'></i>`;
                });
            }

            const rawName = key.replace('.html', '');
            const displayName = rawName
                .replace(/[-_]/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase());

            card.innerHTML = `
                ${newBadgeHTML}
                ${imageHTML}
                <div class="card-content">
                    <div class="card-title">${displayName}</div>
                    <p class="card-description">${data.description || ''}</p>
                    <div class="card-footer">
                        <div class="tech-stack">${techHTML}</div>
                        <i class='bx bx-right-arrow-alt card-arrow'></i>
                    </div>
                </div>
            `;

            grid.appendChild(card);
        });
    }
});