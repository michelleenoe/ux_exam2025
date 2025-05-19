export const showLoanModal = () => {
  const modal = document.querySelector("#loan_modal");
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.querySelector("#modal_close_btn").focus();
  document.addEventListener("keydown", handleEscape);
};

export const hideLoanModal = () => {
  const modal = document.querySelector("#loan_modal");
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.removeEventListener("keydown", handleEscape);
  document.querySelector(".loan_btn").focus();
};

function handleEscape(e) {
  if (e.key === "Escape" || e.key === "Esc") {
    hideLoanModal();
  }
}
document.querySelector("#modal_close_btn")
        .addEventListener("click", hideLoanModal);
