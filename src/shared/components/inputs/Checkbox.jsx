import PropTypes from "prop-types";

import { styled, alpha } from "@mui/material/styles";
import { Checkbox as MuiCheckbox } from "@mui/material";

import { mdiCheck } from "@mdi/js";

import SvgIcon from "../Icon";

const Icon = styled("span", {
  shouldForwardProp: (prop) => prop !== "color",
})(({ theme, color }) => ({
  width: 18,
  height: 18,
  borderRadius: 3,
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
  borderRadius: 3,
  color: theme.palette.common.white,
  backgroundColor: theme.palette[color].main,
  "input:disabled ~ &": {
    backgroundColor: alpha(theme.palette[color].main, 0.4),
  },
}));

const IndeterminateIcon = styled("span", {
  shouldForwardProp: (prop) => prop !== "color",
})(({ theme, color }) => ({
  width: 18,
  height: 18,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 3,
  border: "1px solid",
  borderColor: theme.palette[color].main,
  backgroundColor: theme.palette.common.white,
  "&::before": {
    content: '""',
    display: "block",
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: theme.palette[color].main,
  },
  "input:hover ~ &, .Mui-focusVisible &": {
    backgroundColor: alpha(theme.palette[color].main, 0.1),
  },
  "input:disabled ~ &": {
    borderColor: alpha(theme.palette[color].main, 0.4),
    "&::before": {
      backgroundColor: alpha(theme.palette[color].main, 0.4),
    },
  },
}));

function Checkbox({
  disabled,
  checked,
  indeterminate,
  onChange,
  color = "primary",
  ...restProps
}) {
  return (
    <MuiCheckbox
      disabled={disabled}
      checked={checked}
      indeterminate={!checked && indeterminate}
      onChange={(_, checked) => onChange(checked)}
      disableFocusRipple
      color={color}
      icon={<Icon color={color} />}
      checkedIcon={
        <CheckedIcon color={color}>
          <SvgIcon icon={mdiCheck} />
        </CheckedIcon>
      }
      indeterminateIcon={<IndeterminateIcon color={color} />}
      {...restProps}
    />
  );
}

Checkbox.propTypes = {
  disabled: PropTypes.bool,
  indeterminate: PropTypes.bool,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  color: PropTypes.oneOf([
    "info",
    "error",
    "warning",
    "success",
    "primary",
    "secondary",
  ]),
};

export default Checkbox;
