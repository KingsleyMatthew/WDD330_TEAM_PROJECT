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

        if (this.cart.length > 0) {
            const cartFooter = document.querySelector(".cart-footer");
            cartFooter.classList.remove("hide");

            const total = this.cart.reduce(
                (sum, item) => sum + item.FinalPrice,
                0
            );

            cartFooter.querySelector(".cart-total").innerHTML = `Total: $${total.toFixed(2)}`;
        }
    }
}