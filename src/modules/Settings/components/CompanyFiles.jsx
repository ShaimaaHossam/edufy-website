import { useState } from "react";

import { Box, SvgIcon, Typography } from "@mui/material";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

import { mdiFilePdfBox } from "@mdi/js";
function CompanyFiles({ fileName, category }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState("");

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    console.log("file", file);
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const Comp = () => {
    return (
      <header className="App-header">
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          <Page height="123" width="123" pageNumber={pageNumber} />
          <Typography color="text.primary" variant="subtitle2" mt={1}>
            {file.name}
          </Typography>
        </Document>
      </header>
    );
  };
  return (
    <Box>
      <Typography variant="p">{category}</Typography>
      <Box
        style={{
          borderWidth: 3,
          borderRadius: 4,
          borderStyle: "dotted",
          width: 123,
          height: 123,
          borderColor: "#D5D9E5",
          backgroundColor: "#FCFCFCB0",
          backgroundPosition: "center",
          backgroundSize: "cover",
          textAlign: "center",
          marginTop: 5,
        }}
      >
        <SvgIcon fontSize="large">
          <path d={mdiFilePdfBox} />
        </SvgIcon>

        <Typography color="text.primary" variant="subtitle2" mt={1}>
          {fileName}
        </Typography>
      </Box>
      <>
        <label htmlFor={`${fileName}-file`}>
          <input
            id={`${fileName}-file`}
            type="file"
            onChange={(e) => {
              uploadFile(e);
            }}
            style={{
              display: "none",
            }}
            accept="application/pdf,application/vnd.ms-excel"
          />
          <Typography sx={{ textDecoration: "underline" }}>
            Upload File
          </Typography>
        </label>
        <Comp />
      </>
    </Box>
  );
}

export default CompanyFiles;
