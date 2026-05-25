# 📂 Kiwwij's Project Hub

More than just a portfolio—this is a dynamic, interactive archive of my development work, experiments, and coding projects. This hub prioritizes blazing-fast performance and seamless UX.

## ✨ Key Features

- **⚡ Lightning-Fast Rendering:** Projects are rendered on the fly from a centralized `projects.json` configuration, ensuring instant load times with zero backend dependencies.
- **📊 Live Tech Analytics:** The hub scans project configurations to generate an interactive "Skill Meter." Filter projects by specific technologies (PHP, JS, mysql, etc.) with a single click.
- **🎯 Dynamic Recommendations:** A smart, collapsible "Recommended Projects" panel featuring hand-picked showcases alongside an automatically detected **"Latest"** project (safely bypassing JSON templates), featuring non-clickable tech stacks to avoid misclicks and opening seamlessly in new tabs.
- **⌨️ Power User Hotkeys:** Navigate like a pro without touching your mouse:
  - `/` — Focus search bar
  - `R` — Open a random project
  - `T` — Toggle Light/Dark theme
- **📌 Local Pinning:** Pin up to 4 of your favorite projects to the top of the grid. Preferences are saved instantly in your browser.
- **🔍 Instant Filtering:** Real-time search by project name, description, or tech stack.
- **🌗 Adaptive Theming:** Fully responsive Dark/Light mode that respects your system preferences.
- **🏆 Gamification & Secrets:** Explore the site to unlock a custom achievement system, complete with Steam-style UI toasts, progress tracking, and generative Web Audio sounds. Can you find the hidden ones?
- **👾 Steam Integration:** Dynamically fetches and displays my real-time Steam profile avatar.

## 🛠️ Under the Hood

The core architecture is entirely client-side, driven by clean, modular JavaScript:

1. **Data Fetching:** Metadata (titles, descriptions, stacks, custom thumbnails) is pulled asynchronously from a static JSON file.
2. **DOM Generation:** Cards and UI elements are built dynamically. Images use `loading="lazy"` to guarantee a smooth scroll even with hundreds of project cards.
3. **State Management:** Theme preferences, pinned items, and unlocked achievements are persistently managed via `localStorage`.

## 🚀 Tech Stack

- **Frontend:** HTML5, CSS3 (Flexbox/Grid, CSS Variables), Vanilla JavaScript (ES6+).
- **Audio:** Web Audio API (for generative achievement sounds).
- **Icons:** [Boxicons](https://boxicons.com/).
- **Deployment:** GitHub Pages.

---

### 📬 Let's Connect

[All my social links](https://kiwwij.github.io/kiwwij-social-links/)
