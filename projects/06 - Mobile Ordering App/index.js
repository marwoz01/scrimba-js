import { menuArray } from "./data.js";

const order = document.getElementById("order");

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
            <button class="card-btn" data-id="${menuItem.id}">+</button>
        </div>
    </section>
    `;
  })
  .join("");

document.getElementById("container").innerHTML = menu;

const buttons = document.querySelectorAll(".card-btn");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const id = button.dataset.id;
    const item = menuArray.find((item) => item.id == id);

    addToOrder(item);
  });
});

let orderArr = [];

function addToOrder(item) {
  orderArr.push(item);

  order.style.display = "block";

  const orderItems = document.getElementById("order-items");
  orderItems.insertAdjacentHTML(
    "beforeend",
    `
    <div class="item" data-id="${item.id}">
      <h2>${item.name} <button class="remove-btn">remove</button></h2>
      <p>$${item.price}</p>
    </div>
  `
  );

  const total = orderArr.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("order-total").textContent = `$${total}`;
}

document.getElementById("order-items").addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-btn")) {
    const itemDiv = e.target.closest(".item");
    const id = itemDiv.dataset.id;
    itemDiv.remove();

    orderArr = orderArr.filter((item) => item.id != id);

    const total = orderArr.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("order-total").textContent = `$${total}`;

    if (orderArr.length === 0) {
      order.style.display = "none";
    }
  }
});
