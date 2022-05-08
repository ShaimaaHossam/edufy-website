import { useRef } from "react";
import useBase64 from "../../../hooks/useBase64";
import { SvgIcon, Grid, Typography, useTheme, IconButton } from "@mui/material";

import { mdiPencil, mdiDelete } from "@mdi/js";

function ImageEdite() {
  const [iamge, uploadImage, setBaseImage] = useBase64();
  const fileInputRef = useRef();

  return (
    <>
      <label
        htmlFor={`${iamge}-image`}
        style={{
          borderWidth: 3,
          borderRadius: 4,
          borderStyle: "dotted",
          display: "inline-block",
          width: 123,
          height: 123,
          borderColor: "#D5D9E5",
          backgroundColor: "#FCFCFCB0",
          backgroundImage: `url(${iamge})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <input
          id={`${iamge}-image`}
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
            setBaseImage("");
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
    </>
  );
}

export default ImageEdite;
