import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  updatePassword,
  userSelector,
  clearState,
} from "../../../redux/userSlice";

import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { mdiCheck } from "@mdi/js";

import * as Yup from "yup";
import { useFormik } from "formik";

import {
  SvgIcon,
  Grid,
  Button,
  Typography,
  useTheme,
} from "@mui/material";

import TextInput from "../../../shared/components/inputs/TextInput";
import PasswordInput from "../../../shared/components/inputs/PasswordInput";
import FormContainer from "../components/FormContainer";

function ResetPasword() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);
  let navigate = useNavigate();

  const { t } = useTranslation("Auth");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(updatePassword(values));
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email formait").required("Required"),
      password: Yup.string().required("Required"),
    }),
  });

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
    }
  }, [isError, isSuccess]);

  return (
    <FormContainer title="Reset Password">
      <Grid container spacing={3} padding={2} margin="auto">
        {isSuccess ? (
          <Grid
            item
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
                  color: "primary.white",
                  padding: 3,
                }}
                fontSize="small"
              >
                <path d={mdiCheck} />
              </SvgIcon>
            </Grid>

            <Grid item xs={11}>
              <Typography variant="h6" color="success.main">
                Your password was reset successfully
              </Typography>
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
                  label="Email"
                  {...formik.getFieldProps("email")}
                  placeholder={t("loginEmail")}
                  error={formik.touched.email && !!formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>

              <Grid item xs={11}>
                <PasswordInput
                  name="password"
                  label="New Password"
                  placeholder="*******"
                  {...formik.getFieldProps("password")}
                  error={formik.touched.password && !!formik.errors.password}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
            </Grid>

            <Grid item xs={11}>
              <Button type="submit" fullWidth>
                Reset password
              </Button>
            </Grid>
          </Grid>
        )}
        <Grid item xs={10} margin="auto">
          <Button
            fullWidth
            sx={{
              backgroundColor: "primary.white",
              "&:hover": { backgroundColor: "primary.white" },
              color: "primary.main",
            }}
            onClick={() => {
              navigate("/auth/login");
            }}
          >
            Back to login
          </Button>
        </Grid>
      </Grid>
    </FormContainer>
  );
}

export default ResetPasword;
