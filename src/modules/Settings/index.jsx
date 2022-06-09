import { Typography, Grid, Paper } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import { useTranslation } from "react-i18next";

import BasicTabs from "./views/SettingsTabPanel";
import CompanyInformation from "./components/CompanyInformationForm";
import Notifications from "./components/Notifications";
import Roles from "./components/Roles";
import Permissions from "./components/Permissions";

function Settings() {
  const { t } = useTranslation("settings");

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Typography component="h1" variant="h5">
          {t("settings")}
        </Typography>
      </Grid>

      <Grid item>
        <Paper sx={{ p: 3 }}>
          <Routes>
            <Route index element={<BasicTabs />} />
            <Route
              path="company-information"
              element={<CompanyInformation />}
            />
            <Route path="notifications" element={<Notifications />} />
            <Route path="roles" element={<Roles />} />
            <Route path="permissions" element={<Permissions />} />
          </Routes>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Settings;
