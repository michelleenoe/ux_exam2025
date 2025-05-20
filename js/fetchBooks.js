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

  if (loanBtn) {
    loanBtn.addEventListener("click", (event) => {
      event.preventDefault();
      showLoanModal();
    });


    if (!userId) {
      loanBtn.classList.add("hidden");
    } else {
      loanBtn.classList.remove("hidden");
    }
  }
};


export const updateBookLinks = (card, book) => {
  const imageLink = card.querySelector("a.book_image_link");
  if (imageLink) {
    imageLink.href = `book.html?book_id=${book.book_id}`;
    imageLink.setAttribute("aria-label", `Cover image of ${book.title}`);
  }

  const readMoreLink = card.querySelector("a.readmore_link");
  if (readMoreLink) {
    readMoreLink.href = `book.html?book_id=${book.book_id}`;
    readMoreLink.innerHTML = `Read More<span class="sr-only"> about ${book.title}</span>`;
    readMoreLink.setAttribute("aria-label", `Read more about ${book.title}`);
  }
};
