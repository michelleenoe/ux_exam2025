import { BASE_URL } from "../info.js";
import { handleError, getHeader, handleAPIError } from "../api.js";
const userId = sessionStorage.getItem("app_user_id");
if (!userId) {
  window.location.href = "index.html";
}

export const loadAuthors = () => {
  fetch(`${BASE_URL}/authors`, { headers: getHeader() })
    .then(handleAPIError)
    .then((authors) => {
      const select = document.querySelector("#selectAuthor");
      authors.forEach((author) => {
        const opt = document.createElement("option");
        opt.value = author.author_id;
        opt.innerText = author.author_name;
        select.appendChild(opt);
      });
    })
    .catch(handleError);
};
export const loadPublishers = () => {
  fetch(`${BASE_URL}/publishers`, { headers: getHeader() })
    .then(handleAPIError)
    .then((publishers) => {
      const select = document.querySelector("#selectPublisher");
      publishers.forEach((publisher) => {
        const opt = document.createElement("option");
        opt.value = publisher.publisher_id;
        opt.innerText = publisher.publisher_name;
        select.appendChild(opt);
      });
    })
    .catch(handleError);
};

const welcomeEl = document.getElementById("welcomeMessage");

export async function loadWelcomeMessage() {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}`, {
      headers: getHeader(),
    });
    const user = await handleAPIError(res);
    welcomeEl.textContent = `Welcome ${user.first_name} ${user.last_name}!`;
  } catch (err) {
    console.error("Failed to load user profile:", err);
  }
}
loadWelcomeMessage();
loadAuthors();
loadPublishers();
