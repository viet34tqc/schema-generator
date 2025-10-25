import { commonProperties } from './commonProperties'

export default [
  commonProperties.context,
  commonProperties.type('WebSite'),
  {
    id: '@id',
    type: 'Hidden',
    required: true,
  },
  {
    ...commonProperties.name,
    required: true,
    tooltip: 'The name of the website.',
  },
  {
    id: 'author',
    label: 'Author',
    tooltip: 'The author of the website.',
  },
  {
    id: 'about',
    label: 'About',
    tooltip: 'The subject matter of the content.',
    type: 'Group',
    fields: [
      {
        id: '@type',
        std: 'Thing',
        type: 'Hidden',
        required: true,
      },
      {
        id: 'name',
        required: true,
      },
      {
        ...commonProperties.description,
        tooltip: 'A description of the item.',
      },
      {
        ...commonProperties.url,
        tooltip: 'URL of the item.',
      },
    ],
  },
  {
    id: 'abstract',
    label: 'Abstract',
    tooltip: 'An abstract is a short description that summarizes the website.',
  },
  {
    ...commonProperties.url,
    required: true,
    std: '{{ site.url }}',
  },
]
