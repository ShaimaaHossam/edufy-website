import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

import { IS_PROD, IS_STAG, SENTRY_KEY } from "../config";

export const initSentry = () => {
  if (!IS_PROD && !IS_STAG) return;
  if (!SENTRY_KEY) return;

  Sentry.init({
    dsn: `https://${SENTRY_KEY}@o1277261.ingest.sentry.io/6474687`,
    integrations: [new BrowserTracing()],

    tracesSampleRate: 1.0,
  });
};
