document.addEventListener("DOMContentLoaded", () => {
  const THEME_KEY = "theme";
  const CHARSETS = {
    standard: " .:-=+*#%@",
    detailed: " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
    blocks: " ░▒▓█",
    minimal: " .-+#",
    binary: " 01"
  };

  const elements = {
    html: document.documentElement,
    themeToggle: document.getElementById("themeToggle"),
    themeIcon: document.getElementById("themeIcon"),
    videoInput: document.getElementById("videoInput"),
    dropZone: document.getElementById("dropZone"),
    video: document.getElementById("sourceVideo"),
    canvas: document.getElementById("asciiCanvas"),
    originalPlaceholder: document.getElementById("originalPlaceholder"),
    asciiPlaceholder: document.getElementById("asciiPlaceholder"),
    videoLoader: document.getElementById("videoLoader"),
    videoMetaBadge: document.getElementById("videoMetaBadge"),
    gridMetaBadge: document.getElementById("gridMetaBadge"),
    fpsBadge: document.getElementById("fpsBadge"),
    playPauseBtn: document.getElementById("playPauseBtn"),
    playPauseIcon: document.getElementById("playPauseIcon"),
    seekBar: document.getElementById("seekBar"),
    currentTimeLabel: document.getElementById("currentTimeLabel"),
    durationLabel: document.getElementById("durationLabel"),
    muteBtn: document.getElementById("muteBtn"),
    muteIcon: document.getElementById("muteIcon"),
    speedSelect: document.getElementById("speedSelect"),
    snapshotBtn: document.getElementById("snapshotBtn"),
    copyTextBtn: document.getElementById("copyTextBtn"),
    colsRange: document.getElementById("colsRange"),
    colsValue: document.getElementById("colsValue"),
    contrastRange: document.getElementById("contrastRange"),
    contrastValue: document.getElementById("contrastValue"),
    fpsSelect: document.getElementById("fpsSelect"),
    colorModeSelect: document.getElementById("colorModeSelect"),
    charsetSelect: document.getElementById("charsetSelect"),
    invertBtn: document.getElementById("invertBtn"),
    canvasBgBtn: document.getElementById("canvasBgBtn"),
    canvasBgLabel: document.getElementById("canvasBgLabel"),
    resetBtn: document.getElementById("resetBtn"),
    helpBtn: document.getElementById("helpBtn"),
    helpModal: document.getElementById("helpModal"),
    closeHelpBtn: document.getElementById("closeHelpBtn"),
    toast: document.getElementById("toast")
  };

  const ctx = elements.canvas.getContext("2d", { alpha: false });
  const samplerCanvas = document.createElement("canvas");
  const samplerCtx = samplerCanvas.getContext("2d", { willReadFrequently: true });

  const state = {
    objectUrl: null,
    hasVideo: false,
    cols: 100,
    rows: 56,
    contrast: 1.15,
    maxFps: 30,
    colorMode: "color",
    charsetKey: "standard",
    invert: false,
    lightCanvasBg: false,
    rafId: null,
    lastFrameTime: 0,
    fpsFrames: 0,
    fpsLastUpdate: 0,
    charLookup: new Array(256),
    lastAsciiText: "",
    toastTimer: null
  };

  function applyTheme(theme) {
    const resolved = theme === "light" ? "light" : "dark";
    elements.html.setAttribute("data-theme", resolved);
    elements.themeIcon.className = resolved === "dark" ? "bx bx-sun" : "bx bx-moon";
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY) || "dark";
    applyTheme(saved);
  }

  elements.themeToggle.addEventListener("click", () => {
    const current = elements.html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });

  window.addEventListener("storage", (event) => {
    if (event.key === THEME_KEY && event.newValue) {
      applyTheme(event.newValue);
    }
  });

  function showToast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.remove("hidden");
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => {
      elements.toast.classList.add("hidden");
    }, 2400);
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) {
      return "00:00";
    }
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  function rebuildCharLookup() {
    const raw = CHARSETS[state.charsetKey] || CHARSETS.standard;
    const chars = state.invert ? raw.split("").reverse().join("") : raw;
    const lastIdx = chars.length - 1;
    const contrast = state.contrast;

    for (let i = 0; i < 256; i++) {
      let lum = ((i / 255 - 0.5) * contrast + 0.5) * 255;
      if (lum < 0) lum = 0;
      if (lum > 255) lum = 255;
      const idx = Math.round((lum / 255) * lastIdx);
      state.charLookup[i] = chars[idx];
    }
  }

  function updateGridGeometry() {
    if (!state.hasVideo || !elements.video.videoWidth || !elements.video.videoHeight) {
      return;
    }

    const videoAspect = elements.video.videoHeight / elements.video.videoWidth;
    const charAspect = 0.6;
    state.rows = Math.max(14, Math.round(state.cols * videoAspect * charAspect));

    samplerCanvas.width = state.cols;
    samplerCanvas.height = state.rows;

    const targetWidth = Math.min(1200, Math.max(720, state.cols * 9));
    const cellW = Math.max(5, Math.floor(targetWidth / state.cols));
    const cellH = Math.max(8, Math.round(cellW / charAspect));

    elements.canvas.width = state.cols * cellW;
    elements.canvas.height = state.rows * cellH;

    ctx.font = `600 ${cellH}px "JetBrains Mono", monospace`;
    ctx.textBaseline = "top";
    ctx.textAlign = "center";

    elements.gridMetaBadge.textContent = `${state.cols}×${state.rows}`;
  }

  function renderAsciiFrame(captureText = false) {
    if (!state.hasVideo || elements.video.readyState < 2) {
      return;
    }

    const cols = state.cols;
    const rows = state.rows;
    const cellW = elements.canvas.width / cols;
    const cellH = elements.canvas.height / rows;

    samplerCtx.drawImage(elements.video, 0, 0, cols, rows);
    const pixels = samplerCtx.getImageData(0, 0, cols, rows).data;

    ctx.fillStyle = state.lightCanvasBg ? "#f5f7fc" : "#090b10";
    ctx.fillRect(0, 0, elements.canvas.width, elements.canvas.height);

    const lookup = state.charLookup;
    const mode = state.colorMode;
    const monoColor = state.lightCanvasBg ? "#4455d9" : "#8c9bff";

    let lastFill = "";
    let textLines = captureText ? [] : null;

    if (mode === "mono") {
      ctx.fillStyle = monoColor;
      lastFill = monoColor;
    }

    for (let r = 0; r < rows; r++) {
      const y = r * cellH;
      let rowText = captureText ? "" : null;

      for (let c = 0; c < cols; c++) {
        const offset = (r * cols + c) * 4;
        const red = pixels[offset];
        const green = pixels[offset + 1];
        const blue = pixels[offset + 2];
        const lum = (red * 77 + green * 150 + blue * 29) >> 8;
        const ch = lookup[lum];

        if (captureText) {
          rowText += ch;
        }

        if (ch === " ") {
          continue;
        }

        if (mode !== "mono") {
          let fill;
          if (mode === "color") {
            fill = `rgb(${red & 248},${green & 248},${blue & 248})`;
          } else if (mode === "vibrant") {
            const vr = Math.min(255, Math.round(red * 1.2 + 12)) & 248;
            const vg = Math.min(255, Math.round(green * 1.2 + 12)) & 248;
            const vb = Math.min(255, Math.round(blue * 1.2 + 12)) & 248;
            fill = `rgb(${vr},${vg},${vb})`;
          } else if (mode === "grayscale") {
            const g = lum & 248;
            fill = `rgb(${g},${g},${g})`;
          } else {
            const g = Math.min(255, Math.round(lum * 1.15 + 20)) & 248;
            fill = `rgb(24,${g},72)`;
          }

          if (fill !== lastFill) {
            ctx.fillStyle = fill;
            lastFill = fill;
          }
        }

        ctx.fillText(ch, c * cellW + cellW * 0.5, y);
      }

      if (captureText) {
        textLines.push(rowText);
      }
    }

    if (captureText) {
      state.lastAsciiText = textLines.join("\n");
    }
  }

  function stopLoop() {
    if (state.rafId !== null) {
      cancelAnimationFrame(state.rafId);
      state.rafId = null;
    }
    elements.fpsBadge.textContent = "0 FPS";
  }

  function tick(now) {
    if (document.hidden || elements.video.paused || elements.video.ended) {
      stopLoop();
      return;
    }

    const frameInterval = 1000 / state.maxFps;
    if (now - state.lastFrameTime >= frameInterval) {
      state.lastFrameTime = now - ((now - state.lastFrameTime) % frameInterval);
      renderAsciiFrame(false);

      state.fpsFrames++;
      if (now - state.fpsLastUpdate >= 500) {
        const fps = Math.round((state.fpsFrames * 1000) / (now - state.fpsLastUpdate));
        elements.fpsBadge.textContent = `${fps} FPS`;
        state.fpsFrames = 0;
        state.fpsLastUpdate = now;
      }
    }

    state.rafId = requestAnimationFrame(tick);
  }

  function startLoop() {
    if (state.rafId !== null || !state.hasVideo) {
      return;
    }
    state.lastFrameTime = performance.now();
    state.fpsLastUpdate = state.lastFrameTime;
    state.fpsFrames = 0;
    state.rafId = requestAnimationFrame(tick);
  }

  function setControlsEnabled(enabled) {
    elements.playPauseBtn.disabled = !enabled;
    elements.seekBar.disabled = !enabled;
    elements.muteBtn.disabled = !enabled;
    elements.speedSelect.disabled = !enabled;
    elements.snapshotBtn.disabled = !enabled;
    elements.copyTextBtn.disabled = !enabled;
  }

  function loadVideoFile(file) {
    if (!file || !file.type.startsWith("video/")) {
      showToast("Выберите корректный видеофайл");
      return;
    }

    stopLoop();
    if (state.objectUrl) {
      URL.revokeObjectURL(state.objectUrl);
    }

    elements.videoLoader.classList.remove("hidden");
    state.objectUrl = URL.createObjectURL(file);
    elements.video.src = state.objectUrl;
    elements.video.load();
  }

  elements.video.addEventListener("loadedmetadata", () => {
    state.hasVideo = true;
    elements.videoMetaBadge.textContent = `${elements.video.videoWidth}×${elements.video.videoHeight}`;
    elements.durationLabel.textContent = formatTime(elements.video.duration);
    elements.seekBar.max = elements.video.duration || 100;
    elements.seekBar.value = 0;
    elements.currentTimeLabel.textContent = "00:00";

    elements.originalPlaceholder.classList.add("hidden");
    elements.asciiPlaceholder.classList.add("hidden");
    setControlsEnabled(true);
    updateGridGeometry();
  });

  elements.video.addEventListener("loadeddata", () => {
    elements.videoLoader.classList.add("hidden");
    renderAsciiFrame(false);
    elements.video.play().catch(() => {});
  });

  elements.video.addEventListener("error", () => {
    elements.videoLoader.classList.add("hidden");
    showToast("Не удалось декодировать видеофайл");
  });

  elements.video.addEventListener("play", () => {
    elements.playPauseIcon.className = "bx bx-pause";
    startLoop();
  });

  elements.video.addEventListener("pause", () => {
    elements.playPauseIcon.className = "bx bx-play";
    stopLoop();
    renderAsciiFrame(false);
  });

  elements.video.addEventListener("ended", () => {
    elements.playPauseIcon.className = "bx bx-play";
    stopLoop();
  });

  elements.video.addEventListener("timeupdate", () => {
    if (!elements.seekBar.matches(":active")) {
      elements.seekBar.value = elements.video.currentTime;
    }
    elements.currentTimeLabel.textContent = formatTime(elements.video.currentTime);
  });

  elements.video.addEventListener("seeked", () => {
    if (elements.video.paused) {
      renderAsciiFrame(false);
    }
  });

  function togglePlayPause() {
    if (!state.hasVideo) {
      return;
    }
    if (elements.video.paused) {
      elements.video.play().catch(() => {});
    } else {
      elements.video.pause();
    }
  }

  function toggleMute() {
    if (!state.hasVideo) {
      return;
    }
    elements.video.muted = !elements.video.muted;
    elements.muteIcon.className = elements.video.muted ? "bx bx-volume-mute" : "bx bx-volume-full";
  }

  function saveSnapshot() {
    if (!state.hasVideo) {
      return;
    }
    renderAsciiFrame(false);
    const link = document.createElement("a");
    link.download = `ascii-frame-${Date.now()}.png`;
    link.href = elements.canvas.toDataURL("image/png");
    link.click();
    showToast("Кадр сохранён как PNG");
  }

  async function copyAsciiText() {
    if (!state.hasVideo) {
      return;
    }
    renderAsciiFrame(true);
    try {
      await navigator.clipboard.writeText(state.lastAsciiText);
      showToast("ASCII-кадр скопирован в буфер обмена");
    } catch {
      showToast("Не удалось скопировать текст");
    }
  }

  elements.videoInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      loadVideoFile(file);
    }
    event.target.value = "";
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    elements.dropZone.addEventListener(eventName, (event) => {
      event.preventDefault();
      elements.dropZone.classList.add("drag-over");
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    elements.dropZone.addEventListener(eventName, (event) => {
      event.preventDefault();
      elements.dropZone.classList.remove("drag-over");
    });
  });

  elements.dropZone.addEventListener("drop", (event) => {
    const file = event.dataTransfer.files[0];
    if (file) {
      loadVideoFile(file);
    }
  });

  elements.playPauseBtn.addEventListener("click", togglePlayPause);
  elements.muteBtn.addEventListener("click", toggleMute);
  elements.snapshotBtn.addEventListener("click", saveSnapshot);
  elements.copyTextBtn.addEventListener("click", copyAsciiText);

  elements.seekBar.addEventListener("input", () => {
    elements.video.currentTime = parseFloat(elements.seekBar.value);
    elements.currentTimeLabel.textContent = formatTime(elements.video.currentTime);
  });

  elements.speedSelect.addEventListener("change", () => {
    elements.video.playbackRate = parseFloat(elements.speedSelect.value);
  });

  elements.colsRange.addEventListener("input", () => {
    state.cols = parseInt(elements.colsRange.value, 10);
    elements.colsValue.textContent = state.cols;
    updateGridGeometry();
    renderAsciiFrame(false);
  });

  elements.contrastRange.addEventListener("input", () => {
    state.contrast = parseFloat(elements.contrastRange.value);
    elements.contrastValue.textContent = state.contrast.toFixed(2);
    rebuildCharLookup();
    renderAsciiFrame(false);
  });

  elements.fpsSelect.addEventListener("change", () => {
    state.maxFps = parseInt(elements.fpsSelect.value, 10);
  });

  elements.colorModeSelect.addEventListener("change", () => {
    state.colorMode = elements.colorModeSelect.value;
    renderAsciiFrame(false);
  });

  elements.charsetSelect.addEventListener("change", () => {
    state.charsetKey = elements.charsetSelect.value;
    rebuildCharLookup();
    renderAsciiFrame(false);
  });

  elements.invertBtn.addEventListener("click", () => {
    state.invert = !state.invert;
    elements.invertBtn.classList.toggle("active", state.invert);
    elements.invertBtn.setAttribute("aria-pressed", String(state.invert));
    rebuildCharLookup();
    renderAsciiFrame(false);
  });

  elements.canvasBgBtn.addEventListener("click", () => {
    state.lightCanvasBg = !state.lightCanvasBg;
    elements.canvasBgBtn.classList.toggle("active", state.lightCanvasBg);
    elements.canvasBgBtn.setAttribute("aria-pressed", String(state.lightCanvasBg));
    elements.canvasBgLabel.textContent = state.lightCanvasBg ? "Светлый фон" : "Тёмный фон";
    renderAsciiFrame(false);
  });

  elements.resetBtn.addEventListener("click", () => {
    state.cols = 100;
    state.contrast = 1.15;
    state.maxFps = 30;
    state.colorMode = "color";
    state.charsetKey = "standard";
    state.invert = false;
    state.lightCanvasBg = false;

    elements.colsRange.value = "100";
    elements.colsValue.textContent = "100";
    elements.contrastRange.value = "1.15";
    elements.contrastValue.textContent = "1.15";
    elements.fpsSelect.value = "30";
    elements.colorModeSelect.value = "color";
    elements.charsetSelect.value = "standard";
    elements.invertBtn.classList.remove("active");
    elements.invertBtn.setAttribute("aria-pressed", "false");
    elements.canvasBgBtn.classList.remove("active");
    elements.canvasBgBtn.setAttribute("aria-pressed", "false");
    elements.canvasBgLabel.textContent = "Тёмный фон";

    rebuildCharLookup();
    updateGridGeometry();
    renderAsciiFrame(false);
    showToast("Настройки сброшены");
  });

  function openHelpModal() {
    elements.helpModal.classList.remove("hidden");
  }

  function closeHelpModal() {
    elements.helpModal.classList.add("hidden");
  }

  elements.helpBtn.addEventListener("click", openHelpModal);
  elements.closeHelpBtn.addEventListener("click", closeHelpModal);

  elements.helpModal.addEventListener("click", (event) => {
    if (event.target === elements.helpModal) {
      closeHelpModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !elements.helpModal.classList.contains("hidden")) {
      closeHelpModal();
      return;
    }

    const tag = document.activeElement.tagName;
    if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") {
      return;
    }

    if (event.code === "Space" && state.hasVideo) {
      event.preventDefault();
      togglePlayPause();
    } else if (event.key === "ArrowRight" && state.hasVideo) {
      elements.video.currentTime = Math.min(elements.video.duration, elements.video.currentTime + 5);
    } else if (event.key === "ArrowLeft" && state.hasVideo) {
      elements.video.currentTime = Math.max(0, elements.video.currentTime - 5);
    } else if (event.key.toLowerCase() === "m" && state.hasVideo) {
      toggleMute();
    } else if (event.key.toLowerCase() === "s" && state.hasVideo) {
      event.preventDefault();
      saveSnapshot();
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopLoop();
    } else if (state.hasVideo && !elements.video.paused) {
      startLoop();
    }
  });

  window.addEventListener("beforeunload", () => {
    if (state.objectUrl) {
      URL.revokeObjectURL(state.objectUrl);
    }
  });

  initTheme();
  rebuildCharLookup();
});