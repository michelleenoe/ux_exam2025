export function checkLoginStatus(expectedUserId, redirectPage) {
    const userId = sessionStorage.getItem("userId");
    if (userId != expectedUserId) {
        alert("You must be authorized to access this page.");
        window.location.href = redirectPage;
    }
}

export function setCoverImage(imgEl, src, title) {
  imgEl.src = FALLBACK_IMAGE;
  imgEl.alt = `Loading cover for ${title}...`;

  if (!src) return;

  const testImg = new Image();
  testImg.onload = () => {
    imgEl.src = src;
    imgEl.alt = `Cover of ${title}`;
  };
  testImg.src = src;
}
