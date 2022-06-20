import { useRef, useState } from "react";
import { SvgIcon, IconButton, FormHelperText } from "@mui/material";

import { mdiPencil, mdiDelete } from "@mdi/js";

function ImagePreview({
  lable,
  baseImage,
  uploadImage,
  error,
  helperText,
  setImagePath,
  setBaseImage,
  setError,
}) {
  const fileInputRef = useRef();
  return (
    <>
      <label
        htmlFor={`${lable}-lable`}
        style={{
          borderWidth: 3,
          borderRadius: 4,
          borderStyle: "dotted",
          display: "inline-block",
          width: 123,
          height: 123,
          borderColor: error ? "#FC2424" : "#D5D9E5",
          backgroundColor: "#FCFCFCB0",
          backgroundImage: `url(${baseImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <input
          id={`${lable}-lable`}
          type="file"
          style={{
            display: "none",
          }}
          ref={fileInputRef}
          onChange={(e) => {
            uploadImage(e);
          }}
        />
        <IconButton
          position="relative"
          onClick={() => {
            fileInputRef.current.click();
          }}
          sx={{
            borderRadius: "100%",
            backgroundColor: "#EBEDF3",
            width: 29,
            height: 29,
            padding: 1,
            position: "absolute",
            transform: "translate(80px, 5px)",
            cursor: "pointer",
            color: "text.primary",
            "&:hover": {
              backgroundColor: "#FFF",
            },
          }}
        >
          <SvgIcon fontSize="small">
            <path d={mdiPencil} />
          </SvgIcon>
        </IconButton>
        <IconButton
          position="relative"
          onClick={() => {
            setImagePath(null);
            setBaseImage("");
            setError(true);
          }}
          sx={{
            borderRadius: "100%",
            backgroundColor: "#EBEDF3",
            position: "absolute",
            width: 29,
            height: 29,
            padding: 1,
            transform: "translate(80px, 40px)",
            cursor: "pointer",
            color: "text.primary",
            "&:hover": {
              backgroundColor: "#FFF",
            },
          }}
        >
          <SvgIcon fontSize="small">
            <path d={mdiDelete} />
          </SvgIcon>
        </IconButton>
      </label>
      <FormHelperText sx={{ color: "error.main" }}>
        {error && helperText}
      </FormHelperText>
    </>
  );
}

export default ImagePreview;