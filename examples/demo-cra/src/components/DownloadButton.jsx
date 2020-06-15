import React from "react";

const DownloadButton = ({ downloadHandler }) => {
  return (
    <button type="button" onClick={downloadHandler}>
      Download to png
    </button>
  );
};

export default DownloadButton;
