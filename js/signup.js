import { BASE_URL } from "./info.js";
import { handleError, handleAPIError, handleFetchCatchError } from "./api.js";

document.querySelector("#frmSignup").addEventListener("submit", (e) => {
  e.preventDefault();

  const password = e.target.txtPassword.value.trim();
  const repeatPassword = e.target.txtRepeatPassword.value.trim();

  if (password !== repeatPassword) {
    handleError("Passwords must match.");
    return false;
  }

  const firstName = e.target.txtFirstName.value.trim();
  const lastName = e.target.txtLastName.value.trim();
  const email = e.target.txtEmail.value.trim();
  const address = e.target.txtAddress.value.trim(); // FIXED typo
  const phoneNumber = e.target.txtPhone.value.trim();
  const birthDate = e.target.txtBirthDate.value.trim();

  const params = new URLSearchParams();
  params.append("email", email);
  params.append("password", password);
  params.append("first_name", firstName);
  params.append("last_name", lastName);
  params.append("address", address);
  params.append("phone_number", phoneNumber);
  params.append("birth_date", birthDate);

  fetch(`${BASE_URL}/users`, {
    method: "POST",
    body: params,
  })
    .then(handleAPIError)
    .then((data) => {
      if ("user_id" in data) {
        window.location.href = "login.html";
      } else {
        throw new Error(data.error || "Unexpected signup error.");
      }
    })
    .catch(handleFetchCatchError);
});
