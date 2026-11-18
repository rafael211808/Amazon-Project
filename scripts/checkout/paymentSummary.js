import {cart, updateCartQuantity, resetCart} from "../../data/cart.js";
import {getProduct} from "../../data/products.js";
import {getDeliveryOption} from "../../data/deliveryOptions.js";
import {formatCurrency} from "../utils/money.js";
import {addOrder} from "../../data/orders.js";

export function renderPaymentSummary () {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (<span class="js-payment-summary-total-items">3</span>):</div>
      <div class="payment-summary-money">
        $${formatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money js-payment-summary-shipping">
        $${formatCurrency(shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-payment-summary-total">
        $${formatCurrency(totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary 
      js-place-order">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;
  updateCartQuantity('js-payment-summary-total-items');

  document.querySelector('.js-place-order')
    .addEventListener('click', async () => {
      try {
        const orderId = crypto.randomUUID ? crypto.randomUUID() : 'order-' + Date.now();
        
        const orderProducts = cart.map((cartItem) => {
          const product = getProduct(cartItem.productId);

          const estimatedDeliveryTime = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString();
          
          return {
            productId: cartItem.productId,
            quantity: cartItem.quantity,
            estimatedDeliveryTime: estimatedDeliveryTime,
            variation: product ? product.name : ''
          };
        });

        const localOrder = {
          id: orderId,
          orderTime: new Date().toISOString(),
          totalCostCents: cart.reduce((total, item) => {
            const p = getProduct(item.productId);
            return total + (p ? p.priceCents * item.quantity : 0);
          }, 0),
          products: orderProducts
        };

        addOrder(localOrder);

      } catch (error) {
        console.log('Unexpected error. Try again later', error);
      }
      
      resetCart();
      window.location.href = 'orders.html';
    });
}
