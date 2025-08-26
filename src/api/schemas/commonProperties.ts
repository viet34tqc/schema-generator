// Common schema properties used across multiple schema types
export const commonProperties = {
  context: {
    id: '@context',
    std: 'https://schema.org',
    type: 'Hidden',
    required: true,
  },

  type: (schemaType: string) => ({
    id: '@type',
    std: schemaType,
    type: 'Hidden',
    required: true,
  }),

  id: {
    label: 'ID',
    id: '@id',
    std: '{{ post.url }}',
    tooltip: 'A unique identifier for the item.',
    type: 'Hidden',
  },

  name: {
    label: 'Name',
    id: 'name',
    std: '{{ post.title }}',
    tooltip: 'The name of the item.',
  },

  description: {
    label: 'Description',
    id: 'description',
    type: 'Textarea',
    std: '{{ post.excerpt }}',
    tooltip: 'A description of the item.',
  },

  url: {
    label: 'URL',
    id: 'url',
    std: '{{ post.url }}',
    tooltip: 'URL of the item.',
  },

  image: {
    label: 'Image',
    id: 'image',
    type: 'Image',
    std: '{{ post.thumbnail }}',
    cloneable: true,
    tooltip: 'An image of the item.',
  },

  author: {
    label: 'Author',
    id: 'author',
    type: 'Group',
    tooltip: 'The author of this content.',
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
        std: '{{ author.display_name }}',
        required: true,
      },
      {
        id: 'url',
        label: 'URL',
        std: '{{ author.url }}',
      },
    ],
  },

  datePublished: {
    label: 'Date published',
    id: 'datePublished',
    type: 'Date',
    std: '{{ post.date }}',
    tooltip: 'Date of first publication.',
  },

  dateModified: {
    label: 'Date modified',
    id: 'dateModified',
    type: 'Date',
    std: '{{ post.modified }}',
    tooltip: 'The date on which the item was most recently modified.',
  },

  publisher: {
    label: 'Publisher',
    id: 'publisher',
    type: 'Group',
    tooltip: 'The publisher of the content.',
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
        std: '{{ site.name }}',
        required: true,
      },
      {
        id: 'logo',
        label: 'Logo',
        type: 'Image',
        std: '{{ site.logo }}',
      },
    ],
  },

  mainEntityOfPage: {
    label: 'Main entity of page',
    id: 'mainEntityOfPage',
    type: 'Group',
    tooltip: 'Indicates a page for which this thing is the main entity being described.',
    hideGroupTitle: true, // Don't show the group title to avoid duplication
    fields: [
      {
        id: '@type',
        std: 'WebPage',
        type: 'Hidden',
        required: true,
      },
      {
        id: '@id',
        label: 'Main entity of page',
        std: '{{ post.url }}',
        required: true,
      },
    ],
  },

  headline: {
    label: 'Headline',
    id: 'headline',
    std: '{{ post.title }}',
    tooltip: 'Headline of the article.',
  },

  wordCount: {
    label: 'Word count',
    id: 'wordCount',
    std: '{{ post.word_count }}',
    tooltip: 'The number of words in the text of the Article.',
  },

  inLanguage: {
    label: 'In language',
    id: 'inLanguage',
    std: '{{ site.language }}',
    tooltip: 'The language of the content.',
  },

  keywords: {
    label: 'Keywords',
    id: 'keywords',
    std: '{{ post.tags }}',
    tooltip: 'Keywords or tags used to describe this content.',
  },

  about: {
    label: 'About',
    id: 'about',
    type: 'Group',
    tooltip: 'The subject matter of the content.',
    fields: [
      {
        id: '@type',
        std: 'Thing',
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

  mentions: {
    label: 'Mentions',
    id: 'mentions',
    type: 'Group',
    cloneable: true,
    tooltip: 'Indicates that the content mentions the topic.',
    fields: [
      {
        id: '@type',
        std: 'Thing',
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
}
