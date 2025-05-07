import React, { useEffect } from "react";
import { Product } from "./Products";

type CheckoutProps = {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
};

const Checkout: React.FC<CheckoutProps> = ({ cart, setCart }) => {
  const [checkoutSuccess, setCheckoutSuccess] = React.useState(false);
  const [checkoutError, setCheckoutError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleCheckout = () => {
    if (cart.length > 0 && !loading) {
      setLoading(true);
      setCheckoutSuccess(true);

      const timer = setTimeout(() => {
        setCheckoutSuccess(false);
        setLoading(false);
        setCart([]);
      }, 3000); // Reset success message after 3 seconds
      return () => clearTimeout(timer);
    }
  };

  return (
    <div className="CheckoutContainer">
      <h2>Checkout</h2>

      {checkoutSuccess && !checkoutError && (
        <p data-testid="checkout-success">Checkout successful!</p>
      )}

      <p data-testid="checkout-total-price">
        Total: £{cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
      </p>

      <button
        disabled={cart.length === 0 || loading || checkoutError}
        onClick={handleCheckout}
      >
        Checkout
      </button>
    </div>
  );
};

export default Checkout;
