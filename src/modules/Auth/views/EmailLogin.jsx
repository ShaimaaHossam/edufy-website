import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  loginWithEmail,
  userSelector,
  clearState,
  updateRemember,
} from "../../../redux/userSlice";

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
  const navigate = useNavigate();

  const { isFetching, isSuccess, isError, errors, me, userData } =
    useSelector(userSelector);

  const { t } = useTranslation("auth");
  const emailFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: me,
    },
    onSubmit: (values) => {
      dispatch(loginWithEmail(values));
      dispatch(updateRemember(values.remember));
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email formait")
        .required(t("inputsErrorMessage")),
      password: Yup.string().required(t("inputsErrorMessage")),
    }),
  });

  useEffect(() => {
    if (isError) {
      emailFormik.setErrors(errors);
      dispatch(clearState());
    }

    if (isSuccess) {
      navigate("/");
      dispatch(clearState());
    }
  }, [isError, isSuccess]);

  return (
    <FormContainer title="Login">
      <Grid container spacing={5} margin="auto">
        <Grid
          item
          container
          spacing={3}
          component="form"
          onSubmit={emailFormik.handleSubmit}
        >
          <Grid item xs={11}>
            <TextInput
              type="text"
              name="email"
              label={t("emailLabel")}
              placeholder={t("emailPlaceholder")}
              {...emailFormik.getFieldProps("email")}
              error={emailFormik.touched.email && !!emailFormik.errors.email}
              helperText={emailFormik.touched.email && emailFormik.errors.email}
            />
          </Grid>

          <Grid item xs={11}>
            <PasswordInput
              name="password"
              label={t("passwordLabel")}
              placeholder={t("passwordPlaceholder")}
              {...emailFormik.getFieldProps("password")}
              error={
                emailFormik.touched.password && !!emailFormik.errors.password
              }
              helperText={
                emailFormik.touched.password && emailFormik.errors.password
              }
            />

            <FormControlLabel
              control={<Checkbox />}
              label={t("rememberMe")}
              name="remember"
              {...emailFormik.getFieldProps("remember")}
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
