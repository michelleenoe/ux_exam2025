import { burgerMenu } from "./nav.js";
import { utilityLog } from "./utilityLog.js";
import { initLogout } from "./logout.js";
import { backToTop } from "./backToTop.js";

window.addEventListener("DOMContentLoaded", () => {
  burgerMenu();
  utilityLog();
  initLogout();
  backToTop();
});
