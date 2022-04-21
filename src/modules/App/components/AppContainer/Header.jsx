import { Box, Grid } from "@mui/material";

import Link from "../../../../shared/components/Link";

import UserMenu from "../UserMenu";
import ActionsMenu from "../ActionsMenu";
import NotificationMenu from "../NotificationMenu";

import brandLogoEn from "../../../../assets/logos/brand_logo_en.svg";

function Header() {
  return (
    <Grid container spacing={1.5} alignItems="center">
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

      <Grid item>
        <ActionsMenu />
      </Grid>

      <Grid item>
        <NotificationMenu />
      </Grid>

      <Grid item>
        <UserMenu />
      </Grid>
    </Grid>
  );
}

export default Header;
