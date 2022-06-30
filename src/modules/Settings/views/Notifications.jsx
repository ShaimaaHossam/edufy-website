import { useEffect, useState, useRef } from "react";

import { useFormik } from "formik";

import { useSelector, useDispatch } from "react-redux";

import usePermissions from "../../../shared/hooks/usePermissions";

import { useTranslation } from "react-i18next";

import {
  clearState,
  getNotifications,
  getSecondaryContcat,
  updateNotification,
  settingsSelector,
} from "../../../redux/slices/settings";

import { Grid, Typography, Button, Paper } from "@mui/material";

import NotificationList from "../components/NotificationList";
import Select from "../components/SecondaryContactSelect";
import Dialog from "../../../shared/components/Dialog";

function Notifications() {
  const { t } = useTranslation("settings");

  const settingPerms = usePermissions("setting");

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
    <Grid container spacing={3}>
      <Grid item>
        <Typography component="h1" variant="h5">
          {t("notifications")}
        </Typography>
      </Grid>
      <Grid item>
        <Paper sx={{ p: 5 }}>
          <Grid
            item
            container
            columnSpacing={2}
            rowSpacing={3}
            xs={8}
            margin="auto"
          >
            <Grid item container>
              <Grid item xs={12}>
                <Typography component="h2" variant="h5" mb={1}>
                  {t("notificationsSummary")}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="p" color="text.secondary">
                  {t("summaryLabel")}
                </Typography>
              </Grid>
            </Grid>

            <Grid item container justifyContent="space-between">
              <Grid item container xs={5}>
                <Grid item>
                  <Typography component="h3" variant="h6">
                    {t("summary")}
                  </Typography>
                </Grid>

                {notificationsMessages.map((obj) => {
                  return (
                    <Grid item key={obj.id} xs={12} mt={2}>
                      <Typography variant="p">{obj.message}</Typography>
                    </Grid>
                  );
                })}
              </Grid>

              <Grid item container columnSpacing={5} xs={5}>
                <Grid item>
                  <NotificationList
                    title={t("email")}
                    values={formik.values.email}
                    onChange={(emailList) => setFieldValue("email", emailList)}
                  />
                </Grid>

                <Grid item>
                  <NotificationList
                    title={t("sms")}
                    values={formik.values.sms}
                    onChange={(smsList) => setFieldValue("sms", smsList)}
                  />
                </Grid>

                <Grid item>
                  <NotificationList
                    title={t("app")}
                    values={formik.values.app}
                    onChange={(appList) => setFieldValue("app", appList)}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item container>
              <Grid item>
                <Typography component="h2" variant="h6" mb={1}>
                  {t("contactNotification")}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="p" color="text.secondary">
                  {t("contactNotificationLabel")}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Select
                  title={t("contact")}
                  values={userList}
                  setٍٍSecondaryist={setٍٍSecondaryist}
                />
              </Grid>
            </Grid>

            {settingPerms.update && (
              <Grid item container justifyContent="flex-end">
                <Grid item>
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
                </Grid>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Notifications;
