import { useState } from "react";
import PropTypes from "prop-types";

import { Menu as MuiMenu, useTheme } from "@mui/material";

function Menu({
  label,

  AnchorComponent,
  AnchorComponentProps,
  AnchorComponentOpenProps,

  menuWidth,
  menuHeight,

  children,

  onMenuOpen,
  onMenuClose,
  onMenuScroll,
}) {
  const { direction } = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <AnchorComponent
        {...AnchorComponentProps}
        {...(!!anchorEl && AnchorComponentOpenProps)}
        onClick={(e) => {
          e.stopPropagation();
          setAnchorEl(e.currentTarget);
          onMenuOpen && onMenuOpen();
        }}
        aria-label={`open ${label} menu`}
        aria-controls={`${label}-menu`}
        aria-haspopup="true"
      />

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
          onMenuClose && onMenuClose();
        }}
        MenuListProps={{
          dense: true,
          sx: {
            position: "relative",
            minWidth: menuWidth || 180,
            maxWidth: menuWidth || 340,
            maxHeight: menuHeight || 400,
          },
        }}
        {...(onMenuScroll && { PaperProps: { onScroll: onMenuScroll } })}
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

  menuWidth: PropTypes.number,
  menuHeight: PropTypes.number,

  onMenuOpen: PropTypes.func,
  onMenuClose: PropTypes.func,
  onMenuScroll: PropTypes.func,
};

export default Menu;
