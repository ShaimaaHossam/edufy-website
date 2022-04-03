import PropTypes from "prop-types";

import { styled, alpha } from "@mui/material/styles";
import { Switch as MuiSwitch } from "@mui/material";

const CustomSwitch = styled(MuiSwitch)(({ theme, color }) => ({
  width: 36,
  height: 18,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(18px)",

      "& .MuiSwitch-thumb": {
        color: theme.palette[color].main,
      },
      "& + .MuiSwitch-track": {
        backgroundColor: alpha(theme.palette[color].main, 0.3),
      },

      "&.Mui-disabled": {
        "& .MuiSwitch-thumb, & + .MuiSwitch-track": {
          opacity: 0.4,
        },
      },
    },

    "&.Mui-disabled": {
      "& .MuiSwitch-thumb, & + .MuiSwitch-track": {
        opacity: 0.4,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 18,
    height: 18,
    color: "#363A41",
    boxShadow: "none",
    transition: theme.transitions.create(["color"], {
      duration: 300,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 18,
    backgroundColor: "#D5D9E5",
    transition: theme.transitions.create(["background-color"], {
      duration: 300,
    }),
  },
}));

function Switch({
  disabled,
  checked,
  onChange,
  color = "primary",
  ...restProps
}) {
  return (
    <CustomSwitch
      disabled={disabled}
      checked={checked}
      onChange={(_, checked) => onChange(checked)}
      disableRipple
      disableFocusRipple
      color={color}
      {...restProps}
    />
  );
}

Switch.propTypes = {
  disabled: PropTypes.bool,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.oneOf([
    "info",
    "error",
    "warning",
    "success",
    "primary",
    "secondary",
  ]),
};

export default Switch;
