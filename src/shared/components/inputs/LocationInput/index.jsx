import { useState } from "react";
import PropTypes from "prop-types";

import { useTheme, Box } from "@mui/material";

import Map from "../../maps/Map";
import MapFullscreenButton from "../../maps/MapFullscreenButton";

import SearchInput from "./SearchInput";
import DraggableMarker from "./DraggableMarker";
import PolygonDrawer from "./PolygonDrawer";

const DEFAULT_CENTER = { lat: "23.8859", lng: "45.0792" };

function LocationInput({
  zoom = 5,
  center = DEFAULT_CENTER,

  position,
  onPositionChange,

  withArea,
  area,
  onAreaChange,

  children,
}) {
  const theme = useTheme();

  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <Box
      sx={
        isFullscreen
          ? {
              position: "fixed",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              zIndex: theme.zIndex.appBar + 1,
            }
          : { width: "100%", height: "100%", minHeight: 380 }
      }
    >
      <Map
        isDraggable
        center={center}
        zoom={zoom}
        key={`${center.lat}${center.lng}`}
      >
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

        {children}
      </Map>
    </Box>
  );
}

LocationInput.propTypes = {
  zoom: PropTypes.number,
  center: PropTypes.shape({
    lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }),

  position: PropTypes.shape({
    lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }),
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
