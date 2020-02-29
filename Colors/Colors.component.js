import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import { ColorPicker } from "react-native-color-picker";
import Swiper from "react-native-swiper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Loader from "../../common/Loader";
import Success from "../../common/Success";
import Infobox from "../../common/infobox";

export default Colours = ({
  tunnelUrl,
  currentColors,
  isBoxChecked,
  colorPropsList,
  colorSelectedCallback,
  infoContent,
  isInfoboxOpen,
  animationType,
  setAnimationType,
  handleInfobox,
  handleCheckbox
}) => {
  if (currentColors.length === 0 || isBoxChecked.length === 0)
    return <Loader />;

  return (
    <Swiper
      style={{ backgroundColor: "#1A1A1A" }}
      dotColor="#fff"
      activeDotColor="#EFB600"
      onIndexChanged={() => {
        handleInfobox(0, false, true);
      }}
    >
      {colorPropsList.map((prop, index) => {
        return (
          <View key={index} style={styles.swiperContainer}>
            {isInfoboxOpen[index] ? (
              <Infobox
                title={prop[1]}
                content={infoContent[index]}
                closePress={() => handleInfobox(index, false)}
              />
            ) : null}
            <CheckBox
              containerStyle={styles.checkbox}
              title="Show in MetaTrader"
              checked={false}
              tintColors={("#fff", "#fff")}
              checked={isBoxChecked[index]}
              onPress={() => handleCheckbox(index)}
            />
            <View style={{ position: "relative" }}>
              <Text style={styles.header}>{prop[1]}</Text>
              <FontAwesome5
                name={"question-circle"}
                style={styles.iconQuestion}
                onPress={() => handleInfobox(index, true)}
              />
            </View>
            <ColorPicker
              defaultColor={currentColors[index]}
              style={styles.colorPicker}
              onColorSelected={color =>
                colorSelectedCallback(
                  tunnelUrl,
                  isBoxChecked,
                  setAnimationType,
                  prop[0],
                  color,
                  index
                )
              }
            />
            {animationType === "loader" ? <Loader alignBottom /> : null}
            {animationType === "success" ? <Success bottom={50} /> : null}
          </View>
        );
      })}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  swiperContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  header: {
    marginBottom: 30,
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    opacity: 0.6,
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  checkbox: {
    position: "absolute",
    top: 30
  },
  iconQuestion: {
    color: "#fff",
    fontSize: 20,
    opacity: 0.6,
    position: "absolute",
    right: -15,
    top: -15
  },
  colorPicker: {
    width: 300,
    height: 300
  }
});
