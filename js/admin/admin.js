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
const sections = document.querySelectorAll('.admin-section');

tabs[0].classList.add('active');

tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    // 1) Opdater active-klasse på knapper
    tabs.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    sections.forEach(sec => {
      sec.classList.add('hidden');
      sec.setAttribute('aria-hidden', 'true');
    });
    const target = document.getElementById(btn.dataset.target);
    target.classList.remove('hidden');
    target.setAttribute('aria-hidden', 'false');
  });
});
