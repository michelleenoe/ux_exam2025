export const handleError = (error) => {
  document.querySelector("#errorText").innerText = error;
  document.querySelector("#error").classList.remove("hidden");
};

export const header = new Headers({
  "X-Session-Token": sessionStorage.getItem("auth_token"),
});

export const handleAPIError = async (response) => {
  if (response.ok) {
    return await response.json();
  }

  const errorData = await response.json().catch(() => ({}));
  const message = errorData?.error || "Unexpected API error";

  throw new Error(message);  
};
