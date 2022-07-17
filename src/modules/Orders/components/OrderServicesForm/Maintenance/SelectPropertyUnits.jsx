import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { useFormik } from "formik";

import * as Yup from "yup";

import { Button, Grid, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllPropertiesQuery,
  useGetAllUnitsQuery,
} from "../../../../../redux/services/properties";
import { updateVal, orderFormDataSelector } from "../../../state/orderFormData";
import {
  incrementSteps,
  orderFormStepsSelector,
} from "../../../state/orderFormSteps";

import Autocomplete from "../../../../../shared/components/inputs/Autocomplete";
import Dialog from "../../../../../shared/components/Dialog";

import IconButton from "../../../../../shared/components/IconButton";
import { mdiCheck, mdiPencil } from "@mdi/js";
import useNavigationBlocker from "../../../../../shared/hooks/useNavigationBlocker";

const SelectPropertyUnits = ({ preview = false }) => {
  const { t } = useTranslation("orders");
  const dispatch = useDispatch();
  const { currentStep } = useSelector(orderFormStepsSelector);
  const { selectedPropertyId, selectedUnits } = useSelector(
    orderFormDataSelector
  );
  const [editSelectedProperty, setEditSelectedProperty] = useState(preview);
  const [editSelectedUnits, setEditSelectedUnits] = useState(preview);
  const [canLeave, setCanLeave] = useState(false);
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);

  const formik = useFormik({
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      property_id: selectedPropertyId || "",
      unit_ids: selectedUnits || [],
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
  const { dirty } = formik;
  useNavigationBlocker(dirty && !canLeave, () => setLeaveDialogOpen(true));
  const { isLoading, data: properties } = useGetAllPropertiesQuery();

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
        <Typography
          style={{ paddingBottom: !preview ? 15 : 35 }}
          component="h6"
          variant="h6"
        >
          {t(!preview ? "selectProperty" : "propertyAndUnits")}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={preview ? 11 : 12}>
            <Autocomplete
              required
              name="property_id"
              label={t("property")}
              fixedValue={editSelectedProperty ? true : false}
              options={properties.map((type) => ({
                value: type.id,
                label: type.title,
              }))}
              noOptionsText={t("noProperties")}
              value={formik.values.property_id}
              onChange={(e) => {
                formik.setValues({
                  ...formik.values,
                  property_id: e.target.value,
                  unit_ids: [],
                });
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.property_id && !!formik.errors.property_id}
              helperText={
                formik.touched.property_id && formik.errors.property_id
              }
            />
          </Grid>
          {preview && (
            <Grid item alignSelf={"center"} xs={1}>
              {editSelectedProperty ? (
                <IconButton
                  type="submit"
                  aria-label="remove service"
                  icon={mdiPencil}
                  size="medium"
                  shape="rounded"
                  color="primary"
                  onClick={() => setEditSelectedProperty(!editSelectedProperty)}
                />
              ) : (
                <IconButton
                  aria-label="remove service"
                  icon={mdiCheck}
                  size="medium"
                  shape="rounded"
                  color={"success"}
                  onClick={() => setEditSelectedProperty(!editSelectedProperty)}
                />
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {!preview && (
          <Typography style={{ paddingBottom: 15 }} component="h6" variant="h6">
            {t("selectUnits")}
          </Typography>
        )}
        <Grid container spacing={3}>
          <Grid item xs={preview ? 11 : 12}>
            <Autocomplete
              disabled={!formik.values.property_id}
              name="unit_ids"
              isMulti={true}
              fixedValue={editSelectedUnits ? true : false}
              label={t("units")}
              noOptionsText={t("noUnits")}
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
          {preview && (
            <Grid item alignSelf={"center"} xs={1}>
              {editSelectedUnits ? (
                <IconButton
                  type="submit"
                  aria-label="remove service"
                  icon={mdiPencil}
                  size="medium"
                  shape="rounded"
                  color="primary"
                  onClick={() => setEditSelectedUnits(!editSelectedUnits)}
                />
              ) : (
                <IconButton
                  disabled={
                    !formik.values.property_id ||
                    formik.values.unit_ids.length === 0
                  }
                  aria-label="remove service"
                  icon={mdiCheck}
                  size="medium"
                  shape="rounded"
                  color={"success"}
                  onClick={() => setEditSelectedUnits(!editSelectedUnits)}
                />
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
      {!preview && (
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div></div>
            <Button
              disabled={
                !formik.values.property_id ||
                formik.values.unit_ids.length === 0
              }
              type="submit"
              variant="contained"
              sx={{ mt: 1, mr: 1 }}
            >
              {t("next")}
            </Button>
          </div>
        </Grid>
      )}
      <Dialog
        size="small"
        open={leaveDialogOpen}
        title={t("discardChanges")}
        titleColor="error"
        confirmLabel={t("discard")}
        confirmColor="error"
        onClose={() => setLeaveDialogOpen(false)}
        onConfirm={() => setCanLeave(true)}
      >
        {t("orderFormLeaveMessage")}
      </Dialog>
    </Grid>
  );
};

export default SelectPropertyUnits;
