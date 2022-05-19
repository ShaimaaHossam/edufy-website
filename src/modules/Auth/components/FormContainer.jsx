import { Typography, Paper, Box } from "@mui/material";

import Link from "../../../shared/components/Link";
import { useTranslation } from "react-i18next";

function FormContainer({ children, title }) {
  const { t } = useTranslation("auth");

  return (
    <Paper
      elevation={1}
      sx={{
        width: "50%",
        mt: -18,
        mx: "auto",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        position: "relative",
        paddingTop: 6,
        mb: 5,
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 1,
          display: "flex",
          alignItems: "center",
          borderBottom: 2,
          borderBottomColor: "border",
        }}
      >
        <Typography color="text.primary" variant="h5">
          {title}
        </Typography>
      </Box>

      <Box mb={3}>{children}</Box>

      {title !== "Reset Password" && (
        <>
          <Typography sx={{ mb: 1, textAlign: "center" }}>
            {t("createAccount")}
            <Link to="/auth/email-login">{t("signup")}</Link>
          </Typography>

          <Typography sx={{ textAlign: "center", paddingBottom: 4 }}>
            {t("signupTroubles")}
            <Link to="/auth/email-login">{t("contactUs")}</Link>
          </Typography>
        </>
      )}
    </Paper>
  );
}

export default FormContainer;
