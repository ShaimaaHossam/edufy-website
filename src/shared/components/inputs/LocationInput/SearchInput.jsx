import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";

import { useMap } from "react-leaflet";
import L from "leaflet";

import {
  Box,
  Autocomplete,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";

import { mdiChevronDown, mdiMapSearch } from "@mdi/js";

import Icon from "../../Icon";

import useDebouncedEffect from "../../../hooks/useDebouncedEffect";

function SearchInput({ onPositionChange }) {
  const { t } = useTranslation();

  const [isFocused, setIsFocused] = useState(false);
  const [keyword, setKeyword] = useState("");

  const [isFetching, setIsFetching] = useState(false);
  const [options, setOptions] = useState([]);

  useDebouncedEffect(
    async () => {
      if (!keyword) return;

      setIsFetching(true);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${keyword}&format=json&limit=15`
      );
      const results = await response.json();
      setOptions(
        results.map(({ place_id, display_name, lat, lon }) => ({
          id: place_id,
          name: display_name,
          lat: parseFloat(lat),
          lng: parseFloat(lon),
        }))
      );

      setIsFetching(false);
    },
    [keyword],
    700,
    false,
    false
  );

  // disable autocomplete click events bubbling
  const inputRef = useRef();
  useEffect(() => {
    if (!inputRef.current) return;

    L.DomEvent.disableClickPropagation(inputRef.current);
  }, []);

  const map = useMap();
  const handleChange = (e, option) => {
    if (!option) return;

    const newLatLng = { lat: option.lat, lng: option.lng };

    map.flyTo(newLatLng);
    onPositionChange(newLatLng);
  };

  return (
    <Autocomplete
      ref={inputRef}
      fullWidth
      size="small"
      options={options}
      loading={isFetching}
      filterOptions={(opts) => opts}
      getOptionLabel={(opt) => opt.name}
      isOptionEqualToValue={(opt, val) => opt.id === val.id}
      popupIcon={<Icon icon={mdiChevronDown} />}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={t("location")}
          placeholder={t("search_locations")}
          InputProps={{
            ...params.InputProps,
            startAdornment: (isFocused || !!keyword) && (
              <InputAdornment position="start" sx={{ ml: "4px" }}>
                <Icon size="small" color="action" icon={mdiMapSearch} />
              </InputAdornment>
            ),
            endAdornment: (
              <Box display="flex" alignItems="center">
                {isFetching && <CircularProgress color="secondary" size={20} />}
                {params.InputProps.endAdornment}
              </Box>
            ),
            componentsProps: {
              root: {
                sx: {
                  "&.MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
                    pr: "40px",
                  },
                },
              },
            },
          }}
        />
      )}
      onChange={handleChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onInputChange={(e) => setKeyword(e.target.value)}
      sx={{
        minWidth: 340,
        borderRadius: "4px",
        backgroundColor: "#FFF",
        opacity: 0.9,
      }}
    />
  );
}

SearchInput.propTypes = {
  onPositionChange: PropTypes.func.isRequired,
};

export default SearchInput;
