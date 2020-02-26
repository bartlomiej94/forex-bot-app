import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, AsyncStorage } from "react-native";
import Button from "./../../common/button";
import TunnelUrlWindow from "./TunnelUrl.component.js";

export default TunnelChangeUrl = () => {
  const [newTunnelUrlLocal, setNewTunnelUrlLocal] = useState("");
  const [currentTunnelUrlLocal, setCurrentTunnelUrlLocal] = useState("");
  const [newTunnelUrlOutbound, setNewTunnelUrlOutbound] = useState("");
  const [currentTunnelUrlOutbound, setCurrentTunnelUrlOutbound] = useState("");

  const AS_getCurrentTunnelUrl = async isLocal => {
    const dest = isLocal ? "Local" : "Outbound";
    
    try {
      const key = `@Fx_tunnelUrl${dest}`;
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        if (isLocal) setNewTunnelUrlLocal(value);
        else setNewTunnelUrlOutbound(value);
      }
    } catch (error) {
      console.log(`Error: Couldn't get ${dest.toLowerCase()} data ${key}. ${error}`);
    }
  };
  
  const AS_setNewTunnelUrl = async isLocal => {
    const key = isLocal ? "@Fx_tunnelUrlLocal" : "@Fx_tunnelUrlOutbound";
    
    try {
      await AsyncStorage.setItem(key, currentTunnelUrl);
      setNewTunnelUrl(currentTunnelUrl);
    } catch (error) {
      console.log(`Error: Couldn't set local data ${key}. ${error}`);
    }
  };

  const handleTunnelUrlChange = (e, isLocal) => {
    let value = e.nativeEvent.text.trim();
    isLocal
      ? setCurrentTunnelUrlLocal(value)
      : setCurrentTunnelUrlOutbound(value);
  };

  useEffect(() => {
    AS_getCurrentTunnelUrl(true);
    AS_getCurrentTunnelUrl(false);
  }, []);

  return (
    <View style={styles.container}>
      <TunnelUrlWindow
        handleTunnelUrlChange={handleTunnelUrlChange}
        isLocal={true}
        currentTunnelUrl={currentTunnelUrl(true)}
        newTunnelUrl={newTunnelUrlLocal}
        setNewTunnelUrl={setNewTunnelUrlLocal}
        setCurrentTunnelUrl={setCurrentTunnelUrlLocal}
        label="Local"
        info="Used by the other trader to access your data."
      />
      <TunnelUrlWindow
        handleTunnelUrlChange={handleTunnelUrlChange}
        isLocal={false}
        currentTunnelUrl={currentTunnelUrl(false)}
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
    backgroundColor: "#004d00"
  }
});
