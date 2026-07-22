import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import ExternalServices from "./ExternalServices.mjs";

const dataSource = new ExternalServices();

const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();

loadHeaderFooter();


