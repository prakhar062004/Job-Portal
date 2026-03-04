// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"
Sentry.init({
  dsn: "https://691039f227143d2e95d6b2bdeb5f86c8@o4510982084755456.ingest.us.sentry.io/4510982091833344",
  integrations: [Sentry.mongooseIntegration()],
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});