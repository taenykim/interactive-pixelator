import React from "react";
import { useEffect } from "react";
import { drawCanvas } from "../utils/drawCanvas";
import { pickColor } from "../utils/pickColor";
import { drawMousemoveCanvas } from "../utils/drawMousemoveCanvas";
import { useCallback } from "react";

const CanvasContainer = ({ image, pixelSize, gridSize, gridColor }) => {
  let canvas;
  let isDrawing = false;
  console.log(gridColor);

  const mousedownHandler = useCallback(
    (e) => {
      console.log("왜여러번?");
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      drawMousemoveCanvas(canvas, pixelSize, gridSize, x, y, gridColor);
    },
    [pixelSize, gridSize, gridColor],
  );
  const mousemoveHandler = useCallback(
    (e) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      drawMousemoveCanvas(canvas, pixelSize, gridSize, x, y, gridColor);
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
  }, [image]);

  useEffect(() => {
    console.log("2");
    canvas = document.querySelector("#canvas");
    window.addEventListener("resize", () => {
      drawCanvas(canvas, image, pixelSize, gridSize, gridColor);
    });
  }, [canvas, pixelSize, gridSize, gridColor]);

  useEffect(() => {
    console.log("3");
    canvas = document.querySelector("#canvas");
    drawCanvas(canvas, image, pixelSize, gridSize, gridColor);
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
