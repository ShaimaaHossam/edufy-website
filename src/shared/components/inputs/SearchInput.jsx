import { useState } from "react";
import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";

import { useFormik } from "formik";
import * as Yup from "yup";

import { TextField, InputAdornment } from "@mui/material";
import { mdiMagnify, mdiClose } from "@mdi/js";

import useDebouncedEffect from "../../hooks/useDebouncedEffect";

import Icon from "../Icon";
import IconButton from "../IconButton";

function SearchInput({
  label,
  disabled,
  size = "medium",
  placeholder = "",

  onChange,

  helperText = "",

  ...restProps
}) {
  const { t } = useTranslation();

  const [isFocused, setIsFocused] = useState(false);

  const formik = useFormik({
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: { keyword: "" },
    validationSchema: Yup.object().shape({
      keyword: Yup.string().trim().max(25, t("long_keyword")),
    }),
  });

  const { values, validateForm, setErrors } = formik;
  useDebouncedEffect(
    () => {
      // validate the keyword form manually
      validateForm().then((errors) => {
        if (!!Object.keys(errors).length) {
          setErrors(errors);
        } else {
          onChange(values.keyword);
        }
      });
    },
    [values, validateForm, setErrors],
    500,
    true,
    false
  );

  return (
    <TextField
      type="text"
      name="keyword"
      label={label}
      placeholder={placeholder}
      fullWidth
      size={size}
      disabled={disabled}
      value={formik.values.keyword}
      onChange={formik.handleChange}
      onBlur={(e) => {
        setIsFocused(false);
        formik.handleBlur(e);
      }}
      onFocus={(e) => setIsFocused(true)}
      error={formik.touched.keyword && !!formik.errors.keyword}
      helperText={formik.errors.keyword || helperText}
      InputProps={{
        startAdornment: (isFocused || !!formik.values.keyword) && (
          <InputAdornment position="start">
            <Icon icon={mdiMagnify} size={size} />
          </InputAdornment>
        ),
        endAdornment: !!formik.values.keyword && (
          <InputAdornment position="end">
            <IconButton
              aria-label="clear filter"
              type="reset"
              edge="end"
              size={size}
              icon={mdiClose}
              onClick={formik.resetForm}
            />
          </InputAdornment>
        ),
      }}
      {...restProps}
    />
  );
}

SearchInput.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(["medium", "small"]),

  onChange: PropTypes.func,

  helperText: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default SearchInput;
