import React from "react";
import { useEffect } from "react";
import { resizeImage } from "../utils/resizeImage";

const CanvasContainer = ({ canvasData }) => {
  useEffect(() => {
    window.addEventListener("resize", () => {
      let canvas = document.querySelector("canvas");
      drawCanvas(canvas);
    });
  }, []);

  useEffect(() => {
    let canvas = document.createElement("canvas");
    let canvasContainer = document.getElementById("canvas-container");
    canvasContainer.append(canvas);
    drawCanvas(canvas);
  }, [canvasData]);

  const drawCanvas = (canvas) => {
    const [width, height] = resizeImage(canvasData);
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(canvasData, 0, 0, width, height);
  };

  return <div id="canvas-container"></div>;
};

export default CanvasContainer;
