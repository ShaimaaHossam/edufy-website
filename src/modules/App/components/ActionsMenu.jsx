import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import {
  useTheme,
  styled,
  Button as MuiButton,
  Menu,
  MenuItem,
  ListItemText,
  Typography,
} from "@mui/material";

import { mdiPlus } from "@mdi/js";

import Icon from "../../../shared/components/Icon";

const Button = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== "isMenuOpened",
})(({ theme, isMenuOpened }) => ({
  height: 40,
  minWidth: 40,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
  padding: 0,
  ...(isMenuOpened && {
    width: 80,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundImage: theme.palette.gradients.primary,
    "&:hover": {
      backgroundImage: theme.palette.gradients.primary,
    },
  }),
  ...(!isMenuOpened && {
    width: 40,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundImage: theme.palette.gradients.primaryRadial,
    "&:hover": {
      backgroundImage: theme.palette.gradients.primaryRadial,
    },
  }),
}));

function ActionsMenu() {
  const { direction } = useTheme();
  const { t } = useTranslation("app");

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <Button
        disableRipple
        isMenuOpened={!!anchorEl}
        onClick={(e) => {
          e.stopPropagation();
          setAnchorEl(e.currentTarget);
        }}
        aria-label="open actions menu"
        aria-controls="actions-menu"
        aria-haspopup="true"
      >
        {!!anchorEl && (
          <Typography component="span" mr={1}>
            {t("add")}
          </Typography>
        )}

        <Icon icon={mdiPlus} size="small" sx={{ color: "white" }} />
      </Button>

      <Menu
        id="actions-menu"
        aria-label="actions menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          // point on anchorEl to drop menu from
          vertical: "bottom",
          horizontal: direction === "ltr" ? "right" : "left",
        }}
        transformOrigin={{
          // point of menu to be mounted on anchor
          vertical: "top",
          horizontal: direction === "ltr" ? "right" : "left",
        }}
        open={!!anchorEl}
        onClose={(e) => {
          e.stopPropagation();
          setAnchorEl(null);
        }}
        MenuListProps={{ dense: true }}
      >
        <MenuItem onClick={() => navigate("/people/add")}>
          <ListItemText>{t("add_user")}</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => navigate("/orders/add")}>
          <ListItemText>{t("add_order")}</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => navigate("/properties/add")}>
          <ListItemText>{t("add_property")}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

export default ActionsMenu;
