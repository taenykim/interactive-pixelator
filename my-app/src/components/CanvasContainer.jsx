import React from "react";
import { useEffect } from "react";
import { resizeImage } from "../utils/resizeImage";

const dataOffset = 4; // we can set how many pixels to skip

const CanvasContainer = ({ image, pixelSize, gridSize }) => {
  let canvas;
  console.log(gridSize);

  // consider useEffect order
  useEffect(() => {
    canvas = document.createElement("canvas");
    canvas.id = "canvas";
    let canvasContainer = document.getElementById("canvas-container");
    canvasContainer.append(canvas);
    drawCanvas(canvas, pixelSize, gridSize);
  }, [image]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      drawCanvas(canvas, pixelSize, gridSize);
    });
  }, [canvas, pixelSize, gridSize]);

  useEffect(() => {
    canvas = document.querySelector("#canvas");
    drawCanvas(canvas, pixelSize, gridSize);
  }, [pixelSize, gridSize]);

  const drawCanvas = (canvas, pixelSize, gridSize) => {
    const ctx = canvas.getContext("2d");
    // ctx.clearRect(0, 0, 0, 0);
    const [width, height] = resizeImage(image);
    canvas.width = Math.floor(width);
    canvas.height = Math.floor(height);
    const tileSize = pixelSize;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    // console.log(pixels);
    const numTileRows = Math.ceil(canvas.height / tileSize);
    const numTileCols = Math.ceil(canvas.width / tileSize);
    //canvas copy of image
    ctx.drawImage(image, 0, 0, width, height);

    const grid = gridSize;
    function averageColor(row, column) {
      const rgb = {
        r: 0,
        g: 0,
        b: 0,
      };
      let data;

      try {
        data = ctx.getImageData(column * tileSize, row * tileSize, tileSize, tileSize);
      } catch (e) {
        return rgb;
      }

      const length = data.data.length;
      let count = 0;

      for (let i = 0; i < length; i += dataOffset, count++) {
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
      }

      // ~~ used to floor values
      rgb.r = Math.floor(rgb.r / count);
      rgb.g = Math.floor(rgb.g / count);
      rgb.b = Math.floor(rgb.b / count);

      return rgb;
    }

    // console.log("row개수", numTileRows, "col개수", numTileCols);

    // Loop through each tile
    for (let r = 0; r < numTileRows; r++) {
      for (let c = 0; c < numTileCols; c++) {
        // Set the pixel values for each tile
        const rgb = averageColor(r, c);
        const red = rgb.r;
        const green = rgb.g;
        const blue = rgb.b;

        // Loop through each tile pixel
        if (c === numTileCols - 1) {
          for (let tr = 0; tr < tileSize; tr++) {
            for (let tc = 0; tc < canvas.width - c * tileSize; tc++) {
              // Calculate the true position of the tile pixel
              const trueRow = r * tileSize + tr;
              const trueCol = c * tileSize + tc;

              // Calculate the position of the current pixel in the array
              const position = trueRow * (imageData.width * dataOffset) + trueCol * dataOffset;

              // console.log("position", position);
              // Assign the colour to each pixel
              if (tc < grid || tr < grid || tc > canvas.width - c * tileSize - grid || tr > canvas.height - r * tileSize - grid) {
                pixels[position + 0] = 1;
                pixels[position + 1] = 1;
                pixels[position + 2] = 1;
                pixels[position + 3] = 255;
              } else {
                pixels[position + 0] = red;
                pixels[position + 1] = green;
                pixels[position + 2] = blue;
                pixels[position + 3] = 255;
              }
            }
          }
        } else {
          for (let tr = 0; tr < tileSize; tr++) {
            for (let tc = 0; tc < tileSize; tc++) {
              // Calculate the true position of the tile pixel
              const trueRow = r * tileSize + tr;
              const trueCol = c * tileSize + tc;

              // Calculate the position of the current pixel in the array
              const position = trueRow * (imageData.width * dataOffset) + trueCol * dataOffset;

              // console.log("position", position);
              // Assign the colour to each pixel
              if (tc < grid || tr < grid || tr > canvas.height - r * tileSize - grid) {
                pixels[position + 0] = 1;
                pixels[position + 1] = 1;
                pixels[position + 2] = 1;
                pixels[position + 3] = 255;
              } else {
                pixels[position + 0] = red;
                pixels[position + 1] = green;
                pixels[position + 2] = blue;
                pixels[position + 3] = 255;
              }
            }
          }
        }
      }
    }

    // Draw image data to the canvas
    ctx.putImageData(imageData, 0, 0);

    ///////////////////
    const color = document.getElementById("color");
    const pick = (event) => {
      const ctx = canvas.getContext("2d");
      const x = event.offsetX;
      const y = event.offsetY;
      const pixel = ctx.getImageData(x, y, 1, 1);
      const data = pixel.data;
      const rgba = "rgba(" + data[0] + ", " + data[1] + ", " + data[2] + ", " + data[3] / 255 + ")";
      color.style.background = rgba;
      color.textContent = rgba;
    };
    canvas.addEventListener("mousemove", pick);
    ////////////////////
  };

  return <div id="canvas-container"></div>;
};

export default CanvasContainer;
