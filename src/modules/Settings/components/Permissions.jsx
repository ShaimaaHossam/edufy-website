import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("settings");

  const { roleID } = useParams();

  const [openDialog, setOpenDialog] = useState(false);

  const dispatch = useDispatch();
  const { permesions, role } = useSelector(settingsSelector);

  useEffect(() => {
    dispatch(getPermesion());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSelectedPermesion(roleID));
  }, [dispatch, roleID]);

  const [permsMap, setPermsMap] = useState(null);

  useEffect(() => {
    if (!permesions || !role) return;

    const selectedPermissionsIds = role.permissions.map((p) => p.id);
    const reducedData = Object.keys(permesions).reduce(
      (acc, key) => ({
        ...acc,
        [t(`${key}.${key}`)]: permesions[key].map((permission) => ({
          id: permission.id,
          value: selectedPermissionsIds.indexOf(permission.id) > -1,
          label: t(`${key}.${permission.slug}`),
        })),
      }),
      {}
    );

    setPermsMap(reducedData);
  }, [permesions, role, t]);

  const handelSave = () => {
    const permissions = Object.values(permsMap).reduce((acc, item) => {
      return [...acc, ...item.filter((p) => p.value).map((p) => p.id)];
    }, []);

    const data = {
      id: role.id,
      data: {
        company_id: role.company_id,
        name: role.name,
        permissions,
      },
    };

    dispatch(updatePermesion(data));
    handleClose(false);
  };

  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  if (role?.id !== roleID || !permsMap) return null;

  return (
    <Box width="60%" mx="auto">
      <Grid container spacing={3} direction="column">
        <Grid item xs={12}>
          <Typography component="h2" variant="h6">
            {t(role.name)}
          </Typography>
        </Grid>

        {role.name !== "Admin" ? (
          <>
            {Object.keys(permsMap).map((key) => (
              <Grid key={key} item xs={12}>
                <CheckboxMenu
                  title={t(key)}
                  values={permsMap[key]}
                  onChange={(values) =>
                    setPermsMap({ ...permsMap, [key]: values })
                  }
                />
              </Grid>
            ))}

            <Grid item alignSelf="flex-end">
              <Button color="success" onClick={handleOpen}>
                {t("saveChanges")}
              </Button>
            </Grid>
          </>
        ) : (
          <Typography p variant="subtitle1" color="error" align="center">
            {t("roleCantBeEdited")}
          </Typography>
        )}
      </Grid>

      <Dialog
        title={t("saveMesage")}
        open={openDialog}
        onClose={handleClose}
        onConfirm={handelSave}
      />
    </Box>
  );
}

export default Permissions;
