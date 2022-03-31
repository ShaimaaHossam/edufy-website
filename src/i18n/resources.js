import fallback from "./fallback";
import feedback from "./feedback";
import validations from "./validations";

const resources = {
  ar: {
    fallback: fallback.ar,
    feedback: feedback.ar,
    validations: validations.ar,
  },
  en: {
    fallback: fallback.en,
    feedback: feedback.en,
    validations: validations.en,
  },
};

export default resources;
