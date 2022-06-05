import { useState, useEffect, useRef } from "react";

import { useTranslation } from "react-i18next";

import * as Yup from "yup";

import { useSelector, useDispatch } from "react-redux";
import { authSelector } from "../../../redux/slices/auth";

import {
  clearState,
  settingsSelector,
} from "../../../redux/services/SettingsServices";
import { updateCompanyInfo } from "../../../redux/services/SettingsServices";

import { useFormik } from "formik";

import { Box, Typography, Button } from "@mui/material";
import TextInput from "../../../shared/components/inputs/TextInput";
import ImageDropbox from "../../../shared/components/inputs/ImageDropbox";
import FileInput from "../../../shared/components/inputs/FileInput";
import Dialog from "../../../shared/components/Dialog";
import Alert from "../components/AlertMessage";

function CompanyInformation() {
  const { isSuccess, isError, errors, companyInfo } =
    useSelector(settingsSelector);
  const [open, setOpen] = useState(false);
  const imageRef = useRef(false);

  const { t } = useTranslation();

  const { company } = useSelector(authSelector);

  const [imagePath, setImagePath] = useState(company.logo_file);
  const [crFilePath, setCrFilePath] = useState(company.cr_file);
  const [id] = useState(company.id);

  const dispatch = useDispatch();

  const companylInfo = useFormik({
    initialValues: {
      name: company.name || "",
      address: company.address || "",
      vat_number: company.vat_number || "",
      logo_file: company.logo_file || "",
      cr_file: company.cr_file || "",
      cr_number: company.cr_number || "",
      vat_certificate_file: company.vat_certificate_file || "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required(t("required")),
      address: Yup.string().required(t("required")),
      vat_number: Yup.string().required(t("required")),
      cr_number: Yup.string().required(t("required")),
      cr_file: Yup.string().required(t("required")),
    }),
  });

  const handelSave = () => {
    dispatch(
      updateCompanyInfo({
        id: id,
        data: {
          ...companylInfo.values,
          cr_file: crFilePath,
          logo_file: imagePath,
        },
      })
    );

    setOpen(false);
  };

  useEffect(() => {
    imageRef.current = true;
    if (isError) {
      companylInfo.setErrors(errors);
    }
    if (isSuccess) {
      dispatch(clearState());
    }
  }, [isError, isSuccess, errors]);

  return (
    <>
      <Alert isSuccess={companyInfo} isError={errors} />
      <ImageDropbox
        lable="Logo"
        imagePath={imagePath}
        setImagePath={setImagePath}
        initialValue={companylInfo.values.logo_file}
        onChange={(path) => {
          if (imageRef.current) {
            setImagePath(path);
          }
        }}
        error={!!companylInfo?.errors.logo_file}
        helperText={
          companylInfo?.errors.logo_file || "Please upload only image"
        }
      />

      <Typography variant="h5" fontWeight="bold" mb={3} mt={5}>
        Legal information
      </Typography>

      <TextInput
        type="text"
        name="name"
        label="Legal Company Name"
        placeholder="Legal Company Name"
        {...companylInfo.getFieldProps("name")}
        sx={{
          marginBottom: 5,
        }}
        error={companylInfo.touched.name && !!companylInfo.errors.name}
        helperText={companylInfo.touched.name && companylInfo.errors.name}
      />
      <TextInput
        type="text"
        name="address"
        label="Address"
        placeholder="Address"
        {...companylInfo.getFieldProps("address")}
        error={companylInfo.touched.address && !!companylInfo.errors.address}
        helperText={companylInfo.touched.address && companylInfo.errors.address}
      />

      <Typography variant="h5" fontWeight="bold" mb={3} mt={8}>
        Company documents
      </Typography>

      <Box mb={3}>
        <FileInput
          initialValue={companylInfo.values.cr_file}
          placeholder="CR document"
          setFilePath={setCrFilePath}
          error={!!companylInfo.errors.cr_file}
          helperText={
            companylInfo.errors.cr_file || "Please upload CR document"
          }
        />
      </Box>

      <TextInput
        type="text"
        name="cr_number"
        label="CR Number"
        placeholder="CR Number"
        {...companylInfo.getFieldProps("cr_number")}
        error={
          companylInfo.touched.cr_number && !!companylInfo.errors.cr_number
        }
        helperText={
          companylInfo.touched.cr_number && companylInfo.errors.cr_number
        }
        sx={{
          marginBottom: 3,
        }}
      />

      <Box mb={3}>
        <FileInput
          initialValue={companylInfo.values.vat_certificate_file}
          placeholder="Vat document"
          category="vat"
        />
      </Box>
      <TextInput
        type="text"
        name="vat_number"
        label="VAT Number"
        placeholder="VAT Number"
        {...companylInfo.getFieldProps("vat_number")}
        error={
          companylInfo.touched.vat_number && !!companylInfo.errors.vat_number
        }
        helperText={
          companylInfo.touched.vat_number && companylInfo.errors.vat_number
        }
      />

      <Box textAlign="right" mt={6} mb={4}>
        <Dialog
          title="Are you sure you want to Save changes ?"
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          onConfirm={handelSave}
        />
        <Button
          type="submit"
          sx={{
            backgroundColor: "success.main",
            color: "white",
            "&:hover": { backgroundColor: "success.main" },
          }}
          onClick={() => {
            setOpen(true);
          }}
        >
          Save Changes
        </Button>
      </Box>
    </>
  );
}

export default CompanyInformation;
