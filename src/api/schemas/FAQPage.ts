import { commonProperties } from './commonProperties'

export default [
  {
    id: 'googleDocs',
    type: 'GoogleDocs',
    url: 'https://developers.google.com/search/docs/advanced/structured-data/faqpage',
    show: false,
  },
  commonProperties.context,
  commonProperties.type('FAQPage'),
  {
    ...commonProperties.name,
    required: true,
    tooltip: 'The name of the FAQ page.',
  },
  {
    id: 'mainEntity',
    label: 'Questions',
    type: 'Group',
    required: true,
    cloneable: true,
    tooltip: 'The questions and answers on this FAQ page.',
    fields: [
      {
        id: '@type',
        std: 'Question',
        type: 'Hidden',
        required: true,
      },
      {
        id: 'name',
        label: 'Question',
        required: true,
        tooltip: 'The question being asked.',
      },
      {
        id: 'acceptedAnswer',
        label: 'Answer',
        type: 'Group',
        required: true,
        fields: [
          {
            id: '@type',
            std: 'Answer',
            type: 'Hidden',
            required: true,
          },
          {
            id: 'text',
            label: 'Answer text',
            type: 'Textarea',
            required: true,
            tooltip: 'The answer to the question.',
          },
        ],
      },
    ],
  },
]
