/**
 * Default Schemas
 *
 * Pre-configured schemas that are included by default in new installations.
 * These provide common schema types that most websites need.
 */

export const defaultSchemas = {
  website_schema: {
    type: 'WebSite',
    location: [[{ name: 'general:all', value: 'all', label: 'All pages' }]],
    fields: {
      _label: 'Website Schema',
    },
  },
  organization_schema: {
    type: 'Organization',
    location: [[{ name: 'general:all', value: 'all', label: 'All pages' }]],
    fields: {
      _label: 'Organization Schema',
    },
  },
}
