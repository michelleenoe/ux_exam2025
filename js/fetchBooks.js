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
  const loanBtnWrapper = card.querySelector(".loan_btn");
  if (!userId && loanBtnWrapper) {
    loanBtnWrapper.classList.add("hidden");
  } else {
    loanBtnWrapper?.classList.remove("hidden");
  }
};

export const updateBookLinks = (card, book) => {
  card.querySelectorAll("a").forEach((link, index) => {
    if (index === 0 || index === 1) {
      link.href = `book.html?book_id=${book.book_id}`;
    } else if (index === 2) {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        showLoanModal();
      });
    }
  });
};
