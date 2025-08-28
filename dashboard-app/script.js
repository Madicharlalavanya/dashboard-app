import { getTasksSnapshot } from "./modules/storage.js";
import { initTasks } from "./modules/tasks.js";
import { initCharts } from "./modules/charts.js";

/* ------------ Navigation ------------ */
const buttons = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");

function showPage(id) {
  pages.forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  buttons.forEach(b => b.classList.toggle("active", b.dataset.page === id));

  if (id === "tasks") initTasks(updateHomeStats);
  if (id === "stats") initCharts();
  if (id === "home") updateHomeStats();
}
buttons.forEach(btn =>
  btn.addEventListener("click", () => showPage(btn.dataset.page))
);

/* ------------ Home stats ------------ */
function updateHomeStats() {
  const { total, done } = getTasksSnapshot();
  const pending = total - done;
  document.getElementById("stat-total").textContent = total;
  document.getElementById("stat-done").textContent = done;
  document.getElementById("stat-pending").textContent = pending;
}
updateHomeStats();

/* ------------ Theme toggle ------------ */
const themeBtn = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");
if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);

themeBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

/* ------------ Service worker ------------ */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

/* Default page on load */
showPage("home");
