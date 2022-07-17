import { useDispatch, useSelector } from "react-redux";
import { isMenuOpenSelector, toggleMenu } from "../../state";

import { useTheme, Box, Grid } from "@mui/material";
import { mdiMenu, mdiBackburger } from "@mdi/js";

import Link from "../../../../shared/components/Link";
import IconButton from "../../../../shared/components/IconButton";
import LanguagesMenu from "../../../../shared/components/LanguagesMenu";

import UserMenu from "../UserMenu";
import ActionsMenu from "../ActionsMenu";
import NotificationsMenu from "../NotificationsMenu";

import brandLogoEn from "../../../../assets/logos/brand_logo_en.svg";

function Header() {
  const { direction } = useTheme();

  const dispatch = useDispatch();
  const isMenuOpen = useSelector(isMenuOpenSelector);

  return (
    <Grid container spacing={1.5} alignItems="center">
      <Grid item>
        <IconButton
          size="large"
          icon={isMenuOpen ? mdiBackburger : mdiMenu}
          color={isMenuOpen ? "primary" : "default"}
          shape="rounded"
          variant={isMenuOpen ? "contained" : null}
          onClick={() => dispatch(toggleMenu())}
          sx={{
            mr: 2,
            transform: direction === "rtl" ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </Grid>

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
        <NotificationsMenu />
      </Grid>

      <Grid item>
        <UserMenu />
      </Grid>

      <Grid item>
        <LanguagesMenu />
      </Grid>
    </Grid>
  );
}

export default Header;
