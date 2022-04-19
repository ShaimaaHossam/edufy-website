import { AppBar, Toolbar, Divider as MuiDivider, styled } from "@mui/material";

import Navigation from "./Navigation";

const Divider = styled(MuiDivider)(({ theme }) => ({
  border: "none",
  height: 1,
  backgroundImage: theme.palette.gradients.primary,
}));

function Header() {
  return (
    <AppBar position="fixed" elevation={0} sx={{ backgroundColor: "white" }}>
      <Toolbar></Toolbar>

      <Divider />

      <Navigation />
    </AppBar>
  );
}

export default Header;
