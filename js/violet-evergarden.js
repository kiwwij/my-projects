document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('switch');
    const htmlElement = document.documentElement;
    const galleryGrid = document.getElementById('gallery-grid');
    const modal = document.getElementById('gallery-modal');
    const closeBtn = document.querySelector('.close-btn');
    const mainModalImg = document.getElementById('main-modal-img');
    const thumbnailList = document.getElementById('thumbnail-list');
    const backToTopBtn = document.getElementById('back-to-top');

    const imagesLight = [
        '../html/violet-evergarden/light/Violet Evergarden - S1E2 (328).png',
        '../html/violet-evergarden/light/Violet Evergarden - S1E3 (174).png',
        '../html/violet-evergarden/light/Violet Evergarden - S1E4 (336).png',
        '../html/violet-evergarden/light/Violet Evergarden - S1E5 (367).png',
        '../html/violet-evergarden/light/Violet Evergarden - S1E6 (318).png',
        '../html/violet-evergarden/light/Violet Evergarden - S1E8 (153).png',
        '../html/violet-evergarden/light/Violet Evergarden - S1E13 (384).png',
        '../html/violet-evergarden/light/Violet Evergarden - S1E13 (399).png',
        '../html/violet-evergarden/light/Violet Evergarden - S1E13 (402).png'
    ];

    const imagesDark = [
        '../html/violet-evergarden/dark/Violet Evergarden - S1E2 (30).png',
        '../html/violet-evergarden/dark/Violet Evergarden - S1E2 (408).png',
        '../html/violet-evergarden/dark/Violet Evergarden - S1E3 (40).png',
        '../html/violet-evergarden/dark/Violet Evergarden - S1E4 (275).png',
        '../html/violet-evergarden/dark/Violet Evergarden - S1E5 (98).png',
        '../html/violet-evergarden/dark/Violet Evergarden - S1E7 (282).png',
        '../html/violet-evergarden/dark/Violet Evergarden - S1E8 (9).png',
        '../html/violet-evergarden/dark/Violet Evergarden - S1E8 (75).png',
        '../html/violet-evergarden/dark/Violet Evergarden - S1E8 (126).png'
    ];

    let currentTheme = 'light';

    function renderGallery(theme) {
        galleryGrid.innerHTML = '';
        thumbnailList.innerHTML = '';
        const images = theme === 'light' ? imagesLight : imagesDark;

        images.forEach((src, index) => {
            const wrapper = document.createElement('div');
            wrapper.classList.add('gallery-wrapper', 'skeleton');
            
            const imgEl = document.createElement('img');
            imgEl.src = src;
            imgEl.alt = `Gallery image ${index + 1}`;
            imgEl.loading = "lazy";
            
            imgEl.onload = () => {
                wrapper.classList.remove('skeleton');
                imgEl.classList.add('loaded');
            };

            imgEl.addEventListener('click', () => openModal(images, index));
            wrapper.appendChild(imgEl);
            galleryGrid.appendChild(wrapper);

            const thumbEl = document.createElement('img');
            thumbEl.src = src;
            thumbEl.loading = "lazy";
            thumbEl.addEventListener('click', () => updateMainModalImage(images, index, thumbEl));
            thumbnailList.appendChild(thumbEl);
        });
    }

    function openModal(images, index) {
        modal.classList.add('active');
        const thumbnails = thumbnailList.querySelectorAll('img');
        updateMainModalImage(images, index, thumbnails[index]);
    }

    function updateMainModalImage(images, index, activeThumb) {
        mainModalImg.parentElement.classList.add('skeleton');
        mainModalImg.src = images[index];
        
        const thumbnails = thumbnailList.querySelectorAll('img');
        thumbnails.forEach(t => t.classList.remove('active'));
        if (activeThumb) activeThumb.classList.add('active');
    }

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });

    themeSwitch.addEventListener('change', (e) => {
        currentTheme = e.target.checked ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', currentTheme);
        
        renderGallery(currentTheme);
        modal.classList.remove('active');
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    if (htmlElement.getAttribute('data-theme') === 'dark') {
        themeSwitch.checked = true;
        currentTheme = 'dark';
    }
    renderGallery(currentTheme);
});