import "./access.js";
import { loadAuthors, loadPublishers } from "./adminFetch.js";
import { initBookForm, initAuthorForm, initPublisherForm } from "./adminForm.js";
import { initBookLookup } from "./findBook.js";

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
  