const categoryList = document.getElementById('category-list');
const galleryGrid = document.getElementById('gallery-grid');
const title = document.getElementById('current-category-title');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVideo = document.getElementById('lightbox-video');
const closeBtn = document.querySelector('.close-btn');

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

    for (let i = 1; i <= category.count; i++) {
        const card = document.createElement('div');
        card.className = 'media-card';

        const mediaContainer = document.createElement('div');
        mediaContainer.className = 'media-container';
        
        findAndLoadMedia(mediaContainer, category.folder, i);

        const tag = document.createElement('div');
        tag.className = 'media-tag';
        tag.textContent = `#${i}`;

        card.appendChild(mediaContainer);
        card.appendChild(tag);
        galleryGrid.appendChild(card);
    }
}

function findAndLoadMedia(container, folder, index) {
    const imageExtensions = ['jpg', 'png', 'jpeg', 'webp', 'JPG', 'PNG'];
    
    const possibleImagePaths = [];
    imageExtensions.forEach(ext => {
        possibleImagePaths.push(`${folder}/1(${index}).${ext}`);   // Без пробела
        possibleImagePaths.push(`${folder}/1 (${index}).${ext}`);  // С пробелом
    });

    function tryNextImage(pathIndex) {
        if (pathIndex >= possibleImagePaths.length) {
            loadVideo();
            return;
        }

        const img = document.createElement('img');
        img.src = possibleImagePaths[pathIndex];
        img.alt = `Media ${index}`;
        
        img.onclick = function() {
            openLightbox(this.src, 'image');
        };

        img.onload = function() {
            container.innerHTML = '';
            container.appendChild(img);
        };

        img.onerror = function() {
            tryNextImage(pathIndex + 1);
        };
    }

    function loadVideo() {
        const possibleVideoPaths = [
            `${folder}/1(${index}).mp4`,
            `${folder}/1 (${index}).mp4`
        ];

        let vidIndex = 0;

        function tryNextVideo() {
            if (vidIndex >= possibleVideoPaths.length) {
                 container.innerHTML = `<div style="display:flex; justify-content:center; align-items:center; height:100%; color:#999; flex-direction:column;">
                    <i class='bx bx-error-circle' style="font-size: 2rem"></i>
                    <span style="font-size: 0.8rem">Not Found</span>
                 </div>`;
                 return;
            }

            const video = document.createElement('video');
            video.src = possibleVideoPaths[vidIndex];
            video.muted = true; 
            video.loop = true;

            video.onclick = function() {
                this.pause(); 
                openLightbox(this.src, 'video');
            };
            
            const badge = document.createElement('i');
            badge.className = 'bx bx-play-circle video-badge';
            
            container.onmouseenter = () => badge.style.opacity = 0.7;
            container.onmouseleave = () => badge.style.opacity = 1;

            video.onloadeddata = function() {
                container.innerHTML = '';
                container.appendChild(video);
                container.appendChild(badge); 
            };

            video.onerror = function() {
                 vidIndex++;
                 tryNextVideo();
            };
        }

        tryNextVideo();
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