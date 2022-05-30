import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  loginWithEmail,
  authSelector,
  clearAuth,
} from "../../../redux/slices/auth";

import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useFormik } from "formik";

import {
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  Typography,
} from "@mui/material";

import FormContainer from "../components/FormContainer";
import TextInput from "../../../shared/components/inputs/TextInput";
import PasswordInput from "../../../shared/components/inputs/PasswordInput";
import Link from "../../../shared/components/Link";

function EmailLogin() {
  const dispatch = useDispatch();
  const { isSuccess, isError, errors } = useSelector(authSelector);

  const { t } = useTranslation("auth");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: "",
    },
    onSubmit: (values) => {
      dispatch(loginWithEmail(values));
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email formait")
        .required(t("inputsErrorMessage")),
      password: Yup.string().required(t("inputsErrorMessage")),
    }),
  });

  const { setErrors } = formik;
  useEffect(() => {
    if (isError) {
      setErrors(errors);
      dispatch(clearAuth());
    }

    if (isSuccess) {
      dispatch(clearAuth());
    }
  }, [dispatch, setErrors, isError, errors, isSuccess]);

  return (
    <FormContainer title="Login">
      <Grid container spacing={5} margin="auto">
        <Grid
          item
          container
          spacing={3}
          component="form"
          onSubmit={formik.handleSubmit}
        >
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
          </Grid>

          <Grid item xs={11}>
            <PasswordInput
              name="password"
              label={t("passwordLabel")}
              placeholder={t("passwordPlaceholder")}
              {...formik.getFieldProps("password")}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />

            <FormControlLabel
              control={<Checkbox />}
              label={t("rememberMe")}
              name="remember"
              {...formik.getFieldProps("remember")}
            />

            <Link
              to="/auth/forget-password"
              sx={{ display: "block", textAlign: "right" }}
            >
              {t("forgotPassword")}
            </Link>
          </Grid>

          <Grid item xs={11}>
            <Button type="submit" fullWidth>
              {t("login")}
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={11}>
          <Divider>
            <Typography>or</Typography>
          </Divider>
        </Grid>

        <Grid item xs={11} paddingBottom={3}>
          <Button
            disableElevation={false}
            sx={{
              backgroundColor: "white",
              "&:hover": { backgroundColor: "white" },
              color: "#242E42",
            }}
            fullWidth
            component={Link}
            to="/auth/mobile-login"
          >
            {t("loginWithPhone")}
          </Button>
        </Grid>
      </Grid>
    </FormContainer>
  );
}

export default EmailLogin;
