import { Typography, Box } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

import { useTranslation } from "react-i18next";


import BasicTabs from "./views/SettingsTabPanel";
import CompanyInformation from "./views/CompanyInformation";
import Notifications from "./views/Notifications";
import Roles from "./views/Roles";
import Permissions from "./views/Permissions";

function Settings() {
  const { t } = useTranslation("settings");

  return (
    <Box>
      <Typography
        color="text.primary"
        variant="h6"
        sx={{ fontWeight: "bold", paddingBottom: 2 }}
      >
        {t("settings")}
      </Typography>
      <Routes>
        <Route index element={<BasicTabs />} />
        <Route path="company-information" element={<CompanyInformation />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="roles" element={<Roles />} />
        <Route path="permissions" element={<Permissions />} />
      </Routes>
    </Box>
  );
}

export default Settings;
