import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Loader from "../../common/Loader";
import ErrorPage from "./../../common/ErrorPage";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";

export default TraderPositionsComponent = ({
  isLoading,
  positions,
  timePeriod,
  handleTimePeriod,
  toPriceFormat
}) => {
  // Colors.
  const lightRed = "#ff1a1a";
  const darkRed = "#1a0000";
  const lightBlue = "#1a75ff";
  const darkBlue = "#000a1a";

  if (isLoading) return <Loader />;
  if (typeof positions === "string")
    return (
      <ErrorPage
        errHeader="Couldn't connect to the server"
        errMessage={positions}
      />
    );

  return (
    <View style={[styles.container, { backgroundColor: "#1A1A1A" }]}>
      {positions.length === 0 ? (
        <Text style={styles.noResults}>No results found.</Text>
      ) : null}
      <ScrollView>
        {positions.map((pos, index) => {
          const { symbol, type, size, profit } = pos;
          const time = pos.time || null;

          return (
            <LinearGradient
              colors={profit < 0 ? [darkRed, lightRed] : [darkBlue, lightBlue]}
              key={index}
              style={styles.positionContainer}
              start={[0.3, 0.5]}
              end={[1, 1]}
            >
              <View style={styles.contentLeft}>
                <Text style={[styles.symbol, symbol ? null : { fontSize: 14 }]}>
                  {symbol || (profit >= 0 ? "DEPOSIT" : "WITHDRAWAL")}
                </Text>
                {symbol ? (
                  <Text
                    style={[
                      styles.type,
                      type === "sell"
                        ? { color: "#ff8080" }
                        : { color: "#80b3ff" }
                    ]}
                  >
                    {type}
                  </Text>
                ) : null}
              </View>
              <View style={styles.contentCenter}>
                <Text style={styles.time}>{time}</Text>
                <Text style={styles.size}>{symbol ? size : null}</Text>
              </View>
              <View style={styles.contentRight}>
                <Text style={styles.profit}>
                  £
                  {profit < 0
                    ? `-${toPriceFormat(profit * -1)}`
                    : toPriceFormat(profit)}
                </Text>
              </View>
            </LinearGradient>
          );
        })}
      </ScrollView>
      <View style={styles.details}>
        <View style={styles.detailsContent}>
          <Text style={styles.detailsHeader}>Positions</Text>
          <Text style={styles.detailsSubtext}>54</Text>
        </View>
        <View style={styles.detailsContent}>
          <TouchableOpacity onPress={handleTimePeriod}>
            <Text style={[styles.detailsSubtext, { opacity: 0.8 }]}>
              {timePeriod}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContent}>
          <Text style={styles.detailsHeader}>Profit</Text>
          <Text style={styles.detailsSubtext}>£54.32</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  positionContainer: {
    height: 75,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
    flexDirection: "row"
  },
  noResults: {
    color: "#fff",
    opacity: 0.5,
    position: "absolute",
    top: "48%",
    left: 0,
    right: 0,
    textAlign: "center"
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
  },
  details: {
    height: 50,
    flexDirection: "row"
  },
  detailsContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopColor: "#333",
    borderTopWidth: 2
  },
  detailsHeader: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 10,
    opacity: 0.8
  },
  detailsSubtext: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  }
});
