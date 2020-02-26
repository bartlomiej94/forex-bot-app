import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { AsyncStorage } from "react-native";
import Button from "./button";

export default TunnelUrlWindow = ({
  handleTunnelUrlChange,
  isLocal,
  newTunnelUrl,
  currentTunnelUrl,
  setNewTunnelUrl,
  label,
  info
}) => {
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{label} URL</Text>
      <Text style={styles.textXs}>{info}</Text>
      <Text style={styles.textSm}>CURRENT: http://{newTunnelUrl}.ngrok.io</Text>
      <View style={styles.inputWrap}>
        <Text style={{ ...styles.textSm, ...styles.noMarginTop }}>
          NEW: http://
        </Text>
        <TextInput
          onChange={e => handleTunnelUrlChange(e, isLocal)}
          style={styles.input}
        ></TextInput>
        <Text style={{ ...styles.textSm, ...styles.noMarginTop }}>
          .ngrok.io
        </Text>
      </View>
      <Button
        onPress={() => AS_setNewTunnelUrl(isLocal)}
        label="Update"
        color="#66ff33"
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderColor: "#000",
    borderRadius: 12,
    width: "85%",
    height: 280,
    backgroundColor: "#fff",
    marginBottom: 15,
    marginTop: 15
  },
  header: {
    fontSize: 22,
    paddingTop: 10,
    fontWeight: "bold",
    color: "#000",
    opacity: 0.6,
    textAlign: "center"
  },
  textXs: {
    fontSize: 10,
    marginTop: 5,
    fontWeight: "bold",
    color: "#000",
    opacity: 0.6,
    textAlign: "center"
  },
  textSm: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: "bold",
    color: "#000",
    opacity: 0.6,
    textAlign: "center"
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  input: {
    width: 100,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
    color: "#000"
  },
  noMarginTop: {
    marginTop: 0
  }
});
