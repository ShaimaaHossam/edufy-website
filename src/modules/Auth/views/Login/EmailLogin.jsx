import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  loginWithEmail,
  userSelector,
  clearState,
} from "../../../../redux/userSlice";

import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useFormik } from "formik";

import { Grid, Button, Checkbox, FormControlLabel } from "@mui/material";

import TextInput from "../../../../shared/components/inputs/TextInput";
import PasswordInput from "../../../../shared/components/inputs/PasswordInput";
import Link from "../../../../shared/components/Link";

function EmailLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);
  const { t } = useTranslation("auth");

  const emailFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    onSubmit: (values) => {
      dispatch(loginWithEmail(values));
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Required"),
      password: Yup.string().required("Required"),
    }),
  });

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
    }

    if (isSuccess) {
      dispatch(clearState());
      navigate("/dashboard");
    }
  }, [isError, isSuccess]);
  
  return (
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
          label="Email"
          {...emailFormik.getFieldProps("email")}
          placeholder={t("loginEmail")}
          error={emailFormik.touched.email && !!emailFormik.errors.email}
          helperText={emailFormik.touched.email && emailFormik.errors.email}
        />
      </Grid>

      <Grid item xs={11}>
        <PasswordInput
          name="password"
          label="Password"
          placeholder={t("loginPassword")}
          {...emailFormik.getFieldProps("password")}
          error={emailFormik.touched.password && !!emailFormik.errors.password}
          helperText={
            emailFormik.touched.password && emailFormik.errors.password
          }
        />

        <FormControlLabel
          control={<Checkbox />}
          label="Remember me"
          name="remember"
          {...emailFormik.getFieldProps("remember")}
        />

        <Link
          to="/auth/forget-password"
          sx={{ display: "block", textAlign: "right" }}
        >
          Forgot password
        </Link>
      </Grid>

      <Grid item xs={11}>
        <Button type="submit" fullWidth>
          Login
        </Button>
      </Grid>
    </Grid>
  );
}

export default EmailLogin;
