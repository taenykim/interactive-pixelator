import React, { useState } from "react";
import "./App.css";
import UploadContainer from "./components/UploadContainer";
import CanvasContainer from "./components/CanvasContainer";

const App = () => {
  const [canvasData, setCanvasData] = useState(null);

  const handleUpdateCanvasData = (canvasData) => {
    setCanvasData(canvasData);
  };

  return (
    <div className="App">
      <div id="upload-wrapper">{!canvasData ? <UploadContainer updateCanvasData={handleUpdateCanvasData} /> : <CanvasContainer canvasData={canvasData} />}</div>
    </div>
  );
};

export default App;
