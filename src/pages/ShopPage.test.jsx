import ShopPage from "./ShopPage";

import { render, screen , act} from "@testing-library/react";
import { test, jest } from "@jest/globals";

test("shop heading should be rendered", () => {
    render(<ShopPage />);

    const shopHeaderElement = screen.getByRole("heading", {
        name: /shop/i,
    });

    expect(shopHeaderElement).toBeInTheDocument();
})

test("cart should be empty initially", () => {
    render(<ShopPage />);

    const emptyCartElement = screen.getByTestId("empty-cart");

    const cartListElement = screen.queryByTestId("cart-list");

    expect(emptyCartElement).toBeInTheDocument();
    
    expect(cartListElement).not.toBeInTheDocument();
}
)

test("checkout button should be disabled initially", () => {
    render(<ShopPage />);

    const checkoutButtonElement = screen.getByRole("button", {
        name: /checkout/i,
    });

    expect(checkoutButtonElement).toBeDisabled();
})

test("shop products should be loading initially", async () => {
    render(<ShopPage />);

    const productsElement = await screen.findByTestId("loading-products");
    const productsListElement = screen.queryByTestId("product-list");

    expect(productsElement).toBeInTheDocument();
    expect(productsListElement).not.toBeInTheDocument();

});

test("shop products should be loaded", async () => {
    jest.useFakeTimers(); // Enable Jest's fake timers

    render(<ShopPage />);
    
    await act(async() => {
        // Simulate the passage of time until the products are loaded
        jest.runAllTimers();
    });

    const productsElement = screen.getByTestId("product-list");
    expect(productsElement).toBeInTheDocument();

    const loadingProductsElement = screen.queryByTestId("loading-products");
    expect(loadingProductsElement).not.toBeInTheDocument();
});

test("at least 1 product should be rendered", async () => {
    jest.useFakeTimers(); // Enable Jest's fake timers

    render(<ShopPage />);
    
    await act(async() => {
        // Simulate the passage of time until the products are loaded
        jest.runAllTimers();
    });

    const productsElement = screen.getByTestId("product-list");
  

    expect(productsElement).toBeInTheDocument();

    // Check list contains at least 1 product
    const productListElement = screen.getAllByTestId("product-item");

    expect(productListElement.length).toBeGreaterThan(0);
});

test("a product should be added to the cart when add to cart button is clicked", async () => { 
    jest.useFakeTimers(); // Enable Jest's fake timers

    render(<ShopPage />);
    
    await act(async() => {
        // Simulate the passage of time until the products are loaded
        jest.runAllTimers();
    });

    // Get the first product item
    const productListElement = screen.getAllByTestId("product-item");
    const firstProductElement = productListElement[0];
        expect(firstProductElement).toHaveTextContent(/product 1/i);

    const addToCartButtonElement = firstProductElement.querySelector("button");
    expect(addToCartButtonElement).toBeInTheDocument();
    // Check if the button is enabled
    expect(addToCartButtonElement).not.toBeDisabled();


    // Click the add to cart button
    await act(async () => {
        addToCartButtonElement.click();
    });

    const cartListElement = screen.getByTestId("cart-list");
    expect(cartListElement).toBeInTheDocument();

    // Check item is added to the cart
    const cartItemElement = screen.getByTestId("cart-item-0");
    expect(cartItemElement).toBeInTheDocument();
    expect(cartItemElement).toHaveTextContent(/product 1/i);

});





test("cart remove from cart button works", async () => {
    jest.useFakeTimers(); // Enable Jest's fake timers

    render(<ShopPage />);
    
    await act(async() => {
        // Simulate the passage of time until the products are loaded
        jest.runAllTimers();
    });

    // Get the first product item
    const productListElement = screen.getAllByTestId("product-item");
    const firstProductElement = productListElement[0];
        expect(firstProductElement).toHaveTextContent(/product 1/i);

    const addToCartButtonElement = firstProductElement.querySelector("button");
    expect(addToCartButtonElement).toBeInTheDocument();
    // Check if the button is enabled
    expect(addToCartButtonElement).not.toBeDisabled();

    // Click the add to cart button
    await act(async () => {
        addToCartButtonElement.click();
    });
    const cartListElement = screen.getByTestId("cart-list");
    expect(cartListElement).toBeInTheDocument();
    // Check item is added to the cart
    const cartItemElement = screen.getByTestId("cart-item-0");
    expect(cartItemElement).toBeInTheDocument();
    expect(cartItemElement).toHaveTextContent(/product 1/i);

    // Get remove button from within cartItemElement
    const removeButtonElement = cartItemElement.querySelector("button");
    expect(removeButtonElement).toBeInTheDocument();
    // Check if the button is enabled
    expect(removeButtonElement).not.toBeDisabled();

    // Click the remove from cart button
    await act(async () => {
        removeButtonElement.click();
    });

    // Check item is removed from the cart
    const cartItemElement2 = screen.queryByTestId("cart-item-0");
    expect(cartItemElement2).not.toBeInTheDocument();
    const emptyCartElement = screen.getByTestId("empty-cart");
    expect(emptyCartElement).toBeInTheDocument();
    const cartListElement2 = screen.queryByTestId("cart-list");
    expect(cartListElement2).not.toBeInTheDocument();
});

test("checkout button should be enabled when there is at least 1 item in the cart", async () => { 
    jest.useFakeTimers(); // Enable Jest's fake timers

    render(<ShopPage />);
    
    await act(async() => {
        // Simulate the passage of time until the products are loaded
        jest.runAllTimers();
    });

    // Get the first product item
    const productListElement = screen.getAllByTestId("product-item");
    const firstProductElement = productListElement[0];
        expect(firstProductElement).toHaveTextContent(/Product 1/i);

    const addToCartButtonElement = firstProductElement.querySelector("button");
    expect(addToCartButtonElement).toBeInTheDocument();
    // Check if the button is enabled
    expect(addToCartButtonElement).not.toBeDisabled();


    // Click the add to cart button
    await act(async () => {
        addToCartButtonElement.click();
    });

    const cartListElement = screen.getByTestId("cart-list");
    expect(cartListElement).toBeInTheDocument();

    // Check item is added to the cart
    const cartItemElement = screen.getByTestId("cart-item-0");
    expect(cartItemElement).toBeInTheDocument();
    expect(cartItemElement).toHaveTextContent(/Product 1/i);

    const checkoutButtonElement = screen.getByRole("button", {
        name: /checkout/i,
    });
    expect(checkoutButtonElement).toBeInTheDocument();

    // Check if the button is enabled
    expect(checkoutButtonElement).not.toBeDisabled();

});

test("checkout button should be disabled when there are no items in the cart", async () => { 
    jest.useFakeTimers(); // Enable Jest's fake timers

    render(<ShopPage />);
    
    await act(async() => {
        // Simulate the passage of time until the products are loaded
        jest.runAllTimers();
    });

    const checkoutButtonElement = screen.getByRole("button", {
        name: /checkout/i,
    });
    expect(checkoutButtonElement).toBeInTheDocument();

    // Check if the button is disabled
    expect(checkoutButtonElement).toBeDisabled();

});


test("checkout total price should be correct", async () => {
    jest.useFakeTimers(); // Enable Jest's fake timers

    render(<ShopPage />);
    
    await act(async() => {
        // Simulate the passage of time until the products are loaded
        jest.runAllTimers();
    });

    // Get the first product item
    const productListElement = screen.getAllByTestId("product-item");
    const firstProductElement = productListElement[0];
        expect(firstProductElement).toHaveTextContent(/Product 1/i);

    const productPriceElement = firstProductElement.querySelector(".Price");
    expect(productPriceElement).toBeInTheDocument();
    // Check price is correct
    expect(productPriceElement).toHaveTextContent(/£10.00/i);

    const addToCartButtonElement = firstProductElement.querySelector("button");

    expect(addToCartButtonElement).toBeInTheDocument();
    // Check if the button is enabled
    expect(addToCartButtonElement).not.toBeDisabled();
    // Click the add to cart button
    await act(async () => {
        addToCartButtonElement.click();
    });

    const secondProductElement = productListElement[1];
    expect(secondProductElement).toHaveTextContent(/Product 2/i);

    // Check price is correct
    const productPriceElement2 = secondProductElement.querySelector(".Price");
    expect(productPriceElement2).toBeInTheDocument();
    expect(productPriceElement2).toHaveTextContent(/£20.00/i);

    const addToCartButtonElement2 = secondProductElement.querySelector("button");
    expect(addToCartButtonElement2).toBeInTheDocument();
    
    // Check if the button is enabled
    expect(addToCartButtonElement2).not.toBeDisabled();
    // Click the add to cart button
    await act(async () => {
        addToCartButtonElement2.click();
    });

    const cartListElement = screen.getByTestId("cart-list");
    expect(cartListElement).toBeInTheDocument();
    // Check item is added to the cart
    const cartItemElement = screen.getByTestId("cart-item-0");
    expect(cartItemElement).toBeInTheDocument();
    expect(cartItemElement).toHaveTextContent(/Product 1/i);


    const cartItemElement2 = screen.getByTestId("cart-item-1");
    expect(cartItemElement2).toBeInTheDocument();
    expect(cartItemElement2).toHaveTextContent(/Product 2/i);

    const checkoutTotalPriceElement = screen.getByTestId("checkout-total-price");
    expect(checkoutTotalPriceElement).toBeInTheDocument();

    expect(checkoutTotalPriceElement).toHaveTextContent(/total: \£30.00/i);
});

test("checkout button should remove all items from the cart", async () => {
    jest.useFakeTimers(); // Enable Jest's fake timers

    render(<ShopPage />);
    
    await act(async() => {
        // Simulate the passage of time until the products are loaded
        jest.runAllTimers();
    });

    // Get the first product item
    const productListElement = screen.getAllByTestId("product-item");
    const firstProductElement = productListElement[0];
        expect(firstProductElement).toHaveTextContent(/Product 1/i);

    const addToCartButtonElement = firstProductElement.querySelector("button");
    expect(addToCartButtonElement).toBeInTheDocument();
    // Check if the button is enabled
    expect(addToCartButtonElement).not.toBeDisabled();
    // Click the add to cart button
    await act(async () => {
        addToCartButtonElement.click();
    });
    const cartListElement = screen.getByTestId("cart-list");
    expect(cartListElement).toBeInTheDocument();
    // Check item is added to the cart
    const cartItemElement = screen.getByTestId("cart-item-0");
    expect(cartItemElement).toBeInTheDocument();
    expect(cartItemElement).toHaveTextContent(/Product 1/i);
    const checkoutButtonElement = screen.getByRole("button", {
        name: /checkout/i,
    });
    expect(checkoutButtonElement).toBeInTheDocument();
    // Check if the button is enabled
    expect(checkoutButtonElement).not.toBeDisabled();
    // Click the checkout button
    await act(async () => {
        checkoutButtonElement.click();
    });

    await act(async() => {
        // Simulate the passage of time until checkout is complete
        jest.runAllTimers();
    });

    // Check item is removed from the cart
    const cartItemElement2 = screen.queryByTestId("cart-item-0");
    expect(cartItemElement2).not.toBeInTheDocument();

    const emptyCartElement = screen.getByTestId("empty-cart");
    expect(emptyCartElement).toBeInTheDocument();
});


