const dataOffset = 4; // we can set how many pixels to skip

export const drawHoverCanvas = (canvas, pixelSize, gridSize, y, x, hoverColor) => {
  console.log("mCanvas ps", pixelSize);

  const tileSize = pixelSize;
  const numTileCols = Math.ceil(canvas.width / tileSize);

  const ctx = canvas.getContext("2d");
  const grid = gridSize;
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  const rowIndex = Math.floor(x / tileSize);
  const colIndex = Math.floor(y / tileSize);

  // Set the pixel values for each tile
  const gridRed = 255 - parseInt(hoverColor.substr(1, 2), 16);
  const gridGreen = 255 - parseInt(hoverColor.substr(3, 2), 16);
  const gridBlue = 255 - parseInt(hoverColor.substr(5, 2), 16);

  if (colIndex === numTileCols - 1) {
    for (let tr = 0; tr < tileSize; tr++) {
      for (let tc = 0; tc < canvas.width - colIndex * tileSize; tc++) {
        // Calculate the true position of the tile pixel
        const trueRow = rowIndex * tileSize + tr;
        const trueCol = colIndex * tileSize + tc;

        // Calculate the position of the current pixel in the array
        const position = trueRow * (imageData.width * dataOffset) + trueCol * dataOffset;

        // console.log("position", position);
        // Assign the colour to each pixel

        if (tc < grid || tr < grid || tc > canvas.width - colIndex * tileSize - grid || tr > canvas.height - rowIndex * tileSize - grid) {
          pixels[position + 0] = gridRed;
          pixels[position + 1] = gridGreen;
          pixels[position + 2] = gridBlue;
          pixels[position + 3] = 255;
        }
      }
    }
  } else {
    // Loop through each tile pixel
    for (let tr = 0; tr < tileSize; tr++) {
      for (let tc = 0; tc < tileSize; tc++) {
        // Calculate the true position of the tile pixel
        const trueRow = rowIndex * tileSize + tr;
        const trueCol = colIndex * tileSize + tc;

        // Calculate the position of the current pixel in the array
        const position = trueRow * (canvas.width * dataOffset) + trueCol * dataOffset;

        // console.log("position", position);
        // Assign the colour to each pixel

        if (tc < grid || tr < grid || tr > canvas.height - rowIndex * tileSize - grid) {
          pixels[position + 0] = gridRed;
          pixels[position + 1] = gridGreen;
          pixels[position + 2] = gridBlue;
          pixels[position + 3] = 255;
        }
      }
    }
  }

  // Draw image data to the canvas
  return imageData;
};
