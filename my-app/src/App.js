import React, { useState } from "react";
import "./App.css";
import { resizeImage } from "./resizeImage";

const App = () => {
  const [imagePreviewData, setImagePreviewData] = useState(null);

  const handleImage = (e) => {
    const reader = new FileReader();

    // FileReader load 이벤트핸들러 등록 (성공시에만 트리거됨)
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      // Image load 이벤트핸들러 등록
      img.onload = (imageEvent) => {
        // 이미지가 로드가 되면! 리사이즈 함수가 실행되도록 합니다.
        resize_image(img);
      };
    };
    // FileReader가 데이터 읽기 시작 -> 데이터 다 읽으면 load이벤트 발생
    reader.readAsDataURL(e.target.files[0]);
  };
  const resize_image = (image) => {
    const [width, height] = resizeImage(image);
    let canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(image, 0, 0, width, height);
    const dataUrl = canvas.toDataURL("image/jpeg");
    // 미리보기 위해서 마크업 추가.
    setImagePreviewData(dataUrl);
  };

  return (
    <div className="App">
      <div className="upload-wrapper">
        {!imagePreviewData ? (
          <div>
            <label htmlFor="upload" className="upload-label">
              <div>
                <p className="upload-description">✨UPLOAD IMAGE ✨</p>
                <img className="upload-imgBtn" src="https://uploads.codesandbox.io/uploads/user/1dcc6c5f-ac13-4c27-b2e3-32ade1d213e9/2Go1-photo.svg" />
              </div>
            </label>
            <div>
              <input type="file" accept="image/*" id="upload" className="image-upload" hidden multiple onChange={handleImage} />
            </div>
          </div>
        ) : (
          <div className="image-preview">
            <img className="img-item" src={imagePreviewData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
