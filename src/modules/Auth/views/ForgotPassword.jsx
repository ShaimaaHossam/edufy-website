import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  forgetPassword,
  userSelector,
  clearState,
} from "../../../redux/userSlice";

import { useTranslation } from "react-i18next";

import * as Yup from "yup";
import { useFormik } from "formik";

import { Grid, Button, Typography, Box } from "@mui/material";

import FormContainer from "../components/FormContainer";
import TextInput from "../../../shared/components/inputs/TextInput";
import Link from "../../../shared/components/Link";

function ForgotPassword() {
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, errors } = useSelector(userSelector);

  const { t } = useTranslation("auth");

  const formik = useFormik({
    initialValues: {
      email: "",
      token: "",
    },
    onSubmit: (values) => {
      dispatch(forgetPassword(values));
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email formait")
        .required(t("inputsErrorMessage")),
    }),
  });
  useEffect(() => {
    if (isError) {
      formik.setErrors(errors);
      dispatch(clearState());
    }
  }, [isError, isSuccess]);
  console.log("isSuccess", isSuccess);

  return (
    <FormContainer title="Forgot Password">
      <Grid
        component="form"
        onSubmit={formik.handleSubmit}
        container
        spacing={3}
        margin="auto"
      >
        <Grid item container spacing={3}>
          <Grid item xs={11}>
            <TextInput
              type="text"
              name="email"
              label={t("emailLabel")}
              {...formik.getFieldProps("email")}
              placeholder={t("emailPlaceholder")}
              error={
                formik.touched.email &&
                !!(formik.errors.email || formik.errors.token)
              }
              helperText={
                formik.touched.email &&
                (formik.errors.email || formik.errors.token)
              }
            />
            {isSuccess ? (
              <Typography mt={2} color="success.main">
                {t("forgotMessage")}
              </Typography>
            ) : null}
            <Box
              sx={{
                position: "relative",
              }}
            >
              {isError ? (
                <Link
                  to="/auth/mobile-login"
                  sx={{
                    color: "primary.main",
                    position: "absolute",
                    transform: "translate(307px, -23px)",
                  }}
                >
                  {t("backToPhone")}
                </Link>
              ) : null}
            </Box>
          </Grid>
        </Grid>

        <Grid item xs={11}>
          <Button fullWidth type="submit">
            {t("resetPassword")}
          </Button>
        </Grid>

        <Grid
          item
          xs={11}
          sx={{
            paddingBottom: 4,
          }}
        >
          <Button
            fullWidth
            sx={{
              backgroundColor: "white",
              "&:hover": { backgroundColor: "white" },
              color: "primary.main",
            }}
            component={Link}
            to="email-login"
          >
            {t("backToLogin")}
          </Button>
        </Grid>
      </Grid>
    </FormContainer>
  );
}

export default ForgotPassword;
