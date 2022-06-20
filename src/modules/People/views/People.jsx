import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";

import { useTranslation } from "react-i18next";

import Customers from "../views/Customers";
import TeamMembers from "../views/TeamMembers";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{
        paddingTop: 2,
        width: "100%",
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

function People() {
  const [value, setValue] = useState(0);
  const { t } = useTranslation("people");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label={t("teamMembers")} {...a11yProps(0)} />
          <Tab label={t("customers")} {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <TeamMembers />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Customers />
      </TabPanel>
    </>
  );
}

export default People;
