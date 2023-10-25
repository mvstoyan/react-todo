import React from "react";
import { render, screen } from "@testing-library/react";
import Animation from "../components/Animation/animation";
import "@testing-library/jest-dom"; //package to extend the jest-dom matchers.

test("renders Animation component", () => {
  render(<Animation />);
  // Get elements - alt attribute
  const doItElement = screen.getByAltText("Let's Do It");
  const witchElement = screen.getByAltText("witch");

  // Check elements are present on the page
  expect(doItElement).toBeInTheDocument();
  expect(witchElement).toBeInTheDocument();
});