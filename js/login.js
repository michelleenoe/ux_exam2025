import { BASE_URL } from "./info.js";
import { handleAPIError, handleError } from "./api.js";

document.querySelector("#frmLogin").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = e.target.txtEmail.value.trim();
  const password = e.target.txtPassword.value.trim();

  document.querySelector("#error").classList.add("hidden");

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

  const params = new URLSearchParams();
  params.append("email", email);
  params.append("password", password);

  fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    body: params,
  })
    .then(handleAPIError)
    .then((data) => {
      if (data.user_id && data.auth_token) {
        sessionStorage.setItem("app_user_id", data.user_id);
        sessionStorage.setItem("app_user_token", data.auth_token);
        sessionStorage.setItem("app_user_is_admin", data.is_admin);

        window.location.href =
          data.is_admin === 1 ? "admin.html" : "profile.html";
      } else {
        throw new Error(data.error);
      }
    })
    .catch(handleError);
});

// const loadFavourites = (userID) => {

//     const tokenHeader = new Headers({
//         'X-Session-Token': sessionStorage.getItem('food_repo_user_token')
//     });

//     fetch(`${USERS_BASE_URL}/users/${userID}/favourites`,
//         {
//             headers: tokenHeader
//         }
//     )
//     .then(response => response.json())
//     .then(data => {
//         sessionStorage.setItem('food_repo_user_favourites', JSON.stringify(data));
//     })
//     .catch(handleError);
// };
