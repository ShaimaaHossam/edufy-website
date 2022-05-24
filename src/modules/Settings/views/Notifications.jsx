import { useEffect, useState, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  getNotifications,
  getSecondaryContcat,
  settingsSelector,
  clearState,
} from "../../../redux/services/SettingsServices";

import { useTranslation } from "react-i18next";

import { Box, Typography, Button } from "@mui/material";

import Notification from "../components/Notification";
import SaveChanges from "../components/SaveChanges";
import CheckboxMenu from "../../../shared/components/inputs/CheckboxMenu";

function Notifications() {
  const { t } = useTranslation("settings");

  const dispatch = useDispatch();
  const {
    isSuccess,
    isError,
    data,
    errors,
    appSettings,
    emailSettings,
    smsSettings,
    secondarySettings,
    secondaryContcat,
  } = useSelector(settingsSelector);

  const [userList, setUserList] = useState([]);
  const userRef = useRef(false);

  console.log("userList", userList)

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
      <Box>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Email Notification
        </Typography>
        {emailSettings.map((obj) => {
          return (
            <Notification
              title={t(`email.${obj.key}`)}
              key={obj.key}
              obj={obj}
            />
          );
        })}
      </Box>

      <Box>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          SMS Notifiction
        </Typography>
        {smsSettings.map((obj) => {
          return (
            <Notification title={t(`sms.${obj.key}`)} key={obj.key} obj={obj} />
          );
        })}
      </Box>

      <Box>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Application Notification
        </Typography>
        {appSettings.map((obj) => {
          return (
            <Notification title={t(`app.${obj.key}`)} key={obj.key} obj={obj} />
          );
        })}
      </Box>

      <Box>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Secondary Contact Notification
        </Typography>
        <CheckboxMenu
          title="Secondary contact"
          values={userList}
          onChange={(userList) => setUserList(userList)}
        />
        {secondarySettings.map((obj) => {
          return (
            <Notification
              title={t(`secondary.${obj.key}`)}
              key={obj.key}
              obj={obj}
            />
          );
        })}
      </Box>
      <Box textAlign="right" mt={4}>
        <SaveChanges />
      </Box>
    </>
  );
}

export default Notifications;
