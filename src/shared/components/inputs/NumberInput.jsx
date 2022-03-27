import { useState, forwardRef } from "react";
import PropTypes from "prop-types";

import NumberFormat from "react-number-format";

import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
} from "@mui/material";

import Icon from "../Icon";

const CustomNumberFormat = forwardRef(
  ({ name, onChange, isDecimal, isString, ...restProps }, ref) => {
    const decimalProps = isDecimal
      ? {
          allowLeadingZeros: true,
          thousandSeparator: true,
          fixedDecimalScale: true,
          decimalScale: 2,
        }
      : {};

    return (
      <NumberFormat
        getInputRef={ref}
        onValueChange={({ floatValue, value }, { event }) => {
          // if there's no real input event, don't call onChange
          if (!event) return;

          // imitating an event object
          const fakeEvent = {
            target: {
              name,
              value:
                value === ""
                  ? null // if input is empty, return null
                  : isDecimal
                  ? floatValue // if decimal return float value number
                  : isString
                  ? value // if string return string value
                  : parseInt(value), // return integer value of input
            },
          };
          onChange(fakeEvent);
        }}
        allowNegative={false}
        isNumericString={isString}
        allowLeadingZeros={isString}
        {...decimalProps}
        {...restProps}
      />
    );
  }
);

function NumberInput({
  name,
  label,
  required,
  placeholder,
  disabled,
  fixedValue,
  size,

  icon,
  unit,

  isString,
  isDecimal,

  value,
  onChange,
  onBlur,
  onFocus,

  error,
  helperText,

  ...restProps
}) {
  const [isFocused, setIsFocused] = useState(false);

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
          (isFocused || value !== null) &&
          !!icon && (
            <InputAdornment position="start">
              <Icon icon={icon} size={size === "small" ? "small" : "medium"} />
            </InputAdornment>
          )
        }
        endAdornment={
          (isFocused || value !== null) &&
          !!unit && (
            <InputAdornment disableTypography={disabled} position="end">
              {unit}
            </InputAdornment>
          )
        }
        sx={{
          backgroundColor: disabled || fixedValue ? "greyScale.100" : "white",
        }}
        inputComponent={CustomNumberFormat}
        componentsProps={{
          input: {
            isString,
            isDecimal,
            sx: { color: fixedValue ? "text.primary" : "inherit" },
          },
        }}
        {...restProps}
      />

      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  fixedValue: PropTypes.bool,
  size: PropTypes.oneOf(["medium", "small"]),

  icon: PropTypes.string,
  unit: PropTypes.string,

  isString: PropTypes.bool,
  isDecimal: PropTypes.bool,

  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,

  error: PropTypes.bool,
  helperText: PropTypes.string,
};

export default NumberInput;
