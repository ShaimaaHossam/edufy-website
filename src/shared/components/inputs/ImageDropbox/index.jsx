import ImagePreview from "./ImagePreview";
import ImageUpload from "./ImageUpload";

import useBase64 from "../../../hooks/useBase64";

function ImageInput({ lable, initialValue, onChange, helperText }) {
  const [baseImage, uploadImage, setBaseImage, error] = useBase64(
    initialValue,
    onChange
  );
  if (baseImage === "" || baseImage === undefined) {
    return (
      <ImageUpload
        lable={lable}
        uploadImage={uploadImage}
        error={error}
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
        error={error}
        helperText={helperText}
      />
    );
  }
}

export default ImageInput;
