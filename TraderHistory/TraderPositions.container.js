import React, { useState, useEffect } from "react";
import TraderPositionsComponent from "./TraderPositions.component";

export default TraderPositions = ({ navigation }) => {
  const [positions, setPositions] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [timePeriod, setTimePeriod] = useState("Last week");
  const [allPages, setAllPages] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const tunnelUrl = navigation.getParam("tunnelUrl");
  const route = navigation.getParam("isLive") ? "live" : "history";
  const pageSize = 30;

  useEffect(() => {
    fetchPositions();
  }, []);

  useEffect(() => {
    if (typeof positions === "object" || typeof positions === "string")
      setIsLoading(false);
  }, [positions]);

  const fetchPositions = (page = 1) => {
    if (page === currentPage) return;

    const url = `http://${tunnelUrl}.ngrok.io/GET_${route}`;
    const query = `?page=${page}`;
    const errMessage =
      "This normally happens when there's no Internet connection, your tunnel URL is invalid or your local server isn't running.";

    fetch(url + query)
      .then(res => {
        if (res.ok) return res.json();
        else return setPositions(errMessage);
      })
      .then(data => {
        if (data) {
          setPositions(data);
          //setCurrentPage(page);
          //fetchDataLength();
        } else {
          setPositions(errMessage);
        }
      });
  };

  const fetchDataLength = () => {
    const url = `http://${tunnelUrl}.ngrok.io/GET_${route}`;
    const query = "?filter=length";

    fetch(url + query)
      .then(res => res.json())
      .then(data => {
        setAllPages(Math.ceil(data / pageSize));
      });
  };

  const sumObjectValues = (total, num) => {
    return (parseFloat(total) + parseFloat(num)).toFixed(2);
  };

  const toPriceFormat = price => {
    let splitPrice = price.toString().split(".");
    let postfix;

    if (splitPrice[1]) {
      if (splitPrice[1].length === 1) postfix = `${splitPrice[1]}0`;
      else postfix = splitPrice[1];
    } else {
      postfix = "00";
    }

    return `${splitPrice[0]}.${postfix}`;
  };

  const handleTimePeriod = () => {
    switch (timePeriod) {
      case "Today":
        setTimePeriod("Last week");
        break;
      case "Last week": {
        setTimePeriod("Last month");
        break;
      }
      case "Last month":
        setTimePeriod("All times");
        break;
      default:
        setTimePeriod("Today");
    }
  };

  return (
    <TraderPositionsComponent
      isLoading={isLoading}
      positions={positions}
      timePeriod={timePeriod}
      handleTimePeriod={handleTimePeriod}
      toPriceFormat={toPriceFormat}
    />
  );
};
