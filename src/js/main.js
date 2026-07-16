import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");

const listElement = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, listElement);

productList.init();

const searchForm = document.querySelector(".search-form");

if (searchForm) {
  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const searchTerm = document
      .querySelector("#search")
      .value
      .trim();

    await productList.init(searchTerm);
  });
}