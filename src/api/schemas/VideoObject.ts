import { commonProperties } from './commonProperties';

export default [
  {
    id: 'googleDocs',
    type: 'GoogleDocs',
    url: 'https://developers.google.com/search/docs/advanced/structured-data/video',
    show: true,
  },
  commonProperties.context,
  commonProperties.type('VideoObject'),
  commonProperties.id,
  // TODO: Add video object specific fields
];
