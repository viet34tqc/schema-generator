/**
 * Template Variables
 *
 * Defines available template variables that can be used in schema fields.
 * These variables are replaced with actual values at runtime.
 */

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
]
