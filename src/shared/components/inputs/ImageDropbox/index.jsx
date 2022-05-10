import ImagePreview from "./ImagePreview";
import ImageUpload from "./ImageUpload";
import { Box, FormHelperText } from "@mui/material";

import useBase64 from "../../../hooks/useBase64";

function ImageInput({ lable, initialValue, onChange, helperText }) {
  const [baseImage, uploadImage, setBaseImage, error] = useBase64(
    initialValue,
    onChange
  );
  if (baseImage === "" || baseImage === undefined) {
    return (
      <Box>
        <ImageUpload lable={lable} uploadImage={uploadImage} />
        <FormHelperText sx={{ color: "error.main" }}>
          {error && helperText}
        </FormHelperText>
      </Box>
    );
  } else {
    return (
      <Box>
        <ImagePreview
          lable={lable}
          baseImage={baseImage}
          uploadImage={uploadImage}
          setBaseImage={setBaseImage}
        />
        <FormHelperText sx={{ color: "error.main" }}>
          {error && helperText}
        </FormHelperText>
      </Box>
    );
  }
}

export default ImageInput;
