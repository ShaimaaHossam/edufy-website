import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { useMap, useMapEvents } from "react-leaflet";

import MapMarker from "../../maps/MapMarker";

function DraggableMarker({ position, onPositionChange }) {
  const map = useMap();
  const markerRef = useRef(null);

  useEffect(() => {
    map.flyTo(position);
  }, [map, position]);

  useMapEvents({
    drag: (e) => {
      const marker = markerRef.current;
      const newLatLng = map.getCenter();

      marker.setLatLng(newLatLng);
      onPositionChange(newLatLng);
    },
  });

  const markerHandlers = {
    dragend: () => {
      const marker = markerRef.current;
      const newLatLng = marker.getLatLng();

      map.flyTo(newLatLng);
      onPositionChange(newLatLng);
    },
  };

  return (
    <MapMarker
      isDraggable
      position={position}
      markerHandlers={markerHandlers}
      markerRef={markerRef}
    />
  );
}

DraggableMarker.propTypes = {
  position: PropTypes.shape({
    lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }).isRequired,
  onPositionChange: PropTypes.func.isRequired,
};

export default DraggableMarker;
