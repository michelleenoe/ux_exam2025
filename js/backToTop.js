export function backToTop() {
  const backToTopButton = document.querySelector("#backToTop");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight) {
      backToTopButton.style.display = "none";
    }
    else if (scrollY > 300) {
      backToTopButton.style.display = "block";
    }
    else {
      backToTopButton.style.display = "none";
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
