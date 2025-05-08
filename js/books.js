import { BASE_URL } from "./info.js";
import { handleError, handleAPIError } from "./api.js";
import {
  loadBookImage,
  handleLoanButton,
  updateBookLinks,
} from "./fetchBooks.js";

const searchInput = document.querySelector("#search_input");
const container = document.querySelector("#showAllBooks_book_list");
const template = document.querySelector("#showAllBooks_template");
const loadMoreBtn = document.querySelector("#load_more_btn");

let allBooks = []; //acts like a local cache of all books for efficient filtering and rendering without repeated API calls
let visibleCount = 9;
const DEFAULT_BOOKS = 100;

const fetchBooks = (numBooks = DEFAULT_BOOKS) => {
  fetch(`${BASE_URL}/books?n=${numBooks}`)
    .then(handleAPIError)
    .then((data) => {
      allBooks = data;
      updateBookList();
    })
    .catch(handleError);
};

const updateBookList = () => {
  const query = searchInput.value.trim().toLowerCase();
  const filtered =
    query.length >= 2
      ? allBooks.filter(
          (book) =>
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query)
        )
      : allBooks;

  const booksToShow = filtered.slice(0, visibleCount);
  container.innerHTML = "";
  renderBooks(booksToShow);

  loadMoreBtn.classList.toggle("hidden", visibleCount >= filtered.length);
};

const renderBooks = (books) => {
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
};

searchInput?.addEventListener("input", () => {
  visibleCount = 9;
  updateBookList();
});

loadMoreBtn?.addEventListener("click", () => {
  visibleCount += 9;
  updateBookList();
});

fetchBooks();
