const componentToHex = c => {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

const rgbToHex = (r, g, b) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

const hexToRgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
};

export default fetchData = {
  colorSelectedCallback: (
    tunnelUrl,
    isBoxChecked,
    setAnimationType,
    propName,
    color,
    index
  ) => {
    setAnimationType("loader");
    const rgb = hexToRgb(color);
    const MT4Color = `${rgb.r}$${rgb.g}$${rgb.b}$`;
    const url = `http://${tunnelUrl}.ngrok.io/REPLACE_settingsColors`;
    const query = `?target=${propName}|${MT4Color},DISPLAY_${propName}|${
      isBoxChecked[index] ? "1" : "0"
    }`;

    fetch(url + query, {
      method: "post",
      headers: { "Content-type": "application/x-www-form-urlencoded" }
    }).then(res => {
      if (res.status === 200) {
        setAnimationType("success");
      }
    });
  },

  getCurrentCheckboxes: (tunnelUrl, setIsBoxChecked) => {
    const url = `http://${tunnelUrl}.ngrok.io/GET_settingsColors`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const checkboxes = [];

        Object.keys(data[0]).forEach(key => {
          // Get checkbox data.
          if (key.split("_")[0] === "DISPLAY") {
            checkboxes.push(data[0][key] == 1 ? true : false);
          }
        });

        setIsBoxChecked(checkboxes);
      });
  },

  getCurrentColors: (tunnelUrl, setCurrentColors) => {
    const url = `http://${tunnelUrl}.ngrok.io/GET_settingsColors`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const colors = [];

        Object.keys(data[0]).forEach(key => {
          // Ignore data related to displaying lines in MT4.
          if (key.split("_")[0] !== "DISPLAY") {
            const rgb = data[0][key].split("$");

            const hex = rgbToHex(
              parseInt(rgb[0]),
              parseInt(rgb[1]),
              parseInt(rgb[2])
            );

            colors.push(hex);
          }
        });
        setCurrentColors(colors);
      });
  }
};
