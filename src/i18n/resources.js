import fallback from "./fallback";
import feedback from "./feedback";
import validations from "./validations";

import app from "../modules/App/locales";

const resources = {
  ar: {
    fallback: fallback.ar,
    feedback: feedback.ar,
    validations: validations.ar,

    app: app.ar,
  },
  en: {
    fallback: fallback.en,
    feedback: feedback.en,
    validations: validations.en,

    app: app.en,
  },
};

export default resources;
