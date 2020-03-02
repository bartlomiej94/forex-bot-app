import React, { useState, useEffect } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import LottieView from "lottie-react-native";

export default Success = ({ bottom }) => {
  const [progress, setProgress] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear
    }).start();

    const timeout = setTimeout(() => {
      Animated.timing(progress, {
        toValue: 0,
        duration: 1000,
        easing: Easing.linear
      }).start();
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={[styles.container, { bottom }]}>
      <LottieView
        source={require("./../../lottie/success.json")}
        loop={false}
        progress={progress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    position: "absolute"
  }
});
