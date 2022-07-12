import { useState } from "react";
import PropTypes from "prop-types";

import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
} from "@mui/material";

import Icon from "../Icon";

function TextInput({
  type,
  name,
  label,
  required,
  placeholder,
  disabled,
  fixedValue,
  autoComplete,
  size,
  rows,

  icon,
  iconPosition,

  value,
  onChange,
  onBlur,
  onFocus,

  error,
  helperText,

  ...restProps
}) {
  const [isFocused, setIsFocused] = useState(false);

  const renderInputAdornment = () => {
    if (!isFocused && !value) return null;

    return (
      <InputAdornment position={iconPosition}>
        <Icon icon={icon} size={size === "small" ? "small" : "medium"} />
      </InputAdornment>
    );
  };

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
        type={type}
        name={name}
        label={label}
        placeholder={placeholder || ""}
        disabled={disabled || fixedValue}
        autoComplete={autoComplete || "on"}
        multiline={!!rows}
        rows={rows}
        value={value}
        onChange={onChange}
        onBlur={(e) => {
          setIsFocused(false);
          !!onBlur && onBlur(e);
        }}
        onFocus={(e) => {
          setIsFocused(true);
          !!onFocus && onFocus(e);
        }}
        startAdornment={
          !!icon && iconPosition === "start" && renderInputAdornment()
        }
        endAdornment={
          !!icon && iconPosition === "end" && renderInputAdornment()
        }
        sx={{
          backgroundColor: disabled || fixedValue ? "greyScale.100" : "white",
        }}
        componentsProps={{
          input: {
            sx: { color: fixedValue ? "text.primary" : "inherit" },
          },
        }}
        {...restProps}
      />

      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  fixedValue: PropTypes.bool,
  autoComplete: PropTypes.string,
  size: PropTypes.oneOf(["medium", "small"]),
  rows: PropTypes.number,

  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(["start", "end"]),

  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,

  error: PropTypes.bool,
  helperText: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default TextInput;
