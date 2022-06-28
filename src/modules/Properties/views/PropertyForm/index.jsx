import { useEffect } from "react";
import PropTypes from "prop-types";

import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  clearStepper,
  stepperSelector,
} from "../../state/propertyFormStepperSlice";
import { useGetPropertyQuery } from "../../../../redux/services/properties";

import { useTranslation } from "react-i18next";

import { Grid, Paper, Typography } from "@mui/material";

import NotFound from "../../../../shared/views/NotFound";

import Breadcrumbs from "../../../../shared/components/Breadcrumbs";

import MainForm from "./MainForm";
import ServicesForm from "./ServicesForm";

function PropertyForm({ formType }) {
  const { t } = useTranslation("properties");

  const { propertyID } = useParams();

  const dispatch = useDispatch();
  const { currentStep } = useSelector(stepperSelector);

  const { error } = useGetPropertyQuery(propertyID, {
    skip: !propertyID,
  });

  // clearing stepper on unmount
  useEffect(() => {
    return () => dispatch(clearStepper());
  }, [dispatch]);

  if (error?.status === 404) return <NotFound />;

  return (
    <Grid container spacing={2} direction="column" flexGrow={1}>
      <Grid item>
        <Breadcrumbs items={[{ label: t("properties"), url: "/properties" }]} />

        <Typography component="h1" variant="h5">
          {t(`${formType}PropertyFormTitle`)}
        </Typography>
      </Grid>

      <Grid item flexGrow={1}>
        <Paper sx={{ py: 4, px: 3 }}>
          <div hidden={currentStep !== 1}>
            <MainForm formType={formType} />
          </div>

          <div hidden={currentStep !== 2}>
            <ServicesForm formType={formType} />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}

PropertyForm.propTypes = {
  formType: PropTypes.oneOf(["add", "clone", "edit"]).isRequired,
};

export default PropertyForm;
