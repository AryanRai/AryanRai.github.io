// CSS class name for dark theme
const darkTheme = "dark-theme";

const darkThemeSetUp = () => {
  if (getCurrentTheme() === "dark") {
    document.getElementById("toggleBtn").checked = true;
  
  } else {
    document.getElementById("toggleBtn").checked = false;

  }
};

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";

//   Get user's theme preference from local storage
const selectedTheme = localStorage.getItem("selected-theme");
if (selectedTheme === "dark") {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  darkThemeSetUp();
}

const themeButton = document.getElementById("toggleBtn");
themeButton.addEventListener("change", () => {
  document.body.classList.toggle(darkTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  darkThemeSetUp();
});
