import { BASE_URL } from "../info.js";
import { handleError, getHeader } from "../api.js";

const userId = sessionStorage.getItem("app_user_id");

const showSuccess = (form, message) => {
  const msg = form.parentElement.querySelector(".success-message");
  if (msg) {
    msg.innerText = message;
    msg.classList.remove("hidden");
    setTimeout(() => msg.classList.add("hidden"), 3000);
  }
};

export const initBookForm = () => {
  const form = document.querySelector("#frmAddBook");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("title", form.title.value.trim());
    params.append("author_id", form.author_id.value);
    params.append("publisher_id", form.publisher_id.value);
    params.append("publishing_year", form.publishing_year.value);

    fetch(`${BASE_URL}/admin/${userId}/books`, {
      method: "POST",
      headers: getHeader(),
      body: params,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Book creation failed.");
        return res.json();
      })
      .then(() => {
        form.reset();
        showSuccess(form, "Book added successfully.");
      })
      .catch((err) => handleError(err.message));
  });
};

export const initAuthorForm = () => {
  const form = document.querySelector("#frmAddAuthor");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("first_name", form.first_name.value.trim());
    params.append("last_name", form.last_name.value.trim());

    fetch(`${BASE_URL}/admin/${userId}/authors`, {
      method: "POST",
      headers: getHeader(),
      body: params,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Author creation failed.");
        return res.json();
      })
      .then(() => {
        form.reset();
        showSuccess(form, "Author added successfully.");
      })
      .catch((err) => handleError(err.message));
  });
};

export const initPublisherForm = () => {
  const form = document.querySelector("#frmAddPublisher");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("name", form.name.value.trim());

    fetch(`${BASE_URL}/admin/${userId}/publishers`, {
      method: "POST",
      headers: getHeader(),
      body: params,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Publisher creation failed.");
        return res.json();
      })
      .then(() => {
        form.reset();
        showSuccess(form, "Publisher added successfully.");
      })
      .catch((err) => handleError(err.message));
  });
};
