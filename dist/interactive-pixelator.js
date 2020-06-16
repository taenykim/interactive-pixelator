class UploadContainer {
  constructor({ $container, updateImageData }) {
    this.updateImageData = updateImageData;

    const label = document.createElement("label");
    label.htmlFor = "upload";
    label.className = "upload-label";

    const p = document.createElement("p");
    p.className = "upload-description";
    p.textContent = "UPLOAD IMAGE";
    p.style.width = "100%";
    p.style.height = "100%";

    label.append(p);

    const div = document.createElement("div");
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = "image/*";
    inputFile.id = "upload";
    inputFile.className = "image-upload";
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
const borderSize = 2;

const drawCanvas = (canvas, image, pixelSize, gridSize, gridColor) => {
  gridColor = gridColor || "#000000";
  console.log("drawCanvas ps", pixelSize);
  const ctx = canvas.getContext("2d");
  const [width, height] = [500, 500];
  canvas.width = width - borderSize;
  canvas.height = height - borderSize;
  const tileSize = pixelSize;
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  const numTileRows = Math.ceil(canvas.height / tileSize);
  const numTileCols = Math.ceil(canvas.width / tileSize);
  ctx.drawImage(image, 0, 0, width, height);

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

class CanvasContainer {
  constructor({ $container, image, pixelSize, gridSize, gridColor, pixelType }) {
    $container.innerHTML = "";
    const canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.width = $container.width;
    canvas.height = $container.height;
    if (pixelType === "square") {
      drawCanvas(canvas, image, pixelSize, gridSize, gridColor);
    }

    this.render($container, canvas);
  }
  render($container, canvas) {
    $container.append(canvas);
  }
}

const pixelSize = 100;
const gridSize = 10;
const gridColor = "#ffffff";
const pixelType = "square";

class Pixelator {
  constructor(name) {
    const $container = document.getElementById(`${name}`);
    this.$container = $container;

    this.$target = new UploadContainer({
      $container,
      updateImageData: (image) => {
        this.$target = new CanvasContainer({
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
