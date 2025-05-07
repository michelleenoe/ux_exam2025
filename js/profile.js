import { BASE_URL } from "./info.js";
import { handleError, getHeader } from "./api.js";

const userId = sessionStorage.getItem("app_user_id");
if (!userId) {
  window.location.href = "login.html";
}

const errorBox = document.getElementById("error");
const errorText = document.getElementById("errorText");
const form = document.getElementById("frmProfile");
const btnDelete = document.getElementById("btnDelete");
const showSuccess = (message) => {
  errorText.innerText = message;
  errorBox.classList.remove("hidden");
  setTimeout(() => errorBox.classList.add("hidden"), 3000);
};

fetch(`${BASE_URL}/users/${userId}`, {
  headers: getHeader()
})
  .then(res => {
    if (!res.ok) throw new Error("Failed to load profile.");
    return res.json();
  })
  .then(user => {
    form.email.value = user.email;
    form.first_name.value = user.first_name;
    form.last_name.value = user.last_name;
    form.address.value = user.address;
    form.phone_number.value = user.phone_number;
    form.birth_date.value = user.birth_date;
    document.getElementById("txtMemberDate").value = user.membership_date;
  })
  .catch(err => handleError(err.message));

form.addEventListener("submit", e => {
  e.preventDefault();
  const params = new URLSearchParams();
  params.append("email", form.email.value.trim());
  params.append("first_name", form.first_name.value.trim());
  params.append("last_name", form.last_name.value.trim());
  params.append("address", form.address.value.trim());
  params.append("phone_number", form.phone_number.value.trim());
  params.append("birth_date", form.birth_date.value);

  fetch(`${BASE_URL}/users/${userId}`, {
    method: "PUT",
    headers: getHeader(),
    body: params
  })
    .then(res => {
      if (!res.ok) throw new Error("Update failed.");
      return res.json();
    })
    .then(() => showSuccess("Profile updated successfully."))
    .catch(err => handleError(err.message));
});

btnDelete.addEventListener("click", () => {
  if (!confirm("Are you sure you want to delete your account? This cannot be undone.")) {
    return;
  }
  fetch(`${BASE_URL}/users/${userId}`, {
    method: "DELETE",
    headers: getHeader()
  })
    .then(res => {
      if (!res.ok) throw new Error("Deletion failed.");
      return res.json();
    })
    .then(() => {
      sessionStorage.clear();
      window.location.href = "index.html";
    })
    .catch(err => handleError(err.message));
});
