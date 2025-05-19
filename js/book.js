import { BASE_URL } from "./info.js";
import { handleError, handleRelatedError, handleAPIError } from "./api.js";
import {
  loadBookImage,
  handleLoanButton,
  updateBookLinks
} from "./fetchBooks.js";

const params = new URLSearchParams(window.location.search);
const bookId = params.get("book_id");

const relatedContainer = document.querySelector("#related_list");
const relatedTemplate = document.querySelector("#related_template");
const detailsContainer = document.querySelector("#single_book_detail");
const detailsTemplate = document.querySelector("#book_detail_template");

const DEFAULT_RELATED = 3;

const showBookDetail = () =>{
  fetch(`${BASE_URL}/books/${bookId}`)
  .then(handleAPIError)
  
  .then((book) =>{
    book.book_id = bookId;
    const fragment = document.createDocumentFragment();
    const userId = sessionStorage.getItem("app_user_id");
    document.getElementById("page-title").textContent = `Chapter | ${book.title}`;
    document.getElementById("currentBookTitle").innerText = book.title;
    const card = detailsTemplate.content.cloneNode(true);
    const img = card.querySelector(".book_detail_cover");

    loadBookImage(img, book, book.title);
    card.querySelector(".book_detail_title").innerText = book.title;
    card.querySelector(
      ".book_detail_author"
    ).textContent = `Author: ${book.author}`;
    card.querySelector(
      ".book_detail_year"
    ).textContent = `Publishing year: ${book.publishing_year}`;
    card.querySelector(
      ".book_detail_publisher"
    ).textContent = `Publisher: ${book.publishing_company}`;

    handleLoanButton(card, userId);

    fragment.append(card);

    detailsContainer.append(fragment);
  }) 
  .catch(handleError);

};

const showRelatedBooks = (numBooks = DEFAULT_RELATED) => {
  fetch(`${BASE_URL}/books?n=${numBooks}`)
    .then(handleAPIError)
    .then((books) => {
      const fragment = document.createDocumentFragment();
      const userId = sessionStorage.getItem("app_user_id");

      books.forEach((book) => {
        const card = relatedTemplate.content.cloneNode(true);
        const img = card.querySelector(".book_cover");

        loadBookImage(img, book, book.title);
        card.querySelector(".book_title").innerText = book.title;

        handleLoanButton(card, userId);
        updateBookLinks(card, book);

        fragment.append(card);
      });

      relatedContainer.append(fragment);
    })
    .catch(handleRelatedError);
};

showBookDetail();
showRelatedBooks();
