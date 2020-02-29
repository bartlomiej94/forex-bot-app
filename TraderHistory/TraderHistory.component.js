import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Loader from "../../common/Loader";
import { LinearGradient } from "expo-linear-gradient";

export default TraderHistory = ({
  hasLoaded,
  isLoading,
  openPositions,
  toPriceFormat
}) => {
  // Colors.
  const lightRed = "#ff1a1a";
  const darkRed = "#1a0000";
  const lightBlue = "#1a75ff";
  const darkBlue = "#000a1a";

  if (!hasLoaded || isLoading !== "") return <Loader />;

  return (
    <View style={[styles.container, { backgroundColor: "#1A1A1A" }]}>
      {openPositions.map((pos, index) => {
        return (
          <LinearGradient
            colors={
              pos.profit < 0 ? [darkRed, lightRed] : [darkBlue, lightBlue]
            }
            key={index}
            style={styles.positionContainer}
            start={[0.3, 0.5]}
            end={[1, 1]}
          >
            <View style={styles.contentLeft}>
              <Text style={styles.symbol}>{pos.symbol}</Text>
              <Text
                style={[
                  styles.type,
                  pos.type === "sell"
                    ? { color: "#ff8080" }
                    : { color: "#80b3ff" }
                ]}
              >
                {pos.type}
              </Text>
            </View>
            <View style={styles.contentCenter}>
              <Text style={styles.size}>{pos.size}</Text>
            </View>
            <View style={styles.contentRight}>
              <Text style={styles.profit}>
                £
                {pos.profit < 0
                  ? `-${toPriceFormat(pos.profit * -1)}`
                  : toPriceFormat(pos.profit)}
              </Text>
            </View>
          </LinearGradient>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  positionContainer: {
    height: 75,
    borderBottomColor: "#804d00",
    borderBottomWidth: 1,
    flexDirection: "row"
  },
  contentLeft: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10
  },
  contentCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 30
  },
  contentRight: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20
  },
  symbol: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    opacity: 0.5
  },
  type: {
    fontSize: 12,
    fontWeight: "bold",
    opacity: 0.5,
    textTransform: "uppercase"
  },
  profit: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    opacity: 0.75
  },
  size: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    opacity: 0.6
  },
  time: {
    color: "#fff",
    fontSize: 8,
    opacity: 0.6,
    marginTop: -10,
    marginBottom: 10
  }
});
