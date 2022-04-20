import { Box, Grid } from "@mui/material";

import Link from "../../../../shared/components/Link";

import brandLogoEn from "../../../../assets/logos/brand_logo_en.svg";

function Header() {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item sx={{ mr: "auto" }}>
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

export default Header;
