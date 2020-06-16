export default class CanvasContainer {
    isDrawing: boolean;
    pixelSize: number;
    gridSize: number;
    gridColor: string;
    pixelType: string;
    canvas: HTMLCanvasElement;
    canvasFirstData: ImageData | null;
    constructor({ name, $container, image, pixelSize, gridSize, gridColor, pixelType, }: {
        name: string;
        $container: HTMLElement;
        image: HTMLImageElement;
        pixelSize: number;
        gridSize: number;
        gridColor: string;
        pixelType: string;
    });
    render($container: HTMLElement, canvas: HTMLCanvasElement): void;
    mousedownHandler(e: MouseEvent): void;
    mousemoveHandler(e: MouseEvent): void;
    mouseleaveHandler(): void;
}
