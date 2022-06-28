import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";

import { useTranslation } from "react-i18next";

import Notifications from "../components/Notifications";
import CompanyInformation from "../components/CompanyInformationForm";
import Roles from "../components/Roles";
import ServicesSettings from "../components/ServicesSettings";

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
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label={t("companyInformation")} {...a11yProps(0)} />
        <Tab label={t("notifications")} {...a11yProps(1)} />
        <Tab label={t("rolesAndPermissions")} {...a11yProps(2)} />
        <Tab label={t("servicesSettings")} {...a11yProps(3)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <CompanyInformation />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Notifications />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Roles />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <ServicesSettings />
      </TabPanel>
    </>
  );
}

export default BasicTabs;
