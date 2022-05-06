import { Typography, Box } from "@mui/material";

import Link from "../../../shared/components/Link";
import NavBar from "./NavBar";

import headerImage from "../assets/pngs/header_image.png";

function AuthContainer({ children }) {

  return (
    <Box>
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
            backgroundPosition: "center",
            backgroundSize: "cover",
            opacity: 0.5,
            textAlign: "center",
            paddingTop: 18,
          }}
        ></Box>
      </Box>

      {children}

      <Typography sx={{ mb: 1, textAlign: "center" }}>
        Don't have an account?
        <Link to="/auth/login"> Signup</Link>
      </Typography>

      <Typography sx={{ mb: 1, textAlign: "center" }}>
        Have troubles logging in?
        <Link to="/auth/login"> Contact Munjz</Link>
      </Typography>
      
    </Box>
  );
}

export default AuthContainer;
