import { BASE_URL, FALLBACK_IMAGE } from "./info.js";
import { handleError } from "./api.js";

const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("book_id");
const bookCover = document.querySelector("#bookCover");
const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const bookYear = document.querySelector("#bookYear");
const bookPublisher = document.querySelector("#bookPublisher");
const loanBtn = document.querySelector("#loanBtn");

if (!bookId) handleError("Book ID is missing.");

fetch(`${BASE_URL}/books/${bookId}`)
  .then(response => {
    if (!response.ok) throw new Error("Failed to load book details.");
    return response.json();
  })
  .then(book => {
    bookCover.src = book.cover || FALLBACK_IMAGE;
    bookCover.alt = `Cover of ${book.title}`;
    bookTitle.innerText = book.title;
    bookAuthor.innerText = `Author: ${book.author}`;
    bookYear.innerText = `Published: ${book.publishing_year}`;
    bookPublisher.innerText = `Publisher: ${book.publishing_company}`;
    loanBtn.addEventListener("click", () => {
      window.location.href = `loan.html?book_id=${bookId}`;
    });
  })
  .catch(error => handleError(error.message));

const DEFAULT_RELATED = 5;
const template = document.querySelector("#related_template");
const container = document.querySelector(".related-list");

const showRelatedBooks = async (numBooks = DEFAULT_RELATED) => {
  try {
    const res = await fetch(`${BASE_URL}/books?n=${numBooks}`);
    if (!res.ok) throw new Error("Failed to load related books.");
    const list = await res.json();
    const fragment = document.createDocumentFragment();

    list.forEach(book => {
      const card = template.content.cloneNode(true);
      const img = card.querySelector(".related_cover");

      img.src = FALLBACK_IMAGE;
      img.alt = `${book.title}...`;
      card.querySelector(".related_title").innerText = book.title;
      card.querySelector(".related_author").innerText = book.author;
      card.querySelector("a").href = `book.html?book_id=${book.book_id}`;

      fetch(`${BASE_URL}/books/${book.book_id}`)
        .then(r => r.ok ? r.json() : {})
        .then(data => {
          if (data.cover) {
            img.src = data.cover;
            img.alt = `Cover of ${book.title}`;
          }
        })
        .catch(() => { });

      fragment.append(card);
    });

    container.append(fragment);
  } catch (error) {
    handleError(error.message || error);
  }
};

showRelatedBooks();
