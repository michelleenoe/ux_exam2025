import { BASE_URL } from "../info.js";
import { handleError, getHeader, handleAPIError } from "../api.js";

const userId = sessionStorage.getItem("app_user_id");

document.querySelectorAll("input, select, textarea").forEach((field) => {
  field.addEventListener("input", () => {
    const errorBox = document.querySelector("#error");
    if (!errorBox.classList.contains("hidden")) {
      errorBox.classList.add("hidden");
      document.querySelector("#errorText").innerText = "";
    }
  });
});

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
      .then(handleAPIError)
      .then(() => {
        form.reset();
        showSuccess(form, "Book added successfully.");
      })
      .catch(handleError);
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
      .then(handleAPIError)
      .then(() => {
        form.reset();
        showSuccess(form, "Author added successfully.");
      })
      .catch(handleError);
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
      .then(handleAPIError)
      .then(() => {
        form.reset();
        showSuccess(form, "Publisher added successfully.");
      })
      .catch(handleError);
  });
};
