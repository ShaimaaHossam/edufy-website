import { useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  SvgIcon,
  IconButton,
  FormHelperText,
} from "@mui/material";
import Dialog from "../Dialog";

import { useSelector } from "react-redux";
import { authSelector } from "../../../redux/slices/auth";

import { mdiDelete } from "@mdi/js";

function FileInput({
  initialValue,
  placeholder = "",
  category,
  setFilePath,
  error,
  helperText,
}) {
  const fileInputRef = useRef();
  const [file, setFile] = useState(initialValue);
  const [err, setErr] = useState(error);

  const { token } = useSelector(authSelector);
  const [open, setOpen] = useState(false);

  const uploadPdfFile = async (e) => {
    const targetFile = e.target.files[0];
    let formData = new FormData();
    formData.append("file", targetFile);
    let response = await fetch(
      "https://api.stage.marafeq.munjz.com/v1/actions/upload",
      {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + token,
        },
        body: formData,
      }
    );
    let result = await response.json();
    setFilePath(result.data.path);
    setFile(targetFile.name);
  };

  if (open) {
    return (
      <Dialog
        title="Please contact Munjiz to upload a new VAT"
        open={open}
        onConfirm={() => {
          setOpen(false);
        }}
        confirmLabel="Contact Munjz"
        onClose={() => {
          setOpen(false);
        }}
      />
    );
  }

  return (
    <>
      <Box
        sx={{
          borderWidth: 2,
          borderRadius: 1,
          borderStyle: "solid",
          display: "inline-block",
          width: "100%",
          padding: 1,
          borderColor: err ? "#FC2424" : "#D5D9E5",
          position: "relative",
        }}
      >
        <form id={`${file}-formElem`}>
          <label htmlFor={`${file}-file`}>
            <input
              id={`${file}-file`}
              type="file"
              name="file"
              accept="application/pdf,application/vnd.ms-excel"
              style={{
                display: "none",
              }}
              onChange={(e) => {
                uploadPdfFile(e);
                setErr(false);
              }}
              ref={fileInputRef}
            />
          </label>
        </form>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: "realtive",
          }}
        >
          <Button
            onClick={() => {
              if (category === "vat") {
                setOpen(true);
              } else {
                fileInputRef.current.click();
              }
            }}
          >
            {file ? `Change ${placeholder}` : `Upload ${placeholder}`}
          </Button>

          <Typography
            variant="p"
            ml={3}
            sx={{
              position: "absolute",
              transform: "translate(175px, 8px)",
            }}
          >
            {file ? file : "There are No Document Uploaded"}
          </Typography>

          {file ? (
            <IconButton
              position="relative"
              onClick={() => {
                if (category === "vat") {
                  setOpen(true);
                } else {
                  setFile("");
                  setFilePath(null);
                  setErr(true);
                }
              }}
            >
              <SvgIcon fontSize="small">
                <path d={mdiDelete} />
              </SvgIcon>

              <Dialog
                title="Are you sure you want to change Vat document ?"
                open={open}
                onConfirm={() => {
                  setOpen(false);
                }}
                onClose={() => {
                  setOpen(false);
                }}
              />
            </IconButton>
          ) : null}
        </Box>
      </Box>
      <FormHelperText sx={{ color: "error.main" }}>
        {err && helperText}
      </FormHelperText>
    </>
  );
}

export default FileInput;
