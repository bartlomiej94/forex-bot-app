import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Button from "./../../common/button";
import { AsyncStorage } from "react-native";
import TunnelUrlWindow from "./../../common/tunnelUrlWindow";

export default TunnelChangeUrl = () => {
  const [newTunnelUrlLocal, setNewTunnelUrlLocal] = useState("");
  const [currentTunnelUrlLocal, setCurrentTunnelUrlLocal] = useState("");
  const [newTunnelUrlOutbound, setNewTunnelUrlOutbound] = useState("");
  const [currentTunnelUrlOutbound, setCurrentTunnelUrlOutbound] = useState("");

  const AS_getCurrentTunnelUrlLocal = async () => {
    try {
      const key = "@Fx_tunnelUrlLocal";
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setNewTunnelUrlLocal(value);
      }
    } catch (error) {
      console.log(`Error: Couldn't get local data ${key}. ${error}`);
    }
  };

  const AS_getCurrentTunnelUrlOutbound = async () => {
    try {
      const key = "@Fx_tunnelUrlOutbound";
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setNewTunnelUrlOutbound(value);
      }
    } catch (error) {
      console.log(`Error: Couldn't get local data ${key}. ${error}`);
    }
  };

  const handleTunnelUrlChange = (e, isLocal) => {
    let value = e.nativeEvent.text.trim();
    isLocal
      ? setCurrentTunnelUrlLocal(value)
      : setCurrentTunnelUrlOutbound(value);
  };

  useEffect(() => {
    AS_getCurrentTunnelUrlLocal();
    AS_getCurrentTunnelUrlOutbound();
  }, []);

  return (
    <View style={styles.container}>
      <TunnelUrlWindow
        handleTunnelUrlChange={handleTunnelUrlChange}
        isLocal={true}
        currentTunnelUrl={currentTunnelUrlLocal}
        newTunnelUrl={newTunnelUrlLocal}
        setNewTunnelUrl={setNewTunnelUrlLocal}
        setCurrentTunnelUrl={setCurrentTunnelUrlLocal}
        label="Local"
        info="Used by the other trader to access your data."
      />
      <TunnelUrlWindow
        handleTunnelUrlChange={handleTunnelUrlChange}
        isLocal={false}
        currentTunnelUrl={currentTunnelUrlOutbound}
        newTunnelUrl={newTunnelUrlOutbound}
        setNewTunnelUrl={setNewTunnelUrlOutbound}
        setCurrentTunnelUrl={setCurrentTunnelUrlOutbound}
        label="Outbound"
        info="Used to access other trader's data."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: "#1A1A1A"
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    opacity: 0.6,
    textAlign: "center"
  },
  textSm: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: "bold",
    color: "#fff",
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
    color: "#fff"
  },
  noMarginTop: {
    marginTop: 0
  }
});
