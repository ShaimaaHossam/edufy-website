import { Avatar, Container, AppBar, Grid, Box } from "@mui/material";

import Link from "../../../shared/components/Link";

import brandLogoEn from "../../../assets/logos/brand_logo_en.svg";

function NavBar() {
  return (
    <AppBar
      sx={{
        position: "static",
        backgroundColor: "primary.white",
        padding: 1,
      }}
    >
      <Grid container rowSpacing={12}>
        <Grid item xs={2}>
          <Link to="/">
            <Box
              component="img"
              alt="munjz"
              src={brandLogoEn}
              display="block"
              height={34}
            />
          </Link>
        </Grid>
      </Grid>
    </AppBar>
  );
}
export default NavBar;
