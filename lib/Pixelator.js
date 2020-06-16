import UploadContainer from "./components/UploadContainer";
import CanvasContainer from "./components/CanvasContainer";

// const pixelSize = 100;
// const gridSize = 10;
// const gridColor = "#ffffff";
// const pixelType = "square";

export default class Pixelator {
  constructor(name, pixelSize, gridSize, gridColor, pixelType) {
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
