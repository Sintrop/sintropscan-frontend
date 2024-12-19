import type { Feature } from './types';

import chain from '../chain';

// eslint-disable-next-line no-restricted-properties
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

const title = 'Blockchain interaction (writing to contract, etc.)';

const config: Feature<{ walletConnect: { projectId: string } }> = (() => {

  if (
    // all chain parameters are required for wagmi provider
    // @wagmi/chains/dist/index.d.ts
    chain.id &&
    chain.name &&
    chain.currency.name &&
    chain.currency.symbol &&
    chain.currency.decimals &&
    chain.rpcUrl &&
    walletConnectProjectId
  ) {
    return Object.freeze({
      title,
      isEnabled: true,
      walletConnect: {
        projectId: walletConnectProjectId,
      },
    });
  }

  return Object.freeze({
    title,
    isEnabled: false,
  });
})();

export default config;
