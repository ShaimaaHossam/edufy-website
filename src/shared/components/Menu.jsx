import { useState } from "react";
import PropTypes from "prop-types";

import { Menu as MuiMenu, Badge, useTheme } from "@mui/material";

function Menu({
  label,

  AnchorComponent,
  AnchorComponentProps,

  badgeContent,
  badgeColor,
  hideBadgeOnOpen,

  children,
}) {
  const { direction } = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const renderAnchorElement = () => (
    <AnchorComponent
      {...AnchorComponentProps}
      onClick={(e) => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
        hideBadgeOnOpen && !isMenuOpened && setIsMenuOpened(true);
      }}
      aria-label={`open ${label} menu`}
      aria-controls={`${label}-menu`}
      aria-haspopup="true"
    />
  );

  return (
    <>
      {badgeContent && !isMenuOpened ? (
        <Badge
          color={badgeColor}
          badgeContent={badgeContent}
          anchorOrigin={{
            vertical: "top",
            horizontal: direction === "ltr" ? "right" : "left",
          }}
        >
          {renderAnchorElement()}
        </Badge>
      ) : (
        renderAnchorElement()
      )}

      <MuiMenu
        id={`${label}-menu`}
        aria-label={`${label} menu`}
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
        MenuListProps={{ dense: true, sx: { minWidth: 200 } }}
      >
        {children}
      </MuiMenu>
    </>
  );
}

Menu.propTypes = {
  label: PropTypes.string.isRequired,

  AnchorComponent: PropTypes.oneOfType([PropTypes.elementType, PropTypes.func])
    .isRequired,
  AnchorComponentProps: PropTypes.object,

  badgeContent: PropTypes.node,
  badgeColor: PropTypes.oneOf([
    "info",
    "error",
    "warning",
    "success",
    "primary",
    "secondary",
  ]),
  hideBadgeOnOpen: PropTypes.bool,
};

export default Menu;
