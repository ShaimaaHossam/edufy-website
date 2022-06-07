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

  const { t } = useTranslation("settings");

  const { company } = useSelector(authSelector);

  const [imagePath, setImagePath] = useState(company.logo_file);
  const [crFilePath, setCrFilePath] = useState(company.cr_file);

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
        id: company.id,
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
        lable={t("logo")}
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
          companylInfo?.errors.logo_file || t("imageError")
        }
      />

      <Typography variant="h5"  mb={3} mt={5}>
        {t("legalInformation")}
      </Typography>

      <TextInput
        type="text"
        name="name"
        label={t("legalCompanyName")}
        placeholder={t("legalCompanyName")}
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
        label={t("adress")}
        placeholder={t("adress")}
        {...companylInfo.getFieldProps("address")}
        error={companylInfo.touched.address && !!companylInfo.errors.address}
        helperText={companylInfo.touched.address && companylInfo.errors.address}
      />

      <Typography variant="h5"  mb={3} mt={8}>
        {t("companyDocuments")}
      </Typography>

      <Box mb={3}>
        <FileInput
          initialValue={companylInfo.values.cr_file}
          placeholder={t("crDocument")}
          setFilePath={setCrFilePath}
          error={!!companylInfo.errors.cr_file}
          helperText={
            companylInfo.errors.cr_file || t("crError")
          }
        />
      </Box>

      <TextInput
        type="text"
        name="cr_number"
        label={t("crNumber")}
        placeholder={t("crNumber")}
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
          placeholder={t("vatDocument")}
          category="vat"
        />
      </Box>
      <TextInput
        type="text"
        name="vat_number"
        label={t("vatNumber")}
        placeholder={t("vatNumber")}
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
          title={t("saveMesage")}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          onConfirm={handelSave}
        />
        <Button
          type="submit"
          color="success"
          onClick={() => {
            setOpen(true);
          }}
        >
          {t("saveChanges")}
        </Button>
      </Box>
    </>
  );
}

export default CompanyInformation;
