import { BASE_URL, FALLBACK_IMAGE } from "./info.js";
import { handleError, handleAPIError } from "./api.js";
import {
  loadBookImage,
  handleLoanButton,
  updateBookLinks,
} from "./fetchBooks.js";

const params = new URLSearchParams(window.location.search);
const bookId = params.get("book_id");

const relatedContainer = document.querySelector("#related_list");
const relatedTemplate = document.querySelector("#related_template");
const detailsContainer = document.querySelector("#single_book_detail");
const detailsTemplate = document.querySelector("#book_details_template");

const DEFAULT_RELATED = 5;

const showBookDetail = () =>{
  fetch(`${BASE_URL}/books/${bookId}`)
  .then(handleAPIError)
  .then((book) =>{
    book.book_id = bookId;
    const fragment = document.createDocumentFragment();
    const userId = sessionStorage.getItem("app_user_id");

    const card = detailsTemplate.content.cloneNode(true);
    const img = card.querySelector(".book_cover");

    loadBookImage(img, book, book.title);
    card.querySelector(".book_title").innerText = book.title;
    card.querySelector(".book_author").innerText = book.author;
    card.querySelector(".book_year").innerText = book.publishing_year;
    card.querySelector(".book_publisher").innerText = book.publishing_company;

    handleLoanButton(card, userId);
    updateBookLinks(card, book);

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
    .catch(handleError);
};

showBookDetail();
showRelatedBooks();
