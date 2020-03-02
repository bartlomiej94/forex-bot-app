import React, { useEffect, useState } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import LottieView from "lottie-react-native";
import globalStyles from "../../globalStyles";

export default Loader = ({ alignBottom }) => {
  return (
    <View style={[alignBottom ? [styles.container] : globalStyles.container]}>
      <LottieView source={require("./../../lottie/loading.json")} autoPlay />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 400,
    position: "absolute",
    bottom: 0
  }
});
