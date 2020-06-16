import CanvasContainer from "./components/CanvasContainer";

export default class PixelImage {
  $container: HTMLElement | null;
  $target: CanvasContainer | null;
  constructor(name: string, imageSrc: string, pixelSize: number, gridSize: number, gridColor: string, pixelType: string) {
    const $container = document.getElementById(`${name}`);
    this.$container = $container;
    this.$target = null;

    const img = new Image();
    img.src = imageSrc;
    if ($container)
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
