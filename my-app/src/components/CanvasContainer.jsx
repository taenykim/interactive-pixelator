import React from "react";
import { useEffect } from "react";
import { resizeImage } from "../utils/resizeImage";

const CanvasContainer = ({ canvasData }) => {
  useEffect(() => {
    window.addEventListener("resize", () => {
      const canvas = document.querySelector("canvas");
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
    const ctx = canvas.getContext("2d");
    const [width, height] = resizeImage(canvasData);
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(canvasData, 0, 0, width, height);
    const color = document.getElementById("color");
    const pick = (event) => {
      const ctx = canvas.getContext("2d");
      const x = event.offsetX;
      const y = event.offsetY;
      const pixel = ctx.getImageData(x, y, 100, 100);
      const data = pixel.data;
      const rgba = "rgba(" + data[0] + ", " + data[1] + ", " + data[2] + ", " + data[3] / 255 + ")";
      color.style.background = rgba;
      color.textContent = rgba;
    };
    canvas.addEventListener("mousemove", pick);
  };

  return <div id="canvas-container"></div>;
};

export default CanvasContainer;
