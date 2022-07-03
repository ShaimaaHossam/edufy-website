import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { setInvoiceToReject, setInvoiceToPay } from "../state/invoicesSlice";

import { useTranslation } from "react-i18next";

import { Box, Grid, Divider, Typography, Button } from "@mui/material";

import InfoBar from "../../../shared/components/InfoBar";

import { INVOICE_STATUSES } from "../../../constants/system";

function InvoiceDetails({ invoice }) {
  const { t } = useTranslation("accounting");

  const dispatch = useDispatch();

  return (
    <Box mx={4} mb={4}>
      <Grid container spacing={3}>
        <Grid
          item
          container
          columnSpacing={3}
          rowSpacing={0.5}
          justifyContent="center"
          sx={{ width: 300 }}
        >
          <Grid item xs={6} textAlign="right">
            <Typography component="span" variant="body2" color="text.secondary">
              {t("invoiceAmount")}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="span" variant="body2" color="text.primary">
              {invoice.invoice_amount} {t("sr")}
            </Typography>
          </Grid>

          <Grid item xs={6} textAlign="right">
            <Typography component="span" variant="body2" color="text.secondary">
              {t("vatAmount")}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="span" variant="body2" color="text.primary">
              {invoice.vat_amount} {t("sr")}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider variant="fullWidth" />
          </Grid>

          <Grid item xs={6} textAlign="right">
            <Typography
              component="span"
              variant="subtitle2"
              color="text.secondary"
            >
              {t("totalAmount")}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="span" variant="subtitle2" color="primary">
              {invoice.total_amount} {t("sr")}
            </Typography>
          </Grid>

          {invoice.status === INVOICE_STATUSES.pending && (
            <Grid item xs={12} sx={{ mt: 0.5, textAlign: "center" }}>
              <Button
                size="small"
                color="error"
                variant="outlined"
                sx={{ minWidth: 80, borderRadius: 100, mr: 0.5 }}
                onClick={() => dispatch(setInvoiceToReject(invoice))}
              >
                {t("reject")}
              </Button>

              <Button
                size="small"
                color="primary"
                sx={{ minWidth: 80, borderRadius: 100 }}
                onClick={() => dispatch(setInvoiceToPay(invoice))}
              >
                {t("pay")}
              </Button>
            </Grid>
          )}
        </Grid>

        {invoice.rejection_reason && (
          <Grid item sx={{ width: 340 }}>
            <InfoBar rounded color="error">
              <Typography variant="subtitle2">
                {t("rejectionReason")}
              </Typography>

              <Typography variant="caption">
                {invoice.rejection_reason}
              </Typography>
            </InfoBar>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

InvoiceDetails.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default InvoiceDetails;
