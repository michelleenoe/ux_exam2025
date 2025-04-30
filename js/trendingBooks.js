import { fetchData } from "./fetchData.js";

const API_URL = "http://localhost:8080/books?n=3";
const FALLBACK_IMAGE = "../assets/images/placeholder-cover.jpg"; // sørg for at denne fil findes


async function fetchTrendingBooks() {
  try {
    const books = await fetchData(API_URL);
    const template = document.querySelector("#trending_template");
    const container = document.querySelector("#trending_book_list");

    books.forEach(async (book) => {
      const clone = template.content.cloneNode(true);
      const coverImg = clone.querySelector(".book_cover");

      // Set fallback immediately
      coverImg.src = FALLBACK_IMAGE;
      coverImg.alt = `Loading cover for ${book.title}...`;

      clone.querySelector(".book_title").textContent = book.title;
      clone.querySelector(".book_author").textContent = `by ${book.author}`;
      clone.querySelector(
        ".publishing_year"
      ).textContent = `Published: ${book.publishing_year}`;
      clone.querySelector(".publishing_company").textContent =
        book.publishing_company;

      // Try to load actual cover
      try {
        const details = await fetchData(
          `http://localhost:8080/books/${book.book_id}`
        );
        const tempImg = new Image();
        tempImg.onload = () => {
          coverImg.src = details.cover;
          coverImg.alt = `Cover of ${book.title}`;
        };
        tempImg.onerror = () => {
          // fallback is already set, no need to change
        };
        tempImg.src = details.cover;
      } catch {
        // fallback already applied
      }

      container.appendChild(clone);
    });
  } catch (error) {
    console.error("Error fetching trending books:", error);
  }
}

fetchTrendingBooks();
