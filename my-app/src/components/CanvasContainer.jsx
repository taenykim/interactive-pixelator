import React from "react";
import { useEffect } from "react";
import { drawCanvas } from "../utils/drawCanvas";
import { pickColor } from "../utils/pickColor";
import { drawMousemoveCanvas } from "../utils/drawMousemoveCanvas";
import { useCallback } from "react";

const CanvasContainer = ({ image, pixelSize, gridSize }) => {
  let canvas;
  let isDrawing = false;

  const mousedownHandler = useCallback(
    (e) => {
      console.log("왜여러번?");
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      drawMousemoveCanvas(canvas, pixelSize, gridSize, x, y);
    },
    [pixelSize, gridSize],
  );
  const mousemoveHandler = useCallback(
    (e) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      drawMousemoveCanvas(canvas, pixelSize, gridSize, x, y);
    },
    [pixelSize, gridSize],
  );

  // consider useEffect order
  useEffect(() => {
    console.log("1");
    canvas = document.createElement("canvas");
    canvas.id = "canvas";
    let canvasContainer = document.getElementById("canvas-container");
    canvasContainer.append(canvas);
    drawCanvas(canvas, image, pixelSize, gridSize);
  }, [image]);

  useEffect(() => {
    console.log("2");
    canvas = document.querySelector("#canvas");
    window.addEventListener("resize", () => {
      drawCanvas(canvas, image, pixelSize, gridSize);
    });
  }, [canvas, pixelSize, gridSize]);

  useEffect(() => {
    console.log("3");
    canvas = document.querySelector("#canvas");
    drawCanvas(canvas, image, pixelSize, gridSize);
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
  }, [pixelSize, gridSize]);

  return <div id="canvas-container"></div>;
};

export default CanvasContainer;
