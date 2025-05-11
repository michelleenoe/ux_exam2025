import { BASE_URL } from "./info.js";
import { handleError, handleAPIError, getHeader } from "./api.js";

const els = {
  errorBox: document.querySelector("#error"),
  errorText: document.querySelector("#errorText"),
  successBox: document.querySelector("#success"),
  successText: document.querySelector("#successText"),
  form: document.querySelector("#frmProfile"),
  btnDelete: document.querySelector("#btnDelete"),
  birthInput: document.querySelector("#txtBirthDate"),
  dialog: document.getElementById("deleteDialog"),
  btnCancel: document.getElementById("cancelDelete"),
  btnConfirm: document.getElementById("confirmDelete"),
  welcomeEl: document.getElementById("welcomeMessage"),
};

const userId = sessionStorage.getItem("app_user_id");

export function initProfilePage() {
  if (!userId) {
    window.location.href = "login.html";
    return;
  }
  setBirthDateMax();
  HideError();
  bindFormSubmit();
  bindDeleteDialog();
  loadUserProfile();
  loadWelcomeMessage();
}

function setBirthDateMax() {
  const today = new Date();
  today.setDate(today.getDate() - 1);
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  els.birthInput.max = `${yyyy}-${mm}-${dd}`;
}
function hideAllMessages() {
  els.errorBox.classList.add("hidden");
  els.successBox.classList.add("hidden");
}
function HideError() {
  document.querySelectorAll("input, select").forEach(el =>
    el.addEventListener("input", hideAllMessages)
  );
  document.addEventListener("click", e => {
    const fields = Array.from(document.querySelectorAll("input, select"));
    if (!fields.some(f => f.contains(e.target))) hideAllMessages();
  });
}
function loadUserProfile() {
  fetch(`${BASE_URL}/users/${userId}`, 
    { headers: getHeader() })
    .then(handleAPIError)
    .then((user) => {
      fillProfileForm(user);
    })
    .catch(handleError);
  }


function fillProfileForm({ email, first_name, last_name, address, phone_number, birth_date, membership_date }) {
  els.form.txtEmail.value = email;
  els.form.txtFirstName.value = first_name;
  els.form.txtLastName.value = last_name;
  els.form.txtAddress.value = address;
  els.form.txtPhone.value = phone_number;
  els.form.txtBirthDate.value = birth_date;
  els.form.txtMemberDate.value = membership_date;
}

function showSuccess(msg) {
  hideAllMessages();
  els.successText.innerText = msg;
  els.successBox.classList.remove("hidden");
  setTimeout(() => els.successBox.classList.add("hidden"), 3000);
}

function validateProfileForm() {
  const { txtFirstName, txtLastName, txtEmail, txtAddress, txtPhone, txtBirthDate } = els.form;
  if (![txtFirstName, txtLastName, txtEmail, txtAddress, txtPhone, txtBirthDate]
    .every(f => f.value.trim())) {
    handleError("Please fill out all fields correctly.");
    return false;
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(txtEmail.value.trim())) {
    handleError("Please enter a valid email address.");
    return false;
  }
  if (!/^\d+$/.test(txtPhone.value.trim())) {
    handleError("Phone number must contain digits only.");
    return false;
  }
  if (new Date(txtBirthDate.value) > new Date()) {
    handleError("Birth date cannot be in the future.");
    return false;
  }
  return true;
}

function bindFormSubmit() {
  els.form.addEventListener("submit", async e => {
    e.preventDefault();
    hideAllMessages();
    if (!validateProfileForm()) return;

    try {
      const res = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "PUT",
        headers: getHeader(),
        body: new FormData(els.form)
      });
      const data = await handleAPIError(res);
      if (data.error) throw data;
      showSuccess("Profile updated successfully.");
    } catch (err) {
      handleError(err);
    }
  });
}

function bindDeleteDialog() {
  els.btnDelete.addEventListener("click", () => {
    if (typeof els.dialog.showModal === "function") {
      els.dialog.showModal();
    } else if (confirm("Are you sure you want to delete your account? This cannot be undone?")) {
      doDelete();
    }
  });
  els.btnCancel.addEventListener("click", () => els.dialog.close());
  els.btnConfirm.addEventListener("click", () => {
    els.dialog.close();
    doDelete();
  });
}

async function doDelete() {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "DELETE",
      headers: getHeader()
    });
    await handleAPIError(res);
    sessionStorage.clear();
    window.location.href = "index.html";
  } catch (err) {
    handleError(err);
  }
}

async function loadWelcomeMessage() {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}`, { headers: getHeader() });
    const user = await handleAPIError(res);
    els.welcomeEl.textContent = `Welcome ${user.first_name} ${user.last_name}! Here You can edit your personal information.`;
  } catch (err) {
    console.error(err);
  }
}

initProfilePage();
