import { commonProperties } from './commonProperties'

export default [
  {
    id: 'googleDocs',
    type: 'GoogleDocs',
    url: 'https://developers.google.com/search/docs/advanced/structured-data/article',
    show: false,
  },
  commonProperties.context,
  {
    label: 'Type',
    id: '@type',
    type: 'Select',
    required: true,
    std: 'Article',
    options: {
      Article: 'Article',
      BlogPosting: 'Blog Posting',
      NewsArticle: 'News Article',
      ScholarlyArticle: 'Scholarly Article',
      TechArticle: 'Tech Article',
    },
  },
  {
    ...commonProperties.headline,
    required: true,
  },
  {
    ...commonProperties.description,
    required: true,
  },
  {
    ...commonProperties.image,
    required: true,
  },
  {
    ...commonProperties.author,
    required: true,
  },
  {
    ...commonProperties.publisher,
    required: true,
  },
  {
    ...commonProperties.datePublished,
    required: true,
  },
  commonProperties.dateModified,
  commonProperties.mainEntityOfPage,
  commonProperties.wordCount,
  commonProperties.inLanguage,
  commonProperties.keywords,
  commonProperties.about,
  commonProperties.mentions,
  {
    id: 'articleSection',
    label: 'Article section',
    tooltip: 'Articles may belong to one or more sections in a magazine or newspaper.',
  },
  {
    id: 'articleBody',
    label: 'Article body',
    type: 'Textarea',
    std: '{{ post.content }}',
    tooltip: 'The actual body of the article.',
  },
]
