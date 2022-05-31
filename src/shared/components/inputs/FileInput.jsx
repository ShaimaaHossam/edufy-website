import { useRef, useState } from "react";
import { Box, Typography, Button, SvgIcon, IconButton } from "@mui/material";
import Dialog from "../Dialog";

import { useDispatch } from "react-redux";
import { uploadFile } from "../../../redux/uploadFileSlice";

import { mdiDelete } from "@mdi/js";

function FileInput({ initialValue, placeholder = "", category }) {
  const fileInputRef = useRef();
  const [file, setFile] = useState(initialValue);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const uploadPdfFile = async (e) => {
    const targetFile = e.target.files[0];
    dispatch(uploadFile({file: targetFile}));
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
    <Box
      sx={{
        borderWidth: 2,
        borderRadius: 1,
        borderStyle: "solid",
        display: "inline-block",
        width: "100%",
        padding: 1,
        borderColor: "#D5D9E5",
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
  );
}

export default FileInput;
