import React, { useState, useEffect } from "react";
import "./App.css";
import Color from "./components/Color";
import Pixel from "./components/Pixel";
import Grid from "./components/Grid";
import GridColor from "./components/GridColor";
import PixelType from "./components/PixelType";
import DownloadButton from "./components/DownloadButton";
import { Pixelator, PixelImage } from "interactive-pixelator";

const App = () => {
  const [pixelSize, setPixelSize] = useState(100);
  const [gridSize, setGridSize] = useState(5);
  const [gridColor, setGridColor] = useState("#ffffff");
  const [pixelType, setPixelType] = useState("square");

  const updatePixelSize = (e: any) => {
    setPixelSize(e.target.value);
  };

  const updateGridSize = (e: any) => {
    setGridSize(e.target.value);
  };

  const updateGridColor = (e: any) => {
    setGridColor(e.target.value);
  };

  const updatePixelType = (type: string) => {
    setPixelType(type);
  };

  const downloadHandler = () => {
    const link = document.createElement("a");
    const canvas: any = document.getElementById("upload-wrapper-canvas");
    if (!canvas) return;
    link.download = "filename.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  useEffect(() => {}, []);

  useEffect(() => {
    new PixelImage("upload-wrapper", "./ralph-sample.jpg", pixelSize, gridSize, gridColor, pixelType);
  }, [pixelSize, gridSize, gridColor, pixelType]);

  return (
    <div>
      <div className="App">Demo(PC)</div>
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
        <div id="upload-wrapper"></div>
      </div>
    </div>
  );
};

export default App;
