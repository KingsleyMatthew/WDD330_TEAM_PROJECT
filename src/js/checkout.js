import { loadHeaderFooter, alertMessage } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess(
    "so-cart",
    ".order-summary"
);

checkout.init();

document.querySelector("#zip").addEventListener("change", () => {
    checkout.calculateOrderTotal();
});

document
    .querySelector("#checkout-form")
    .addEventListener("submit", async (event) => {
        event.preventDefault();

        try {
            const response = await checkout.checkout(event.target);

            localStorage.removeItem("so-cart");

            window.location.href = "/checkout/success.html";
        } catch (error) {
            console.error("Checkout error:", error);

            const message =
                error.message?.message ||
                "There was an error processing your order. Please check your information and try again.";

            alertMessage(message);
        }
    });
