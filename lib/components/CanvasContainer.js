import { drawCanvas } from "../utils/drawCanvas";

export default class CanvasContainer {
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
