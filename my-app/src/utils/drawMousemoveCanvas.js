const dataOffset = 4; // we can set how many pixels to skip

export const drawMousemoveCanvas = (canvas, pixelSize, gridSize, y, x) => {
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
  const red = 255;
  const green = 0;
  const blue = 0;

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

  // Draw image data to the canvas
  ctx.putImageData(imageData, 0, 0);
};
