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
    position: "relative",
    outline: "1px solid",
    outlineOffset: -1,
    "&::before": {
      content: "''",
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      borderRadius: "50%",
    },
  }),
  ...(variant === "contained" && {
    position: "relative",
    "&::before": {
      content: "''",
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      opacity: 0.1,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  }),
  ...(shape === "square" && {
    borderRadius: 0,
    "&::before": {
      borderRadius: 0,
    },
    "& .MuiTouchRipple-child": {
      borderRadius: "0px !important",
    },
  }),
  ...(shape === "rounded" && {
    borderRadius: 4,
    "&::before": {
      borderRadius: 4,
    },
    "& .MuiTouchRipple-child": {
      borderRadius: "4px !important",
    },
  }),
}));

function IconButton({ icon, shape, variant, color, ...restProps }) {
  return (
    <CustomIconButton
      color={color}
      shape={shape}
      variant={variant}
      {...restProps}
    >
      <Icon icon={icon} size="small" />
    </CustomIconButton>
  );
}

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
  ]),
};

export default IconButton;
