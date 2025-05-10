import { BASE_URL, FALLBACK_IMAGE } from "./info.js";
import { handleError, handleAPIError } from "./api.js";
import { showLoanModal } from "./modal.js";

export const loadBookImage = (imgElement, book, title) => {
  imgElement.setAttribute("src", FALLBACK_IMAGE);
  imgElement.setAttribute("alt", `Loading cover for ${title}...`);

  fetch(`${BASE_URL}/books/${book.book_id}`)
    .then(handleAPIError)
    .then((data) => {
      if (data.cover) {
        imgElement.src = data.cover;
        imgElement.alt = `Cover of ${title}`;
      }
    })
    .catch(handleError);
};

export const handleLoanButton = (card, userId) => {
  const loanBtn = card.querySelector(".loan_btn");

  // Always add the event listener if the button exists
  if (loanBtn) {
    loanBtn.addEventListener("click", (event) => {
      event.preventDefault();
      showLoanModal();
    });

    // Hide or show the button based on userId
    if (!userId) {
      loanBtn.classList.add("hidden");
    } else {
      loanBtn.classList.remove("hidden");
    }
  }
};


export const updateBookLinks = (card, book) => {
  // Update all <a> tags to point to the book detail page
  card.querySelectorAll("a").forEach((link) => {
    link.href = `book.html?book_id=${book.book_id}`;
  });

};