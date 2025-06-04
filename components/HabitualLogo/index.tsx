import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HabitualLogo({ isText = true }: { isText?: boolean }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.square}>
          <View style={styles.checkMarkStem} />
          <View style={styles.checkMarkArm} />
        </View>
      </View>
      {isText && <Text style={styles.text}>Habitual</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginRight: 12,
  },
  square: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#533D85",
    justifyContent: "center",
    alignItems: "center",
  },
  checkMarkStem: {
    position: "absolute",
    width: 4,
    height: 16,
    backgroundColor: "white",
    left: 14,
    top: 10,
    transform: [{ rotate: "45deg" }],
    borderRadius: 2,
  },
  checkMarkArm: {
    position: "absolute",
    width: 4,
    height: 9,
    backgroundColor: "white",
    left: 20,
    top: 17,
    transform: [{ rotate: "-45deg" }],
    borderRadius: 2,
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
    letterSpacing: 1.4,
  },
});
