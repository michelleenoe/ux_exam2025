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

const validate = form => {
  for (const field of form.querySelectorAll("input, select")) {
    if (field.required && !field.value.trim()) {
      handleError("Please fill out all fields correctly.");
      return false;
    }
  }
  return true;
};

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
      body: new FormData(form)
    })
      .then(handleAPIError)
      .then(data => {
        if (data.error) throw data;
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

    const firstName = form.querySelector('input[name="first_name"]').value.trim();
    const lastName  = form.querySelector('input[name="last_name"]').value.trim();

    if (!firstName || !lastName) {
      handleError("Please provide both a first name and a last name.");
      return;
    }
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name",  lastName);

    fetch(`${BASE_URL}/admin/${userId}/authors`, {
      method: "POST",
      headers: getHeader(),
      body: formData
    })
      .then(handleAPIError)
      .then(data => {
        if (data.error) throw data;
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
      body: new FormData(form)
    })
      .then(handleAPIError)
      .then(data => {
        if (data.error) throw data;
        form.reset();
        showSuccess("Publisher added successfully.");
      })
      .catch(handleError);
  });
};
