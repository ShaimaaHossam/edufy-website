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
          <Button
            disableElevation={false}
            sx={{
              backgroundColor: "white",
              "&:hover": { backgroundColor: "white" },
              color: "#242E42",
            }}
            fullWidth
            onClick={() => {
              setPhoneLogin(!phoneLogin);
            }}
          >
            {phoneLogin ? t("loginWithEmail") : t("loginWithPhone")}
          </Button>
        </Grid>
      </Grid>
    </FormContainer>
  );
}

export default Login;
