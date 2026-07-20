import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");

const listElement = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, listElement);

productList.init();

loadHeaderFooter();

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