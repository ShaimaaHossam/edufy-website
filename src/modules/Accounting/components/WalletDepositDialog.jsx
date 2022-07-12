import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  isDepositDialogOpenSelector,
  toggleDepositDialog,
} from "../state/walletSlice";

import { useAddWalletDepositMutation } from "../../../redux/services/accounting";

import { useTranslation } from "react-i18next";

import { useFormik } from "formik";
import * as Yup from "yup";

import { Box, Grid, Typography, Button } from "@mui/material";
import { mdiCheck } from "@mdi/js";

import Dialog from "../../../shared/components/Dialog";
import InfoBar from "../../../shared/components/InfoBar";
import Icon from "../../../shared/components/Icon";
import NumberInput from "../../../shared/components/inputs/NumberInput";
import FileInputSync from "../../../shared/components/inputs/FileInputSync";

function WalletDepositDialog() {
  const { t } = useTranslation("accounting");

  const dispatch = useDispatch();
  const isDepositDialogOpen = useSelector(isDepositDialogOpenSelector);

  const [addWalletDeposit] = useAddWalletDepositMutation();

  const [isFulfilled, setIsFulfilled] = useState(false);
  const formik = useFormik({
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: true,
    initialValues: {
      amount: null,
      document: "",
    },
    validationSchema: Yup.object().shape({
      amount: Yup.number()
        .nullable()
        .required(t("requiredField"))
        .min(0, t("requiredField")),
      document: Yup.string().required(t("requiredField")),
    }),
    onSubmit: async (values, { setErrors }) => {
      addWalletDeposit(values)
        .unwrap()
        .then(() => setIsFulfilled(true))
        .catch(({ data: { errors } }) => setErrors(errors));
    },
  });

  return (
    <Dialog
      sided
      withoutConfirm
      size="small"
      title={t("rechargeWallet")}
      open={isDepositDialogOpen}
      onClose={() => dispatch(toggleDepositDialog())}
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
              {t("successWalletRequestMessage")}
            </Typography>
          </Grid>

          <Grid item xx={12}>
            <Button fullWidth onClick={() => dispatch(toggleDepositDialog())}>
              {t("backToWallet")}
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
            <Typography variant="body2" color="text.secondary" mb={2}>
              {t("rechargeHint")}
            </Typography>
          </Grid>

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

          <Grid item xx={12} mt="auto">
            <Button type="submit" fullWidth>
              {t("requestWalletRecharge")}
            </Button>
          </Grid>
        </Grid>
      )}
    </Dialog>
  );
}

export default WalletDepositDialog;
