import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface FiltersProps {
  darkMode: boolean;
  filter: "all" | "done" | "notdone";
  setFilter: React.Dispatch<React.SetStateAction<"all" | "done" | "notdone">>;
}

const Filters: React.FC<FiltersProps> = ({ darkMode, filter, setFilter }) => {
  const colors = {
    darkButtonBackground: "#555555",
    lightButtonBackground: "#add8e6",
    filterButtonBorder: "#cccccc",
  };

  return (
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
        <Text style={{ color: darkMode ? "#ffffff" : "#000000" }}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterButton,
          filter === "done" && styles.activeFilterButton,
          {
            backgroundColor: darkMode
              ? colors.darkButtonBackground
              : colors.lightButtonBackground,
            borderColor: colors.filterButtonBorder,
          },
        ]}
        onPress={() => setFilter("done")}
      >
        <Text style={{ color: darkMode ? "#ffffff" : "#000000" }}>Done</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterButton,
          filter === "notdone" && styles.activeFilterButton,
          {
            backgroundColor: darkMode
              ? colors.darkButtonBackground
              : colors.lightButtonBackground,
            borderColor: colors.filterButtonBorder,
          },
        ]}
        onPress={() => setFilter("notdone")}
      >
        <Text style={{ color: darkMode ? "#ffffff" : "#000000" }}>NotDone</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    width: "100%",
  },
  filterButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    width: "30%",
  },
  activeFilterButton: {
    backgroundColor: "lightblue",
  },
});

export default Filters;
