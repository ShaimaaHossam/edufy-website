import { useState } from "react";
import { useParams } from "react-router-dom";

import { useGetOrderQuery } from "../../../../redux/services/orders";

import { useTranslation } from "react-i18next";

import { formatDate, formats } from "../../../../helpers/datetime";

import { Grid, Divider, Typography } from "@mui/material";
import { mdiEyeOutline } from "@mdi/js";

import IconButton from "../../../../shared/components/IconButton";

const orderDetails = {
  activityLogs: [
    {
      id: "1",
      activity: "Order created",
      timeStamp: "2020-01-01T00:00:00.000Z",
    },
    {
      id: "2",
      activity: "Order created",
      timeStamp: "2020-01-02T02:00:00.000Z",
    },
    {
      id: "3",
      activity: "Order created",
      timeStamp: "2020-01-03T03:00:00.000Z",
    },
    {
      id: "4",
      activity: "Order created",
      timeStamp: "2020-01-04T04:00:00.000Z",
    },
    {
      id: "5",
      activity: "Order created",
      timeStamp: "2020-01-05T05:00:00.000Z",
    },
    {
      id: "6",
      activity: "Order created",
      timeStamp: "2020-01-06T06:00:00.000Z",
    },
    {
      id: "7",
      activity: "Order created",
      timeStamp: "2020-01-07T07:00:00.000Z",
    },
  ],
};

function OrderActivityLog() {
  const {
    t,
    i18n: { language },
  } = useTranslation("orders");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(false);

  const { orderID } = useParams();

  //   const { data: orderDetails } = useGetOrderQuery(orderID);

  const handleDialogOpen = (selectedQuotation) => {
    setSelectedQuotation(selectedQuotation);
    setOpenDialog(true);
  };
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

      {orderDetails.activityLogs.map((activityLog) => (
        <Grid key={activityLog.id} item container>
          <Grid item xs={10}>
            <Typography component="span" variant="body2">
              {activityLog.activity}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography component="span" variant="body2">
              {activityLog.timeStamp}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

export default OrderActivityLog;
