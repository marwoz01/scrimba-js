const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const startScreen = document.getElementById("start-screen");
const moviesList = document.getElementById("movies-list");
const watchList = document.getElementById("watchlist");

searchBtn.addEventListener("click", searchMovie);

function searchMovie() {
  const query = searchInput.value.trim();

  if (!query) return;

  fetch(`https://www.omdbapi.com/?apikey=42b78cff&s=${query}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.Response === "False") {
        moviesList.innerHTML = `<p>Film not found.</p>`;
        return;
      }
      displayMoviesList(data.Search);
    });

  startScreen.style.display = "none";
}

function displayMoviesList(movies) {
  moviesList.innerHTML = "";

  movies.forEach((movie) => {
    fetch(
      `https://www.omdbapi.com/?apikey=42b78cff&i=${movie.imdbID}&plot=short`
    )
      .then((res) => res.json())
      .then((fullData) => {
        moviesList.innerHTML += `
          <div class="movie">
            <img src="${fullData.Poster}" />
            <div class="movie-info">
              <div class="title-rating">
                <h3>${fullData.Title}</h3>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <span class="rating">${fullData.imdbRating}</span>
              </div>
              <div class="details">
                <span>${fullData.Runtime}</span>
                <span>${fullData.Genre}</span>
                <i class="fa-solid fa-circle-plus add-to-watchlist" data-id="${fullData.imdbID}"></i>
                <span class="watchlist-text" data-id="${fullData.imdbID}">Watchlist</span>
              </div>
              <p class="description">
                ${fullData.Plot}
              </p>
            </div>
          </div>
        `;
        document
          .querySelectorAll(".add-to-watchlist, .watchlist-text")
          .forEach((btn) => {
            btn.addEventListener("click", handleAddToWatchlist);
          });
      });
  });

  startScreen.style.display = "none";
}

function addToWatchList(movie) {
  const watchList = JSON.parse(localStorage.getItem("watchlist")) || [];
  watchList.push(movie);
  localStorage.setItem("watchlist", JSON.stringify(watchList));
}

function handleAddToWatchlist(e) {
  const imdbID = e.currentTarget.dataset.id;
  const storedList = JSON.parse(localStorage.getItem("watchlist")) || [];

  fetch(`https://www.omdbapi.com/?apikey=42b78cff&i=${imdbID}`)
    .then((res) => res.json())
    .then((movie) => {
      const alreadyExists = storedList.some(
        (item) => item.imdbID === movie.imdbID
      );

      if (!alreadyExists) {
        storedList.push(movie);
        localStorage.setItem("watchlist", JSON.stringify(storedList));
        alert(`Dodano "${movie.Title}" do Watchlisty`);
      } else {
        alert("Ten film już jest na liście.");
      }
    });
}
