import { commonProperties } from './commonProperties'

export default [
  {
    id: 'googleDocs',
    type: 'GoogleDocs',
    url: 'https://developers.google.com/search/docs/appearance/structured-data/employer-rating',
    show: false,
  },
  commonProperties.context,
  commonProperties.type('EmployerAggregateRating'),
  {
    id: 'itemReviewed',
    label: 'Item reviewed',
    required: true,
    tooltip: 'The organization that is being rated.',
    std: '{{ schemas.organization }}',
  },
  {
    id: 'ratingCount',
    label: 'Rating count',
    tooltip: 'The total number of ratings of the organization on your site.',
    required: true,
  },
  {
    id: 'ratingValue',
    label: 'Rating value',
    tooltip: 'A numerical quality rating for the organization, either a number, fraction, or percentage (for exp. "4", "60%", or "6 / 10").',
    required: true,
  },
  {
    id: 'reviewCount',
    label: 'Review count',
    tooltip: 'Specifies the number of people who provided a review with or without an accompanying rating.',
    required: true,
  },
  {
    id: 'bestRating',
    label: 'Best rating',
    type: 'Select',
    std: '5',
    tooltip: 'The highest value allowed in this rating system.',
    options: {
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
    },
  },
  {
    id: 'worstRating',
    label: 'Worst rating',
    type: 'Select',
    std: '1',
    tooltip: 'The lowest value allowed in this rating system.',
    options: {
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
    },
  },
]
