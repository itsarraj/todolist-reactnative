import React from "react";
import { render } from "@testing-library/react-native";
import App from "../../../App";

test("renders App component", () => {
  // This test is just to make sure the component renders without errors
  const { getByText } = render(<App />);
  expect(getByText("To-Do List")).toBeTruthy();
});
