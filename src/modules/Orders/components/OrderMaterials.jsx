import { useParams } from "react-router-dom";

import {
  useGetOrderQuery,
  useApproveMaterialMutation,
  useRejectMaterialMutation,
} from "../../../redux/services/orders";
import { order } from "../../../redux/services/ordersData";

import { useTranslation } from "react-i18next";

import { Grid, Divider, Typography, Button, Chip } from "@mui/material";
import { mdiCheck, mdiClose } from "@mdi/js";

import Icon from "../../../shared/components/Icon";

import OrderAccordion from "./OrderAccordion";

function OrderMaterials() {
  const { t } = useTranslation("orders");

  const { orderID } = useParams();

  // const { data: order } = useGetOrderQuery(orderID);
  const [approveMaterial] = useApproveMaterialMutation();
  const [rejectMaterial] = useRejectMaterialMutation();

  if (!order.materials.length) {
    return (
      <OrderAccordion title={t("materialsQuotation")}>
        <Typography color="textSecondary">{t("noOrderMaterials")}</Typography>
      </OrderAccordion>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item container>
        <Grid item xs={3} lg={5} xl={6}>
          <Typography variant="subtitle2">{t("material")}</Typography>
        </Grid>

        <Grid item xs={2} lg={1}>
          <Typography variant="subtitle2">{t("price")}</Typography>
        </Grid>

        <Grid item xs={2} lg={1}>
          <Typography variant="subtitle2">{t("quantity")}</Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="subtitle2">{t("totalPrice")}</Typography>
        </Grid>

        <Grid item xs={3} lg={2}>
          <Typography variant="subtitle2">{t("actions")}</Typography>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Divider variant="fullWidth" />
      </Grid>

      {order.materials.map((material) => (
        <Grid key={material.id} item container>
          <Grid item xs={3} lg={5} xl={6}>
            <Typography component="span" variant="body2">
              {material.name}
            </Typography>
          </Grid>

          <Grid item xs={2} lg={1}>
            <Typography component="span" variant="body2">
              {material.price.toFixed(2)} {t("sr")}
            </Typography>
          </Grid>

          <Grid item xs={2} lg={1}>
            <Typography component="span" variant="body2">
              {material.quantity}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography component="span" variant="body2">
              {(material.price * material.quantity).toFixed(2)} {t("sr")}
            </Typography>
          </Grid>

          <Grid item xs={3} lg={2} container spacing={2}>
            {!material.reviewed_at ? (
              <>
                <Grid item>
                  <Button
                    size="small"
                    variant="outlined"
                    color="success"
                    onClick={() => approveMaterial(material.id)}
                  >
                    {t("approve")}
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => rejectMaterial(material.id)}
                  >
                    {t("reject")}
                  </Button>
                </Grid>
              </>
            ) : material.is_approved ? (
              <Grid item>
                <Chip
                  size="small"
                  color="success"
                  variant="outlined"
                  label={t("approved")}
                  icon={<Icon icon={mdiCheck} />}
                />
              </Grid>
            ) : (
              <Grid item>
                <Chip
                  size="small"
                  color="error"
                  variant="outlined"
                  label={t("rejected")}
                  icon={<Icon icon={mdiClose} />}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      ))}

      <Grid item xs={12}>
        <Divider variant="fullWidth" />
      </Grid>

      <Grid item container>
        <Grid item container>
          <Grid item xs={7} xl={8}>
            <Typography variant="subtitle2">{t("costWithoutVat")}</Typography>
          </Grid>

          <Grid item xs={5} xl={4}>
            <Typography component="span" variant="body2">
              {order.materials_total_without_vat.toFixed(2)} {t("sr")}
            </Typography>
          </Grid>
        </Grid>

        <Grid item container>
          <Grid item xs={7} xl={8}>
            <Typography variant="subtitle2">{t("vatCost")}</Typography>
          </Grid>

          <Grid item xs={5} xl={4}>
            <Typography component="span" variant="body2">
              {order.materials_vat_amount.toFixed(2)} {t("sr")}
            </Typography>
          </Grid>
        </Grid>

        <Grid item container>
          <Grid item xs={7} xl={8}>
            <Typography variant="subtitle1" color="primary">
              {t("totalMaterialsInvoice")}
            </Typography>
          </Grid>

          <Grid item xs={5} xl={4}>
            <Typography component="span" variant="subtitle1" color="primary">
              {order.materials_total_amount.toFixed(2)} {t("sr")}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default OrderMaterials;
