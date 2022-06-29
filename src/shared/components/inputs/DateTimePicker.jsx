import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";

import { TextField } from "@mui/material";
import ClockIcon from "@mui/icons-material/AccessTime";

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MuiDateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import enLocale from "date-fns/locale/en-US";
import arLocale from "date-fns/locale/ar-SA";

const localesMapping = {
  en: enLocale,
  ar: arLocale,
};

function DateTimePicker({
  name,
  label,
  required,
  disabled,
  size,

  value,
  onChange,
  onBlur,

  error,
  helperText,

  ...restProps
}) {
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      locale={localesMapping[language]}
    >
      <MuiDateTimePicker
        mask="__/__/____ __:__ _M"
        inputFormat="dd/MM/yyyy hh:mm a"
        views={["day", "hours", "minutes"]}
        PopperProps={{ placement: "bottom-start" }}
        OpenPickerButtonProps={{ edge: "end", size: "small" }}
        components={{ OpenPickerIcon: ClockIcon }}
        disabled={disabled}
        value={value}
        onChange={(date) => onChange({ target: { name, value: date } })}
        onOpen={() => onBlur({ target: { name } })}
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            label={label}
            required={required}
            fullWidth
            size={size || "medium"}
            onBlur={onBlur}
            error={error}
            helperText={helperText}
          />
        )}
        {...restProps}
      />
    </LocalizationProvider>
  );
}

DateTimePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(["medium", "small"]),

  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,

  error: PropTypes.bool,
  helperText: PropTypes.string,
};

export default DateTimePicker;
