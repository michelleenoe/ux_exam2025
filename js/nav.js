// js/burgerMenu.js

export function burgerMenu() {
  const burgerBtn = document.querySelector("#burger_btn");
  const sideMenu = document.querySelector("#side_menu");
  const closeBtn = document.querySelector("#close_btn");

  if (!burgerBtn || !sideMenu || !closeBtn) return;

  burgerBtn.addEventListener("click", () => {
    sideMenu.classList.toggle("open");
  });

  closeBtn.addEventListener("click", () =>{
    sideMenu.classList.remove("open");
  })
}
