import React from "react";
import PropTypes from "prop-types";

import { Box } from "@mui/material";

function InfoBar({
  border,
  rounded,
  centered,
  color = "info",
  component = "div",
  children,
}) {
  return (
    <Box
      sx={{
        px: 1.5,
        py: 1,
        textAlign: centered ? "center" : "unset",
        border: border ? "1px solid" : "none",
        borderRadius: rounded ? "4px" : 0,
        color: `${color}.main`,
        backgroundColor: `${color}Bg`,
      }}
      component={component}
    >
      {children}
    </Box>
  );
}

InfoBar.propTypes = {
  border: PropTypes.bool,
  rounded: PropTypes.bool,
  centered: PropTypes.bool,
  component: PropTypes.string,
  color: PropTypes.oneOf(["info", "error", "warning", "success"]),
};

export default InfoBar;
