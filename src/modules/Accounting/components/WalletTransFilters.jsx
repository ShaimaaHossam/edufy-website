import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  filtersSelector,
  setFilters,
  clearFilters,
} from "../state/walletSlice";

import { useTranslation } from "react-i18next";
import { useFormik } from "formik";

import { Grid, Button } from "@mui/material";

import DateRangePicker from "../../../shared/components/inputs/DateRangePicker";
import Autocomplete from "../../../shared/components/inputs/Autocomplete";

import useDebouncedEffect from "../../../shared/hooks/useDebouncedEffect";

import {
  WALLET_TRANS_TYPES,
  WALLET_TRANS_DESCRIPS,
} from "../../../constants/system";

import { formatDate } from "../../../helpers/datetime";

function WalletTransFilters() {
  const { t } = useTranslation("accounting");

  const dispatch = useDispatch();
  const { filters } = useSelector(filtersSelector);

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
      description: [],
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
          "filter[description]": values.description,
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
          options={Object.values(WALLET_TRANS_TYPES).map((type) => ({
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
          name="description"
          label={t("byDescription")}
          isMulti
          limitTags={1}
          options={Object.values(WALLET_TRANS_DESCRIPS).map((type) => ({
            value: type,
            label: t(type),
          }))}
          value={formik.values.description}
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

export default WalletTransFilters;
