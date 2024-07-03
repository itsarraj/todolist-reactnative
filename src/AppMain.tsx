import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  StatusBar,
  LayoutAnimation,
  UIManager,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import TaskList from "./components/TaskList";
import Filters from "./components/Filters";

// This is needed to Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AppMain: React.FC = () => {
  const [tasks, setTasks] = useState<
    { id: string; text: string; done: boolean; isEditingTask: boolean }[]
  >([]);
  const [taskToDoListInput, setTaskToDoListInput] = useState("");
  const [editToDoListInput, setEditToDoListInput] = useState("");
  const [toDoListfilter, setToDoListFilter] = useState<
    "all" | "done" | "notdone"
  >("all");
  const [toDoListDarkMode, setToDoListDarkMode] = useState(false); // Initialize with false for default light mode
  const [toDoListEditingTaskId, setToDoListEditingTaskId] = useState<
    string | null
  >(null); // State to track editing task ID

  const generateUniqueId = (): string => {
    return Math.random().toString(36).substr(2, 9);
  };

  const addTask = () => {
    if (taskToDoListInput.trim() !== "") {
      const newTask = {
        id: generateUniqueId(),
        text: taskToDoListInput.trim(),
        done: false,
        isEditingTask: false,
      };
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setTasks([...tasks, newTask]);
      setTaskToDoListInput("");
    }
  };

  const deleteTask = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    if (toDoListEditingTaskId === id) {
      setToDoListEditingTaskId(null); // Reset editing task ID if deleted task was being edited
    }
  };

  const toggleTaskCompletion = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(newTasks);
  };

  const startEditing = (id: string) => {
    // Disable editing for other tasks if already editing one
    if (toDoListEditingTaskId !== null && toDoListEditingTaskId !== id) {
      return;
    }

    const newTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, isEditingTask: true }
        : { ...task, isEditingTask: false }
    );
    setEditToDoListInput(newTasks.find((task) => task.id === id)?.text || "");
    setTasks(newTasks);
    setToDoListEditingTaskId(id);
  };

  const saveTask = (id: string) => {
    if (editToDoListInput.trim() !== "") {
      const newTasks = tasks.map((task) =>
        task.id === id
          ? { ...task, text: editToDoListInput.trim(), isEditingTask: false }
          : task
      );
      setTasks(newTasks);
      setEditToDoListInput("");
      setToDoListEditingTaskId(null);
    }
  };

  const cancelEditing = (id: string) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, isEditingTask: false } : task
    );
    setTasks(newTasks);
    setEditToDoListInput("");
    setToDoListEditingTaskId(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (toDoListfilter === "done") return task.done;
    if (toDoListfilter === "notdone") return !task.done;
    return true;
  });

  const toggleDarkMode = () => {
    setToDoListDarkMode(!toDoListDarkMode);
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          backgroundColor: toDoListDarkMode ? "#121212" : "#ffffff",
        },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
    >
      <StatusBar
        barStyle={toDoListDarkMode ? "light-content" : "dark-content"}
      />
      <View style={styles.header}>
        <Text
          style={[
            styles.heading,
            { color: toDoListDarkMode ? "#ffffff" : "#000000" },
          ]}
        >
          To-Do List
        </Text>
        <View style={styles.themeToggleContainer}>
          <Switch value={toDoListDarkMode} onValueChange={toggleDarkMode} />
          <Text style={{ color: toDoListDarkMode ? "#ffffff" : "#000000" }}>
            Dark Mode
          </Text>
        </View>
      </View>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: toDoListDarkMode ? "#333333" : "#ffffff",
            color: toDoListDarkMode ? "#ffffff" : "#000000",
          },
        ]}
        value={taskToDoListInput}
        onChangeText={setTaskToDoListInput}
        placeholder="Enter task..."
        placeholderTextColor={toDoListDarkMode ? "#666666" : "#888888"}
      />
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: toDoListDarkMode ? "#555555" : "#add8e6",
          },
        ]}
        onPress={addTask}
      >
        <Text style={{ color: toDoListDarkMode ? "#ffffff" : "#000000" }}>
          Add Task
        </Text>
      </TouchableOpacity>
      <Filters
        darkMode={toDoListDarkMode}
        filter={toDoListfilter}
        setFilter={setToDoListFilter}
      />
      <TaskList
        tasks={filteredTasks}
        darkModeApp={toDoListDarkMode}
        editTaskInput={editToDoListInput}
        onToggleTaskDone={toggleTaskCompletion}
        onStartTaskEditing={startEditing}
        onSaveAfterEditingTask={saveTask}
        onCancelAfterEditing={cancelEditing}
        onDeleteAfterTaskCreation={deleteTask}
        setEditTodoListInput={setEditToDoListInput}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  button: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  themeToggleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default AppMain;
