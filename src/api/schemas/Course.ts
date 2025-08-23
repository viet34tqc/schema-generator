import { commonProperties } from './commonProperties';

export default [
  {
    id: 'googleDocs',
    type: 'GoogleDocs',
    url: 'https://developers.google.com/search/docs/advanced/structured-data/course',
    show: true,
  },
  commonProperties.context,
  commonProperties.type('Course'),
  commonProperties.id,
  {
    ...commonProperties.name,
    required: true,
    tooltip: 'The title of the course.',
  },
  {
    ...commonProperties.description,
    required: true,
    tooltip: 'A description of the course.',
  },
  // TODO: Add more course-specific fields
];
