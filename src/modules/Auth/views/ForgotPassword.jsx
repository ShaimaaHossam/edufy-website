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

import { Grid, Button, Typography, Paper } from "@mui/material";

import FormContainer from "../components/FormContainer";
import TextInput from "../../../shared/components/inputs/TextInput";
import Link from "../../../shared/components/Link";

function ForgotPassword() {
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);

  const { t } = useTranslation("auth");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      dispatch(forgetPassword(values));
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email formait")
        .required(t("resetEmailError")),
    }),
  });
  useEffect(() => {
    if (isError) {
      dispatch(clearState());
    }
  }, [isError, isSuccess]);

  const LinkTOLogin = () => {
    return (
      <Button
        component={Link}
        to="login?id=reset"
        sx={{
          backgroundColor: "white",
          "&:hover": { backgroundColor: "white" },
          color: "primary.main",
        }}
      >
        {t("backToPhone")}
      </Button>
    );
  };
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
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />
            {isSuccess ? (
              <Typography mt={2} color="success.main">
                {t("forgotMessage")}
              </Typography>
            ) : null}
            <span>
              {formik.touched.email && !!formik.errors.email ? (
                <LinkTOLogin />
              ) : null}
            </span>
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
            to="login"
          >
            {t("backToLogin")}
          </Button>
        </Grid>
      </Grid>
    </FormContainer>
  );
}

export default ForgotPassword;
