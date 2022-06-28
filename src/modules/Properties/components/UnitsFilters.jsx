import { useEffect } from "react";

import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  filtersSelector,
  setFilters,
  clearFilters,
} from "../state/propertiesFiltersSlice";

import { useGetAllUnitTypesQuery } from "../../../redux/services/properties";

import { useTranslation } from "react-i18next";
import { useFormik } from "formik";

import { Grid, Button } from "@mui/material";

import Autocomplete from "../../../shared/components/inputs/Autocomplete";

import useDebouncedEffect from "../../../shared/hooks/useDebouncedEffect";

function UnitsFilters() {
  const { t } = useTranslation("properties");

  const { propertyID } = useParams();

  const dispatch = useDispatch();
  const { filters } = useSelector(filtersSelector);

  // clearing filters on unmount
  useEffect(() => {
    return () => dispatch(clearFilters());
  }, [dispatch]);

  const { data: allUnitTypes = [] } = useGetAllUnitTypesQuery(propertyID);

  const formik = useFormik({
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      unit_type_id: [],
      service_id: [],
      status: "",
    },
  });
  const { values } = formik;

  useDebouncedEffect(
    () => {
      dispatch(
        setFilters({
          ...filters,
          page: "1",
          "filter[unit_type_id]": values.unit_type_id,
          "filter[status]": values.status,
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
        <Autocomplete
          size="small"
          name="unit_type_id"
          label={t("byType")}
          isMulti
          limitTags={1}
          options={allUnitTypes.map((type) => ({
            value: type.id,
            label: type.title,
          }))}
          noOptionsText={t("noTypes")}
          value={formik.values.unit_type_id}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Grid>

      <Grid item xs={3}>
        <Autocomplete
          size="small"
          name="status"
          label={t("byStatus")}
          options={[
            { value: "0", label: t("vacant") },
            { value: "1", label: t("occupied") },
          ]}
          value={formik.values.status}
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

export default UnitsFilters;
