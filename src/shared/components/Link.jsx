import { forwardRef } from "react";
import PropTypes from "prop-types";

import { Link as RouterLink, useLocation } from "react-router-dom";

import MuiLink from "@mui/material/Link";

const Link = forwardRef(
  ({ to, replace, color, display, underline, children, ...restProps }, ref) => {
    const { pathname } = useLocation();
    const isSamePath = () =>
      typeof to === "string"
        ? to === pathname
        : typeof to === "object"
        ? to.pathname === pathname
        : false;

    return (
      <MuiLink
        ref={ref}
        component={RouterLink}
        to={to}
        replace={replace || isSamePath()}
        color={color || "primary"}
        display={display || "inline"}
        underline={underline || "none"}
        {...restProps}
      >
        {children}
      </MuiLink>
    );
  }
);

Link.propTypes = {
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string,
      state: PropTypes.object,
    }),
  ]).isRequired,
  replace: PropTypes.bool,

  color: PropTypes.oneOf([
    "info",
    "error",
    "warning",
    "success",
    "primary",
    "secondary",
  ]),
  display: PropTypes.oneOf(["inline", "block"]),
  underline: PropTypes.oneOf(["always", "hover", "none"]),
};

export default Link;
