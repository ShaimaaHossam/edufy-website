import { useEffect } from "react";

import usePermissions from "../../../shared/hooks/usePermissions";

import { useTranslation } from "react-i18next";

import { mdiPencil, mdiMinus } from "@mdi/js";

import { Grid, Paper, Typography } from "@mui/material";

import Table from "../../../shared/components/Table";
import Link from "../../../shared/components/Link";
import Icon from "../../../shared/components/Icon";
import IconButton from "../../../shared/components/IconButton";

import { getRoles, settingsSelector } from "../../../redux/slices/settings";
import { useSelector, useDispatch } from "react-redux";

function Roles() {
  const { t } = useTranslation("settings");

  const settingPerms = usePermissions("setting");

  const dispatch = useDispatch();
  const { roles } = useSelector(settingsSelector);

  useEffect(() => {
    dispatch(getRoles());
  }, [dispatch]);

  const rowsData = roles.map((role) => ({
    id: role.id,
    active: true,
    clickable: false,
    rowCells: [
      t(role.name),

      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",

      role.name === "Admin" ? (
        <Icon icon={mdiMinus} size="medium" color="action" />
      ) : settingPerms.access_details ? (
        <IconButton
          aria-label="edit role"
          size="small"
          icon={mdiPencil}
          component={Link}
          to={`/settings/roles/edit/${role.id}`}
        />
      ) : (
        <Icon icon={mdiMinus} size="medium" color="action" />
      ),
    ],
  }));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography component="h1" variant="h5">
          {t("rolesAndPermissions")}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 5 }}>
          <Grid item container>
            <Grid item xs={8} margin="auto">
              <Table
                tableLabel="roles list"
                headLabels={[t("name"), t("summary"), t("actions")]}
                rowsData={rowsData}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Roles;
