const container = document.getElementById("movies-list");

const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

if (watchlist.length === 0) {
  container.innerHTML = "<p>Your watchlist is empty.</p>";
} else {
  watchlist.forEach((movie) => {
    container.innerHTML += `
      <div class="movie">
        <img src="${movie.Poster}" />
        <div class="movie-info">
          <div class="title-rating">
            <h3>${movie.Title}</h3>
            <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
            <span class="rating">${movie.imdbRating}</span>
          </div>
          <div class="details">
            <span>${movie.Runtime}</span>
            <span>${movie.Genre}</span>
            <i class="fa-solid fa-circle-minus remove-from-watchlist" data-id="${movie.imdbID}"></i>
            <span>Remove</span>
          </div>
          <p class="description">${movie.Plot}</p>
        </div>
      </div>
    `;
  });
}
