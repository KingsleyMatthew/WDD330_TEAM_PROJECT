import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
        this.externalServices = new ExternalServices();
    }

    init() {
        this.list = getLocalStorage(this.key) || [];
        this.calculateItemSubtotal();
        this.calculateOrderTotal();
    }

    calculateItemSubtotal() {
        this.itemTotal = this.list.reduce(
            (sum, item) => {
                return sum + (item.FinalPrice * (item.quantity || 1));
            }, 
            0
        );

        const subtotal = document.querySelector(
            `${this.outputSelector} #subtotal`
        );

        subtotal.innerText = `$${this.itemTotal.toFixed(2)}`;
    }

    packageItems(items) {
        return items.map((item) => ({
            id: item.Id,
            name: item.Name,
            price: item.FinalPrice,
            quantity: item.quantity || 1
        }));
    }

    calculateOrderTotal() {
        this.tax = this.itemTotal * 0.06;

        this.shipping = 10 + (this.list.length - 1) * 2;

        this.orderTotal = this.itemTotal + this.tax + this.shipping;

        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const tax = document.querySelector(
            `${this.outputSelector} #tax`
        );

        const shipping = document.querySelector(
            `${this.outputSelector} #shipping`
        );

        const orderTotal = document.querySelector(
            `${this.outputSelector} #order-total`
        );

        tax.innerText = `$${this.tax.toFixed(2)}`;
        shipping.innerText = `$${this.shipping.toFixed(2)}`;
        orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
    }

    async checkout(form) {
        try {
            const formData = new FormData(form);
            const order = Object.fromEntries(formData);

            order.orderDate = new Date().toISOString();
            order.items = this.packageItems(this.list);
            order.orderTotal = this.orderTotal.toFixed(2);
            order.shipping = this.shipping;
            order.tax = this.tax.toFixed(2);

            console.log("Final Order:", order);

            return await this.externalServices.checkout(order);
        } catch (err) {
            console.error("Checkout error:", err);
            throw err;
        }
    }
}