import { forwardRef } from "react";
import PropTypes from "prop-types";

import { styled } from "@mui/material/styles";
import { IconButton as MuiIconButton, iconButtonClasses } from "@mui/material";

import Icon from "./Icon";

const CustomIconButton = styled(MuiIconButton, {
  shouldForwardProp: (prop) => ["shape", "variant"].indexOf(prop) === -1,
})(({ shape, variant }) => ({
  [`&.${iconButtonClasses.sizeMedium}`]: {
    width: 32,
    height: 32,
  },
  [`&.${iconButtonClasses.sizeLarge}`]: {
    width: 40,
    height: 40,
  },
  ...(variant === "outlined" && {
    outline: "1px solid",
    outlineOffset: -1,
  }),
  ...(variant === "contained" && {
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      opacity: 0.1,
      borderRadius: "inherit",
      backgroundColor: "currentColor",
    },
  }),
  ...(shape === "square" && {
    borderRadius: 0,
    "& .MuiTouchRipple-child": {
      borderRadius: "0px !important",
    },
  }),
  ...(shape === "rounded" && {
    borderRadius: 4,
    "& .MuiTouchRipple-child": {
      borderRadius: "4px !important",
    },
  }),
}));

const IconButton = forwardRef(
  ({ icon, shape, variant, size = "small", color, ...restProps }, ref) => (
    <CustomIconButton
      ref={ref}
      color={color}
      shape={shape}
      variant={variant}
      {...restProps}
    >
      <Icon icon={icon} size={size} />
    </CustomIconButton>
  )
);

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  shape: PropTypes.oneOf(["rounded", "square"]),
  variant: PropTypes.oneOf(["contained", "outlined"]),
  color: PropTypes.oneOf([
    "info",
    "error",
    "warning",
    "success",
    "primary",
    "secondary",
    "default",
  ]),
};

export default IconButton;
