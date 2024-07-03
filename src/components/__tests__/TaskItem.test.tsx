import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TaskItem from "../TaskItem";

const task = {
  id: "1",
  text: "Sample Task",
  done: false,
  isEditingTask: false,
};

const mockProps = {
  task,
  darkModeApp: false,
  editTaskInput: "",
  onToggleTaskDone: jest.fn(),
  onStartTaskEditing: jest.fn(),
  onSaveAfterEditingTask: jest.fn(),
  onCancelAfterEditing: jest.fn(),
  onDeleteAfterTaskCreation: jest.fn(),
  setEditTodoListInput: jest.fn(),
};

test("renders TaskItem component", () => {
  const { getByText } = render(<TaskItem {...mockProps} />);
  expect(getByText("Sample Task")).toBeTruthy();
});

test("completes task", () => {
  const { getByRole } = render(<TaskItem {...mockProps} />);
  fireEvent(getByRole("switch"), "onValueChange");
  expect(mockProps.onToggleTaskDone).toHaveBeenCalledWith("1");
});
