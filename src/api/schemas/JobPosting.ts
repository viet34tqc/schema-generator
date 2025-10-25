import { commonProperties } from './commonProperties'

export default [
  {
    id: 'googleDocs',
    type: 'GoogleDocs',
    url: 'https://developers.google.com/search/docs/advanced/structured-data/job-posting',
    show: false,
  },
  commonProperties.context,
  commonProperties.type('JobPosting'),
  {
    id: 'title',
    label: 'Title',
    required: true,
    tooltip: 'The title of the job (not the title of the posting).',
  },
  {
    ...commonProperties.description,
    required: true,
    tooltip: 'A description of the job.',
  },
  // TODO: Add more job posting specific fields
]
