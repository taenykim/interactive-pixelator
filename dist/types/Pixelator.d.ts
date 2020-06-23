import CanvasContainer from "./components/CanvasContainer";
import { PixelatorOptions } from "./types";
export default class Pixelator {
    $container: HTMLElement | null;
    $target: CanvasContainer | null;
    constructor(name: string, imageSrc: string, options?: PixelatorOptions);
}
