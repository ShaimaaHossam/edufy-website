import { useState } from "react";
import { Typography } from "@mui/material";

import Switch from "../../../shared/components/inputs/Switch";

function Notifications(){
    const [check, setCheck] = useState(true);

   return(
<>
    <Switch
    checked={check}
    onChange={() => {
      setCheck(!check);
    }}
  />
  <Typography>Send me an email when approvals need to be taken.</Typography>
</>
   ) 
}

export default Notifications;