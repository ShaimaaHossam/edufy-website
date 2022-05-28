import { Box, IconButton, SvgIcon, Typography } from "@mui/material";

import { mdiFilePdfBox } from "@mdi/js";
function CompanyFiles({ fileName, category }) {
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
            onChange={(e) => {}}
            style={{
              display: "none",
            }}
          />
          <Typography sx={{ textDecoration: "underline" }}>
            Upload File
          </Typography>
        </label>
      </>
    </Box>
  );
}

export default CompanyFiles;
