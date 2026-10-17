/* StudyGenie global theme controller */
(function () {
  const STORAGE_KEY = "studygenieTheme";
  const getTheme = () => localStorage.getItem(STORAGE_KEY) || "dark";

  function applyTheme(theme) {
    theme = theme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    document.body.classList.toggle("dark", theme === "dark");
    document.body.classList.toggle("dark-mode", theme === "dark");
    document.body.classList.toggle("light", theme === "light");
    localStorage.setItem(STORAGE_KEY, theme);
    document.querySelectorAll("[data-theme]").forEach((button) => {
      button.classList.toggle("active", button.dataset.theme === theme);
    });
    document.querySelectorAll("#themeToggle,#dashTheme,#profileTheme").forEach((button) => {
      button.textContent = theme === "dark" ? "☀" : "☾";
      button.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    });
  }

  window.setStudyGenieTheme = applyTheme;
  window.getStudyGenieTheme = getTheme;

  // Apply immediately after body exists.
  applyTheme(getTheme());

  document.addEventListener("click", (event) => {
    const themeButton = event.target.closest("[data-theme]");
    if (themeButton) applyTheme(themeButton.dataset.theme);

    const toggle = event.target.closest("#themeToggle,#dashTheme,#profileTheme");
    if (toggle) applyTheme(getTheme() === "dark" ? "light" : "dark");
  });
})();
