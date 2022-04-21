import { MenuItem } from "@mui/material";

import { mdiBellRingOutline } from "@mdi/js";

import Menu from "../../../shared/components/Menu";
import IconButton from "../../../shared/components/IconButton";

function NotificationMenu() {
  return (
    <Menu
      label="notifications"
      badgeColor="error"
      badgeContent={12}
      hideBadgeOnOpen
      AnchorComponent={IconButton}
      AnchorComponentProps={{
        icon: mdiBellRingOutline,
        size: "large",
        color: "primary",
        variant: "outlined",
        sx: {
          backgroundImage:
            "linear-gradient(180deg, #3EE6EF33 0%, #1E7AF033 100%)",
        },
      }}
    >
      <MenuItem></MenuItem>
      <MenuItem></MenuItem>
      <MenuItem></MenuItem>
    </Menu>
  );
}

export default NotificationMenu;
