document.addEventListener('DOMContentLoaded', () => {
    const customGalleries = {
        "goodPictures": [
    "https://i.pinimg.com/736x/62/64/1e/62641ed0b035f37ac393c64935101b07.jpg",
    "https://i.pinimg.com/736x/f6/5d/6e/f65d6ed09ad9df7178926b8e609cf108.jpg",
    "https://i.pinimg.com/736x/c9/b8/6a/c9b86a5a35bdac2fc1ed0bb6c7a889b3.jpg",
    "https://i.pinimg.com/736x/64/02/6b/64026bab172aedd2e8725e857af95492.jpg",
    "https://i.pinimg.com/736x/3f/74/52/3f745255dfa693e5af17e24dd68af755.jpg",
    "https://i.pinimg.com/736x/d3/21/c3/d321c3fe9ad330b21f0d21097e20945c.jpg",
    "https://i.pinimg.com/736x/e7/59/f3/e759f37adc1cca3ff8b04e9db3f4ae28.jpg",
    "https://i.pinimg.com/736x/6c/2a/8a/6c2a8a1f3faa6a41266ae04ef2dfe312.jpg",
    "https://i.pinimg.com/736x/98/0c/6b/980c6bd958e41d639fa8d9b0f608476d.jpg",
    "https://i.pinimg.com/736x/06/12/3f/06123fc064706472985b90409f8a25c6.jpg",
    "https://i.pinimg.com/736x/7c/3b/6f/7c3b6f7a4f4736dc0176b8cdec8f50a0.jpg",
    "https://i.pinimg.com/736x/d4/25/51/d42551353e570b53f8772de5b1a463e0.jpg",
    "https://i.pinimg.com/736x/44/db/fb/44dbfbe18bab14f7f2c4eb65eaf2839a.jpg",
    "https://i.pinimg.com/736x/9f/6a/e9/9f6ae9fcf754e91c7416e493e1dce9af.jpg",
    "https://i.pinimg.com/736x/3a/cc/d6/3accd66a3e393e4d8aac465e0d15c2c7.jpg",
    "https://i.pinimg.com/736x/a6/6d/c9/a66dc9713cf483f87a96e317f61b5dfe.jpg",
    "https://i.pinimg.com/736x/d1/d9/af/d1d9afef182e1122d69877820dd9964f.jpg",
    "https://i.pinimg.com/736x/a1/22/fe/a122feeef2ce4247a240e7efc5b60357.jpg",
    "https://i.pinimg.com/736x/92/fd/ca/92fdca14bfaa52d9e1e96f245692c1d3.jpg",
    "https://i.pinimg.com/736x/5d/fa/13/5dfa13cb010ce21f715769cc4825c369.jpg",
    "https://i.pinimg.com/736x/52/d2/1b/52d21b057d4521db2d730017d5fd234c.jpg",
    "https://i.pinimg.com/736x/d5/8a/b2/d58ab2736056450922e34ff7e02a4192.jpg",
    "https://i.pinimg.com/736x/8b/1b/46/8b1b466836a25510e409060b84115e2f.jpg",
    "https://i.pinimg.com/736x/ce/7d/c1/ce7dc1bbde0b8ef8b377adfd7e8c1098.jpg",
    "https://i.pinimg.com/736x/d5/d7/93/d5d7937ec55d6996fdd7cd7e1e3bfb24.jpg",
    "https://i.pinimg.com/736x/5b/03/fa/5b03fa4a07b314204945128a23672384.jpg",
    "https://i.pinimg.com/736x/8f/29/d5/8f29d5dee282900fc3d95a260098aa41.jpg",
    "https://i.pinimg.com/736x/da/2a/28/da2a2828eaac17133b7550a81a2cbd09.jpg",
    "https://i.pinimg.com/736x/55/a2/e2/55a2e2029bbf749dcb2689b4f62c5587.jpg"
],
        "tattoo": [
    "https://i.pinimg.com/736x/5e/80/0c/5e800c91ef2255e777ffa0476d14131d.jpg",
    "https://i.pinimg.com/736x/38/2c/74/382c7446a6f1a5f415433073310ab027.jpg",
    "https://i.pinimg.com/736x/0f/38/11/0f381129253d72801b10186218a96bd1.jpg",
    "https://i.pinimg.com/736x/45/67/a8/4567a87475deb593add3b9d1fdba60cf.jpg",
    "https://i.pinimg.com/736x/5c/1a/da/5c1adaa9f8815bc63761b361a81f5be7.jpg",
    "https://i.pinimg.com/736x/07/90/19/0790193f3224362d15b50a439b0b074e.jpg",
    "https://i.pinimg.com/736x/ea/20/e3/ea20e372222ccab252ec97a43a60b53e.jpg",
    "https://i.pinimg.com/736x/cc/c6/b1/ccc6b1457524e15f2cc41a4cf71ea26c.jpg",
    "https://i.pinimg.com/736x/dc/2b/6f/dc2b6f7d9b14d84f53847b3865c466f4.jpg",
    "https://i.pinimg.com/736x/2d/3b/81/2d3b8171693e06b85d44906cd067aee1.jpg",
    "https://i.pinimg.com/736x/5f/ff/32/5fff327ae81e014dc54a1ad4ba60f1ea.jpg",
    "https://i.pinimg.com/736x/cb/65/37/cb6537a2131bf69403baeeb174caffa2.jpg",
    "https://i.pinimg.com/736x/35/aa/ca/35aaca67d8af739894b2866eb10795af.jpg",
    "https://i.pinimg.com/736x/56/40/4c/56404ce8964cb3c47f1a9ef996c4c1e0.jpg",
    "https://i.pinimg.com/736x/75/25/11/7525115404509482310f5edb0c46f462.jpg",
    "https://i.pinimg.com/736x/e2/1c/c3/e21cc38770392de2ed334ceca07dd330.jpg",
    "https://i.pinimg.com/736x/fd/af/4e/fdaf4eda320c609946b6d1cb04f89575.jpg",
    "https://i.pinimg.com/736x/b0/b3/d7/b0b3d7d1a4553829001c1378c97843fe.jpg",
    "https://i.pinimg.com/736x/2c/42/3e/2c423e0298b94e14a27222db8a898d33.jpg",
    "https://i.pinimg.com/736x/63/36/3d/63363df88e0a0ea88b0e3286646bb193.jpg",
    "https://i.pinimg.com/736x/14/e1/09/14e109fbd03c4118f9964de15d8d4290.jpg"
],
        "animeGifs": [
    "https://i.pinimg.com/736x/cb/13/fa/cb13fadb20b8b33d387041ce9423d3d0.jpg",
    "https://i.pinimg.com/736x/39/5a/a9/395aa935e87e1f7e0161d28f3d0ff3a1.jpg",
    "https://i.pinimg.com/736x/7a/97/9a/7a979a5dbeb032d65d0fd03379760c88.jpg",
    "https://i.pinimg.com/736x/d6/ec/f1/d6ecf132eb318d96872d356aa09c420a.jpg",
    "https://i.pinimg.com/736x/26/7f/a1/267fa108aab768b128e93772ff415204.jpg",
    "https://i.pinimg.com/736x/33/f1/18/33f11820a0267c02aa4ddd145aceea93.jpg",
    "https://i.pinimg.com/736x/02/39/34/0239343eacf349828a7b38824e52c794.jpg",
    "https://i.pinimg.com/736x/3b/6b/56/3b6b562894cf486d3efa001f9bc17529.jpg",
    "https://i.pinimg.com/736x/94/92/77/94927758da49e22d1584f9dd766d8345.jpg",
    "https://i.pinimg.com/736x/d2/47/3a/d2473af108319df0556ef57de59d01aa.jpg",
    "https://i.pinimg.com/736x/ff/69/00/ff690005e52c7b9107a792717e38c62e.jpg",
    "https://i.pinimg.com/736x/aa/81/d0/aa81d06aab5a2ff94bba69918968309f.jpg",
    "https://i.pinimg.com/736x/7f/17/7b/7f177b6b2790b7b842e2cc1e51486a09.jpg",
    "https://i.pinimg.com/736x/d5/0d/df/d50ddfeddd09377c9f7c0576d245de65.jpg",
    "https://i.pinimg.com/736x/b8/b3/dd/b8b3ddeb4cd4ff7c0586ae99361e16a2.jpg",
    "https://i.pinimg.com/736x/e3/93/20/e39320091eb2ef933544507ad88bbf76.jpg",
    "https://i.pinimg.com/736x/c6/8d/d0/c68dd024208658581c618012f8a830b2.jpg",
    "https://i.pinimg.com/736x/ed/f8/e9/edf8e9869b6bdd409e53ec96b785fe6d.jpg",
    "https://i.pinimg.com/736x/c5/2c/31/c52c31726701e286da2979149ae2eb8e.jpg",
    "https://i.pinimg.com/736x/dc/b8/ba/dcb8babc42dfacb8bcf9bda39c919d82.jpg"
],
        "avatars2025": [
    "https://i.pinimg.com/736x/89/74/fd/8974fd796d4d130189baaed7b751c1b0.jpg",
    "https://i.pinimg.com/736x/66/45/a9/6645a9767bf37dc22414001bd95035be.jpg",
    "https://i.pinimg.com/736x/a1/8e/da/a18eda706b1e1b9b0afcd7f2f0b3c69e.jpg",
    "https://i.pinimg.com/736x/59/68/e0/5968e059f75f03a83dd0f67413dfceff.jpg",
    "https://i.pinimg.com/736x/6f/e9/b5/6fe9b5370a83fee487e8334b67ff2dfa.jpg",
    "https://i.pinimg.com/736x/92/22/ff/9222ff5965e2e8fc7684f2dab90806b4.jpg",
    "https://i.pinimg.com/736x/19/92/35/19923519c0d8797718c5c33e196ed0ac.jpg",
    "https://i.pinimg.com/736x/aa/94/51/aa9451ce4567231ab1b40dcbac767468.jpg",
    "https://i.pinimg.com/736x/61/3e/0f/613e0f1e769bff8a750951234dfe5950.jpg",
    "https://i.pinimg.com/736x/26/b2/a5/26b2a5c65d6f176aaf2e12631c0586b1.jpg",
    "https://i.pinimg.com/736x/c2/a9/11/c2a91135a77128f3f1ac61b1c5c2683f.jpg",
    "https://i.pinimg.com/736x/25/01/50/25015067c4466465eaf912a36ea77681.jpg",
    "https://i.pinimg.com/736x/43/55/3e/43553e67a9f47547b441167d3dbe9a36.jpg",
    "https://i.pinimg.com/736x/d5/98/20/d59820fd37dbf6500a0d2a32f4b5a34a.jpg",
    "https://i.pinimg.com/736x/a1/62/be/a162bed10ddf80e9ae66d8d7552fc120.jpg",
    "https://i.pinimg.com/736x/0d/ec/80/0dec80f11c8f634e42749ffee2341ae5.jpg"
],
        "avatars202526": [
    "https://i.pinimg.com/736x/52/a8/13/52a8131a3c051ff0f35307972d1a3dd3.jpg",
    "https://i.pinimg.com/736x/2b/d0/f3/2bd0f35ba12d486dff552428dcecf3f0.jpg",
    "https://i.pinimg.com/736x/61/46/a6/6146a6fdcddd5e20e2b20c090b935006.jpg",
    "https://i.pinimg.com/736x/1b/ae/47/1bae478478c8c95b719fbda891efeaff.jpg",
    "https://i.pinimg.com/736x/70/27/ae/7027ae797c9e8825665d237288add706.jpg",
    "https://i.pinimg.com/736x/7b/8c/bd/7b8cbd0fc6b49476c20e0d54dc937034.jpg",
    "https://i.pinimg.com/736x/41/bc/c2/41bcc2abb4ea3f030bae776b31e53d14.jpg",
    "https://i.pinimg.com/736x/3a/41/22/3a412297e596af4d6cefddcc6f53a3f8.jpg",
    "https://i.pinimg.com/736x/19/84/c2/1984c2ed54ee050ebf19bc6cbba74594.jpg",
    "https://i.pinimg.com/736x/30/5c/b3/305cb37489304d21feee7d924c5a86b8.jpg",
    "https://i.pinimg.com/736x/8d/79/4c/8d794c756097f1eff26ffe08f64735b3.jpg",
    "https://i.pinimg.com/736x/5f/50/9b/5f509b1ef81342372d29974be2a12eab.jpg",
    "https://i.pinimg.com/736x/d5/ab/0b/d5ab0b5cfec93d46954f82a271873b69.jpg",
    "https://i.pinimg.com/736x/bc/5d/1b/bc5d1b193ea26ed09f2b68a031ea31f4.jpg",
    "https://i.pinimg.com/736x/8f/d2/29/8fd22933679d26440f454da71eaa32d3.jpg",
    "https://i.pinimg.com/736x/6b/6f/65/6b6f658509ce3ebe17b09f0fa799b254.jpg",
    "https://i.pinimg.com/736x/80/6d/b3/806db37b6c419c25e0d329238ce62b57.jpg",
    "https://i.pinimg.com/736x/38/4f/82/384f82de0bec80723e78de7db0faaa7f.jpg",
    "https://i.pinimg.com/736x/b3/b8/68/b3b8682d096822334013e1ff4905e94b.jpg",
    "https://i.pinimg.com/736x/56/84/6c/56846cd92db0ce2a996f32aa07fcaf2a.jpg"
],
        "avatars202425": [
    "https://i.pinimg.com/736x/60/60/77/606077e1db6f06ec3ad1543f1f540cd3.jpg",
    "https://i.pinimg.com/736x/da/a9/3a/daa93a2e2d1677cae2c4b18f5ef93d96.jpg",
    "https://i.pinimg.com/736x/89/16/f2/8916f2cd82ed0babc658deda10a958af.jpg",
    "https://i.pinimg.com/736x/4b/d8/4f/4bd84f10ac89dc7fd7f993b0394ceccb.jpg",
    "https://i.pinimg.com/736x/c9/b7/c3/c9b7c3c93ffb69a3f2368b6617d37b7e.jpg",
    "https://i.pinimg.com/736x/71/53/5c/71535cb8e6ad1e6b9e939bd7d9080b40.jpg",
    "https://i.pinimg.com/736x/2a/2a/06/2a2a066e305f9763ced5bd44fc7e9bea.jpg",
    "https://i.pinimg.com/736x/d5/5e/ab/d55eab376016dce6bd55b88b6e0b867b.jpg",
    "https://i.pinimg.com/736x/3a/a8/86/3aa886ab8fef680866efbd85704e9d2d.jpg",
    "https://i.pinimg.com/736x/88/a3/21/88a3218751df3b999c21edab7c5ddee5.jpg",
    "https://i.pinimg.com/736x/f0/4f/04/f04f04d05ef594d350b294af0f7d4a85.jpg",
    "https://i.pinimg.com/736x/ed/52/88/ed5288ca37c6e22f124acdbe0c4d6cdd.jpg",
    "https://i.pinimg.com/736x/3c/c6/8f/3cc68fb569e27cc7fe06d2d71b509826.jpg",
    "https://i.pinimg.com/736x/5a/0e/b0/5a0eb07a91fc49f6994e2435f8d39cef.jpg",
    "https://i.pinimg.com/736x/53/a0/3d/53a03dfe10d137fe7427b48471e2c5aa.jpg",
    "https://i.pinimg.com/736x/e6/5d/50/e65d50f699ab952ca89c8525058c4a0d.jpg",
    "https://i.pinimg.com/736x/97/41/f0/9741f0c6151635b29300e6f7656e1644.jpg",
    "https://i.pinimg.com/736x/74/51/56/745156cf7bcae1566b162dadce03207e.jpg",
    "https://i.pinimg.com/736x/67/53/0a/67530aa243ac0271b19c68078f47f22e.jpg",
    "https://i.pinimg.com/736x/eb/61/70/eb61704b1f2615c211c917c2bcaf0311.jpg",
    "https://i.pinimg.com/736x/ff/69/00/ff690005e52c7b9107a792717e38c62e.jpg",
    "https://i.pinimg.com/736x/d2/47/3a/d2473af108319df0556ef57de59d01aa.jpg",
    "https://i.pinimg.com/736x/b3/59/6a/b3596ad913b8b0046ec352b29f112905.jpg",
    "https://i.pinimg.com/736x/c8/16/b8/c816b84f4d446d308f2070fd3b48f24e.jpg",
    "https://i.pinimg.com/736x/f1/46/fc/f146fce8538bb966a4135dfa929b47d8.jpg",
    "https://i.pinimg.com/736x/9c/13/01/9c1301e791e9c08e4a90b23ccd412b1b.jpg",
    "https://i.pinimg.com/736x/a4/82/87/a4828743a440099a3e78b8c702e5dcc7.jpg",
    "https://i.pinimg.com/736x/34/79/8b/34798bc813fe0004cdcc1f3d1cef8331.jpg",
    "https://i.pinimg.com/736x/66/46/af/6646af0914e976c2590a56117d221668.jpg",
    "https://i.pinimg.com/736x/42/78/d6/4278d6500cc8e3e2b5a028e200356cc4.jpg",
    "https://i.pinimg.com/736x/f2/c7/51/f2c7519599b60d8994cd42883bfbfc75.jpg",
    "https://i.pinimg.com/736x/5f/f5/3b/5ff53b2885f04d3f5e279cf232f3cf53.jpg",
    "https://i.pinimg.com/736x/d6/c9/ba/d6c9bacc1d3d5121af48940e8c8a034f.jpg",
    "https://i.pinimg.com/736x/b9/fb/58/b9fb58a302f7a11f3a2339a10c735510.jpg"
]
    };

    const themeBtn = document.getElementById('theme-toggle');
    const icon = themeBtn.querySelector('i');
    
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeBtn.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            icon.classList.remove('bx-moon'); icon.classList.add('bx-sun');
            themeBtn.setAttribute('title', 'Включить светлую тему');
        } else {
            icon.classList.remove('bx-sun'); icon.classList.add('bx-moon');
            themeBtn.setAttribute('title', 'Включить тёмную тему');
        }
    }

    const customCards = document.querySelectorAll('.custom-board');
    customCards.forEach(card => {
        const id = card.getAttribute('data-id');
        const count = customGalleries[id] ? customGalleries[id].length : 0;
        const countSpan = card.querySelector('.pin-count');
        if (countSpan) {
            countSpan.textContent = count;
        }
    });

    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');
    const widgetContainer = document.getElementById('widget-container');
    const cards = document.querySelectorAll('.card');

    function openWidget(card) {
        widgetContainer.innerHTML = ''; 
        const type = card.getAttribute('data-type');
        
        if (type === 'embedBoard' || type === 'embedUser') {
            widgetContainer.classList.remove('custom-grid-active');
            const url = card.getAttribute('data-url');
            const anchor = document.createElement('a');
            anchor.setAttribute('data-pin-do', type);
            anchor.setAttribute('href', url);
            anchor.setAttribute('data-pin-scale-width', '115');
            anchor.setAttribute('data-pin-scale-height', '400');
            anchor.setAttribute('data-pin-board-width', window.innerWidth < 600 ? '300' : '600');
            
            widgetContainer.appendChild(anchor);
            if (window.PinUtils && typeof window.PinUtils.build === 'function') {
                window.PinUtils.build();
            }
        } 
        else if (type === 'customGallery') {
            const galleryId = card.getAttribute('data-id');
            const images = customGalleries[galleryId] || [];
            
            widgetContainer.classList.add('custom-grid-active');
            
            if(images.length === 0) {
                widgetContainer.innerHTML = '<p>Нет сохраненных пинов.</p>';
            } else {
                images.forEach(src => {
                    const link = document.createElement('a');
                    link.href = src;
                    link.target = "_blank";
                    link.title = "Открыть оригинал";

                    const img = document.createElement('img');
                    img.src = src;
                    img.loading = 'lazy'; 

                    link.appendChild(img);
                    widgetContainer.appendChild(link);
                });
            }
        }
        modal.classList.add('active');
    }

    cards.forEach(card => card.addEventListener('click', () => openWidget(card)));

    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => { widgetContainer.innerHTML = ''; }, 300);
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('active')) closeModal(); });
});