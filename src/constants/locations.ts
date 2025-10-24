/**
 * Schema Location Options
 *
 * Defines where schemas can be applied (e.g., all pages, specific posts, archives).
 * Used for conditional schema rendering based on page context.
 */

export const locations = {
  General: {
    label: 'General',
    options: [
      { value: 'general:all', label: 'All pages' },
      { value: 'general:front_page', label: 'Front page' },
      { value: 'general:home', label: 'Blog page' },
      { value: 'general:search', label: 'Search results' },
      { value: 'general:404', label: '404 page' },
    ],
  },
  Posts: {
    label: 'Posts',
    options: [
      { value: 'post_type:post', label: 'All posts' },
      { value: 'post_type:page', label: 'All pages' },
      { value: 'post:post', label: 'Specific post' },
      { value: 'post:page', label: 'Specific page' },
    ],
  },
  Archives: {
    label: 'Archives',
    options: [
      { value: 'post_type:archive:post', label: 'Post archive' },
      { value: 'taxonomy:archive:category', label: 'Category archive' },
      { value: 'taxonomy:archive:post_tag', label: 'Tag archive' },
    ],
  },
}
