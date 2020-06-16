import CanvasContainer from "./components/CanvasContainer";

// const pixelSize = 100;
// const gridSize = 10;
// const gridColor = "#ffffff";
// const pixelType = "square";

export default class PixelImage {
  constructor(name, imageSrc, pixelSize, gridSize, gridColor, pixelType) {
    const $container = document.getElementById(`${name}`);
    this.$container = $container;

    const img = new Image();
    img.src = imageSrc;
    img.addEventListener("load", () => {
      const image = img;
      this.$target = new CanvasContainer({
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
