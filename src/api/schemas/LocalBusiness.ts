import { commonProperties } from './commonProperties';

export default [
  {
    id: 'googleDocs',
    type: 'GoogleDocs',
    url: 'https://developers.google.com/search/docs/advanced/structured-data/local-business',
    show: true,
  },
  commonProperties.context,
  commonProperties.type('LocalBusiness'),
  commonProperties.id,
  {
    ...commonProperties.name,
    required: true,
    tooltip: 'The name of the business.',
  },
  // TODO: Add more local business specific fields
];
