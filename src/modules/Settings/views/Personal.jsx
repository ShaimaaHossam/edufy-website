import { useEffect } from "react";

import ImageDropbox from "../../../shared/components/inputs/ImageDropbox";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import { useSelector, useDispatch } from "react-redux";
import { userSelector, rememberMe } from "../../../redux/userSlice";

import { useFormik } from "formik";

import {Grid} from "@mui/material";
import TextInput from "../../../shared/components/inputs/TextInput";
import PasswordInput from "../../../shared/components/inputs/PasswordInput";

function Personal() {
  const { userData } = useSelector(userSelector);

  const personalInfo = useFormik({
    initialValues: {
      id: userData.user.id || "",
      name: userData.user.name || "",
      email: userData.user.email || "",
      job_title: userData.user.job_title || "",
      phone:userData.user.phone || "",
      image: userData.user.image || "",
      password:{
        current:"",
        new:""
      },
      combany:{
        name:"",
        legal_name:"",
        vat_number: userData.company.vat_number,
        cr_file: userData.company.cr_file,
        vat_certificate_file: userData.company.vat_certificate_file
      },
      
    },
    
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email formait")
        .required(),
      password: Yup.string().required(),
    }),
  });
 
  return <Grid></Grid>;
}

export default Personal;

// {
//     "id": "1000",
//     "name": "{{$randomFullName}}",
//     "email": "{{$randomEmail}}",
//     "job_title": "{{$randomFullName}}",
//     "phone": "{{$randomFullName}}",
//     "image": "{{$randomFullName}}",
//     "password": {
//         "current": "",
//         "new": ""
//     },
//     "company": {
//         "name": "{{$randomFullName}}",
//         "legal_name": "{{$randomFullName}}",
//         "vat_number": "{{$randomInt}}",
//         "cr_file": "{{$randomFilePath}}",
//         "vat_certificate_file": "{{$randomFilePath}}"
//     },
//     
// }

