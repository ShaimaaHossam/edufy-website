import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  getNotifications,
  settingsSelector,
  clearState,
} from "../../../redux/services/SettingsServices";

import { useTranslation } from "react-i18next";

import { Box, Typography, Button } from "@mui/material";

import Notification from "../components/Notification";

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
  } = useSelector(settingsSelector);

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch, getNotifications]);

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
        <Button sx={{ backgroundColor: "success.main" }}>Save Changes</Button>
      </Box>
    </>
  );
}

export default Notifications;
