import { BASE_URL} from "./info.js";
import { handleError, handleAPIError } from "./api.js";
import { loadBookImage, handleLoanButton, updateBookLinks } from "./fetchBooks.js";

const container = document.querySelector("#trending_book_list");
const template = document.querySelector("#trending_template");

const DEFAULT_BOOKS = 3;

const showTrendingBooks = (numBooks = DEFAULT_BOOKS) => {
  fetch(`${BASE_URL}/books?n=${numBooks}`)
    .then(handleAPIError)
    .then((books) => {
      const fragment = document.createDocumentFragment();
      const userId = sessionStorage.getItem("app_user_id");

      books.forEach((book) => {
        const card = template.content.cloneNode(true);
        const img = card.querySelector(".book_cover");

        loadBookImage(img, book, book.title);
        card.querySelector(".book_title").innerText = book.title;

        handleLoanButton(card, userId);
        updateBookLinks(card, book);

        fragment.append(card);
      });

      container.append(fragment);
    })
    .catch(handleError);
};

showTrendingBooks();
