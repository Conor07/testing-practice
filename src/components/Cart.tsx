import React from "react";
import { Product } from "./Products";

type CartProps = {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
};

const Cart: React.FC<CartProps> = ({ cart, setCart }) => {
  return (
    <div className="CartContainer">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p data-testid="empty-cart">Your cart is empty</p>
      ) : (
        <ul data-testid="cart-list">
          {cart.map((item, index) => (
            <li key={index} data-testid={`cart-item-${index}`}>
              <p>
                {item.name} - £{item.price.toFixed(2)}
              </p>

              <button
                onClick={() => {
                  setCart((prevCart) =>
                    prevCart.filter((cartItem) => cartItem.id !== item.id)
                  );
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
