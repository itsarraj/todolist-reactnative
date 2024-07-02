import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Switch,
  StatusBar,
  LayoutAnimation,
  UIManager,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  useColorScheme,
} from "react-native";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<
    { id: string; text: string; completed: boolean; isEditing: boolean }[]
  >([]);
  const [taskInput, setTaskInput] = useState("");
  const [editInput, setEditInput] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );
  const [darkMode, setDarkMode] = useState(useColorScheme() === "dark");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null); // State to track editing task ID

  const generateUniqueId = (): string => {
    return Math.random().toString(36).substr(2, 9);
  };

  // Colors
  const colors = {
    darkBackground: "#121212",
    lightBackground: "#ffffff",
    darkText: "#ffffff",
    lightText: "#000000",
    darkInputBackground: "#333333",
    lightInputBackground: "#ffffff",
    darkPlaceholder: "#666666",
    lightPlaceholder: "#888888",
    darkButtonBackground: "#555555",
    lightButtonBackground: "#add8e6",
    taskCompletedBackground: "#90ee90",
    taskDefaultBackground: "#ffffff",
    filterButtonBorder: "#cccccc",
    activeFilterButtonBackground: "#87cefa",
    taskCompletedBackgroundLight: "#90ee90", // Light mode completed task background
    taskCompletedBackgroundDark: "#3d9140", // Dark mode completed task background
  };

  const addTask = () => {
    if (taskInput.trim() !== "") {
      const newTask = {
        id: generateUniqueId(),
        text: taskInput.trim(),
        completed: false,
        isEditing: false,
      };
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setTasks([...tasks, newTask]);
      setTaskInput("");
    }
  };

  const deleteTask = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    if (editingTaskId === id) {
      setEditingTaskId(null); // Reset editing task ID if deleted task was being edited
    }
  };

  const toggleTaskCompletion = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const startEditing = (id: string) => {
    // Disable editing for other tasks if already editing one
    if (editingTaskId !== null && editingTaskId !== id) {
      return;
    }

    const newTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, isEditing: true }
        : { ...task, isEditing: false }
    );
    setEditInput(newTasks.find((task) => task.id === id)?.text || "");
    setTasks(newTasks);
    setEditingTaskId(id);
  };

  const saveTask = (id: string) => {
    if (editInput.trim() !== "") {
      const newTasks = tasks.map((task) =>
        task.id === id
          ? { ...task, text: editInput.trim(), isEditing: false }
          : task
      );
      setTasks(newTasks);
      setEditInput("");
      setEditingTaskId(null);
    }
  };

  const cancelEditing = (id: string) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, isEditing: false } : task
    );
    setTasks(newTasks);
    setEditInput("");
    setEditingTaskId(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  const renderItem = ({
    item,
    index,
  }: {
    item: { id: string; text: string; completed: boolean; isEditing: boolean };
    index: number;
  }) => (
    <View
      key={item.id}
      style={[
        styles.task,
        {
          backgroundColor: darkMode
            ? item.completed
              ? colors.taskCompletedBackgroundDark
              : colors.darkBackground
            : item.completed
            ? colors.taskCompletedBackgroundLight
            : colors.taskDefaultBackground,
          borderColor: darkMode ? "#444" : "#ccc", // Adjust border color
          borderWidth: 1, // Add border width
        },
      ]}
    >
      {item.isEditing && item.id === editingTaskId ? (
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: darkMode
                ? colors.darkInputBackground
                : colors.lightInputBackground,
              color: darkMode ? colors.darkText : colors.lightText,
              flex: 1,
              marginRight: 10,
            },
          ]}
          value={editInput}
          onChangeText={setEditInput}
          onSubmitEditing={() => saveTask(item.id)}
        />
      ) : (
        <Text
          style={{
            flex: 1,
            color: darkMode ? colors.darkText : colors.lightText,
          }}
        >
          {item.text}
        </Text>
      )}
      <Switch
        value={item.completed}
        onValueChange={() => toggleTaskCompletion(item.id)}
      />
      {item.isEditing && item.id === editingTaskId ? (
        <>
          <TouchableOpacity
            style={[
              styles.buttonAction,
              { borderColor: colors.filterButtonBorder },
            ]}
            onPress={() => saveTask(item.id)}
          >
            <Text
              style={{ color: darkMode ? colors.darkText : colors.lightText }}
            >
              Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonAction,
              { borderColor: colors.filterButtonBorder },
            ]}
            onPress={() => cancelEditing(item.id)}
          >
            <Text
              style={{ color: darkMode ? colors.darkText : colors.lightText }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={[
            styles.buttonAction,
            { borderColor: colors.filterButtonBorder },
          ]}
          onPress={() => startEditing(item.id)}
        >
          <Text
            style={{ color: darkMode ? colors.darkText : colors.lightText }}
          >
            Edit
          </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[
          styles.buttonAction,
          { borderColor: colors.filterButtonBorder },
        ]}
        onPress={() => deleteTask(item.id)}
      >
        <Text style={{ color: darkMode ? colors.darkText : colors.lightText }}>
          Delete
        </Text>
      </TouchableOpacity>
    </View>
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          backgroundColor: darkMode
            ? colors.darkBackground
            : colors.lightBackground,
        },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />
        <View style={styles.header}>
          <Text
            style={[
              styles.heading,
              { color: darkMode ? colors.darkText : colors.lightText },
            ]}
          >
            To-Do List
          </Text>
          <View style={styles.themeToggleContainer}>
            <Switch value={darkMode} onValueChange={toggleDarkMode} />
            <Text
              style={{ color: darkMode ? colors.darkText : colors.lightText }}
            >
              Dark Mode
            </Text>
          </View>
        </View>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: darkMode
                ? colors.darkInputBackground
                : colors.lightInputBackground,
              color: darkMode ? colors.darkText : colors.lightText,
            },
          ]}
          value={taskInput}
          onChangeText={setTaskInput}
          placeholder="Enter task..."
          placeholderTextColor={
            darkMode ? colors.darkPlaceholder : colors.lightPlaceholder
          }
        />
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: darkMode
                ? colors.darkButtonBackground
                : colors.lightButtonBackground,
            },
          ]}
          onPress={addTask}
        >
          <Text
            style={{ color: darkMode ? colors.darkText : colors.lightText }}
          >
            Add Task
          </Text>
        </TouchableOpacity>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "all" && styles.activeFilterButton,
              {
                backgroundColor: darkMode
                  ? colors.darkButtonBackground
                  : colors.lightButtonBackground,
                borderColor: colors.filterButtonBorder,
              },
            ]}
            onPress={() => setFilter("all")}
          >
            <Text
              style={{ color: darkMode ? colors.darkText : colors.lightText }}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "completed" && styles.activeFilterButton,
              {
                backgroundColor: darkMode
                  ? colors.darkButtonBackground
                  : colors.lightButtonBackground,
                borderColor: colors.filterButtonBorder,
              },
            ]}
            onPress={() => setFilter("completed")}
          >
            <Text
              style={{ color: darkMode ? colors.darkText : colors.lightText }}
            >
              Completed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "incomplete" && styles.activeFilterButton,
              {
                backgroundColor: darkMode
                  ? colors.darkButtonBackground
                  : colors.lightButtonBackground,
                borderColor: colors.filterButtonBorder,
              },
            ]}
            onPress={() => setFilter("incomplete")}
          >
            <Text
              style={{ color: darkMode ? colors.darkText : colors.lightText }}
            >
              Incomplete
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredTasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </ScrollView>
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
    alignSelf: "center", // Center align heading text
    width: "80%",
    textAlign: "left",
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%", // Take full width of the container
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
    width: "100%", // Take full width of the container
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    width: "100%",
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    width: "30%",
  },
  activeFilterButton: {
    backgroundColor: "lightblue",
  },
  task: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%", // Take full width of the container
  },
  themeToggleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonAction: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
});

export default App;
