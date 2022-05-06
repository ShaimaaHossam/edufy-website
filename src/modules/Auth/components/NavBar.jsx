import {
  Avatar,
  Container,
  AppBar,
  Grid,
} from "@mui/material";

import logo from "../../../assets/logos/brand_logo_en.svg";

const NavBar = () => {

  return (
    <AppBar position="static">
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: "#FFFFFF",
          padding:1
        }}
      >
        <Grid container rowSpacing={12}>
          <Grid item xs={2}>
            <Avatar
              src={logo}
              variant="square"
              sx={{
                "& .MuiAvatar-img": { height: "100%" },
                "&.MuiAvatar-root": { height: "100%", width: "50%" },
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};
export default NavBar;
