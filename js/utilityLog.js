export function utilityLog() {
  const userId = sessionStorage.getItem("app_user_id"); 
  const isAdmin = sessionStorage.getItem("app_user_is_admin") === "1"; 

  const desktopLogged = document.querySelector("#utility_logged");
  const desktopNotLogged = document.querySelector("#utility_not_logged");
  const desktopAdminLink = desktopLogged?.querySelector("#admin_desk");
  const desktopProfileLink = desktopLogged?.querySelector("#profile_desk");

  const mobileLogged = document.querySelector("#mobile_utility_logged");
  const mobileNotLogged = document.querySelector("#mobile_utility_not_logged");
  const mobileAdminLink = mobileLogged?.querySelector("#admin_mob");
  const mobileProfileLink = mobileLogged?.querySelector("#profile_mob");

  const heroSignUp = document.querySelector("#signup_btn");
  const heroAdmin = document.querySelector("#admin_btn");
  const heroProfile = document.querySelector("#profile_btn");

  if (userId !== null) {
    // Desktop & mobile utility visning
    desktopLogged?.classList.remove("hidden");
    desktopLogged?.setAttribute("aria-hidden", "false");
    desktopNotLogged?.classList.add("hidden");
    desktopNotLogged?.setAttribute("aria-hidden", "true");

    mobileLogged?.classList.remove("hidden");
    mobileLogged?.setAttribute("aria-hidden", "false");
    mobileNotLogged?.classList.add("hidden");
    mobileNotLogged?.setAttribute("aria-hidden", "true");

    heroSignUp?.classList.add("hidden");
    heroSignUp?.setAttribute("aria-hidden", "true");

    if (isAdmin) {
      desktopAdminLink?.classList.remove("hidden");
      desktopAdminLink?.setAttribute("aria-hidden", "false");
      mobileAdminLink?.classList.remove("hidden");
      mobileAdminLink?.setAttribute("aria-hidden", "false");

      desktopProfileLink?.classList.add("hidden");
      desktopProfileLink?.setAttribute("aria-hidden", "true");
      mobileProfileLink?.classList.add("hidden");
      mobileProfileLink?.setAttribute("aria-hidden", "true");

      heroAdmin?.classList.remove("hidden");
      heroAdmin?.setAttribute("aria-hidden", "false");
      heroProfile?.classList.add("hidden");
      heroProfile?.setAttribute("aria-hidden", "true");
    } else {
      desktopProfileLink?.classList.remove("hidden");
      desktopProfileLink?.setAttribute("aria-hidden", "false");
      mobileProfileLink?.classList.remove("hidden");
      mobileProfileLink?.setAttribute("aria-hidden", "false");

      desktopAdminLink?.classList.add("hidden");
      desktopAdminLink?.setAttribute("aria-hidden", "true");
      mobileAdminLink?.classList.add("hidden");
      mobileAdminLink?.setAttribute("aria-hidden", "true");

      heroAdmin?.classList.add("hidden");
      heroAdmin?.setAttribute("aria-hidden", "true");
      heroProfile?.classList.remove("hidden");
      heroProfile?.setAttribute("aria-hidden", "false");
    }
  } else {
    desktopLogged?.classList.add("hidden");
    desktopLogged?.setAttribute("aria-hidden", "true");
    desktopNotLogged?.classList.remove("hidden");
    desktopNotLogged?.setAttribute("aria-hidden", "false");

    mobileLogged?.classList.add("hidden");
    mobileLogged?.setAttribute("aria-hidden", "true");
    mobileNotLogged?.classList.remove("hidden");
    mobileNotLogged?.setAttribute("aria-hidden", "false");

    heroSignUp?.classList.remove("hidden");
    heroSignUp?.setAttribute("aria-hidden", "false");
    heroAdmin?.classList.add("hidden");
    heroAdmin?.setAttribute("aria-hidden", "true");
    heroProfile?.classList.add("hidden");
    heroProfile?.setAttribute("aria-hidden", "true");
  }
}


function updateAriaHiddenBasedOnViewport() {
  const desktopMenu = document.querySelector("#desktop_menu");
  const burgerBtn = document.querySelector("#burger_btn");
  const sideMenu = document.querySelector("#side_menu");

  const isDesktop = window.matchMedia("(min-width: 768px)").matches;

  if (isDesktop) {
    desktopMenu?.setAttribute("aria-hidden", "false");
    burgerBtn?.setAttribute("aria-hidden", "true");
    sideMenu?.setAttribute("aria-hidden", "true");
  } else {
    desktopMenu?.setAttribute("aria-hidden", "true");
    burgerBtn?.setAttribute("aria-hidden", "false");
    sideMenu?.setAttribute("aria-hidden", "false");
  }
}

window.addEventListener("load", updateAriaHiddenBasedOnViewport);
window.addEventListener("resize", () => {
  clearTimeout(window._resizeTimeout);
  window._resizeTimeout = setTimeout(updateAriaHiddenBasedOnViewport, 150);
});
