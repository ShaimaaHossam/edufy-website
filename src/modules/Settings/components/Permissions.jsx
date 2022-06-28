import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { useFormik } from "formik";

import {
  getPermesion,
  getSelectedPermesion,
  updatePermesion,
  settingsSelector,
} from "../../../redux/slices/settings";
import { useSelector, useDispatch } from "react-redux";

import { Typography, Box, Button, Grid } from "@mui/material";
import CheckboxMenu from "../../../shared/components/inputs/CheckboxMenu";
import Dialog from "../../../shared/components/Dialog";

function Permissions() {
  const [openDialog, setOpenDialog] = useState(false);

  const { permesions, role } = useSelector(settingsSelector);

  const { t } = useTranslation("settings");

  const { roleID } = useParams();

  const [loading, setLoading] = useState(true);

  const formik = useFormik({
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: true,
    initialValues: {},
  });

  const { setValues } = formik;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPermesion());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSelectedPermesion(roleID));
  }, [dispatch, roleID]);

  useEffect(() => {
    if (!permesions || !role) return;

    const selectedPermissionsIds = role.permissions.map((p) => p.id);
    const reducedData = Object.keys(permesions).reduce(
      (acc, key) => ({
        ...acc,
        [key.toLowerCase()]: permesions[key].map((permission) => ({
          id: permission.id,
          value: selectedPermissionsIds.indexOf(permission.id) > -1,
          label: t(
            `${key.toLowerCase()}Permissions.${permission.name
              .split(" ")[0]
              .toLocaleLowerCase()}`
          ),
        })),
      }),
      {}
    );

    setValues(reducedData);
    setLoading(false);
  }, [permesions, role, setValues, t]);

  const handelSave = () => {
    const data = Object.values(formik.values).reduce((acc, item) => {
      return [...acc, ...item.filter((p) => p.value).map((p) => p.id)];
    }, []);
    const respond = {
      id: role.id,
      data: {
        company_id: role.company_id,
        name: role.name,
        permissions: data,
      },
    };
    dispatch(updatePermesion(respond));
    handleClose();
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleOpen = () => {
    setOpenDialog(true);
  };
  if (loading) return null;
  return (
    <Box width="60%" mx="auto">
      <Grid container spacing={3} direction="column" component="form">
        <Grid item xs={12}>
          <Typography component="h2" variant="h6">
            {t(role.name)}
          </Typography>
        </Grid>

        {Object.keys(formik.values).map((key) => (
          <Grid key={key} item xs={12}>
            <CheckboxMenu
              title={t(key)}
              values={formik.values[key]}
              onChange={(values) => formik.setFieldValue(key, values)}
            />
          </Grid>
        ))}
        <Grid item alignSelf="flex-end">
          <Dialog
            title={t("saveMesage")}
            open={openDialog}
            onClose={handleClose}
            onConfirm={handelSave}
          />
          <Button color="success" onClick={handleOpen}>
            {t("saveChanges")}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Permissions;
