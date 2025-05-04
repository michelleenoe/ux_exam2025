export const showLoanModal = () => {
  document.querySelector("#loan_modal").classList.add("show");
};

document.querySelector("#modal_close_btn").addEventListener("click", () => {
  document.querySelector("#loan_modal").classList.remove("show");
});
