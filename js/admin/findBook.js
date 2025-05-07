import { BASE_URL } from "../info.js";
import { handleError, getHeader } from "../api.js";
import { FALLBACK_IMAGE } from "../info.js";


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
      .then((res) => {
        if (!res.ok) throw new Error("Book not found or unauthorized.");
        return res.json();
      })
      .then((book) => {
        output.classList.remove("hidden");

        const img = document.createElement("img");
        img.src = book.cover || FALLBACK_IMAGE;
        img.alt = `Cover for ${book.title}`;

        const details = document.createElement("div");
        details.className = "book-details";

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = `Author: ${book.author}`;

        const publisher = document.createElement("p");
        publisher.textContent = `Publisher: ${book.publishing_company}`;

        const year = document.createElement("p");
        year.textContent = `Year: ${book.publishing_year}`;

        details.append(title, author, publisher, year);

        const historyWrapper = document.createElement("div");
        historyWrapper.className = "loan-history";

        const historyTitle = document.createElement("h4");
        historyTitle.textContent = "Loan History:";

        historyWrapper.appendChild(historyTitle);

        if (book.loans?.length) {
          book.loans.forEach((loan) => {
            const row = document.createElement("div");
            row.className = "loan-row";
            row.textContent = `User ID: ${loan.user_id} – ${loan.loan_date}`;
            historyWrapper.appendChild(row);
          });
        } else {
          const noHistory = document.createElement("div");
          noHistory.className = "loan-row";
          noHistory.textContent = "No loan history";
          historyWrapper.appendChild(noHistory);
        }

        details.appendChild(historyWrapper);
        output.append(img, details);
      })
      .catch((err) => {
        output.classList.add("hidden");
        output.innerHTML = "";
        handleError(err.message);
      });
  });
};
