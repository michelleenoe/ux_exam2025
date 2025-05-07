import { BASE_URL, FALLBACK_IMAGE } from "./info.js";
import { handleError } from "./api.js";

const params = new URLSearchParams(window.location.search);
const bookId = params.get("book_id");
const bookCover = document.querySelector("#bookCover");
const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const bookYear = document.querySelector("#bookYear");
const bookPublisher = document.querySelector("#bookPublisher");
const loanBtn = document.querySelector("#loanBtn");

const DEFAULT_RELATED = 5;
const relatedTpl = document.querySelector("#related_template");
const relatedList = document.querySelector(".related-list");


const showBookDetails = async () => {
  try {
    if (!bookId) {
      handleError("Book ID is missing.");
      return;
    }

    const response = await fetch(`${BASE_URL}/books/${bookId}`);
    if (!response.ok) throw new Error("Failed to load book details.");

    const book = await response.json();

    bookCover.src = book.cover || FALLBACK_IMAGE;
    bookCover.alt = `Cover of ${book.title}`;
    bookTitle.innerText = book.title;
    bookAuthor.innerText = `Author: ${book.author}`;
    bookYear.innerText = `Published: ${book.publishing_year}`;
    bookPublisher.innerText = `Publisher: ${book.publishing_company}`;
    loanBtn.addEventListener("click", () => {
      window.location.href = `loan.html?book_id=${bookId}`;
    });

  } catch (error) {
    handleError(error.message || error);
  }
};

const showRelatedBooks = async (count = DEFAULT_RELATED) => {
  try {
    const response = await fetch(`${BASE_URL}/books?n=${count}`);
    if (!response.ok) throw new Error("Failed to load related books.");

    const list = await response.json();
    const fragment = document.createDocumentFragment();

    list.forEach((book) => {
      const card = relatedTpl.content.cloneNode(true);
      const img = card.querySelector(".related_cover");

      img.src = FALLBACK_IMAGE;
      img.alt = `Loading cover for ${book.title}...`;
      card.querySelector(".related_title").innerText = book.title;
      card.querySelector(".related_author").innerText = book.author;
      card.querySelector("a").href = `book.html?book_id=${book.book_id}`;


      fetch(`${BASE_URL}/books/${book.book_id}`)
        .then(res => res.json())
        .then(data => {
          if (data.cover) {
            img.src = data.cover;
            img.alt = `Cover of ${book.title}`;
          }
        })
        .catch(() => { });

      fragment.append(card);
    });

    relatedList.append(fragment);

  } catch (error) {
    handleError(error.message || error);
  }
};

showBookDetails();
showRelatedBooks();
