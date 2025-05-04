import { utilityLog } from "./utilityLog.js";

function logout() {
  sessionStorage.removeItem("app_user_id");
  sessionStorage.removeItem("app_auth_token");
  sessionStorage.removeItem("app_is_admin");

  // Opdater navigation
  utilityLog();

  // Gå til forsiden
  window.location.href = "index.html";
}

export function initLogout() {
  document.querySelectorAll("#btnLogout").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
    });
  });
}
