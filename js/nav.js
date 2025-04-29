// js/burgerMenu.js

export function setupBurgerMenu(burgerId, menuId) {
  const burgerBtn = document.getElementById(burgerId);
  const sideMenu = document.getElementById(menuId);

  if (!burgerBtn || !sideMenu) return;

  burgerBtn.addEventListener("click", () => {
    sideMenu.classList.toggle("open");
  });
}
