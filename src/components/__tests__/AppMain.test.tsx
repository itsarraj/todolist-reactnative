import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AppMain from "../../AppMain";

test("renders AppMain component", () => {
  const { getByPlaceholderText } = render(<AppMain />);
  expect(getByPlaceholderText("Enter task...")).toBeTruthy();
});

test("adds a new task", () => {
  const { getByPlaceholderText, getByText } = render(<AppMain />);
  fireEvent.changeText(getByPlaceholderText("Enter task..."), "New Task");
  fireEvent.press(getByText("Add Task"));
  expect(getByText("New Task")).toBeTruthy();
});
