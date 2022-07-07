import { SvgIcon, Box, Typography, FormHelperText } from "@mui/material";
import { mdiImagePlus } from "@mdi/js";

function ImageUpload({ lable, uploadImage, error, helperText }) {
  return (
    <>
      <label
        htmlFor={`${lable}-image`}
        style={{
          borderWidth: 2,
          borderRadius: 4,
          borderStyle: "dotted",
          display: "inline-block",
          width: 123,
          height: 120,
          borderColor: error ? "#FC2424" : "#D5D9E5",
          backgroundColor: "#FCFCFCB0",
          cursor: "pointer",
        }}
      >
        <input
          id={`${lable}-image`}
          type="file"
          onChange={(e) => {
            uploadImage(e);
          }}
          style={{
            display: "none",
          }}
        />
        <Box
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          pt={4}
        >
          <SvgIcon fontSize="small">
            <path d={mdiImagePlus} color="#ADB5D1" />
          </SvgIcon>
          <Typography color="text.primary" variant="subtitle2" mt={1}>
            {lable}
          </Typography>
        </Box>
      </label>
      <FormHelperText sx={{ color: "error.main" }}>
        {error && helperText}
      </FormHelperText>
    </>
  );
}

export default ImageUpload;