import { Typography, Box, Paper } from "@mui/material";
import BasicTabs from "./components/SettingsTabPanel";
function Settings() {
  return (
    <Box>
      <Typography color="text.primary" variant="h6" sx={{ fontWeight: "bold",paddingBottom:2 }}>
        Settings
      </Typography>
      <BasicTabs />
    </Box>
  );
}

export default Settings;
