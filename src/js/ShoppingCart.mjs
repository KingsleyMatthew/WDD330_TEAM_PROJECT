import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default class ShoppingCart {
    constructor(listElement, template) {
        this.listElement = listElement;
        this.template = template;
        this.cart = [];
    }

    init() {
        this.cart = getLocalStorage("so-cart") || [];

        this.renderCart();
    }

    renderCart() {
        renderListWithTemplate(
            this.template,
            this.listElement,
            this.cart
        );
    }
}