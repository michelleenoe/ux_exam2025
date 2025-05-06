import { ERROR_MESSAGES } from "./errorMessages.js";

export function getFriendlyErrorMessage(errorKey) {
  return (
    ERROR_MESSAGES[errorKey] ||
    "An unexpected error occurred. Please try again later."
  );
}


export function showError(message) {
  const errorBox = document.querySelector("#error_message");
  if (errorBox) {
    errorBox.textContent = message;
    errorBox.classList.remove("hidden");
  }
}