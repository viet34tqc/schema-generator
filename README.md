# React Schema Generator

A standalone React application for generating Schema.org structured data, converted from the WordPress Slim SEO Schema plugin.

## Features

- **Visual Schema Builder**: Create schemas with a few clicks by selecting schema types and properties
- **30+ Schema Types**: Comprehensive list of schemas supported by Google (Article, Product, Organization, WebSite, etc.)
- **Dynamic Data Variables**: Connect schema properties to dynamic variables like post title, site name, etc.
- **Custom Properties**: Add custom properties to extend schemas beyond the default set
- **Import/Export**: Backup and restore your schema configurations
- **Modern UI**: Built with React 18, Tailwind CSS, and Headless UI components
- **Local Storage**: All data is stored locally in your browser

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone or download this project
2. Navigate to the `react-schema-generator` directory
3. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Building for Production

Build the application:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

### Creating a Schema

1. Click the "Add Schema" button
2. Select a schema type from the dropdown (e.g., Article, Product, Organization)
3. Fill in the schema properties in the Properties tab
4. Configure location rules in the Location tab (coming soon)
5. Click "Save Changes" to save your schema

### Schema Properties

Each schema type comes with predefined properties based on Google's structured data guidelines:

- **Required fields** are marked with a red asterisk (*)
- **Tooltips** provide additional information about each property
- **Dynamic variables** can be used in text fields (e.g., `{{ post.title }}`, `{{ site.name }}`)

### Available Variables

The application supports various dynamic variables:

- **Post**: `{{ post.title }}`, `{{ post.content }}`, `{{ post.url }}`, etc.
- **Site**: `{{ site.name }}`, `{{ site.url }}`, `{{ site.description }}`, etc.
- **Author**: `{{ author.name }}`, `{{ author.url }}`, `{{ author.bio }}`, etc.
- **Current**: `{{ current.date }}`, `{{ current.year }}`, `{{ current.url }}`, etc.

### Import/Export

- **Export**: Download all your schemas as a JSON file for backup
- **Import**: Upload a JSON file to restore schemas from another installation

## Architecture

### Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Unstyled, accessible UI components
- **Zustand** - State management (planned)
- **React Hook Form** - Form handling (planned)
- **Immer** - Immutable state updates

### Project Structure

```
src/
├── api/                 # Mock API and data
│   ├── mockApi.js      # API functions
│   ├── mockData.js     # Static data
│   └── schemaFields.js # Schema field definitions
├── components/         # React components
│   ├── Fields/         # Field type components
│   ├── Schema.jsx      # Individual schema component
│   ├── Schemas.jsx     # Schema list component
│   └── ...
├── contexts/           # React contexts
├── utils/              # Utility functions
├── styles/             # CSS files
└── App.jsx            # Main app component
```

### Data Storage

All data is stored in the browser's localStorage:

- **Schemas**: `schema_generator_schemas`
- **Settings**: `schema_generator_settings`

## Supported Schema Types

### E-commerce
- Book
- Product
- Review
- SoftwareApplication

### Organizations
- HowTo
- LocalBusiness
- Organization

### Content
- Article (and subtypes)
- BlogPosting
- NewsArticle
- Recipe
- VideoObject
- ImageObject
- AudioObject
- Event
- Course
- JobPosting
- QAPage

### Basic
- WebSite
- WebPage
- SearchAction
- BreadcrumbList
- Thing
- Person
- Service
- Offer
- CustomJsonLd

## Development

### Adding New Schema Types

1. Add the schema type to `src/api/mockData.js` in the `schemaTypes` array
2. Define the schema fields in `src/api/schemaFields.js`
3. The schema will automatically appear in the dropdown

### Adding New Field Types

1. Create a new component in `src/components/Fields/`
2. Export it from the field components
3. The field type will be automatically available

### Customizing Styles

The application uses Tailwind CSS. You can:

- Modify `tailwind.config.js` for theme customization
- Add custom CSS classes in `src/styles/index.css`
- Use Tailwind utility classes in components

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Credits

Based on the WordPress Slim SEO Schema plugin by eLightUp team.
Converted to standalone React application with modern tooling and practices.
