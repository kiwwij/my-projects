const charsets = {
    standard: 'Ñ@#W$9876543210?!abc;:+=-,._ ',
    blocks: '█▓▒░ ',
    binary: '01 ',
    minimal: '##**++--..  '
};

const state = {
    image: null,
    textMode: false
};

const dom = {
    themeBtn: document.getElementById('themeToggle'),
    body: document.body,
    tabs: document.querySelectorAll('.tab-btn'),
    tabContents: document.querySelectorAll('.tab-content'),
    imageInput: document.getElementById('imageInput'),
    textInput: document.getElementById('textInput'),
    generateBtn: document.getElementById('generateBtn'),
    resetBtn: document.getElementById('resetBtn'),
    copyBtn: document.getElementById('copyBtn'),
    downloadBtn: document.getElementById('downloadBtn'),
    asciiOutput: document.getElementById('asciiOutput'),
    placeholder: document.getElementById('placeholder'),
    uploadLabel: document.querySelector('.upload-label span')
};

function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
        dom.body.classList.add('light-theme');
        dom.themeBtn.innerHTML = "<i class='bx bx-moon'></i>";
    }
}

dom.themeBtn.addEventListener('click', () => {
    const isLight = dom.body.classList.toggle('light-theme');
    dom.themeBtn.innerHTML = isLight ? "<i class='bx bx-moon'></i>" : "<i class='bx bx-sun'></i>";
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

dom.tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        dom.tabs.forEach(t => t.classList.remove('active'));
        dom.tabContents.forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
        state.textMode = tab.dataset.tab === 'textTab';
        autoGenerate();
    });
});

function updateLabels() {
    ['resolution', 'brightness', 'contrast', 'textSize'].forEach(id => {
        const el = document.getElementById(id);
        const valEl = document.getElementById(`${id}Val`);
        if (el && valEl) {
            valEl.textContent = el.value;
        }
    });
}

['resolution', 'brightness', 'contrast', 'textSize', 'charset', 'invert', 'colorMode'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        const eventType = el.type === 'range' ? 'input' : 'change';
        el.addEventListener(eventType, () => {
            updateLabels();
            autoGenerate();
        });
    }
});

dom.textInput.addEventListener('input', autoGenerate);

function autoGenerate() {
    if (state.textMode && dom.textInput.value.trim()) {
        generateASCII();
    } else if (!state.textMode && state.image) {
        generateASCII();
    }
}

dom.resetBtn.addEventListener('click', () => {
    document.getElementById('resolution').value = 0.15;
    document.getElementById('brightness').value = 0;
    document.getElementById('contrast').value = 0;
    document.getElementById('charset').value = 'standard';
    document.getElementById('invert').checked = false;
    document.getElementById('colorMode').checked = false;
    document.getElementById('textSize').value = 60;
    
    updateLabels();
    autoGenerate();
});

dom.imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    dom.uploadLabel.textContent = file.name;
    const reader = new FileReader();
    reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
            state.image = img;
            generateASCII();
        };
        img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
});

function adjustPixel(val, brightness, contrast) {
    let factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
    let newVal = factor * (val - 128) + 128 + brightness;
    return Math.max(0, Math.min(255, newVal));
}

function textToImage(text) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const size = parseInt(document.getElementById('textSize').value);
    
    ctx.font = `bold ${size}px 'Outfit', sans-serif`;
    const lines = text.split('\n');
    let maxWidth = 0;
    lines.forEach(l => maxWidth = Math.max(maxWidth, ctx.measureText(l).width));
    
    canvas.width = maxWidth || 100;
    canvas.height = lines.length * size * 1.2 || 100;
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#000000';
    ctx.font = `bold ${size}px 'Outfit', sans-serif`;
    ctx.textBaseline = 'top';
    lines.forEach((l, i) => ctx.fillText(l, 0, i * size * 1.2));
    
    return canvas;
}

function generateASCII() {
    let sourceCanvas;
    
    if (state.textMode) {
        const text = dom.textInput.value.trim();
        if (!text) return;
        sourceCanvas = textToImage(text);
    } else {
        if (!state.image) return;
        sourceCanvas = document.createElement('canvas');
        sourceCanvas.width = state.image.width;
        sourceCanvas.height = state.image.height;
        sourceCanvas.getContext('2d').drawImage(state.image, 0, 0);
    }

    const res = parseFloat(document.getElementById('resolution').value);
    const bright = parseInt(document.getElementById('brightness').value);
    const contrast = parseInt(document.getElementById('contrast').value);
    const invert = document.getElementById('invert').checked;
    const useColor = document.getElementById('colorMode').checked;
    
    let chars = charsets[document.getElementById('charset').value];
    if (invert) chars = chars.split('').reverse().join('');

    const w = Math.floor(sourceCanvas.width * res);
    const h = Math.floor(sourceCanvas.height * res * 0.55);

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(sourceCanvas, 0, 0, w, h);
    
    const imgData = ctx.getImageData(0, 0, w, h);
    const pixels = imgData.data;
    
    let resultHTML = '';
    
    for (let i = 0; i < pixels.length; i += 4) {
        let r = adjustPixel(pixels[i], bright, contrast);
        let g = adjustPixel(pixels[i+1], bright, contrast);
        let b = adjustPixel(pixels[i+2], bright, contrast);
        
        const avg = (r + g + b) / 3;
        const charIndex = Math.floor((avg / 255) * (chars.length - 1));
        let char = chars[charIndex];
        if (char === ' ') char = '&nbsp;';
        
        if (useColor) {
            resultHTML += `<span style="color: rgb(${r},${g},${b})">${char}</span>`;
        } else {
            resultHTML += char;
        }

        if ((i / 4 + 1) % w === 0) resultHTML += '<br>';
    }

    dom.placeholder.style.display = 'none';
    dom.asciiOutput.style.display = 'block';
    dom.asciiOutput.innerHTML = resultHTML;
}

dom.generateBtn.addEventListener('click', generateASCII);

dom.copyBtn.addEventListener('click', () => {
    if (dom.asciiOutput.style.display === 'none') return;
    navigator.clipboard.writeText(dom.asciiOutput.innerText).then(() => {
        const originalText = dom.copyBtn.innerHTML;
        dom.copyBtn.innerHTML = "<i class='bx bx-check'></i> Успешно!";
        setTimeout(() => dom.copyBtn.innerHTML = originalText, 2000);
    });
});

dom.downloadBtn.addEventListener('click', () => {
    if (dom.asciiOutput.style.display === 'none' || !dom.asciiOutput.innerHTML) return;

    let sourceCanvas;
    if (state.textMode) {
        const text = dom.textInput.value.trim();
        if (!text) return;
        sourceCanvas = textToImage(text);
    } else {
        if (!state.image) return;
        sourceCanvas = document.createElement('canvas');
        sourceCanvas.width = state.image.width;
        sourceCanvas.height = state.image.height;
        sourceCanvas.getContext('2d').drawImage(state.image, 0, 0);
    }

    const res = parseFloat(document.getElementById('resolution').value);
    const bright = parseInt(document.getElementById('brightness').value);
    const contrast = parseInt(document.getElementById('contrast').value);
    const invert = document.getElementById('invert').checked;
    const useColor = document.getElementById('colorMode').checked;
    
    let chars = charsets[document.getElementById('charset').value];
    if (invert) chars = chars.split('').reverse().join('');

    const w = Math.floor(sourceCanvas.width * res);
    const h = Math.floor(sourceCanvas.height * res * 0.55);

    const procCanvas = document.createElement('canvas');
    procCanvas.width = w;
    procCanvas.height = h;
    const procCtx = procCanvas.getContext('2d', { willReadFrequently: true });
    procCtx.drawImage(sourceCanvas, 0, 0, w, h);
    
    const imgData = procCtx.getImageData(0, 0, w, h);
    const pixels = imgData.data;
    const downloadCanvas = document.createElement('canvas');
    const downloadCtx = downloadCanvas.getContext('2d');
    
    const fontSize = 14; 
    downloadCtx.font = `bold ${fontSize}px 'Fira Code', monospace`;
    
    const charWidth = downloadCtx.measureText('M').width;
    const charHeight = fontSize;

    downloadCanvas.width = w * charWidth + 40;
    downloadCanvas.height = h * charHeight + 40;

    const isLight = dom.body.classList.contains('light-theme');
    downloadCtx.fillStyle = isLight ? '#f7f8fa' : '#16161a';
    downloadCtx.fillRect(0, 0, downloadCanvas.width, downloadCanvas.height);
    
    downloadCtx.font = `bold ${fontSize}px 'Fira Code', monospace`;
    downloadCtx.textBaseline = 'top';

    let x = 0;
    let y = 0;

    for (let i = 0; i < pixels.length; i += 4) {
        let r = adjustPixel(pixels[i], bright, contrast);
        let g = adjustPixel(pixels[i+1], bright, contrast);
        let b = adjustPixel(pixels[i+2], bright, contrast);
        
        const avg = (r + g + b) / 3;
        const charIndex = Math.floor((avg / 255) * (chars.length - 1));
        let char = chars[charIndex];

        if (useColor) {
            downloadCtx.fillStyle = `rgb(${r},${g},${b})`;
        } else {
            downloadCtx.fillStyle = isLight ? '#2d2d34' : '#e4e4e6';
        }

        downloadCtx.fillText(char, 20 + x * charWidth, 20 + y * charHeight);

        x++;
        if (x >= w) {
            x = 0;
            y++;
        }
    }

    const link = document.createElement('a');
    link.download = 'ascii-art.png';
    link.href = downloadCanvas.toDataURL('image/png');
    link.click();
});

initTheme();
updateLabels();