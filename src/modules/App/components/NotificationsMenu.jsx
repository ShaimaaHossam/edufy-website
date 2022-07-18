import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  notificationsSelector,
  addNotificationsPage,
  addNewNotification,
  resetNewNotificationsCount,
  setNotificationRead,
} from "../state";

import {
  useLazyGetNotificationsQuery,
  useLazyMarkNotificationReadQuery,
} from "../../../redux/services/general";

import { useTranslation } from "react-i18next";

import {
  Box,
  Grid,
  Divider,
  Badge,
  MenuItem,
  ListItemIcon,
  ListSubheader,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { mdiBellRingOutline, mdiRecord } from "@mdi/js";

// import usePusher from "../../../shared/hooks/usePusher";
import Menu from "../../../shared/components/Menu";
import Icon from "../../../shared/components/Icon";
import IconButton from "../../../shared/components/IconButton";

import { NOTIF_EVENTS } from "../../../constants/system";
import { NOTIF_ICONS } from "../../../constants/icons";

import { toTimeZone, dateDistanceToNow } from "../../../helpers/datetime";

// import { notifsReqRes } from "../../../redux/services/notifsData";
// const getNotifications = (page) => {
//   console.log(`FETCHING PAGE ${page}`);
//   return new Promise((res, rej) =>
//     res({
//       meta: { ...notifsReqRes.meta, currentPage: page },
//       data: notifsReqRes.data,
//     })
//   );
// };

const eventURLGeneratorMap = {
  [NOTIF_EVENTS.orderCreated]: ({ id, type }) => `/orders/${type}/${id}`,
  [NOTIF_EVENTS.orderUpdated]: ({ id, type }) => `/orders/${type}/${id}`,
};

function NotificationMenu() {
  const theme = useTheme();
  const {
    t,
    i18n: { language },
  } = useTranslation("app");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { items, lastPage, newItemsCount } = useSelector(notificationsSelector);

  const [getNotifications] = useLazyGetNotificationsQuery();
  const [markNotificationRead] = useLazyMarkNotificationReadQuery();

  // fetch first notifications page
  useEffect(() => {
    getNotifications(1)
      // .unwrap()
      .then(({ data }) =>
        dispatch(addNotificationsPage({ page: 1, items: data }))
      );
  }, [dispatch, getNotifications]);

  // fetch next notifications page on scroll end
  const handleMenuScroll = (e) => {
    const { clientHeight, scrollHeight, scrollTop } = e.target;
    const atBottom = scrollHeight - scrollTop - clientHeight === 0;

    if (!atBottom) return;
    getNotifications(lastPage + 1)
      // .unwrap()
      .then(({ data }) =>
        dispatch(addNotificationsPage({ page: lastPage + 1, items: data }))
      );
  };

  // handling reading a notification
  const handleNotificationClick = (item) => {
    navigate(eventURLGeneratorMap[item.event]?.(item.model));
    !item.been_read &&
      markNotificationRead(item.id)
        .unwrap()
        .then(() => dispatch(setNotificationRead(item.id)));
  };

  // when new items added, reset this flag
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // // real-time subscription
  // useEffect(() => {
  //   const intervalID = setInterval(() => {
  //     const newNotification = {
  //       event: "order_finished",
  //       data: {
  //         id: `real-time_${Date.now()}`,
  //         been_read: false,
  //         type: "orders",
  //         item_id: "xxxx", // issue id for navigation if available
  //         item_name: "1234", // readable name of item like (ticket subject)
  //         created_at: new Date().toUTCString(),
  //         event: "order_finished",
  //       },
  //     };
  //     dispatch(addNewNotification(newNotification.data));
  //   }, 10000);

  //   return () => clearInterval(intervalID);
  // }, [dispatch]);

  return (
    <Badge
      color="error"
      badgeContent={!isMenuOpen ? newItemsCount : null}
      anchorOrigin={{
        vertical: "top",
        horizontal: theme.direction === "ltr" ? "right" : "left",
      }}
    >
      <Menu
        label="notifications"
        menuWidth={380}
        menuHeight={500}
        AnchorComponent={IconButton}
        AnchorComponentProps={{
          icon: mdiBellRingOutline,
          size: "large",
          color: "primary",
          variant: "contained",
        }}
        AnchorComponentOpenProps={{
          variant: "outlined",
          sx: {
            backgroundImage:
              "linear-gradient(180deg, #3EE6EF33 0%, #1E7AF033 100%)",
          },
        }}
        onMenuScroll={handleMenuScroll}
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => {
          setIsMenuOpen(false);
          dispatch(resetNewNotificationsCount());
        }}
      >
        <ListSubheader>{t("notifications")}</ListSubheader>

        {items.map((item) => [
          <MenuItem
            key={item.id}
            sx={{
              alignItems: "flex-start",
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              },
            }}
            onClick={() => handleNotificationClick(item)}
          >
            <ListItemIcon>
              <Box
                sx={{
                  p: 1,
                  border: 1,
                  borderRadius: "50%",
                  borderColor: "divider",
                  backgroundColor: "greyScale.100",
                }}
              >
                <Box
                  component="img"
                  alt="notification image"
                  src={NOTIF_ICONS.default}
                  sx={{ display: "block", width: "100%", height: "100%" }}
                />
              </Box>
            </ListItemIcon>

            <Grid container sx={{ pl: 1 }}>
              <Grid item xs={12} container spacing={1}>
                <Grid item xs>
                  <Typography variant="body2" whiteSpace="pre-wrap">
                    {t(item.event, { model: item.model })}
                  </Typography>
                </Grid>

                <Grid item>
                  <Icon
                    icon={mdiRecord}
                    color={item.been_read ? "success" : "warning"}
                  />
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="caption" color="primary.main">
                    {t(item.model_type)}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography variant="caption" color="text.secondary">
                    {dateDistanceToNow(toTimeZone(item.created_at), language)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </MenuItem>,

          <Divider component="li" variant="inset" />,
        ])}
      </Menu>
    </Badge>
  );
}

export default NotificationMenu;
