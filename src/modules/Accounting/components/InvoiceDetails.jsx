import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { setInvoiceToPay, setInvoiceToReport } from "../state/invoicesSlice";

import { useTranslation } from "react-i18next";

import { Grid, Divider, Typography, Button } from "@mui/material";

import InfoBar from "../../../shared/components/InfoBar";

import { INVOICE_STATUSES } from "../../../constants/system";

function InvoiceDetails({ invoice }) {
  const { t } = useTranslation("accounting");

  const dispatch = useDispatch();

  return (
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
            {invoice.amount} {t("sr")}
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

        {!!invoice.refund_amount && (
          <>
            <Grid item xs={6} textAlign="right">
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
              >
                {t("refundAmount")}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                component="span"
                variant="subtitle2"
                color="warning.main"
              >
                {invoice.refund_amount} {t("sr")}
              </Typography>
            </Grid>
          </>
        )}

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
            {invoice.required_amount} {t("sr")}
          </Typography>
        </Grid>

        {invoice.status !== INVOICE_STATUSES.paid && (
          <Grid item xs={12} sx={{ mt: 0.5, textAlign: "center" }}>
            <Button
              size="small"
              color="error"
              variant="outlined"
              disabled={invoice.status === INVOICE_STATUSES.pending}
              sx={{ minWidth: 80, borderRadius: 100, mr: 0.5 }}
              onClick={() => dispatch(setInvoiceToReport(invoice))}
            >
              {t("report")}
            </Button>

            <Button
              size="small"
              color="primary"
              sx={{ minWidth: 80, borderRadius: 100 }}
              onClick={() => dispatch(setInvoiceToPay(invoice))}
            >
              {invoice.status === INVOICE_STATUSES.rejected
                ? t("payAgain")
                : t("pay")}
            </Button>
          </Grid>
        )}
      </Grid>

      {(!!invoice.issue || !!invoice.rejection_reason) && (
        <Grid item xs container spacing={2}>
          {!!invoice.issue && (
            <Grid item sx={{ width: 340 }}>
              <InfoBar rounded color="warning">
                <Typography variant="subtitle2">{t("invoiceIssue")}</Typography>

                <Typography variant="caption">{invoice.issue}</Typography>
              </InfoBar>
            </Grid>
          )}

          {!!invoice.rejection_reason && (
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
      )}
    </Grid>
  );
}

InvoiceDetails.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default InvoiceDetails;
