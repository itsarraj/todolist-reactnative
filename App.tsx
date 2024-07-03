import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppMain from "./src/AppMain";

export default function App() {
  return (
    <View style={styles.container}>
      <AppMain />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
