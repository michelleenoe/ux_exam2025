import { utilityLog } from "./utilityLog.js";

function logout() {
  sessionStorage.removeItem("app_user_id");
  sessionStorage.removeItem("app_auth_token");
  sessionStorage.removeItem("app_is_admin");

  utilityLog();

  window.location.replace("index.html");
}

export function initLogout() {
  document.querySelectorAll(".btnLogout").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
    });
  });
}
