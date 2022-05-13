const stage = process.env.environment || 'production';
console.log("stage", stage);
const { parsed: envVariables } = require('dotenv').config({
  path: `./src/environments/${stage}.env`,
});
console.log("envVariables", envVariables);

module.exports = {
  reactStrictMode: true,
  env: {
    ...envVariables,
    ENVIRONMENT: process.env.environment,
  }
}
