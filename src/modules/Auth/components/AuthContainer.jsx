import { Box } from "@mui/material";

import NavBar from "./NavBar";

import headerImage from "../assets/pngs/header_image.png";

function AuthContainer({ children }) {
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
    </>
  );
}

export default AuthContainer;
