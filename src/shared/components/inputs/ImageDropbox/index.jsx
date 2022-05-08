import ImagePreview from "./ImagePreview";
import ImageUpload from "./ImageUpload";

import useBase64 from "../../../hooks/useBase64";

function ImageInput({ lable, initialValue, onChange }) {
  const [baseImage, uploadImage, setBaseImage] = useBase64(
    initialValue,
    onChange
  );
  if (baseImage == "") {
    return <ImageUpload lable={lable} uploadImage={uploadImage} />;
  } else {
    return (
      <ImagePreview
        lable={lable}
        baseImage={baseImage}
        uploadImage={uploadImage}
        setBaseImage={setBaseImage}
      />
    );
  }
}

export default ImageInput;
