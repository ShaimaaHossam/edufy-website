import { useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import { authSelector } from "../../redux/slices/auth";

import Pusher from "pusher-js";

import { PUSHER_CONFIGS } from "../../config";

const { app_cluster, app_key, auth_endpoint } = PUSHER_CONFIGS;

/**
 * @callback onMessageCallback
 * @param {string} type - message type
 * @param {Object} data - message data
 */
/**
 * Custom hook that connects to real-time backend with pusher
 * @param {string} channel - realtime channel to listenon
 * @param {onMessageCallback} onMessage - new message callback
 */
function usePusher(channel, onMessage) {
  const {
    token,
    company: { id: companyID },
  } = useSelector(authSelector);

  const onMessageRef = useRef(onMessage);
  useEffect(() => {
    const pusher = new Pusher(app_key, {
      forceTLS: true,
      cluster: app_cluster,
      authEndpoint: auth_endpoint,
      auth: { headers: { Authorization: `Bearer ${token}` } },
    });

    pusher.subscribe(`${companyID}/${channel}`);
    channel.bind_global(onMessageRef.current);

    return pusher.disconnect;
  }, [token, companyID, channel]);
}

export default usePusher;
