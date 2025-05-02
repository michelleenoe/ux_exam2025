import { BASE_URL } from "./info.js";
import { FALLBACK_IMAGE } from "./info.js";
import { handleError } from "./api.js";

const searchInput = document.querySelector("#search_input");
const container = document.querySelector("#showAllBooks_book_list");
const template = document.querySelector("#showAllBooks_template");
const loadMoreBtn = document.querySelector("#load_more_btn");

let allBooks = [];
let DEFAULT_COUNT = 10;

const showAllBooks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/books?n=1000`);
    const data = await response.json();
    allBooks = Array.isArray(data) ? data : [];

    container.innerHTML = "";
    renderBooks(allBooks.slice(0, DEFAULT_COUNT));
  } catch (error) {
    handleError(error);
  }
};

const renderBooks = (books) => {
  const fragment = document.createDocumentFragment();

  books.forEach((book) => {
    const card = document
        .querySelector("#showAllBooks_template")
        .content.cloneNode(true);
    const img = card.querySelector(".book_cover");

    img.setAttribute("src", FALLBACK_IMAGE);
    img.setAttribute("alt", `Loading cover for ${book.title}...`);

    card.querySelector(".book_title").innerText = book.title;
    card.querySelector(".book_author").innerText = `by ${book.author}`;
    card.querySelector(".publishing_year").innerText = `Published: ${book.publishing_year}`;
    card.querySelector(".publishing_company").innerText = book.publishing_company;

    card.querySelectorAll("a").forEach((link, index) => {
      if (index === 0 || index === 1) {
        link.href = `book.html?book_id=${book.book_id}`;
      } else if (index === 2) {
        link.href = `loan.html?book_id=${book.book_id}`;
      }
    });

    fetch(`${BASE_URL}/books/${book.book_id}`)
      .then(res => res.json())
      .then(data => {
        if (data.cover) {
          img.src = data.cover;
          img.alt = `Cover of ${book.title}`;
        }
      });

    fragment.append(card);
  });

  container.append(fragment);
};

loadMoreBtn?.addEventListener("click", () => {
  DEFAULT_COUNT += 10;
  const query = searchInput.value.trim().toLowerCase();

  const result = query.length >= 2
    ? allBooks.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
      )
    : allBooks;

  renderBooks(result.slice(DEFAULT_COUNT - 10, DEFAULT_COUNT));

  if (DEFAULT_COUNT >= result.length) {
    loadMoreBtn.classList.add("hidden");
  }
});

searchInput?.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  DEFAULT_COUNT = 10;

  const filtered = query.length < 2
    ? allBooks
    : allBooks.filter((book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
      );

  container.innerHTML = "";
  renderBooks(filtered.slice(0, DEFAULT_COUNT));

  if (DEFAULT_COUNT >= filtered.length) {
    loadMoreBtn.classList.add("hidden");
  } else {
    loadMoreBtn.classList.remove("hidden");
  }
});

showAllBooks();