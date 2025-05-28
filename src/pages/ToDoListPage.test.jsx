import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ToDoList from "./ToDoListPage";
import "@testing-library/jest-dom";

// NOTE, must use: npm install react-dnd@14 react-dnd-html5-backend@14 react-dnd-test-backend@14
// Otherwise the npm test errors, any newer version introduces issues and requires not using react-scripts for "test" in package.json

describe("ToDoListPage", () => {
  function renderPage() {
    return render(<ToDoList />);
  }

  test("can add a new task to the To Do section", () => {
    renderPage();
    fireEvent.change(screen.getByPlaceholderText(/task title/i), { target: { value: "New Task" } });
    fireEvent.change(screen.getByPlaceholderText(/task description/i), { target: { value: "New Desc" } });
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    expect(screen.getByText("New Task")).toBeInTheDocument();
    expect(screen.getByText("New Desc")).toBeInTheDocument();
  });

  test("shows validation error if title or description is empty", () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    expect(screen.getByText(/both title and description are required/i)).toBeInTheDocument();
  });

  function dragAndDrop(src, dst) {
    fireEvent.dragStart(src);
    fireEvent.dragEnter(dst);
    fireEvent.dragOver(dst);
    fireEvent.drop(dst);
    fireEvent.dragLeave(dst);
    fireEvent.dragEnd(src);
  }

  test("can drag and drop a task from To Do to In Progress", () => {
    renderPage();
    fireEvent.change(screen.getByPlaceholderText(/task title/i), { target: { value: "Drag Me" } });
    fireEvent.change(screen.getByPlaceholderText(/task description/i), { target: { value: "To be moved" } });
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    const draggable = screen.getByTestId("taskitem-Drag Me");
    const inProgressSection = screen.getByTestId("section-inProgress");

    dragAndDrop(draggable, inProgressSection);

    expect(inProgressSection).toHaveTextContent("Drag Me");
  });

  test("can drag and drop a task from In Progress to Completed", () => {
    renderPage();
    fireEvent.change(screen.getByPlaceholderText(/task title/i), { target: { value: "Finish Me" } });
    fireEvent.change(screen.getByPlaceholderText(/task description/i), { target: { value: "Almost done" } });
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    const draggable = screen.getByTestId("taskitem-Finish Me");
    const inProgressSection = screen.getByTestId("section-inProgress");
    const completedSection = screen.getByTestId("section-completed");

    dragAndDrop(draggable, inProgressSection);
    expect(inProgressSection).toHaveTextContent("Finish Me");

    const draggableInProgress = screen.getByTestId("taskitem-Finish Me");
    dragAndDrop(draggableInProgress, completedSection);
    expect(completedSection).toHaveTextContent("Finish Me");
  });
});