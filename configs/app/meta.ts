/* eslint-disable no-restricted-properties */
import app from './app';
import { getExternalAssetFilePath } from './utils';

const defaultImageUrl = '/static/og_placeholder.png';

const meta = Object.freeze({
  promoteBlockscoutInTitle: process.env.NEXT_PUBLIC_PROMOTE_BLOCKSCOUT_IN_TITLE === 'false' ? false : true,
  og: {
    description: process.env.NEXT_PUBLIC_OG_DESCRIPTION || '',
    imageUrl: app.baseUrl + (getExternalAssetFilePath('NEXT_PUBLIC_OG_IMAGE_URL') || defaultImageUrl),
    enhancedDataEnabled: process.env.NEXT_PUBLIC_OG_ENHANCED_DATA_ENABLED === 'true',
  },
  seo: {
    enhancedDataEnabled: process.env.NEXT_PUBLIC_SEO_ENHANCED_DATA_ENABLED === 'true',
  },
});

export default meta;
