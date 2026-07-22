import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");

const title = document.querySelector(".product-list-title");

if (title) {
  title.textContent = `Top Products: ${category}`;
}

const dataSource = new ExternalServices();

const listElement = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, listElement);

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