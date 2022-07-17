import ImagePreview from "./ImagePreview";
import ImageUpload from "./ImageUpload";

import useBase64 from "../../../hooks/useBase64";
import { useEffect } from "react";
import { Grid } from "@mui/material";

function ImageInput({
  lable,
  initialValue,
  onChange,
  pushToBaseImages,
  helperText,
  setImagePath,
  imagePath,
  error,
  isMulti = false,
}) {
  const [baseImage, uploadImage, setBaseImage, err, setError] = useBase64(
    initialValue,
    onChange,
    pushToBaseImages,
    isMulti,
    setImagePath,
    imagePath,
    error
  );

  if (isMulti) {
    return (
      <ImageUpload
        lable={lable}
        uploadImage={uploadImage}
        error={err}
        helperText={helperText}
        isMulti
      />
    );
  }

  if (baseImage === "" || baseImage === undefined) {
    return (
      <ImageUpload
        lable={lable}
        uploadImage={uploadImage}
        error={err}
        helperText={helperText}
      />
    );
  } else {
    return (
      <ImagePreview
        lable={lable}
        baseImage={baseImage}
        uploadImage={uploadImage}
        setBaseImage={setBaseImage}
        error={err}
        setError={setError}
        helperText={helperText}
        setImagePath={setImagePath}
      />
    );
  }
}

export default ImageInput;
