import { useState } from "react";
import { Typography, Box } from "@mui/material";

import Switch from "../../../shared/components/inputs/Switch";

function Notification({ title, checked }) {
  const [check, setCheck] = useState(checked);

  return (
    <Box flexDirection="row" mb={3}>
      <Switch
        checked={check}
        onChange={() => {
          setCheck(!check)
        }}
      />
      <Typography variant="p" ml={2}>{title}</Typography>
    </Box>
  );
}

export default Notification;
