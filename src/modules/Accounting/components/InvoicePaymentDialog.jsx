import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { invoiceToPaySelector, setInvoiceToPay } from "../state/invoicesSlice";

import {
  useGetWalletOverviewQuery,
  usePayInvoiceMutation,
} from "../../../redux/services/accounting";

import { useTranslation } from "react-i18next";

import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Box,
  Grid,
  Divider,
  Typography,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { mdiCheck } from "@mdi/js";

import Dialog from "../../../shared/components/Dialog";
import InfoBar from "../../../shared/components/InfoBar";
import Link from "../../../shared/components/Link";
import Icon from "../../../shared/components/Icon";
import Radio from "../../../shared/components/inputs/Radio";
import NumberInput from "../../../shared/components/inputs/NumberInput";
import FileInputSync from "../../../shared/components/inputs/FileInputSync";

import { INVOICE_PAY_TYPES } from "../../../constants/system";

function InvoicePaymentDialog() {
  const { t } = useTranslation("accounting");

  const dispatch = useDispatch();
  const invoiceToPay = useSelector(invoiceToPaySelector);

  const { data: walletOverview } = useGetWalletOverviewQuery(undefined, {
    skip: !invoiceToPay,
  });
  const [payInvoice] = usePayInvoiceMutation();

  const [isFulfilled, setIsFulfilled] = useState(false);
  const formik = useFormik({
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: true,
    initialValues: {
      payment_type: INVOICE_PAY_TYPES.wallet,
      amount: null,
      document: "",
    },
    validationSchema: Yup.object().shape({
      payment_type: Yup.string().oneOf(Object.values(INVOICE_PAY_TYPES)),
      amount: Yup.number()
        .nullable()
        .test("conditionally required", t("requiredField"), function (amount) {
          const paymentType = this.parent.payment_type;
          return paymentType === INVOICE_PAY_TYPES.wallet ? true : !!amount;
        })
        .min(0, t("requiredField")),
      document: Yup.string().test(
        "conditionally required",
        t("requiredField"),
        function (document) {
          const paymentType = this.parent.payment_type;
          return paymentType === INVOICE_PAY_TYPES.wallet ? true : !!document;
        }
      ),
    }),
    onSubmit: async ({ payment_type, amount, document }, { setErrors }) => {
      const data = { id: invoiceToPay.id, payment_type };

      payment_type === INVOICE_PAY_TYPES.transfer &&
        Object.assign(data, { amount, document });

      payInvoice(data)
        .unwrap()
        .then(() => setIsFulfilled(true))
        .catch(({ data: { errors } }) => setErrors(errors));
    },
  });

  const walletBalance = walletOverview?.current_balance || 0;
  const invoiceAmount = invoiceToPay?.required_amount || 0;
  const amountAfter = walletBalance - invoiceAmount;

  return (
    <Dialog
      sided
      withoutConfirm
      size="small"
      title={t("payInvoice") + ` #${invoiceToPay?.invoice_number || ""}`}
      open={!!invoiceToPay}
      onClose={() => dispatch(setInvoiceToPay(null))}
      onExited={() => {
        formik.resetForm();
        isFulfilled && setIsFulfilled(false);
      }}
    >
      {isFulfilled && (
        <Grid
          container
          spacing={3}
          direction="column"
          sx={{ minHeight: "calc(100% + 24px)" }}
        >
          <Grid item my="auto" textAlign="center">
            <Box
              sx={{
                mb: 2,
                width: 150,
                height: 150,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "success.main",
                borderRadius: "50%",
              }}
            >
              <Icon
                icon={mdiCheck}
                sx={{ color: "white", width: 100, height: 100 }}
              />
            </Box>

            <Typography component="p" variant="h6" color="success.main">
              {t("successInvoicePaymentMessage")}
            </Typography>
          </Grid>

          <Grid item xx={12}>
            <Button fullWidth onClick={() => dispatch(setInvoiceToPay(null))}>
              {t("backToInvoices")}
            </Button>
          </Grid>
        </Grid>
      )}

      {!isFulfilled && (
        <Grid
          container
          spacing={3}
          direction="column"
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ minHeight: "calc(100% + 24px)" }}
        >
          <Grid item>
            <Typography variant="body2" color="text.secondary" mb={1}>
              {t("invoicePaymentHint")}
            </Typography>
          </Grid>

          <Grid item>
            <FormControl required>
              <FormLabel id="payment-label">{t("paymentType")}</FormLabel>
              <RadioGroup
                aria-labelledby="payment-label"
                row
                name="payment_type"
                value={formik.values.payment_type}
                onChange={(_, val) => formik.setFieldValue("payment_type", val)}
              >
                {Object.values(INVOICE_PAY_TYPES).map((type) => (
                  <FormControlLabel
                    key={type}
                    label={t(type)}
                    value={type}
                    control={<Radio />}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          {formik.values.payment_type === INVOICE_PAY_TYPES.wallet && (
            <>
              <Grid
                item
                container
                columnSpacing={3}
                rowSpacing={0.5}
                justifyContent="center"
              >
                <Grid item xs={6}>
                  <Typography component="span" color="text.secondary">
                    {t("walletBalance")}
                  </Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <Typography component="span" variant="subtitle1">
                    {walletBalance} {t("sr")}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography component="span" color="text.secondary">
                    {t("invoiceAmount")}
                  </Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <Typography component="span" variant="subtitle1">
                    {invoiceAmount} {t("sr")}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider variant="fullWidth" />
                </Grid>

                <Grid item xs={6}>
                  <Typography component="span" color="text.secondary">
                    {t("balanceAfterPayment")}
                  </Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <Typography component="span" variant="subtitle1">
                    {amountAfter < 0 ? 0 : amountAfter} {t("sr")}
                  </Typography>
                </Grid>

                {amountAfter < 0 && (
                  <Grid item xs={12} mt={4}>
                    <Typography variant="body2" color="error">
                      {t("notEnoughWalletBalance")}
                    </Typography>

                    <Link to="/accounting/wallet" underline="always">
                      {t("rechargeWallet")}
                    </Link>
                  </Grid>
                )}
              </Grid>
            </>
          )}

          {formik.values.payment_type === INVOICE_PAY_TYPES.transfer && (
            <>
              <Grid item>
                <FileInputSync
                  required
                  name="document"
                  label={t("transferReceipt")}
                  accept="application/pdf, image/png, image/jpeg"
                  onChange={(fileURL) => {
                    !formik.touched.document &&
                      formik.setFieldTouched("document", true);
                    formik.setFieldValue("document", fileURL);
                  }}
                  error={formik.touched.document && !!formik.errors.document}
                  helperText={formik.touched.document && formik.errors.document}
                />
              </Grid>

              <Grid item>
                <NumberInput
                  required
                  name="amount"
                  label={t("transferAmount")}
                  unit={t("sr")}
                  isDecimal
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.amount && !!formik.errors.amount}
                  helperText={formik.touched.amount && formik.errors.amount}
                />
              </Grid>

              <Grid item>
                <InfoBar rounded color="warning">
                  <Typography variant="body2">{t("amountWarning")}</Typography>
                </InfoBar>
              </Grid>
            </>
          )}

          <Grid item xx={12} mt="auto">
            <Button
              type="submit"
              fullWidth
              disabled={
                formik.values.payment_type === INVOICE_PAY_TYPES.wallet &&
                amountAfter < 0
              }
            >
              {t("payInvoice")}
            </Button>
          </Grid>
        </Grid>
      )}
    </Dialog>
  );
}

export default InvoicePaymentDialog;
