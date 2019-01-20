const { PHASE_PRODUCTION_SERVER } =
  process.env.NODE_ENV === 'development'
    ? {}
    : !process.env.NOW_REGION
    ? require('next/constants')
    : require('next-server/constants');

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    // Config used to run in production.
    return {
      target: 'serverless',
    };
  }

  const withTypescript = require('@zeit/next-typescript');
  const withCss = require('@zeit/next-css');

  return withTypescript(withCss());
};
