import React, { useState, useEffect } from "react";
import "./App.css";
import Color from "./components/Color";
import Pixel from "./components/Pixel";
import Grid from "./components/Grid";
import GridColor from "./components/GridColor";
import PixelType from "./components/PixelType";
import DownloadButton from "./components/DownloadButton";
import { Pixelator } from "interactive-pixelator";
import FilterType from "./components/FilterType";

const App = () => {
  const [pixelSize1, setPixelSize1] = useState(100);
  const [gridSize1, setGridSize1] = useState(5);
  const [gridColor1, setGridColor1] = useState("#ffffff");
  const [pixelType1, setPixelType1] = useState("square");
  const [filterType1, setFilterType1] = useState("none");
  const [pixelSize2, setPixelSize2] = useState(100);
  const [gridSize2, setGridSize2] = useState(5);
  const [gridColor2, setGridColor2] = useState("#ffffff");
  const [pixelType2, setPixelType2] = useState("square");
  const [filterType2, setFilterType2] = useState("none");
  const [imageSrc, setImageSrc] = useState("");
  const [controllerState1, setControllerState1] = useState(true);
  const [controllerState2, setControllerState2] = useState(true);

  const updatePixelSize1 = (e: any) => {
    setPixelSize1(e.target.value);
  };

  const updateGridSize1 = (e: any) => {
    setGridSize1(e.target.value);
  };

  const updateGridColor1 = (e: any) => {
    setGridColor1(e.target.value);
  };

  const updatePixelType1 = (type: string) => {
    setPixelType1(type);
  };

  const updateFilterType1 = (type: string) => {
    setFilterType1(type);
  };

  const downloadHandler1 = () => {
    const link = document.createElement("a");
    const canvas: any = document.getElementById("upload-wrapper-canvas");
    if (!canvas) return;
    link.download = "filename.png";
    link.href = canvas.toDataURL();
    link.click();
  };
  const updatePixelSize2 = (e: any) => {
    setPixelSize2(e.target.value);
  };

  const updateGridSize2 = (e: any) => {
    setGridSize2(e.target.value);
  };

  const updateGridColor2 = (e: any) => {
    setGridColor2(e.target.value);
  };

  const updatePixelType2 = (type: string) => {
    setPixelType2(type);
  };

  const updateFilterType2 = (type: string) => {
    setFilterType2(type);
  };

  const downloadHandler2 = () => {
    const link = document.createElement("a");
    const canvas: any = document.getElementById("upload-wrapper2-canvas");
    if (!canvas) return;
    link.download = "filename.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const hideButtonHandler = (where: number) => {
    const controller = document.getElementById(`controller${where}`);
    if (where === 1) {
      if (controller && controllerState1) {
        controller.style.display = `none`;
      } else if (controller && !controllerState1) {
        controller.style.display = `flex`;
      }
      setControllerState1(!controllerState1);
    } else if (where === 2) {
      if (controller && controllerState2) {
        controller.style.display = `none`;
      } else if (controller && !controllerState2) {
        controller.style.display = `flex`;
      }
      setControllerState2(!controllerState2);
    }
    console.log(controller);
  };

  useEffect(() => {
    new Pixelator("upload-wrapper2", imageSrc, { pixelSize: pixelSize2, gridSize: gridSize2, gridColor: gridColor2, pixelType: pixelType2, filterType: filterType2 });
  }, [imageSrc]);

  useEffect(() => {
    new Pixelator("upload-wrapper", "./ralph-sample.jpg", { pixelSize: pixelSize1, gridSize: gridSize1, gridColor: gridColor1, pixelType: pixelType1, filterType: filterType1 });
    new Pixelator("upload-wrapper2", imageSrc, { pixelSize: pixelSize2, gridSize: gridSize2, gridColor: gridColor2, pixelType: pixelType2, filterType: filterType2 });
  }, [pixelSize1, gridSize1, gridColor1, pixelType1, pixelSize2, gridSize2, gridColor2, pixelType2, filterType1, filterType2]);

  return (
    <div>
      <div id="main" className="App">
        <div style={{ fontSize: "22px" }}>
          <a href="https://github.com/taenykim/interactive-pixelator" target="_blank">
            github
          </a>{" "}
          /{" "}
          <a href="https://www.npmjs.com/package/interactive-pixelator" target="_blank">
            npm
          </a>
        </div>
        <div style={{ fontSize: "40px" }}>Interactive Pixelator</div>
        <div style={{ fontSize: "16px" }}>🔽 scroll please ! 🔽</div>
      </div>
      <div className="App">
        <button className="contoller-hide-button" onClick={() => hideButtonHandler(1)}>
          {controllerState1 ? `hide` : `show`}
        </button>
        <div id={`controller${1}`} className="controller">
          color
          <Color />
          pixel size
          <Pixel pixelSize={pixelSize1} updatePixelSize={updatePixelSize1} />
          grid color
          <GridColor gridColor={gridColor1} updateGridColor={updateGridColor1} />
          grid size
          <Grid gridSize={gridSize1} updateGridSize={updateGridSize1} />
          pixel type
          <PixelType id={`1`} pixelType={pixelType1} updatePixelType={updatePixelType1} />
          image filter
          <FilterType id={`1`} filterType={filterType1} updateFilterType={updateFilterType1} />
          <DownloadButton downloadHandler={downloadHandler1} />
        </div>
        <div id="upload-wrapper"></div>
      </div>
      <div className="App">
        <button className="contoller-hide-button" onClick={() => hideButtonHandler(2)}>
          {controllerState2 ? `hide` : `show`}
        </button>
        <div id={`controller${2}`} className="controller">
          color
          <Color />
          pixel size
          <Pixel pixelSize={pixelSize2} updatePixelSize={updatePixelSize2} />
          grid color
          <GridColor gridColor={gridColor2} updateGridColor={updateGridColor2} />
          grid size
          <Grid gridSize={gridSize2} updateGridSize={updateGridSize2} />
          pixel type
          <PixelType id={`2`} pixelType={pixelType2} updatePixelType={updatePixelType2} />
          image filter
          <FilterType id={`2`} filterType={filterType2} updateFilterType={updateFilterType2} />
          <DownloadButton downloadHandler={downloadHandler2} />
        </div>
        <div id="upload-wrapper2">
          <label htmlFor="upload" className="upload-label">
            <p className="upload-description">UPLOAD IMAGE</p>
            <img className="upload-imgBtn" src="https://uploads.codesandbox.io/uploads/user/1dcc6c5f-ac13-4c27-b2e3-32ade1d213e9/2Go1-photo.svg" />
          </label>
          <div>
            <input
              type="file"
              accept="image/*"
              id="upload"
              className="image-upload"
              hidden
              onChange={(e: any) => {
                e.stopPropagation();
                const reader = new FileReader();

                reader.onload = (event: any) => {
                  const img = new Image();
                  const imgURL = event.target.result as string;
                  img.src = imgURL;

                  img.onload = () => {
                    setImageSrc(img.src);
                  };
                };
                reader.readAsDataURL(e.target.files[0]);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
