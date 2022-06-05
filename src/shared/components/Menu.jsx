import { useState } from "react";
import PropTypes from "prop-types";

import { Menu as MuiMenu, Badge, useTheme } from "@mui/material";

function Menu({
  label,

  AnchorComponent,
  AnchorComponentProps,
  AnchorComponentOpenProps,

  badgeContent,
  badgeColor,
  hideBadgeOnOpen,

  children,
}) {
  const { direction } = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isBadgeHidden, setIsBadgeHidden] = useState(false);

  const renderAnchorElement = () => (
    <AnchorComponent
      {...AnchorComponentProps}
      {...(!!anchorEl && AnchorComponentOpenProps)}
      onClick={(e) => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
        !!badgeContent &&
          hideBadgeOnOpen &&
          !isBadgeHidden &&
          setIsBadgeHidden(true);
      }}
      aria-label={`open ${label} menu`}
      aria-controls={`${label}-menu`}
      aria-haspopup="true"
    />
  );

  return (
    <>
      {!!badgeContent ? (
        <Badge
          color={badgeColor}
          badgeContent={!isBadgeHidden ? badgeContent : null}
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
        MenuListProps={{
          dense: true,
          sx: { minWidth: 180, maxWidth: 340, maxHeight: 300 },
        }}
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
  AnchorComponentOpenProps: PropTypes.object,

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
