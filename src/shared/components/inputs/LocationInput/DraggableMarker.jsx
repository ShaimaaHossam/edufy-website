import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { useMap, useMapEvents } from "react-leaflet";

import MapMarker from "../../maps/MapMarker";

function DraggableMarker({ position, onPositionChange }) {
  const map = useMap();
  const markerRef = useRef(null);

  useEffect(() => {
    if (!position) return;

    map.flyTo(position);
  }, [map, position]);

  useMapEvents({
    click: (e) => {
      if (!!position) return;

      const newLatLng = e.latlng;
      onPositionChange(newLatLng);
    },
    drag: (e) => {
      if (!position) return;

      const marker = markerRef.current;
      const newLatLng = map.getCenter();

      marker.setLatLng(newLatLng);
    },
    dragend: (e) => {
      if (!position) return;

      const newLatLng = map.getCenter();
      onPositionChange(newLatLng);
    },
    zoom: (e) => {
      if (!position) return;

      const marker = markerRef.current;
      const newLatLng = marker.getLatLng();

      map.setView(newLatLng);
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

  if (!position) return null;

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
  }),
  onPositionChange: PropTypes.func.isRequired,
};

export default DraggableMarker;
