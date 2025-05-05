import { BASE_URL } from "../info.js";
import { handleError, getHeader } from "../api.js";
import { FALLBACK_IMAGE } from "../info.js";


const userId = sessionStorage.getItem("app_user_id");

export const initBookLookup = () => {
  const form = document.querySelector("#frmFindBook");
  const output = document.querySelector("#bookInfo");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Clear tidligere indhold og tidligere fejlbeskeder
    output.classList.add("hidden");
    output.innerHTML = "";
    document.querySelector("#error").classList.add("hidden");
    document.querySelector("#errorText").innerText = "";

    const bookId = form.book_id.value.trim();

    fetch(`${BASE_URL}/admin/${userId}/books/${bookId}`, {
      headers: getHeader(),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Book not found or unauthorized.");
        return res.json();
      })
      .then((book) => {
        output.classList.remove("hidden");

        const loanMarkup = book.loans?.length
          ? book.loans.map(loan => `
              <div class="loan-row">User ID: ${loan.user_id} – ${loan.loan_date}</div>
            `).join("")
          : `<div class="loan-row">No loan history</div>`;

        output.innerHTML = `
        <img src="${book.cover || FALLBACK_IMAGE}" alt="Cover for ${book.title}">
          <div class="book-details">
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Publisher: ${book.publishing_company}</p>
            <p>Year: ${book.publishing_year}</p>
            <div class="loan-history">
              <h4>Loan History:</h4>
              ${loanMarkup}
            </div>
          </div>
        `;
      })
      .catch((err) => {
        output.classList.add("hidden");
        output.innerHTML = "";
        handleError(err.message);
      });
  });
};
