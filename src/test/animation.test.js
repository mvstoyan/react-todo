import React from "react";
import { render, screen } from "@testing-library/react";
import Animation from "../components/Animation/animation";
import "@testing-library/jest-dom"; //package to extend the jest-dom matchers.

test("renders Animation component", () => {
  render(<Animation />);
  // Get elements - alt attribute
  const doItElement = screen.getByAltText("Let's Do It");
  const witchElement = screen.getByAltText("witch");
  // Get elements - text
  const backButton = screen.getByText("Back");
  const nextButton = screen.getByText("Next");

  // Check elements is present on the page
  expect(doItElement).toBeInTheDocument();
  expect(witchElement).toBeInTheDocument();
  expect(backButton).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();
});
