import { BASE_URL } from "./info.js";
import { handleError, handleAPIError, getHeader } from "./api.js";

const userId = sessionStorage.getItem("app_user_id");
if (!userId) {
  window.location.href = "login.html";
}

const errorBox = document.getElementById("error");
const successBox = document.getElementById("success");
const successText = document.getElementById("successText");
const form = document.getElementById("frmProfile");
const btnDelete = document.getElementById("btnDelete");
const birthInput = document.getElementById("txtBirthDate");

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const yyyy = yesterday.getFullYear();
const mm = String(yesterday.getMonth() + 1).padStart(2, "0");
const dd = String(yesterday.getDate()).padStart(2, "0");
birthInput.max = `${yyyy}-${mm}-${dd}`;

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

fetch(`${BASE_URL}/users/${userId}`, {
  headers: getHeader()
})
  .then(handleAPIError)
  .then(user => {
    document.getElementById("txtEmail").value = user.email;
    document.getElementById("txtFirstName").value = user.first_name;
    document.getElementById("txtLastName").value = user.last_name;
    document.getElementById("txtAddress").value = user.address;
    document.getElementById("txtPhone").value = user.phone_number;
    document.getElementById("txtBirthDate").value = user.birth_date;
    document.getElementById("txtMemberDate").value = user.membership_date;
  })
  .catch(handleError);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\d+$/;

function showSuccess(message) {
  errorBox.classList.add("hidden");
  successText.innerText = message;
  successBox.classList.remove("hidden");
  setTimeout(() => successBox.classList.add("hidden"), 3000);
}

form.addEventListener("submit", e => {
  e.preventDefault();
  errorBox.classList.add("hidden");
  successBox.classList.add("hidden");

  const firstName = document.getElementById("txtFirstName").value.trim();
  const lastName = document.getElementById("txtLastName").value.trim();
  const email = document.getElementById("txtEmail").value.trim();
  const address = document.getElementById("txtAddress").value.trim();
  const phone = document.getElementById("txtPhone").value.trim();
  const birthDate = document.getElementById("txtBirthDate").value;

  if (!firstName || !lastName || !email || !address || !phone || !birthDate) {
    return handleError("Please fill out all fields correctly.");
  }
  if (!emailPattern.test(email)) {
    return handleError("Please enter a valid email address.");
  }
  if (!phonePattern.test(phone)) {
    return handleError("Phone number must contain digits only.");
  }
  if (new Date(birthDate) > new Date()) {
    return handleError("Birth date cannot be in the future.");
  }

  const formData = new FormData();
  formData.append("email", email);
  formData.append("first_name", firstName);
  formData.append("last_name", lastName);
  formData.append("address", address);
  formData.append("phone_number", phone);
  formData.append("birth_date", birthDate);

  fetch(`${BASE_URL}/users/${userId}`, {
    method: "PUT",
    headers: getHeader(),
    body: formData
  })
    .then(handleAPIError)
    .then(data => {
      if (data.error) throw data;
      showSuccess("Profile updated successfully.");
    })
    .catch(handleError);
});

btnDelete.addEventListener("click", () => {
  if (!confirm("Are you sure you want to delete your account? This cannot be undone?")) {
    return;
  }
  fetch(`${BASE_URL}/users/${userId}`, {
    method: "DELETE",
    headers: getHeader()
  })
    .then(handleAPIError)
    .then(() => {
      sessionStorage.clear();
      window.location.href = "index.html";
    })
    .catch(handleError);
});
