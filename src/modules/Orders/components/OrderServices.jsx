import { useParams } from "react-router-dom";

import { useGetOrderQuery } from "../../../redux/services/orders";
import { order } from "../../../redux/services/ordersData";

import { useTranslation } from "react-i18next";

import { Grid, Divider, Typography } from "@mui/material";

import OrderAccordion from "./OrderAccordion";

function OrderServices() {
  const { t } = useTranslation("orders");

  const { orderID } = useParams();

  // const { data: order } = useGetOrderQuery(orderID);

  return (
    <Grid container spacing={2}>
      <Grid item container>
        <Grid item xs={6}>
          <Typography variant="subtitle2">{t("service")}</Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="subtitle2">{t("price")}</Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="subtitle2">{t("quantity")}</Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="subtitle2">{t("totalPrice")}</Typography>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Divider variant="fullWidth" />
      </Grid>

      {order.services.map((service) => (
        <Grid key={service.service_id} item container>
          <Grid item xs={6}>
            <Typography component="span" variant="body2">
              {service.name}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography component="span" variant="body2">
              {service.price.toFixed(2)} {t("sr")}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography component="span" variant="body2">
              {service.quantity}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography component="span" variant="body2">
              {(service.price * service.quantity).toFixed(2)} {t("sr")}
            </Typography>
          </Grid>
        </Grid>
      ))}

      <Grid item xs={12}>
        <Divider variant="fullWidth" />
      </Grid>

      <Grid item container>
        <Grid item container>
          <Grid item xs={10}>
            <Typography variant="subtitle2">{t("costWithoutVat")}</Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography component="span" variant="body2">
              {order.services_total_without_vat.toFixed(2)} {t("sr")}
            </Typography>
          </Grid>
        </Grid>

        <Grid item container>
          <Grid item xs={10}>
            <Typography variant="subtitle2">{t("vatCost")}</Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography component="span" variant="body2">
              {order.services_vat_amount.toFixed(2)} {t("sr")}
            </Typography>
          </Grid>
        </Grid>

        <Grid item container>
          <Grid item xs={10}>
            <Typography variant="subtitle1" color="primary">
              {t("totalServicesInvoice")}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography component="span" variant="subtitle1" color="primary">
              {order.services_total_amount.toFixed(2)} {t("sr")}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default OrderServices;
