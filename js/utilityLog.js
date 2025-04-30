export function utilityLog() {
  const userId = sessionStorage.getItem("user_id");
  const isAdmin = sessionStorage.getItem("is_admin") === "1";

  // Desktop navigation
  const desktopLogged = document.querySelector("#utility_logged");
  const desktopNotLogged = document.querySelector("#utility_not_logged");
  const desktopAdminLink = desktopLogged?.querySelector('a[href="admin.html"]');

  // Mobile navigation
  const mobileLogged = document.querySelector("#mobile_utility_logged");
  const mobileNotLogged = document.querySelector("#mobile_utility_not_logged");
  const mobileAdminLink = mobileLogged?.querySelector('a[href="admin.html"]');

  if (userId !== null) {
    // Show logged-in navs
    desktopLogged?.classList.remove("hidden");
    desktopNotLogged?.classList.add("hidden");
    mobileLogged?.classList.remove("hidden");
    mobileNotLogged?.classList.add("hidden");

    // Show/hide admin link
    if (isAdmin) {
      desktopAdminLink?.classList.remove("hidden");
      mobileAdminLink?.classList.remove("hidden");
    } else {
      desktopAdminLink?.classList.add("hidden");
      mobileAdminLink?.classList.add("hidden");
    }
  } else {
    // Show logged-out navs
    desktopLogged?.classList.add("hidden");
    desktopNotLogged?.classList.remove("hidden");
    mobileLogged?.classList.add("hidden");
    mobileNotLogged?.classList.remove("hidden");
  }

}
