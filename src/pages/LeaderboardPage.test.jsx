import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Leaderboard from "./LeaderboardPage";
import { afterEach, expect } from "@jest/globals";

function addUser(name, score) {
  fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: name } });
  fireEvent.change(screen.getByPlaceholderText(/Score/i), { target: { value: score } });
  fireEvent.click(screen.getByRole("button", { name: /Add User/i }));
}

describe("Leaderboard Page", () => {
  beforeEach(() => {
    render(<Leaderboard initialUsers={[]} />);
  });



  it("renders the leaderboard page", () => {
    expect(screen.getByText(/Leaderboard/i)).toBeInTheDocument();
  });

  it("renders the add user form", () => {
    expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Score/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add User/i })).toBeInTheDocument();
  });

  it("adds a user to the leaderboard", () => {
    addUser("Alice", 100);
    expect(screen.getByText(/Alice/i)).toBeInTheDocument();
    expect(screen.getByText(/100/i)).toBeInTheDocument();
  });

  it("sorts users by score ascending and descending", () => {
    addUser("Bob", 200);
    addUser("Charlie", 150);
    addUser("Alice", 100);


    // Toggle to asc
    fireEvent.click(screen.getByTestId("sort-by-score"));
    let userItemsAsc = screen.getAllByTestId(/leaderboard-user-/);
    let namesAsc = userItemsAsc.map(item => item.textContent);
    expect(namesAsc[0]).toMatch(/Alice/);

    // Toggle back to desc
    fireEvent.click(screen.getByTestId("sort-by-score"));
    const userItems = screen.getAllByTestId(/leaderboard-user-/);
    const names = userItems.map(item => item.textContent);
    expect(names[0]).toMatch(/Bob/);
  });

  it("sorts users by name ascending and descending", () => {
    addUser("Zoe", 50);
    addUser("Anna", 75);
    addUser("Charlie", 60);
    // Sort by name (desc by default)
    fireEvent.click(screen.getByTestId("sort-by-name"));
    let userItems = screen.getAllByTestId(/leaderboard-user-/);
    expect(userItems[0]).toHaveTextContent("Zoe");
    // Toggle to asc
    fireEvent.click(screen.getByTestId("sort-by-name"));
    userItems = screen.getAllByTestId(/leaderboard-user-/);
    expect(userItems[0]).toHaveTextContent("Anna"); 
  });

  it("filters users by search", () => {
    addUser("David", 80);
    fireEvent.change(screen.getByPlaceholderText(/Search users/i), { target: { value: "Dav" } });
    expect(screen.getByText(/David/i)).toBeInTheDocument();
    expect(screen.queryByText(/Alice/i)).not.toBeInTheDocument();
  });

  it("paginates users", () => {
    // Add enough users for two pages
    for (let i = 0; i < 12; i++) {
      addUser(`User${i}`, i * 10);
    }
    expect(screen.getByText(/Page 1 of 2/)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Next/));
    expect(screen.getByText(/Page 2 of 2/)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Previous/));
    expect(screen.getByText(/Page 1 of 2/)).toBeInTheDocument();
  });

  it("edits a user", () => {
    render(<Leaderboard initialUsers={[
      { id: "1", name: "Alice Unedited", score: 100 },
      { id: "2", name: "Bob", score: 80 }
    ]} />);

    const editButton = screen.getByTestId("edit-btn-1");
    fireEvent.click(editButton);

    // Use the unique test id for the edit input
    const nameInput = screen.getByTestId("edit-user-name-1");
    const scoreInput = screen.getByTestId("edit-user-score-1");
    expect(nameInput.value).toBe("Alice Unedited");
    expect(scoreInput.value).toBe("100");

    fireEvent.change(nameInput, { target: { value: "Alice Updated" } });
    fireEvent.change(scoreInput, { target: { value: "120" } });
    fireEvent.click(screen.getByTestId("save-edit-btn-1"));

    expect(screen.getByText(/Alice Updated/i)).toBeInTheDocument();
    expect(screen.getByText(/120/i)).toBeInTheDocument();
    expect(screen.queryByText(/Alice Unedited/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/100/i)).not.toBeInTheDocument();
  });

  it("deletes a user", () => {

    render(<Leaderboard initialUsers={[
      { id: "1", name: "Alice", score: 100 },
      { id: "2", name: "Bob", score: 80 }
    ]} />);
    
    expect(screen.getByText(/Alice/i)).toBeInTheDocument();
    expect(screen.getByText(/100/i)).toBeInTheDocument();
    expect(screen.getByText(/Bob/i)).toBeInTheDocument();
    expect(screen.getByText(/80/i)).toBeInTheDocument();
    
    const deleteButton = screen.getByTestId("remove-btn-1");
    fireEvent.click(deleteButton);
    expect(screen.queryByText(/Alice/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/100/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Bob/i)).toBeInTheDocument();
    expect(screen.getByText(/80/i)).toBeInTheDocument();
  });

});