import { useState } from "react";
import PropTypes from "prop-types";

import { Box } from "@mui/material";

import Map from "../../maps/Map";
import MapFullscreenButton from "../../maps/MapFullscreenButton";

import SearchInput from "./SearchInput";
import DraggableMarker from "./DraggableMarker";
import PolygonDrawer from "./PolygonDrawer";

function LocationInput({
  zoom,

  position,
  onPositionChange,

  withArea,
  area,
  onAreaChange,
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <Box
      sx={
        isFullscreen
          ? { position: "fixed", top: 0, bottom: 0, right: 0, left: 0 }
          : { width: "100%", height: "100%", minHeight: 380 }
      }
    >
      <Map isDraggable center={position} zoom={zoom || 15}>
        <Box
          sx={{
            position: "absolute",
            top: 20,
            marginLeft: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
          }}
        >
          <SearchInput
            position={position}
            onPositionChange={(newPos) => onPositionChange(newPos)}
          />
        </Box>

        <MapFullscreenButton
          isFullscreen={isFullscreen}
          onToggle={() => setIsFullscreen(!isFullscreen)}
          position={{ left: 10, bottom: 80 }}
        />

        <DraggableMarker
          position={position}
          onPositionChange={(newPos) => onPositionChange(newPos)}
        />

        {withArea && (
          <PolygonDrawer
            area={area}
            onAreaChange={(newArea) => onAreaChange(newArea)}
          />
        )}
      </Map>
    </Box>
  );
}

LocationInput.propTypes = {
  zoom: PropTypes.number,

  position: PropTypes.shape({
    lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }).isRequired,
  onPositionChange: PropTypes.func.isRequired,

  withArea: PropTypes.bool,
  area: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    })
  ),
  onAreaChange: PropTypes.func,
};

export default LocationInput;
