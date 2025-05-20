export function burgerMenu() {
  const burgerBtn = document.querySelector("#burger_btn");
  const sideMenu = document.querySelector("#side_menu");
  const closeBtn = document.querySelector("#close_btn");

  const allLinks = sideMenu?.querySelectorAll("a, button");

  if (!burgerBtn || !sideMenu || !closeBtn) return;

    sideMenu.setAttribute("aria-hidden", "true");
    allLinks?.forEach((link) => link.setAttribute("tabindex", "-1"));

  burgerBtn.addEventListener("click", () => {
    sideMenu.classList.add("open");
    sideMenu.setAttribute("aria-hidden", "false");
    allLinks?.forEach(link => link.setAttribute("tabindex", "0"));
  });

  closeBtn.addEventListener("click", () => {
    sideMenu.classList.remove("open");
    sideMenu.setAttribute("aria-hidden", "true");
    allLinks?.forEach(link => link.setAttribute("tabindex", "-1"));
  });
}
