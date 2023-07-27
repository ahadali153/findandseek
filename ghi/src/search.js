function executeSearch() {
  const searchQuery = document.getElementById("searchInput").value.trim();

  if (searchQuery === "") {
    alert("Please enter a valid search.");
    return;
  }

  const mockSearchResults = [
    "Result 1: This is the first search result.",
    "Result 2: Another result.",
  ];

  displaySearchResults(mockSearchResults);
}

function displaySearchResults(results) {
  const searchResultsDiv = document.getElementById("searchResults");
  searchResultsDiv.innerHTML = "";

  if (results.length === 0) {
    searchResultsDiv.innerHTML = "No results found.";
  } else {
    for (let i = 0; i < results.length; i++) {
      const resultDiv = document.createElement("div");
      resultDiv.textContent = results[i];
      searchResultsDiv.appendChild(resultDiv);
    }
  }
}
