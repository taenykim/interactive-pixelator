import React from "react";

const Grid = ({ gridSize, updateGridSize }) => {
  return <input type="range" value={gridSize} onChange={(e) => updateGridSize(e)} min={1} max={10} />;
};

export default Grid;
