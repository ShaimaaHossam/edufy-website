import { useParams } from "react-router-dom";

import { useGetOrderQuery } from "../../../../redux/services/orders";

import { useTranslation } from "react-i18next";

import { Grid, Typography } from "@mui/material";

import Link from "../../../../shared/components/Link";
import OrderStatus from "../../../../shared/components/modules/orders/OrderStatus";
import OrderUnits from "../../../../shared/components/modules/orders/OrderUnits";

import { formatDate, formats, toTimeZone } from "../../../../helpers/datetime";
import { format } from "date-fns";
function OrderSummary() {
  const {
    t,
    i18n: { language },
  } = useTranslation("orders");

  const { orderID } = useParams();

  const { isLoading, data: order } = useGetOrderQuery(orderID);

  if (isLoading) return null;

  return (
    <Grid container spacing={2} justifyContent="space-between">
      <Grid item xs container spacing={1} direction="column">
        <Grid item>
          <Typography variant="subtitle2">{t("createdAt")}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">
            {formatDate(order.visits?.[0]?.date, formats.dateShort, language)}
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs container spacing={1} direction="column">
        <Grid item>
          <Typography variant="subtitle2">{t("timeToProvide")}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">
            {
              new Date(`05/10/2020, ${order.visits?.[0]?.time}`)
                .toLocaleString()
                .split(",")[1]
            }
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs container spacing={1} direction="column">
        <Grid item>
          <Typography variant="subtitle2">{t("createdBy")}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">
            {order.user.name}
            <Typography variant="caption" color="textSecondary" display="block">
              {order.user.role}
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
          <Typography variant="subtitle2">{t("unit")}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">{order.unit.title}</Typography>
          {/* <OrderUnits units={order.units} propertyID={order.property.id} /> */}
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
