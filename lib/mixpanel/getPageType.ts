import type { Route } from 'nextjs-routes';

export const PAGE_TYPE_DICT: Record<Route['pathname'], string> = {
  '/': 'Homepage',
  '/txs': 'Transactions',
  '/txs/kettle/[hash]': 'Kettle transactions',
  '/tx/[hash]': 'Transaction details',
  '/blocks': 'Blocks',
  '/block/[height_or_hash]': 'Block details',
  '/block/countdown': 'Block countdown search',
  '/block/countdown/[height]': 'Block countdown',
  '/accounts': 'Top accounts',
  '/accounts/label/[slug]': 'Addresses search by label',
  '/address/[hash]': 'Address details',
  '/verified-contracts': 'Verified contracts',
  '/contract-verification': 'Contract verification',
  '/address/[hash]/contract-verification': 'Contract verification for address',
  '/tokens': 'Tokens',
  '/token/[hash]': 'Token details',
  '/token/[hash]/instance/[id]': 'Token Instance',
  '/apps': 'DApps',
  '/apps/[id]': 'DApp',
  '/stats': 'Stats',
  '/stats/[id]': 'Stats chart',
  '/api-docs': 'REST API',
  '/graphiql': 'GraphQL',
  '/search-results': 'Search results',
  '/auth/profile': 'Profile',
  '/account/watchlist': 'Watchlist',
  '/account/api-key': 'API keys',
  '/account/custom-abi': 'Custom ABI',
  '/account/tag-address': 'Private tags',
  '/account/verified-addresses': 'Verified addresses',
  '/public-tags/submit': 'Submit public tag',
  '/withdrawals': 'Withdrawals',
  '/visualize/sol2uml': 'Solidity UML diagram',
  '/csv-export': 'Export data to CSV file',
  '/deposits': 'Deposits (L1 > L2)',
  '/output-roots': 'Output roots',
  '/dispute-games': 'Dispute games',
  '/batches': 'Tx batches (L2 blocks)',
  '/batches/[number]': 'L2 tx batch details',
  '/blobs/[hash]': 'Blob details',
  '/ops': 'User operations',
  '/op/[hash]': 'User operation details',
  '/404': '404',
  '/name-domains': 'Domains search and resolve',
  '/name-domains/[name]': 'Domain details',
  '/validators': 'Validators list',
  '/gas-tracker': 'Gas tracker',
  '/mud-worlds': 'MUD worlds',
  '/token-transfers': 'Token transfers',

  // service routes, added only to make typescript happy
  '/login': 'Login',
  '/sprite': 'Sprite',
  '/api/metrics': 'Node API: Prometheus metrics',
  '/api/monitoring/invalid-api-schema': 'Node API: Prometheus metrics',
  '/api/log': 'Node API: Request log',
  '/api/media-type': 'Node API: Media type',
  '/api/proxy': 'Node API: Proxy',
  '/api/csrf': 'Node API: CSRF token',
  '/api/healthz': 'Node API: Health check',
  '/api/config': 'Node API: App config',
  '/api/sprite': 'Node API: SVG sprite content',
};

export default function getPageType(pathname: Route['pathname']) {
  return PAGE_TYPE_DICT[pathname] || 'Unknown page';
}
