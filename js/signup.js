import { BASE_URL } from "./info.js";
import { handleError, handleAPIError} from "./api.js";

const birthDateInput = document.querySelector("#txtBirthDate");
const today = new Date();
today.setDate(today.getDate() - 1);

const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");

birthDateInput.max = `${yyyy}-${mm}-${dd}`;

document.querySelector("#frmSignup").addEventListener("submit", (e) => {
  e.preventDefault();

  const firstName = e.target.txtFirstName.value.trim();
  const lastName = e.target.txtLastName.value.trim();
  const email = e.target.txtEmail.value.trim();
  const password = e.target.txtPassword.value.trim();
  const repeatPassword = e.target.txtRepeatPassword.value.trim();
  const address = e.target.txtAddress.value.trim();
  const phoneNumber = e.target.txtPhone.value.trim();
  const birthDate = e.target.txtBirthDate.value.trim();
  const acceptedTerms = e.target.chkTerms.checked;

  document.querySelector("#error").classList.add("hidden");

  // === Custom validation ===

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !repeatPassword ||
    !address ||
    !phoneNumber ||
    !birthDate
  ) {
    return handleError("Please fill out all fields correctly.");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return handleError("Please enter a valid email address.");
  }

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{9,}$/;
  if (!passwordPattern.test(password)) {
    return handleError(
      "Password must be at least 9 characters and include uppercase, lowercase, number, and symbol."
    );
  }

  if (password !== repeatPassword) {
    return handleError("Passwords must match.");
  }

  const phonePattern = /^\d+$/;
  if (!phonePattern.test(phoneNumber)) {
    return handleError("Phone number must contain digits only.");
  }

  const selectedDate = new Date(birthDate);
  const today = new Date();
  if (selectedDate > today) {
    return handleError("Birth date cannot be in the future.");
  }

  if (!acceptedTerms) {
    return handleError("You must accept the terms and conditions.");
  }

  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("first_name", firstName);
  formData.append("last_name", lastName);
  formData.append("address", address);
  formData.append("phone_number", phoneNumber);
  formData.append("birth_date", birthDate);

  fetch(`${BASE_URL}/users`, {
    method: "POST",
    body: formData,
  })
    .then(handleAPIError)
    .then((data) => {
      if ("user_id" in data) {
        window.location.href = "login.html";
      } else {
        throw new Error(data.error);
      }
    })
    .catch(handleError);
});
