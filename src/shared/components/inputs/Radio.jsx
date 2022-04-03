import PropTypes from "prop-types";

import { styled, alpha } from "@mui/material/styles";
import { Radio as MuiRadio } from "@mui/material";

const Icon = styled("span", {
  shouldForwardProp: (prop) => prop !== "color",
})(({ theme, color }) => ({
  width: 18,
  height: 18,
  borderRadius: "50%",
  border: "1px solid",
  borderColor: theme.palette.border,
  backgroundColor: theme.palette.common.white,
  "input:hover ~ &, .Mui-focusVisible &": {
    borderColor: theme.palette[color].main,
    backgroundColor: alpha(theme.palette[color].main, 0.1),
  },
  "input:disabled ~ &": {
    border: "none",
    backgroundColor: theme.palette.action.disabled,
  },
}));

const CheckedIcon = styled("span", {
  shouldForwardProp: (prop) => prop !== "color",
})(({ theme, color }) => ({
  width: 18,
  height: 18,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  backgroundColor: theme.palette[color].main,
  "&::before": {
    content: '""',
    display: "block",
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: theme.palette.common.white,
  },
  "input:disabled ~ &": {
    backgroundColor: alpha(theme.palette[color].main, 0.4),
  },
}));

function Radio({
  disabled,
  checked,
  onChange,
  color = "primary",
  ...restProps
}) {
  return (
    <MuiRadio
      disabled={disabled}
      checked={checked}
      onChange={(_, checked) => onChange(checked)}
      disableFocusRipple
      color={color}
      icon={<Icon color={color} />}
      checkedIcon={<CheckedIcon color={color} />}
      {...restProps}
    />
  );
}

Radio.propTypes = {
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

export default Radio;
