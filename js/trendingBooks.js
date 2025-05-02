import { BASE_URL } from "./info.js";
import { FALLBACK_IMAGE } from "./info.js";
import { handleError } from "./api.js";

const DEFAULT_BOOKS = 3;

const showTrendingBooks = async (numBooks = DEFAULT_BOOKS) => {
  try {
    const response = await fetch(`${BASE_URL}/books?n=${numBooks}`);
    const books = await response.json();

    const fragment = document.createDocumentFragment();

    books.forEach((book) => {
      const card = document
        .querySelector("#trending_template")
        .content.cloneNode(true);
      const img = card.querySelector(".book_cover");

      img.setAttribute("src", FALLBACK_IMAGE);
      img.setAttribute("alt", `Loading cover for ${book.title}...`);

      card.querySelector(".book_title").innerText = book.title;
      card.querySelector(".book_author").innerText = `by ${book.author}`;
      card.querySelector(
        ".publishing_year"
      ).innerText = `Published: ${book.publishing_year}`;
      card.querySelector(".publishing_company").innerText =
        book.publishing_company;

      card.querySelectorAll("a").forEach((link) => {
        link.href = `book.html?book_id=${book.book_id}`;
      });

      fetch(`${BASE_URL}/books/${book.book_id}`)
        .then(response => response.json())
        .then(data =>{
          if (data.cover) {
            img.src = data.cover;
            img.alt = `Cover of ${book.title}`;
          }
        })

      fragment.append(card);
    });

    document.querySelector("#trending_book_list").append(fragment);
  } catch (error) {
    handleError(error);
  }
};

showTrendingBooks();