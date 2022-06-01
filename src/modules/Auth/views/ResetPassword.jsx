import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  updatePassword,
  authSelector,
  clearAuth,
} from "../../../redux/slices/auth";

import { useTranslation } from "react-i18next";

import { mdiCheck } from "@mdi/js";

import * as Yup from "yup";
import { useFormik } from "formik";

import { SvgIcon, Grid, Button, Typography, Box } from "@mui/material";

import TextInput from "../../../shared/components/inputs/TextInput";
import PasswordInput from "../../../shared/components/inputs/PasswordInput";
import Link from "../../../shared/components/Link";
import FormContainer from "../components/FormContainer";

function ResetPasword() {
  const dispatch = useDispatch();
  const { isSuccess, isError, errors } = useSelector(authSelector);

  const { t } = useTranslation("auth");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      password_confirmation: "",
      token: "",
    },
    onSubmit: (values) => {
      dispatch(updatePassword(values));
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email formait")
        .required(`${t("inputsErrorMessage")} `),
      password: Yup.string()
        .required(t("inputsErrorMessage"))
        .min(8, t("resetPasswordError")),
      password_confirmation: Yup.string().required(t("inputsErrorMessage")),
      token: Yup.string()
        .required(t("inputsErrorMessage"))
        .min(4, t("otpError")),
    }),
  });

  const { setErrors } = formik;
  useEffect(() => {
    if (isError) {
      setErrors(errors);
      dispatch(clearAuth());
    }
  }, [dispatch, setErrors, isError, errors]);

  return (
    <FormContainer title="Reset Password">
      {isSuccess ? (
        <Grid
          container
          spacing={3}
          textAlign="center"
          padding={4}
          justifyContent="center"
        >
          <Grid item xs={11}>
            <SvgIcon
              sx={{
                backgroundColor: "success.main",
                width: 129,
                height: 129,
                borderRadius: "100%",
                color: "white",
                padding: 3,
              }}
              fontSize="small"
            >
              <path d={mdiCheck} />
            </SvgIcon>
          </Grid>

          <Grid item xs={11}>
            <Typography variant="h6" color="success.main">
              {t("successResetMessage")}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              paddingBottom: 4,
            }}
          >
            <Button
              fullWidth
              component={Link}
              to="login"
              sx={{
                backgroundColor: "white",
                "&:hover": { backgroundColor: "white" },
                color: "primary.main",
              }}
            >
              {t("backToLogin")}
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid
          component="form"
          onSubmit={formik.handleSubmit}
          container
          spacing={5}
          margin="auto"
        >
          <Grid item container spacing={3}>
            <Grid item xs={11}>
              <TextInput
                type="text"
                name="email"
                label={t("emailLabel")}
                placeholder={t("emailPlaceholder")}
                {...formik.getFieldProps("email")}
                error={formik.touched.email && !!formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
              />
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

            <Grid item xs={11}>
              <PasswordInput
                name="password"
                label={t("newPassword")}
                placeholder={t("passwordPlaceholder")}
                {...formik.getFieldProps("password")}
                error={formik.touched.password && !!formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={11}>
              <PasswordInput
                name="passwordConfirmation"
                label={t("passwordConfirmation")}
                placeholder={t("passwordConfirmation")}
                {...formik.getFieldProps("password_confirmation")}
                error={
                  formik.touched.password_confirmation &&
                  !!formik.errors.password_confirmation
                }
                helperText={
                  formik.touched.password_confirmation &&
                  formik.errors.password_confirmation
                }
              />
            </Grid>
            <Grid item xs={11}>
              <TextInput
                type="text"
                name="token"
                label={t("verificationLabel")}
                placeholder={t("verificationLabel")}
                {...formik.getFieldProps("token")}
                error={formik.touched.token && !!formik.errors.token}
                helperText={formik.touched.token && formik.errors.token}
              />
            </Grid>
          </Grid>

          <Grid item xs={11}>
            <Button type="submit" fullWidth>
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
              component={Link}
              to="email-login"
              sx={{
                backgroundColor: "white",
                "&:hover": { backgroundColor: "white" },
                color: "primary.main",
              }}
            >
              {t("backToLogin")}
            </Button>
          </Grid>
        </Grid>
      )}
    </FormContainer>
  );
}

export default ResetPasword;
