import { useRef } from "react";
import PropTypes from "prop-types";

import { useTheme } from "@mui/material";

import { FeatureGroup } from "react-leaflet";

import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";

import MapPolygon from "../../maps/MapPolygon";

function PolygonDrawer({ area, onAreaChange }) {
  const theme = useTheme();

  const featGroupRef = useRef();

  const handleCreated = (e) => {
    const newLayer = e.layer;
    onAreaChange(newLayer.getLatLngs()[0]);

    const featGroup = featGroupRef.current;
    const drawnItems = featGroup._layers;
    // if there're more than one shape remove all except newest
    if (Object.keys(drawnItems).length > 1) {
      Object.keys(drawnItems).forEach((layerID, idx) => {
        if (idx > 0) return;

        const layer = drawnItems[layerID];
        featGroup.removeLayer(layer);
      });
    }
  };
  const handleEdited = (e) => {
    const featGroup = featGroupRef.current;
    const drawnItems = featGroup._layers;
    Object.keys(drawnItems).forEach((layerID, idx) => {
      if (idx === 0) {
        const newLayer = drawnItems[layerID];
        onAreaChange(newLayer.getLatLngs()[0]);
      }
    });
  };

  return (
    <FeatureGroup ref={featGroupRef}>
      <EditControl
        position="topright"
        draw={{
          polygon: {
            shapeOptions: {
              weight: 2,
              opacity: 0.5,
              fillOpacity: 0.1,
              color: theme.palette.primary.main,
            },
          },
          marker: false,
          circle: false,
          polyline: false,
          rectangle: false,
          circlemarker: false,
        }}
        onCreated={handleCreated}
        onEdited={handleEdited}
        onDeleted={() => onAreaChange(null)}
      />

      {!!area && <MapPolygon positions={area} />}
    </FeatureGroup>
  );
}

PolygonDrawer.propTypes = {
  area: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    })
  ),
  onAreaChange: PropTypes.func.isRequired,
};

export default PolygonDrawer;
