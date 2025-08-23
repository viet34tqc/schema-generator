import { commonProperties } from './commonProperties'

export default [
  {
    id: 'googleDocs',
    type: 'GoogleDocs',
    url: 'https://developers.google.com/search/docs/advanced/structured-data/video',
    show: false,
  },
  commonProperties.context,
  commonProperties.type('VideoObject'),
  // TODO: Add video object specific fields
]
