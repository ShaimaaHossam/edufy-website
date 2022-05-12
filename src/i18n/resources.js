import fallback from "./fallback";
import feedback from "./feedback";

import app from "../modules/App/locales";
import auth from "../modules/Auth/locales";
import profiles from "../modules/Profiles/locales";

import dashboard from "../modules/Dashboard/locales";
import properties from "../modules/Properties/locales";
import people from "../modules/People/locales";
import orders from "../modules/Orders/locales";
import accounting from "../modules/Accounting/locales";
import communication from "../modules/Communication/locales";
import services from "../modules/Services/locales";
import help from "../modules/Help/locales";

const resources = {
  ar: {
    fallback: fallback.ar,
    feedback: feedback.ar,

    app: app.ar,
    auth: auth.ar,
    profiles: profiles.ar,

    dashboard: dashboard.ar,
    properties: properties.ar,
    people: people.ar,
    orders: orders.ar,
    accounting: accounting.ar,
    communication: communication.ar,
    services: services.ar,
    help: help.ar,
  },
  en: {
    fallback: fallback.en,
    feedback: feedback.en,

    app: app.en,
    auth: auth.en,
    profiles: profiles.en,

    dashboard: dashboard.en,
    properties: properties.en,
    people: people.en,
    orders: orders.en,
    accounting: accounting.en,
    communication: communication.en,
    services: services.en,
    help: help.en,
  },
};

export default resources;
