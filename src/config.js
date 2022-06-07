export const API_URL = process.env.REACT_APP_APIBASEURL;

export const DEBUG_ENABLED =
  process.env.REACT_APP_ENV === "DEVELOPMENT" ||
  process.env.REACT_APP_ENV === "STAGE";

export const IS_PROD = process.env.REACT_APP_ENV === "PRODUCTION";
export const IS_STAG = process.env.REACT_APP_ENV === "STAGE";

export const SENTRY_KEY = process.env.REACT_APP_SENTRY_KEY;
