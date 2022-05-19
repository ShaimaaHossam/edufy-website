export const API_URL = process.env.REACT_APP_APIBASEURL;

export const DEBUG_ENABLED =
  process.env.REACT_APP_ENV === "DEVELOPMENT" ||
  process.env.REACT_APP_ENV === "STAGE";

export const IS_LIVE = process.env.REACT_APP_ENV === "PRODUCTION";
