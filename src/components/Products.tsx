import React, { useEffect, useState } from "react";

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
};

type ProductsProps = {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
};

const testProducts: Product[] = [
  {
    id: 1,
    name: "Product 1",
    price: 10.0,
    description: "Description for Product 1",
  },
  {
    id: 2,
    name: "Product 2",
    price: 20.0,
    description: "Description for Product 2",
  },
  {
    id: 3,
    name: "Product 3",
    price: 30.0,
    description: "Description for Product 3",
  },
];

const Products: React.FC<ProductsProps> = ({ cart, setCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate an API call to fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProducts(testProducts);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="ProductsContainer">
      {loading && (
        <p className="Loading" data-testid="loading-products">
          Loading products...
        </p>
      )}

      {error && <p className="Error">{error}</p>}

      {!loading && !error && (
        <div className="Products">
          <ul className="ProductList" data-testid="product-list">
            {products.map((product) => {
              const isInCart = cart.some((item) => item.id === product.id);
              return (
                <li
                  className="Product"
                  key={product.id}
                  data-testid="product-item"
                >
                  <h3>{product.name ?? "-"}</h3>

                  <p>{product.description ?? "-"}</p>

                  <p className="Price">
                    {typeof product.price === "number"
                      ? `£${product.price.toFixed(2)}`
                      : "£-"}
                  </p>

                  <button
                    className={isInCart ? "Remove" : "Add"}
                    onClick={() => {
                      if (isInCart) {
                        setCart((prevCart) =>
                          prevCart.filter((item) => item.id !== product.id)
                        );
                      } else {
                        // Add to cart
                        setCart((prevCart) => [...prevCart, product]);
                      }
                    }}
                  >
                    {isInCart ? "Remove from Cart" : "Add to Cart"}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Products;
