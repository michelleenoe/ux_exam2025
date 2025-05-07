import { loadAuthors, loadPublishers } from "./adminFetch.js";
import { initBookForm, initAuthorForm, initPublisherForm } from "./adminForm.js";
import { initBookLookup } from "./findBook.js";

const userId = sessionStorage.getItem("app_user_id");
const isAdmin = sessionStorage.getItem("app_user_is_admin");

if (!userId || isAdmin !== "1") {
  window.location.href = "index.html";
}


loadAuthors();
loadPublishers();

initBookForm();
initAuthorForm();
initPublisherForm();

initBookLookup();

document.querySelectorAll('#adminMenu button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
  
      document.querySelectorAll('.admin-section').forEach((section) => {
        section.classList.add('hidden');
      });
  
      document.getElementById(target).classList.remove('hidden');
    });
  });
  // tab