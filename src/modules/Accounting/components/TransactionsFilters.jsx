import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  filtersSelector,
  setFilters,
  clearFilters,
} from "../state/transactionsSlice";

import { useTranslation } from "react-i18next";
import { useFormik } from "formik";

import { Grid, Button } from "@mui/material";

import DateRangePicker from "../../../shared/components/inputs/DateRangePicker";
import Autocomplete from "../../../shared/components/inputs/Autocomplete";

import useDebouncedEffect from "../../../shared/hooks/useDebouncedEffect";

import { TRANSACTION_TYPES } from "../../../constants/system";

import { formatDate } from "../../../helpers/datetime";

function TransactionsFilters() {
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
          values={formik.values.dates}
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
          options={Object.values(TRANSACTION_TYPES).map((type) => ({
            value: type,
            label: t(type),
          }))}
          value={formik.values.type}
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

export default TransactionsFilters;
