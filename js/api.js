export const handleError = (data) => {
  let msg = "Something went wrong. Please try again.";

  if (typeof data === "string") {
    msg = data;
  }

  if (data?.error) {
    const err = data.error.toLowerCase();

    if (err.includes("wrong credentials")) {
      msg = "The email or password is incorrect.";
    } else if (err.includes("the user already exists")) {
      msg = "This email is already registered.";
    } else if (err.includes("incorrect password format")) {
      msg = "Your password doesn't meet the required format.";
    } else if (err.includes("missing authentication token")) {
      msg = "You need to be logged in to perform this action.";
    } else if (err.includes("invalid authentication token")) {
      msg = "Your session has expired. Please log in again.";
    } else if (err.includes("this user has still this book on loan")) {
      msg = "You must return the book before borrowing it again.";
    } else if (err.includes("the author does not exist")) {
      msg = "Please choose a valid author.";
    } else if (err.includes("the publishing company does not exist")) {
      msg = "Please choose a valid publisher.";
    } else if (err.includes("the author already exists")) {
      msg = "That author is already in the system.";
    } else if (err.includes("the publisher already exists")) {
      msg = "That publisher is already in the system.";
    } else if (err.includes("book not found")) {
      msg = "The book you're looking for does not exist.";
    } else if (err.includes("missing") || err.includes("required")) {
      msg = "Please fill out all fields correctly.";
    } else {
      msg = data.error;
    }
  }

  const errorBox  = document.querySelector("#error");
  const errorText = document.querySelector("#errorText");
  document.querySelector("#errorText").innerText = msg;
  errorBox.classList.remove("hidden");
  errorBox.scrollIntoView({ behavior: "smooth", block: "start" });
  const hideError = () => {
    errorBox.classList.add("hidden");
    errorText.innerText = "";
    document.removeEventListener("click", hideError);
  };
  document.addEventListener("click", hideError);
};

export const getHeader = () =>
  new Headers({
    "X-Session-Token": sessionStorage.getItem("app_user_token"),
  });

export const handleAPIError = async (res) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw errorData.error ? errorData : new Error("Unexpected server error");
  }
  return res.json();
};
