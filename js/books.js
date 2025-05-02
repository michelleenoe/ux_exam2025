import { BASE_URL } from "./info.js";
import { FALLBACK_IMAGE } from "./info.js";
import { handleError } from "./api.js";

const searchInput = document.querySelector("#search_input");
const container = document.querySelector("#showAllBooks_book_list");
const template = document.querySelector("#showAllBooks_template");
const loadMoreBtn = document.querySelector("#load_more_btn");

let allBooks = [];
let visibleCount = 10;

const fetchBooks = async () => {
  try {
    const res = await fetch(`${BASE_URL}/books?n=100`);
    const data = await res.json();
    allBooks = Array.isArray(data) ? data : [];
    updateBookList();
  } catch (error) {
    handleError(error);
  }
};

const updateBookList = () => {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = query.length >= 2
    ? allBooks.filter(book =>
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

  books.forEach((book) => {
    const card = template.content.cloneNode(true);
    const img = card.querySelector(".book_cover");

    img.setAttribute("src", FALLBACK_IMAGE);
    img.setAttribute("alt", `Loading cover for ${book.title}...`);
    card.querySelector(".book_title").innerText = book.title;
    card.querySelector(".book_author").innerText = `by ${book.author}`;
    card.querySelector(".publishing_year").innerText = `Published: ${book.publishing_year}`;
    card.querySelector(".publishing_company").innerText = book.publishing_company;

    card.querySelectorAll("a").forEach((link, index) => {
      link.href = index < 2
        ? `book.html?book_id=${book.book_id}`
        : `loan.html?book_id=${book.book_id}`;
    });

    fetch(`${BASE_URL}/books/${book.book_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.cover) {
          img.src = data.cover;
          img.alt = `Cover of ${book.title}`;
        }
      });

    fragment.append(card);
  });

  container.append(fragment);
};

searchInput?.addEventListener("input", () => {
  visibleCount = 10;
  updateBookList();
});

loadMoreBtn?.addEventListener("click", () => {
  visibleCount += 10;
  updateBookList();
});

fetchBooks();