// Schema field definitions based on the actual PHP schema types
// This replaces the PHP schema type definitions from src/SchemaTypes

export const schemaFieldDefinitions = {
  Article: [
    {
      id: 'googleDocs',
      type: 'GoogleDocs',
      url: 'https://developers.google.com/search/docs/advanced/structured-data/article',
      show: true,
    },
    {
      label: 'Type',
      id: '@type',
      type: 'Select',
      required: true,
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
      std: 'Article',
    },
    {
      label: 'Name',
      id: 'name',
      type: 'Text',
      std: '{{ post.title }}',
      tooltip: 'The name of the article.',
    },
    {
      label: 'URL',
      id: 'url',
      type: 'Text',
      required: true,
      std: '{{ post.url }}',
    },
    {
      label: 'Headline',
      id: 'headline',
      type: 'Text',
      required: true,
      tooltip:
        'The headline of the article. Headlines should not exceed 110 characters.',
      std: '{{ post.title }}',
    },
    {
      id: 'description',
      label: 'Description',
      type: 'Textarea',
      std: '{{ post.content }}',
      tooltip: 'A description of the content.',
      show: true,
    },
    {
      id: 'author',
      label: 'Author',
      tooltip: 'The author of the content.',
      std: '{{ schemas.person }}',
      required: true,
    },
    {
      id: 'datePublished',
      label: 'Published date',
      type: 'Date',
      required: true,
      tooltip:
        'The date and time the article was most recently modified, in ISO 8601 format',
      std: '{{ post.date }}',
    },
    {
      id: 'dateModified',
      label: 'Modified date',
      type: 'Date',
      tooltip:
        'The date and time the article was first published, in ISO 8601 format',
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
      id: 'image',
      label: 'Image',
      std: ['{{ post.thumbnail }}'],
      type: 'Image',
      cloneable: true,
      show: true,
    },
    {
      id: 'publisher',
      label: 'Publisher',
      tooltip: 'The publisher of the creative work.',
      std: '{{ schemas.organization }}',
      required: true,
    },
  ],

  Product: [
    {
      id: 'googleDocs',
      type: 'GoogleDocs',
      url: 'https://developers.google.com/search/docs/advanced/structured-data/product',
      show: true,
    },
    {
      label: 'Name',
      id: 'name',
      type: 'Text',
      required: true,
      tooltip: 'The name of the product',
      std: '{{ post.title }}',
    },
    {
      id: 'description',
      label: 'Description',
      type: 'Textarea',
      std: '{{ post.content }}',
      show: true,
      tooltip: 'The product description',
    },
    {
      label: 'Brand name',
      id: 'brand',
      show: true,
      tooltip: 'The brand of the product',
      type: 'Group',
      fields: [
        {
          id: '@type',
          std: 'Brand',
          type: 'Hidden',
          required: true,
        },
        {
          id: 'name',
          std: '{{ site.title }}',
          show: true,
        },
      ],
    },
    {
      id: 'url',
      label: 'URL',
      show: true,
      tooltip: 'The URL of the product',
      std: '{{ post.url }}',
    },
    {
      label: 'SKU',
      id: 'sku',
      show: true,
      std: '{{ product.sku }}',
      tooltip:
        'The Stock Keeping Unit (SKU), i.e. a merchant-specific identifier for a product or service, or the product to which the offer refers.',
    },
    {
      id: 'image',
      label: 'Image',
      type: 'Image',
      cloneable: true,
      show: true,
      tooltip: 'The URL of a product photo',
      std: ['{{ post.thumbnail }}'],
    },
    {
      id: 'offers',
      type: 'Group',
      label: 'Offers',
      show: true,
      fields: [
        {
          id: '@type',
          label: 'Type',
          type: 'DataList',
          required: true,
          std: 'Offer',
          dependant: true,
          placeholder: 'None',
          options: {
            Offer: 'Offer',
            AggregateOffer: 'Aggregate Offer',
          },
        },
        {
          id: 'price',
          label: 'Price',
          required: true,
          tooltip: 'The offer price of a product',
          dependency: '[@type]:Offer',
          std: '{{ product.price }}',
        },
        {
          id: 'priceCurrency',
          label: 'Price currency',
          std: '{{ product.currency }}',
          required: true,
        },
        {
          id: 'priceValidUntil',
          label: 'Price valid until',
          type: 'Date',
          tooltip:
            'The date (in ISO 8601 date format) after which the price will no longer be available',
          dependency: '[@type]:Offer',
          std: '{{ product.sale_to }}',
        },
        {
          id: 'availability',
          label: 'Availability',
          type: 'DataList',
          show: true,
          tooltip: 'The possible product availability options',
          dependency: '[@type]:Offer',
          std: '{{ product.stock }}',
          options: {
            'https://schema.org/Discontinued': 'Discontinued',
            'https://schema.org/InStock': 'In stock',
            'https://schema.org/InStoreOnly': 'In store only',
            'https://schema.org/LimitedAvailability': 'Limited availability',
            'https://schema.org/OnlineOnly': 'Online only',
            'https://schema.org/OutOfStock': 'Out of stock',
            'https://schema.org/PreOrder': 'Pre order',
            'https://schema.org/PreSale': 'Pre sale',
            'https://schema.org/SoldOut': 'Sold out',
          },
        },
      ],
    },
  ],

  Organization: [
    {
      label: 'Name',
      id: 'name',
      type: 'Text',
      required: true,
      std: '{{ site.name }}',
      tooltip: 'The name of the organization.',
    },
    {
      id: 'url',
      label: 'URL',
      type: 'Text',
      std: '{{ site.url }}',
    },
    {
      id: 'description',
      label: 'Description',
      type: 'Textarea',
      std: '{{ post.content }}',
      show: true,
    },
    {
      id: 'image',
      label: 'Image',
      std: ['{{ post.thumbnail }}'],
      type: 'Image',
      cloneable: true,
    },
  ],

  WebSite: [
    {
      label: 'Name',
      id: 'name',
      type: 'Text',
      required: true,
      std: '{{ site.name }}',
    },
    {
      id: 'url',
      label: 'URL',
      type: 'Text',
      std: '{{ site.url }}',
    },
    {
      id: 'description',
      label: 'Description',
      type: 'Textarea',
      std: '{{ post.content }}',
      show: true,
    },
    {
      id: 'potentialAction',
      label: 'Search Action',
      type: 'Group',
      show: true,
      fields: [
        {
          id: '@type',
          type: 'Hidden',
          std: 'SearchAction',
        },
        {
          id: 'target',
          label: 'Search URL',
          type: 'Text',
          std: '{{ site.url }}/?s={search_term_string}',
          tooltip: 'The search URL pattern.',
        },
        {
          id: 'query-input',
          label: 'Query Input',
          type: 'Text',
          std: 'required name=search_term_string',
          tooltip: 'The query input specification.',
        },
      ],
    },
  ],

  Person: [
    {
      label: 'Name',
      id: 'name',
      required: true,
      std: '{{ author.display_name }}',
    },
  ],

  CustomJsonLd: [
    {
      type: 'Textarea',
      id: 'code',
      rows: 10,
      label: 'JSON-LD code',
      required: true,
      tooltip:
        'Enter a valid JSON-LD code for a schema. You can insert dynamic variables if needed.',
    },
  ],

  // Schema types with no editable properties
  SearchAction: [],
  BreadcrumbList: [],

  // Add more schema types as needed
  WebPage: [
    {
      label: 'Name',
      id: 'name',
      std: '{{ post.title }}',
    },
    {
      id: 'url',
      label: 'URL',
      std: '{{ post.url }}',
    },
    {
      id: 'description',
      label: 'Description',
      type: 'Textarea',
      std: '{{ post.content }}',
      show: true,
    },
  ],

  Thing: [
    {
      label: 'Name',
      id: 'name',
      std: '{{ post.title }}',
    },
    {
      id: 'description',
      label: 'Description',
      type: 'Textarea',
      std: '{{ post.content }}',
      show: true,
    },
    {
      id: 'image',
      label: 'Image',
      std: ['{{ post.thumbnail }}'],
      type: 'Image',
      cloneable: true,
    },
    {
      id: 'url',
      label: 'URL',
      std: '{{ post.url }}',
    },
  ],

  Service: [
    {
      label: 'Name',
      id: 'name',
      required: true,
      std: '{{ post.title }}',
    },
    {
      id: 'description',
      label: 'Description',
      type: 'Textarea',
      std: '{{ post.content }}',
      show: true,
    },
    {
      id: 'provider',
      label: 'Provider',
      std: '{{ schemas.organization }}',
    },
  ],

  Offer: [
    {
      id: 'price',
      label: 'Price',
      required: true,
      std: '{{ product.price }}',
    },
    {
      id: 'priceCurrency',
      label: 'Price currency',
      std: 'USD',
      required: true,
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
};
