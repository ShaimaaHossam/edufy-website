import { Typography, Box } from "@mui/material";
import BasicTabs from "./views/SettingsTabPanel";
function Settings() {
  return (
    <Box>
      <Typography
        color="text.primary"
        variant="h6"
        sx={{ fontWeight: "bold", paddingBottom: 2 }}
      >
        Settings
      </Typography>
      <BasicTabs />
    </Box>
  );
}

export default Settings;
