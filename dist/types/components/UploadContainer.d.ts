export default class UploadContainer {
    updateImageData: Function;
    constructor({ name, $container, updateImageData }: {
        name: string;
        $container: HTMLElement;
        updateImageData: Function;
    });
    render($container: HTMLElement, label: HTMLLabelElement, div: HTMLDivElement): void;
}
