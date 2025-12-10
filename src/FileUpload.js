import React, { useState } from "react";
import "./FileUpload.css";

function FileUpload({ setFile, inputId }) {
  const [preview, setPreview] = useState(null);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const triggerFilePicker = () => {
    document.getElementById(inputId).click();
  };

  return (
    <div className="upload-wrapper">
      <label className="upload-label">Photo</label>

      <div className="upload-rect" onClick={triggerFilePicker}>
        {preview ? (
          <img src={preview} alt="preview" className="upload-image" />
        ) : (
          <button type="button" className="upload-btn-inside">
            Choisir une image
          </button>
        )}
      </div>

      {preview && (
        <button
          type="button"
          className="change-photo-btn"
          onClick={triggerFilePicker}
        >
          Changer l’image
        </button>
      )}

      <input
        id={inputId}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default FileUpload;
