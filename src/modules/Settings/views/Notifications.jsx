import { useEffect, useState, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  clearState,
  getNotifications,
  getSecondaryContcat,
  updateNotification,
  settingsSelector,
} from "../../../redux/services/SettingsServices";

import { useTranslation } from "react-i18next";

import { useFormik } from "formik";

import { Box, Grid, Typography, Button } from "@mui/material";

import NotificationList from "../components/NotificationList";
import Select from "../components/SecondaryContactSelect";
import Dialog from "../../../shared/components/Dialog";

function Notifications() {
  const [userList, setUserList] = useState([]);
  const [secondaryList, setٍٍSecondaryist] = useState({ value: [] });
  const [secondaryIdsList, setSecondaryIdsList] = useState([]);
  const formik = useFormik({
    initialValues: {
      app: [],
      email: [],
      sms: [],
    },
  });
  const { setValues, setFieldValue } = formik;

  const { NotificationsData, secondaryContcat, isSuccess } =
    useSelector(settingsSelector);

  const [open, setOpen] = useState(false);
  const userRef = useRef(false);

  const dispatch = useDispatch();
  const { t } = useTranslation("settings");

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


  const handelSave = () => {
    dispatch(
      updateNotification({
        settings: formik.values,
        secondary_contacts: secondaryIdsList,
      })
    );
    setOpen(false);
  };

  useEffect(() => {
    if (NotificationsData) {
      let ids = [];
      secondaryList?.value.filter((obj) => {
        if (obj.value) {
          let id = obj.id;
          ids.push(id);
        }
      });
      setSecondaryIdsList(ids);
      setValues({
        app: NotificationsData.app,
        email: NotificationsData.email,
        sms: NotificationsData.sms,
      });
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
      <Typography variant="h6" mb={1}>
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
            values={formik.values.email}
            onChange={(emailList) => setFieldValue("email", emailList)}
          />
        </Grid>

        <Grid item xs={1}>
          <NotificationList
            title={t("sms")}
            values={formik.values.sms}
            onChange={(smsList) => setFieldValue("sms", smsList)}
          />
        </Grid>

        <Grid item xs={1}>
          <NotificationList
            title={t("app")}
            values={formik.values.app}
            onChange={(appList) => setFieldValue("app", appList)}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" mb={1}>
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
          color="success"
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
