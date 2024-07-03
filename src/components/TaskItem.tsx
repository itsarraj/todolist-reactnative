import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface TaskItemProps {
  task: {
    id: string;
    text: string;
    done: boolean;
    isEditingTask: boolean;
  };
  darkModeApp: boolean;
  editTaskInput: string;
  onToggleTaskDone: (id: string) => void;
  onStartTaskEditing: (id: string) => void;
  onSaveAfterEditingTask: (id: string) => void;
  onCancelAfterEditing: (id: string) => void;
  onDeleteAfterTaskCreation: (id: string) => void;
  setEditTodoListInput: React.Dispatch<React.SetStateAction<string>>;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  darkModeApp: darkMode,
  editTaskInput: editInput,
  onToggleTaskDone: onToggleTaskDone,
  onStartTaskEditing: onStartEditing,
  onSaveAfterEditingTask: onSaveTask,
  onCancelAfterEditing: onCancelEditing,
  onDeleteAfterTaskCreation: onDeleteTask,
  setEditTodoListInput: setEditInput,
}) => {
  const colors = {
    darkBackgroundApp: "#121212",
    lightBackgroundApp: "#ffffff",
    darkTextOfTask: "#ffffff",
    lightTextOfTask: "#000000",
    darkInputFieldBackground: "#333333",
    lightInputFieldBackground: "#ffffff",
    darkInputPlaceholder: "#666666",
    lightInputPlaceholder: "#888888",
    darkModeButtonBackground: "#555555",
    lightModeBackground: "#add8e6",
    taskDoneBackground: "#90ee90",
    taskDefaultBackground: "#ffffff",
    filterButtonBorder: "#cccccc",
    activeFilterButtonBackground: "#87cefa",
    taskDoneBackgroundLight: "#90ee90",
    taskDoneBackgroundDark: "#3d9140",
  };

  const startEditing = (id: string) => {
    onStartEditing(id);
    setEditInput(task.text);
  };

  const saveTask = () => {
    onSaveTask(task.id);
    setEditInput("");
  };

  const cancelEditing = () => {
    onCancelEditing(task.id);
    setEditInput("");
  };

  return (
    <View
      style={[
        styles.task,
        {
          backgroundColor: darkMode
            ? task.done
              ? colors.taskDoneBackgroundDark
              : colors.darkBackgroundApp
            : task.done
            ? colors.taskDoneBackgroundLight
            : colors.taskDefaultBackground,
          borderColor: darkMode ? "#444" : "#ccc",
          borderWidth: 1,
        },
      ]}
    >
      {task.isEditingTask ? (
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: darkMode
                ? colors.darkInputFieldBackground
                : colors.lightInputFieldBackground,
              color: darkMode ? colors.darkTextOfTask : colors.lightTextOfTask,
              flex: 1,
              marginRight: 10,
            },
          ]}
          value={editInput}
          onChangeText={setEditInput}
          onSubmitEditing={saveTask}
        />
      ) : (
        <Text
          style={{
            flex: 1,
            color: darkMode ? colors.darkTextOfTask : colors.lightTextOfTask,
          }}
        >
          {task.text}
        </Text>
      )}
      <Switch
        value={task.done}
        onValueChange={() => onToggleTaskDone(task.id)}
      />
      {task.isEditingTask ? (
        <>
          <TouchableOpacity
            style={[
              styles.buttonAction,
              { borderColor: colors.filterButtonBorder },
            ]}
            onPress={saveTask}
          >
            <Text
              style={{
                color: darkMode
                  ? colors.darkTextOfTask
                  : colors.lightTextOfTask,
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonAction,
              { borderColor: colors.filterButtonBorder },
            ]}
            onPress={cancelEditing}
          >
            <Text
              style={{
                color: darkMode
                  ? colors.darkTextOfTask
                  : colors.lightTextOfTask,
              }}
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
          onPress={() => startEditing(task.id)}
        >
          <Text
            style={{
              color: darkMode ? colors.darkTextOfTask : colors.lightTextOfTask,
            }}
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
        onPress={() => onDeleteTask(task.id)}
      >
        <Text
          style={{
            color: darkMode ? colors.darkTextOfTask : colors.lightTextOfTask,
          }}
        >
          Delete
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  buttonAction: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
});

export default TaskItem;
