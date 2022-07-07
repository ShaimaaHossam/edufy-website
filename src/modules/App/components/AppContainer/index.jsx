import { useSelector } from "react-redux";
import { appSelector } from "../../state";

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
const CLOSED_DRAWER_WIDTH = 76;

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
      backgroundColor: "transparent",
      width: OPENED_DRAWER_WIDTH,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      border: "none",
      marginTop: theme.spacing(3),
      [theme.breakpoints.down("md")]: {
        backgroundColor: theme.palette.common.white,
        boxShadow: theme.shadows[1],
      },
    },
  }),
  ...(!open && {
    width: CLOSED_DRAWER_WIDTH,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    "& .MuiDrawer-paper": {
      backgroundColor: "transparent",
      width: CLOSED_DRAWER_WIDTH,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      border: "none",
      marginTop: theme.spacing(3),
      [theme.breakpoints.down("md")]: {
        width: 0,
        backgroundColor: theme.palette.common.white,
        boxShadow: theme.shadows[1],
      },
    },
  }),
}));

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  position: "relative",
  flexGrow: 1,
  display: "flex",
  flexFlow: "column",
  margin: theme.spacing(3, 0, 3, 0),
  ...(open && {
    marginLeft: OPENED_DRAWER_WIDTH,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
    },
  }),
  ...(!open && {
    marginLeft: CLOSED_DRAWER_WIDTH,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
    },
  }),
}));

function AppContainer({ children }) {
  const { isMenuOpen } = useSelector(appSelector);

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

      <Drawer variant="permanent" open={isMenuOpen}>
        <Toolbar />

        <Navigation />
      </Drawer>

      <Main open={isMenuOpen}>
        <Box px={4} flexGrow={1} display="flex" flexDirection="column">
          {children}
        </Box>
      </Main>
    </Box>
  );
}

export default AppContainer;
