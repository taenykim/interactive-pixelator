import React, { useState } from "react";
import "./App.css";
import UploadContainer from "./components/UploadContainer";
import CanvasContainer from "./components/CanvasContainer";
import Color from "./components/Color";

const App = () => {
  const [imageData, setImageData] = useState(null);

  const handleUpdateImageData = (imageData) => {
    setImageData(imageData);
  };

  return (
    <div className="App">
      <Color />
      <div id="upload-wrapper">{!imageData ? <UploadContainer updateImageData={handleUpdateImageData} /> : <CanvasContainer image={imageData} />}</div>
    </div>
  );
};

export default App;
