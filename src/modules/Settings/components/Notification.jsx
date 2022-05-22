import { useState } from "react";
import { Typography, Box } from "@mui/material";

import Switch from "../../../shared/components/inputs/Switch";

function Notification({ title }) {
  const [check, setCheck] = useState(true);

  return (
    <Box sx={{ flexDirection: 'row' }}>
      <Switch
        checked={check}
        onChange={() => {
          setCheck(!check);
        }}
      />
      <Typography variant="p" ml={2}>{title}</Typography>
    </Box>
  );
}

export default Notification;
