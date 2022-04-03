import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { useTheme } from "@mui/material";

import { useMap } from "react-leaflet";
import L from "leaflet";

import { IconButton } from "@mui/material";

import { mdiArrowExpand, mdiArrowCollapse } from "@mdi/js";

import Icon from "../Icon";

function MapFullscreenButton({ isFullscreen, onToggle }) {
  const { direction } = useTheme();

  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map, isFullscreen]);

  const buttonRef = useRef();
  useEffect(() => {
    if (!buttonRef.current) return;

    L.DomEvent.disableClickPropagation(buttonRef.current);
  }, []);

  useEffect(() => {
    if (!isFullscreen) return;

    const escapeHandler = (e) => e.key === "Escape" && onToggle();
    window.addEventListener("keyup", escapeHandler);

    return () => {
      window.removeEventListener("keyup", escapeHandler);
    };
  }, [isFullscreen, onToggle]);

  return (
    <IconButton
      aria-label={isFullscreen ? "exit fullscreen" : "show fullscreen"}
      ref={buttonRef}
      disableFocusRipple
      onClick={onToggle}
      sx={{
        width: 34,
        height: 34,
        zIndex: 1000,
        color: "#000",
        backgroundColor: "#FFF",
        "&:hover": { backgroundColor: "#f4f4f4" },
        backgroundClip: "padding-box",
        border: "2px solid rgba(0, 0, 0, 0.2)",
        borderRadius: "4px",
        position: "absolute",
        bottom: 100,
        ...(direction === "ltr" ? { right: 10 } : { left: 10 }),
      }}
    >
      <Icon
        size="small"
        icon={isFullscreen ? mdiArrowCollapse : mdiArrowExpand}
      />
    </IconButton>
  );
}

MapFullscreenButton.propTypes = {
  isFullscreen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default MapFullscreenButton;
