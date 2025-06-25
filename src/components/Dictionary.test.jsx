import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dictionary from "./Dictionary";
import axios from "axios";
import "@testing-library/jest-dom";

jest.mock("axios");
const mockedAxios = axios;
// const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Dictionary", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("page loads correctly", () => {
    render(<Dictionary />);
    expect(screen.getByTestId("dictionary-root")).toBeInTheDocument();
    expect(screen.getByTestId("word-input")).toBeInTheDocument();
    expect(screen.getByTestId("lookup-btn")).toBeInTheDocument();
    expect(screen.getByTestId("definitions-list")).toBeInTheDocument();
  });

  test("cannot search for a definition without entering a word", () => {
    render(<Dictionary />);
    const lookupBtn = screen.getByTestId("lookup-btn");
    expect(lookupBtn).toBeDisabled();
  });

  test("entering a word calls the endpoint", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          meanings: [
            {
              definitions: [{ definition: "A domesticated carnivorous mammal." }]
            }
          ]
        }
      ]
    });
    render(<Dictionary />);
    const input = screen.getByTestId("word-input");
    const lookupBtn = screen.getByTestId("lookup-btn");
    fireEvent.change(input, { target: { value: "dog" } });
    expect(lookupBtn).toBeEnabled();
    fireEvent.click(lookupBtn);
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/dog")
    ));
    expect(await screen.findByText("A domesticated carnivorous mammal.")).toBeInTheDocument();
  });

  test("endpoint call returns correct data", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          meanings: [
            {
              definitions: [
                { definition: "First definition." },
                { definition: "Second definition." }
              ]
            }
          ]
        }
      ]
    });
    render(<Dictionary />);
    fireEvent.change(screen.getByTestId("word-input"), { target: { value: "test" } });
    fireEvent.click(screen.getByTestId("lookup-btn"));
    expect(await screen.findByText("First definition.")).toBeInTheDocument();
    expect(await screen.findByText("Second definition.")).toBeInTheDocument();
  });

  test("shows loading message when calling the api", async () => {
    let resolvePromise;
    mockedAxios.get.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolvePromise = resolve;
        })
    );
    render(<Dictionary />);
    fireEvent.change(screen.getByTestId("word-input"), { target: { value: "cat" } });
    fireEvent.click(screen.getByTestId("lookup-btn"));
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    // Finish the API call
    resolvePromise({
      data: [
        {
          meanings: [
            {
              definitions: [{ definition: "A small domesticated carnivorous mammal." }]
            }
          ]
        }
      ]
    });
    // Wait for loading to disappear and result to show
    expect(await screen.findByText("A small domesticated carnivorous mammal.")).toBeInTheDocument();
  });

  test("searching for a word that doesn't exist displays an error", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Not found"));
    render(<Dictionary />);
    fireEvent.change(screen.getByTestId("word-input"), { target: { value: "nonexistentword" } });
    fireEvent.click(screen.getByTestId("lookup-btn"));
    expect(await screen.findByTestId("error-msg")).toHaveTextContent("No definitions found.");
  });

  test("buttons are disabled when loading", async () => {
    let resolvePromise;
    mockedAxios.get.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolvePromise = resolve;
        })
    );
    render(<Dictionary />);
    fireEvent.change(screen.getByTestId("word-input"), { target: { value: "cat" } });
    fireEvent.click(screen.getByTestId("lookup-btn"));
    expect(screen.getByTestId("lookup-btn")).toBeDisabled();
    // Resolve the promise to finish loading
    resolvePromise({
      data: [
        {
          meanings: [
            {
              definitions: [{ definition: "A small domesticated carnivorous mammal." }]
            }
          ]
        }
      ]
    });
    expect(await screen.findByText("A small domesticated carnivorous mammal.")).toBeInTheDocument();
  });

  test("view more button appears when there are more than 3 results", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          meanings: [
            {
              definitions: [
                { definition: "Def 1" },
                { definition: "Def 2" },
                { definition: "Def 3" },
                { definition: "Def 4" }
              ]
            }
          ]
        }
      ]
    });
    render(<Dictionary />);
    fireEvent.change(screen.getByTestId("word-input"), { target: { value: "many" } });
    fireEvent.click(screen.getByTestId("lookup-btn"));
    expect(await screen.findByText("Def 1")).toBeInTheDocument();
    expect(screen.getByTestId("view-more-btn")).toBeInTheDocument();
  });

  test("view less button works after clicking view more", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          meanings: [
            {
              definitions: [
                { definition: "Def 1" },
                { definition: "Def 2" },
                { definition: "Def 3" },
                { definition: "Def 4" }
              ]
            }
          ]
        }
      ]
    });
    render(<Dictionary />);
    fireEvent.change(screen.getByTestId("word-input"), { target: { value: "many" } });
    fireEvent.click(screen.getByTestId("lookup-btn"));
    expect(await screen.findByText("Def 1")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("view-more-btn"));
    expect(screen.getByTestId("view-less-btn")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("view-less-btn"));
    expect(screen.getByTestId("view-more-btn")).toBeInTheDocument();
  });


});