import { BASE_URL, FALLBACK_IMAGE } from "../info.js";
import { handleError, getHeader, handleAPIError } from "../api.js";

const userId = sessionStorage.getItem("app_user_id");

export const initBookLookup = () => {
  const form = document.querySelector("#frmFindBook");
  const output = document.querySelector("#bookInfo");
  const errorBox = document.querySelector("#error");
  const errorText = document.querySelector("#errorText");
  const template = document.querySelector("#bookTemplate");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    errorBox.classList.add("hidden");
    errorText.textContent = "";

    output.classList.add("hidden");
    output.replaceChildren();

    try {
      const bookId = form.book_id.value.trim();
      const res = await fetch(
        `${BASE_URL}/admin/${userId}/books/${bookId}`,
        { headers: getHeader() }
      );
      const book = await handleAPIError(res);

      const clone = template.content.cloneNode(true);

      const img = clone.querySelector(".book-cover");
      img.src = book.cover || FALLBACK_IMAGE;
      img.alt = `Cover for ${book.title}`;
      clone.querySelector(".book-title")
        .textContent = book.title;
      clone.querySelector(".book-author")
        .textContent = `Author: ${book.author}`;
      clone.querySelector(".book-publisher")
        .textContent = `Publisher: ${book.publishing_company}`;
      clone.querySelector(".book-year")
        .textContent = `Year: ${book.publishing_year}`;

      const loanRows = clone.querySelector(".loan-rows");
      loanRows.replaceChildren();

      if (Array.isArray(book.loans) && book.loans.length) {
        book.loans.forEach(({ user_id, loan_date }) => {
          const tr = document.createElement("tr");
          const tdUser = document.createElement("td");
          const tdDate = document.createElement("td");

          tdUser.textContent = user_id;
          tdDate.textContent = new Intl.DateTimeFormat("da-DK")
            .format(new Date(loan_date));

          tr.append(tdUser, tdDate);
          loanRows.appendChild(tr);
        });
      } else {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 2;
        td.textContent = "No loan history";
        tr.appendChild(td);
        loanRows.appendChild(tr);
      }

      output.replaceChildren(clone);
      output.classList.remove("hidden");

    } catch (err) {
      handleError(err);
    }
  });
};
