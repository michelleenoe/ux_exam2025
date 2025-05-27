import { BASE_URL, FALLBACK_IMAGE } from "./info.js";
import { handleError, handleAPIError, getHeader } from "./api.js";
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


export const handleLoanButton = (card, userId, bookId) => {
  const loanBtn = card.querySelector(".loan_btn");
  const isAdmin = sessionStorage.getItem("app_user_is_admin") === "1";

  if (loanBtn) {
    if (!userId || isAdmin) {
      loanBtn.classList.add("hidden");
      return;
    } else {
      loanBtn.classList.remove("hidden");
    }

    loanBtn.addEventListener("click", (event) => {
      event.preventDefault();

      fetch(`${BASE_URL}/users/${userId}/books/${bookId}`, {
        method: "POST",
        headers: getHeader(),
      })
        .then(handleAPIError)
        .then((data) => {
          showLoanModal();
        })
        .catch(handleError);
    });
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
