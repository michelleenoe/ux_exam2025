const userId = sessionStorage.getItem("app_user_id");
const isAdmin = sessionStorage.getItem("app_user_is_admin");

if (!userId || isAdmin !== "1") {
  window.location.href = "index.html";
}
