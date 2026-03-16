# 📂 Kiwwij's Project Hub

Welcome to my personal project archive. This is a dynamic, interactive "One-Page" portfolio that serves as a central hub for all my development work, experiments, and creative coding projects.

Built with vanilla web technologies, this hub focuses on speed, seamless UX, and a touch of gamification.

## ✨ Key Features

* **🚀 Dynamic Rendering:** Projects are automatically fetched and rendered from a central `projects.json` configuration, ensuring lightning-fast load times without backend dependencies.
* **📊 Tech Stack Analytics:** Scans project configurations to generate a live "Skill Meter," allowing users to filter projects by technologies (Python, JavaScript, React, etc.) with a single click.
* **⌨️ Power User Navigation:** Fully navigable via hotkeys:
  * `/` — Focus search bar
  * `R` — Open a random project
  * `T` — Toggle Light/Dark theme
* **📌 Project Pinning:** Users can pin up to 4 favorite projects to the top of the grid, saving their preferences locally.
* **🔍 Instant Search & Filtering:** Real-time search functionality to find specific projects by name, description, or tech stack.
* **🌗 Adaptive Theming:** Fully responsive Dark/Light mode with system preference detection.
* **🎮 Achievements:** The site includes a hidden achievement system (with UI toasts and sounds) and a few secret modes for curious visitors. Can you find them all?
* **👾 Steam Integration:** Displays my current Steam avatar using a custom dynamic fetch implementation.

## 🛠️ How It Works

The core logic is entirely client-side and driven by `index.js`:
1.  **Data Fetching:** The app fetches metadata from `projects.json` (titles, descriptions, tech stacks, custom thumbnails).
2.  **Rendering:** DOM elements are generated on the fly. Images are lazy-loaded (`loading="lazy"`) to ensure the browser easily handles hundreds of project cards without performance drops.
3.  **State Management:** Features like theme preferences, pinned projects, and unlocked achievements are saved seamlessly in the browser's `localStorage`.

## 🚀 Technologies Used

* **Frontend:** HTML5, CSS3 (Flexbox/Grid, CSS Variables), Vanilla JavaScript (ES6+).
* **Audio:** Web Audio API (for generative UI sounds).
* **Icons:** [Boxicons](https://boxicons.com/).
* **Hosting:** GitHub Pages.

---

### 📬 Connect with me
[All my social links](https://kiwwij.github.io/kiwwij-social-links/)# 📂 Kiwwij's Project Hub