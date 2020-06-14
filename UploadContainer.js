import { CanvasContainer } from "./CanvasContainer";
export const UploadContainer = () => {
  return `<label for="upload" class="upload-label">
    <p class="upload-description">UPLOAD IMAGE</p>
    <img class="upload-imgBtn" src="https://uploads.codesandbox.io/uploads/user/1dcc6c5f-ac13-4c27-b2e3-32ade1d213e9/2Go1-photo.svg" />
    </label>
    <div>
    <input type="file" accept="image/*" id="upload" class="image-upload" hidden />
    </div>`;
};
