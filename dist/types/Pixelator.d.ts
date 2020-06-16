import UploadContainer from "./components/UploadContainer";
import CanvasContainer from "./components/CanvasContainer";
export default class Pixelator {
    $container: HTMLElement | null;
    $target: UploadContainer | CanvasContainer | null;
    constructor(name: string, pixelSize: number, gridSize: number, gridColor: string, pixelType: string);
}
