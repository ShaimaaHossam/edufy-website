import { useState, useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  loginWithPhone,
  requestOtp,
  authSelector,
  clearAuth,
} from "../../../redux/slices/auth";

import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useFormik } from "formik";

import { Grid, Button, Typography, Divider } from "@mui/material";

import TextInput from "../../../shared/components/inputs/TextInput";
import NumberInput from "../../../shared/components/inputs/NumberInput";
import Link from "../../../shared/components/Link";
import FormContainer from "../components/FormContainer";

function MobileLogin() {
  const dispatch = useDispatch();
  const { isSuccess, isError, errors } = useSelector(authSelector);

  const otpRef = useRef(false);
  const [otp, setOtp] = useState(false);

  const [seconds, setSeconds] = useState(40);
  const [minutes, setMinutes] = useState(0);

  const { t } = useTranslation("auth");
  const formik = useFormik({
    initialValues: {
      phone: "",
      otp: "",
    },
    onSubmit: (values) => {
      dispatch(loginWithPhone({ token: otp, phone: `+966${values.phone}` }));
    },
    validationSchema: Yup.object({
      phone: Yup.string().required(t("inputsErrorMessage")),
      otp: Yup.string().required(t("inputsErrorMessage")).min(4, t("otpError")),
    }),
  });

  const { setErrors } = formik;
  useEffect(() => {
    if (isError) {
      setErrors(errors);
      dispatch(clearAuth());
    }
    if (isSuccess) {
      setOtp(true);
    }
  }, [dispatch, setErrors, isError, errors, isSuccess]);

  const resendOtp = () => {
    if (seconds === 0) {
      setSeconds(40);
      dispatch(requestOtp(`+966${formik.values.phone}`));
    }
  };

  const handleContinue = () => {
    if (formik.values.phone.length === 10) {
      let phone = `+966${formik.values.phone}`;
      dispatch(requestOtp(phone));
    } else {
      formik.setErrors({
        phone: t("phoneError"),
      });
    }
  };

  useEffect(() => {
    if (otpRef.current) {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
          } else {
            setSeconds(39);
            setMinutes(0);
          }
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    } else {
      otpRef.current = true;
    }
  }, [otp, otpRef, minutes, seconds]);

  return (
    <FormContainer title="login">
      <Grid container spacing={5} margin="auto">
        {otp ? (
          <Grid
            component="form"
            onSubmit={formik.handleSubmit}
            item
            container
            spacing={3}
          >
            <Grid item xs={11}>
              <Typography mb={2}>
                {t("verificationMessage")}
                <span style={{ color: "#1E7AF0" }}>{formik.values.phone}</span>
              </Typography>

              <Typography mb={2}>
                {t("verificationTime")}
                <span style={{ color: "#1E7AF0" }}>{` 0${minutes}:${
                  seconds.toString().length === 1 ? "0" + seconds : seconds
                }`}</span>
              </Typography>

              <NumberInput
                name="otp"
                label={t("verificationLabel")}
                placeholder={t("verificationCode")}
                {...formik.getFieldProps("otp")}
                error={formik.touched.otp && !!formik.errors.otp}
                helperText={formik.touched.otp && formik.errors.otp}
              />

              <Typography mt={2}>
                {t("verificationInsure")}
                <span
                  style={{
                    color: "#1E7AF0",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    resendOtp();
                  }}
                >
                  {t("verificationRequest")}
                </span>
              </Typography>
            </Grid>

            <Grid item xs={11}>
              <Button type="submit" fullWidth>
                {t("login")}
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid item container spacing={3}>
            <Grid item xs={11}>
              <TextInput
                type="text"
                name="phone"
                placeholder={t("phonePlaceholder")}
                label={t("phonePlaceholder")}
                {...formik.getFieldProps("phone")}
                error={formik.touched.phone && !!formik.errors.phone}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>

            <Grid item xs={11}>
              <Button
                type="submit"
                onClick={() => {
                  handleContinue();
                }}
                fullWidth
              >
                {t("continue")}
              </Button>
            </Grid>
          </Grid>
        )}

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
            to="/auth/email-login"
          >
            {t("loginWithEmail")}
          </Button>
        </Grid>
      </Grid>
    </FormContainer>
  );
}

export default MobileLogin;
