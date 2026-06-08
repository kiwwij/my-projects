async function getKyivTime() {
  try {
    const response = await fetch('https://worldtimeapi.org/api/timezone/Europe/Kyiv');
    const data = await response.json();
    return new Date(data.datetime);
  } catch (error) {
    console.error('Ошибка получения времени, fallback на локальное:', error);
    return new Date();
  }
}

document.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById("background-music");
    const toggleBtn = document.getElementById("musicToggle");

    if (!music || !toggleBtn) return;

    music.volume = 0.5;
    const playMusic = () => {
        music.play().catch(() => {
            console.log("Автовоспроизведение заблокировано браузером. Нужен клик пользователя.");
        });
    };
    playMusic();

    toggleBtn.addEventListener("click", () => {
        if (music.paused) {
            music.play();
            toggleBtn.textContent = "🔊";
        } else {
            music.pause();
            toggleBtn.textContent = "🔇";
        }
    });
});

function playSound(id) {
  const sound = document.getElementById(id);
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(err => console.log('Звук не воспроизведён:', err));
  }
}

function createConfetti() {
  const colors = ['#ff5e62', '#66ccff', '#ffcc66', '#6acc66', '#cc66ff'];
  playSound('sound-confetti');

  for (let i = 0; i < 150; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.width = Math.random() * 15 + 5 + 'px';
    confetti.style.height = Math.random() * 15 + 5 + 'px';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    document.body.appendChild(confetti);

    const animation = confetti.animate([
      { top: '-10px', transform: 'rotate(0deg)' },
      { top: '100vh', transform: `rotate(${Math.random() * 1000}deg)` }
    ], {
      duration: Math.random() * 3000 + 2000,
      easing: 'cubic-bezier(0.1, 0.8, 0.1, 1)'
    });

    animation.onfinish = () => confetti.remove();
  }
}

function popBalloon(el) {
  if (el.dataset.popped === 'true') return;

  playSound('sound-pop');

  const wishes = [
    "Счастья!", "Здоровья!", "Удачи!",
    "Любви!", "Деняг!", "Успехов!"
  ];

  el.style.transition = 'transform 0.3s, opacity 0.3s';
  el.style.transform = 'scale(1.5)';
  el.style.opacity = '0';

  setTimeout(() => {
    el.innerText = wishes[Math.floor(Math.random() * wishes.length)];
    el.style.backgroundColor = 'transparent';
    el.style.transform = 'scale(1)';
    el.style.opacity = '1';
    el.style.boxShadow = 'none';
    el.style.cursor = 'default';
    el.dataset.popped = 'true';
  }, 300);
}

let correctCount = 0;
let totalCorrect = 3;
let answered = new Set();

function checkAnswer(element) {
    const result = document.getElementById('quiz-result');
    if (answered.has(element)) return;
    answered.add(element);

    if (element.dataset.correct === "true") {
        correctCount++;
        element.style.backgroundColor = "#6acc66";
        element.style.color = "#fff";
        playSound('sound-correct');

        result.textContent = `Отлично! Ты нашёл ${correctCount} из ${totalCorrect} правильных ответов. 🎉`;

        if (correctCount === totalCorrect) {
            result.textContent = "Поздравляю! Ты нашёл все правильные ответы! 🏆";
        }
    } else {
        element.style.backgroundColor = "#ff5e62";
        element.style.color = "#fff";
        playSound('sound-wrong');
        result.textContent = "Упс, этот ответ неправильный 😢";
    }
}

async function updateCountdownPage() {
  const now = await getKyivTime();
  
  const kyivDay = parseInt(now.toLocaleDateString('en-US', { day: 'numeric', timeZone: 'Europe/Kyiv' }));
  const kyivMonth = parseInt(now.toLocaleDateString('en-US', { month: 'numeric', timeZone: 'Europe/Kyiv' })) - 1;
  
  if (kyivMonth === 5 && kyivDay >= 8 && kyivDay <= 10) {
    window.location.href = '../day-x.html';
    return;
  }

  let currentYear = parseInt(now.toLocaleDateString('en-US', { year: 'numeric', timeZone: 'Europe/Kyiv' }));
  let targetYear = currentYear;
  
  const june10End = new Date(new Date(currentYear, 5, 10, 23, 59, 59).toLocaleString('en-US', { timeZone: 'Europe/Kyiv' }));
  if (now > june10End) {
    targetYear++;
  }
  
  const targetDate = new Date(`${targetYear}-06-08T00:00:00+03:00`);
  const diff = targetDate - now;

  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const minutes = Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
  const seconds = Math.max(0, Math.floor((diff % (1000 * 60)) / 1000));

  const dEl = document.getElementById('countdown-days');
  const hEl = document.getElementById('countdown-hours');
  const mEl = document.getElementById('countdown-minutes');
  const sEl = document.getElementById('countdown-seconds');

  if (dEl) dEl.textContent = days;
  if (hEl) hEl.textContent = hours;
  if (mEl) mEl.textContent = minutes;
  if (sEl) sEl.textContent = seconds;
}

function getGoogleCalendarLink() {
  const now = new Date();
  let year = now.getFullYear();

  const birthdayThisYear = new Date(year, 5, 8);
  if (now > birthdayThisYear) {
    year++;
  }

  const start = `${year}0608T000000Z`;
  const end = `${year}0608T235900Z`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Зайди+на+сайт!+https://kiwwij.github.io/my-projects/day-x/index.html&details=Не+забудь+зайти+на+сайт!&dates=${start}/${end}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const link = document.getElementById('calendarLink');
  if (link) {
    link.href = getGoogleCalendarLink();
  }
});

function initCountdownMusic() {
  const music = document.getElementById('countdown-music');
  const btn = document.getElementById('musicToggle');
  if (!music || !btn) return;

  music.volume = 0.4;
  let isPlaying = false;

  const playMusic = () => {
    music.play().then(() => {
      isPlaying = true;
      btn.textContent = '🔊';
    }).catch(() => {
      console.log('Автовоспроизведение заблокировано');
      btn.textContent = '🔇';
    });
  };

  playMusic();

  const userInteractionHandler = () => {
    if (!isPlaying) playMusic();
    window.removeEventListener('click', userInteractionHandler);
    window.removeEventListener('keydown', userInteractionHandler);
  };
  window.addEventListener('click', userInteractionHandler);
  window.addEventListener('keydown', userInteractionHandler);

  btn.addEventListener('click', () => {
    if (isPlaying) {
      music.pause();
      btn.textContent = '🔇';
    } else {
      music.play().catch(err => console.log('Ошибка воспроизведения:', err));
      btn.textContent = '🔊';
    }
    isPlaying = !isPlaying;
  });
}

async function init() {
  const isCountdownPage = window.location.href.includes('countdown.html');
  const now = await getKyivTime();
  
  const kyivDay = parseInt(now.toLocaleDateString('en-US', { day: 'numeric', timeZone: 'Europe/Kyiv' }));
  const kyivMonth = parseInt(now.toLocaleDateString('en-US', { month: 'numeric', timeZone: 'Europe/Kyiv' })) - 1;
  
  const isBirthdayPeriod = (kyivMonth === 5 && kyivDay >= 8 && kyivDay <= 10);
  
  if (isBirthdayPeriod) {
    if (isCountdownPage) {
      window.location.href = '../day-x.html';
    } else {
      const content = document.getElementById('birthdayContent');
      if (content) content.style.display = 'block';
    }
  } else {
    if (!isCountdownPage) {
      window.location.href = 'day-x/countdown.html';
    } else {
      await updateCountdownPage();
      setInterval(updateCountdownPage, 1000);
      initCountdownMusic();
      createSeasonEffect();
    }
  }
}

window.onload = init;

function createSeasonEffect() {
  const month = new Date().getMonth();
  if (month === 11 || month <= 1) {
    createSnow();
  } else if (month >= 2 && month <= 4) {
    createRain();
  } else if (month >= 5 && month <= 7) {
    createSummerFlowers();
  } else if (month >= 8 && month <= 10) {
    createLeaves();
  }
}

function createSnow() {
  setInterval(() => {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
    snowflake.textContent = '❄';
    document.body.appendChild(snowflake);
    setTimeout(() => snowflake.remove(), 8000);
  }, 200);
}

function createRain() {
  setInterval(() => {
    const drop = document.createElement('div');
    drop.className = 'raindrop';
    drop.style.left = Math.random() * 100 + 'vw';
    document.body.appendChild(drop);
    setTimeout(() => drop.remove(), 2000);
  }, 100);
}

function createSummerFlowers() {
  const flowers = ['🌸', '🌼', '🌺'];
  setInterval(() => {
    const flower = document.createElement('div');
    flower.className = 'flower';
    flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    flower.style.position = 'fixed';
    flower.style.left = Math.random() * 100 + 'vw';
    flower.style.top = '-20px';
    flower.style.fontSize = (Math.random() * 20 + 15) + 'px';
    flower.style.zIndex = '0';
    flower.style.pointerEvents = 'none';
    flower.style.transition = 'all 5s linear';
    document.body.appendChild(flower);

    setTimeout(() => {
      flower.style.top = '100vh';
      flower.style.left = parseFloat(flower.style.left) + (Math.random() * 50 - 25) + 'vw';
      flower.style.opacity = '0.8';
    }, 50);
    setTimeout(() => flower.remove(), 5000);
  }, 300);
}

function createLeaves() {
  const colors = ['#FFA500', '#FF8C00', '#FFD700', '#228B22'];
  setInterval(() => {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.style.left = Math.random() * 100 + 'vw';
    leaf.style.color = colors[colors[Math.floor(Math.random() * colors.length)]];
    leaf.textContent = '🍂';
    document.body.appendChild(leaf);
    setTimeout(() => leaf.remove(), 8000);
  }, 400);
}

document.addEventListener('DOMContentLoaded', () => {
    const aiText = document.getElementById('aiText');
    if (!aiText) return;
    aiText.addEventListener('click', () => {
        aiText.classList.toggle('active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.gallery img');
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('modalCaption');
    const closeBtn = document.getElementById('modalClose');
    const prevBtn = document.getElementById('modalPrev');
    const nextBtn = document.getElementById('modalNext');

    const descriptions = [
        "Максим на своём ДР много лет назад 🎉 🤨😲",
        "Лучшие друзья навсегда 🤝 💀😲",
        "Школьники ✨ 😎😏",
        "Ещё больше школьников 🙂😁🐐😁",
        "ЩЕ НЕ ВМЕРЛА УКРАЇНА... 💙💛🫡"
    ];

    let currentIndex = 0;

    function openModal(index) {
        currentIndex = index;
        if (modal && modalImg && caption && images[index]) {
            modal.style.display = "block";
            modalImg.src = images[index].src;
            caption.textContent = descriptions[index] || images[index].alt;
        }
    }

    function closeModal() {
        if (modal) modal.style.display = "none";
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        openModal(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        openModal(currentIndex);
    }

    images.forEach((img, index) => {
        img.addEventListener('click', () => openModal(index));
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (nextBtn) nextBtn.addEventListener('click', nextImage);
    if (prevBtn) prevBtn.addEventListener('click', prevImage);

    document.addEventListener('keydown', (e) => {
        if (modal && modal.style.display === "block") {
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
        }
    });

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});