import { useEffect } from "react";

import { useTranslation } from "react-i18next";
import { useFormik } from "formik";

import * as Yup from "yup";

import { Button, Grid, Typography } from "@mui/material";

import { useGetAllPropertiesQuery } from "../../../../../redux/services/properties";
import Autocomplete from "../../../../../shared/components/inputs/Autocomplete";
import {
  incrementSteps,
  orderFormStepsSelector,
} from "../../../state/orderFormSteps";
import { useDispatch, useSelector } from "react-redux";
import { updateVal, createState } from "../../../state/orderFormData";

const SelectPropertyUnits = () => {
  const { t } = useTranslation("orders");
  const dispatch = useDispatch();
  const { currentStep } = useSelector(orderFormStepsSelector);
  const { isLoading, data: test } = useGetAllPropertiesQuery();

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
  });

  const properties = [
    {
      value: "1",
      label: "property 1",
    },
    {
      value: "2",
      label: "property 2",
    },
    {
      value: "3",
      label: "property 3",
    },
    {
      value: "4",
      label: "property 4",
    },
    {
      value: "5",
      label: "property 5",
    },
  ];

  const units = [
    {
      value: "1",
      label: "Unit 1",
    },
    {
      value: "2",
      label: "Unit 2",
    },
    {
      value: "3",
      label: "Unit 3",
    },
    {
      value: "4",
      label: "Unit 4",
    },
    {
      value: "5",
      label: "Unit 5",
    },
  ];

  return (
    <Grid container spacing={5} component="form" onSubmit={formik.handleSubmit}>
      <Grid item xs={12}>
        <Typography style={{ paddingBottom: 15 }} component="h6" variant="h6">
          Select a property
        </Typography>
        <Autocomplete
          required
          name="property_id"
          label="Property"
          options={properties}
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
          Select Units
        </Typography>
        <Autocomplete
          name="unit_ids"
          isMulti={true}
          label={t("property")}
          noOptionsText={t("noProperties")}
          options={units}
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
            Next
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default SelectPropertyUnits;
