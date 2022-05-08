import { Typography, Box } from "@mui/material";

import { useTranslation } from "react-i18next";

import Link from "../../../shared/components/Link";
import NavBar from "./NavBar";

import headerImage from "../assets/pngs/header_image.png";

function AuthContainer({ children }) {
  const { t } = useTranslation("auth");

  return (
    <>
      <NavBar />

      <Box
        sx={{
          backgroundImage: `url(${headerImage})`,
          height: 250,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#000",
            height: 250,
            opacity: 0.5,
            textAlign: "center",
            paddingTop: 18,
          }}
        ></Box>
      </Box>

      {children}

      <Typography sx={{ mb: 1, textAlign: "center" }}>
        {t("createAccount")}
        <Link to="/auth/login">{t("signup")}</Link>
      </Typography>

      <Typography sx={{ textAlign: "center", paddingBottom: 4 }}>
        {t("signupTroubles")}
        <Link to="/auth/login">{t("contactUs")}</Link>
      </Typography>
    </>
  );
}

export default AuthContainer;
