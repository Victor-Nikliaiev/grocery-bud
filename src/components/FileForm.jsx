import React from "react";
import { GoCloudDownload, GoCloudUpload } from "react-icons/go";
import { BiSelectMultiple } from "react-icons/bi";

const FileForm = ({
  handleFileChange,
  handleFileSubmit,
  downloadFile,
  realBtnRef,
  customTxt,
}) => {
  return (
    <form onSubmit={(e) => handleFileSubmit(e)}>
      <p className="fileIntro">You can download or upload, your list</p>
      <button
        onClick={() =>
          downloadFile("itemsList.json", localStorage.getItem("list"))
        }
        className="fileBtn"
        type="button"
      >
        <GoCloudDownload />
        <span>download the list</span>
      </button>
      <input
        ref={realBtnRef}
        type="file"
        accept="application/JSON"
        id="realFileBtn"
        onChange={(e) => handleFileChange(e)}
        className="inputFile"
      />

      <div className="fileGroup">
        <button
          type="button"
          id="custom-button"
          onClick={(e) => {
            realBtnRef.current.click();
          }}
          className="fileBtn"
        >
          <BiSelectMultiple />
          <span>choose a list</span>
        </button>
        <span id="custom-text">{customTxt}</span>
        <button type="submit" className="fileBtn">
          <GoCloudUpload />
          <span>upload a list</span>
        </button>
      </div>
    </form>
  );
};

export default FileForm;
