# 📂 Kiwwij's Project Hub

More than just a portfolio—this is a dynamic, interactive archive of my development work, experiments, and coding projects. This hub prioritizes blazing-fast performance and seamless UX.

## 🗂️ What's Inside?

The hub contains a diverse, growing collection of my creations:

- **Web Apps & Tools:** Personal trackers, expense managers, and functional tools like an AI image translator.
- **University Projects:** Tools for VNTU, schedule trackers, and exam prep materials.
- **Gaming & Anime:** Extensive wikis, tier lists, and detailed lore summaries (especially for Re:Zero and Final Fantasy), plus custom game trackers.
- **Mini-Games:** Browser-based classics like 2048, Snake, Go, and Sudoku.

## ✨ Key Features

- **⚡ Lightning-Fast Rendering:** Projects are rendered on the fly from a centralized `projects.json` configuration, ensuring instant load times with zero backend dependencies.
- **👀 Smooth Lazy Loading:** Project cards feature seamless fade-in animations using the Intersection Observer API as you scroll, ensuring silky performance even with a massive grid of projects.
- **📊 Live Tech Analytics & Instant Filtering:** The hub scans project configurations to generate an interactive "Skill Meter." Filter projects by specific technologies (PHP, JS, mysql, etc.) with a single click. A handy reset button clears all active filters instantly.
- **🪄 Context-Aware Filter Controls:** Filter buttons for **"New"** and **"Unviewed"** projects dynamically monitor your progress and automatically hide themselves when there's nothing left to show, keeping the interface clean and clutter-free.
- **👻 Smart Empty States:** If a search or filter yields no results, a helpful empty state guides you to discover a random project instead of leaving you at a dead end.
- **🎯 Dynamic Recommendations:** A smart, collapsible "Recommended Projects" panel featuring hand-picked showcases alongside an automatically detected **"Latest"** project (safely bypassing JSON templates), featuring non-clickable tech stacks to avoid misclicks and opening seamlessly in new tabs.
- **⌨️ Power User Hotkeys:** Navigate like a pro without touching your mouse:
  - `/` — Focus search bar
  - `R` — Open a random project
  - `T` — Toggle Light/Dark theme
  - `` ` `` — Toggle the hidden System Core Terminal
- **📌 Local Pinning:** Pin up to 4 of your favorite projects to the top of the grid. Preferences are saved instantly in your browser.
- **🌗 Adaptive Theming:** Fully responsive Dark/Light mode that respects your system preferences.
- **⏱️ Real-Time Activity Tracker:** Tracks the exact time you spend on the hub in real time (smartly pausing when the browser tab is in the background), automatically scaling from minutes (`m`) to hours (`h`) and unlocking milestone achievements along the way (from 10 minutes up to 100 hours).
- **🔥 Evolving Pure-CSS Streak Flame:** Daily visit streaks are visualized with a custom, pure-CSS animated flame that physically grows in size with every consecutive day and evolves through 6 distinct temperature tiers—from a tiny spark to roaring blue plasma and legendary fire with rising embers.
- **📠 1999 Web 1.0 Time Machine:** A rare 90s-style prank banner (spawning with a 14–17% chance) that teleports the entire hub back to 1999, reskinning the modern grid into a fully functional Windows 95 / Netscape Navigator homepage without breaking search, filters, or achievements.
- **🏆 Gamification, Secrets & Portable Backups:** Explore the site to unlock a custom achievement system, complete with Steam-style UI toasts, progress tracking, and generative Web Audio sounds. Plus, a fully functional hidden terminal console with commands like `/ping`, `/matrix`, `/gamemode`, and secret profile management tools (`/export`, `/import`, `/preset`) that generate a downloadable, standalone HTML stats card to migrate your streak and progress across devices. Can you find them all?
- **👾 Steam Integration:** Dynamically fetches and displays my real-time Steam profile avatar.

## 🛠️ Under the Hood

The core architecture is entirely client-side, driven by clean, modular JavaScript:

1. **Data Fetching:** Metadata (titles, descriptions, stacks, custom thumbnails) is pulled asynchronously from a static JSON file.
2. **DOM Generation & Optimization:** Cards and UI elements are built dynamically. Images use native `loading="lazy"` alongside custom fade-in animations to guarantee a smooth scroll even with hundreds of project cards.
3. **State Management & Portability:** Theme preferences, pinned items, viewed projects, daily streaks, active playtime, and unlocked achievements are persistently managed via `localStorage`—backed by a built-in HTML/JSON state serializer for cross-device profile recovery.

## 🚀 Tech Stack

- **Frontend:** HTML5, CSS3 (Flexbox/Grid, Dynamic CSS Variables, Pure-CSS Keyframe Animations), Vanilla JavaScript (ES6+, Page Visibility & Blob/FileReader APIs).
- **Audio:** Web Audio API (for generative achievement sounds).
- **Icons:** [Boxicons](https://boxicons.com/).
- **Deployment:** GitHub Pages.

---

### 📬 Let's Connect

[All my social links](https://kiwwij.github.io/my-projects/html/kiwwij's-social-media-links.html)
