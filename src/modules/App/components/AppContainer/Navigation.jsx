import { useMemo } from "react";
import PropTypes from "prop-types";

import { useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";

import {
  styled,
  useTheme,
  Box,
  Grid,
  Typography,
  List,
  ListItem as MuiListItem,
} from "@mui/material";
import { mdiChevronRight, mdiChevronLeft } from "@mdi/js";

import Link from "../../../../shared/components/Link";
import Icon from "../../../../shared/components/Icon";
import IconButton from "../../../../shared/components/IconButton";

import makeRoutingList from "../../../../helpers/makeRoutingList";

const toggleIconsMap = {
  opened: {
    ltr: mdiChevronLeft,
    rtl: mdiChevronRight,
  },
  closed: {
    ltr: mdiChevronRight,
    rtl: mdiChevronLeft,
  },
};

const ListItem = styled(MuiListItem, {
  shouldForwardProp: (prop) => ["expanded", "active"].indexOf(prop) === -1,
})(({ theme, expanded, active }) => ({
  padding: 0,
  borderRadius: 10,
  overflowX: "hidden",
  "&:not(:last-child)": {
    marginBottom: theme.spacing(2),
  },
  ...(active && {
    backgroundImage: "linear-gradient(75deg, #3EE6EF33 0%, #1E7AF033 100%)",
  }),
  ...(expanded && {
    width: "100%",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!expanded && {
    width: 52,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),
}));

function Navigation({ open, toggleDrawer }) {
  const { direction: dir } = useTheme();
  const { t } = useTranslation("app");

  const { pathname } = useLocation();

  const routingItems = useMemo(() => makeRoutingList({}), []);

  return (
    <Grid container direction="column" sx={{ flexGrow: 1 }}>
      <Grid item sx={{ px: 3 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography component="span" variant="h6">
              {t("menu")}
            </Typography>
          </Grid>

          <Grid item>
            <IconButton
              size="small"
              variant="outlined"
              icon={
                open ? toggleIconsMap.opened[dir] : toggleIconsMap.closed[dir]
              }
              onClick={toggleDrawer}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item component="nav" sx={{ px: 3 }}>
        <List>
          {routingItems.map(
            (item) =>
              item.active && (
                <ListItem
                  key={item.navName}
                  expanded={open}
                  active={pathname.includes(item.navLink)}
                >
                  <Link
                    to={item.navLink}
                    color={
                      pathname.includes(item.navLink)
                        ? "primary.main"
                        : "text.primary"
                    }
                    sx={{ flexGrow: 1, px: 2, py: 1.5 }}
                  >
                    <Box display="flex" alignItems="center">
                      <Icon
                        icon={item.icon}
                        sx={{ width: 20, height: 20, mr: 2 }}
                      />

                      <Typography component="span">
                        {t(item.navName)}
                      </Typography>
                    </Box>
                  </Link>
                </ListItem>
              )
          )}
        </List>
      </Grid>
    </Grid>
  );
}

Navigation.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default Navigation;
