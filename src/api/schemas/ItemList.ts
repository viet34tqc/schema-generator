import { commonProperties } from './commonProperties'

export default [
  {
    id: 'googleDocs',
    type: 'GoogleDocs',
    url: 'https://developers.google.com/search/docs/appearance/structured-data/movie',
    show: false,
  },
  commonProperties.context,
  commonProperties.type('ItemList'),
  {
    label: 'Movie List',
    id: 'itemListElement',
    type: 'Group',
    cloneable: true,
    required: true,
    cloneItemHeading: 'Movie',
    fields: [
      {
        id: '@type',
        std: 'ListItem',
        type: 'Hidden',
        required: true,
      },
      {
        label: 'Position',
        id: 'position',
        required: true,
      },
      {
        id: 'item',
        type: 'Group',
        cloneable: false,
        required: true,
        fields: [
          {
            id: '@type',
            std: 'Movie',
            type: 'Hidden',
            required: true,
          },
          {
            id: 'image',
            label: 'Image',
            type: 'Image',
            cloneable: false,
            required: true,
            tooltip: 'An image that represents the movie.',
          },
          {
            ...commonProperties.name,
            required: true,
            tooltip: 'The name of the movie.',
          },
          {
            id: 'aggregateRating',
            label: 'Aggregate rating',
            type: 'Group',
            fields: [
              {
                id: '@type',
                std: 'AggregateRating',
                type: 'Hidden',
                required: true,
              },
              {
                id: 'ratingValue',
                label: 'Rating value',
                tooltip: 'The rating value.',
              },
              {
                id: 'ratingCount',
                label: 'Rating count',
                tooltip: 'The number of ratings.',
              },
            ],
          },
          {
            id: 'dateCreated',
            label: 'Date created',
            type: 'Date',
            show: true,
            tooltip: 'The date the movie was released in ISO 8601 format.',
            std: '{{ post.date }}',
          },
          {
            id: 'director',
            label: 'Director',
            type: 'Group',
            show: true,
            tooltip: 'The director of the movie.',
            fields: [
              {
                id: '@type',
                std: 'Person',
                type: 'Hidden',
                required: true,
              },
              {
                ...commonProperties.name,
                tooltip: 'The name of the director.',
              },
            ],
          },
          {
            id: 'review',
            label: 'Review',
            type: 'Group',
            fields: [
              {
                id: '@type',
                std: 'Review',
                type: 'Hidden',
                required: true,
              },
              {
                id: 'reviewBody',
                label: 'Review body',
                type: 'Textarea',
                tooltip: 'The review text.',
              },
            ],
          },
          {
            ...commonProperties.url,
            tooltip: 'The link to the movie.',
            std: '{{ post.url }}',
            required: true,
          },
        ],
      },
    ],
  },
]
