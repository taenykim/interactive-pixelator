import React, { useState } from "react";
import "./App.css";
import UploadContainer from "./components/UploadContainer";
import CanvasContainer from "./components/CanvasContainer";
import Color from "./components/Color";
import Pixel from "./components/Pixel";

const App = () => {
  const [imageData, setImageData] = useState(null);
  const [pixelSize, setPixelSize] = useState(100);

  const handleUpdateImageData = (imageData) => {
    setImageData(imageData);
  };

  const updatePixelSize = (e) => {
    setPixelSize(e.target.value);
  };

  return (
    <div className="App">
      <div id="controller">
        color
        <Color />
        pixel size
        <Pixel pixelSize={pixelSize} updatePixelSize={updatePixelSize} />
      </div>
      <div id="upload-wrapper">{!imageData ? <UploadContainer updateImageData={handleUpdateImageData} /> : <CanvasContainer image={imageData} pixelSize={pixelSize} />}</div>
    </div>
  );
};

export default App;
