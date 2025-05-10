import { BASE_URL } from "./info.js";
import { handleError, handleAPIError, getHeader } from "./api.js";

const userId = sessionStorage.getItem("app_user_id");
const errorBox = document.querySelector("#error");
const errorText = document.querySelector("#errorText");
const successBox = document.querySelector("#success");
const successText = document.querySelector("#successText");
const form = document.querySelector("#frmProfile");
const btnDelete = document.querySelector("#btnDelete");
const birthInput = document.querySelector("#txtBirthDate");

if (!userId) {
  window.location.href = "login.html";
}
const today = new Date();
today.setDate(today.getDate() - 1);
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");
birthInput.max = `${yyyy}-${mm}-${dd}`;

document.querySelectorAll("input, select").forEach(el =>
  el.addEventListener("input", () => {
    errorBox.classList.add("hidden");
    successBox.classList.add("hidden");
  })
);
document.addEventListener("click", e => {
  const fields = Array.from(document.querySelectorAll("input, select"));
  if (!fields.some(f => f.contains(e.target))) {
    errorBox.classList.add("hidden");
    successBox.classList.add("hidden");
  }
});

fetch(`${BASE_URL}/users/${userId}`, {
  headers: getHeader()
})
  .then(handleAPIError)
  .then(user => {
    document.querySelector("#txtEmail").value = user.email;
    document.querySelector("#txtFirstName").value = user.first_name;
    document.querySelector("#txtLastName").value = user.last_name;
    document.querySelector("#txtAddress").value = user.address;
    document.querySelector("#txtPhone").value = user.phone_number;
    document.querySelector("#txtBirthDate").value = user.birth_date;
    document.querySelector("#txtMemberDate").value = user.membership_date;
  })
  .catch(handleError);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\d+$/;

function showSuccess(msg) {
  errorBox.classList.add("hidden");
  successText.innerText = msg;
  successBox.classList.remove("hidden");
  setTimeout(() => successBox.classList.add("hidden"), 3000);
}

form.addEventListener("submit", e => {
  e.preventDefault();
  errorBox.classList.add("hidden");
  successBox.classList.add("hidden");

  const firstName = document.querySelector("#txtFirstName").value.trim();
  const lastName = document.querySelector("#txtLastName").value.trim();
  const email = document.querySelector("#txtEmail").value.trim();
  const address = document.querySelector("#txtAddress").value.trim();
  const phone = document.querySelector("#txtPhone").value.trim();
  const birthDate = document.querySelector("#txtBirthDate").value;

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
const welcomeEl = document.getElementById("welcomeMessage");

export async function loadWelcomeMessage() {
  try {
    const res  = await fetch(`${BASE_URL}/users/${userId}`, {
      headers: getHeader(),
    });
    const user = await handleAPIError(res);
    welcomeEl.textContent = `Welcome ${user.first_name} ${user.last_name}!`;
  } catch (err) {
    console.error("Failed to load user profile:", err);
  }
}
loadWelcomeMessage();


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

