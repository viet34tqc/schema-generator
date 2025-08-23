import { commonProperties } from './commonProperties'

export default [
  {
    id: 'googleDocs',
    type: 'GoogleDocs',
    url: 'https://developers.google.com/search/docs/advanced/structured-data/how-to',
    show: false,
  },
  commonProperties.context,
  commonProperties.type('HowTo'),
  {
    ...commonProperties.name,
    required: true,
    tooltip: 'The name of the how-to.',
  },
  // TODO: Add more how-to specific fields
]
