import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { forgetPassword,userSelector, clearState } from "../../../redux/userSlice";


import { useTranslation } from "react-i18next";

import * as Yup from "yup";
import { useFormik } from "formik";

import { Grid, Button, Typography, Paper } from "@mui/material";

import FormContainer from "../components/FormContainer";
import TextInput from "../../../shared/components/inputs/TextInput";

function ForgotPassword() {
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);
  const navigate = useNavigate();
  

  const { t } = useTranslation("auth");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      dispatch(forgetPassword(values));
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email formait").required("Required"),
    }),
  });
  useEffect(() => {
    if (isError) {
      dispatch(clearState());
    }

  }, [isError, isSuccess]);
  return (
   <FormContainer title="Forgot Password"> 
    <Grid container spacing={3} padding={2} margin="auto">
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
              label="Email"
              {...formik.getFieldProps("email")}
              placeholder={t("loginEmail")}
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />
            {isSuccess ? (
              <Typography mt={2} color="success.main">
                An Email was sent to your email address please check the email
                to reset your password.
              </Typography>
            ) : null}
          </Grid>
        </Grid>

        <Grid item xs={11} paddingBottom={3}>
          <Button fullWidth type="submit">
            <Typography>Reset password</Typography>
          </Button>
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
                navigate("/auth/login");
              }}
            >
              <Typography color="primary.main">Back to login</Typography>
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
    </FormContainer>
  );
}

export default ForgotPassword;
