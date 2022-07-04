import { useSelector, useDispatch } from "react-redux";
import {
  invoiceToReportSelector,
  setInvoiceToReport,
} from "../state/invoicesSlice";

import { useReportInvoiceMutation } from "../../../redux/services/accounting";

import { useTranslation } from "react-i18next";

import { useFormik } from "formik";
import * as Yup from "yup";

import { Grid, Button } from "@mui/material";

import Dialog from "../../../shared/components/Dialog";
import TextInput from "../../../shared/components/inputs/TextInput";

function InvoiceReportDialog() {
  const { t } = useTranslation("accounting");

  const dispatch = useDispatch();
  const invoiceToReport = useSelector(invoiceToReportSelector);

  const [reportInvoice] = useReportInvoiceMutation();

  const formik = useFormik({
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: true,
    initialValues: {
      issue: "",
    },
    validationSchema: Yup.object().shape({
      issue: Yup.string()
        .required(t("requiredField"))
        .min(10, t("minLetters10"))
        .max(300, t("maxLetters300")),
    }),
    onSubmit: async (values, { setErrors }) => {
      reportInvoice({ id: invoiceToReport?.id, ...values })
        .unwrap()
        .then(() => dispatch(setInvoiceToReport(null)))
        .catch(({ data: { errors } }) => setErrors(errors));
    },
  });

  return (
    <Dialog
      sided
      withoutConfirm
      size="small"
      title={t("reportInvoice") + ` #${invoiceToReport?.invoice_number || ""}`}
      open={!!invoiceToReport}
      onClose={() => dispatch(setInvoiceToReport(null))}
      onExited={formik.resetForm}
    >
      <Grid
        container
        direction="column"
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ minHeight: "100%" }}
      >
        <Grid item mt={1}>
          <TextInput
            required
            type="text"
            name="issue"
            label={t("issueDetails")}
            rows={6}
            value={formik.values.issue}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.issue && !!formik.errors.issue}
            helperText={formik.touched.issue && formik.errors.issue}
          />
        </Grid>

        <Grid item xs={12} mt="auto">
          <Button type="submit" color="error" fullWidth>
            {t("reportInvoice")}
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default InvoiceReportDialog;
