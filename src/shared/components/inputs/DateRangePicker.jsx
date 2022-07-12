import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";

import { useFormik } from "formik";
import * as Yup from "yup";

import { isValid, isSameDay, isAfter, isBefore } from "date-fns";

import { Grid } from "@mui/material";

import DatePicker from "./DatePicker";

function DateRangePicker({ required, size, spacing, values, onChange }) {
  const { t } = useTranslation();

  const formik = useFormik({
    validateOnMount: false,
    validateOnChange: true,
    validateOnBlur: false,
    initialValues: {
      date1: values[0] || null,
      date2: values[1] || null,
    },
    validationSchema: Yup.object().shape({
      date1: Yup.date()
        .nullable()
        .test("required", t("requiredDate"), (date) =>
          required ? !!date : true
        )
        .typeError(t("invalidDate"))
        .test("fromAfterTo", t("fromAfterTo"), function (date1) {
          const date2 = this.options.parent.date2;
          if (!isValid(date1) || !isValid(date2)) return true;
          return isSameDay(date2, date1) ? true : isBefore(date1, date2);
        }),
      date2: Yup.date()
        .nullable()
        .test("required", t("requiredDate"), (date) =>
          required ? !!date : true
        )
        .typeError(t("invalidDate"))
        .test("toBeforeFrom", t("toBeforeFrom"), function (date2) {
          const date1 = this.options.parent.date1;
          if (!isValid(date1) || !isValid(date2)) return true;
          return isSameDay(date1, date2) ? true : isAfter(date2, date1);
        }),
    }),
  });

  const { values: formValues, validateForm } = formik;
  const onChangeRef = useRef(onChange);
  const isMountedRef = useRef(false);
  useEffect(() => {
    if (isMountedRef.current) {
      validateForm().then((errors) => {
        !Object.keys(errors).length &&
          onChangeRef.current([formValues.date1, formValues.date2]);
      });
    } else {
      isMountedRef.current = true;
    }
  }, [formValues, validateForm]);

  return (
    <Grid container spacing={spacing}>
      <Grid item xs>
        <DatePicker
          name="date1"
          label={t("fromDate")}
          size={size}
          required={required}
          value={values[0] || null}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.touched.date1 && !!formik.errors.date1}
          helperText={!!formik.touched.date1 && formik.errors.date1}
        />
      </Grid>

      <Grid item xs>
        <DatePicker
          name="date2"
          label={t("toDate")}
          size={size}
          required={required}
          value={values[1] || null}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.touched.date2 && !!formik.errors.date2}
          helperText={!!formik.touched.date2 && formik.errors.date2}
          sx={{ width: 100 }}
        />
      </Grid>
    </Grid>
  );
}

DateRangePicker.propTypes = {
  required: PropTypes.bool,
  size: PropTypes.oneOf(["medium", "small"]),
  spacing: PropTypes.number,

  values: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DateRangePicker;
