const quotes = [
  { en: "Even in the darkest night, the stars still whisper.", jp: "暗い夜でも、星は囁く。" },
  { en: "I smile so I don’t lose the part of me that remembers the sun.", jp: "太陽を覚えている自分を失わないために、私は笑う。" },
  { en: "This pain will one day be a story I tell in a softer voice.", jp: "いつかこの痛みは、優しい声で語る物語になる。" },
  { en: "Fading memories are gentle thieves.", jp: "色あせる記憶は優しい泥棒だ。" },
  { en: "I keep walking — not because I know the way, but because I need to move.", jp: "道を知っているから歩くのではない、動かなければならないから歩くのだ。" },
  { en: "Even broken wings can touch the sky in dreams.", jp: "壊れた翼でも夢の中なら空を掴める。" },
  { en: "Silence is louder than words when hearts remember.", jp: "心が覚えているとき、沈黙は言葉よりも響く。" },
  { en: "Maybe the moon is just another lonely soul, pretending to shine.", jp: "もしかしたら月も、輝いているふりをする孤独な魂かもしれない。" },
  { en: "The rain hides my tears, but never my thoughts.", jp: "雨は涙を隠すが、思考までは隠せない。" },
  { en: "Every reflection feels like someone I used to be.", jp: "鏡に映るたびに、昔の自分を思い出す。" },
  { en: "Dreams decay slower than hope.", jp: "夢は希望よりもゆっくりと腐っていく。" },
  { en: "I stopped chasing light when I realized I glow better in the dark.", jp: "暗闇の中の方が輝けると気づいた時、光を追うのをやめた。" },
  { en: "Time doesn’t heal — it just teaches us how to hide the scars.", jp: "時間は癒さない、ただ傷を隠す方法を教えるだけだ。" },
  { en: "The silence between songs says more than any lyrics ever could.", jp: "曲と曲の間の沈黙は、どんな歌詞よりも多くを語る。" },
  { en: "Loneliness tastes like cold coffee and unsent messages.", jp: "孤独は冷めたコーヒーと送れなかったメッセージの味がする。" },
  { en: "Some ghosts never died — they just learned to scroll.", jp: "死ななかった幽霊もいる、ただスクロールの仕方を覚えただけだ。" },
  { en: "We build walls out of playlists and broken texts.", jp: "私たちはプレイリストと壊れたメッセージで壁を作る。" },
  { en: "The internet remembers what my heart tried to forget.", jp: "心が忘れようとしたことを、インターネットは覚えている。" },
  { en: "Half of me writes poetry, the other half deletes it.", jp: "半分の私は詩を書く、もう半分はそれを消す。" },
  { en: "Some days I exist only in drafts.", jp: "ある日、私は下書きの中にしか存在しない。" },
  { en: "Crying in 144p still counts.", jp: "144pでも泣くのは泣くことだ。" },
  { en: "Maybe I’m just buffering emotions again.", jp: "たぶん、また感情をバッファリングしてるだけ。" },
  { en: "Overthinking is my cardio.", jp: "考えすぎるのが私の有酸素運動だ。" },
  { en: "Existential crisis? More like my morning routine.", jp: "実存の危機？それは朝のルーティンみたいなものだ。" },
  { en: "My therapist left the chat.", jp: "セラピストがチャットを退出しました。" },
  { en: "I tried to touch grass, but it was offline.", jp: "外に出て草を触ろうとしたけど、オフラインだった。" },
  { en: "Sometimes the Wi-Fi connects faster than people do.", jp: "Wi-Fiの方が人より早く繋がることがある。" },
  { en: "My soul runs on low battery mode.", jp: "私の魂は省電力モードで動いている。" },
  { en: "I keep reloading life, but the error remains.", jp: "人生をリロードしても、エラーは消えない。" },
  { en: "Reality needs a patch update.", jp: "現実にはパッチ更新が必要だ。" }
];

let i = 0;
const quoteEn = document.getElementById('quote-en');
const quoteJp = document.getElementById('quote-jp');

function updateQuote() {
  quoteEn.classList.add("fade-out");
  quoteJp.classList.add("fade-out");

  setTimeout(() => {
    const q = quotes[i];
    quoteEn.textContent = `“${q.en}”`;
    quoteJp.textContent = q.jp;
    quoteEn.classList.remove("fade-out");
    quoteJp.classList.remove("fade-out");
    i = (i + 1) % quotes.length;
  }, 1000);
}

updateQuote();
setInterval(updateQuote, 6000);

const canvasBg = document.getElementById("bg-stars");
const ctxBg = canvasBg.getContext("2d");
let stars = [];

function resizeCanvas() {
  canvasBg.width = window.innerWidth;
  canvasBg.height = window.innerHeight;
  stars = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvasBg.width,
    y: Math.random() * canvasBg.height,
    r: Math.random() * 1.2,
    s: Math.random() * 0.5 + 0.2
  }));
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function animateStars() {
  ctxBg.clearRect(0, 0, canvasBg.width, canvasBg.height);
  ctxBg.fillStyle = "#fff";
  stars.forEach(star => {
    ctxBg.globalAlpha = Math.random() * 0.8 + 0.2;
    ctxBg.beginPath();
    ctxBg.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctxBg.fill();
    star.y += star.s;
    if (star.y > canvasBg.height) star.y = 0;
  });
  requestAnimationFrame(animateStars);
}
animateStars();

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createLinearGradient(0, 0, 64, 64);
  gradient.addColorStop(0, "#000000");
  gradient.addColorStop(1, "#1a1a1a");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  ctx.font = "bold 42px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "#555";
  ctx.shadowBlur = 8;
  ctx.fillStyle = "#ccc";
  ctx.fillText("K", 32, 36);

  const link = document.createElement("link");
  link.rel = "shortcut icon";
  link.href = canvas.toDataURL("image/png");
  document.head.appendChild(link);
});

const bgLayer = document.createElement('div');
bgLayer.style.position = 'fixed';
bgLayer.style.top = '0';
bgLayer.style.left = '0';
bgLayer.style.width = '100%';
bgLayer.style.height = '100%';
bgLayer.style.zIndex = '0';
bgLayer.style.background = `
  url('kiwwij-social-links/img/kaneki1.png') left bottom no-repeat,
  url('kiwwij-social-links/img/kaneki3.png') center bottom no-repeat,
  url('kiwwij-social-links/img/kaneki2.png') right bottom no-repeat
`;
bgLayer.style.backgroundSize = "20%, 25%, 20%";
bgLayer.style.opacity = '0.05';
bgLayer.style.pointerEvents = 'none';
document.body.appendChild(bgLayer);

document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.3) * 5;
  const y = (e.clientY / window.innerHeight - 0.3) * 2;

  bgLayer.style.backgroundPosition = `
    calc(0% + ${-x}px) calc(100% + ${-y}px),
    calc(50% + ${x}px) calc(100% + ${y}px),
    calc(100% + ${-x}px) calc(100% + ${-y}px)
  `;
});