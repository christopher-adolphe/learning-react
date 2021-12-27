import Raven from 'raven-js';

function init() {
  Raven.config('https://c75342b9bc2149eca2b3dc56155a44fc@o1099728.ingest.sentry.io/6124497', {
    release: 1-0-0,
    environment: 'development-test'
  }).install();
}

function log(error) {
  Raven.captureException(error);
}

export default {
  init,
  log
};
