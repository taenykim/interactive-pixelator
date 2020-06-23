import CanvasContainer from "./components/CanvasContainer";
import { PixelatorOptions } from "./types";

export default class Pixelator {
  $container: HTMLElement | null;
  $target: CanvasContainer | null;
  constructor(name: string, imageSrc: string, options: PixelatorOptions = {}) {
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
          options,
        });
      });
  }
}
