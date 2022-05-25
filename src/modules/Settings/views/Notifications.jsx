import { useEffect, useState, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  getNotifications,
  getSecondaryContcat,
  settingsSelector,
} from "../../../redux/services/SettingsServices";

import { Box } from "@mui/material";

import NotificationList from "../components/NotificationList";
import SaveChanges from "../components/SaveChanges";
import CheckboxMenu from "../../../shared/components/inputs/CheckboxMenu";

function Notifications() {

  const dispatch = useDispatch();
  const { data, secondaryContcat } = useSelector(settingsSelector);

  const [emailList, setEmailList] = useState([]);
  const [smsList, setSmsList] = useState([]);
  const [appList, setAPPList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [secondaryList, setٍٍSecondaryist] = useState([]);

  const userRef = useRef(false);

  
  useEffect(() => {
    if (data) {
      setEmailList(data.email);
      setAPPList(data.app);
      setSmsList(data.sms);
      setٍٍSecondaryist(data.secondary)
    }
  }, [data]);

  useEffect(() => {
    dispatch(getNotifications());

    if (userRef.current) {
      let users = secondaryContcat.map((user) => {
        return { id: user.id, label: user.name, value: false };
      });
      setUserList(users);
    }

    if (!userRef.current) {
      userRef.current = true;
      dispatch(getSecondaryContcat());
    }
  }, [dispatch, getNotifications, secondaryContcat]);

  return (
    <>
      <NotificationList
        title="Email Notification"
        values={emailList}
        category="email"
        onChange={(emailList) => setEmailList(emailList)}
      />

      <NotificationList
        title="SMS Notifiction"
        values={smsList}
        category="sms"
        onChange={(smsList) => setSmsList(smsList)}
      />

      <NotificationList
        title="Application Notification"
        values={appList}
        category="app"
        onChange={(appList) => setAPPList(appList)}
      />

      <CheckboxMenu
        title="Secondary contact"
        values={userList}
        onChange={(userList) => setUserList(userList)}
      />

      <NotificationList
        title="Secondary Contact Notification"
        values={secondaryList}
        category="secondary"
        onChange={(secondaryList) => setٍٍSecondaryist(secondaryList)}
      />

      <Box textAlign="right" mt={4}>
        <SaveChanges />
      </Box>
    </>
  );
}

export default Notifications;
