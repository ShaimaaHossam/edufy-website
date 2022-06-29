import { useState, useEffect, useMemo, Fragment } from "react";

import { useDispatch, useSelector } from "react-redux";
import { appSelector, openMenu } from "../../state";

import { useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";

import usePermissions from "../../../../shared/hooks/usePermissions";

import {
  styled,
  Box,
  Grid,
  Typography,
  List,
  ListItem as MuiListItem,
  ListItemButton as MuiListItemButton,
  Collapse,
} from "@mui/material";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";

import Link from "../../../../shared/components/Link";
import Icon from "../../../../shared/components/Icon";

import makeRoutingList from "../../../../helpers/makeRoutingList";

const ListItem = styled(MuiListItem, {
  shouldForwardProp: (prop) =>
    ["expanded", "active", "isSubItem"].indexOf(prop) === -1,
})(({ theme, expanded, active, isSubItem }) => ({
  borderRadius: 4,
  overflowX: "hidden",
  padding: isSubItem ? theme.spacing(1, 2) : theme.spacing(0, 0, 2, 0),
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
const ListItemButton = styled(MuiListItemButton, {
  shouldForwardProp: (prop) => prop !== "expanded",
})(({ theme, expanded }) => ({
  overflowX: "hidden",
  padding: theme.spacing(0, 0, 2, 0),
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
  ":hover": {
    backgroundColor: "transparent",
  },
}));

function Navigation() {
  const { t } = useTranslation("app");

  const dispatch = useDispatch();
  const { isMenuOpen } = useSelector(appSelector);

  const { pathname } = useLocation();

  const permissions = usePermissions();
  
  const routingItems = useMemo(() => makeRoutingList({ permissions }), [permissions]);

  const [openedItem, setOpenedItem] = useState("");
  useEffect(() => {
    !isMenuOpen && setOpenedItem("");
  }, [isMenuOpen]);

  const renderListItemContent = (item, isSubItem) => (
    <>
      {!isSubItem && (
        <Box
          sx={{
            mr: 2,
            p: "10px",
            width: 40,
            height: 40,
            borderRadius: "4px",
            backgroundImage: pathname.includes(item.navLink)
              ? "linear-gradient(45deg, #3EE6EF33 0%, #1E7AF033 100%)"
              : "linear-gradient(45deg, #EDF5FC 0%, #EDF5FC 100%)",
          }}
        >
          <Icon
            icon={item.icon}
            sx={{ display: "block", width: 20, height: 20 }}
          />
        </Box>
      )}

      <Typography
        component="span"
        variant={isSubItem ? "body2" : "body1"}
        sx={{ flexGrow: 1 }}
      >
        {t(item.navName)}
      </Typography>

      {!!item.subItems && (
        <Icon
          size="medium"
          icon={item.navName === openedItem ? mdiChevronUp : mdiChevronDown}
          sx={{ ml: 2 }}
        />
      )}
    </>
  );
  const renderListItem = (item, isSubItem) =>
    !!item.subItems ? (
      <ListItemButton
        key={item.navName}
        expanded={isMenuOpen}
        onClick={() => {
          !isMenuOpen && dispatch(openMenu());
          setOpenedItem(openedItem !== item.navName ? item.navName : "");
        }}
        sx={{ color: pathname.includes(item.navLink) ? "primary" : "inherit" }}
      >
        {renderListItemContent(item)}
      </ListItemButton>
    ) : (
      <ListItem
        key={item.navName}
        expanded={isMenuOpen}
        isSubItem={isSubItem}
        active={isSubItem && pathname.includes(item.navLink)}
        sx={{ color: pathname.includes(item.navLink) ? "primary" : "inherit" }}
      >
        <Link
          to={item.navLink}
          color={
            pathname.includes(item.navLink) ? "primary.main" : "text.primary"
          }
          sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
        >
          {renderListItemContent(item, isSubItem)}
        </Link>
      </ListItem>
    );

  return (
    <Grid container direction="column" sx={{ flexGrow: 1 }}>
      <Grid item component="nav" sx={{ pl: 3 }}>
        <List disablePadding>
          {routingItems.map(
            (item) =>
              item.active && (
                <Fragment key={item.navName}>
                  {renderListItem(item)}

                  {!!item.subItems && (
                    <Collapse in={item.navName === openedItem}>
                      <List sx={{ ml: 5, mt: -2, mb: 2 }}>
                        {item.subItems.map(
                          (subItem) =>
                            subItem.active && renderListItem(subItem, true)
                        )}
                      </List>
                    </Collapse>
                  )}
                </Fragment>
              )
          )}
        </List>
      </Grid>
    </Grid>
  );
}

export default Navigation;
