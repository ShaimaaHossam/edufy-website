import { useState, useEffect } from "react";
function useBase64(initialValue, onChange) {
  const [baseImage, setBaseImage] = useState(initialValue);
  const [error, setError] = useState(false);
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const vaildImage = ["jepg", "png", "jpg"];
    const extIndex = file.name.lastIndexOf(".");
    const ext = file.name.substring(extIndex).split(".")[1].toLowerCase();

    if (vaildImage.find((val) => ext === val)) {
      setError(false);
      const base64 = await convertBase64(file);
      setBaseImage(base64);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    onChange(baseImage);
  }, [baseImage, onChange]);

  return [baseImage, uploadImage, setBaseImage, error];
}

export default useBase64;