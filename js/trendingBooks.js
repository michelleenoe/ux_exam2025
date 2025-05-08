import { BASE_URL, FALLBACK_IMAGE } from "./info.js";
import { handleError, handleAPIError } from "./api.js";
import { showLoanModal } from "./modal.js";

const DEFAULT_BOOKS = 3;

const showTrendingBooks = (numBooks = DEFAULT_BOOKS) => {
  fetch(`${BASE_URL}/books?n=${numBooks}`)
    .then(handleAPIError)
    .then((books) => {
      const fragment = document.createDocumentFragment();
      const userId = sessionStorage.getItem("app_user_id");

      books.forEach((book) => {
        const card = document
          .querySelector("#trending_template")
          .content.cloneNode(true);
        const img = card.querySelector(".book_cover");

        img.setAttribute("src", FALLBACK_IMAGE);
        img.setAttribute("alt", `Loading cover for ${book.title}...`);

        card.querySelector(".book_title").innerText = book.title;

        const loanBtnWrapper = card.querySelector(".loan_btn");
        if (!userId && loanBtnWrapper) {
          loanBtnWrapper.classList.add("hidden");
        }

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

        fetch(`${BASE_URL}/books/${book.book_id}`)
          .then(handleAPIError)
          .then((data) => {
            if (data.cover) {
              img.src = data.cover;
              img.alt = `Cover of ${book.title}`;
            }
          })
          .catch(handleError);

        fragment.append(card);
      });

      document.querySelector("#trending_book_list").append(fragment);
    })
    .catch(handleError);
};

showTrendingBooks();
