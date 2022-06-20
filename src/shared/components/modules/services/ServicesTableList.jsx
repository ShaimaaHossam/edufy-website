import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";

import { Typography, ListItem, Button } from "@mui/material";

import Menu from "../../Menu";

function ServicesTableList({ services }) {
  const {
    i18n: { language },
  } = useTranslation();

  if (services.length === 1) {
    return (
      <Typography component="span" variant="body2">
        {language === "en" ? services[0].name.en : services[0].name.ar}
      </Typography>
    );
  }

  return (
    <Menu
      label="services list"
      AnchorComponent={Button}
      AnchorComponentProps={{
        size: "small",
        color: "inherit",
        variant: "text",
        endIcon: `+${services.length - 1}`,
        children: services[0].name,
        onClick: (e) => e.stopPropagation(),
        sx: { fontWeight: 400, fontSize: 14, p: 0 },
      }}
      AnchorComponentOpenProps={{
        color: "primary",
      }}
    >
      {services.map((service) => (
        <ListItem key={service.id}>
          <Typography component="span" variant="body2">
            {language === "en" ? service.name.en : service.name.ar}
          </Typography>
        </ListItem>
      ))}
    </Menu>
  );
}

ServicesTableList.propTypes = {
  services: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ServicesTableList;
