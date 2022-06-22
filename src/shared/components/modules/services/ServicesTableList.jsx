import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";

import { Typography, ListItem, Button } from "@mui/material";
import { mdiMinus } from "@mdi/js";

import Menu from "../../Menu";
import Icon from "../../Icon";

function ServicesTableList({ services }) {
  const {
    i18n: { language },
  } = useTranslation();

  if (!services.length) {
    return <Icon icon={mdiMinus} />;
  }

  if (services.length === 1) {
    return (
      <Typography component="span" variant="body2" sx={{ maxWidth: 150 }}>
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
        onClick: (e) => e.stopPropagation(),
        children: (
          <Typography component="span" variant="body2" noWrap>
            {language === "en" ? services[0].name.en : services[0].name.ar}
          </Typography>
        ),
        sx: { maxWidth: 150, px: "4px", fontSize: 14 },
      }}
      AnchorComponentOpenProps={{
        color: "primary",
        variant: "outlined",
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
  services: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.shape({
        en: PropTypes.string.isRequired,
        ar: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default ServicesTableList;
