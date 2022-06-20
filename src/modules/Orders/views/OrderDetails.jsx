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

import OrderAccordion from "../components/OrderAccordion";
import OrderSteps from "../components/OrderSteps";
import OrderSummary from "../components/OrderSummary";
import OrderServices from "../components/OrderServices";
import OrderMaterials from "../components/OrderMaterials";

import { ORDER_STATUSES } from "../../../constants/system";

import { order } from "../../../redux/services/ordersData";

function OrderDetails() {
  const { t } = useTranslation("orders");

  const { orderType, orderID } = useParams();

  // const { isFetching, error, data: order } = useGetOrderQuery(orderID);
  const [cancelOrder] = useCancelOrderMutation();

  // if (isFetching) return <Loader />;
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
            {order.order_number}
          </Typography>
        </Typography>
      </Grid>

      <Grid item xs={12} textAlign="center" my={3}>
        <OrderSteps />
      </Grid>

      <Grid item xs={12}>
        <OrderAccordion title={t("orderSummary")}>
          <OrderSummary />
        </OrderAccordion>
      </Grid>

      <Grid item xs={12}>
        <OrderAccordion title={t("servicesSummary")}>
          <OrderServices />
        </OrderAccordion>
      </Grid>

      <Grid item xs={12}>
        <OrderAccordion title={t("materialsQuotation")}>
          <OrderMaterials />
        </OrderAccordion>
      </Grid>

      {(order.status === ORDER_STATUSES.requested ||
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
