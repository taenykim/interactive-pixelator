import React, { useState, useEffect } from "react";
import "./App.css";
import UploadContainer from "./components/UploadContainer";
import CanvasContainer from "./components/CanvasContainer";
import Color from "./components/Color";
import Pixel from "./components/Pixel";
import Grid from "./components/Grid";
import GridColor from "./components/GridColor";
import PixelType from "./components/PixelType";
import DownloadButton from "./components/DownloadButton";

const App = () => {
  const [imageData, setImageData] = useState(null);
  const [pixelSize, setPixelSize] = useState(100);
  const [gridSize, setGridSize] = useState(5);
  const [gridColor, setGridColor] = useState("#ffffff");
  const [pixelType, setPixelType] = useState("square");

  const handleUpdateImageData = (imageData) => {
    setImageData(imageData);
  };

  const updatePixelSize = (e) => {
    setPixelSize(e.target.value);
  };

  const updateGridSize = (e) => {
    setGridSize(e.target.value);
  };

  const updateGridColor = (e) => {
    setGridColor(e.target.value);
  };

  const updatePixelType = (type) => {
    setPixelType(type);
  };

  const downloadHandler = () => {
    const link = document.createElement("a");
    const canvas = document.getElementById("canvas");
    if (!canvas) return;
    link.download = "filename.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  useEffect(() => {
    console.log(pixelType);
  }, [pixelType]);

  return (
    <div className="App">
      <div id="controller">
        color
        <Color />
        pixel size
        <Pixel pixelSize={pixelSize} updatePixelSize={updatePixelSize} />
        grid color
        <GridColor gridColor={gridColor} updateGridColor={updateGridColor} />
        grid size
        <Grid gridSize={gridSize} updateGridSize={updateGridSize} />
        pixel type
        <PixelType pixelType={pixelType} updatePixelType={updatePixelType} />
        <DownloadButton downloadHandler={downloadHandler} />
      </div>
      <div id="upload-wrapper">
        {!imageData ? (
          <UploadContainer updateImageData={handleUpdateImageData} />
        ) : (
          <CanvasContainer image={imageData} pixelSize={pixelSize} gridSize={gridSize} gridColor={gridColor} pixelType={pixelType} />
        )}
      </div>
    </div>
  );
};

export default App;
