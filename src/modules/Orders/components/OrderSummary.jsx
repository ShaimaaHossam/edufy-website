import { useParams } from "react-router-dom";

import { useGetOrderQuery } from "../../../redux/services/orders";
import { order } from "../../../redux/services/ordersData";

import { useTranslation } from "react-i18next";

import { Grid, Typography } from "@mui/material";

import Link from "../../../shared/components/Link";
import OrderStatus from "../../../shared/components/modules/orders/OrderStatus";
import OrderUnits from "../../../shared/components/modules/orders/OrderUnits";

import OrderAccordion from "./OrderAccordion";

import { formatDate, formats, toTimeZone } from "../../../helpers/datetime";

function OrderSummary() {
  const {
    t,
    i18n: { language },
  } = useTranslation("orders");

  const { orderID } = useParams();

  // const { data: order } = useGetOrderQuery(orderID);

  return (
    <Grid container spacing={2} justifyContent="space-between">
      <Grid item xs container spacing={1} direction="column">
        <Grid item>
          <Typography variant="subtitle2">{t("createdAt")}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">
            {formatDate(
              toTimeZone(order.created_at),
              formats.dateTimeShort,
              language
            )}
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs container spacing={1} direction="column">
        <Grid item>
          <Typography variant="subtitle2">{t("startingAt")}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">
            {formatDate(
              `${order.due_date} ${order.due_time_from}`,
              formats.dateTimeShort,
              language
            )}
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs container spacing={1} direction="column">
        <Grid item>
          <Typography variant="subtitle2">{t("createdBy")}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">
            {order.created_by.name}
            <Typography variant="caption" color="textSecondary" display="block">
              {order.created_by.role.name}
            </Typography>
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs container spacing={1} direction="column">
        <Grid item>
          <Typography variant="subtitle2">{t("property")}</Typography>
        </Grid>
        <Grid item>
          <Link
            color="inherit"
            underline="hover"
            to={`/properties/${order.property.id}`}
          >
            <Typography variant="body2">{order.property.title}</Typography>
          </Link>
        </Grid>
      </Grid>

      <Grid item xs container spacing={1} direction="column">
        <Grid item>
          <Typography variant="subtitle2">{t("units")}</Typography>
        </Grid>
        <Grid item>
          <OrderUnits units={order.units} propertyID={order.property.id} />
        </Grid>
      </Grid>

      <Grid item xs container spacing={1} direction="column">
        <Grid item>
          <Typography variant="subtitle2">{t("status")}</Typography>
        </Grid>
        <Grid item>
          <OrderStatus status={order.status} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default OrderSummary;
