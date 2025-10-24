/**
 * Schema Type Definitions
 *
 * Defines all available schema types organized by category.
 * These types represent Schema.org structured data types that can be created.
 */

import { SchemaType } from '@/types/schema'

export const schemaTypes: SchemaType[] = [
  {
    label: 'E-commerce',
    options: {
      Book: 'Book',
      FAQPage: 'FAQ',
      Product: 'Product',
      Review: 'Review snippet',
      SoftwareApplication: 'Software app',
    },
  },
  {
    label: 'Organizations',
    options: {
      HowTo: 'How-to',
      LocalBusiness: 'Local business',
    },
  },
  {
    label: 'Jobs',
    options: {
      EmployerAggregateRating: 'Employer aggregate rating',
      Occupation: 'Estimated salary',
      JobPosting: 'Job posting',
    },
  },
  {
    label: 'Entertainment',
    options: {
      Event: 'Event',
      ImageObject: 'Image license',
      ItemList: 'Movie',
    },
  },
  {
    label: 'News',
    options: {
      Article: 'Article',
      ClaimReview: 'Fact check',
      VideoObject: 'Video',
    },
  },
  {
    label: 'Food and Drink',
    options: {
      Recipe: 'Recipe',
    },
  },
  {
    label: 'Education and Science',
    options: {
      Course: 'Course',
      Dataset: 'Dataset',
      MathSolver: 'Math solver',
      Quiz: 'Practice problems (Quiz)',
      QAPage: 'Q&A',
    },
  },
  {
    label: 'Basic',
    options: {
      WebSite: 'WebSite',
      WebPage: 'WebPage',
      SearchAction: 'SearchAction',
      BreadcrumbList: 'BreadcrumbList',
      Thing: 'Thing',
      Person: 'Person',
      Organization: 'Organization',
      Service: 'Service',
      Offer: 'Offer',
      CustomJsonLd: 'Custom JSON-LD',
    },
  },
  {
    label: 'Additional',
    options: {
      AudioObject: 'Audio',
      ProductGroup: 'Product Group',
    },
  },
]
