import fallback from "./fallback";
import feedback from "./feedback";

import app from "../modules/App/locales";
import auth from "../modules/Auth/locales";

const resources = {
  ar: {
    fallback: fallback.ar,
    feedback: feedback.ar,

    app: app.ar,
    auth: auth.ar,
  },
  en: {
    fallback: fallback.en,
    feedback: feedback.en,

    app: app.en,
    auth: auth.en,
  },
};

export default resources;
