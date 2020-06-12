import React from "react";
import { useEffect } from "react";
import { drawCanvas } from "../utils/drawCanvas";

const CanvasContainer = ({ image, pixelSize, gridSize }) => {
  let canvas;

  // consider useEffect order
  useEffect(() => {
    canvas = document.createElement("canvas");
    canvas.id = "canvas";
    let canvasContainer = document.getElementById("canvas-container");
    canvasContainer.append(canvas);
    drawCanvas(canvas, image, pixelSize, gridSize);
  }, [image]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      drawCanvas(canvas, image, pixelSize, gridSize);
    });
  }, [canvas, pixelSize, gridSize]);

  useEffect(() => {
    canvas = document.querySelector("#canvas");
    drawCanvas(canvas, image, pixelSize, gridSize);
  }, [pixelSize, gridSize]);

  return <div id="canvas-container"></div>;
};

export default CanvasContainer;
