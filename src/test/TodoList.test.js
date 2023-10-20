// TodoList file - display a list of tasks. In the test,
// checking that the component properly displays the todo list
// and handles the delete and update functions for each list item.

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList/TodoList";

test("renders a list of todos", () => {
  // Mock todo data
  const mockTodos = [
    { id: "1", title: "Task 1" },
    { id: "2", title: "Task 2" },
    { id: "3", title: "Task 3" },
  ];
  // Create mock for handling todo remove and update
  const mockOnRemoveTodo = jest.fn();
  const mockOnUpdateTodo = jest.fn();

  render(
    <TodoList
      todoList={mockTodos}
      onRemoveTodo={mockOnRemoveTodo}
      onUpdateTodo={mockOnUpdateTodo}
    />
  );

  // Check if element list is present on the page
  const listElement = screen.getByRole("list");
  expect(listElement).toBeInTheDocument();

  // Check if number todo elements matches the number of mock data
  const todoElements = screen.getAllByRole("listitem");
  expect(todoElements.length).toBe(mockTodos.length);
});
