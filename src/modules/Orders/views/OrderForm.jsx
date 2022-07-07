import React, { useState } from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Grid,
  Paper,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Box,
} from "@mui/material";

import { orderFormStepsSelector } from "../state/orderFormSteps";

import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import CreateOrderSteps from "../components/OrderServicesForm/CreateOrderSteps";
import CreateOrderContent from "../components/OrderServicesForm/CreateOrderContent";

function OrderForm({ formType }) {
  const { t } = useTranslation("orders");
  const { orderType } = useParams();
  const { currentStep } = useSelector(orderFormStepsSelector);

  return (
    <Grid container spacing={2} direction="column" flexGrow={1}>
      <Grid item>
        <Breadcrumbs
          items={[
            { label: t(`${orderType}Orders`), url: `/orders/${orderType}` },
          ]}
        />

        <Typography component="h1" variant="h5">
          {t(`${formType}${orderType}OrderFormTitle`)}
        </Typography>
      </Grid>

      <Grid item flexGrow={1}>
        <Paper
          sx={{
            py: 4,
            px: 3,
            minHeight: "calc(90vh - 64px - 48px - 48px - 48px)",
          }}
        >
          <Grid container>
            <Grid item xs={2}>
              <CreateOrderSteps currentStep={currentStep} />
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={10} direction="column">
                <CreateOrderContent currentStep={currentStep} />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

OrderForm.propTypes = {
  formType: PropTypes.string.isRequired,
};

export default OrderForm;