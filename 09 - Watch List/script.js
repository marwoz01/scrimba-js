const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const startScreen = document.getElementById("start-screen");
const moviesList = document.getElementById("movies-list");

fetch("http://www.omdbapi.com/?apikey=42b78cff&t=Inception&y=2010&plot=full")
  .then((response) => response.json())
  .then((data) => console.log(data));

searchBtn.addEventListener("click", searchMovie);

function searchMovie() {
  displayMovie();
  console.log(searchInput.value);
}

function displayMovie() {
  moviesList.innerHTML += `
    
  `;

  startScreen.style.display = "none";
}
