import { BASE_URL } from "../info.js";
import { handleError, handleAPIError, getHeader } from "../api.js";

const userId = sessionStorage.getItem("app_user_id");
if (!userId) {
  window.location.href = "index.html";
}

const errorBox = document.querySelector("#error");
const errorText = document.querySelector("#errorText");
const successBox = document.querySelector("#success");
const successText = document.querySelector("#successText");

document.addEventListener("focusin", e => {
  if (e.target.matches("input, select")) {
    errorBox.classList.add("hidden");
    successBox.classList.add("hidden");
  }
});

document.querySelectorAll("input, select").forEach(el =>
  el.addEventListener("input", () => {
    errorBox.classList.add("hidden");
    successBox.classList.add("hidden");
  })
);

document.addEventListener("click", e => {
  const fields = document.querySelectorAll("input, select");
  if (![...fields].some(f => f.contains(e.target))) {
    errorBox.classList.add("hidden");
    successBox.classList.add("hidden");
  }
});

function showValidationError() {
  successBox.classList.add("hidden");
  errorText.innerText = "Please fill out all fields correctly.";
  errorBox.classList.remove("hidden");
}

function validate(form) {
  const fields = Array.from(form.querySelectorAll("input, select"))
    .filter(f => !["submit", "button", "hidden"].includes(f.type));

  for (const field of fields) {
    if (!field.value.trim()) {
      showValidationError();
      return false;
    }
  }
  return true;
}

function showSuccess(message) {
  errorBox.classList.add("hidden");
  successText.innerText = message;
  successBox.classList.remove("hidden");
  setTimeout(() => successBox.classList.add("hidden"), 3000);
}

export const initBookForm = () => {
  const form = document.querySelector("#frmAddBook");

  form.addEventListener("submit", e => {
    e.preventDefault();
    errorBox.classList.add("hidden");
    successBox.classList.add("hidden");
    if (!validate(form)) return;

    fetch(`${BASE_URL}/admin/${userId}/books`, {
      method: "POST",
      headers: getHeader(),
      body: new FormData(form),
    })
      .then(handleAPIError)
      .then(() => {
        form.reset();
        showSuccess("Book added successfully.");
      })
      .catch(handleError);
  });
};

export const initAuthorForm = () => {
  const form = document.querySelector("#frmAddAuthor");

  form.addEventListener("submit", e => {
    e.preventDefault();
    errorBox.classList.add("hidden");
    successBox.classList.add("hidden");
    if (!validate(form)) return;

    fetch(`${BASE_URL}/admin/${userId}/authors`, {
      method: "POST",
      headers: getHeader(),
      body: new FormData(form),
    })
      .then(handleAPIError)
      .then(() => {
        form.reset();
        showSuccess("Author added successfully.");
      })
      .catch(handleError);
  });
};

export const initPublisherForm = () => {
  const form = document.querySelector("#frmAddPublisher");

  form.addEventListener("submit", e => {
    e.preventDefault();
    errorBox.classList.add("hidden");
    successBox.classList.add("hidden");
    if (!validate(form)) return;

    fetch(`${BASE_URL}/admin/${userId}/publishers`, {
      method: "POST",
      headers: getHeader(),
      body: new FormData(form),
    })
      .then(handleAPIError)
      .then(() => {
        form.reset();
        showSuccess("Publisher added successfully.");
      })
      .catch(handleError);
  });
};
