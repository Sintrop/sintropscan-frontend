/* eslint-disable no-restricted-properties */
import type { RollupType } from 'types/client/rollup';
import type { NetworkVerificationType, NetworkVerificationTypeEnvs } from 'types/networks';

const DEFAULT_CURRENCY_DECIMALS = 18;

const rollupType = process.env.NEXT_PUBLIC_ROLLUP_TYPE as RollupType;

const verificationType: NetworkVerificationType = (() => {
  if (rollupType === 'arbitrum') {
    return 'posting';
  }
  if (rollupType === 'zkEvm') {
    return 'sequencing';
  }
  return process.env.NEXT_PUBLIC_NETWORK_VERIFICATION_TYPE as NetworkVerificationTypeEnvs || 'mining';
})();

const chain = Object.freeze({
  id: process.env.NEXT_PUBLIC_NETWORK_ID,
  name: process.env.NEXT_PUBLIC_NETWORK_NAME,
  shortName: process.env.NEXT_PUBLIC_NETWORK_SHORT_NAME,
  currency: {
    name: process.env.NEXT_PUBLIC_NETWORK_CURRENCY_NAME,
    weiName: process.env.NEXT_PUBLIC_NETWORK_CURRENCY_WEI_NAME,
    symbol: process.env.NEXT_PUBLIC_NETWORK_CURRENCY_SYMBOL,
    decimals: Number(process.env.NEXT_PUBLIC_NETWORK_CURRENCY_DECIMALS) || DEFAULT_CURRENCY_DECIMALS,
  },
  secondaryCoin: {
    symbol: process.env.NEXT_PUBLIC_NETWORK_SECONDARY_COIN_SYMBOL,
  },
  hasMultipleGasCurrencies: process.env.NEXT_PUBLIC_NETWORK_MULTIPLE_GAS_CURRENCIES === 'true',
  tokenStandard: process.env.NEXT_PUBLIC_NETWORK_TOKEN_STANDARD_NAME || 'ERC',
  rpcUrl: process.env.NEXT_PUBLIC_NETWORK_RPC_URL,
  isTestnet: process.env.NEXT_PUBLIC_IS_TESTNET === 'true',
  verificationType,
});

export default chain;
