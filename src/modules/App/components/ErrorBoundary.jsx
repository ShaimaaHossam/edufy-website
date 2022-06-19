import { ErrorBoundary as SentryErrorBoundary } from "@sentry/react";

import CrashFallback from "../../../shared/views/CrashFallback";

function ErrorBoundary({ children }) {
  return (
    <SentryErrorBoundary
      fallback={({ resetError }) => <CrashFallback resetError={resetError} />}
    >
      {children}
    </SentryErrorBoundary>
  );
}

export default ErrorBoundary;
