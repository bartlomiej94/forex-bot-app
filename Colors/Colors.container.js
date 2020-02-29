//This component exchanges data between the server in regards to Trading Platform's charting data (colors).

import React, { useState, useEffect } from "react";
import ColorsComponent from "./Colors.component";
import fetchData from "./fetch";

export default Colours = ({ navigation }) => {
  const [currentColors, setCurrentColors] = useState([]);
  const [animationType, setAnimationType] = useState("none");
  const [isBoxChecked, setIsBoxChecked] = useState([]);
  const [isInfoboxOpen, setIsInfoboxOpen] = useState(Array(5).fill(false));

  const tunnelUrl = navigation.getParam("tunnelUrl");

  const colorPropsList = [
    ["PriceLevelTrigger", "PL: Unhit trigger"],
    ["PriceLevelTriggerActive", "PL: Active trigger"],
    ["ScheduledSLTrigger", "Scheduled SL: Trigger"],
    ["ScheduledSLNewSL", "Scheduled SL: New SL"],
    ["BreakEven", "Break even"]
  ];

  const infoContent = [
    "Stands for 'Price levels: Unhit trigger'. This will draw a line on a MetaTrader chart if the trigger value is set. It will retain this colour until s price hits this level.",
    "Stands for 'Price levels: Active trigger'. This will draw a line on a MetaTrader chart if the trigger value has been hit.",
    "Stands for 'Scheduled stop loss: Trigger'. This will draw a line on a MetaTrader chart for the trigger level if scheduled stop loss is set.",
    "Stands for 'Scheduled stop loss: New stop loss'. This will draw a line on a MetaTrader chart for the new stop loss level if scheduled stop loss is set.",
    "This will draw a line on a MetaTrader chart for the break even level if break even is set."
  ];

  useEffect(() => {
    fetchData.getCurrentColors(tunnelUrl, setCurrentColors);
    fetchData.getCurrentCheckboxes(tunnelUrl, setIsBoxChecked);
  }, []);

  const handleCheckbox = index => {
    const status = isBoxChecked[index];
    const statusArr = [...isBoxChecked];

    statusArr[index] = !status;

    setIsBoxChecked(statusArr);
  };

  const handleInfobox = (index, shouldOpen, resetAll = false) => {
    const infoboxArr = [...isInfoboxOpen];

    if (resetAll) {
      for (let i = 0; i < infoboxArr.length; i++) {
        infoboxArr[i] = false;
      }
    } else {
      infoboxArr[index] = shouldOpen;
    }

    setIsInfoboxOpen(infoboxArr);
  };

  return (
    <ColorsComponent
      tunnelUrl={tunnelUrl}
      currentColors={currentColors}
      isBoxChecked={isBoxChecked}
      colorPropsList={colorPropsList}
      colorSelectedCallback={fetchData.colorSelectedCallback}
      infoContent={infoContent}
      isInfoboxOpen={isInfoboxOpen}
      animationType={animationType}
      setAnimationType={setAnimationType}
      handleInfobox={handleInfobox}
      handleCheckbox={handleCheckbox}
    />
  );
};
