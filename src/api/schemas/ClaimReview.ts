import { commonProperties } from './commonProperties'

export default [
  {
    id: 'googleDocs',
    type: 'GoogleDocs',
    url: 'https://developers.google.com/search/docs/appearance/structured-data/factcheck',
    show: false,
  },
  commonProperties.context,
  commonProperties.type('ClaimReview'),
  {
    id: 'author',
    label: 'Author',
    type: 'Group',
    tooltip: 'The publisher of the fact check article, not the publisher of the claim.',
    show: true,
    fields: [
      {
        id: '@type',
        std: 'Person',
        type: 'Hidden',
        required: true,
      },
      {
        ...commonProperties.name,
        tooltip: 'The name of the author.',
      },
      {
        ...commonProperties.url,
        tooltip: 'The URL of the author.',
      },
    ],
  },
  {
    id: 'claimReviewed',
    label: 'Claim reviewed',
    tooltip: 'A short summary of the claim being evaluated. Try to keep this less than 75 characters to minimize wrapping when displayed on a mobile device.',
    required: true,
  },
  {
    id: 'datePublished',
    label: 'Date published',
    type: 'Date',
    tooltip: 'The date when the fact check was published.',
    std: '{{ post.date }}',
  },
  {
    id: 'itemReviewed',
    label: 'Item reviewed',
    type: 'Group',
    required: true,
    tooltip: 'An object describing the claim being made.',
    fields: [
      {
        id: '@type',
        std: 'Claim',
        type: 'Hidden',
        required: true,
      },
      {
        id: 'author',
        label: 'Author',
        tooltip: 'The author of the claim, not the author of the fact check. Don\'t include the author property if the claim doesn\'t have an author.',
        std: '{{ schemas.organization }}',
        show: true,
      },
      {
        id: 'appearance',
        label: 'Appearance',
        required: true,
        type: 'Group',
        tooltip: 'Link to or description of the work in which this claim appears.',
        fields: [
          {
            id: '@type',
            std: 'CreativeWork',
            type: 'Hidden',
            required: true,
          },
          {
            ...commonProperties.url,
            required: true,
            tooltip: 'Link to the page or article where this claim appears.',
          },
        ],
      },
    ],
  },
  {
    id: 'reviewRating',
    label: 'Review rating',
    type: 'Group',
    required: true,
    tooltip: 'The assessment of the claim.',
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
        type: 'Number',
        required: true,
        tooltip: 'A numeric rating for this claim, in the range 1-5.',
      },
      {
        id: 'bestRating',
        label: 'Best rating',
        type: 'Number',
        std: '5',
        tooltip: 'The highest value allowed in this rating system.',
      },
      {
        id: 'worstRating',
        label: 'Worst rating',
        type: 'Number',
        std: '1',
        tooltip: 'The lowest value allowed in this rating system.',
      },
      {
        id: 'alternateName',
        label: 'Alternate name',
        tooltip: 'The truthfulness rating as a human-readable short word or phrase.',
      },
    ],
  },
]
