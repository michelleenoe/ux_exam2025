// export const handleError = (error) => {
//     document.querySelector('#errorText').innerText = error;
//     document.querySelector('#error').classList.remove('hidden');
// };

// export const header = new Headers({
//     'X-Session-Token': sessionStorage.getItem('food_repo_user_token')
// });
export const USERS_BASE_URL = "http://localhost:8080";

export function checkLoginStatus(expectedUserId, redirectPage) {
    const userId = sessionStorage.getItem("userId");
    if (userId != expectedUserId) {
        alert("You must be authorized to access this page.");
        window.location.href = redirectPage;
    }
}