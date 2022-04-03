import { useEffect } from "react";

import { TileLayer, useMap } from "react-leaflet";

import { useTheme } from "@mui/material/styles";

function MapTileLayer() {
  const { direction } = useTheme();

  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map, direction]);

  return (
    <TileLayer
      key={direction}
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
  );
}

export default MapTileLayer;
