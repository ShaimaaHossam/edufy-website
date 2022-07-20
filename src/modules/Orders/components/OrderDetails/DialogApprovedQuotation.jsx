import { Divider, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { VAT_AMOUNT } from "../../../../constants/system";
import { formatDate, formats } from "../../../../helpers/datetime";

const DialogApprovedQuotation = ({ selectedQuotation }) => {
  const { t } = useTranslation("orders");
  return (
    <Grid
      container
      spacing={2}
      sx={{
        p: 2,
        border: 1,
        borderColor: "divider",
        backgroundColor: "white",
      }}
    >
      <Grid item>
        <Typography variant="subtitle1" component="span">
          {t("quotation")} #{selectedQuotation.reference}{" "}
        </Typography>
        <Typography variant="body1" component="span">
          - {formatDate(selectedQuotation.created_at, formats.dateTimeShort)}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Divider variant="fullWidth" />
      </Grid>
      <Grid item container>
        <Grid item xs={3}>
          <Typography variant="subtitle2">{t("material")}</Typography>
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

        <Grid item xs={2}>
          <Typography variant="subtitle2">{t("status")}</Typography>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Divider variant="fullWidth" />
      </Grid>

      {selectedQuotation.materials.map((material) => (
        <Grid key={material.id} item container>
          <Grid item xs={3}>
            <Typography component="span" variant="body2">
              {material.material}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography component="span" variant="body2">
              {material.unit_price.toFixed(2)} {t("sr")}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography
              sx={{ textAlign: "center" }}
              component="span"
              variant="body2"
            >
              {material.quantity}
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography component="span" variant="body2">
              {material.total.toFixed(2)} {t("sr")}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography
              sx={{ textAlign: "center" }}
              component="span"
              variant="body2"
              color="success.main"
            >
              {t("approved")}
            </Typography>
          </Grid>
        </Grid>
      ))}

      <Grid item xs={12}>
        <Divider variant="fullWidth" />
      </Grid>

      <Grid item container spacing={1}>
        <Grid item container>
          <Grid item xs={10}>
            <Typography variant="subtitle2">{t("costWithoutVat")}</Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography component="span" variant="body2">
              {selectedQuotation.total.toFixed(2)} {t("sr")}
            </Typography>
          </Grid>
        </Grid>

        <Grid item container>
          <Grid item xs={10}>
            <Typography variant="subtitle2">{t("vatCost")}</Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography component="span" variant="body2">
              {((selectedQuotation.total * VAT_AMOUNT) / 100).toFixed(2)}{" "}
              {t("sr")}
            </Typography>
          </Grid>
        </Grid>

        <Grid item container>
          <Grid item xs={10}>
            <Typography variant="subtitle1" color="primary">
              {t("totalMaterialsInvoice")}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography component="span" variant="subtitle1" color="primary">
              {(
                selectedQuotation.total +
                (selectedQuotation.total * VAT_AMOUNT) / 100
              ).toFixed(2)}{" "}
              {t("sr")}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DialogApprovedQuotation;
