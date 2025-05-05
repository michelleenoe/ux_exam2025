import { BASE_URL } from "./info.js";
import { FALLBACK_IMAGE } from "./info.js";
import { handleError } from "./api.js";
import { showLoanModal } from "./modal.js";

const params = new URLSearchParams(window.location.search);
const bookId = params.get("book_id");

if (!bookId) {
  document.querySelector("#error").classList.remove("hidden");
  document.querySelector("#errorText").innerText = "No book ID provided.";
} else {
  fetch(`${BASE_URL}/books/${bookId}`)
    .then((response) => {
      if (!response.ok) throw new Error("Book not found");
      return response.json();
    })
    .then((book) => {
      document.querySelector("#book_title").innerText = book.title;
      document.querySelector("#book_author").innerText = `by ${book.author}`;
      document.querySelector("#book_year").innerText = `Published: ${book.publishing_year}`;
      document.querySelector("#book_publisher").innerText = book.publishing_company;
      const cover = document.querySelector("#book_cover");
      cover.src = book.cover || FALLBACK_IMAGE;
      cover.alt = `Cover of ${book.title}`;
    })
    .catch((error) => {
      handleError(error);
    });

  document.querySelector("#loan_button").addEventListener("click", () => {
    showLoanModal();
  });
}
