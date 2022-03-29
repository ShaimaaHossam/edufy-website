import PropTypes from "prop-types";

import { Typography } from "@mui/material";

import Icon from "./Icon";

function IconText({
  text,
  textVariant,
  textColor,

  icon,
  iconSize,
  iconColor,
}) {
  return (
    <Typography
      display="flex"
      variant={textVariant || "body1"}
      color={textColor || "text.primary"}
    >
      <Icon
        icon={icon}
        size={iconSize}
        color={iconColor}
        sx={{ mt: "0.08em", mr: "0.25em" }}
      />

      <Typography component="span" variant="inherit" noWrap>
        {text}
      </Typography>
    </Typography>
  );
}

IconText.propTypes = {
  // text props
  text: PropTypes.string.isRequired,
  textVariant: PropTypes.string,
  textColor: PropTypes.string,

  // icon props
  icon: PropTypes.string.isRequired,
  iconSize: PropTypes.string,
  iconColor: PropTypes.string,
};

export default IconText;
