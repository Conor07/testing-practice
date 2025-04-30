import { render } from "@testing-library/react";
import Counter from "./Counter";

describe(Counter, () => {
  it("should render without crashing", () => {
    const { getByText } = render(<Counter initialCount={0} />);
    expect(getByText(/Count/i)).toBeInTheDocument();
  });

  // // Inital Count: ------------------

  // // Version using getByText:
  // it("should display the initial count", () => {
  //   const { getByText } = render(<Counter initialCount={0} />);
  //   expect(getByText(/0/i)).toBeInTheDocument();
  // });

  // // Version using data-test-id:
  // it("should display the initial count", () => {
  //   const { getByTestId } = render(<Counter initialCount={0} />);

  //   // v1
  //   expect(getByTestId("count")).toHaveTextContent("0");

  //   // v2
  //   expect(getByTestId("count").textContent).toEqual("0");
  // });

  // // Increment: ------------------

  // it("should increment the count", () => {
  //   const { getByText } = render(<Counter initialCount={0} />);
  //   fireEvent.click(getByText(/Increment/i));
  //   expect(getByText(/1/i)).toBeInTheDocument();
  // });

  // // Version using getByTestId:
  // it("should increment the count", () => {
  //   const { getByTestId } = render(<Counter initialCount={0} />);
  //   fireEvent.click(getByTestId("increment"));
  //   expect(getByTestId("count")).toHaveTextContent("1");
  // });

  // // Version using getByRole:
  // it("should increment the count", () => {
  //   const { getByRole } = render(<Counter initialCount={0} />);
  //   fireEvent.click(getByRole("button", { name: /Increment/i }));
  //   expect(getByRole("heading", { name: /Count/i })).toHaveTextContent("1");
  // });

  // // Version using getByLabelText:
  // it("should increment the count", () => {
  //   const { getByLabelText } = render(<Counter initialCount={0} />);
  //   fireEvent.click(getByLabelText(/Increment/i));
  //   expect(getByLabelText(/Count/i)).toHaveTextContent("1");
  // });

  // // Version using getByDisplayValue:
  // it("should increment the count", () => {
  //   const { getByDisplayValue } = render(<Counter initialCount={0} />);
  //   fireEvent.click(getByDisplayValue(/Increment/i));
  //   expect(getByDisplayValue(/Count/i)).toHaveTextContent("1");
  // });

  // // Decrement: ------------------

  // it("should decrement the count", () => {
  //   const { getByText } = render(<Counter initialCount={0} />);
  //   fireEvent.click(getByText(/Decrement/i));
  //   expect(getByText(/-1/i)).toBeInTheDocument();
  // });

  // // Version using getByTestId:
  // it("should decrement the count", () => {
  //   const { getByTestId } = render(<Counter initialCount={0} />);
  //   fireEvent.click(getByTestId("decrement"));
  //   expect(getByTestId("count")).toHaveTextContent("-1");
  // });

  // // Reset: ------------------

  // it("should reset the count", () => {
  //   const { getByText } = render(<Counter initialCount={0} />);
  //   fireEvent.click(getByText(/Reset/i));
  //   expect(getByText(/0/i)).toBeInTheDocument();
  // });

  // // Version using getByTestId:
  // it("should reset the count", () => {
  //   const { getByTestId } = render(<Counter initialCount={0} />);
  //   fireEvent.click(getByTestId("reset"));
  //   expect(getByTestId("count")).toHaveTextContent("0");
  // });

  // // Switch Signs: ------------------

  // it("should switch signs of the count", () => {
  //   const { getByText } = render(<Counter initialCount={0} />);
  //   fireEvent.click(getByText(/Switch Signs/i));
  //   expect(getByText(/0/i)).toBeInTheDocument();
  // });

  // // Version using getByTestId:
  // it("should switch signs of the count", () => {
  //   const { getByTestId } = render(<Counter initialCount={0} />);
  //   fireEvent.click(getByTestId("switch-signs"));
  //   expect(getByTestId("count")).toHaveTextContent("0");
  // });
});
