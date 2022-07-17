import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";

import { TextField } from "@mui/material";
import ClockIcon from "@mui/icons-material/AccessTime";

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MuiTimePicker from "@mui/lab/TimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import enLocale from "date-fns/locale/en-US";
import arLocale from "date-fns/locale/ar-SA";

const localesMapping = {
  en: enLocale,
  ar: arLocale,
};

function TimePicker({
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
      <MuiTimePicker
        mask="__:__ _M"
        inputFormat="hh:mm a"
        views={["hours", "minutes"]}
        PopperProps={{ placement: "bottom-start" }}
        OpenPickerButtonProps={{ edge: "end", size: "small" }}
        components={{ OpenPickerIcon: ClockIcon }}
        disabled={disabled}
        value={value}
        onChange={(time) => onChange({ target: { name, value: time } })}
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

TimePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(["medium", "small"]),

  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,

  error: PropTypes.bool,
  helperText: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default TimePicker;
