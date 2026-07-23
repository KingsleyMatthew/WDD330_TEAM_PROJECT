import { getLocalStorage, setLocalStorage } from "./utils.mjs";

let cartItems = getLocalStorage("so-cart") || [];

// Merge duplicate items into one with a quantity
cartItems = cartItems.reduce((acc, item) => {
  const existing = acc.find((i) => i.Id === item.Id);

  if (existing) {
    existing.quantity += item.quantity || 1;
  } else {
    acc.push({
      ...item,
      quantity: item.quantity || 1,
    });
  }

  return acc;
}, []);

setLocalStorage("so-cart", cartItems);

function renderCartContents() {
  const list = document.querySelector(".product-list");

  list.innerHTML = cartItems.map(cartItemTemplate).join("");

  attachEvents();
  updateTotal();
}

function cartItemTemplate(item) {
  return `
<li class="cart-card divider" data-id="${item.Id}">
  <a href="#" class="cart-card__image">
    <img src="${item.Image}" alt="${item.Name}">
  </a>

  <div class="cart-card__details">
    <h2 class="card__name">${item.Name}</h2>

    <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "No Color"}</p>

    <div class="quantity-controls">
      <button class="decrease">-</button>

      <span class="quantity">${item.quantity}</span>

      <button class="increase">+</button>
    </div>

    <p class="cart-card__price">
      $${(item.FinalPrice * item.quantity).toFixed(2)}
    </p>
  </div>
</li>
`;
}

function attachEvents() {
  document.querySelectorAll(".increase").forEach((button) => {
    button.addEventListener("click", increaseQuantity);
  });

  document.querySelectorAll(".decrease").forEach((button) => {
    button.addEventListener("click", decreaseQuantity);
  });
}

function increaseQuantity(e) {
  const id = e.target.closest(".cart-card").dataset.id;

  const item = cartItems.find((i) => i.Id === id);

  if (!item) return;

  item.quantity++;

  saveAndRender();
}

function decreaseQuantity(e) {
  const id = e.target.closest(".cart-card").dataset.id;

  const index = cartItems.findIndex((i) => i.Id === id);

  if (index === -1) return;

  cartItems[index].quantity--;

  if (cartItems[index].quantity <= 0) {
    cartItems.splice(index, 1);
  }

  saveAndRender();
}

function updateTotal() {
  const total = cartItems.reduce(
    (sum, item) => sum + item.FinalPrice * item.quantity,
    0
  );

  let totalElement = document.querySelector(".cart-total");

  if (!totalElement) {
    totalElement = document.createElement("h3");
    totalElement.className = "cart-total";

    document.querySelector(".products").appendChild(totalElement);
  }

  totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

function saveAndRender() {
  setLocalStorage("so-cart", cartItems);

  renderCartContents();
}

renderCartContents();
