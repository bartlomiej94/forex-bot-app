import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../../common/button";

export default TunnelSettings = ({ navigation }) => {
  const { navigate } = navigation;
  return (
    <View style={[styles.container, { backgroundColor: "#004d00" }]}>
      <Text style={styles.header}>Tunnel settings</Text>
      <Button
        onPress={() => navigate("Settings_Tunnel_Url")}
        label="Change URL"
        isLong
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    opacity: 0.6,
    textAlign: "center"
  }
});
