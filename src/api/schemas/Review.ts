import { commonProperties } from './commonProperties';

export default [
  {
    id: 'googleDocs',
    type: 'GoogleDocs',
    url: 'https://developers.google.com/search/docs/advanced/structured-data/review-snippet',
    show: true,
  },
  commonProperties.context,
  commonProperties.type('Review'),
  commonProperties.id,
  // TODO: Add review specific fields
];
