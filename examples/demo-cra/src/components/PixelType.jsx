import React from "react";
import { useEffect } from "react";

const PixelType = ({ pixelType, updatePixelType }) => {
  useEffect(() => {
    const container = document.getElementById("pixeltype-radio-container");
    const matches = container.querySelectorAll("input");
    for (let i = 0; i < matches.length; i++) {
      if (matches[i].value === pixelType) {
        matches[i].setAttribute("checked", true);
        return;
      }
    }
  }, [pixelType]);
  return (
    <div id="pixeltype-radio-container">
      <div>
        <input type="radio" id="radio-square" value="square" name="pixel-type" onChange={() => updatePixelType("square")} />
        <label htmlFor="radio-square">Square</label>
        <input type="radio" id="radio-roundsquare" value="roundsquare" name="pixel-type" onChange={() => updatePixelType("roundsquare")} />
        <label htmlFor="radio-roundsquare">Round Square</label>
      </div>
      <input type="radio" id="radio-original" value="original" name="pixel-type" onChange={() => updatePixelType("original")} />
      <label htmlFor="radio-original">Original</label>
      <input type="radio" id="radio-circle" value="circle" name="pixel-type" onChange={() => updatePixelType("circle")} />
      <label htmlFor="radio-circle">Circle</label>
    </div>
  );
};

export default PixelType;
