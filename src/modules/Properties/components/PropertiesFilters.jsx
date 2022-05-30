import { useSelector, useDispatch } from "react-redux";
import { propertiesSelector, setPropertiesFilters } from "../state";

import { useGetAllPropertyTypesQuery } from "../../../redux/services/properties";
import { useGetAllUsersByRoleQuery } from "../../../redux/services/people";
import { useGetAllUsedCitiesQuery } from "../../../redux/services/general";
import { authSelector } from "../../../redux/slices/auth";

import { useTranslation } from "react-i18next";
import { useFormik } from "formik";

import { Grid, Button } from "@mui/material";

import Autocomplete from "../../../shared/components/inputs/Autocomplete";

import useDebouncedEffect from "../../../shared/hooks/useDebouncedEffect";

import { USER_TYPES } from "../../../constants/system";

function PropertiesFilters() {
  const { t } = useTranslation("properties");

  const dispatch = useDispatch();
  const { propertiesFilters } = useSelector(propertiesSelector);

  const {
    userData: {
      company: { id: companyID },
    },
  } = useSelector(authSelector);

  const { data: allPropertyTypes = [] } = useGetAllPropertyTypesQuery();
  const { data: allAreaManagers = [] } = useGetAllUsersByRoleQuery(
    USER_TYPES.areaManager
  );
  const { data: allCities = [] } = useGetAllUsedCitiesQuery(companyID);
  const allServices = [];

  const formik = useFormik({
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      property_type_id: [],
      area_manager_id: [],
      city_id: [],
      service_id: [],
    },
  });
  const { values } = formik;

  useDebouncedEffect(
    () => {
      dispatch(
        setPropertiesFilters({
          ...propertiesFilters,
          page: "1",
          "filter[property_type_id]": values.property_type_id,
          "filter[area_manager_id]": values.area_manager_id,
          "filter[city_id]": values.city_id,
          "filter[service_id]": values.service_id,
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
      <Grid item xs={2}>
        <Autocomplete
          size="small"
          name="property_type_id"
          label={t("byType")}
          isMulti
          limitTags={1}
          options={allPropertyTypes.map((type) => ({
            value: type.id,
            label: type.title,
          }))}
          noOptionsText={t("noTypes")}
          value={formik.values.property_type_id}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Grid>

      <Grid item xs={2}>
        <Autocomplete
          size="small"
          name="area_manager_id"
          label={t("byAreaManager")}
          isMulti
          limitTags={1}
          options={allAreaManagers.map((manager) => ({
            value: manager.id,
            label: manager.name,
          }))}
          noOptionsText={t("noAreaManagers")}
          value={formik.values.area_manager_id}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Grid>

      <Grid item xs={2}>
        <Autocomplete
          size="small"
          name="city_id"
          label={t("byCity")}
          isMulti
          limitTags={1}
          options={allCities.map((city) => ({
            value: city.id,
            label: city.title,
          }))}
          noOptionsText={t("noCities")}
          value={formik.values.city_id}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Grid>

      <Grid item xs={2}>
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

export default PropertiesFilters;
