import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";

import { useTranslation } from "react-i18next";

import Notifications from "./Notifications";
import CompanyInformation from "./CompanyInformation";
import Roles from "./Roles";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{
        paddingTop: 3,
        margin: "auto",
        width: "60%",
      }}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
    sx: {
      marginRight: 6,
      textTransform: "capitalize",
    },
  };
}

function BasicTabs() {
  const [value, setValue] = useState(0);
  const { t } = useTranslation("settings");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", px: 5, py: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label={t("companyInformation")} {...a11yProps(0)} />
          <Tab label={t("notifications")} {...a11yProps(1)} />
          <Tab label={t("rolesAndPermissions")} {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <CompanyInformation />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Notifications />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Roles />
      </TabPanel>
    </Box>
  );
}

export default BasicTabs;
