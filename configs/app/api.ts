/* eslint-disable no-restricted-properties */
import stripTrailingSlash from 'lib/stripTrailingSlash';

const apiHost = process.env.NEXT_PUBLIC_API_HOST;
const apiSchema = process.env.NEXT_PUBLIC_API_PROTOCOL || 'https';
const apiPort = process.env.NEXT_PUBLIC_API_PORT;
const apiEndpoint = [
  apiSchema || 'https',
  '://',
  apiHost,
  apiPort && ':' + apiPort,
].filter(Boolean).join('');

const socketSchema = process.env.NEXT_PUBLIC_API_WEBSOCKET_PROTOCOL || 'wss';
const socketEndpoint = [
  socketSchema,
  '://',
  apiHost,
  apiPort && ':' + apiPort,
].filter(Boolean).join('');

const api = Object.freeze({
  host: apiHost,
  protocol: apiSchema,
  port: apiPort,
  endpoint: apiEndpoint,
  socket: socketEndpoint,
  basePath: stripTrailingSlash(process.env.NEXT_PUBLIC_API_BASE_PATH || ''),
});

export default api;
