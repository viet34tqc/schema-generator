import { commonProperties } from './commonProperties'

export default [
  {
    id: 'googleDocs',
    type: 'GoogleDocs',
    url: 'https://developers.google.com/search/docs/advanced/structured-data/software-app',
    show: false,
  },
  commonProperties.context,
  commonProperties.type('SoftwareApplication'),
  // TODO: Add software application specific fields
]
