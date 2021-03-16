import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn:
      "https://b755b0a9c7f041cc852f8899b3a29ff3@o528548.ingest.sentry.io/5645956",
    release: "1.0",
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
}

function log(error) {
  // Sentry.captureException(error);
  console.error(error);
}

export default {
  init,
  log,
};
