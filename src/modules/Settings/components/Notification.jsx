import { useState } from "react";
import { Typography, Box } from "@mui/material";

import Switch from "../../../shared/components/inputs/Switch";

function Notification({ title, checked, onChange }) {
  const [check, setCheck] = useState(true);

  return (
    <Box flexDirection="row" mb={3}>
      <Switch
        checked={checked}
        onChange={() => {
          
        }}
      />
      <Typography variant="p" ml={2}>{title}</Typography>
    </Box>
  );
}

export default Notification;
