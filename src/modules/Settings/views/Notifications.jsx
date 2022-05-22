import { useEffect } from "react";
import Notification from "../components/Notification";

import { useSelector, useDispatch } from "react-redux";

import {
  getNotifications,
  settingsSelector,
  clearState,
} from "../../../redux/services/SettingsServices";


function Notifications() {

  const dispatch = useDispatch();
  const { isSuccess, isError, errors, data } = useSelector(settingsSelector);

  console.log("settings", data)


  useEffect(()=>{
    dispatch(getNotifications());
  },[])
  return <Notification title="mohamed" />;
}

export default Notifications;
