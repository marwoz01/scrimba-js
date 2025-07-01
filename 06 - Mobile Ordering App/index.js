import { menuArray } from "./data.js";

const menu = menuArray
  .map(function (menuItem) {
    return `
    <section class="card">
        <div class="card-start">
            <p>${menuItem.emoji}</p>
        </div>
            <div class="card-mid">
                <h4 class="card-title">${menuItem.name}</h4>
                <p class="card-ingredients">${menuItem.ingredients}</p>
                <h4 class="card-price">$${menuItem.price}</h4>
            </div>
        <div class="card-end">
            <button class="card-btn" id="card-btn">+</button>
        </div>
    </section>
    `;
  })
  .join("");

document.getElementById("container").innerHTML = menu;

const cardBtn = document.getElementById("card-btn");
cardBtn.addEventListener("click", function () {
  return `
    `;
});
