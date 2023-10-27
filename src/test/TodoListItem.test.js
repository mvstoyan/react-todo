// TodoListItem file displays a single todo item in a list of todos.
// In the test, need to ensure todo item is displayed correctly and
// buttons for updating and removing it function properly.

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoListItem from "../components/TodoListItem/TodoListItem";
import "@testing-library/jest-dom";

test("renders TodoListItem component", () => {
  // Create mock data for todo, onRemoveTodo, and onUpdateTodo
  // mock  -  imitation of real objects to test their behavior in a controlled environment
  const mockTodo = {
    id: "1",
    title: "Test Todo",
  };
  const mockOnRemoveTodo = jest.fn();
  const mockOnUpdateTodo = jest.fn();
  render(
    <TodoListItem
      todo={mockTodo}
      onRemoveTodo={mockOnRemoveTodo}
      onUpdateTodo={mockOnUpdateTodo}
    />
  );

  // Get the buttons by their alt text
  const updateButton = screen.getByAltText("Update");
  const removeButton = screen.getByAltText("Remove");
  // Todo element by text
  const todoElement = screen.getByText("Test Todo");

  // Check if buttons, as well as the todo element, are present on the page
  // expect -  function to check the expected behavior of the code in tests
  expect(updateButton).toBeInTheDocument();
  expect(removeButton).toBeInTheDocument();
  expect(todoElement).toBeInTheDocument();

  // Simulate click on the update button and check if the update function is called
  fireEvent.click(updateButton);
  expect(mockOnUpdateTodo).toHaveBeenCalledTimes(1);
  // remove Button simulate and check
  fireEvent.click(removeButton);
  expect(mockOnRemoveTodo).toHaveBeenCalledTimes(1);
});
