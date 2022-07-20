import { useState } from "react";
import { useParams } from "react-router-dom";

import { useGetOrderQuery } from "../../../../redux/services/orders";

import { useTranslation } from "react-i18next";

import { formatDate, formats } from "../../../../helpers/datetime";

import { Grid, Divider, Typography } from "@mui/material";
import { mdiEyeOutline } from "@mdi/js";

import IconButton from "../../../../shared/components/IconButton";
import Loader from "../../../../shared/components/Loader";
import OrderStatus from "../../../../shared/components/modules/orders/OrderStatus";

function OrderVisits() {
  const {
    t,
    i18n: { language },
  } = useTranslation("orders");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(false);

  const { orderID } = useParams();

  const { isLoading, data: orderDetails } = useGetOrderQuery(orderID);

  const handleDialogOpen = (selectedQuotation) => {
    setSelectedQuotation(selectedQuotation);
    setOpenDialog(true);
  };
  if (isLoading) return <Loader />;
  return (
    <Grid container spacing={2}>
      <Grid item container>
        <Grid item xs={3}>
          <Typography variant="subtitle2">{t("visitNumber")}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle2">{t("description")}</Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="subtitle2">{t("visitDate")}</Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography variant="subtitle2">{t("visitTime")}</Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="subtitle2">{t("status")}</Typography>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Divider variant="fullWidth" />
      </Grid>

      {orderDetails.visits.map((visit, idx) => (
        <Grid key={visit.id} item container>
          <Grid item xs={3}>
            <Typography component="span" variant="body2">
              #{idx + 1}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography component="span" variant="body2">
              {visit.description}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography component="span" variant="body2">
              {formatDate(visit.date, formats.dateShort, language)}
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography component="span" variant="body2">
              {visit.time}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography component="span" variant="body2">
              <OrderStatus status={visit.status} />
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

export default OrderVisits;
