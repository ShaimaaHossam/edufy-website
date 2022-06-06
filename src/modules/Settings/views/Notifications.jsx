import { useEffect, useState, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  clearState,
  getNotifications,
  getSecondaryContcat,
  updateNotification,
  settingsSelector,
} from "../../../redux/services/SettingsServices";

import { Box, Grid, Typography, Button } from "@mui/material";

import NotificationList from "../components/NotificationList";
import Select from "../components/SecondaryContactSelect";
import Dialog from "../../../shared/components/Dialog";

function Notifications() {
  const dispatch = useDispatch();
  const { t } = useTranslation("settings");

  const { NotificationsData, secondaryContcat, isSuccess } =
    useSelector(settingsSelector);

  const [open, setOpen] = useState(false);

  const [emailList, setEmailList] = useState([]);
  const [smsList, setSmsList] = useState([]);
  const [appList, setAPPList] = useState([]);
  const [userList, setUserList] = useState([]);

  const [secondaryList, setٍٍSecondaryist] = useState({ value: [] });
  const [secondaryIdsList, setSecondaryIdsList] = useState([]);

  let notificationsMessages = [
    {
      id: 1,
      message: t("approvalsNeed"),
    },
    {
      id: 2,
      message: t("upcomingPayments"),
    },
    {
      id: 3,
      message: t("addedTeamMember"),
    },
  ];

  const userRef = useRef(false);
  const finalData = {
    settings: {
      app: appList,
      email: emailList,
      sms: smsList,
    },
    secondary_contacts: secondaryIdsList,
  };

  const handelSave = () => {
    dispatch(updateNotification(finalData));
    setOpen(false);
  };

  useEffect(() => {
    if (NotificationsData) {
      setEmailList(NotificationsData.email);
      setAPPList(NotificationsData.app);
      setSmsList(NotificationsData.sms);
      let ids = [];
      secondaryList?.value.filter((obj) => {
        if (obj.value) {
          let id = obj.id;
          ids.push(id);
        }
      });
      setSecondaryIdsList(ids);
    }
  }, [NotificationsData, secondaryList]);

  useEffect(() => {
    dispatch(getNotifications());
    if (userRef.current) {
      let users = secondaryContcat.map((user) => {
        return { id: user.id, label: user.name, value: true };
      });
      setUserList(users);
    }

    if (!userRef.current) {
      userRef.current = true;
      dispatch(getSecondaryContcat());
    }
  }, [dispatch, getNotifications, secondaryContcat]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
    }
  }, [isSuccess]);

  return (
    <>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        {t("notifications")}
      </Typography>

      <Typography variant="p" color="text.secondary">
        {t("summaryLabel")}
      </Typography>

      <Grid container spacing={1} margin="auto" mt={5} mb={5}>
        <Grid item container xs={7}>
          <Typography>{t("summary")}</Typography>
          {notificationsMessages.map((obj) => {
            return (
              <Grid item xs={12} key={obj.id}>
                <Typography variant="p">{obj.message}</Typography>
              </Grid>
            );
          })}
        </Grid>
        <Grid item xs={1}>
          <NotificationList
            title={t("email")}
            values={emailList}
            onChange={(emailList) => setEmailList(emailList)}
          />
        </Grid>

        <Grid item xs={1}>
          <NotificationList
            title={t("sms")}
            values={smsList}
            onChange={(smsList) => setSmsList(smsList)}
          />
        </Grid>

        <Grid item xs={1}>
          <NotificationList
            title={t("app")}
            values={appList}
            onChange={(appList) => setAPPList(appList)}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" fontWeight="bold" mb={1}>
        {t("contactNotification")}
      </Typography>

      <Typography variant="p" color="text.secondary">
        {t("contactNotificationLabel")}
      </Typography>

      <Select
        title="Contact"
        values={userList}
        setٍٍSecondaryist={setٍٍSecondaryist}
      />

      <Box textAlign="right" mt={6} mb={4}>
        <Dialog
          title={t("saveMesage")}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          onConfirm={handelSave}
        />
        <Button
          type="submit"
          sx={{
            backgroundColor: "success.main",
            color: "white",
            "&:hover": { backgroundColor: "success.main" },
          }}
          onClick={() => {
            setOpen(true);
          }}
        >
          {t("saveChanges")}
        </Button>
      </Box>
    </>
  );
}

export default Notifications;
