import { render, fireEvent, screen, act } from "@testing-library/react";
import { test } from "@jest/globals";
import Form from "./Form";
import exp from "constants";


test("username input should be rendered", () => {
    render(<Form />);

    const usernameInputElement = screen.getByPlaceholderText(/username/i);

    expect(usernameInputElement).toBeInTheDocument();
})


test("password input should be rendered", () => {
    render(<Form />);

    const passwordInputElement = screen.getByPlaceholderText(/password/i);

    expect(passwordInputElement).toBeInTheDocument();
})

test("button input should be rendered", () => {
    render(<Form />);

    const submitButtonElement = screen.getByRole("button", { name: /submit/i });

    expect(submitButtonElement).toBeInTheDocument();
})

test("username input should be empty", () => {
    render(<Form />);

    const usernameInputElement = screen.getByPlaceholderText(/username/i);

    expect(usernameInputElement.value).toBe("");
})

test("button input should be disabled initially", () => {
    render(<Form />);

    const submitButtonElement = screen.getByRole("button", { name: /submit/i });

    expect(submitButtonElement).toBeDisabled();
})

test("error should not be visible initially", () => {
    render(<Form />);

    const errorMessageElement = screen.getByTestId("error-message");

    expect(errorMessageElement).not.toBeVisible();
})

test("username input should change", () => {
    render(<Form />);

    const usernameInputElement = screen.getByPlaceholderText(/username/i);

    const testValue = "testuser";

    fireEvent.change(usernameInputElement, { target: { value: testValue } });

    expect(usernameInputElement.value).toBe(testValue);
})

test("password input should change", () => {
    render(<Form />);

    const passwordInputElement = screen.getByPlaceholderText(/password/i);

    const testValue = "testpassword";

    fireEvent.change(passwordInputElement, { target: { value: testValue } });

    expect(passwordInputElement.value).toBe(testValue);
})

test("button input should not be disabled when form data is completed", () => {
    render(<Form />);

    const submitButtonElement = screen.getByRole("button", { name: /submit/i });

        const usernameInputElement = screen.getByPlaceholderText(/username/i);

    const testUsernameValue = "testuser";

    fireEvent.change(usernameInputElement, { target: { value: testUsernameValue } });

        const passwordInputElement = screen.getByPlaceholderText(/password/i);

    const testPasswordValue = "testpassword";

    fireEvent.change(passwordInputElement, { target: { value: testPasswordValue } });

    const formElement = screen.getByTestId("form");

    fireEvent.blur(formElement);
    // fireEvent.submit(formElement);

    expect(submitButtonElement).not.toBeDisabled();
})

test("button input should say loading when data is being submitted", () => {
    render(<Form />);

    const submitButtonElement = screen.getByRole("button", { name: /submit/i });

        const usernameInputElement = screen.getByPlaceholderText(/username/i);

    const testUsernameValue = "testuser";

    fireEvent.change(usernameInputElement, { target: { value: testUsernameValue } });

        const passwordInputElement = screen.getByPlaceholderText(/password/i);

    const testPasswordValue = "testpassword";

    fireEvent.change(passwordInputElement, { target: { value: testPasswordValue } });

    const formElement = screen.getByTestId("form");

    fireEvent.blur(formElement);
    fireEvent.submit(formElement);

    expect(submitButtonElement).toHaveTextContent("Loading...");
    expect(submitButtonElement).toBeDisabled();

})


test("welcome message should be visible and the form should not be visible after a successful login", async () => {
    render(<Form />);

        const usernameInputElement = screen.getByPlaceholderText(/username/i);

        const passwordInputElement = screen.getByPlaceholderText(/password/i);

        const formElement = screen.getByTestId("form");

        const testUsernameValue = "testuser";
        
        const testPasswordValue = "testpassword";

        await act(async() => {
            fireEvent.change(usernameInputElement, { target: { value: testUsernameValue } });

            fireEvent.change(passwordInputElement, { target: { value: testPasswordValue } });
        
            fireEvent.blur(formElement);

            fireEvent.submit(formElement);

            // Simulate a delay for the loading state;
            await new Promise((resolve) => setTimeout(resolve, 2000));
        });
        
        
        // Wait for the welcome message to be visible
        const welcomeMessageElement = await screen.findByTestId("welcome-message");
    
        // const welcomeMessageElement = screen.getByTestId("welcome-message");
    
        expect(welcomeMessageElement).toBeVisible();

        expect(formElement).not.toBeVisible();
})