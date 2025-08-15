// Mock data to replace WordPress REST API endpoints

export const schemaTypes = [
  {
    label: 'E-commerce',
    options: {
      'Book': 'Book',
      'FAQPage': 'FAQ',
      'Product': 'Product',
      'Review': 'Review snippet',
      'SoftwareApplication': 'Software app',
    },
  },
  {
    label: 'Organizations',
    options: {
      'HowTo': 'How-to',
      'LocalBusiness': 'Local business',
    },
  },
  {
    label: 'Content',
    options: {
      'Article': 'Article',
      'BlogPosting': 'Blog post',
      'NewsArticle': 'News article',
      'Recipe': 'Recipe',
      'VideoObject': 'Video',
      'ImageObject': 'Image',
      'AudioObject': 'Audio',
      'Event': 'Event',
      'Course': 'Course',
      'JobPosting': 'Job posting',
      'QAPage': 'Q&A page',
    },
  },
  {
    label: 'Basic',
    options: {
      'WebSite': 'WebSite',
      'WebPage': 'WebPage',
      'SearchAction': 'SearchAction',
      'BreadcrumbList': 'BreadcrumbList',
      'Thing': 'Thing',
      'Person': 'Person',
      'Organization': 'Organization',
      'Service': 'Service',
      'Offer': 'Offer',
      'CustomJsonLd': 'Custom JSON-LD',
    },
  },
];

export const variables = [
  {
    label: 'Post',
    options: {
      'post.title': 'Post title',
      'post.ID': 'Post ID',
      'post.excerpt': 'Post excerpt',
      'post.content': 'Post content',
      'post.url': 'Post URL',
      'post.slug': 'Post slug',
      'post.date': 'Post date',
      'post.modified_date': 'Post modified date',
      'post.thumbnail': 'Post thumbnail',
      'post.comment_count': 'Post comment count',
      'post.custom_field': 'Custom field',
    },
  },
  {
    label: 'Author',
    options: {
      'author.name': 'Author name',
      'author.url': 'Author URL',
      'author.bio': 'Author bio',
      'author.avatar': 'Author avatar',
    },
  },
  {
    label: 'Site',
    options: {
      'site.name': 'Site name',
      'site.url': 'Site URL',
      'site.description': 'Site description',
      'site.logo': 'Site logo',
    },
  },
  {
    label: 'Current',
    options: {
      'current.date': 'Current date',
      'current.time': 'Current time',
      'current.year': 'Current year',
      'current.url': 'Current URL',
    },
  },
];

export const locations = {
  'General': {
    label: 'General',
    options: [
      { value: 'general:all', label: 'All pages' },
      { value: 'general:front_page', label: 'Front page' },
      { value: 'general:home', label: 'Blog page' },
      { value: 'general:search', label: 'Search results' },
      { value: 'general:404', label: '404 page' },
    ],
  },
  'Posts': {
    label: 'Posts',
    options: [
      { value: 'post_type:post', label: 'All posts' },
      { value: 'post_type:page', label: 'All pages' },
      { value: 'post:post', label: 'Specific post' },
      { value: 'post:page', label: 'Specific page' },
    ],
  },
  'Archives': {
    label: 'Archives',
    options: [
      { value: 'post_type:archive:post', label: 'Post archive' },
      { value: 'taxonomy:archive:category', label: 'Category archive' },
      { value: 'taxonomy:archive:post_tag', label: 'Tag archive' },
    ],
  },
};

export const metaKeys = [
  { value: '_custom_field_1', label: '_custom_field_1' },
  { value: '_custom_field_2', label: '_custom_field_2' },
  { value: 'product_price', label: 'product_price' },
  { value: 'product_sku', label: 'product_sku' },
  { value: 'event_date', label: 'event_date' },
  { value: 'rating', label: 'rating' },
];

// Default schemas that come pre-installed
export const defaultSchemas = {
  'website_schema': {
    type: 'WebSite',
    location: [
      [{ name: 'general:all', value: 'all', label: 'All pages' }]
    ],
    fields: {
      _label: 'Website Schema',
      name: '{{ site.name }}',
      url: '{{ site.url }}',
      description: '{{ site.description }}',
    },
  },
  'organization_schema': {
    type: 'Organization',
    location: [
      [{ name: 'general:all', value: 'all', label: 'All pages' }]
    ],
    fields: {
      _label: 'Organization Schema',
      name: '{{ site.name }}',
      url: '{{ site.url }}',
      logo: '{{ site.logo }}',
    },
  },
};
