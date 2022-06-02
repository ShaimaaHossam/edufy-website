import { useEffect, useState, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";

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

let notificationsMessages = [
  {
    id: 1,
    message: "Send me a notification when approvals need to be taken.",
  },
  {
    id: 2,
    message: "Send me a notification when property is added by a team member",
  },
  {
    id: 3,
    message: "Send me a notification to remind me about upcoming payments.",
  },
];

function Notifications() {
  const dispatch = useDispatch();
  const { NotificationsData, secondaryContcat, errors, isSuccess } =
    useSelector(settingsSelector);

  const [open, setOpen] = useState(false);

  const [emailList, setEmailList] = useState([]);
  const [smsList, setSmsList] = useState([]);
  const [appList, setAPPList] = useState([]);
  const [userList, setUserList] = useState([]);

  const [secondaryList, setٍٍSecondaryist] = useState({ value: [] });
  const [secondaryIdsList, setSecondaryIdsList] = useState([]);

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
        Notifications
      </Typography>

      <Typography variant="p" color="text.secondary">
        You can customize Notifications received below. each listed notification
        must have at least Email, SMS or Application notifications checked
      </Typography>

      <Grid container spacing={1} margin="auto" mt={5} mb={5}>
        <Grid item container xs={7}>
          <Typography>Notification Summary</Typography>
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
            title="Email"
            values={emailList}
            onChange={(emailList) => setEmailList(emailList)}
          />
        </Grid>

        <Grid item xs={1}>
          <NotificationList
            title="Sms"
            values={smsList}
            onChange={(smsList) => setSmsList(smsList)}
          />
        </Grid>

        <Grid item xs={1}>
          <NotificationList
            title="App"
            values={appList}
            onChange={(appList) => setAPPList(appList)}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" fontWeight="bold" mb={1}>
        Contact Notification
      </Typography>

      <Typography variant="p" color="text.secondary">
        Selecting secondary contacts will enable your notifications to reach the
        contacts you select. if you wish disable this feature,simply leave the
        secondary contact field empty.
      </Typography>

      <Select
        title="Contact"
        values={userList}
        setٍٍSecondaryist={setٍٍSecondaryist}
      />

      <Box textAlign="right" mt={6} mb={4}>
        <Dialog
          title="Are you sure you want to Save changes ?"
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
          Save Changes
        </Button>
      </Box>
    </>
  );
}

export default Notifications;
