import { useState } from "react";
import PropTypes from "prop-types";

import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  IconButton,
} from "@mui/material";

import {
  mdiEyeOutline,
  mdiEyeOffOutline,
  mdiLockOutline,
  mdiLockOpenVariantOutline,
} from "@mdi/js";

import Icon from "../Icon";

function PasswordInput({
  name,
  label,
  required,
  placeholder,
  disabled,
  size,

  value,
  onChange,
  onBlur,
  onFocus,

  error,
  helperText,

  ...restProps
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl
      fullWidth
      variant="outlined"
      error={error}
      required={required}
      size={size || "medium"}
    >
      <InputLabel htmlFor={name}>{label}</InputLabel>

      <OutlinedInput
        id={name}
        type={showPassword ? "text" : "password"}
        name={name}
        label={label}
        placeholder={placeholder || ""}
        disabled={disabled}
        autoComplete="new-password"
        value={value}
        onChange={onChange}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur(e);
        }}
        onFocus={(e) => {
          setIsFocused(true);
          !!onFocus && onFocus(e);
        }}
        startAdornment={
          (isFocused || !!value) && (
            <InputAdornment position="start">
              <Icon
                icon={showPassword ? mdiLockOpenVariantOutline : mdiLockOutline}
                size={size === "small" ? "small" : "medium"}
              />
            </InputAdornment>
          )
        }
        endAdornment={
          (isFocused || !!value) && (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                size="small"
                onClick={() => setShowPassword(!showPassword)}
              >
                <Icon
                  icon={showPassword ? mdiEyeOffOutline : mdiEyeOutline}
                  size={size === "small" ? "small" : "medium"}
                />
              </IconButton>
            </InputAdornment>
          )
        }
        {...restProps}
      />

      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

PasswordInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(["medium", "small"]),

  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func,

  error: PropTypes.bool,
  helperText: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default PasswordInput;
