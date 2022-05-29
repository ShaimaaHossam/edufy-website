import { useState, useEffect } from "react";

import ImageDropbox from "../../../shared/components/inputs/ImageDropbox";
import { useTranslation } from "react-i18next";

import * as Yup from "yup";

import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../../redux/userSlice";
import { uploadFileSelector } from "../../../redux/uploadFileSlice";

import {
  clearState,
  settingsSelector,
} from "../../../redux/services/SettingsServices";
import { updatePersonalInfo } from "../../../redux/services/SettingsServices";

import { useFormik } from "formik";

import { Box, Typography, Button } from "@mui/material";
import TextInput from "../../../shared/components/inputs/TextInput";
import PasswordInput from "../../../shared/components/inputs/PasswordInput";
import Dialog from "../../../shared/components/Dialog";
import CompanyFiles from "../components/CompanyFiles";

function Personal() {
  const { userData } = useSelector(userSelector);
  const { path } = useSelector(uploadFileSelector);

  const {  isSuccess, isError, errors } =
    useSelector(settingsSelector);
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState(userData.user.image);
  const [crFile, setCrFile] = useState(userData.company.cr_file);
  const dispatch = useDispatch();
  const personalInfo = useFormik({
    initialValues: {
      id: userData.user.id || "",
      name: userData.user.name || "",
      email: userData.user.email || "",
      job_title: userData.user.job_title || "",
      company_id: userData.user.company_id,
      phone: userData.user.phone.slice(4, userData.user.phone.length) || "",
      image: img || "",
      password: {
        current: "",
        new: "",
      },
      combany: {
        name: "",
        legal_name: "",
        vat_number: userData.company.vat_number,
        cr_file: userData.company.cr_file,
        vat_certificate_file: userData.company.vat_certificate_file,
      },
    },
    onSubmit: (values) => {
      console.log("values", values);
    },
    validationSchema: Yup.object({
      phone: Yup.string(),
      name: Yup.string(),
      email: Yup.string().email("Invalid email formait"),
      job_title: Yup.string(),
      image: Yup.string(),
    }),
  });

  const handelSave = () => {
    dispatch(
      updatePersonalInfo({
        ...personalInfo.values,
        image: path,
        phone: `+966${personalInfo.values.phone}`,
      })
    );
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (isError) {
      personalInfo.setErrors(errors);
      console.log("error", errors);
    }

    if (isSuccess) {
      dispatch(clearState());
    }
  }, [isError, isSuccess]);



  return (
    <>
      <ImageDropbox
        lable="Image"
        initialValue={personalInfo.values.image}
        onChange={(img) => {
          personalInfo.setFieldValue("image", img)
          setImg(img);
        }}
        helperText="err"
      />
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Personal Information
      </Typography>
      <TextInput
        type="text"
        name="name"
        label="name"
        placeholder="name"
        {...personalInfo.getFieldProps("name")}
        sx={{
          marginBottom: 3,
        }}
      />
      <Box display="flex">
        <TextInput
          type="text"
          name="job_title"
          label="Job Title"
          placeholder="Job Title Here"
          {...personalInfo.getFieldProps("job_title")}
          sx={{
            marginRight: 3,
          }}
        />
        <TextInput
          type="text"
          name="name"
          label="Company Name"
          placeholder="Company name here"
          {...personalInfo.getFieldProps("combany.name")}
        />
      </Box>

      <Typography variant="h5" fontWeight="bold" mb={3} mt={3}>
        Change Password
      </Typography>
      <Box display="flex">
        <PasswordInput
          name="current"
          label="Current Password"
          placeholder="Current Password"
          {...personalInfo.getFieldProps("password.current")}
          sx={{
            marginRight: 3,
          }}
        />
        <PasswordInput
          name="new"
          label="New Password"
          placeholder="New Password"
          {...personalInfo.getFieldProps("password.new")}
        />
      </Box>

      <Typography variant="h5" fontWeight="bold" mb={3} mt={3}>
        Legal information
      </Typography>
      <TextInput
        type="text"
        name="legal_name"
        label="Legal Company Name"
        placeholder="Legal Company Name"
        {...personalInfo.getFieldProps("combany.legal_name")}
        sx={{
          marginBottom: 3,
        }}
      />
      <TextInput
        type="text"
        name="name"
        label="VAT Number"
        placeholder="VAT Number"
        {...personalInfo.getFieldProps("combany.vat_number")}
      />

      <Typography variant="h5" fontWeight="bold" mb={3} mt={3}>
        Company Documents
      </Typography>
      <Box display="flex" justifyContent="space-between" width="50%">
        <CompanyFiles
          fileName={personalInfo.values.combany.cr_file}
          category="CR:"
        />
        <CompanyFiles
          fileName={personalInfo.values.combany.cr_file}
          category="CR:"
        />
       
      </Box>

      <Typography variant="h5" fontWeight="bold" mb={3} mt={3}>
        Contact Information
      </Typography>
      <Box display="flex">
        <TextInput
          type="text"
          name="phone"
          label="Phone Number"
          placeholder="Phone Number"
          error={personalInfo.errors.phone}
          helperText={personalInfo.errors.phone}
          {...personalInfo.getFieldProps("phone")}
          sx={{
            marginRight: 3,
          }}
        />
        <TextInput
          type="text"
          name="email"
          label="Email"
          placeholder="Email"
          {...personalInfo.getFieldProps("email")}
        />
      </Box>

      <Box textAlign="right" mt={6} mb={4}>
        {/* <SaveChanges handelSave={handelSave} /> */}
        <Dialog
          title="Are you sure you want to Save changes ?"
          open={open}
          onClose={handleClose}
          onConfirm={handelSave}
        />
        <Button
          type="submit"
          sx={{
            backgroundColor: "success.main",
            color: "white",
            "&:hover": { backgroundColor: "success.main" },
          }}
          onClick={handleOpen}
        >
          Save Changes
        </Button>
      </Box>
    </>
  );
}

export default Personal;
