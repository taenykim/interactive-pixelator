import React, { useState } from "react";
import "./App.css";
import UploadContainer from "./components/UploadContainer";
import CanvasContainer from "./components/CanvasContainer";
import Color from "./components/Color";

const App = () => {
  const [canvasData, setCanvasData] = useState(null);

  const handleUpdateCanvasData = (canvasData) => {
    setCanvasData(canvasData);
  };

  return (
    <div className="App">
      <Color />
      <div id="upload-wrapper">{!canvasData ? <UploadContainer updateCanvasData={handleUpdateCanvasData} /> : <CanvasContainer canvasData={canvasData} />}</div>
    </div>
  );
};

export default App;
