const categoryList = document.getElementById('category-list');
const galleryGrid = document.getElementById('gallery-grid');
const title = document.getElementById('current-category-title');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVideo = document.getElementById('lightbox-video');
const closeBtn = document.querySelector('.close-btn');

let lazyObserver = null;

function initMenu() {
    categories.forEach((cat, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = "#";
        a.innerHTML = `<i class='bx ${cat.icon}'></i> <span>${cat.label}</span>`; 
        
        a.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.sidebar a').forEach(el => el.classList.remove('active'));
            a.classList.add('active');
            loadCategory(cat);
        });

        if (index === 0) {
            a.classList.add('active');
            loadCategory(cat);
        }

        li.appendChild(a);
        categoryList.appendChild(li);
    });
}

function loadCategory(category) {
    title.textContent = category.label;
    galleryGrid.innerHTML = '';

    if (lazyObserver) {
        lazyObserver.disconnect();
    }

    lazyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const index = card.dataset.index;
                const folder = card.dataset.folder;
                const mediaContainer = card.querySelector('.media-container');

                const basePath = `${folder}/${index}`; 
                findAndLoadMedia(mediaContainer, basePath, index);
                
                observer.unobserve(card);
            }
        });
    }, {
        rootMargin: '250px 0px',
        threshold: 0.1
    });

    for (let i = 1; i <= category.count; i++) {
        const card = document.createElement('div');
        card.className = 'media-card';
        card.dataset.index = i;
        card.dataset.folder = category.folder;

        const mediaContainer = document.createElement('div');
        mediaContainer.className = 'media-container';
        
        const tag = document.createElement('div');
        tag.className = 'media-tag';
        tag.textContent = `#${i}`;

        card.appendChild(mediaContainer);
        card.appendChild(tag);
        galleryGrid.appendChild(card);

        lazyObserver.observe(card);
    }
}

function findAndLoadMedia(container, basePath, index) {
    const imageExtensions = ['jpg', 'png', 'jpeg', 'webp', 'JPG', 'PNG'];

    function applyInitialAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.95)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    }

    function triggerAnimation(element) {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        }, 30);
    }
    
    function tryNextImage(extIndex) {
        if (extIndex >= imageExtensions.length) {
            loadVideo();
            return;
        }

        const ext = imageExtensions[extIndex];
        const img = document.createElement('img');
        img.src = `${basePath}.${ext}`;
        img.alt = `Media ${index}`;
        
        applyInitialAnimation(img);
        
        img.onclick = function() {
            openLightbox(this.src, 'image');
        };

        img.onload = function() {
            container.innerHTML = '';
            container.appendChild(img);
            triggerAnimation(img);
        };

        img.onerror = function() {
            tryNextImage(extIndex + 1);
        };
    }

    function loadVideo() {
        const video = document.createElement('video');
        video.src = `${basePath}.mp4`;
        video.muted = true; 
        video.loop = true;

        applyInitialAnimation(video);

        video.onclick = function() {
            this.pause(); 
            openLightbox(this.src, 'video');
        };
        
        const badge = document.createElement('i');
        badge.className = 'bx bx-play-circle video-badge';
        badge.style.opacity = '0';
        badge.style.transition = 'opacity 0.3s ease';
        
        container.onmouseenter = () => { if (video.style.opacity === '1') badge.style.opacity = '0.7'; };
        container.onmouseleave = () => { if (video.style.opacity === '1') badge.style.opacity = '1'; };

        video.onloadeddata = function() {
            container.innerHTML = '';
            container.appendChild(video);
            container.appendChild(badge); 
            
            triggerAnimation(video);
            setTimeout(() => badge.style.opacity = '1', 30);
        };

        video.onerror = function() {
             container.innerHTML = `<div style="display:flex; justify-content:center; align-items:center; height:100%; color:#999; flex-direction:column; animation: fadeIn 0.5s ease;">
                <i class='bx bx-error-circle' style="font-size: 2rem"></i>
                <span style="font-size: 0.8rem">Not Found</span>
             </div>`;
        };
    }

    tryNextImage(0);
}

function openLightbox(src, type) {
    lightbox.style.display = 'flex';
    lightboxImg.style.display = 'none';
    lightboxImg.src = '';
    lightboxVideo.style.display = 'none';
    lightboxVideo.pause();
    lightboxVideo.src = '';

    if (type === 'image') {
        lightboxImg.src = src;
        lightboxImg.style.display = 'block';
    } else if (type === 'video') {
        lightboxVideo.src = src;
        lightboxVideo.style.display = 'block';
        lightboxVideo.play().catch(e => console.log("Autoplay prevented by browser")); 
    }
}

function closeLightbox() {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
    lightboxVideo.pause();
    lightboxVideo.src = '';
}

closeBtn.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
        closeLightbox();
    }
});

document.addEventListener('DOMContentLoaded', initMenu);