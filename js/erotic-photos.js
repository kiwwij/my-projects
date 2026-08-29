const gallery = document.getElementById('gallery');
const folders = document.querySelectorAll('.folder');
const sourceBtns = document.querySelectorAll('.source-btn');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');

let currentCategory = 'all';
let currentSource = 'all';

const lazyLoad = (target) => {
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const mediaElement = entry.target;
                mediaElement.src = mediaElement.getAttribute('data-src');
                mediaElement.onload = () => mediaElement.parentElement.classList.add('loaded');
                if(mediaElement.tagName === 'VIDEO') {
                    mediaElement.onloadeddata = () => mediaElement.parentElement.classList.add('loaded');
                }
                observer.disconnect();
            }
        });
    });
    io.observe(target);
};

function renderGallery() {
    gallery.innerHTML = '';
    
    if (typeof vaultData === 'undefined') {
        gallery.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">База данных не найдена. Запустите generate.js</p>';
        return;
    }

    const filteredData = vaultData.filter(item => {
        const matchesCategory = currentCategory === 'all' || item.tags.includes(currentCategory);
        const matchesSource = currentSource === 'all' || item.tags.includes(currentSource);
        return matchesCategory && matchesSource;
    });

    filteredData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'media-card';
        card.onclick = () => openModal(item);

        const numberBadge = `<span class="media-number">#${item.id}</span>`;
        const iconBadge = `<i class='bx ${item.type === 'video' ? 'bx-play-circle' : 'bx-image'} media-icon'></i>`;
        
        const safeSrc = item.src.split('/').map(part => encodeURIComponent(part)).join('/');

        let mediaTag = item.type === 'image' 
            ? `<img data-src="${safeSrc}" alt="post">` 
            : `<video data-src="${safeSrc}" muted loop playsinline></video>`;

        card.innerHTML = numberBadge + iconBadge + mediaTag;
        gallery.appendChild(card);

        lazyLoad(card.querySelector(item.type));
    });
}

function openModal(item) {
    const safeSrc = item.src.split('/').map(part => encodeURIComponent(part)).join('/');
    
    modalBody.innerHTML = item.type === 'image'
        ? `<img src="${safeSrc}" alt="post">`
        : `<video src="${safeSrc}" autoplay controls loop playsinline></video>`;
    modal.classList.add('active');
}

folders.forEach(folder => {
    folder.addEventListener('click', () => {
        folders.forEach(f => f.classList.remove('active'));
        folder.classList.add('active');
        currentCategory = folder.getAttribute('data-category');
        renderGallery();
    });
});

sourceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        sourceBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSource = btn.getAttribute('data-source');
        renderGallery();
    });
});

function openModal(item) {
    modalBody.innerHTML = item.type === 'image'
        ? `<img src="${item.src}" alt="post">`
        : `<video src="${item.src}" autoplay controls loop playsinline></video>`;
    modal.classList.add('active');
}

function close() {
    modal.classList.remove('active');
    modalBody.innerHTML = ''; 
}

closeModal.addEventListener('click', close);
modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.remove('dark-theme');
    themeIcon.classList.replace('bx-moon', 'bx-sun');
}
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    themeIcon.className = isDark ? 'bx bx-moon' : 'bx bx-sun';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

renderGallery();