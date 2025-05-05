import { BASE_URL } from "./info.js";
import { handleError } from "./api.js";

document.querySelector("#frmLogin").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = e.target.txtEmail.value.trim();
    const password = e.target.txtPassword.value.trim();

    const params = new URLSearchParams();
    params.append("email", email);
    params.append("password", password);

    fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      body: params,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid credentials or server error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);

        if (data.user_id && data.auth_token) {
          sessionStorage.setItem("app_user_id", data.user_id);
          sessionStorage.setItem("app_user_token", data.auth_token);
          sessionStorage.setItem("app_user_is_admin", data.is_admin);

          if (data.is_admin === 1) {
          window.location.href = "admin.html";
        } else {
          window.location.href = "profile.html";
        }
      } else {
        handleError("Login failed: Missing user ID or token.");
      }
      })
      .catch((err) => {
        handleError(err.message || "Login failed.");
      });
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
