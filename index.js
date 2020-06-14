import "./index.css";
import { UploadContainer } from "./UploadContainer";
import { CanvasContainer } from "./CanvasContainer";
import { drawCanvas } from "./drawCanvas";

const onChangeInputHandler = (e) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;

    img.onload = () => {
      updateImageData(img);
    };
  };
  reader.readAsDataURL(e.target.files[0]);
};

const updateImageData = (image) => {
  container.innerHTML = CanvasContainer(image);
  const canvas = document.createElement("canvas");
  canvas.id = "canvas";
  let canvasContainer = document.getElementById("canvas-container");
  canvasContainer.append(canvas);
  drawCanvas(canvas, image, 100, 1, "#ffffff");
};

const container = document.getElementById("pixelator-container");

container.innerHTML = UploadContainer();

const upload = document.getElementById("upload");
upload.onchange = onChangeInputHandler;

// {!imageData ? (
//   <UploadContainer updateImageData={handleUpdateImageData} />
// ) : (
//   <CanvasContainer image={imageData} pixelSize={pixelSize} gridSize={gridSize} gridColor={gridColor} pixelType={pixelType} />
// )}
