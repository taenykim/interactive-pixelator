import React from "react";

const Pixel = ({ pixelSize, updatePixelSize }) => {
  return <input type="range" value={pixelSize} onChange={(e) => updatePixelSize(e)} min={10} max={140} />;
};

export default Pixel;
