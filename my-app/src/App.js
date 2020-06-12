import React, { useState } from "react";
import "./App.css";
import UploadContainer from "./components/UploadContainer";
import CanvasContainer from "./components/CanvasContainer";
import Color from "./components/Color";
import Pixel from "./components/Pixel";
import Grid from "./components/Grid";

const App = () => {
  const [imageData, setImageData] = useState(null);
  const [pixelSize, setPixelSize] = useState(100);
  const [gridSize, setGridSize] = useState(5);

  const handleUpdateImageData = (imageData) => {
    setImageData(imageData);
  };

  const updatePixelSize = (e) => {
    setPixelSize(e.target.value);
  };

  const updateGridSize = (e) => {
    setGridSize(e.target.value);
  };

  return (
    <div className="App">
      <div id="controller">
        color
        <Color />
        pixel size
        <Pixel pixelSize={pixelSize} updatePixelSize={updatePixelSize} />
        grid size
        <Grid gridSize={gridSize} updateGridSize={updateGridSize} />
      </div>
      <div id="upload-wrapper">{!imageData ? <UploadContainer updateImageData={handleUpdateImageData} /> : <CanvasContainer image={imageData} pixelSize={pixelSize} gridSize={gridSize} />}</div>
    </div>
  );
};

export default App;
