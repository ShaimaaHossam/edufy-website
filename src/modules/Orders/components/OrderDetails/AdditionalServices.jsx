import { useParams } from "react-router-dom";

import {
  useApproveRejectServiceMutation,
  useGetOrderQuery,
} from "../../../../redux/services/orders";

import { useTranslation } from "react-i18next";

import { Grid, Divider, Typography, Button } from "@mui/material";

import {
  ORDER_STATUSES,
  SERVICE_STATUSES,
  VAT_AMOUNT,
} from "../../../../constants/system";
import usePermissions from "../../../../shared/hooks/usePermissions";

function AdditionalServices() {
  const {
    t,
    i18n: { language },
  } = useTranslation("orders");
  const ordersPerms = usePermissions("order_transaction");
  const { orderID } = useParams();

  const { data: orderDetails } = useGetOrderQuery(orderID);

  const [approveRejectService] = useApproveRejectServiceMutation();

  return (
    <Grid container spacing={2}>
      <Grid item container>
        <Grid item xs={2}>
          <Typography variant="subtitle2">{t("service")}: </Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="subtitle2">{t("unitPrice")}</Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="subtitle2">{t("quantity")}</Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography variant="subtitle2">{t("totalPrice")}</Typography>
        </Grid>
        {ordersPerms.update && orderDetails.status !== ORDER_STATUSES.canceled && (
          <Grid item xs={3}>
            <Typography variant="subtitle2">{t("actions")}</Typography>
          </Grid>
        )}
      </Grid>

      <Grid item xs={12}>
        <Divider variant="fullWidth" />
      </Grid>

      {orderDetails.additional_services.map((service) => (
        <Grid key={service.id} item container>
          <Grid item xs={2}>
            <Typography component="span" variant="body2">
              {service.name}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography component="span" variant="body2">
              {service.unit_price.toFixed(2)} {t("sr")}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography component="span" variant="body2">
              {service.quantity}
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography component="span" variant="body2">
              {service.total.toFixed(2)} {t("sr")}
            </Typography>
          </Grid>
          {ordersPerms.update &&
            orderDetails.status !== ORDER_STATUSES.canceled && (
              <Grid item container xs={3} spacing={2}>
                <Grid item>
                  <Button
                    size="small"
                    variant="outlined"
                    color="success"
                    onClick={() => {
                      const id = service.id;
                      const marafeq_status = SERVICE_STATUSES.created;
                      approveRejectService({ id, marafeq_status });
                    }}
                  >
                    {t("approve")}
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      const id = service.id;
                      const marafeq_status = SERVICE_STATUSES.rejected;
                      approveRejectService({ id, marafeq_status });
                    }}
                  >
                    {t("reject")}
                  </Button>
                </Grid>
              </Grid>
            )}
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
              {/* {orderDetails.total.toFixed(2)} {t("sr")} */}
            </Typography>
          </Grid>
        </Grid>

        <Grid item container>
          <Grid item xs={10}>
            <Typography variant="subtitle2">{t("vatCost")}</Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography component="span" variant="body2">
              {/* {(orderDetails.total * VAT_AMOUNT).toFixed(2)} {t("sr")} */}
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
              {/* {(orderDetails.total + orderDetails.total * VAT_AMOUNT).toFixed(
                2
              )}{" "}
              {t("sr")} */}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AdditionalServices;
