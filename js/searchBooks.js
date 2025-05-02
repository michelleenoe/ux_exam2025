import { BASE_URL } from "./info.js";
import { FALLBACK_IMAGE } from "./info.js";
import { handleError } from "./api.js";

const searchInput = document.querySelector("#search_input");
const container = document.querySelector("#showAllBooks_book_list");
const template = document.querySelector("#showAllBooks_template");

searchInput?.addEventListener("input", async () => {
  const query = searchInput.value.trim().toLowerCase();

  if (query.length < 2) return;

  try {
    const response = await fetch(`${BASE_URL}/books`);
    const books = await response.json();

    const filtered = books.filter((book) => {
      return (
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
      );
    });

    container.innerHTML = "";
    const fragment = document.createDocumentFragment();

    filtered.forEach((book) => {
      const card = template.content.cloneNode(true);
      const img = card.querySelector(".book_cover");

      img.setAttribute("src", FALLBACK_IMAGE);
      img.setAttribute("alt", `Loading cover for ${book.title}...`);

      card.querySelector(".book_title").innerText = book.title;

      card.querySelectorAll("a").forEach((link, index) => {
        if (index === 0 || index === 1) {
          link.href = `book.html?book_id=${book.book_id}`;
        } else if (index === 2) {
          link.href = `loan.html?book_id=${book.book_id}`;
        }
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
  } catch (error) {
    handleError(error);
  }
});