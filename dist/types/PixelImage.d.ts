import CanvasContainer from "./components/CanvasContainer";
export default class PixelImage {
    $container: HTMLElement | null;
    $target: CanvasContainer | null;
    constructor(name: string, imageSrc: string, pixelSize: number, gridSize: number, gridColor: string, pixelType: string);
}
