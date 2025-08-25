import { commonProperties } from './commonProperties'

export default [
  {
    id: 'googleDocs',
    type: 'GoogleDocs',
    url: 'https://developers.google.com/search/docs/advanced/structured-data/article',
    show: true,
  },
  commonProperties.context,
  {
    label: 'Type',
    id: '@type',
    type: 'Select',
    required: true,
    std: 'Article',
    options: [
      {
        label: 'General',
        options: {
          Article: 'Article',
          AdvertiserContentArticle: 'Advertiser Content Article',
          Report: 'Report',
          SatiricalArticle: 'Satirical Article',
        },
      },
      {
        label: 'News',
        options: {
          NewsArticle: 'News Article',
          AnalysisNewsArticle: 'Analysis News Article',
          AskPublicNewsArticle: 'Ask Public News Article',
          BackgroundNewsArticle: 'Background News Article',
          OpinionNewsArticle: 'Opinion News Article',
          ReportageNewsArticle: 'Reportage News Article',
          ReviewNewsArticle: 'Review News Article',
        },
      },
      {
        label: 'Scholarly',
        options: {
          ScholarlyArticle: 'Scholarly Article',
          MedicalScholarlyArticle: 'Medical Scholarly Article',
        },
      },
      {
        label: 'Social Media',
        options: {
          SocialMediaPosting: 'Social Media Posting',
          BlogPosting: 'Blog Posting',
          LiveBlogPosting: 'Live Blog Posting',
          DiscussionForumPosting: 'Discussion Forum Posting',
        },
      },
      {
        label: 'Tech',
        options: {
          TechArticle: 'Tech Article',
          APIReference: 'API Reference',
        },
      },
    ],
  },
  {
    ...commonProperties.name,
    std: '{{ post.title }}',
    tooltip: 'The name of the article.',
  },
  {
    ...commonProperties.url,
    required: true,
    std: '{{ post.url }}',
  },
  {
    label: 'Headline',
    id: 'headline',
    type: 'Text',
    required: true,
    tooltip: 'The headline of the article. Headlines should not exceed 110 characters.',
    std: '{{ post.title }}',
  },
  {
    ...commonProperties.description,
    tooltip: 'A description of the content.',
  },
  {
    id: 'author',
    label: 'Author',
    tooltip: 'The author of the content.',
    std: '{{ schemas.person }}',
    required: true,
  },
  {
    ...commonProperties.datePublished,
    required: true,
    tooltip: 'The date and time the article was most recently modified, in ISO 8601 format',
    std: '{{ post.date }}',
  },
  {
    ...commonProperties.dateModified,
    tooltip: 'The date and time the article was first published, in ISO 8601 format',
    std: '{{ post.modified_date }}',
  },
  {
    label: 'Comment count',
    id: 'commentCount',
    type: 'Text',
    required: true,
    tooltip: 'The number of comments',
    std: '{{ post.comment_count }}',
  },
  {
    label: 'Word count',
    id: 'wordCount',
    type: 'Text',
    required: true,
    tooltip: 'The number of words in the text of the Article',
    std: '{{ post.word_count }}',
  },
  {
    label: 'Keywords',
    id: 'keywords',
    type: 'Text',
    required: true,
    tooltip:
      'Tags used to describe this content. Multiple entries in a keywords list are typically delimited by commas',
    std: '{{ post.tags }}',
  },
  {
    label: 'Sections',
    id: 'articleSection',
    type: 'Text',
    required: true,
    tooltip:
      'Articles may belong to one or more sections in a magazine or newspaper, such as Sports, Lifestyle, etc',
    std: '{{ post.categories }}',
  },
  {
    ...commonProperties.image,
    show: true,
  },
  {
    id: 'hasPart',
    label: 'Subscription and pay-walled content',
    type: 'Group',
    tooltip: 'Indicates the content that is part of this item.',
    cloneable: true,
    cloneItemHeading: 'Part',
    fields: [
      {
        id: '@type',
        std: 'WebPageElement',
        type: 'Hidden',
        required: true,
      },
      {
        id: 'isAccessibleForFree',
        label: 'Is accessible for free?',
        tooltip: 'Whether the dataset is accessible without payment.',
        type: 'DataList',
        std: 'true',
        options: {
          true: 'Yes',
          false: 'No',
        },
        required: true,
      },
      {
        id: 'cssSelector',
        label: 'CSS selector',
        tooltip: 'Class name around each pay-walled section of your page.',
        required: true,
      },
    ],
  },
  {
    id: 'isAccessibleForFree',
    label: 'Is accessible for free?',
    tooltip: 'Whether the dataset is accessible without payment.',
    type: 'DataList',
    std: 'true',
    options: {
      true: 'Yes',
      false: 'No',
    },
  },
  {
    id: 'isPartOf',
    label: 'Is part of',
    std: '{{ schemas.webpage }}',
    show: true,
  },
  {
    ...commonProperties.mainEntityOfPage,
    tooltip: 'Indicates a page for which the content is the main entity being described.',
    std: '{{ schemas.webpage }}',
    show: true,
  },
  {
    id: 'publisher',
    label: 'Publisher',
    tooltip: 'The publisher of the creative work.',
    std: '{{ schemas.organization }}',
    required: true,
  },
  {
    id: 'speakable',
    label: 'Speakable',
    type: 'Group',
    tooltip:
      'The speakable property works for users in the U.S. that have Google Home devices set to English, and publishers that publish content in English.',
    fields: [
      {
        id: '@type',
        std: 'SpeakableSpecification',
        type: 'Hidden',
        required: true,
      },
      {
        id: 'cssSelector',
        label: 'CSS selector',
        tooltip:
          "Addresses content in the annotated pages (such as class attribute). Use either CSS selector or xPath; don't use both.",
        show: true,
      },
      {
        id: 'xPath',
        label: 'xPath',
        tooltip:
          "Addresses content using xPaths (assuming an XML view of the content). Use either CSS selector or xPath; don't use both.",
        show: true,
      },
    ],
  },
]
