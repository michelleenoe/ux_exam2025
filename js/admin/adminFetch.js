import { BASE_URL } from "../info.js";
import { handleError, getHeader, handleAPIError } from "../api.js";

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
  fetch(`${BASE_URL}/publishers`, {
    headers: getHeader(),
  })
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
