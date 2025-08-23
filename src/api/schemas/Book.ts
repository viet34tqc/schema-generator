import { commonProperties } from './commonProperties';

export default [
  {
    id: 'googleDocs',
    type: 'GoogleDocs',
    url: 'https://developers.google.com/search/docs/advanced/structured-data/book',
    show: true,
  },
  commonProperties.context,
  commonProperties.type('Book'),
  {
    ...commonProperties.id,
    tooltip: 'A globally unique ID for the book in URL format. It must be unique to your organization. The ID must be stable and not change over time.',
  },
  {
    ...commonProperties.name,
    required: true,
    tooltip: 'The title of the book.',
  },
  {
    ...commonProperties.author,
    required: true,
    tooltip: 'The author(s) of the book.',
  },
  {
    ...commonProperties.url,
    required: true,
    tooltip: 'The URL on your website where the book is introduced or described.',
  },
  {
    id: 'sameAs',
    label: 'Same as',
    show: true,
    tooltip: 'The URL of a reference page that identifies the book.',
  },
  {
    id: 'workExample',
    label: 'Editions',
    type: 'Group',
    cloneable: true,
    required: true,
    tooltip: 'The edition(s) of the book. There should be at least one edition.',
    fields: [
      {
        id: '@type',
        std: 'Book',
        type: 'Hidden',
        required: true,
      },
      {
        label: '@id',
        id: '@id',
        required: true,
        std: '{{ post.url }}',
      },
      {
        id: 'bookFormat',
        label: 'Book format',
        type: 'DataList',
        required: true,
        std: 'https://schema.org/Hardcover',
        options: {
          'https://schema.org/AudiobookFormat': 'Audiobook format',
          'https://schema.org/EBook': 'E-book',
          'https://schema.org/Hardcover': 'Hard cover',
          'https://schema.org/Paperback': 'Paper back',
        },
      },
      {
        id: 'inLanguage',
        required: true,
        label: 'In language',
        std: 'en',
      },
      {
        id: 'isbn',
        required: true,
        label: 'ISBN',
        tooltip: 'The ISBN-13 of the edition.',
      },
    ],
  },
];
