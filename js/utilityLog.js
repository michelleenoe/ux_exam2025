export function utilityLog() {
  const userId = sessionStorage.getItem("app_user_id"); // Correct session key for user ID
  const isAdmin = sessionStorage.getItem("app_user_is_admin") === "1"; // Correct session key for admin check

  // Desktop navigation
  const desktopLogged = document.querySelector("#utility_logged");
  const desktopNotLogged = document.querySelector("#utility_not_logged");
  const desktopAdminLink = desktopLogged?.querySelector("#admin_desk");
  const desktopProfileLink = desktopLogged?.querySelector("#profile_desk");

  // Mobile navigation
  const mobileLogged = document.querySelector("#mobile_utility_logged");
  const mobileNotLogged = document.querySelector("#mobile_utility_not_logged");
  const mobileAdminLink = mobileLogged?.querySelector("#admin_mob");
  const mobileProfileLink = mobileLogged?.querySelector("#profile_mob");

  // Hero button
  const heroSignUp = document.querySelector("#signup_btn");
  const heroAdmin = document.querySelector("#admin_btn");
  const heroProfile = document.querySelector("#profile_btn");

  if (userId !== null) {
    // Check if the user is logged in
    // Show logged-in navs
    desktopLogged?.classList.remove("hidden");
    desktopNotLogged?.classList.add("hidden");
    mobileLogged?.classList.remove("hidden");
    mobileNotLogged?.classList.add("hidden");
    heroSignUp?.classList.add("hidden");

    // Show/hide admin and profile links based on isAdmin value
    if (isAdmin) {
      // If admin, show admin link and hide profile link
      desktopAdminLink?.classList.remove("hidden");
      mobileAdminLink?.classList.remove("hidden");
      desktopProfileLink?.classList.add("hidden");
      mobileProfileLink?.classList.add("hidden");
      heroAdmin?.classList.remove("hidden");
      heroProfile?.classList.add("hidden");
    } else {
      // If not admin, show profile link and hide admin link
      desktopProfileLink?.classList.remove("hidden");
      mobileProfileLink?.classList.remove("hidden");
      desktopAdminLink?.classList.add("hidden");
      mobileAdminLink?.classList.add("hidden");
      heroAdmin?.classList.add("hidden");
      heroProfile?.classList.remove("hidden");
    }
  } else {
    // Show logged-out navs
    desktopLogged?.classList.add("hidden");
    desktopNotLogged?.classList.remove("hidden");
    mobileLogged?.classList.add("hidden");
    mobileNotLogged?.classList.remove("hidden");
    heroSignUp?.classList.remove("hidden");
    heroAdmin?.classList.add("hidden");
    heroProfile?.classList.add("hidden");
  }
}
