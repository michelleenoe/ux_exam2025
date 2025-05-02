import { burgerMenu } from "./nav.js";
import { utilityLog } from "./utilityLog.js";
import { initLogout } from "./logout.js";
import { fetchBooks } from "./books.js";
import { initFilterBooks } from "./filterBooks.js";


// import { signupForm } from "./signup.js";

burgerMenu();
utilityLog();
initLogout();

if (window.location.pathname.includes("books.html")) {
  fetchBooks();
  initFilterBooks();
}

// signupForm("");