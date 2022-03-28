import { renderToStaticMarkup } from "react-dom/server";
import PropTypes from "prop-types";

import { Marker } from "react-leaflet";
import { divIcon } from "leaflet";

import { mdiMapMarker } from "@mdi/js";

import Icon from "../../Icon";

import classes from "./styles.module.scss";

function MapMarker({
  position,
  icon,
  color,
  isDraggable,
  markerHandlers,
  markerRef,
}) {
  const markerIcon = divIcon({
    html: renderToStaticMarkup(
      <Icon icon={icon || mdiMapMarker} color={color || "primary"} />
    ),
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    className: classes.iconContainer,
  });

  return (
    <Marker
      ref={markerRef}
      position={position}
      icon={markerIcon}
      draggable={isDraggable}
      eventHandlers={markerHandlers}
    />
  );
}

MapMarker.propTypes = {
  position: PropTypes.shape({
    lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }).isRequired,
  icon: PropTypes.string,
  color: PropTypes.string,
  isDraggable: PropTypes.bool,
  markerHandlers: PropTypes.object,
  ref: PropTypes.object,
};

export default MapMarker;
