import { useState } from "react";
import { useParams } from "react-router-dom";

import { useGetOrderQuery } from "../../../../redux/services/orders";

import { useTranslation } from "react-i18next";

import { formatDate, formats } from "../../../../helpers/datetime";

import { Grid, Divider, Typography } from "@mui/material";

function OrderActivityLog() {
  const {
    t,
    i18n: { language },
  } = useTranslation("orders");

  const { orderID } = useParams();

  const { data: orderDetails } = useGetOrderQuery(orderID);

  return (
    <Grid container spacing={2}>
      <Grid item container>
        <Grid item xs={10}>
          <Typography variant="subtitle2">{t("activityLog")}</Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="subtitle2">{t("timeStamp")}</Typography>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Divider variant="fullWidth" />
      </Grid>

      {orderDetails.activity_logs.map((activityLog, idx) => (
        <Grid key={idx} item container>
          <Grid item xs={10}>
            <Typography component="span" variant="body2">
              {activityLog.description}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography color="text.secondary" component="span" variant="body2">
              {activityLog.created_at &&
                formatDate(
                  activityLog.created_at.split(",")[0],
                  formats.dateTimeShort,
                  language
                )}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

export default OrderActivityLog;
