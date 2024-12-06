/* eslint-disable no-restricted-properties */

const appPort = process.env.NEXT_PUBLIC_APP_PORT;
const appSchema = process.env.NEXT_PUBLIC_APP_PROTOCOL;
const appHost = process.env.NEXT_PUBLIC_APP_HOST;
const baseUrl = [
  appSchema || 'https',
  '://',
  appHost,
  appPort && ':' + appPort,
].filter(Boolean).join('');
const isDev = process.env.NEXT_PUBLIC_APP_ENV === 'development';

const app = Object.freeze({
  isDev,
  protocol: appSchema,
  host: appHost,
  port: appPort,
  baseUrl,
  useProxy: process.env.NEXT_PUBLIC_USE_NEXT_JS_PROXY === 'true',
});

export default app;
