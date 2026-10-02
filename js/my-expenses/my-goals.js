const MY_GOALS = [
    { id: 'cushion', name: 'Финансовая подушка', target: 100000, isCushion: true, isArchived: false },
    { id: 'phone', name: 'Новый телефон', target: 20000, isArchived: false },
    { id: 'pc', name: 'Новый ПК', target: 70000, isArchived: false },
    { id: 'japan', name: 'Поездка в Японию', target: 300000, isArchived: false },
    
    // архив покупок (целей)
    // { id: 'phone', name: 'Новый телефон', target: 20000, isArchived: true }, 
];

function renderFinancialGoals(totalUAH, absoluteTotal, dollarsInUAH) {
    const container = document.getElementById('goals-container');
    const archiveContainer = document.getElementById('archived-container');
    
    container.innerHTML = '';
    if(archiveContainer) archiveContainer.innerHTML = '';
    
    const cushionGoal = MY_GOALS.find(g => g.isCushion);
    const activeGoals = MY_GOALS.filter(g => !g.isCushion && !g.isArchived);
    const archivedGoals = MY_GOALS.filter(g => g.isArchived);

    let cushionTarget = cushionGoal ? cushionGoal.target : 0;
    let cushionAllocated = Math.min(absoluteTotal, cushionTarget);
    let uahNeededForCushion = Math.max(0, cushionTarget - dollarsInUAH);
    let freeUAH = Math.max(0, totalUAH - uahNeededForCushion);

    if (cushionGoal) {
        let pct = Math.min((cushionAllocated / cushionTarget) * 100, 100);
        container.innerHTML += createGoalHTML(cushionGoal, cushionAllocated, pct, false);
    }

    activeGoals.forEach(goal => {
        let allocated = Math.min(freeUAH, goal.target);
        let pct = Math.min((allocated / goal.target) * 100, 100);
        container.innerHTML += createGoalHTML(goal, allocated, pct, false);
    });

    if (archivedGoals.length > 0 && archiveContainer) {
        let archiveHTML = `
            <div class="archive-toggle" id="archive-toggle-btn">
                <span><i class='bx bx-archive-in'></i> Выполненные цели (${archivedGoals.length})</span>
                <i class='bx bx-chevron-down'></i>
            </div>
            <div class="archive-content" id="archive-content-div">
        `;
        
        archivedGoals.forEach(goal => {
            archiveHTML += createGoalHTML(goal, goal.target, 100, true);
        });
        
        archiveHTML += `</div>`;
        archiveContainer.innerHTML = archiveHTML;

        document.getElementById('archive-toggle-btn').addEventListener('click', function() {
            this.classList.toggle('open');
            document.getElementById('archive-content-div').classList.toggle('open');
        });
    }

    let totalActiveTarget = cushionTarget + activeGoals.reduce((sum, g) => sum + g.target, 0);
    let overallPct = totalActiveTarget > 0 ? Math.min((absoluteTotal / totalActiveTarget) * 100, 100) : 0;

    document.getElementById('overall-goal-text').innerText = `${overallPct.toFixed(1)}%`;
    document.getElementById('overall-goal-fill').style.width = `${overallPct}%`;
}

function createGoalHTML(goal, allocated, pct, isArchived) {
    const statusClass = pct >= 100 ? 'cat-saved' : 'cat-primary';
    const bg = pct >= 100 ? 'var(--success)' : 'var(--primary-color)';
    const archiveClass = isArchived ? 'archived-goal' : '';
    const lockIcon = isArchived ? `<i class='bx bxs-check-circle' style="margin-left: 5px; color: var(--success); font-size: 1rem;"></i>` : '';

    return `
        <div class="goal-item ${archiveClass}">
            <div class="goal-header">
                <span style="display: flex; align-items: center;">${goal.name} ${lockIcon}</span>
                <span><span class="money-value">${allocated.toFixed(0)}</span> / ~${goal.target} ₴</span>
            </div>
            <div class="progress-bar-bg">
                <div class="progress-bar-fill ${statusClass}" 
                     style="width: ${pct}%; background: ${isArchived ? 'var(--text-color)' : bg}"></div>
            </div>
        </div>
    `;
}