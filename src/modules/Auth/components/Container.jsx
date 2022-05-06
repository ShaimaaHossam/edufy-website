import { useLocation } from "react-router-dom";

import { Typography, Paper, Grid, styled, Box } from "@mui/material";

import Link from "../../../shared/components/Link";
import NavBar from "./NavBar";

import headerImage from "../assets/pngs/header_image.png";

const HeroSectionColor = styled("div")(({ theme }) => {
  return {
    backgroundColor: "#000",
    height: 250,
    backgroundPosition: "center",
    backgroundSize: "cover",
    opacity: 0.5,
    textAlign: "center",
    paddingTop: 18,
  };
});

const Container = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <Grid height="calc(100vh - 64px)">
      <NavBar />
      <Box
        sx={{
          backgroundImage: `url(${headerImage})`,
          height: 250,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <HeroSectionColor />
      </Box>

      <Paper
        elevation={1}
        sx={{
          width: "50%",
          mt: -18,
          mx: "auto",
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          position: "relative",
        }}
      >
        <Box height={50} />
        <Box
          sx={{
            height: 56,
            px: 3,
            py: 1,
            display: "flex",
            alignItems: "center",
            borderBottom: 2,
            borderBottomColor: "#111B3321",
          }}
        >
          <Typography color="text.primary" variant="h5">
            {pathname === "/auth/forget-password" ||
            pathname === "/auth/reset-password"
              ? "Forgot password"
              : "Login "}
          </Typography>
        </Box>
        <Grid mb={3}>{children}</Grid>
      </Paper>
      <Typography sx={{ mb: 1, textAlign: "center" }}>
        Don't have an account?
        <Link to="/auth/login"> Signup</Link>
      </Typography>
      <Typography sx={{ mb: 1, textAlign: "center" }}>
        Have troubles logging in?
        <Link to="/auth/login"> Contact Munjz</Link>
      </Typography>
    </Grid>
  );
};

export default Container;
