import React from "react";

import { useParams } from "react-router-dom";

import {
  useGetOrderQuery,
  useCancelOrderMutation,
} from "../../../redux/services/orders";

import { useTranslation } from "react-i18next";

import { Button, Grid, Typography } from "@mui/material";

import NotFound from "../../../shared/views/NotFound";

import Loader from "../../../shared/components/Loader";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";

import OrderAccordion from "../components/OrderDetails/OrderAccordion";
import OrderSteps from "../components/OrderDetails/OrderSteps";
import OrderSummary from "../components/OrderDetails/OrderSummary";
import OrderServices from "../components/OrderDetails/OrderServices";
import NewMaterials from "../components/OrderDetails/NewMaterials";

import { ORDER_STATUSES } from "../../../constants/system";

import { order } from "../../../redux/services/ordersData";
import ApprovedMaterials from "../components/OrderDetails/ApprovedMaterials";
import RejectedMaterials from "../components/OrderDetails/RejectedMaterials";
import OrderVisits from "../components/OrderDetails/OrderVisits";
import OrderActivityLog from "../components/OrderDetails/OrderActivityLog";
import AdditionalServices from "../components/OrderDetails/AdditionalServices";

function OrderDetails() {
  const { t } = useTranslation("orders");

  const { orderType, orderID } = useParams();

  const { isFetching, data: orderDetails } = useGetOrderQuery(orderID);

  const [cancelOrder] = useCancelOrderMutation();

  if (isFetching) return <Loader />;
  // if (error?.status === 404) return <NotFound />;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Breadcrumbs
          items={[
            { label: t(`${orderType}Orders`), url: `/orders/${orderType}` },
          ]}
        />

        <Typography component="h1" variant="h5">
          {t("orderDetails")}{" "}
          <Typography
            component="span"
            variant="subtitle1"
            color="textSecondary"
          >
            {orderDetails.reference}
          </Typography>
        </Typography>
      </Grid>

      <Grid item xs={12} textAlign="center" my={3}>
        <OrderSteps />
      </Grid>

      {orderDetails.additional_services.length > 0 && (
        <Grid item xs={12}>
          <OrderAccordion title={t("additionalServices")}>
            <AdditionalServices />
          </OrderAccordion>
        </Grid>
      )}
      {orderDetails.new_quotations.length > 0 && (
        <Grid item xs={12}>
          <OrderAccordion title={t("newQuotations")}>
            <NewMaterials />
          </OrderAccordion>
        </Grid>
      )}

      {orderDetails.user && (
        <Grid item xs={12}>
          <OrderAccordion title={t("orderSummary")}>
            <OrderSummary />
          </OrderAccordion>
        </Grid>
      )}
      {orderDetails.approved_quotations.length > 0 && (
        <Grid item xs={12}>
          <OrderAccordion title={t("approvedQuotations")}>
            <ApprovedMaterials />
          </OrderAccordion>
        </Grid>
      )}
      {orderDetails.rejected_quotations.length > 0 && (
        <Grid item xs={12}>
          <OrderAccordion title={t("rejectedQuotations")}>
            <RejectedMaterials />
          </OrderAccordion>
        </Grid>
      )}
      {orderDetails.services.length > 0 && (
        <Grid item xs={12}>
          <OrderAccordion title={t("servicesSummary")}>
            <OrderServices />
          </OrderAccordion>
        </Grid>
      )}
      {orderDetails.visits.length > 0 && (
        <Grid item xs={12}>
          <OrderAccordion title={t("orderVisits")}>
            <OrderVisits />
          </OrderAccordion>
        </Grid>
      )}
      {orderDetails.activity_log.length > 0 && (
        <Grid item xs={12}>
          <OrderAccordion title={t("activityLog")}>
            <OrderActivityLog />
          </OrderAccordion>
        </Grid>
      )}

      {(order.status === ORDER_STATUSES.created ||
        order.status === ORDER_STATUSES.pending) && (
        <Grid item xs={12} textAlign="right">
          <Button
            variant="contained"
            color="error"
            onClick={() => cancelOrder(orderID)}
          >
            {t("cancelOrder")}
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

export default OrderDetails;
