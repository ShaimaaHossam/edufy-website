import { useState } from "react";
import { useParams } from "react-router-dom";

import {
  useGetOrderQuery,
  useApproveMaterialMutation,
  useRejectMaterialMutation,
} from "../../../../redux/services/orders";
// import { order } from "../../../../redux/services/ordersData";

import { useTranslation } from "react-i18next";

import { Grid, Divider, Typography, Button, Chip } from "@mui/material";
import { mdiCheck, mdiClose, mdiEyeOutline } from "@mdi/js";

import Icon from "../../../../shared/components/Icon";

import IconButton from "../../../../shared/components/IconButton";
import Dialog from "../../../../shared/components/Dialog";
import DialogRejectedQuotation from "./DialogRejectedQuotation";

// function SimpleDialog(props) {
//   const { onClose, open } = props;

//   return (
//     <Dialog onClose={onClose} open={open}>
//       Hello
//     </Dialog>
//   );
// }

function RejectedMaterials() {
  const { t } = useTranslation("orders");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(false);

  const { orderID } = useParams();

  const { data: orderDetails } = useGetOrderQuery(orderID);

  const handleDialogOpen = (selectedQuotation) => {
    setSelectedQuotation(selectedQuotation);
    setOpenDialog(true);
  };
  return (
    <Grid container spacing={2}>
      <Grid item container>
        <Grid item xs={3}>
          <Typography variant="subtitle2">{t("quotation")}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle2">{t("totalItems")}</Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="subtitle2">{t("dateTime")}</Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography variant="subtitle2">{t("totalPrice")}</Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="subtitle2">{t("action")}</Typography>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Divider variant="fullWidth" />
      </Grid>

      {orderDetails.rejected_quotations.map((quotation) => (
        <Grid key={quotation.id} item container>
          <Grid item xs={3}>
            <Typography component="span" variant="body2">
              {quotation.reference}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography component="span" variant="body2">
              {
                quotation.materials.filter(
                  (material) => material.status === "Rejected"
                ).length
              }
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography component="span" variant="body2">
              16/6/2022 - 10:00 am
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography component="span" variant="body2">
              {quotation.total.toFixed(2)} {t("sr")}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton
              aria-label="toggle filters visibility"
              icon={mdiEyeOutline}
              size="small"
              shape="rounded"
              onClick={() => handleDialogOpen(quotation)}
            />
          </Grid>
          {/* <Grid item xs={2} container spacing={2}>
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
          </Grid> */}
        </Grid>
      ))}
      <Dialog
        size="extraLarge"
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogRejectedQuotation selectedQuotation={selectedQuotation} />
      </Dialog>
    </Grid>
  );
}

export default RejectedMaterials;
