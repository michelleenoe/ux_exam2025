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
const authorSelect = document.querySelector("#select_author");

let allBooks = [];
let visibleCount = 9;
const DEFAULT_BOOKS = 2100;

const fetchBooks = (numBooks = DEFAULT_BOOKS) => {
  fetch(`${BASE_URL}/books?n=${numBooks}`)
    .then(handleAPIError)
    .then((data) => {
      allBooks = data;
      updateBookList();

    })
    .catch(handleError);
};

const fetchAuthors = () => {
  fetch(`${BASE_URL}/authors`)
    .then(handleAPIError)
    .then((authors) => {
      authors.forEach((a) => {
        const opt = document.createElement("option");
        opt.value = a.author_name;
        opt.textContent = a.author_name;
        authorSelect.append(opt);
      });
    })
    .catch(handleError);
};

const updateBookList = () => {
  const query = searchInput.value.trim().toLowerCase();
  const authorName = authorSelect.value;
  let filtered = allBooks;

  if (authorName !== "all") {
    filtered = filtered.filter((book) => book.author === authorName);
  }

  if (query.length >= 2) {
    filtered = filtered.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    );
  }

  if (filtered.length === 0 && query.length >= 2) {
    container.innerHTML = "";
    loadMoreBtn.classList.add("hidden");
    handleError("No books matched your search. Please try again.");
    return;
  }
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

document
  .querySelector("form[role=search]")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    visibleCount = 9;
    updateBookList();
  });
authorSelect.addEventListener("change", () => {
  visibleCount = 9;
  updateBookList();
});

loadMoreBtn?.addEventListener("click", () => {
  visibleCount += 9;
  updateBookList();
});

fetchBooks();
fetchAuthors();
