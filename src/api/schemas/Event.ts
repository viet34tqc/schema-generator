import { commonProperties } from './commonProperties'

export default [
  {
    id: 'googleDocs',
    type: 'GoogleDocs',
    url: 'https://developers.google.com/search/docs/advanced/structured-data/event',
    show: false,
  },
  commonProperties.context,
  commonProperties.type('Event'),
  {
    ...commonProperties.name,
    required: true,
    tooltip: 'The name of the event.',
  },
  {
    ...commonProperties.description,
    required: true,
    tooltip: 'A description of the event.',
  },
  {
    id: 'startDate',
    label: 'Start date',
    type: 'Date',
    required: true,
    tooltip: 'The start date and time of the event.',
  },
  {
    id: 'endDate',
    label: 'End date',
    type: 'Date',
    tooltip: 'The end date and time of the event.',
  },
  {
    id: 'location',
    label: 'Location',
    type: 'Group',
    required: true,
    tooltip: 'The location of the event.',
    fields: [
      {
        id: '@type',
        std: 'Place',
        type: 'Hidden',
        required: true,
      },
      {
        id: 'name',
        label: 'Name',
        required: true,
        tooltip: 'The name of the location.',
      },
      {
        id: 'address',
        label: 'Address',
        required: true,
        tooltip: 'The address of the location.',
        type: 'Group',
        fields: [
          {
            id: '@type',
            std: 'PostalAddress',
            type: 'Hidden',
            required: true,
          },
          {
            id: 'streetAddress',
            label: 'Street address',
          },
          {
            id: 'addressLocality',
            label: 'City',
          },
          {
            id: 'addressRegion',
            label: 'State/Region',
          },
          {
            id: 'postalCode',
            label: 'Postal code',
          },
          {
            id: 'addressCountry',
            label: 'Country',
          },
        ],
      },
    ],
  },
  {
    id: 'organizer',
    label: 'Organizer',
    type: 'Group',
    tooltip: 'An organizer of an Event.',
    fields: [
      {
        id: '@type',
        std: 'Organization',
        type: 'Hidden',
        required: true,
      },
      {
        id: 'name',
        label: 'Name',
        required: true,
      },
      {
        id: 'url',
        label: 'URL',
      },
    ],
  },
  {
    id: 'offers',
    label: 'Offers',
    type: 'Group',
    cloneable: true,
    tooltip: 'An offer to provide this item.',
    fields: [
      {
        id: '@type',
        std: 'Offer',
        type: 'Hidden',
        required: true,
      },
      {
        id: 'price',
        label: 'Price',
        required: true,
      },
      {
        id: 'priceCurrency',
        label: 'Price currency',
        std: 'USD',
        required: true,
      },
      {
        id: 'url',
        label: 'URL',
        tooltip: 'URL where tickets can be purchased.',
      },
      {
        id: 'availability',
        label: 'Availability',
        type: 'DataList',
        std: 'https://schema.org/InStock',
        options: {
          'https://schema.org/InStock': 'In stock',
          'https://schema.org/OutOfStock': 'Out of stock',
          'https://schema.org/PreOrder': 'Pre order',
        },
      },
    ],
  },
  {
    id: 'performer',
    label: 'Performer',
    type: 'Group',
    cloneable: true,
    tooltip: 'A performer at the event.',
    fields: [
      {
        id: '@type',
        std: 'Person',
        type: 'Hidden',
        required: true,
      },
      {
        id: 'name',
        label: 'Name',
        required: true,
      },
    ],
  },
]
