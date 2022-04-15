/** add event listener for ctrl / cmd + k to focus on search input and not on address bar */
document.addEventListener("keydown", function (e) {
  if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    const searchInput = document.getElementById("search-query");
    searchInput.focus();
  }
});
