import { Grid, Box } from "@mui/material";

import Link from "../../../shared/components/Link";

import brandLogoEn from "../../../assets/logos/brand_logo_en.svg";

function NavBar() {
  return (
    <Grid
      container
      rowSpacing={12}
      sx={{
        padding: 1,
      }}
    >
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
  );
}
export default NavBar;
