import React, { useState, useEffect } from "react";
import Loader from "../../common/Loader";
import TraderHistoryComponent from "./TraderHistory.component";

export default TraderHistory = ({ navigation }) => {
  const [openPositions, setOpenPositions] = useState();
  const [isLoading, setIsLoading] = useState("Loading...");
  const [currentPage, setCurrentPage] = useState(0);
  const [allPages, setAllPages] = useState();
  let hasLoaded = typeof openPositions === "object";

  const tunnelUrl = navigation.getParam("tunnelUrl");
  const pageSize = 30;

  const APIGetOpenPositions = (page = 1) => {
    if (page === currentPage) return;

    const url = `http://${tunnelUrl}.ngrok.io/GET_history`;
    const query = `?page=${page}`;

    setIsLoading("Loading...");

    fetch(url + query)
      .then(res => res.json())
      .then(data => {
        setIsLoading("");
        setOpenPositions(data);
        setCurrentPage(page);
        APIGetDataLength();
      });
  };

  const APIGetDataLength = () => {
    const url = `http://${tunnelUrl}.ngrok.io/GET_history`;
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

  useEffect(() => {
    APIGetOpenPositions();
  }, []);

  if (!hasLoaded || isLoading !== "") return <Loader />;

  return (
    <TraderHistoryComponent
      hasLoaded={hasLoaded}
      isLoading={isLoading}
      openPositions={openPositions}
      toPriceFormat={toPriceFormat}
    />
  );
};
