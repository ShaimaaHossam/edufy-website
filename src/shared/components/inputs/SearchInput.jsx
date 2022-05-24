import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";

import { useFormik } from "formik";
import * as Yup from "yup";

import { mdiMagnify } from "@mdi/js";

import useDebouncedEffect from "../../hooks/useDebouncedEffect";

import TextInput from "./TextInput";

function SearchInput({
  label,
  placeholder,
  disabled,
  size,

  onChange,

  helperText,

  ...restProps
}) {
  const { t } = useTranslation();

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
    <TextInput
      type="text"
      name="keyword"
      label={label}
      placeholder={placeholder}
      size={size}
      icon={mdiMagnify}
      iconPosition="start"
      disabled={disabled}
      value={formik.values.keyword}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.keyword && !!formik.errors.keyword}
      helperText={formik.errors.keyword || helperText}
      {...restProps}
    />
  );
}

SearchInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(["medium", "small"]),

  onChange: PropTypes.func,

  helperText: PropTypes.string,
};

export default SearchInput;
