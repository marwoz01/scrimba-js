const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");

fetch("http://www.omdbapi.com/?apikey=42b78cff&t=Inception&y=2010&plot=full")
  .then((response) => response.json())
  .then((data) => console.log(data));

searchBtn.addEventListener("click", searchMovie);

function searchMovie() {
  console.log(searchInput.value);
}
