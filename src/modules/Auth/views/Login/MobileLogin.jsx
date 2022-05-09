import { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  loginWithPhone,
  userSelector,
  clearState,
} from "../../../../redux/userSlice";

import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useFormik } from "formik";

import { Grid, Button, Typography } from "@mui/material";

import TextInput from "../../../../shared/components/inputs/TextInput";
import NumberInput from "../../../../shared/components/inputs/NumberInput";

function MobileLogin() {
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);
  const navigate = useNavigate();

  const [otp, setOtp] = useState(false);
  const [seconds, setSeconds] = useState(40);
  const [minutes, setMinutes] = useState(0);
  const otpRef = useRef(false);
  const { t } = useTranslation("auth");

  const phoneFormik = useFormik({
    initialValues: {
      phone: "",
      otp: "",
    },
    onSubmit: (values) => {
      dispatch(loginWithPhone(values));
    },
    validationSchema: Yup.object({
      phone: Yup.string().required(t("phoneError")),
      otp: Yup.string().required(t("otpError")),
    }),
  });

  const resendOtp = () => {
    if (seconds === 0) {
      setSeconds(40);
    }
  };

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
    }

    if (isSuccess) {
      dispatch(clearState());
      navigate("/dashboard");
    }
  }, [isError, isSuccess]);

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
    <>
      {otp ? (
        <Grid
          component="form"
          onSubmit={phoneFormik.handleSubmit}
          item
          container
          spacing={3}
        >
          <Grid item xs={11}>
            <Typography mb={2}>
              {t("verificationMessage")}
              <span style={{ color: "#1E7AF0" }}>
                {phoneFormik.values.phone}
              </span>
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
              {...phoneFormik.getFieldProps("otp")}
              error={phoneFormik.touched.otp && !!phoneFormik.errors.otp}
              helperText={phoneFormik.touched.otp && phoneFormik.errors.otp}
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
              {...phoneFormik.getFieldProps("phone")}
              error={phoneFormik.touched.phone && !!phoneFormik.errors.phone}
              helperText={phoneFormik.touched.phone && phoneFormik.errors.phone}
            />
          </Grid>

          <Grid item xs={11}>
            <Button
              type="submit"
              onClick={() => {
                if (phoneFormik.values.phone.length === 11) {
                  setOtp(true);
                }
              }}
              fullWidth
            >
              {t("continue")}
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default MobileLogin;
