class UploadContainer {
  constructor({ name, $container, updateImageData }) {
    this.updateImageData = updateImageData;

    const label = document.createElement("label");
    label.htmlFor = `${name}-upload`;
    label.className = `${name}-upload-label`;

    const p = document.createElement("p");
    p.className = `${name}-upload-description`;
    p.textContent = "UPLOAD IMAGE";
    p.style.width = "100%";
    p.style.height = "100%";
    p.style.textAlign = "center";

    label.append(p);

    const div = document.createElement("div");
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = "image/*";
    inputFile.id = `${name}-upload`;
    inputFile.className = `${name}-image-upload`;
    inputFile.hidden = true;
    inputFile.addEventListener("change", (e) => {
      e.stopPropagation();
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          this.updateImageData(img);
        };
      };
      reader.readAsDataURL(e.target.files[0]);
    });
    div.append(inputFile);

    this.render($container, label, div);
  }

  render($container, label, div) {
    $container.append(label);
    $container.append(div);
  }
}

const averageColor = (row, column, ctx, tileSize, dataOffset) => {
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

  rgb.r = Math.floor(rgb.r / count);
  rgb.g = Math.floor(rgb.g / count);
  rgb.b = Math.floor(rgb.b / count);

  return rgb;
};

const sizeOffset = 10;

const averageLastPixelColor = (canvas, row, column, ctx, tileSize, dataOffset) => {
  const rgb = {
    r: 0,
    g: 0,
    b: 0,
  };
  let data;

  try {
    data = ctx.getImageData(column * tileSize, row * tileSize, sizeOffset, sizeOffset);
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

  rgb.r = Math.floor(rgb.r / count);
  rgb.g = Math.floor(rgb.g / count);
  rgb.b = Math.floor(rgb.b / count);

  return rgb;
};

const dataOffset = 4; // we can set how many pixels to skip
const borderSize = 0;

const drawCanvas = (canvas, image, pixelSize, gridSize, gridColor) => {
  gridColor = gridColor || "#000000";
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.width - borderSize;
  canvas.height = canvas.height - borderSize;
  const tileSize = pixelSize;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  const numTileRows = Math.ceil(canvas.height / tileSize);
  const numTileCols = Math.ceil(canvas.width / tileSize);

  const grid = gridSize;
  const gridRed = parseInt(gridColor.substr(1, 2), 16);
  const gridGreen = parseInt(gridColor.substr(3, 2), 16);
  const gridBlue = parseInt(gridColor.substr(5, 2), 16);

  // Loop through each tile
  for (let r = 0; r < numTileRows; r++) {
    for (let c = 0; c < numTileCols; c++) {
      // Set the pixel values for each tile
      let average;
      if (c === numTileCols - 1 || r === numTileRows - 1) average = averageLastPixelColor(canvas, r, c, ctx, tileSize, dataOffset);
      else average = averageColor(r, c, ctx, tileSize, dataOffset);
      const rgb = average;

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
              pixels[position + 0] = gridRed;
              pixels[position + 1] = gridGreen;
              pixels[position + 2] = gridBlue;
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
              pixels[position + 0] = gridRed;
              pixels[position + 1] = gridGreen;
              pixels[position + 2] = gridBlue;
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
};

const dataOffset$1 = 4; // we can set how many pixels to skip

const drawCanvasCircle = (canvas, image, pixelSize, gridSize, gridColor) => {
  gridColor = gridColor || "#000000";
  const ctx = canvas.getContext("2d");
  const tileSize = pixelSize;
  // const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const numTileRows = Math.ceil(canvas.height / tileSize);
  const numTileCols = Math.ceil(canvas.width / tileSize);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  // Loop through each tile
  for (let r = 0; r < numTileRows; r++) {
    for (let c = 0; c < numTileCols; c++) {
      // Set the pixel values for each tile
      let average;
      if (c === numTileCols - 1 || r === numTileRows - 1) average = averageLastPixelColor(canvas, r, c, ctx, tileSize, dataOffset$1);
      else average = averageColor(r, c, ctx, tileSize, dataOffset$1);
      const rgb = average;
      const red = rgb.r;
      const green = rgb.g;
      const blue = rgb.b;

      const trueRow = c * tileSize;
      const trueCol = r * tileSize;
      const arcCenterX = trueRow;
      const arcCenterY = trueCol;
      ctx.beginPath();
      ctx.fillStyle = `${gridColor}`;
      ctx.fillRect(trueRow, trueCol, tileSize, tileSize);
      ctx.fillStyle = `rgb(${red},${green},${blue})`;
      ctx.arc(arcCenterX + tileSize / 2, arcCenterY + tileSize / 2, (tileSize - gridSize) / 2, 0, Math.PI * 2, false);
      ctx.fill();
    }
  }

  // const imageData2 = ctx.getImageData(0, 0, canvas.width, canvas.height);
  // const pixels2 = imageData2.data;

  // for (let r = 0; r < numTileRows; r++) {
  //   for (let c = 0; c < numTileCols; c++) {
  //     for (let tr = 0; tr < tileSize; tr++) {
  //       for (let tc = 0; tc < tileSize; tc++) {
  //         // Calculate the true position of the tile pixel
  //         const trueRow = r * tileSize + tr;
  //         const trueCol = c * tileSize + tc;

  //         // Calculate the position of the current pixel in the array
  //         const position = trueRow * (imageData2.width * dataOffset) + trueCol * dataOffset;

  //         // console.log("position", position);
  //         // Assign the colour to each pixel
  //         if (tc < grid || tr < grid || tr > canvas.height - r * tileSize - grid) {
  //           pixels2[position + 0] = gridRed;
  //           pixels2[position + 1] = gridGreen;
  //           pixels2[position + 2] = gridBlue;
  //           pixels2[position + 3] = 255;
  //         }
  //       }
  //     }
  //   }
  // }

  // // Draw image data to the canvas
  // ctx.putImageData(imageData2, 0, 0);
};

const drawCanvasOriginal = (canvas, image) => {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
};

const resizeImage = (image, $target) => {
  let MAX_WIDTH = $target.getBoundingClientRect().width - 1;
  let MAX_HEIGHT = $target.getBoundingClientRect().height - 1;
  let width = image.width;
  let height = image.height;

  // 아트보드 가로세로 비율
  const artboardRatio = MAX_WIDTH / MAX_HEIGHT;
  // 이미지 가로세로 비율
  const imageRatio = width / height;

  // 아트보드 비율이 이미지 비율보다 크면 이미지의 세로를 아트보드의 세로에 맞춤
  if (artboardRatio > imageRatio) {
    width *= MAX_HEIGHT / height;
    height = MAX_HEIGHT;
  }
  // 이미지 비율이 아트보드 비율보다 크면 이미지의 가로를 아트보드의 가로에 맞춤
  else {
    height *= MAX_WIDTH / width;
    width = MAX_WIDTH;
  }
  return [width, height];
};

const dataOffset$2 = 4; // we can set how many pixels to skip

const drawCanvasRoundSquare = (canvas, image, pixelSize, gridSize, gridColor) => {
  gridColor = gridColor || "#000000";
  const ctx = canvas.getContext("2d");
  const tileSize = pixelSize;
  const numTileRows = Math.ceil(canvas.height / tileSize);
  const numTileCols = Math.ceil(canvas.width / tileSize);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  const grid = Number(gridSize);

  // Loop through each tile
  for (let r = 0; r < numTileRows; r++) {
    for (let c = 0; c < numTileCols; c++) {
      // Set the pixel values for each tile
      let average;
      if (c === numTileCols - 1 || r === numTileRows - 1) average = averageLastPixelColor(canvas, r, c, ctx, tileSize, dataOffset$2);
      else average = averageColor(r, c, ctx, tileSize, dataOffset$2);
      const rgb = average;
      const red = rgb.r;
      const green = rgb.g;
      const blue = rgb.b;

      const trueRow = c * tileSize;
      const trueCol = r * tileSize;
      ctx.beginPath();
      ctx.fillStyle = `${gridColor}`;
      ctx.fillRect(trueRow, trueCol, tileSize, tileSize);
      ctx.fillStyle = `rgb(${red},${green},${blue})`;
      ctx.strokeStyle = `rgb(${red},${green},${blue})`;
      const radius = (tileSize * 20) / 100;
      roundRect(ctx, trueRow + grid, trueCol + grid, tileSize - grid, tileSize - grid, radius, true);
      // ctx.fillRect(trueRow + gridSize, trueCol + gridSize, tileSize - gridSize, tileSize - gridSize);
    }
  }

  // const imageData2 = ctx.getImageData(0, 0, canvas.width, canvas.height);
  // const pixels2 = imageData2.data;

  // for (let r = 0; r < numTileRows; r++) {
  //   for (let c = 0; c < numTileCols; c++) {
  //     for (let tr = 0; tr < tileSize; tr++) {
  //       for (let tc = 0; tc < tileSize; tc++) {
  //         // Calculate the true position of the tile pixel
  //         const trueRow = r * tileSize + tr;
  //         const trueCol = c * tileSize + tc;

  //         // Calculate the position of the current pixel in the array
  //         const position = trueRow * (imageData2.width * dataOffset) + trueCol * dataOffset;

  //         // console.log("position", position);
  //         // Assign the colour to each pixel
  //         if (tc < grid || tr < grid || tr > canvas.height - r * tileSize - grid) {
  //           pixels2[position + 0] = gridRed;
  //           pixels2[position + 1] = gridGreen;
  //           pixels2[position + 2] = gridBlue;
  //           pixels2[position + 3] = 255;
  //         }
  //       }
  //     }
  //   }
  // }

  // // Draw image data to the canvas
  // ctx.putImageData(imageData2, 0, 0);

  function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === "undefined") {
      stroke = true;
    }
    if (typeof radius === "undefined") {
      radius = 5;
    }
    if (typeof radius === "number") {
      radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
      var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
  }
};

const dataOffset$3 = 4; // we can set how many pixels to skip

const drawMousemoveCanvas = (canvas, pixelSize, gridSize, y, x, gridColor) => {
  console.log("mCanvas ps", pixelSize);

  const tileSize = pixelSize;
  const numTileCols = Math.ceil(canvas.width / tileSize);

  const ctx = canvas.getContext("2d");
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  const rowIndex = Math.floor(x / tileSize);
  const colIndex = Math.floor(y / tileSize);

  // Set the pixel values for each tile
  const gridRed = parseInt(gridColor.substr(1, 2), 16);
  const gridGreen = parseInt(gridColor.substr(3, 2), 16);
  const gridBlue = parseInt(gridColor.substr(5, 2), 16);

  if (colIndex === numTileCols - 1) {
    for (let tr = 0; tr < tileSize; tr++) {
      for (let tc = 0; tc < canvas.width - colIndex * tileSize; tc++) {
        // Calculate the true position of the tile pixel
        const trueRow = rowIndex * tileSize + tr;
        const trueCol = colIndex * tileSize + tc;

        // Calculate the position of the current pixel in the array
        const position = trueRow * (imageData.width * dataOffset$3) + trueCol * dataOffset$3;

        // console.log("position", position);
        // Assign the colour to each pixel

        pixels[position + 0] = gridRed;
        pixels[position + 1] = gridGreen;
        pixels[position + 2] = gridBlue;
        pixels[position + 3] = 255;
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
        const position = trueRow * (canvas.width * dataOffset$3) + trueCol * dataOffset$3;

        // console.log("position", position);
        // Assign the colour to each pixel

        pixels[position + 0] = gridRed;
        pixels[position + 1] = gridGreen;
        pixels[position + 2] = gridBlue;
        pixels[position + 3] = 255;
      }
    }
  }

  // Draw image data to the canvas
  return imageData;
};

const dataOffset$4 = 4; // we can set how many pixels to skip

const drawHoverCanvas = (canvas, pixelSize, gridSize, y, x, hoverColor) => {
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
        const position = trueRow * (imageData.width * dataOffset$4) + trueCol * dataOffset$4;

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
        const position = trueRow * (canvas.width * dataOffset$4) + trueCol * dataOffset$4;

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

class CanvasContainer {
  constructor({ name, $container, image, pixelSize, gridSize, gridColor, pixelType }) {
    this.isDrawing = false;
    this.pixelSize = pixelSize;
    this.gridSize = gridSize;
    this.gridColor = gridColor;
    this.pixelType = pixelType;

    const canvas = document.createElement("canvas");
    this.canvas = canvas;

    $container.innerHTML = "";
    canvas.id = `${name}-canvas`;
    const [width, height] = resizeImage(image, $container);
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    this.render($container, canvas);

    if (pixelType === "square") {
      drawCanvas(canvas, image, pixelSize, gridSize, gridColor);
    } else if (pixelType === "circle") {
      drawCanvasCircle(canvas, image, pixelSize, gridSize, gridColor);
    } else if (pixelType === "original") {
      drawCanvasOriginal(canvas, image);
    } else if (pixelType === "roundsquare") {
      drawCanvasRoundSquare(canvas, image, pixelSize, gridSize, gridColor);
    }
    this.canvasFirstData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    canvas.addEventListener("mousedown", this.mousedownHandler.bind(this));
    canvas.addEventListener("mousemove", this.mousemoveHandler.bind(this));
    canvas.addEventListener("mouseleave", this.mouseleaveHandler.bind(this));
    window.addEventListener("mouseup", (e) => {
      this.isDrawing = false;
    });
    this.render($container, canvas);
  }
  render($container, canvas) {
    $container.innerHTML = "";
    $container.append(canvas);
  }

  mousedownHandler(e) {
    const ctx = this.canvas.getContext("2d");
    this.isDrawing = true;
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.canvasFirstData = drawMousemoveCanvas(this.canvas, this.pixelSize, this.gridSize, x, y, this.gridColor);
    ctx.putImageData(this.canvasFirstData, 0, 0);
  }

  mousemoveHandler(e) {
    const ctx = this.canvas.getContext("2d");
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (!this.isDrawing) {
      ctx.putImageData(this.canvasFirstData, 0, 0);
      ctx.putImageData(drawHoverCanvas(this.canvas, this.pixelSize, this.gridSize, x, y, this.gridColor), 0, 0);
      return;
    }
    this.canvasFirstData = drawMousemoveCanvas(this.canvas, this.pixelSize, this.gridSize, x, y, this.gridColor);
    ctx.putImageData(this.canvasFirstData, 0, 0);
  }
  mouseleaveHandler() {
    const ctx = this.canvas.getContext("2d");
    ctx.putImageData(this.canvasFirstData, 0, 0);
  }
}

// const pixelSize = 100;
// const gridSize = 10;
// const gridColor = "#ffffff";
// const pixelType = "square";

class Pixelator {
  constructor(name, pixelSize, gridSize, gridColor, pixelType) {
    const $container = document.getElementById(`${name}`);
    this.$container = $container;

    this.$target = new UploadContainer({
      name,
      $container,
      updateImageData: (image) => {
        this.$target = new CanvasContainer({
          name,
          $container,
          image,
          pixelSize,
          gridSize,
          gridColor,
          pixelType,
        });
      },
    });
  }
}

// const pixelSize = 100;
// const gridSize = 10;
// const gridColor = "#ffffff";
// const pixelType = "square";

class PixelImage {
  constructor(name, imageSrc, pixelSize, gridSize, gridColor, pixelType) {
    const $container = document.getElementById(`${name}`);
    this.$container = $container;

    const img = new Image();
    img.src = imageSrc;
    img.addEventListener("load", () => {
      const image = img;
      this.$target = new CanvasContainer({
        name,
        $container,
        image,
        pixelSize,
        gridSize,
        gridColor,
        pixelType,
      });
    });
  }
}

export { PixelImage, Pixelator };
