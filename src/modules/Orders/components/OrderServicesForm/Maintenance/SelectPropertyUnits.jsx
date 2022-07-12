import { useEffect } from "react";

import { useTranslation } from "react-i18next";
import { useFormik } from "formik";

import * as Yup from "yup";

import { Button, Grid, Typography } from "@mui/material";

import {
  useGetAllPropertiesQuery,
  useGetAllUnitsQuery,
} from "../../../../../redux/services/properties";
import Autocomplete from "../../../../../shared/components/inputs/Autocomplete";
import {
  incrementSteps,
  orderFormStepsSelector,
} from "../../../state/orderFormSteps";
import { useDispatch, useSelector } from "react-redux";
import { updateVal } from "../../../state/orderFormData";

const SelectPropertyUnits = () => {
  const { t } = useTranslation("orders");
  const dispatch = useDispatch();
  const { currentStep } = useSelector(orderFormStepsSelector);
  const { isLoading, data: properties } = useGetAllPropertiesQuery();

  const formik = useFormik({
    // validateOnMount: false,
    // validateOnBlur: false,
    // validateOnChange: false,
    initialValues: {
      property_id: "",
      unit_ids: [],
    },
    validationSchema: Yup.object().shape({
      property_id: Yup.string().required(t("requiredField")),
      units_ids: Yup.array().min(1, t("requiredField")),
    }),
    onSubmit: (values) => {
      dispatch(
        updateVal({ key: "selectedPropertyId", val: `${values.property_id}` })
      );
      dispatch(updateVal({ key: "selectedUnits", val: values.unit_ids }));
      dispatch(incrementSteps());
    },
    onChange: (values) => {
      console.log(values);
    },
  });
  const { data: allUnits = [] } = useGetAllUnitsQuery(
    { "filter[property_id]": formik.values.property_id },
    { skip: !formik.values.property_id }
  );

  if (isLoading) {
    return null;
  }
  return (
    <Grid container spacing={5} component="form" onSubmit={formik.handleSubmit}>
      <Grid item xs={12}>
        <Typography style={{ paddingBottom: 15 }} component="h6" variant="h6">
          {t("selectProperty")}
        </Typography>
        <Autocomplete
          required
          name="property_id"
          label={t("property")}
          options={properties.map((type) => ({
            value: type.id,
            label: type.title,
          }))}
          noOptionsText={t("noProperties")}
          value={formik.values.property_id}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.property_id && !!formik.errors.property_id}
          helperText={formik.touched.property_id && formik.errors.property_id}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography style={{ paddingBottom: 15 }} component="h6" variant="h6">
          {t("selectUnits")}
        </Typography>
        <Autocomplete
          name="unit_ids"
          isMulti={true}
          label={t("units")}
          noOptionsText={t("noProperties")}
          options={allUnits.map((type) => ({
            value: type.id,
            label: type.title,
          }))}
          value={formik.values.unit_ids}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.unit_ids && !!formik.errors.unit_ids}
          helperText={formik.touched.unit_ids && formik.errors.unit_ids}
        />
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div></div>
          <Button type="submit" variant="contained" sx={{ mt: 1, mr: 1 }}>
            {t("next")}
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default SelectPropertyUnits;
