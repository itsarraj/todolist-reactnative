import React from "react";
import { render } from "@testing-library/react-native";
import TaskList from "../TaskList";

const tasks = [
  { id: "1", text: "Task 1", done: false, isEditingTask: false },
  { id: "2", text: "Task 2", done: true, isEditingTask: false },
];

const mockProps = {
  tasks,
  darkModeApp: false,
  editTaskInput: "",
  onToggleTaskDone: jest.fn(),
  onStartTaskEditing: jest.fn(),
  onSaveAfterEditingTask: jest.fn(),
  onCancelAfterEditing: jest.fn(),
  onDeleteAfterTaskCreation: jest.fn(),
  setEditTodoListInput: jest.fn(),
};

test("renders TaskList component", () => {
  const { getByText } = render(<TaskList {...mockProps} />);
  expect(getByText("Task 1")).toBeTruthy();
  expect(getByText("Task 2")).toBeTruthy();
});
