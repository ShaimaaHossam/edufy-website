import { IS_PROD, IS_STAG, FRESHDESK_KEY } from "../config";

export const initFreshdesk = () => {
  if (!IS_PROD && !IS_STAG) return;
  if (!FRESHDESK_KEY) return;

  function initFreshChat() {
    window.fcWidget.init({
      token: FRESHDESK_KEY,
      host: "https://wchat.freshchat.com",
    });
  }

  function initialize(i, t) {
    let e;
    let result = i.getElementById(t)
      ? initFreshChat()
      : (((e = i.createElement("script")).id = t),
        (e.async = !0),
        (e.src = "https://wchat.freshchat.com/js/widget.js"),
        (e.onload = initFreshChat),
        i.head.appendChild(e));
  }

  function initiateCall() {
    initialize(document, "Freshchat-js-sdk");
  }

  window.addEventListener
    ? window.addEventListener("load", initiateCall, !1)
    : window.attachEvent("load", initiateCall, !1);
};
