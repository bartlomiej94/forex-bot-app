import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default ButtonSm = ({ label, icon, onPress, alignTop = false }) => {
  return (
    <View style={[styles.container, alignTop ? { ...styles.alignTop } : null]}>
      <TouchableOpacity style={styles.square} onPress={onPress}>
        <FontAwesome5 name={icon} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    marginBottom: 30
  },
  square: {
    height: 75,
    width: 75,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  icon: {
    fontSize: 42
  },
  label: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
    opacity: 0.8,
    position: "absolute",
    bottom: -25
  },
  alignTop: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0
  }
});
