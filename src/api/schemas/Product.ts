import { commonProperties } from './commonProperties'

export default [
  {
    id: 'googleDocs',
    type: 'GoogleDocs',
    url: 'https://developers.google.com/search/docs/advanced/structured-data/product',
    show: false,
  },
  commonProperties.context,
  commonProperties.type('Product'),
  {
    ...commonProperties.name,
    required: true,
    tooltip: 'The name of the product.',
  },
  {
    ...commonProperties.description,
    required: true,
    tooltip: 'A description of the product.',
  },
  {
    ...commonProperties.image,
    required: true,
    tooltip: 'An image of the product.',
  },
  {
    id: 'brand',
    label: 'Brand',
    type: 'Group',
    tooltip: 'The brand of the product.',
    fields: [
      {
        id: '@type',
        std: 'Brand',
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
  {
    id: 'sku',
    label: 'SKU',
    tooltip:
      'The Stock Keeping Unit (SKU), i.e. a merchant-specific identifier for a product or service.',
  },
  {
    id: 'mpn',
    label: 'MPN',
    tooltip: 'The Manufacturer Part Number (MPN) of the product.',
  },
  {
    id: 'gtin',
    label: 'GTIN',
    tooltip: 'A Global Trade Item Number (GTIN).',
  },
  {
    id: 'offers',
    label: 'Offers',
    type: 'Group',
    required: true,
    cloneable: true,
    tooltip: 'An offer to provide this product.',
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
        tooltip: 'The offer price of a product.',
      },
      {
        id: 'priceCurrency',
        label: 'Price currency',
        std: 'USD',
        required: true,
        tooltip: 'The currency used to describe the product price.',
      },
      {
        id: 'priceValidUntil',
        label: 'Price valid until',
        type: 'Date',
        tooltip: 'The date after which the price is no longer available.',
      },
      {
        id: 'availability',
        label: 'Availability',
        type: 'DataList',
        required: true,
        std: 'https://schema.org/InStock',
        options: {
          'https://schema.org/InStock': 'In stock',
          'https://schema.org/OutOfStock': 'Out of stock',
          'https://schema.org/PreOrder': 'Pre order',
        },
      },
      {
        id: 'url',
        label: 'URL',
        tooltip: 'URL of the product offer.',
      },
      {
        id: 'seller',
        label: 'Seller',
        type: 'Group',
        tooltip: 'An entity which offers products or services.',
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
        ],
      },
    ],
  },
  {
    id: 'aggregateRating',
    label: 'Aggregate rating',
    type: 'Group',
    tooltip: 'The overall rating, based on a collection of reviews or ratings.',
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
        required: true,
        tooltip: 'The rating for the content.',
      },
      {
        id: 'bestRating',
        label: 'Best rating',
        std: '5',
        tooltip: 'The highest value allowed in this rating system.',
      },
      {
        id: 'worstRating',
        label: 'Worst rating',
        std: '1',
        tooltip: 'The lowest value allowed in this rating system.',
      },
      {
        id: 'ratingCount',
        label: 'Rating count',
        tooltip: 'The count of total number of ratings.',
      },
      {
        id: 'reviewCount',
        label: 'Review count',
        tooltip: 'The count of total number of reviews.',
      },
    ],
  },
  {
    id: 'review',
    label: 'Reviews',
    type: 'Group',
    cloneable: true,
    tooltip: 'A review of the product.',
    fields: [
      {
        id: '@type',
        std: 'Review',
        type: 'Hidden',
        required: true,
      },
      {
        id: 'reviewRating',
        label: 'Review rating',
        type: 'Group',
        required: true,
        fields: [
          {
            id: '@type',
            std: 'Rating',
            type: 'Hidden',
            required: true,
          },
          {
            id: 'ratingValue',
            label: 'Rating value',
            required: true,
          },
          {
            id: 'bestRating',
            label: 'Best rating',
            std: '5',
          },
          {
            id: 'worstRating',
            label: 'Worst rating',
            std: '1',
          },
        ],
      },
      {
        id: 'author',
        label: 'Author',
        type: 'Group',
        required: true,
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
      {
        id: 'reviewBody',
        label: 'Review body',
        type: 'Textarea',
        tooltip: 'The actual body of the review.',
      },
    ],
  },
]
