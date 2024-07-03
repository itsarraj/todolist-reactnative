import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: {
    id: string;
    text: string;
    done: boolean;
    isEditingTask: boolean;
  }[];
  darkModeApp: boolean;
  editTaskInput: string;
  onToggleTaskDone: (id: string) => void;
  onStartTaskEditing: (id: string) => void;
  onSaveAfterEditingTask: (id: string) => void;
  onCancelAfterEditing: (id: string) => void;
  onDeleteAfterTaskCreation: (id: string) => void;
  setEditTodoListInput: React.Dispatch<React.SetStateAction<string>>;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  darkModeApp: darkMode,
  editTaskInput: editInput,
  onToggleTaskDone: onToggleTaskCompletion,
  onStartTaskEditing: onStartEditing,
  onSaveAfterEditingTask: onSaveTask,
  onCancelAfterEditing: onCancelEditing,
  onDeleteAfterTaskCreation: onDeleteTask,
  setEditTodoListInput: setEditInput,
}) => {
  const renderItem = ({ item }: { item: any }) => (
    <TaskItem
      task={item}
      darkModeApp={darkMode}
      editTaskInput={editInput}
      onToggleTaskDone={onToggleTaskCompletion}
      onStartTaskEditing={onStartEditing}
      onSaveAfterEditingTask={onSaveTask}
      onCancelAfterEditing={onCancelEditing}
      onDeleteAfterTaskCreation={onDeleteTask}
      setEditTodoListInput={setEditInput}
    />
  );

  return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ flexGrow: 1 }}
    />
  );
};

export default TaskList;
