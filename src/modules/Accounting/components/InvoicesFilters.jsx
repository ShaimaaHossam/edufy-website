import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  filtersSelector,
  setFilters,
  clearFilters,
} from "../state/invoicesSlice";

import { useTranslation } from "react-i18next";
import { useFormik } from "formik";

import { Grid, Button } from "@mui/material";

import DateRangePicker from "../../../shared/components/inputs/DateRangePicker";
import Autocomplete from "../../../shared/components/inputs/Autocomplete";

import useDebouncedEffect from "../../../shared/hooks/useDebouncedEffect";

import {
  INVOICE_TYPES,
  INVOICE_STATUSES,
  INVOICE_PAY_TYPES,
} from "../../../constants/system";

import { formatDate } from "../../../helpers/datetime";

function InvoicesFilters() {
  const { t } = useTranslation("accounting");

  const dispatch = useDispatch();
  const filters = useSelector(filtersSelector);

  // clearing filters on unmount
  useEffect(() => {
    return () => dispatch(clearFilters());
  }, [dispatch]);

  const formik = useFormik({
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      dates: [],
      type: [],
      status: [],
      payment_type: [],
    },
  });
  const { values } = formik;

  useDebouncedEffect(
    () => {
      dispatch(
        setFilters({
          ...filters,
          page: "1",
          "filter[date_from]": values.dates[0] && formatDate(values.dates[0]),
          "filter[date_to]": values.dates[1] && formatDate(values.dates[1]),
          "filter[type]": values.type,
          "filter[status]": values.status,
          "filter[payment_type]": values.payment_type,
        })
      );
    },
    [values],
    500,
    true,
    false
  );

  return (
    <Grid container spacing={2} component="form">
      <Grid item xs={3}>
        <DateRangePicker
          size="small"
          spacing={2}
          initialValues={[null, null]}
          onChange={(dates) => formik.setFieldValue("dates", dates)}
        />
      </Grid>

      <Grid item xs={2}>
        <Autocomplete
          size="small"
          name="type"
          label={t("byType")}
          isMulti
          limitTags={1}
          options={Object.values(INVOICE_TYPES).map((type) => ({
            value: type,
            label: t(type),
          }))}
          value={formik.values.type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Grid>

      <Grid item xs={2}>
        <Autocomplete
          size="small"
          name="status"
          label={t("byStatus")}
          isMulti
          limitTags={1}
          options={Object.values(INVOICE_STATUSES).map((status) => ({
            value: status,
            label: t(status),
          }))}
          value={formik.values.status}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Grid>

      <Grid item xs={2}>
        <Autocomplete
          size="small"
          name="payment_type"
          label={t("byPaymentType")}
          isMulti
          limitTags={1}
          options={Object.values(INVOICE_PAY_TYPES).map((payType) => ({
            value: payType,
            label: t(payType),
          }))}
          value={formik.values.payment_type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Grid>

      <Grid item>
        <Button
          type="reset"
          color="error"
          variant="outlined"
          onClick={formik.resetForm}
        >
          {t("clear")}
        </Button>
      </Grid>
    </Grid>
  );
}

export default InvoicesFilters;
