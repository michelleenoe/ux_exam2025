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


const tabs = document.querySelectorAll('#adminMenu button');
tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    tabs.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const target = btn.dataset.target;
    document.querySelectorAll('.admin-section')
      .forEach(s => s.classList.add('hidden'));
    document.getElementById(target).classList.remove('hidden');
  });
});

tabs[0].classList.add('active');
