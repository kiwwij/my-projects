document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const icon = toggleBtn.querySelector("i");
  const root = document.documentElement;

  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  toggleBtn.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    applyTheme(newTheme);
  });

  window.addEventListener("storage", (event) => {
    if (event.key === "theme") {
      applyTheme(event.newValue);
    }
  });

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      icon.className = "bx bx-sun";
    } else {
      icon.className = "bx bx-moon";
    }
  }
});
