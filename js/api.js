export const handleError = (error) => {
  document.querySelector("#errorText").innerText = error;
  document.querySelector("#error").classList.remove("hidden");
};

export const header = new Headers({
  "X-Session-Token": sessionStorage.getItem("auth_token"),
});

export const handleFetchCatchError = (error) => {
  const errorSection = document.createElement("section");
  errorSection.innerHTML = `
        <header>    
            <h3>Error</h3>
        </header>
        <p>Dear user, we are truly sorry to inform that there was an error while retrieving the data</p>
        <p class="error">${error}</p>
    `;
  document.querySelector("main").append(errorSection);
};

export const handleAPIError = async (response) => {
  if (response.ok) {
    return await response.json();
  }

  const errorData = await response.json().catch(() => ({}));
  const message = errorData?.error || "Unexpected API error";

  throw new Error(message);  // This will be caught by your catch()
};
