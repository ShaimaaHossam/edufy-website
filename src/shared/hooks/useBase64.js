import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/slices/auth";

function useBase64(initialValue, onChange, pushToBaseImages, isMulti, setImagePath, imagePath, error) {
  const [baseImage, setBaseImage] = useState(initialValue);
  const { token } = useSelector(authSelector);
  const [err, setError] = useState(error);

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
      let formData = new FormData();
      formData.append("file", file);
      let response = await fetch(
        "https://api.stage.marafeq.munjz.com/v1/actions/upload",
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + token,
          },
          body: formData,
        }
      );
      let result = await response.json();
      setImagePath(result.data.path);
      setBaseImage(base64);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    onChange(imagePath);
  }, [imagePath]);
  useEffect(() => {
    if (isMulti) {
      pushToBaseImages(baseImage);
    }
  }, [baseImage, isMulti]);

  return [baseImage, uploadImage, setBaseImage, err, setError];
}

export default useBase64;
