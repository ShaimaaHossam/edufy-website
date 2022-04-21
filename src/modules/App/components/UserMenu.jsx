import { forwardRef } from "react";

import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import {
  styled,
  Button as MuiButton,
  Avatar,
  Typography,
  MenuItem,
  ListItemIcon,
} from "@mui/material";

import { mdiAccountOutline, mdiCogOutline, mdiLogoutVariant } from "@mdi/js";

import Menu from "../../../shared/components/Menu";
import Icon from "../../../shared/components/Icon";

const Button = styled(MuiButton)(({ theme }) => ({
  width: 180,
  height: 40,
  padding: theme.spacing(0.5),
  paddingRight: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  backgroundColor: "#1E7AF024",
  border: "1px solid #EDF5FC",
  borderRadius: 90,
  "&:hover": {
    backgroundColor: "#1E7AF024",
  },
}));

const UserCard = forwardRef((props, ref) => (
  <Button ref={ref} {...props}>
    <Avatar
      src={null}
      alt={"Hossam Dahshan"}
      sx={{ width: 32, height: 32, mr: 1 }}
    />

    <Typography variant="body1" color="textPrimary" noWrap>
      {"Hossam Dahshan"}
    </Typography>
  </Button>
));

function UserMenu() {
  const { t } = useTranslation("app");

  const navigate = useNavigate();

  return (
    <Menu label="user actions" AnchorComponent={UserCard}>
      <MenuItem onClick={() => navigate("/profiles")}>
        <ListItemIcon>
          <Icon icon={mdiAccountOutline} />
        </ListItemIcon>
        <Typography>{t("my_profile")}</Typography>
      </MenuItem>

      <MenuItem onClick={() => navigate("/settings")}>
        <ListItemIcon>
          <Icon icon={mdiCogOutline} />
        </ListItemIcon>
        <Typography>{t("settings")}</Typography>
      </MenuItem>

      <MenuItem onClick={() => {}}>
        <ListItemIcon>
          <Icon icon={mdiLogoutVariant} />
        </ListItemIcon>
        <Typography>{t("logout")}</Typography>
      </MenuItem>
    </Menu>
  );
}

export default UserMenu;
