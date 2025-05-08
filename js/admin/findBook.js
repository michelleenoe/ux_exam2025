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
        clone.querySelector(".book-author").textContent = `Author: ${book.author}`;
        clone.querySelector(".book-publisher").textContent = `Publisher: ${book.publishing_company}`;
        clone.querySelector(".book-year").textContent = `Year: ${book.publishing_year}`;

        const loanRows = clone.querySelector(".loan-rows");
        if (book.loans?.length) {
          book.loans.forEach((loan) => {
            const row = document.createElement("div");
            row.className = "loan-row";
            row.textContent = `User ID: ${loan.user_id} – ${loan.loan_date}`;
            loanRows.appendChild(row);
          });
        } else {
          const row = document.createElement("div");
          row.className = "loan-row";
          row.textContent = "No loan history";
          loanRows.appendChild(row);
        }

        output.appendChild(clone);
        output.classList.remove("hidden");
      })
      .catch(handleError);
  });
};
