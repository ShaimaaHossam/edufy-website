import PropTypes from "prop-types";

import { SvgIcon } from "@mui/material";

function Icon({ icon, size, color, ...restProps }) {
  return (
    <SvgIcon
      color={color || "inherit"}
      fontSize={size || "inherit"}
      {...restProps}
    >
      <path d={icon} />
    </SvgIcon>
  );
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
};

export default Icon;
