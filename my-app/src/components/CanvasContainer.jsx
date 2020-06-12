import React from "react";
import { useEffect } from "react";
import { drawCanvas } from "../utils/drawCanvas";
import { pickColor } from "../utils/pickColor";
import { drawMousemoveCanvas } from "../utils/drawMousemoveCanvas";
import { useCallback } from "react";

const CanvasContainer = ({ image, pixelSize, gridSize, gridColor }) => {
  let canvas;
  let isDrawing = false;
  let canvasFirstData;
  console.log(gridColor);

  const mousedownHandler = useCallback(
    (e) => {
      const ctx = canvas.getContext("2d");
      console.log("왜여러번?");
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      canvasFirstData = drawMousemoveCanvas(canvas, pixelSize, gridSize, x, y, gridColor);
      ctx.putImageData(canvasFirstData, 0, 0);
    },
    [pixelSize, gridSize, gridColor],
  );
  const mousemoveHandler = useCallback(
    (e) => {
      const ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (!isDrawing) {
        ctx.putImageData(canvasFirstData, 0, 0);
        ctx.putImageData(drawMousemoveCanvas(canvas, pixelSize, gridSize, x, y, gridColor), 0, 0);
        return;
      }

      canvasFirstData = drawMousemoveCanvas(canvas, pixelSize, gridSize, x, y, gridColor);
      ctx.putImageData(canvasFirstData, 0, 0);
    },
    [pixelSize, gridSize, gridColor],
  );

  // consider useEffect order
  useEffect(() => {
    console.log("1");
    canvas = document.createElement("canvas");
    canvas.id = "canvas";
    let canvasContainer = document.getElementById("canvas-container");
    canvasContainer.append(canvas);
    drawCanvas(canvas, image, pixelSize, gridSize, gridColor);
    const ctx = canvas.getContext("2d");
    canvasFirstData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  }, [canvas, image]);

  useEffect(() => {
    console.log("2");
    canvas = document.querySelector("#canvas");
    window.addEventListener("resize", () => {
      drawCanvas(canvas, image, pixelSize, gridSize, gridColor);
      const ctx = canvas.getContext("2d");
      canvasFirstData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    });
  }, [canvas, pixelSize, gridSize, gridColor]);

  useEffect(() => {
    console.log("3");
    drawCanvas(canvas, image, pixelSize, gridSize, gridColor);
    const ctx = canvas.getContext("2d");
    canvasFirstData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas = document.querySelector("#canvas");
    canvas.addEventListener("mousemove", pickColor);
    canvas.addEventListener("mousedown", mousedownHandler);
    canvas.addEventListener("mousemove", mousemoveHandler);
    window.addEventListener("mouseup", (e) => {
      isDrawing = false;
    });
    return () => {
      canvas.removeEventListener("mousemove", pickColor);
      canvas.removeEventListener("mousedown", mousedownHandler);
      canvas.removeEventListener("mousemove", mousemoveHandler);
      window.removeEventListener("mouseup", (e) => {
        isDrawing = false;
      });
    };
  }, [pixelSize, gridSize, gridColor]);

  return <div id="canvas-container"></div>;
};

export default CanvasContainer;
