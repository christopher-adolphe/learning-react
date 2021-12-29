import * as Sentry from '@sentry/browser';
import { Integrations } from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn: "https://0be03db6d60944f6b2a8c68737d9aa33@o1099728.ingest.sentry.io/6125631",
    integrations: [new Integrations.BrowserTracing()],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    release: '1.0.0',
  });
}

function log(error) {
  Sentry.withScope(scope => {
    scope.setExtra('debug', false);
    Sentry.captureException(error);
  });
}

export default {
  init,
  log
};
