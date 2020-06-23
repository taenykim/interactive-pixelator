import { PixelatorOptions } from "../types";
export default class CanvasContainer {
    isDrawing: boolean;
    pixelSize: number;
    gridSize: number;
    gridColor: string;
    pixelType: string;
    filterType: string;
    canvas: HTMLCanvasElement;
    canvasFirstData: ImageData | null;
    constructor({ name, $container, image, options }: {
        name: string;
        $container: HTMLElement;
        image: HTMLImageElement;
        options: PixelatorOptions;
    });
    render($container: HTMLElement, canvas: HTMLCanvasElement): void;
    mousedownHandler(e: MouseEvent): void;
    mousemoveHandler(e: MouseEvent): void;
    mouseleaveHandler(): void;
}
