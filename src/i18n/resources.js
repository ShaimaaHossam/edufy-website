import fallback from "./fallback";
import feedback from "./feedback";
import validations from "./validations";
import auth from "../modules/Auth/locales";

import app from "../modules/App/locales";

const resources = {
  ar: {
    fallback: fallback.ar,
    feedback: feedback.ar,
    validations: validations.ar,

    app: app.ar,
    auth: auth.ar,
  },
  en: {
    fallback: fallback.en,
    feedback: feedback.en,
    validations: validations.en,

    app: app.en,
    auth: auth.en,
  },
};

export default resources;
