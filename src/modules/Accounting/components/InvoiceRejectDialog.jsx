import { useSelector, useDispatch } from "react-redux";
import {
  invoiceToRejectSelector,
  setInvoiceToReject,
} from "../state/invoicesSlice";

import { useRejectInvoiceMutation } from "../../../redux/services/accounting";

import { useTranslation } from "react-i18next";

import { useFormik } from "formik";
import * as Yup from "yup";

import { Grid, Button } from "@mui/material";

import Dialog from "../../../shared/components/Dialog";
import TextInput from "../../../shared/components/inputs/TextInput";

function InvoiceRejectDialog() {
  const { t } = useTranslation("accounting");

  const dispatch = useDispatch();
  const invoiceToReject = useSelector(invoiceToRejectSelector);

  const [rejectInvoice] = useRejectInvoiceMutation();

  const formik = useFormik({
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: true,
    initialValues: {
      rejection_reason: "",
    },
    validationSchema: Yup.object().shape({
      rejection_reason: Yup.string()
        .required(t("requiredField"))
        .min(10, t("minLetters10"))
        .max(300, t("maxLetters300")),
    }),
    onSubmit: async (values, { setErrors }) => {
      rejectInvoice({ id: invoiceToReject?.id, ...values })
        .unwrap()
        .then(() => dispatch(setInvoiceToReject(null)))
        .catch(({ data: { errors } }) => setErrors(errors));
    },
  });

  return (
    <Dialog
      sided
      withoutConfirm
      size="small"
      title={t("rejectInvoice") + ` #${invoiceToReject?.invoice_number || ""}`}
      open={!!invoiceToReject}
      onClose={() => dispatch(setInvoiceToReject(null))}
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
            name="rejection_reason"
            label={t("rejectionReason")}
            rows={6}
            value={formik.values.rejection_reason}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.rejection_reason &&
              !!formik.errors.rejection_reason
            }
            helperText={
              formik.touched.rejection_reason && formik.errors.rejection_reason
            }
          />
        </Grid>

        <Grid item xs={12} mt="auto">
          <Button type="submit" color="error" fullWidth>
            {t("rejectInvoice")}
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default InvoiceRejectDialog;
