import { SvgIcon, Grid, Typography } from "@mui/material";
import { mdiImagePlus } from "@mdi/js";
import useBase64 from "../../../hooks/useBase64";

const ImageUpload = ({lable, uploadImage}) => {
  
  return (
    <Grid>
      <label
        htmlFor={`${lable}-image`}
        style={{
          borderWidth: 2,
          borderRadius:4,
          borderStyle: "dotted",
          display: "inline-block",
          width:123,
          height:120,
          borderColor: "#D5D9E5",
          backgroundColor:"#FCFCFCB0",
          cursor:"pointer"
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
        <Grid  container  direction="column" justifyContent="center"  alignItems="center" marginTop={4}>
          <SvgIcon fontSize="small">
            <path d={mdiImagePlus}  color="#ADB5D1"/>
          </SvgIcon>
          <Typography color="text.primary" variant="subtitle2" mt={4}>
            {lable}
          </Typography>
        </Grid>
      </label>
    </Grid>
  );
};

export default ImageUpload;
