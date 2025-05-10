import { BASE_URL, FALLBACK_IMAGE } from "../info.js";
import { handleError, getHeader, handleAPIError } from "../api.js";

const userId = sessionStorage.getItem("app_user_id");

export const initBookLookup = () => {
  const form = document.querySelector("#frmFindBook");
  const output = document.querySelector("#bookInfo");
  const errorBox = document.querySelector("#error");
  const errorText = document.querySelector("#errorText");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    output.classList.add("hidden");
    output.innerHTML = "";
    errorBox.classList.add("hidden");
    errorText.innerText = "";

    const bookId = form.book_id.value.trim();

    fetch(`${BASE_URL}/admin/${userId}/books/${bookId}`, {
      headers: getHeader(),
    })
      .then(handleAPIError)
      .then((book) => {
        const template = document.querySelector("#bookTemplate");
        const clone = template.content.cloneNode(true);

        const img = clone.querySelector(".book-cover");
        img.src = book.cover || FALLBACK_IMAGE;
        img.alt = `Cover for ${book.title}`;

        clone.querySelector(".book-title").textContent = book.title;
        clone.querySelector(
          ".book-author"
        ).textContent = `Author: ${book.author}`;
        clone.querySelector(
          ".book-publisher"
        ).textContent = `Publisher: ${book.publishing_company}`;
        clone.querySelector(
          ".book-year"
        ).textContent = `Year: ${book.publishing_year}`;

        const loanRows = clone.querySelector(".loan-rows");

        const createCell = (text, colspan = 1) => {
          const td = document.createElement("td");
          td.textContent = text;
          if (colspan > 1) td.colSpan = colspan;
          return td;
        };

        const frag = document.createDocumentFragment();

        if (Array.isArray(book.loans) && book.loans.length) {
          book.loans.forEach(({ user_id, loan_date }) => {
            const tr = document.createElement("tr");
            tr.appendChild(createCell(user_id));
            tr.appendChild(createCell(
              new Intl.DateTimeFormat("da-DK").format(new Date(loan_date))
            ));
            frag.appendChild(tr);
          });
        } else {
          const tr = document.createElement("tr");
          tr.appendChild(createCell("No loan history", 2));
          frag.appendChild(tr);
        }

        loanRows.appendChild(frag);
        output.appendChild(clone);
        output.classList.remove("hidden");
      })
      .catch(handleError);
  });
};
