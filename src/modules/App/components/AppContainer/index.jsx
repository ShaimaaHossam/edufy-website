import { useState } from "react";

import {
  Box,
  AppBar,
  Toolbar,
  Drawer as MuiDrawer,
  styled,
} from "@mui/material";

import Header from "./Header";
import Navigation from "./Navigation";

const OPENED_DRAWER_WIDTH = 260;
const CLOSED_DRAWER_WIDTH = 150;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: OPENED_DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  zIndex: theme.zIndex.appBar - 1,
  overflowX: "hidden",
  ...(open && {
    width: OPENED_DRAWER_WIDTH,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    "& .MuiDrawer-paper": {
      width: OPENED_DRAWER_WIDTH,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      border: "none",
      marginTop: theme.spacing(3),
    },
  }),
  ...(!open && {
    width: CLOSED_DRAWER_WIDTH,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    "& .MuiDrawer-paper": {
      width: CLOSED_DRAWER_WIDTH,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      border: "none",
      marginTop: theme.spacing(3),
      [theme.breakpoints.up("sm")]: {},
    },
  }),
}));

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  position: "relative",
  flexGrow: 1,
  margin: theme.spacing(3, 0, 3, 0),
  ...(open && {
    marginLeft: OPENED_DRAWER_WIDTH,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    marginLeft: CLOSED_DRAWER_WIDTH,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),
}));

function AppContainer({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <AppBar
        position="fixed"
        sx={{ color: "primary.main", backgroundColor: "white" }}
      >
        <Toolbar>
          <Header />
        </Toolbar>
      </AppBar>
      {/* Header's Toolbar height offset */}
      <Toolbar />

      <Drawer
        variant="permanent"
        open={isDrawerOpen}
        PaperProps={{ sx: { backgroundColor: "transparent" } }}
      >
        <Toolbar />

        <Navigation
          open={isDrawerOpen}
          toggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
        />
      </Drawer>

      <Main open={isDrawerOpen}>
        <Box px={4}>{children}</Box>
      </Main>
    </Box>
  );
}

export default AppContainer;
