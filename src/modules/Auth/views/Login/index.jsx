import { useState } from "react";

import { Grid, Button, Typography, Divider, Paper } from "@mui/material";

import FormContainer from "../../components/FormContainer";

import { useTranslation } from "react-i18next";

import EmailLogin from "./EmailLogin";
import MobileLogin from "./MobileLogin";

function Login() {
  const [phoneLogin, setPhoneLogin] = useState(false);
  const { t } = useTranslation("auth");

  return (
    <FormContainer title="login">
      <Grid container spacing={5} margin="auto">
        {phoneLogin ? <MobileLogin /> : <EmailLogin />}

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
                backgroundColor: "primary.white",
                "&:hover": { backgroundColor: "primary.white" },
                color: "#242E42",
              }}
              onClick={() => {
                setPhoneLogin(!phoneLogin);
              }}
            >
              {phoneLogin ? t("loginWithEmail") : t("loginWithPhone")}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </FormContainer>
  );
}

export default Login;
