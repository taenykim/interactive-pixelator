import { drawCanvas } from "../utils/drawCanvas";

export default class CanvasContainer {
  constructor({ $container, image, pixelSize, gridSize, gridColor, pixelType }) {
    $container.innerHTML = "";
    const canvas = document.createElement("canvas");
    canvas.id = "canvas";
    console.log($container.style.width.match(/\d+(?=px)/g)[0]);
    canvas.width = $container.style.width.match(/\d+(?=px)/g)[0];
    canvas.height = $container.style.height.match(/\d+(?=px)/g)[0];
    this.render($container, canvas);

    if (pixelType === "square") {
      drawCanvas(canvas, image, pixelSize, gridSize, gridColor);
    }

    this.render($container, canvas);
  }
  render($container, canvas) {
    $container.innerHTML = "";
    $container.append(canvas);
  }
}
