import ImagePreview from "./ImagePreview";
import ImageUpload from "./ImageUpload";

import useBase64 from "../../../hooks/useBase64";

function ImageInput({ lable, initialValue, onChange, helperText,  setImagePath, imagePath, error }) {
  const [baseImage, uploadImage, setBaseImage, err, setError] = useBase64(
    initialValue,
    onChange, 
    setImagePath,
    imagePath, 
    error
  );
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
