import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { propertiesSelector, setUnitsFilters } from "../state";

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
  const { unitsFilters } = useSelector(propertiesSelector);

  const { data: allUnitTypes = [] } = useGetAllUnitTypesQuery(propertyID);
  const allServices = [];

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
      const filters = {
        ...unitsFilters,
        page: "1",
        "filter[unit_type_id]": values.unit_type_id,
        "filter[service_id]": values.service_id,
      };
      values.status &&
        Object.assign(filters, { "filter[status]": values.status });

      dispatch(setUnitsFilters(filters));
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
          name="service_id"
          label={t("byService")}
          isMulti
          limitTags={1}
          options={allServices.map((service) => ({
            value: service.id,
            label: service.title,
          }))}
          noOptionsText={t("noServices")}
          value={formik.values.service_id}
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
