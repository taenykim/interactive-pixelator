import UploadContainer from "./components/UploadContainer";
import CanvasContainer from "./components/CanvasContainer";

export default class Pixelator {
  $container: HTMLElement | null;
  $target: UploadContainer | CanvasContainer | null;
  constructor(name: string, pixelSize: number, gridSize: number, gridColor: string, pixelType: string) {
    const $container = document.getElementById(`${name}`);
    this.$container = $container;
    this.$target = null;

    if ($container)
      this.$target = new UploadContainer({
        name,
        $container,
        updateImageData: (image: HTMLImageElement) => {
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
