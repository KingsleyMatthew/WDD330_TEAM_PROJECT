import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {

  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
  const cartItems = getLocalStorage("so-cart") || [];

  // Check if the product is already in the cart
  const existingProduct = cartItems.find(
    (item) => item.Id === this.product.Id
  );

  if (existingProduct) {
    // Increase quantity if it already exists
    existingProduct.quantity = (existingProduct.quantity || 1) + 1;
  } else {
    // Add new product with quantity = 1
    const productToAdd = {
      ...this.product,
      quantity: 1,
    };

    cartItems.push(productToAdd);
  }

  setLocalStorage("so-cart", cartItems);

  alert("Product added to cart!");
}

  renderProductDetails() {
    const product = this.product;

    const productSection = document.querySelector(".product-detail");

    productSection.innerHTML = `
      <h3>${product.Brand.Name}</h3>

      <h2 class="divider">${product.NameWithoutBrand}</h2>

      <img
        class="divider"
        src="${product.Images.PrimaryLarge}"
        alt="${product.Name}"
      >

      <p class="product-card__price">$${product.FinalPrice}</p>

      <p class="product__color">${product.Colors[0].ColorName}</p>

      <p class="product__description">
        ${product.DescriptionHtmlSimple}
      </p>

      <div class="product-detail__add">
        <button id="addToCart">Add to Cart</button>
      </div>
    `;
  }
}