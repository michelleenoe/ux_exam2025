import { fetchData } from "./fetchData.js";
import { renderBooksByAuthor } from "./books.js";

export function initFilterBooks() {
  const filterBtn = document.querySelector(".filter_btn");
  const filterPanel = document.getElementById("filter_panel");
  const filterOverlay = document.getElementById("filter_overlay");
  const closeFilter = document.getElementById("close_filter");
  const authorSelect = document.getElementById("author_select");
  const filterForm = document.getElementById("filter_form");
  const activeWrapper = document.getElementById("active_filter_wrapper");
  const activeLabel = document.getElementById("active_filter_label");
  const clearBtn = document.getElementById("clear_filter");

  const togglePanel = (show) => {
    filterPanel.classList.toggle("visible", show);
    filterPanel.classList.toggle("hidden", !show);
    filterOverlay.classList.toggle("hidden", !show);
  };

  filterBtn?.addEventListener("click", () => togglePanel(true));
  closeFilter?.addEventListener("click", () => togglePanel(false));
  filterOverlay?.addEventListener("click", () => togglePanel(false));

  filterForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    togglePanel(false);
    const id = authorSelect.value;

    const books = await renderBooksByAuthor(id);
    if (id) {
      const label = authorSelect.selectedOptions[0].text;
      activeLabel.textContent = `${label} (${books.length})`;
      activeWrapper.classList.remove("hidden");
      document.getElementById("breadcrumb_current").textContent = `Books by ${label}`;
    } else {
      activeWrapper.classList.add("hidden");
      document.getElementById("breadcrumb_current").textContent = "Browse Books";
    }
  });

  clearBtn?.addEventListener("click", async () => {
    authorSelect.value = "";
    activeWrapper.classList.add("hidden");
    document.getElementById("breadcrumb_current").textContent = "Browse Books";
    await renderBooksByAuthor();
  });

  fetchData("http://localhost:8080/authors")
    .then((authors) =>
      authors.forEach((a) => {
        const opt = new Option(a.author_name, a.author_id);
        authorSelect.appendChild(opt);
      })
    )
    .catch((err) => console.error("Error loading authors:", err));
}