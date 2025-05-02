import { fetchData } from "./fetchData.js";
import { setCoverImage } from "./utils.js";

const LIMIT = 10;
let loadedBooks = 0;

const template = document.querySelector("#book_template");
const container = document.querySelector("#all_books");
const loadMoreBtn = document.querySelector("#load_more_btn");

export async function fetchBooks() {
  try {
    const books = await fetchData(`http://localhost:8080/books?n=${LIMIT}&offset=${loadedBooks}`);
    renderBooks(books);
    loadedBooks += books.length;
  } catch (err) {
    console.error("Error loading books:", err);
  }
}

export function renderBooks(books) {
  books.forEach(async (book) => {
    const clone = template.content.cloneNode(true);
    const cover = clone.querySelector(".book_cover");

    clone.querySelector(".book_title").textContent = book.title;
    clone.querySelector(".book_author").textContent = `by ${book.author}`;
    const yearEl = clone.querySelector(".publishing_year");
    yearEl.textContent = `Published: ${book.publishing_year}`;
    yearEl.dataset.year = book.publishing_year;
    clone.querySelector(".publishing_company").textContent = book.publishing_company;

    try {
      const details = await fetchData(`http://localhost:8080/books/${book.book_id}`);
      setCoverImage(cover, details.cover, book.title);
    } catch {
      setCoverImage(cover, null, book.title);
    }

    container.appendChild(clone);
  });
}

export async function renderBooksByAuthor(authorId = "") {
  container.innerHTML = "";
  loadedBooks = 0;
  loadMoreBtn.classList.toggle("hidden", !!authorId);

  const url = authorId
    ? `http://localhost:8080/books?a=${authorId}`
    : `http://localhost:8080/books?n=${LIMIT}&offset=${loadedBooks}`;

  try {
    const books = await fetchData(url);
    renderBooks(books);
    if (!authorId) loadedBooks += books.length;
    return books;
  } catch (error) {
    console.error("Error displaying books:", error);
    return [];
  }
}

function sortBooks(by) {
  const books = Array.from(container.children);
  books.sort((a, b) => {
    let aVal, bVal;
    if (by === "publishing_year") {
      aVal = parseInt(a.querySelector(".publishing_year")?.dataset.year || 0);
      bVal = parseInt(b.querySelector(".publishing_year")?.dataset.year || 0);
      return aVal - bVal;
    }
    aVal = a.querySelector(`.book_${by}`)?.textContent.trim().toLowerCase() || "";
    bVal = b.querySelector(`.book_${by}`)?.textContent.trim().toLowerCase() || "";
    return aVal.localeCompare(bVal);
  });
  books.forEach((el) => container.appendChild(el));
}

document.querySelector(".sort_btn")?.addEventListener("click", () =>
  document.getElementById("sort_dropdown")?.classList.toggle("hidden")
);

document.getElementById("sort_dropdown")?.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    sortBooks(e.target.dataset.sort);
    e.currentTarget.classList.add("hidden");
  }
});

loadMoreBtn?.addEventListener("click", fetchBooks);