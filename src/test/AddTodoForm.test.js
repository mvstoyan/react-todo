// AddTodoForm file creates a form for adding new todos.
// In the test, need to verify that the "onAddTodo" function
// is called when form is submitted and that it receives todo title.

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddTodoForm from "../components/AddTodoForm/AddTodoForm";

test("calls onAddTodo when the form is submitted", () => {
  const mockOnAddTodo = jest.fn();
  render(<AddTodoForm onAddTodo={mockOnAddTodo} />);
  const inputElement = screen.getByRole("textbox");
  const addButton = screen.getByAltText("Add");
  // Create a test title
  const testTitle = "Test Todo";

  // Simulate a change and click
  fireEvent.change(inputElement, { target: { value: testTitle } });
  fireEvent.click(addButton);

  // Check if the onAddTodo function was called once
  expect(mockOnAddTodo).toHaveBeenCalledTimes(1);
  expect(mockOnAddTodo).toHaveBeenCalledWith(testTitle);
});
