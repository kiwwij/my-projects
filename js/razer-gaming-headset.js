document.addEventListener('DOMContentLoaded', () => {
    const PRODUCTS = [
        {
            id: 'cobra-pro',
            name: 'Razer Cobra Pro',
            category: 'Мышь',
            tier: 'primary',
            priceNumeric: 7999,
            priceText: '7 999 ₴',
            links: {
                foxtrot: 'https://www.foxtrot.com.ua/ru/shop/kompyuterniye_miyshi_razer_cobra_pro_rz01_04660100_r3g1.html',
                comfy: 'https://comfy.ua/mysh-besprovodnaja-igrovaja-razer-cobra-pro-rz01-04660100-r3g1.html'
            },
            images: [
                'https://files.foxtrot.com.ua/PhotoNew/1_638259891436867696.webp',
                'https://files.foxtrot.com.ua/PhotoNew/3_638259891447624876.webp',
                'https://files.foxtrot.com.ua/PhotoNew/5_638259891457926110.webp',
                'https://files.foxtrot.com.ua/PhotoNew/6_638259891462288417.webp'
            ],
            specs: {
                'Тип подключения': 'Комбинированное (Bluetooth + RF, USB)',
                'Тип сенсора': 'Оптический (30000 dpi)',
                'Количество кнопок': '8',
                'Подсветка': 'Razer Chroma RGB',
                'Вес': '77 г'
            }
        },
        {
            id: 'basilisk-v3',
            name: 'Razer Basilisk V3',
            category: 'Мышь (Запасной вариант)',
            tier: 'alt',
            priceNumeric: 3499,
            priceText: '4 999 ₴',
            links: {
                foxtrot: 'https://www.foxtrot.com.ua/ru/shop/kompyuterniye_miyshi_razer_basilisk_v3_rz01_04000100_r3m1.html',
                comfy: 'https://comfy.ua/mysh-provodnaja-igrovaja-razer-basilisk-v3-35k-black-rz01-05230100-r3m1.html'
            },
            images: [
                'https://files.foxtrot.com.ua/PhotoNew/img_0_709_4174_0_1_637733477343021231.webp',
                'https://files.foxtrot.com.ua/PhotoNew/img_0_709_4174_0_1_637733477338572590.webp',
                'https://files.foxtrot.com.ua/PhotoNew/img_0_709_4174_0_1_637733477323270678.webp',
                'https://files.foxtrot.com.ua/PhotoNew/img_0_709_4174_0_1_637733477331224780.webp',
            ],
            specs: {
                'Тип подключения': 'Проводное (кабель 2.1 м)',
                'Тип сенсора': 'Оптический (26000 dpi)',
                'Количество кнопок': '11',
                'Размеры': '130 х 60 х 42.5 мм',
                'Особенности': 'Подсветка'
            }
        },
        {
            id: 'kraken-kitty-v2',
            name: 'Razer Kraken Kitty V2 BT',
            category: 'Гарнитура',
            tier: 'both',
            priceNumeric: 5999,
            priceText: '5 999 ₴',
            links: {
                foxtrot: 'https://www.foxtrot.com.ua/ru/shop/naushniki-razer-kraken-kitty-v2-bt-black-rz04-04860500-r3m1.html',
                comfy: 'https://comfy.ua/naushniki-polnorazmernye-besprovodnye-razer-kraken-kitty-v2-bt-black-rz04-04860500-r3m1.html'
            },
            images: [
                'https://files.foxtrot.com.ua/PhotoNew/img_0_564_7279_0_1_hPXbfS.webp',
                'https://files.foxtrot.com.ua/PhotoNew/img_0_564_7279_0_1_dXEpmL.webp'
            ],
            specs: {
                'Подключение': 'Беспроводное (Bluetooth 5.2)',
                'Конструкция': 'Полноразмерные, закрытые',
                'Частотный диапазон': '20 - 20000 Гц',
                'Время работы': 'До 60 ч (до 40 ч с подсветкой)',
                'Вес': '325 г'
            }
        },
        {
            id: 'seiren-v3-chroma',
            name: 'Razer Seiren V3 Chroma',
            category: 'Микрофон',
            tier: 'both',
            priceNumeric: 6999,
            priceText: '6 999 ₴',
            links: {
                foxtrot: 'https://www.foxtrot.com.ua/ru/shop/mikrofoniy_razer_seiren_v3_chroma_rz19_05060100_r3m1.html',
                comfy: 'https://comfy.ua/mikrofon-dlja-komp-jutera-provodnoj-razer-seiren-v3-chroma-rz19-05060100-r3m1.html'
            },
            images: [
                'https://files.foxtrot.com.ua/PhotoNew/img_0_1648_406_0_1_2dgomE.webp',
                'https://files.foxtrot.com.ua/PhotoNew/img_0_1648_406_0_1_ZAlmwk.webp',
                'https://files.foxtrot.com.ua/PhotoNew/img_0_1648_406_0_1_h9ias5.webp',
                'https://files.foxtrot.com.ua/PhotoNew/img_0_1648_406_0_1_dnCFb3.webp',
            ],
            specs: {
                'Направленность звука': 'Всенаправленный',
                'Диапазон частот': '20 - 20000 Гц',
                'Разъем': 'USB / USB Type-C',
                'Назначение': 'Для компьютера / стриминга',
                'Вес': '550 г'
            }
        },
        {
            id: 'huntsman-v3-he',
            name: 'Razer Huntsman V3 HE Magnetic',
            category: 'Клавиатура',
            tier: 'primary',
            priceNumeric: 8999,
            priceText: '8 999 ₴',
            links: {
                foxtrot: 'https://www.foxtrot.com.ua/ru/shop/klaviaturiy-i-komplektiy-razer-huntsman-v3-he-magnetic-tenkeyless-8kh-rz03-05920100-r3m1.html',
                comfy: 'https://comfy.ua/klaviatura-drotova-igrova-razer-huntsman-v3-he-magnetic-tenkeyless-8kh-rz03-05920100-r3m1.html'
            },
            images: [
                'https://files.foxtrot.com.ua/PhotoNew/img_0_711_3978_0_1_T6CGQM.webp',
                'https://files.foxtrot.com.ua/PhotoNew/img_0_711_3978_0_1_yO47QW.webp'
            ],
            specs: {
                'Тип переключателей': 'Hall Effect (магнитные)',
                'Частота опроса': 'До 8000 Гц',
                'Материал корпуса': 'Металл',
                'Особенности': 'Без цифрового блока, съемный кабель 2 м',
                'Вес': '862 г'
            }
        },
        {
            id: 'blackwidow-v3-tkl',
            name: 'Razer BlackWidow V3 TKL',
            category: 'Клавиатура (Запасной вариант)',
            tier: 'alt',
            priceNumeric: 3999,
            priceText: '3 999 ₴',
            links: {
                foxtrot: 'https://www.foxtrot.com.ua/ru/shop/klaviatury_razer_blackwidow-v3-tkl--ru-rz03-03490700-r3r1.html',
                comfy: 'https://comfy.ua/klaviatura-provodnaja-igrovaja-razer-blackwidow-v3-tkl-ru-rz03-03490700-r3r1.html'
            },
            images: [
                'https://files.foxtrot.com.ua/PhotoNew/img_0_711_1727_0.webp',
                'https://files.foxtrot.com.ua/PhotoNew/img_0_711_1727_2.webp'
            ],
            specs: {
                'Тип переключателей': 'Razer Mechanical Switches Green',
                'Конструкция': 'Механическая, без цифрового блока',
                'Материал корпуса': 'Пластик',
                'Подключение': 'Проводное (кабель 1.8 м)',
                'Вес': '837 г'
            }
        }
    ];

    let currentTier = 'primary';
    const activeGalleryIndices = {};
    const gridEl = document.getElementById('productsGrid');
    const totalPriceEl = document.getElementById('totalPriceDisplay');
    const currentTierLabel = document.getElementById('currentTierLabel');
    const tierPrimaryBtn = document.getElementById('tierPrimaryBtn');
    const tierAltBtn = document.getElementById('tierAltBtn');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const specsModal = document.getElementById('specsModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const zoomModal = document.getElementById('zoomModal');
    const zoomImg = document.getElementById('zoomImg');
    const zoomCloseBtn = document.getElementById('zoomCloseBtn');
    const zoomBackdrop = document.getElementById('zoomBackdrop');
    const tooltipEl = document.getElementById('customTooltip');

    function renderGrid() {
        const filtered = PRODUCTS.filter(p => p.tier === currentTier || p.tier === 'both');
        gridEl.innerHTML = '';

        filtered.forEach(p => {
            if (activeGalleryIndices[p.id] === undefined) {
                activeGalleryIndices[p.id] = 0;
            }

            const card = document.createElement('article');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-gallery" data-id="${p.id}">
                    <img class="gallery-image" 
                         src="${p.images[0]}" 
                         alt="${p.name}"
                         onerror="this.onerror=null; this.replaceWith(document.createRange().createContextualFragment('<div class=\\'gallery-placeholder\\'><i class=\\'bx bx-image\\'></i></div>'));"
                    >
                    ${p.images.length > 1 ? `
                        <button class="gallery-nav-btn prev" data-dir="-1" aria-label="Предыдущее фото"><i class='bx bx-chevron-left'></i></button>
                        <button class="gallery-nav-btn next" data-dir="1" aria-label="Следующее фото"><i class='bx bx-chevron-right'></i></button>
                        <div class="gallery-dots">
                            ${p.images.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}" data-idx="${i}"></span>`).join('')}
                        </div>
                    ` : ''}
                </div>
                <div class="card-content">
                    <span class="card-category">${p.category}</span>
                    <h3 class="card-title">${p.name}</h3>
                    <div class="card-price">${p.priceText}</div>
                    <div class="card-links">
                        <a href="${p.links.foxtrot}" target="_blank" rel="noopener noreferrer" class="store-link" data-tooltip="Открыть в Фокстрот">
                            <i class='bx bx-shopping-bag'></i> Фокстрот
                        </a>
                        <a href="${p.links.comfy}" target="_blank" rel="noopener noreferrer" class="store-link" data-tooltip="Открыть в Comfy">
                            <i class='bx bx-store-alt'></i> Comfy
                        </a>
                    </div>
                    <div class="card-actions">
                        <button class="specs-btn" data-id="${p.id}" data-tooltip="Подробные характеристики устройства">
                            <i class='bx bx-list-ul'></i> Характеристики
                        </button>
                    </div>
                </div>
            `;
            gridEl.appendChild(card);
        });

        updateSummary();
    }

    function updateSummary() {
        if (currentTier === 'primary') {
            currentTierLabel.textContent = 'Основной комплект';
            totalPriceEl.textContent = '29 996 ₴';
        } else {
            currentTierLabel.textContent = 'Запасной комплект';
            totalPriceEl.textContent = '22 996 ₴';
        }
    }

    gridEl.addEventListener('click', (e) => {
        const gallery = e.target.closest('.card-gallery');
        if (!gallery) return;

        const id = gallery.dataset.id;
        const product = PRODUCTS.find(p => p.id === id);
        if (!product || product.images.length <= 1) return;

        const imgEl = gallery.querySelector('.gallery-image');
        const dots = gallery.querySelectorAll('.dot');

        if (e.target.closest('.gallery-nav-btn')) {
            const btn = e.target.closest('.gallery-nav-btn');
            const dir = parseInt(btn.dataset.dir, 10);
            activeGalleryIndices[id] = (activeGalleryIndices[id] + dir + product.images.length) % product.images.length;
            updateGalleryView(imgEl, dots, product.images, activeGalleryIndices[id]);
        } else if (e.target.classList.contains('dot')) {
            const idx = parseInt(e.target.dataset.idx, 10);
            activeGalleryIndices[id] = idx;
            updateGalleryView(imgEl, dots, product.images, idx);
        } else if (e.target.classList.contains('gallery-image')) {
            openZoom(e.target.src);
        }
    });

    function updateGalleryView(imgEl, dots, images, index) {
        if (!imgEl) return;
        imgEl.style.opacity = '0.3';
        setTimeout(() => {
            imgEl.src = images[index];
            imgEl.style.opacity = '1';
        }, 150);

        dots.forEach((d, idx) => {
            d.classList.toggle('active', idx === index);
        });
    }

    gridEl.addEventListener('click', (e) => {
        const btn = e.target.closest('.specs-btn');
        if (!btn) return;

        const id = btn.dataset.id;
        const product = PRODUCTS.find(p => p.id === id);
        if (!product) return;

        modalTitle.textContent = product.name;
        
        let rows = '';
        for (const [key, value] of Object.entries(product.specs)) {
            rows += `<tr><td>${key}</td><td>${value}</td></tr>`;
        }

        modalBody.innerHTML = `<table class="specs-table">${rows}</table>`;
        openModal(specsModal);
    });

    function openModal(modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        if (!specsModal.classList.contains('active') && !zoomModal.classList.contains('active')) {
            document.body.style.overflow = '';
        }
    }

    modalCloseBtn.addEventListener('click', () => closeModal(specsModal));
    modalBackdrop.addEventListener('click', () => closeModal(specsModal));

    function openZoom(src) {
        zoomImg.src = src;
        openModal(zoomModal);
    }

    zoomCloseBtn.addEventListener('click', () => closeModal(zoomModal));
    zoomBackdrop.addEventListener('click', () => closeModal(zoomModal));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (zoomModal.classList.contains('active')) closeModal(zoomModal);
            if (specsModal.classList.contains('active')) closeModal(specsModal);
        }
    });

    tierPrimaryBtn.addEventListener('click', () => {
        currentTier = 'primary';
        tierPrimaryBtn.classList.add('active');
        tierAltBtn.classList.remove('active');
        renderGrid();
    });

    tierAltBtn.addEventListener('click', () => {
        currentTier = 'alt';
        tierAltBtn.classList.add('active');
        tierPrimaryBtn.classList.remove('active');
        renderGrid();
    });

    themeToggleBtn.addEventListener('click', () => {
        const html = document.documentElement;
        const nextTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', nextTheme);
    });

    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest('[data-tooltip]');
        if (!target) {
            tooltipEl.classList.remove('visible');
            return;
        }

        tooltipEl.textContent = target.dataset.tooltip;
        tooltipEl.classList.add('visible');

        const rect = target.getBoundingClientRect();
        const tooltipRect = tooltipEl.getBoundingClientRect();
        
        let top = rect.bottom + 6;
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);

        if (top + tooltipRect.height > window.innerHeight) {
            top = rect.top - tooltipRect.height - 6;
        }
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }

        tooltipEl.style.top = `${top}px`;
        tooltipEl.style.left = `${left}px`;
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('[data-tooltip]')) {
            tooltipEl.classList.remove('visible');
        }
    });

    renderGrid();
});