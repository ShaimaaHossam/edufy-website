import { useState } from "react";

import {
  Chip,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Box,
} from "@mui/material";

function SecondaryContactSelect({ title, values, setٍٍSecondaryist }) {
  const [person, setPerson] = useState(values);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setٍٍSecondaryist((val) => {
      return { ...val, value };
    });
    setPerson(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl sx={{ m: 1, width: "100%", marginTop: 5, marginBottom: 5 }}>
      <InputLabel id="label">{title}</InputLabel>
      <Select
        labelId="multiple-chip-label"
        id="multiple-chip"
        multiple
        value={person}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value.id} label={value.label} />
            ))}
          </Box>
        )}
      >
        {values.map((value, index) => (
          <MenuItem key={value.id} value={values[index]}>
            {value.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SecondaryContactSelect;
