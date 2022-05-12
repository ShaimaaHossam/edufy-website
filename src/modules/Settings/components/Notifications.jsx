import { useState } from "react";
 
import Switch from "../../../shared/components/inputs/Switch";

function Notifications(){
    const [check, setCheck] = useState(true);

   return(
    <Switch
    checked={check}
    onChange={() => {
      setCheck(!check);
    }}
  />
   ) 
}

export default Notifications;