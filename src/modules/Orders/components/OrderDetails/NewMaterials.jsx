import { useParams } from "react-router-dom";

import {
  useGetOrderQuery,
  useApproveMaterialMutation,
  useRejectMaterialMutation,
} from "../../../../redux/services/orders";
// import { order } from "../../../../redux/services/ordersData";

import { useTranslation } from "react-i18next";

import { Grid, Divider, Typography, Button, Chip } from "@mui/material";
import { mdiCheck, mdiClose } from "@mdi/js";

import Icon from "../../../../shared/components/Icon";

import OrderAccordion from "./OrderAccordion";
import { Fragment } from "react";

function NewMaterials() {
  const { t } = useTranslation("orders");

  const { orderID } = useParams();

  const { data: orderDetails } = useGetOrderQuery(orderID);
  const [approveMaterial] = useApproveMaterialMutation();
  const [rejectMaterial] = useRejectMaterialMutation();

  // if (!order.materials.length) {
  //   return (
  //     <OrderAccordion title={t("materialsQuotation")}>
  //       <Typography color="textSecondary">{t("noOrderMaterials")}</Typography>
  //     </OrderAccordion>
  //   );
  // }

  return (
    <>
      {orderDetails.new_quotations.map((quotation) => (
        <Fragment key={quotation.id}>
          <Grid container spacing={2}>
            <Grid item container>
              <Grid item>
                <Typography variant="subtitle1" component="span">
                  {t("quotation")} #1
                </Typography>
                <Typography variant="body1" component="span">
                  - quotation name - 15/06/2022 10:00 am
                </Typography>
              </Grid>
              <Grid item sx={{ ml: "auto" }}>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => approveMaterial(quotation.id)}
                >
                  {t("approveQuotation")}
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="fullWidth" />
            </Grid>
            <Grid item container>
              <Grid item xs={3} lg={4}>
                <Typography variant="subtitle2">{t("images")}</Typography>
              </Grid>
              <Grid item xs={2} lg={2}>
                <Typography variant="subtitle2">{t("material")}</Typography>
              </Grid>

              <Grid item xs={2} lg={1}>
                <Typography variant="subtitle2">{t("unitPrice")}</Typography>
              </Grid>

              <Grid item xs={2} lg={2}>
                <Typography variant="subtitle2">{t("quantity")}</Typography>
              </Grid>

              <Grid item xs={2} lg={2}>
                <Typography variant="subtitle2">{t("totalPrice")}</Typography>
              </Grid>

              <Grid item xs={3} lg={1}>
                <Typography variant="subtitle2">{t("actions")}</Typography>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider variant="fullWidth" />
            </Grid>

            {quotation.materials.map((material) => (
              <Fragment key={material.id}>
                {material.status === "Created" && (
                  <Grid item container>
                    <Grid
                      item
                      container
                      xs={3}
                      lg={4}
                      spacing={2}
                      sx={{
                        flexWrap: "nowrap",
                        overflowX: "auto",
                      }}
                    >
                      {material.attachments.length > 0 ? (
                        <Grid item xs={2}>
                          <img
                            width={60}
                            style={{ borderRadius: "5px" }}
                            src="https://images.unsplash.com/photo-1581166931041-b62d92d52852?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                            alt=""
                          />
                        </Grid>
                      ) : (
                        <Grid item xs={12}>
                          <Typography component="span" variant="body2">
                            {t("noImages")}
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                    <Grid item xs={1} lg={2}>
                      <Typography component="span" variant="body2">
                        {material.material}
                      </Typography>
                    </Grid>

                    <Grid item xs={2} lg={1}>
                      <Typography component="span" variant="body2">
                        {material.unit_price.toFixed(2)} {t("sr")}
                      </Typography>
                    </Grid>

                    <Grid item xs={2} lg={2}>
                      <Typography
                        sx={{ textAlign: "center" }}
                        component="span"
                        variant="body2"
                      >
                        {material.quantity}
                      </Typography>
                    </Grid>

                    <Grid item xs={2} lg={2}>
                      <Typography component="span" variant="body2">
                        {material.total.toFixed(2)} {t("sr")}
                      </Typography>
                    </Grid>

                    <Grid item xs={3} lg={1} container spacing={2}>
                      <Grid item>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          onClick={() => rejectMaterial(material.id)}
                        >
                          {t("remove")}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Fragment>
            ))}

            <Grid item xs={12}>
              <Divider variant="fullWidth" />
            </Grid>

            <Grid item container>
              <Grid item container>
                <Grid item xs={7} xl={9}>
                  <Typography variant="subtitle2">
                    {t("costWithoutVat")}
                  </Typography>
                </Grid>

                <Grid item xs={5} xl={3}>
                  <Typography component="span" variant="body2">
                    {quotation.total.toFixed(2)} {t("sr")}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item container>
                <Grid item xs={7} xl={9}>
                  <Typography variant="subtitle2">{t("vatCost")}</Typography>
                </Grid>

                <Grid item xs={5} xl={3}>
                  <Typography component="span" variant="body2">
                    {((quotation.total * 15) / 100).toFixed(2)} {t("sr")}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item container>
                <Grid item xs={7} xl={9}>
                  <Typography variant="subtitle1" color="primary">
                    {t("totalMaterialsInvoice")}
                  </Typography>
                </Grid>

                <Grid item xs={5} xl={3}>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="primary"
                  >
                    {(quotation.total + (quotation.total * 15) / 100).toFixed(
                      2
                    )}{" "}
                    {t("sr")}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Fragment>
      ))}
    </>
  );
}

export default NewMaterials;
