import { BASE_URL, FALLBACK_IMAGE } from "../info.js";
import { handleError, getHeader, handleAPIError } from "../api.js";

const userId = sessionStorage.getItem("app_user_id");

export const initBookLookup = () => {
  const form = document.querySelector("#frmFindBook");
  const output = document.querySelector("#bookInfo");
  const errorBox = document.querySelector("#error");
  const errorText = document.querySelector("#errorText");
  const template = document.querySelector("#bookTemplate");

  form.addEventListener("submit", e => {
    e.preventDefault();
    errorBox.classList.add("hidden");
    errorText.textContent = "";
    output.classList.add("hidden");
    output.replaceChildren();

    const bookId = form.book_id.value.trim();
    fetch(`${BASE_URL}/admin/${userId}/books/${bookId}`, {
      headers: getHeader()
    })
      .then(handleAPIError)
      .then(book => {
        const clone = template.content.cloneNode(true);
        const img = clone.querySelector(".book_detail_cover");
        img.src = book.cover || FALLBACK_IMAGE;
        img.alt = `Cover for ${book.title}`;
        clone.querySelector(".book_detail_title").textContent = book.title;
        clone.querySelector(
          ".book_detail_author"
        ).textContent = `Author: ${book.author}`;
        clone.querySelector(
          ".book_detail_publisher"
        ).textContent = `Publisher: ${book.publishing_company}`;
        clone.querySelector(
          ".book_detail_year"
        ).textContent = `Year: ${book.publishing_year}`;

        const loanRows = clone.querySelector(".loan-rows");
        loanRows.replaceChildren();

        if (Array.isArray(book.loans) && book.loans.length) {
          const sortedLoans = book.loans
            .slice()
            .sort((a, b) => new Date(b.loan_date) - new Date(a.loan_date));

          sortedLoans.forEach(({ user_id, loan_date }) => {
            const tr = document.createElement("tr");
            const tdUser = document.createElement("td");
            const tdDate = document.createElement("td");

            tdUser.textContent = user_id;
            tdDate.textContent = new Intl.DateTimeFormat("da-DK").format(new Date(loan_date));

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
      })
      .catch(handleError);
  });
};
