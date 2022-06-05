import { forwardRef } from "react";

import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { authSelector } from "../../../redux/slices/auth";

import { useTranslation } from "react-i18next";

import {
  styled,
  Button as MuiButton,
  Avatar,
  Typography,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { mdiAccountOutline, mdiCogOutline, mdiLogoutVariant } from "@mdi/js";

import Menu from "../../../shared/components/Menu";
import Icon from "../../../shared/components/Icon";

const Button = styled(MuiButton)(({ theme }) => ({
  width: 180,
  maxWidth: 180,
  height: 40,
  padding: theme.spacing(0.5),
  paddingRight: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  backgroundColor: "#1E7AF024",
  border: "1px solid #EDF5FC",
  borderRadius: 90,
  "&:hover": {
    backgroundColor: "#1E7AF024",
  },
}));

const UserCard = forwardRef((props, ref) => {
  const { user } = useSelector(authSelector);

  return (
    <Button ref={ref} {...props}>
      <Avatar
        src={user.image}
        alt={user.name}
        sx={{ width: 32, height: 32, mr: 1 }}
      />

      <Typography variant="body1" color="textPrimary" noWrap>
        {user.name}
      </Typography>
    </Button>
  );
});

function UserMenu() {
  const { t } = useTranslation("app");

  const navigate = useNavigate();

  return (
    <Menu label="user actions" AnchorComponent={UserCard}>
      <MenuItem onClick={() => navigate("/profiles")}>
        <ListItemIcon>
          <Icon icon={mdiAccountOutline} />
        </ListItemIcon>
        <ListItemText>{t("my_profile")}</ListItemText>
      </MenuItem>

      <MenuItem onClick={() => navigate("/settings")}>
        <ListItemIcon>
          <Icon icon={mdiCogOutline} />
        </ListItemIcon>
        <ListItemText>{t("settings")}</ListItemText>
      </MenuItem>

      <MenuItem onClick={() => {}}>
        <ListItemIcon>
          <Icon icon={mdiLogoutVariant} />
        </ListItemIcon>
        <ListItemText>{t("logout")}</ListItemText>
      </MenuItem>
    </Menu>
  );
}

export default UserMenu;
