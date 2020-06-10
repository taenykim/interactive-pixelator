import React from "react";

const UploadContainer = ({ updateImageData }) => {
  const handleImage = (e) => {
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

  return (
    <>
      <label htmlFor="upload" className="upload-label">
        <p className="upload-description">UPLOAD IMAGE</p>
        <img className="upload-imgBtn" src="https://uploads.codesandbox.io/uploads/user/1dcc6c5f-ac13-4c27-b2e3-32ade1d213e9/2Go1-photo.svg" />
      </label>
      <div>
        <input type="file" accept="image/*" id="upload" className="image-upload" hidden onChange={handleImage} />
      </div>
    </>
  );
};

export default UploadContainer;
