import { useState, useEffect, useRef } from "react";
import { Typography, Box } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";

import {
  updateSingleNotification,
  settingsSelector,
  clearState,
} from "../../../redux/services/SettingsServices";

import Switch from "../../../shared/components/inputs/Switch";

function Notification({ title, obj,  }) {
  const [check, setCheck] = useState(obj?.value || false);
  const { data } = useSelector(settingsSelector);

  const checkRef = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!checkRef.current) {
      checkRef.current = true;
    } else {
      dispatch(
        updateSingleNotification({ key: obj.key, value: check, settings: data })
      );
    }
  }, [check, updateSingleNotification]);

  return (
    <>
      <Box flexDirection="row" mb={3}>
        <Switch
          checked={check}
          onChange={() => {
            setCheck(!check);
          }}
        />
        <Typography variant="p" ml={2}>
          {title}
        </Typography>
      </Box>
    </>
  );
}

export default Notification;
