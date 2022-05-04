import { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { loginWithEmail, loginWithPhone,userSelector, clearState } from "../../../redux/userSlice";

import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useFormik } from "formik";

import {
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Divider,
  Paper,
  useTheme,
} from "@mui/material";

import TextInput from "../../../shared/components/inputs/TextInput";
import NumberInput from "../../../shared/components/inputs/NumberInput";
import PasswordInput from "../../../shared/components/inputs/PasswordInput";
import Link from "../../../shared/components/Link";

function Login() {
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);
  const navigate = useNavigate();

  const [phoneLogin, setPhoneLogin] = useState(false);
  const [otp, setOtp] = useState(false);
  const [seconds, setSeconds] = useState(40);
  const [minutes, setMinutes] = useState(0);
  const otpRef = useRef(false);
  const { t } = useTranslation("auth");
  const theme = useTheme();

  const phoneFormik = useFormik({
    initialValues: {
      phone: "",
      otp: "",
    },
    onSubmit: (values) => {
      console.log("Form Data", values);
      dispatch(loginWithPhone(values));
    },
    validationSchema: Yup.object({
      phone: Yup.string().required("Required"),
      otp: Yup.string().required("Required"),
    }),
  });

  const emailFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    onSubmit: (values) => {
      console.log("Form Data", values);
      dispatch(loginWithEmail(values));
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Required"),
      password: Yup.string().required("Required"),
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
    <Grid container spacing={5} margin="auto">
      {phoneLogin ? (
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
                  A 4 digit verification code was sent to your phone number{" "}
                  <span style={{ color: theme.palette.primary.main }}>
                    {phoneFormik.values.phone}
                  </span>
                </Typography>

                <Typography mb={2}>
                  Verification code expires in{" "}
                  <span
                    style={{ color: theme.palette.primary.main }}
                  >{` 0${minutes}:${
                    seconds.toString().length === 1 ? "0" + seconds : seconds
                  }`}</span>
                </Typography>

                <NumberInput
                  name="otp"
                  label="Verification Code"
                  placeholder={t("verificationCode")}
                  {...phoneFormik.getFieldProps("otp")}
                  error={phoneFormik.touched.otp && !!phoneFormik.errors.otp}
                  helperText={phoneFormik.touched.otp && phoneFormik.errors.otp}
                />

                <Typography mt={2}>
                  Didn't Receive a verification code?
                  <span
                    style={{
                      color: theme.palette.primary.main,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      resendOtp();
                    }}
                  >
                    {" "}
                    Request a new code
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={11}>
                <Button type="submit" fullWidth>
                  <Typography>Login</Typography>
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid item container spacing={3}>
              <Grid item xs={11}>
                <TextInput
                  type="text"
                  name="phone"
                  label="Phone number"
                  {...phoneFormik.getFieldProps("phone")}
                  placeholder={t("loginPhone")}
                  error={
                    phoneFormik.touched.phone && !!phoneFormik.errors.phone
                  }
                  helperText={
                    phoneFormik.touched.phone && phoneFormik.errors.phone
                  }
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
                  <Typography>Continue</Typography>
                </Button>
              </Grid>
            </Grid>
          )}
        </>
      ) : (
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
              error={
                emailFormik.touched.password && !!emailFormik.errors.password
              }
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
              <Typography>Login</Typography>
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
        <Paper>
          <Button
            fullWidth
            sx={{
              backgroundColor: "#FFF",
              "&:hover": { backgroundColor: "#FFF" },
              color: "#242E42",
            }}
            onClick={() => {
              setPhoneLogin(!phoneLogin);
            }}
          >
            {phoneLogin ? (
              <Typography>Login with Email</Typography>
            ) : (
              <Typography>Login with Phone Number</Typography>
            )}
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;
