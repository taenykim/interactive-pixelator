import React from "react";
import { useEffect } from "react";

const PixelType = ({ id, pixelType, updatePixelType }) => {
  useEffect(() => {
    const container = document.getElementById(`pixeltype-radio-container${id}`);
    const matches = container.querySelectorAll("input");
    for (let i = 0; i < matches.length; i++) {
      if (matches[i].value === pixelType) {
        matches[i].setAttribute("checked", true);
        return;
      }
    }
  }, [pixelType]);
  return (
    <div id={`pixeltype-radio-container${id}`}>
      <div>
        <input type="radio" id={`radio-square` + id} value="square" name={`pixeltype` + id} onChange={() => updatePixelType("square")} />
        <label htmlFor={`radio-square` + id}>Square</label>
        <input type="radio" id={`radio-roundsquare` + id} value="roundsquare" name={`pixeltype` + id} onChange={() => updatePixelType("roundsquare")} />
        <label htmlFor={`radio-roundsquare` + id}>Round Square</label>
      </div>
      <input type="radio" id={`radio-original` + id} value="original" name={`pixeltype` + id} onChange={() => updatePixelType("original")} />
      <label htmlFor={`radio-original` + id}>Original</label>
      <input type="radio" id={`radio-circle` + id} value="circle" name={`pixeltype` + id} onChange={() => updatePixelType("circle")} />
      <label htmlFor={`radio-circle` + id}>Circle</label>
    </div>
  );
};

export default PixelType;
