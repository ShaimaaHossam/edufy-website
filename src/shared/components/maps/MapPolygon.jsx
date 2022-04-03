import PropTypes from "prop-types";

import { useTheme } from "@mui/material";

import { Polygon } from "react-leaflet";

function MapPolygon({ positions }) {
  const theme = useTheme();

  return (
    <Polygon
      positions={positions}
      pathOptions={{
        weight: 2,
        opacity: 1,
        color: theme.palette.primary.main,
      }}
    />
  );
}

MapPolygon.propTypes = {
  positions: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    })
  ).isRequired,
};

export default MapPolygon;
