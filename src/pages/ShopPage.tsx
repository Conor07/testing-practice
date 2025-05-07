import React, { useState, useEffect } from "react";
import Products, { Product } from "../components/Products";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";

type ShopPageProps = {};

const ShopPage: React.FC<ShopPageProps> = ({}) => {
  const [cart, setCart] = useState<Product[]>([]);

  return (
    <div className="ShopPage">
      <h1>Shop</h1>

      <div className="Body">
        <Products cart={cart} setCart={setCart} />

        <Cart cart={cart} setCart={setCart} />

        <Checkout cart={cart} setCart={setCart} />
      </div>
    </div>
  );
};

export default ShopPage;
