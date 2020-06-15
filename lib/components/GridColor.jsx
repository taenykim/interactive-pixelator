import React from "react";

const GridColor = ({ gridColor, updateGridColor }) => {
  return <input type="text" value={gridColor} onChange={(e) => updateGridColor(e)} />;
};

export default GridColor;
