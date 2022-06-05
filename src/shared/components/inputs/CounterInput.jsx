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

import { mdiPlus, mdiMinus } from "@mdi/js";

import Icon from "../Icon";

function CounterInput({
  name,
  label,
  required,
  placeholder,
  disabled,
  fixedValue,
  size,

  step,
  min = 0,
  max = Infinity,
  unit,
  icon,

  value,
  onChange,
  onBlur,
  onFocus,

  error,
  helperText,

  ...restProps
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (value) => {
    const newValue = value < min ? min : value > max ? max : value;
    const fakeEvent = { target: { name, value: newValue } };
    onChange(fakeEvent);
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
        name={name}
        label={label}
        placeholder={placeholder || ""}
        disabled={disabled || fixedValue}
        value={value === null ? "" : value}
        onChange={(e) => handleChange(parseInt(e.target.value) || null)}
        onBlur={(e) => {
          setIsFocused(false);
          !!onBlur && onBlur(e);
        }}
        onFocus={(e) => {
          setIsFocused(true);
          !!onFocus && onFocus(e);
        }}
        startAdornment={
          (isFocused || value !== null) &&
          ((!!icon && !unit) || (!!icon && !!unit && !value) ? (
            <InputAdornment position="start">
              <Icon icon={icon} size={size === "small" ? "small" : "medium"} />
            </InputAdornment>
          ) : !!unit ? (
            <InputAdornment disableTypography={disabled} position="start">
              {unit}
            </InputAdornment>
          ) : null)
        }
        endAdornment={
          (isFocused || value !== null) && (
            <InputAdornment position="end">
              <IconButton
                aria-label="decrement"
                size="small"
                edge="end"
                disabled={disabled || fixedValue}
                onClick={() => {
                  handleChange(value - step);
                  setIsFocused(true);
                }}
                onBlur={() => setIsFocused(false)}
                onMouseDown={(e) => e.preventDefault()}
              >
                <Icon
                  icon={mdiMinus}
                  size={size === "small" ? "small" : "medium"}
                />
              </IconButton>

              <IconButton
                aria-label="increment"
                size="small"
                edge="end"
                disabled={disabled || fixedValue}
                onClick={() => {
                  handleChange(value + step);
                  setIsFocused(true);
                }}
                onBlur={() => setIsFocused(false)}
                onMouseDown={(e) => e.preventDefault()}
              >
                <Icon
                  icon={mdiPlus}
                  size={size === "small" ? "small" : "medium"}
                />
              </IconButton>
            </InputAdornment>
          )
        }
        sx={{
          backgroundColor: disabled || fixedValue ? "greyScale.100" : "white",
        }}
        componentsProps={{
          input: { sx: { color: fixedValue ? "text.primary" : "inherit" } },
        }}
        {...restProps}
      />

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

CounterInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  fixedValue: PropTypes.bool,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(["medium", "small"]),

  step: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  icon: PropTypes.string,
  unit: PropTypes.string,

  value: PropTypes.number,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,

  error: PropTypes.bool,
  helperText: PropTypes.string,
};

export default CounterInput;
