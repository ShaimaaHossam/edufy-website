import { useEffect } from "react";

import ImageDropbox from "../../../shared/components/inputs/ImageDropbox";
import { useTranslation } from "react-i18next";

import * as Yup from "yup";

import { useSelector, useDispatch } from "react-redux";
import { userSelector, rememberMe } from "../../../redux/userSlice";

import { useFormik } from "formik";

import { Grid, Box, Typography } from "@mui/material";
import TextInput from "../../../shared/components/inputs/TextInput";
import PasswordInput from "../../../shared/components/inputs/PasswordInput";
import SaveChanges from "../components/SaveChanges";
import CompanyFiles from "../components/CompanyFiles";

function Personal() {
  const { userData } = useSelector(userSelector);

  const personalInfo = useFormik({
    initialValues: {
      id: userData.user.id || "",
      name: userData.user.name || "",
      email: userData.user.email || "",
      job_title: userData.user.job_title || "",
      phone: userData.user.phone || "",
      image: userData.user.image || "",
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
      email: Yup.string().email("Invalid email formait").required(),
      password: Yup.string().required(),
    }),
  });

  console.log("id",personalInfo.values.email)
  return (
    <>
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
          fileName={personalInfo.values.combany.vat_certificate_file}
          category="VAT Certificate:"
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
        <SaveChanges />
      </Box>
    </>
  );
}

export default Personal;

