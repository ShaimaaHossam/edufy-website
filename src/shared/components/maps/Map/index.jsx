import PropTypes from "prop-types";

import { MapContainer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import MapTileLayer from "../MapTileLayer";

import classes from "./styles.module.scss";

function Map({ center, zoom, isDraggable, children }) {
  return (
    <MapContainer
      center={center}
      zoom={zoom || 15}
      dragging={isDraggable}
      zoomControl={false}
      scrollWheelZoom={false}
      className={classes.mapContainer}
    >
      <MapTileLayer />
      <ZoomControl position="bottomright" />

      {children}
    </MapContainer>
  );
}

Map.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }).isRequired,
  zoom: PropTypes.number,
  isDraggable: PropTypes.bool,
};

export default Map;
