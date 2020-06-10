import React from "react";
import { useEffect } from "react";
import { resizeImage } from "../utils/resizeImage";

const CanvasContainer = ({ image }) => {
  let canvas;

  useEffect(() => {
    console.log("2");
    canvas = document.createElement("canvas");
    let canvasContainer = document.getElementById("canvas-container");
    canvasContainer.append(canvas);
    drawCanvas(canvas);
  }, [image]);

  useEffect(() => {
    console.log("1");
    window.addEventListener("resize", () => {
      drawCanvas(canvas);
    });
  }, []);

  const drawCanvas = (canvas) => {
    const ctx = canvas.getContext("2d");
    const [width, height] = resizeImage(image);
    canvas.width = width;
    canvas.height = height;
    var tileWidth = 100;
    var tileHeight = 100;
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var pixels = imageData.data;
    var numTileRows = canvas.width / tileWidth;
    var numTileCols = canvas.height / tileHeight;
    //canvas copy of image
    ctx.drawImage(image, 0, 0, width, height);
    function averageColor(row, column) {
      var blockSize = 1, // we can set how many pixels to skip
        data,
        width,
        height,
        i = -4,
        length,
        rgb = {
          r: 0,
          g: 0,
          b: 0,
        },
        count = 0;

      try {
        data = ctx.getImageData(column * tileWidth, row * tileHeight, tileHeight, tileWidth);
      } catch (e) {
        console.log("Not happening this time!");
        return rgb;
      }

      length = data.data.length;

      while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
      }

      // ~~ used to floor values
      rgb.r = ~~(rgb.r / count);
      rgb.g = ~~(rgb.g / count);
      rgb.b = ~~(rgb.b / count);

      return rgb;
    }

    // Loop through each tile
    for (var r = 0; r < numTileRows; r++) {
      for (var c = 0; c < numTileCols; c++) {
        // Set the pixel values for each tile
        var rgb = averageColor(r, c);
        var red = rgb.r;
        var green = rgb.g;
        var blue = rgb.b;

        // Loop through each tile pixel
        for (var tr = 0; tr < tileHeight; tr++) {
          for (var tc = 0; tc < tileWidth; tc++) {
            // Calculate the true position of the tile pixel
            var trueRow = r * tileHeight + tr;
            var trueCol = c * tileWidth + tc;

            // Calculate the position of the current pixel in the array
            var pos = trueRow * (imageData.width * 4) + trueCol * 4;

            // Assign the colour to each pixel
            pixels[pos + 0] = red;
            pixels[pos + 1] = green;
            pixels[pos + 2] = blue;
            pixels[pos + 3] = 255;
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
