import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";

import { TextField } from "@mui/material";
import DayIcon from "@mui/icons-material/EventOutlined";

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MuiDatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import enLocale from "date-fns/locale/en-US";
import arLocale from "date-fns/locale/ar";

const localesMapping = {
  en: enLocale,
  ar: arLocale,
};

function DatePicker({
  name,
  label,
  required,
  disabled,
  size,

  value,
  onChange,

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
      <MuiDatePicker
        mask="__/__/____"
        inputFormat="dd/MM/yyyy"
        views={["day"]}
        PopperProps={{ placement: "bottom-start" }}
        OpenPickerButtonProps={{ edge: "end", size: "small" }}
        components={{ OpenPickerIcon: DayIcon }}
        disabled={disabled}
        value={value}
        onChange={(date) => onChange({ target: { name, value: date } })}
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            label={label}
            required={required}
            fullWidth
            size={size || "medium"}
            error={error}
            helperText={helperText}
          />
        )}
        {...restProps}
      />
    </LocalizationProvider>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(["medium", "small"]),

  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,

  error: PropTypes.bool,
  helperText: PropTypes.string,
};

export default DatePicker;
