/* eslint-disable no-restricted-properties */
import type { ContractCodeIde } from 'types/client/contract';
import { NAVIGATION_LINK_IDS, type NavItemExternal, type NavigationLinkId, type NavigationLayout } from 'types/client/navigation';
import { HOME_STATS_WIDGET_IDS, type ChainIndicatorId, type HeroBannerConfig, type HomeStatsWidgetId } from 'types/homepage';
import type { NetworkExplorer } from 'types/networks';
import type { ColorThemeId } from 'types/settings';
import type { FontFamily } from 'types/ui';

import { COLOR_THEMES } from 'lib/settings/colorTheme';

import * as features from './features';
import * as views from './ui/views';
import { getExternalAssetFilePath, parseEnvJson } from './utils';

const hiddenLinks = (() => {
  const parsedValue = parseEnvJson<Array<NavigationLinkId>>(process.env.NEXT_PUBLIC_NAVIGATION_HIDDEN_LINKS) || [];

  if (!Array.isArray(parsedValue)) {
    return undefined;
  }

  const result = NAVIGATION_LINK_IDS.reduce((result, item) => {
    result[item] = parsedValue.includes(item);
    return result;
  }, {} as Record<NavigationLinkId, boolean>);

  return result;
})();

const homePageStats: Array<HomeStatsWidgetId> = (() => {
  const parsedValue = parseEnvJson<Array<HomeStatsWidgetId>>(process.env.NEXT_PUBLIC_HOMEPAGE_STATS);

  if (!Array.isArray(parsedValue)) {
    const rollupFeature = features.rollup;

    if (rollupFeature.isEnabled && [ 'zkEvm', 'zkSync', 'arbitrum' ].includes(rollupFeature.type)) {
      return [ 'latest_batch', 'average_block_time', 'total_txs', 'wallet_addresses', 'gas_tracker' ];
    }

    return [ 'total_blocks', 'average_block_time', 'total_txs', 'wallet_addresses', 'gas_tracker' ];
  }

  return parsedValue.filter((item) => HOME_STATS_WIDGET_IDS.includes(item));
})();

const highlightedRoutes = (() => {
  const parsedValue = parseEnvJson<Array<NavigationLinkId>>(process.env.NEXT_PUBLIC_NAVIGATION_HIGHLIGHTED_ROUTES);
  return Array.isArray(parsedValue) ? parsedValue : [];
})();

const defaultColorTheme = (() => {
  const envValue = process.env.NEXT_PUBLIC_COLOR_THEME_DEFAULT as ColorThemeId | undefined;
  return COLOR_THEMES.find((theme) => theme.id === envValue);
})();

const UI = Object.freeze({
  navigation: {
    logo: {
      'default': 'https://www.sintrop.com/assets/images/logo-chain-light.png',
      dark: 'https://www.sintrop.com/assets/images/logo-chain-dark.png',
    },
    icon: {
      'default': 'https://www.sintrop.com/assets/images/icon-chain.png',
      dark: 'https://www.sintrop.com/assets/images/icon-chain.png',
    },
    hiddenLinks,
    highlightedRoutes,
    otherLinks: parseEnvJson<Array<NavItemExternal>>(process.env.NEXT_PUBLIC_OTHER_LINKS) || [],
    featuredNetworks: getExternalAssetFilePath('NEXT_PUBLIC_FEATURED_NETWORKS'),
    layout: (process.env.NEXT_PUBLIC_NAVIGATION_LAYOUT || 'vertical') as NavigationLayout,
  },
  footer: {
    links: getExternalAssetFilePath('NEXT_PUBLIC_FOOTER_LINKS'),
    frontendVersion: process.env.NEXT_PUBLIC_GIT_TAG,
    frontendCommit: process.env.NEXT_PUBLIC_GIT_COMMIT_SHA,
  },
  homepage: {
    charts: parseEnvJson<Array<ChainIndicatorId>>(process.env.NEXT_PUBLIC_HOMEPAGE_CHARTS) || [],
    stats: homePageStats,
    heroBanner: parseEnvJson<HeroBannerConfig>(process.env.NEXT_PUBLIC_HOMEPAGE_HERO_BANNER_CONFIG),
    // !!! DEPRECATED !!!
    plate: {
      background: process.env.NEXT_PUBLIC_HOMEPAGE_PLATE_BACKGROUND,
      textColor: process.env.NEXT_PUBLIC_HOMEPAGE_PLATE_TEXT_COLOR,
    },
  },
  views,
  indexingAlert: {
    blocks: {
      isHidden: process.env.NEXT_PUBLIC_HIDE_INDEXING_ALERT_BLOCKS === 'true' ? true : false,
    },
    intTxs: {
      isHidden: process.env.NEXT_PUBLIC_HIDE_INDEXING_ALERT_INT_TXS === 'true' ? true : false,
    },
  },
  maintenanceAlert: {
    message: process.env.NEXT_PUBLIC_MAINTENANCE_ALERT_MESSAGE,
  },
  explorers: {
    items: parseEnvJson<Array<NetworkExplorer>>(process.env.NEXT_PUBLIC_NETWORK_EXPLORERS) || [],
  },
  ides: {
    items: parseEnvJson<Array<ContractCodeIde>>(process.env.NEXT_PUBLIC_CONTRACT_CODE_IDES) || [],
  },
  hasContractAuditReports: process.env.NEXT_PUBLIC_HAS_CONTRACT_AUDIT_REPORTS === 'true' ? true : false,
  colorTheme: {
    'default': defaultColorTheme,
  },
  fonts: {
    heading: parseEnvJson<FontFamily>(process.env.NEXT_PUBLIC_FONT_FAMILY_HEADING),
    body: parseEnvJson<FontFamily>(process.env.NEXT_PUBLIC_FONT_FAMILY_BODY),
  },
  maxContentWidth: process.env.NEXT_PUBLIC_MAX_CONTENT_WIDTH_ENABLED === 'false' ? false : true,
});

export default UI;
