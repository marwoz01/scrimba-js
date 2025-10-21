const container = document.getElementById("movies-list");

const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

if (watchlist.length === 0) {
  container.innerHTML = "<p>Your watchlist is empty.</p>";
} else {
  watchlist.forEach((movie) => {
    container.innerHTML += `
        <div class="movie" data-id="${movie.imdbID}">
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
                <i class="fa-solid fa-circle-minus remove-btn" data-id="${movie.imdbID}" style="cursor: pointer;"></i>
                <span>Remove</span>
            </div>
            <p class="description">${movie.Plot}</p>
            </div>
        </div>
        `;
  });
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", handleRemove);
  });
}

function handleRemove(e) {
  const imdbID = e.currentTarget.dataset.id;

  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  const updatedList = watchlist.filter((movie) => movie.imdbID !== imdbID);

  localStorage.setItem("watchlist", JSON.stringify(updatedList));

  e.currentTarget.closest(".movie").remove();

  const container = document.getElementById("movies-list");
  if (updatedList.length === 0) {
    container.innerHTML = "<p>Your watchlist is now empty.</p>";
  }
}
