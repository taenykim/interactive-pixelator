import React from "react";
import { useEffect } from "react";
import { drawCanvas } from "../utils/drawCanvas";
import { pickColor } from "../utils/pickColor";
import { drawMousemoveCanvas } from "../utils/drawMousemoveCanvas";
import { useCallback } from "react";
import { drawHoverCanvas } from "../utils/drawHoverCanvas";
import { drawCanvasOriginal } from "../utils/drawCanvasOriginal";
import { drawCanvasCircle } from "../utils/drawCanvasCircle";
import { drawCanvasRoundSquare } from "../utils/drawCanvasRoundSquare";

const CanvasContainer = ({ image, pixelSize, gridSize, gridColor, pixelType }) => {
  let canvas;
  let isDrawing = false;
  let canvasFirstData;

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
    [pixelSize, gridSize, gridColor, pixelType],
  );
  const mousemoveHandler = useCallback(
    (e) => {
      const ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (!isDrawing) {
        ctx.putImageData(canvasFirstData, 0, 0);
        ctx.putImageData(drawHoverCanvas(canvas, pixelSize, gridSize, x, y, gridColor), 0, 0);
        return;
      }
      canvasFirstData = drawMousemoveCanvas(canvas, pixelSize, gridSize, x, y, gridColor);
      ctx.putImageData(canvasFirstData, 0, 0);
    },
    [pixelSize, gridSize, gridColor, pixelType],
  );
  const mouseleaveHandler = useCallback(() => {
    const ctx = canvas.getContext("2d");
    ctx.putImageData(canvasFirstData, 0, 0);
  });

  // consider useEffect order
  useEffect(() => {
    console.log("1");
    canvas = document.createElement("canvas");
    canvas.id = "canvas";
    let canvasContainer = document.getElementById("canvas-container");
    canvasContainer.append(canvas);
    if (pixelType === "square") {
      drawCanvas(canvas, image, pixelSize, gridSize, gridColor);
    } else if (pixelType === "circle") {
      drawCanvasCircle(canvas, image, pixelSize, gridSize, gridColor);
    } else if (pixelType === "original") {
      drawCanvasOriginal(canvas, image);
    } else if (pixelType === "roundsquare") {
      drawCanvasRoundSquare(canvas, image, pixelSize, gridSize, gridColor);
    }
    const ctx = canvas.getContext("2d");
    canvasFirstData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  }, [canvas, image]);

  useEffect(() => {
    console.log("2");
    canvas = document.querySelector("#canvas");
    window.addEventListener("resize", () => {
      if (pixelType === "square") {
        drawCanvas(canvas, image, pixelSize, gridSize, gridColor);
      } else if (pixelType === "circle") {
        drawCanvasCircle(canvas, image, pixelSize, gridSize, gridColor);
      } else if (pixelType === "original") {
        drawCanvasOriginal(canvas, image);
      } else if (pixelType === "roundsquare") {
        drawCanvasRoundSquare(canvas, image, pixelSize, gridSize, gridColor);
      }
      const ctx = canvas.getContext("2d");
      canvasFirstData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    });
  }, [pixelSize, gridSize, gridColor, pixelType]);

  useEffect(() => {
    console.log("3");
    console.log("useeffect pixeltype", pixelType);
    if (pixelType === "square") {
      drawCanvas(canvas, image, pixelSize, gridSize, gridColor);
    } else if (pixelType === "circle") {
      drawCanvasCircle(canvas, image, pixelSize, gridSize, gridColor);
    } else if (pixelType === "original") {
      drawCanvasOriginal(canvas, image);
    } else if (pixelType === "roundsquare") {
      drawCanvasRoundSquare(canvas, image, pixelSize, gridSize, gridColor);
    }
    const ctx = canvas.getContext("2d");
    canvasFirstData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas = document.querySelector("#canvas");
    canvas.addEventListener("mousemove", pickColor);
    canvas.addEventListener("mousedown", mousedownHandler);
    canvas.addEventListener("mousemove", mousemoveHandler);
    canvas.addEventListener("mouseleave", mouseleaveHandler);
    window.addEventListener("mouseup", (e) => {
      isDrawing = false;
    });
    return () => {
      canvas.removeEventListener("mousemove", pickColor);
      canvas.removeEventListener("mousedown", mousedownHandler);
      canvas.removeEventListener("mousemove", mousemoveHandler);
      canvas.removeEventListener("mouseleave", mouseleaveHandler);
    };
  }, [pixelSize, gridSize, gridColor, pixelType]);

  return <div id="canvas-container"></div>;
};

export default CanvasContainer;
