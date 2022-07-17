import { useParams } from "react-router-dom";

import { useGetOrderQuery } from "../../../../redux/services/orders";
import { order } from "../../../../redux/services/ordersData";

import { useTranslation } from "react-i18next";

import { Grid, Divider, Typography } from "@mui/material";

import OrderAccordion from "./OrderAccordion";
import { Fragment } from "react";
import { VAT_AMOUNT } from "../../../../constants/system";

function OrderServices() {
  const {
    t,
    i18n: { language },
  } = useTranslation("orders");

  const { orderID } = useParams();

  const { data: orderDetails } = useGetOrderQuery(orderID);

  return (
    <Grid container spacing={2}>
      <Grid item container>
        <Grid item xs={3}>
          <Typography variant="subtitle2">{t("service")}: </Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography variant="subtitle2">{t("unitPrice")}</Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography variant="subtitle2">{t("quantity")}</Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography variant="subtitle2">{t("totalPrice")}</Typography>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Divider variant="fullWidth" />
      </Grid>

      {orderDetails.services.map((service) => (
        <Grid key={service.id} item container>
          <Grid item xs={3}>
            <Typography component="span" variant="body2">
              {language === "en"
                ? service.items.name.en
                : service.items.name.ar}
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography component="span" variant="body2">
              {service.unit_price.toFixed(2)} {t("sr")}
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography component="span" variant="body2">
              {service.quantity}
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography component="span" variant="body2">
              {service.total.toFixed(2)} {t("sr")}
            </Typography>
          </Grid>
        </Grid>
      ))}

      <Grid item xs={12}>
        <Divider variant="fullWidth" />
      </Grid>

      <Grid item container>
        <Grid item container>
          <Grid item xs={9}>
            <Typography variant="subtitle2">{t("costWithoutVat")}</Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography component="span" variant="body2">
              {orderDetails.total.toFixed(2)} {t("sr")}
            </Typography>
          </Grid>
        </Grid>

        <Grid item container>
          <Grid item xs={9}>
            <Typography variant="subtitle2">{t("vatCost")}</Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography component="span" variant="body2">
              {(orderDetails.total * VAT_AMOUNT).toFixed(2)} {t("sr")}
            </Typography>
          </Grid>
        </Grid>

        <Grid item container>
          <Grid item xs={9}>
            <Typography variant="subtitle1" color="primary">
              {t("totalServicesInvoice")}
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography component="span" variant="subtitle1" color="primary">
              {(orderDetails.total + orderDetails.total * VAT_AMOUNT).toFixed(
                2
              )}{" "}
              {t("sr")}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default OrderServices;
