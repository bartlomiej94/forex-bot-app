import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";

export default ErrorPage = ({
  isError,
  title,
  message,
  color,
  isOverlay,
  onClose
}) => {
  return (
    <View
      style={[styles.container, isOverlay ? styles.containerOverlay : null]}
    >
      <View style={styles.boxContainer}>
        <Text style={[styles.boxHeader, { color }]}>{title}</Text>
        <LinearGradient
          colors={["#262626", "#1A1A1A", "#1A1A1A", "#262626"]}
          locations={[0, 0.25, 0.75, 1]}
          style={styles.pingContainer}
          start={[0, 0]}
          end={[1, 0]}
        >
          <LottieView
            style={styles.pingItem}
            source={
              isError
                ? require("./../../../lottie/error.json")
                : require("./../../../lottie/cloud.json")
            }
            autoPlay
            resizeMode="cover"
          />
        </LinearGradient>

        <Text style={[styles.boxMessage, { color }]}>{message}</Text>
        <View style={styles.exitButtonContainer}>
          <Text onPress={onClose} style={styles.exitButtonLabel}>
            EXIT
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A1A1A"
  },
  containerOverlay: {
    position: "absolute",
    top: 150,
    zIndex: 9999
  },
  pingContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flex: 1
  },
  pingItem: {
    width: 100,
    height: 100
  },

  boxContainer: {
    position: "relative",
    width: 300,
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#262626",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12
  },
  boxHeader: {
    width: 260,
    opacity: 0.8,
    fontSize: 20,
    paddingTop: 30,
    paddingBottom: 30,
    textAlign: "center",
    borderBottomColor: "rgba(80,80,80,0.75)",
    borderBottomWidth: 1
  },
  boxMessage: {
    opacity: 0.8,
    fontSize: 12,
    width: 260,
    paddingTop: 60,
    paddingBottom: 60,
    textAlign: "center",
    borderTopColor: "rgba(80,80,80,0.75)",
    borderTopWidth: 1
  },

  exitButtonContainer: {
    position: "absolute",
    bottom: -20,
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#1A1A1A",
    borderRadius: 12
  },
  exitButtonLabel: {
    color: "#fff",
    opacity: 0.8,
    fontWeight: "bold",
    fontSize: 12
  }
});
